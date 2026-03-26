"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import SidebarLayout from "@/components/SidebarLayout";

const slides = [
  { label: "Welcome to WILD", bg: "#3b82f6" },
  { label: "Picture Dictionary", bg: "#22c55e" },
  { label: "Collections", bg: "#f97316" },
  { label: "World", bg: "#2aa1b8" },
  { label: "Book", bg: "#8b5cf6" },
];

const characters = [
  { name: "Sarah", color: "#e74c3c" },
  { name: "Jomo", color: "#3498db" },
  { name: "Juanita", color: "#e67e22" },
  { name: "Ren", color: "#2ecc71" },
  { name: "Gavin", color: "#9b59b6" },
  { name: "Kadin", color: "#1abc9c" },
  { name: "Philip", color: "#e84393" },
  { name: "Sam", color: "#f39c12" },
  { name: "Umi", color: "#00b894" },
  { name: "Tarika", color: "#6c5ce7" },
  { name: "Theo", color: "#d63031" },
  { name: "Liana", color: "#0984e3" },
];

const contentBlocks = [
  {
    title: "Picture Dictionary",
    bg: "#107bc4",
    color: "#107bc4",
    desc: "Explore words through beautiful pictures",
    href: "/wild",
  },
  {
    title: "World",
    bg: "#f1ae00",
    color: "#f1ae00",
    desc: "Visit different places and discover words",
    href: "/wild",
  },
  {
    title: "Collections",
    bg: "#2bbd19",
    color: "#2bbd19",
    desc: "Browse words by theme and category",
    href: "/wild",
  },
  {
    title: "Book",
    bg: "#2290cb",
    color: "#2290cb",
    desc: "Look up words alphabetically",
    href: "/wild",
  },
  {
    title: "Games",
    bg: "#4f44a6",
    color: "#4f44a6",
    desc: "Learn new words through fun games",
    href: "/activities",
  },
  {
    title: "Subscription",
    bg: "#004b97",
    color: "#004b97",
    desc: "Get premium features",
    href: "/subscribe",
  },
];

export default function WildPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <SidebarLayout variant="wild">
      <div style={{ fontFamily: "var(--font-wild)" }}>
        {/* "Go to WILD" header */}
        <h1
          style={{
            color: "#2aa1b8",
            fontSize: "1.6em",
            fontWeight: 700,
            textAlign: "center",
            margin: "0.5em 0",
          }}
        >
          Go to{" "}
          <span style={{ color: "#a53431" }}>W</span>
          <span style={{ color: "#388cec" }}>I</span>
          <span style={{ color: "#83b15b" }}>L</span>
          <span style={{ color: "#eaaf45" }}>D</span>
        </h1>

        {/* Image Slideshow */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            margin: "0 auto 1.5em",
            maxWidth: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              transition: "transform 0.5s ease-in-out",
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                style={{
                  minWidth: "100%",
                  height: "300px",
                  backgroundColor: slide.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "1.5em",
                  fontWeight: 700,
                }}
              >
                {slide.label}
              </div>
            ))}
          </div>

          {/* Previous arrow */}
          <button
            onClick={prevSlide}
            style={{
              position: "absolute",
              top: "50%",
              left: "8px",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.35)",
              color: "#fff",
              border: "none",
              fontSize: "1.4em",
              cursor: "pointer",
              padding: "6px 10px",
              lineHeight: 1,
            }}
            aria-label="Previous slide"
          >
            &#9664;
          </button>

          {/* Next arrow */}
          <button
            onClick={nextSlide}
            style={{
              position: "absolute",
              top: "50%",
              right: "8px",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.35)",
              color: "#fff",
              border: "none",
              fontSize: "1.4em",
              cursor: "pointer",
              padding: "6px 10px",
              lineHeight: 1,
            }}
            aria-label="Next slide"
          >
            &#9654;
          </button>

          {/* Dot navigation */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              padding: "10px 0",
            }}
          >
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  border: "2px solid #569acd",
                  backgroundColor: i === currentSlide ? "#569acd" : "#fff",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Meet the friends */}
        <div style={{ marginBottom: "1.5em" }}>
          <h2
            style={{
              color: "#2aa1b8",
              fontSize: "1.2em",
              fontWeight: 700,
              textAlign: "center",
              margin: "0 0 0.8em",
            }}
          >
            Meet the friends in the{" "}
            <span style={{ color: "#a53431" }}>W</span>
            <span style={{ color: "#388cec" }}>I</span>
            <span style={{ color: "#83b15b" }}>L</span>
            <span style={{ color: "#eaaf45" }}>D</span>
            {" "}club
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            {characters.map((char) => (
              <a
                key={char.name}
                href="#"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textDecoration: "none",
                  width: "70px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: char.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1.2em",
                    marginBottom: "4px",
                  }}
                >
                  {char.name.charAt(0)}
                </div>
                <span
                  style={{
                    color: "#5192d1",
                    fontSize: "0.8em",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  {char.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* What's in WILD */}
        <div>
          <h2
            style={{
              color: "#2aa1b8",
              fontSize: "1.2em",
              fontWeight: 700,
              textAlign: "center",
              margin: "0 0 0.8em",
            }}
          >
            What&apos;s in{" "}
            <span style={{ color: "#a53431" }}>W</span>
            <span style={{ color: "#388cec" }}>I</span>
            <span style={{ color: "#83b15b" }}>L</span>
            <span style={{ color: "#eaaf45" }}>D</span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "48% 48%",
              gap: "2em 4%",
            }}
          >
            {contentBlocks.map((block) => (
              <Link
                key={block.title}
                href={block.href}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    height: "200px",
                    backgroundColor: block.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "1.4em",
                    fontWeight: 700,
                  }}
                >
                  {block.title}
                </div>
                <p
                  style={{
                    color: block.color,
                    fontWeight: 600,
                    fontSize: "0.9em",
                    margin: "0.4em 0 0",
                  }}
                >
                  {block.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
