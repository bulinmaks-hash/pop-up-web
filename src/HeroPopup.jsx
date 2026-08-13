import { useEffect, useRef, useState } from "react";

const MAX_ANGLE = 160;
const MIN_ANGLE = 2;
const clamp01 = (value) => Math.min(1, Math.max(0, value));
const smoothstep = (value) => value * value * (3 - 2 * value);

export function HeroPopup() {
  const [openAngle, setOpenAngle] = useState(MAX_ANGLE);
  const popupRef = useRef(null);
  const frame = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const updateAngle = () => {
      const popup = popupRef.current;
      if (!popup) return;

      const documentBottom = popup.getBoundingClientRect().bottom + window.scrollY;
      const travel = Math.max(1, documentBottom);
      const closure = smoothstep(clamp01(window.scrollY / travel));
      setOpenAngle(MAX_ANGLE - closure * (MAX_ANGLE - MIN_ANGLE));
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
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  const progress = (openAngle - MIN_ANGLE) / (MAX_ANGLE - MIN_ANGLE);
  const closure = 1 - progress;
  const pageFold = (180 - openAngle) / 2;
  const subjectFold = 2 + closure * 86;

  const lighting = {
    pageHighlight: 0.035 + closure * 0.04,
    pageRightShade: 0.025 + closure * 0.16,
    subjectHighlight: 0.025 + closure * 0.055,
    subjectRightShade: 0.035 + closure * 0.24,
    castShadowOpacity: 0.14 + closure * 0.18,
    castShadowWidth: 70 - closure * 52,
    castShadowBlur: 11 - closure * 5,
    castShadowX: 5 + closure * 7,
  };

  return (
    <figure
      ref={popupRef}
      className="hero-popup"
      role="img"
      aria-label="Раскрывающаяся бумажная открытка с Ди Каприо"
      data-open-angle={Math.round(openAngle)}
      data-subject-fold={Math.round(subjectFold)}
      data-light-source="top-left"
      style={{
        "--hero-left-fold": `${pageFold}deg`,
        "--hero-right-fold": `${-pageFold}deg`,
        "--hero-subject-left-fold": `${-subjectFold}deg`,
        "--hero-subject-right-fold": `${subjectFold}deg`,
        "--hero-page-highlight": lighting.pageHighlight.toFixed(3),
        "--hero-page-right-shade": lighting.pageRightShade.toFixed(3),
        "--hero-subject-highlight": lighting.subjectHighlight.toFixed(3),
        "--hero-subject-right-shade": lighting.subjectRightShade.toFixed(3),
        "--hero-cast-shadow-opacity": lighting.castShadowOpacity.toFixed(3),
        "--hero-cast-shadow-width": `${lighting.castShadowWidth}%`,
        "--hero-cast-shadow-blur": `${lighting.castShadowBlur}px`,
        "--hero-cast-shadow-x": `${lighting.castShadowX}px`,
      }}
    >
      <span className="hero-book" aria-hidden="true">
        <span className="hero-page hero-page-left">
          <img src="/assets/hero-gatsby-background.png" alt="" />
        </span>
        <span className="hero-page hero-page-right">
          <img src="/assets/hero-gatsby-background.png" alt="" />
        </span>
      </span>
      <span className="hero-subject-cast-shadow" aria-hidden="true" />
      <span className="hero-subject" aria-hidden="true">
        <span className="hero-subject-half hero-subject-left">
          <img src="/assets/hero-gatsby-subject-retouched.png" alt="" />
        </span>
        <span className="hero-subject-half hero-subject-right">
          <img src="/assets/hero-gatsby-subject-retouched.png" alt="" />
        </span>
      </span>
    </figure>
  );
}