// yo hago un carrusel reutilizable con react-slick + skeleton de carga

import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";           // yo cargo CSS base de slick
import "slick-carousel/slick/slick-theme.css";     // yo cargo CSS tema de slick

import { NFTs } from "../data/nfts";               // yo traigo mis datos
import NFTCard from "./NFTCard";                   // yo pinto cada tarjeta
import "./carousel.css";                           // yo aplico espaciado + flechas

import SkeletonCard from "./UI/SkeletonCard";      // yo muestro skeleton mientras carga
import "./UI/skeleton.css";                        // yo cargo el CSS del shimmer

// yo dejo que slick me pase className/style para posicionar bien las flechas
const NextArrow = ({ className, style, onClick }) => (
  <button
    className={className}
    onClick={onClick}
    aria-label="next"
    style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <span className="arrow-icon">›</span>
  </button>
);

const PrevArrow = ({ className, style, onClick }) => (
  <button
    className={className}
    onClick={onClick}
    aria-label="prev"
    style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <span className="arrow-icon">‹</span>
  </button>
);

export default function NFTCarousel() {
  // yo uso 6 ítems dinámicos
  const items = useMemo(() => NFTs.slice(0, 6), []);

  // --- Estado de carga (skeleton) ------------------------------------------
  const [loading, setLoading] = useState(true);

  // yo pre-cargo imágenes y garantizo un mínimo de 300ms de skeleton
  useEffect(() => {
    const MIN = 300;                         // yo puedo ajustar 250–350ms
    const t0 = performance.now();

    // yo recojo todas las imágenes a precargar (grande + avatar)
    const urls = items.flatMap(i => [i.nftImage, i.authorImage]).filter(Boolean);

    // si no hay nada que precargar, respeto igual el mínimo
    if (!urls.length) {
      const wait = Math.max(0, MIN - (performance.now() - t0));
      const id = setTimeout(() => setLoading(false), wait);
      return () => clearTimeout(id);
    }

    let alive = true;                        // yo evito setState tras unmount
    let loaded = 0;
    const timers = [];

    const finish = () => {
      const wait = Math.max(0, MIN - (performance.now() - t0));
      const id = setTimeout(() => { if (alive) setLoading(false); }, wait);
      timers.push(id);
    };

    // yo precargo cada imagen (éxito o error cuentan como “hecha”)
    urls.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loaded += 1;
        if (loaded === urls.length) finish();
      };
    });

    // yo limpio timeouts si el componente se desmonta
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, [items]);

  // --- Configuración del slider --------------------------------------------
  const settings = {
    arrows: true,             // yo activo flechas
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,          // desktop
    slidesToScroll: 1,
    autoplay: true,           // opcional
    autoplaySpeed: 2500,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } }, // tablet
      { breakpoint: 640,  settings: { slidesToShow: 1 } }  // móvil
    ]
  };

  // --- Render ---------------------------------------------------------------
  return (
    <div className="carousel-wrap" aria-busy={loading}>
      {loading ? (
        // yo muestro 4 skeletons para simular el carrusel inicial
        <div className="skeleton-grid">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <Slider {...settings}>
          {items.map((item) => (
            <div key={item.id}>
              <NFTCard item={item} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
