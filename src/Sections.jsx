import{useState}from"react";
import{ProductPopup}from"./ProductPopup.jsx";
export const products=[
{id:"cat",title:"Кошка с выпученными глазами",copy:"Когда увидел количество рабочих чатов",price:590,occasion:"Работа",image:"/assets/card-winky-memepedia.png",background:"/assets/popup-bg-cat.png",subject:"/assets/popup-subject-cat.png"},
{id:"penguin",title:"Пингвин идёт к горе",copy:"Для тех, кто всё равно дойдёт",price:590,occasion:"День рождения",image:"/assets/card-penguin-memepedia.png",background:"/assets/popup-bg-penguin.png",subject:"/assets/popup-subject-penguin.png"},
{id:"musya",title:"Муся, это ты?",copy:"Нет, это не Муся. Но открытка — точно для неё",price:650,occasion:"Отношения",image:"/assets/card-musya-memepedia.png",background:"/assets/popup-bg-musya.png",subject:"/assets/popup-subject-musya.png"}];

export function Products({ items, add }) {
  const [saved, setSaved] = useState([]);

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
          <div className="actions">
            <button className="add" onClick={() => add(product)}>В корзину</button>
            <button
              className="save"
              aria-pressed={saved.includes(product.id)}
              onClick={() => setSaved((current) => (
                current.includes(product.id)
                  ? current.filter((id) => id !== product.id)
                  : [...current, product.id]
              ))}
            >
              {saved.includes(product.id) ? "Сохранено" : "Сохранить"}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

const steps=[
["01","Придумываем","Ловим знакомую ситуацию и превращаем её в бумажную шутку.","/assets/process-sketch.png"],
["02","Вырезаем","Точно режем плотную бумагу и проверяем механику.","/assets/process-cut.png"],
["03","Собираем","Складываем вручную, тестируем эффект и упаковываем.","/assets/process-assemble.png"]];
export function Process(){return <section className="process" id="process"><header><p className="eyebrow">Не конвейер. Почти магия.</p><h2>КАК ЭТО СДЕЛАНО</h2><p>Каждую открытку придумываем, вырезаем и собираем вручную в нашей мастерской.</p></header><div>{steps.map(s=><article key={s[0]}><b>{s[0]}</b><img src={s[3]} alt={s[1]+": этап создания открытки"}/><h3>{s[1]}</h3><p>{s[2]}</p></article>)}</div></section>}

export function Footer(){const[email,setEmail]=useState(""),[done,setDone]=useState(false);return <footer><div><a className="wordmark" href="#top">БУМБУМАГА</a><p>Бумажные мемы, которые<br/>можно вручить лично.</p></div><nav><a href="#catalog">Каталог</a><a href="#process">Как это сделано</a><a href="#about">Доставка и оплата</a><a href="https://memepedia.ru/memoteka/" target="_blank" rel="noreferrer">Мемотека — источник вдохновения</a></nav><form onSubmit={e=>{e.preventDefault();setDone(true)}}><label htmlFor="email">Новое и свежее — редко и по делу</label>{done?<p className="success">Готово. Следующий мем — ваш.</p>:<div><input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Ваш e-mail" required/><button>Подписаться</button></div>}</form><small>© 2026 БУМБУМАГА</small></footer>}

export function Cart({open,close,cart,setCart}){const items=products.filter(p=>cart[p.id]),total=items.reduce((a,p)=>a+p.price*cart[p.id],0);function quantity(id,n){setCart(c=>{const next={...c},q=(next[id]||0)+n;if(q<1)delete next[id];else next[id]=q;return next})}return <><div className={"backdrop "+(open?"open":"")} onClick={close}/><aside className={"drawer "+(open?"open":"")} aria-hidden={!open}><header><h2>КОРЗИНА</h2><button onClick={close}>Закрыть</button></header>{items.length?<><div className="cart-items">{items.map(p=><article key={p.id}><img src={p.image} alt=""/><div><h3>{p.title}</h3><p>{p.price} ₽</p><div className="quantity"><button aria-label="Уменьшить" onClick={()=>quantity(p.id,-1)}>−</button><span>{cart[p.id]}</span><button aria-label="Увеличить" onClick={()=>quantity(p.id,1)}>+</button></div></div></article>)}</div><div className="total"><p><span>Итого</span><strong>{total} ₽</strong></p><button onClick={()=>alert("Прототип: здесь начнётся оформление заказа")}>Оформить заказ</button></div></>:<div className="empty"><p>Пока пусто. Даже неловко.</p><button onClick={close}>Выбрать открытку</button></div>}</aside></>}
