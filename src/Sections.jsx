import{useEffect,useRef,useState}from"react";
import{ProductPopup}from"./ProductPopup.jsx";

export function BrandCross(){
  const ref=useRef(null);
  useEffect(()=>{
    const node=ref.current;
    if(!node||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    const observer=new IntersectionObserver(([entry])=>{
      node.classList.toggle("is-spinning",entry.isIntersecting);
    },{threshold:.65});
    observer.observe(node);
    return()=>observer.disconnect();
  },[]);
  return <span ref={ref} className="brand-cross">×</span>;
}
export const products=[
{id:"cat",title:"Кошка с выпученными глазами",copy:"Когда увидел количество рабочих чатов",detail:"Объёмная бумажная сцена · ручная сборка",price:590,occasion:"Работа",image:"/assets/card-winky-memepedia.png",background:"/assets/popup-bg-cat.png",subject:"/assets/popup-subject-cat.png"},
{id:"penguin",title:"Пингвин идёт к горе",copy:"Для тех, кто всё равно дойдёт",detail:"Объёмная бумажная сцена · ручная сборка",price:590,occasion:"День рождения",image:"/assets/card-penguin-memepedia.png",background:"/assets/popup-bg-penguin.png",subject:"/assets/popup-subject-penguin.png"},
{id:"musya",title:"Муся, это ты?",copy:"Нет, это не Муся. Но открытка — точно для неё",detail:"Объёмная бумажная сцена · ручная сборка",price:650,occasion:"Отношения",image:"/assets/card-musya-memepedia.png",background:"/assets/popup-bg-musya.png",subject:"/assets/popup-subject-musya.png"}];

export function Products({ items, add }) {
  return (
    <div className={"products " + (items.length === 1 ? "single" : "")}>
      {items.map((product) => (
        <article className="product" key={product.id}>
          <ProductPopup product={product} />
          <div className="product-title">
            <h3>{product.title}</h3>
            <strong>{product.price} ₽</strong>
          </div>
          <p>{product.copy}</p>
          <small className="product-detail">{product.detail}</small>
          <div className="actions">
            <button className="add" onClick={() => add(product)}>В корзину</button>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ValueBridge() {
  return (
    <section className="value-bridge" id="why">
      <div>
        <p className="eyebrow">Когда обычная открытка звучит слишком обычно</p>
        <h2>НАЧНИТЕ<br />С ОБЩЕЙ ШУТКИ</h2>
      </div>
      <figure className="value-visual">
        <img
          src="/assets/card-winky-memepedia.png"
          alt="Открытая pop-up открытка с объёмным мемом"
          loading="lazy"
        />
        <figcaption>Открывается объёмно — запоминается сразу</figcaption>
      </figure>
      <div className="value-copy">
        <p>
          Не нужно придумывать идеальную подпись. Выберите знакомый мем —
          бумажная механика сделает момент вручения за вас.
        </p>
        <ol>
          <li><span>01</span>Узнаёте ситуацию</li>
          <li><span>02</span>Подбираете открытку</li>
          <li><span>03</span>Дарите реакцию, а не формальность</li>
        </ol>
      </div>
    </section>
  );
}

const steps=[
["01","Придумываем","Ловим знакомую ситуацию и превращаем её в бумажную шутку.","/assets/process-sketch.png"],
["02","Вырезаем","Точно режем плотную бумагу и проверяем механику.","/assets/process-cut.png"],
["03","Собираем","Складываем вручную, тестируем эффект и упаковываем.","/assets/process-assemble.png"]];
export function Process(){return <section className="process" id="process"><header><p className="eyebrow">Не конвейер. Почти магия.</p><h2>КАК ЭТО СДЕЛАНО</h2><p>Каждую открытку придумываем, вырезаем и собираем вручную. Механику проверяем до упаковки.</p></header><div>{steps.map(s=><article key={s[0]}><b>{s[0]}</b><img src={s[3]} alt={s[1]+": этап создания открытки"}/><h3>{s[1]}</h3><p>{s[2]}</p></article>)}</div></section>}

const confidenceItems = [
  ["590–650 ₽", "Цена конкретной открытки видна до добавления в корзину."],
  ["Ручная сборка", "Каждую pop-up механику складываем и проверяем отдельно."],
  ["Корзина под контролем", "Количество и итог можно изменить до оформления."],
  ["До подтверждения", "Срок и стоимость доставки уточняются до оплаты."],
];

export function Confidence() {
  return (
    <section className="confidence" id="delivery">
      <header>
        <p className="eyebrow">Меньше поводов сомневаться</p>
        <h2>ВСЁ ВАЖНОЕ<br />ДО ЗАКАЗА</h2>
      </header>
      <div className="confidence-grid">
        {confidenceItems.map(([title, copy], index) => (
          <article key={title}>
            <span>0{index + 1}</span>
            <strong>{title}</strong>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function FinalCta() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    section.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldShow = entry.isIntersecting && entry.intersectionRatio >= 0.18;
        section.classList.toggle("is-visible", shouldShow);
      },
      {
        threshold: [0, 0.18, 0.45],
        rootMargin: "-6% 0px -6% 0px",
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="final-cta" ref={sectionRef}>
      <p className="eyebrow">Подарок не обязан быть серьёзным, чтобы запомниться</p>
      <h2 aria-label="Узнаваемый мем. Настоящая бумага. Одна точная реакция.">
        <span className="final-line">УЗНАВАЕМЫЙ МЕМ.</span>
        <span className="final-line">НАСТОЯЩАЯ БУМАГА.</span>
        <span className="final-line">ОДНА ТОЧНАЯ РЕАКЦИЯ.</span>
      </h2>
      <a className="primary" href="#catalog">Выбрать открытку</a>
      <p className="final-note">Три дизайна · от 590 ₽ · ручная сборка</p>
    </section>
  );
}

export function Footer(){const[email,setEmail]=useState(""),[done,setDone]=useState(false);return <footer><div><a className="wordmark" href="#top">BULIN <BrandCross/> БУМБУМАГА</a><p>Бумажные мемы, которые<br/>можно вручить лично.</p></div><nav><a href="#catalog">Открытки</a><a href="#why">Почему это работает</a><a href="#process">Как это сделано</a><a href="#delivery">Перед заказом</a><a href="https://memepedia.ru/memoteka/" target="_blank" rel="noreferrer">Мемотека — источник вдохновения</a></nav><form onSubmit={e=>{e.preventDefault();setDone(true)}}><label htmlFor="email">Новое и свежее — редко и по делу</label>{done?<p className="success">Готово. Следующий мем — ваш.</p>:<div><input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Ваш e-mail" required/><button>Подписаться</button></div>}</form><small>© 2026 BULIN × БУМБУМАГА</small></footer>}

export function Cart({open,close,cart,setCart}){const items=products.filter(p=>cart[p.id]),total=items.reduce((a,p)=>a+p.price*cart[p.id],0);function quantity(id,n){setCart(c=>{const next={...c},q=(next[id]||0)+n;if(q<1)delete next[id];else next[id]=q;return next})}return <><div className={"backdrop "+(open?"open":"")} onClick={close}/><aside className={"drawer "+(open?"open":"")} aria-hidden={!open} aria-label="Корзина"><header><h2>КОРЗИНА</h2><button onClick={close}>Закрыть</button></header>{items.length?<><div className="cart-items">{items.map(p=><article key={p.id}><img src={p.image} alt=""/><div><h3>{p.title}</h3><p>{p.price} ₽</p><div className="quantity"><button aria-label="Уменьшить" onClick={()=>quantity(p.id,-1)}>−</button><span>{cart[p.id]}</span><button aria-label="Увеличить" onClick={()=>quantity(p.id,1)}>+</button></div></div></article>)}</div><div className="total"><p><span>Итого</span><strong>{total} ₽</strong></p><button onClick={()=>alert("Прототип: здесь начнётся оформление заказа")}>Перейти к оформлению</button><small className="cart-assurance">Состав и итог заказа можно проверить до оплаты.</small></div></>:<div className="empty"><p>Пока пусто. Даже неловко.</p><button onClick={close}>Выбрать открытку</button></div>}</aside></>}
