import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VASMA — Luxury Digitx, Events & Studio in Chennai" },
      {
        name: "description",
        content:
          "VASMA crafts cinematic brand experiences across Digitx, Events and Studio. Nine years of premium creative direction in Chennai.",
      },
      { property: "og:title", content: "VASMA — Luxury Digitx, Events & Studio" },
      {
        property: "og:description",
        content: "Cinematic brand experiences across Digitx, Events and Studio.",
      },
      { property: "og:image", content: "/vasma/hero.jpg" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/vasma/index.html");
  }, []);
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0D0D0D",
        color: "#C5A572",
        display: "grid",
        placeItems: "center",
        fontFamily: "serif",
        letterSpacing: "0.2em",
      }}
    >
      VASMA
    </div>
  );
}
