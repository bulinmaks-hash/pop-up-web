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
socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message));
  else resolve(message.result);
});

function send(method, params = {}) {
  const id = ++nextId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

async function evaluate(expression) {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

await send("Runtime.enable");
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 1000,
  deviceScaleFactor: 1,
  mobile: false,
});
await send("Page.reload");
await evaluate("Promise.all([...document.images].map(img => img.complete ? true : new Promise(resolve => { img.onload = img.onerror = resolve })))");
await new Promise((resolve) => setTimeout(resolve, 900));
await evaluate("window.scrollTo(0,0)");
await new Promise((resolve) => setTimeout(resolve, 250));
await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 1400, y: 20 });
const heroClosed = await send("Page.captureScreenshot", {
  format: "png",
  fromSurface: true,
  captureBeyondViewport: false,
});
writeFileSync("implementation-hero-closed.png", Buffer.from(heroClosed.data, "base64"));
const heroPoint = await evaluate("(() => { const rect = document.querySelector('.hero-popup').getBoundingClientRect(); return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }; })()");
await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: heroPoint.x, y: heroPoint.y });
await new Promise((resolve) => setTimeout(resolve, 1100));
const heroOpen = await send("Page.captureScreenshot", {
  format: "png",
  fromSurface: true,
  captureBeyondViewport: false,
});
writeFileSync("implementation-hero-open.png", Buffer.from(heroOpen.data, "base64"));
await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 1400, y: 20 });
await evaluate("document.querySelector('#catalog').scrollIntoView({block:'start'})");
await new Promise((resolve) => setTimeout(resolve, 250));
const closedCapture = await send("Page.captureScreenshot", {
  format: "png",
  fromSurface: true,
  captureBeyondViewport: false,
});
writeFileSync("implementation-closed.png", Buffer.from(closedCapture.data, "base64"));
for (const [index, name] of ["cat", "penguin", "musya"].entries()) {
  const point = await evaluate(`(() => { const rect = document.querySelectorAll('.product-image')[${index}].getBoundingClientRect(); return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }; })()`);
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: point.x, y: point.y });
  await new Promise((resolve) => setTimeout(resolve, 950));
  const capture = await send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false,
  });
  writeFileSync(`implementation-hover-${name}.png`, Buffer.from(capture.data, "base64"));
}
await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 1400, y: 20 });
await evaluate("document.querySelector('#process').scrollIntoView({block:'start'})");
await new Promise((resolve) => setTimeout(resolve, 450));
console.log(JSON.stringify(await evaluate("([...document.querySelectorAll('.process img')].map(img => { const rect=img.getBoundingClientRect(); const style=getComputedStyle(img); return {natural:[img.naturalWidth,img.naturalHeight],rendered:[Math.round(rect.width),Math.round(rect.height)],objectFit:style.objectFit} }))"), null, 2));
const processCapture = await send("Page.captureScreenshot", {
  format: "png",
  fromSurface: true,
  captureBeyondViewport: false,
});
writeFileSync("implementation-process.png", Buffer.from(processCapture.data, "base64"));
socket.close();
