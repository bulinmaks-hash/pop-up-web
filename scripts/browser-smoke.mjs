import { writeFileSync } from "node:fs";

const tabs = await (await fetch("http://127.0.0.1:9222/json")).json();
const tab = tabs.find((item) => item.type === "page" && item.url.includes("127.0.0.1:4173"));
if (!tab) throw new Error("Local preview tab was not found");

const socket = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let nextId = 0;
const pending = new Map();
const browserErrors = [];
socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  }
  if (message.method === "Runtime.exceptionThrown") browserErrors.push(message.params.exceptionDetails.text);
});

function send(method, params = {}) {
  const id = ++nextId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}
const wait = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));
async function evaluate(expression) {
  const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

await send("Runtime.enable");
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await send("Page.reload");
await evaluate("document.readyState");
await wait(500);
const capture = await send("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: false });
writeFileSync("implementation-mobile.png", Buffer.from(capture.data, "base64"));

const results = {};
results.initialProducts = await evaluate("document.querySelectorAll('.product').length");
await evaluate("Array.from(document.querySelectorAll('.filters button')).find((b)=>b.textContent==='Работа').click()");
await wait();
results.filteredProducts = await evaluate("document.querySelectorAll('.product').length");
await evaluate("document.querySelector('.product-image').click()");
await wait();
results.cardOpened = await evaluate("document.querySelector('.product-image').getAttribute('aria-expanded') === 'true'");
await evaluate("document.querySelector('.product .add').click()");
await wait();
results.cartCount = await evaluate("document.querySelector('.cart-link span').textContent");
await evaluate("document.querySelector('.cart-link').click()");
await wait();
results.drawerOpen = await evaluate("document.querySelector('.drawer').classList.contains('open')");
results.cartItems = await evaluate("document.querySelectorAll('.cart-items article').length");
await evaluate("document.querySelector('.quantity button:last-child').click()");
await wait();
results.quantity = await evaluate("document.querySelector('.quantity span').textContent");
await evaluate("document.querySelector('.drawer>header button').click()");
await evaluate(`(()=>{const input=document.querySelector('footer input');const setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;setter.call(input,'test@example.com');input.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('footer form').requestSubmit()})()`);
await wait();
results.subscribed = await evaluate("document.querySelector('.success')?.textContent.includes('Готово')===true");
results.browserErrors = browserErrors;

const expected = results.initialProducts === 3 && results.filteredProducts === 1 && results.cardOpened && results.cartCount === "1" && results.drawerOpen && results.cartItems === 1 && results.quantity === "2" && results.subscribed && results.browserErrors.length === 0;
console.log(JSON.stringify({ passed: expected, ...results }, null, 2));
socket.close();
if (!expected) process.exitCode = 1;
