import { useEffect, useRef, useState } from "react";

const MAX_ANGLE = 160;
const MIN_ANGLE = 2;
const clamp01 = (value) => Math.min(1, Math.max(0, value));
const smoothstep = (value) => value * value * (3 - 2 * value);

export function ProductPopup({ product }) {
  const popupRef = useRef(null);
  const frame = useRef(0);
  const [scrollAngle, setScrollAngle] = useState(MIN_ANGLE);
  const [forcedClosed, setForcedClosed] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateAngle = () => {
      if (reducedMotion.matches) {
        setScrollAngle(MAX_ANGLE);
        return;
      }

      const popup = popupRef.current;
      if (!popup) return;

      const rect = popup.getBoundingClientRect();
      const entryStart = window.innerHeight * 0.98;
      const entryEnd = window.innerHeight * 0.58;
      const entryClosure = smoothstep(
        clamp01((rect.top - entryEnd) / Math.max(1, entryStart - entryEnd)),
      );
      const exitClosure = smoothstep(clamp01(-rect.bottom / Math.max(1, rect.height)));
      const closure = Math.max(entryClosure, exitClosure);

      setScrollAngle(MAX_ANGLE - closure * (MAX_ANGLE - MIN_ANGLE));
    };

    const scheduleUpdate = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = 0;
        updateAngle();
      });
    };

    updateAngle();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    reducedMotion.addEventListener("change", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  const openAngle = forcedClosed ? MIN_ANGLE : scrollAngle;
  const progress = (openAngle - MIN_ANGLE) / (MAX_ANGLE - MIN_ANGLE);
  const closure = 1 - progress;
  const pageFold = (180 - openAngle) / 2;
  const subjectFold = 2 + closure * 86;
  const isOpen = openAngle > 90;

  return (
    <button
      ref={popupRef}
      type="button"
      className={`product-image product-popup product-popup-${product.id}`}
      aria-expanded={isOpen}
      aria-label={`${forcedClosed ? "Открыть" : "Закрыть"} открытку «${product.title}»`}
      data-open-angle={Math.round(openAngle)}
      data-subject-fold={Math.round(subjectFold)}
      data-light-source="top-left"
      onClick={() => setForcedClosed((value) => !value)}
      style={{
        "--product-left-fold": `${pageFold}deg`,
        "--product-right-fold": `${-pageFold}deg`,
        "--product-subject-left-fold": `${-subjectFold}deg`,
        "--product-subject-right-fold": `${subjectFold}deg`,
        "--product-page-highlight": (0.035 + closure * 0.04).toFixed(3),
        "--product-page-right-shade": (0.025 + closure * 0.16).toFixed(3),
        "--product-subject-highlight": (0.025 + closure * 0.055).toFixed(3),
        "--product-subject-right-shade": (0.035 + closure * 0.24).toFixed(3),
        "--product-cast-shadow-opacity": (0.14 + closure * 0.18).toFixed(3),
        "--product-cast-shadow-width": `${70 - closure * 52}%`,
        "--product-cast-shadow-blur": `${11 - closure * 5}px`,
        "--product-cast-shadow-x": `${5 + closure * 7}px`,
        "--product-subject-image": `url("${product.subject}")`,
      }}
    >
      <span className="occasion">{product.occasion}</span>
      <span className="product-popup-book" aria-hidden="true">
        <span className="product-popup-page product-popup-page-left">
          <img src={product.background} alt="" />
        </span>
        <span className="product-popup-page product-popup-page-right">
          <img src={product.background} alt="" />
        </span>
      </span>
      <span className="product-popup-cast-shadow" aria-hidden="true" />
      <span className="product-popup-subject" aria-hidden="true">
        <span className="product-popup-subject-half product-popup-subject-left">
          <img src={product.subject} alt="" />
        </span>
        <span className="product-popup-subject-half product-popup-subject-right">
          <img src={product.subject} alt="" />
        </span>
      </span>
    </button>
  );
}
