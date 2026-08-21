import { useEffect, useRef, useState } from "react";
import { FloatingCartButton } from "./FloatingCartButton.jsx";
import { HeroPopup } from "./HeroPopup.jsx";
import {
  Cart,
  BrandCross,
  Confidence,
  FinalCta,
  Footer,
  Products,
  Process,
  ValueBridge,
  products,
} from "./Sections.jsx";
const occasions=["Все","День рождения","Работа","Отношения"];

export function App() {
  const heroRef = useRef(null);
  const [filter, setFilter] = useState("Все");
  const [cart, setCart] = useState({});
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const shown = filter === "Все" ? products : products.filter((item) => item.occasion === filter);
  const count = Object.values(cart).reduce((total, quantity) => total + quantity, 0);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) {
      hero.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => hero.classList.toggle("is-visible", entry.isIntersecting && entry.intersectionRatio >= 0.18),
      { threshold: [0, 0.18, 0.5], rootMargin: "-5% 0px -5% 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  function add(product) {
    setCart((current) => ({
      ...current,
      [product.id]: (current[product.id] || 0) + 1,
    }));
    setNote("«" + product.title + "» уже в корзине");
    window.setTimeout(() => setNote(""), 2200);
  }

  function choose(occasion) {
    setFilter(occasion);
    document.querySelector("#catalog")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
      <header className="header">
        <a className="wordmark" href="#top">
          BULIN <BrandCross /> БУМБУМАГА
        </a>
        <nav aria-label="Основная навигация">
          <a href="#catalog">Открытки</a>
          <a href="#why">Почему это работает</a>
          <a href="#delivery">Перед заказом</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero hero-motion-ready" ref={heroRef}>
          <div className="hero-copy">
            <p className="eyebrow">Pop-up открытки с узнаваемыми мемами</p>
            <h1 aria-label="Мем, который можно подарить">
              <span className="hero-line">МЕМ, КОТОРЫЙ</span>
              <span className="hero-line">МОЖНО</span>
              <span className="hero-line">ПОДАРИТЬ</span>
            </h1>
            <p className="lead">
              Открывается — и вместо дежурной подписи внутри появляется шутка,
              которую поймут без объяснений.
            </p>
            <a className="primary" href="#catalog">Выбрать открытку от 590 ₽</a>
            <ul className="hero-proof" aria-label="Главное об открытках">
              <li>Собираем вручную</li>
              <li>Объёмный pop-up эффект</li>
              <li>Цена видна сразу</li>
            </ul>
          </div>
          <HeroPopup />
        </section>

        <section className="occasions" aria-label="Выбор открытки по поводу">
          <p>Выберите повод — покажем подходящую степень абсурда</p>
          <div>
            {occasions.slice(1).map((occasion) => (
              <button key={occasion} onClick={() => choose(occasion)}>
                {occasion}<small>Подобрать</small>
              </button>
            ))}
          </div>
        </section>

        <ValueBridge />

        <section className="catalog" id="catalog">
          <header>
            <div>
              <p className="eyebrow">Тот случай, когда подарок понятен без объяснений</p>
              <h2>ВЫБЕРИТЕ<br />СВОЙ МЕМ</h2>
            </div>
            <div className="filters" aria-label="Фильтр открыток">
              {occasions.map((occasion) => (
                <button
                  key={occasion}
                  className={filter === occasion ? "active" : ""}
                  onClick={() => setFilter(occasion)}
                >
                  {occasion}
                </button>
              ))}
            </div>
          </header>
          <Products items={shown} add={add} />
        </section>

        <Process />
        <Confidence />
        <FinalCta />
      </main>

      <Footer />
      <FloatingCartButton count={count} onOpen={() => setOpen(true)} />
      {note && <div className="toast" role="status">{note}</div>}
      <Cart open={open} close={() => setOpen(false)} cart={cart} setCart={setCart} />
    </div>
  );
}
