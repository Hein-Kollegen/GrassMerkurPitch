import React from "react";

export default function HomePage(): React.ReactElement {
  return (
    <main style={{ minHeight: "100svh", backgroundColor: "#080716", color: "#ffffff" }}>
      <section
        style={{
          position: "relative",
          minHeight: "100svh",
          overflow: "hidden",
          padding: "2.5rem 1.5rem"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(120deg, rgba(9,43,66,0.9), rgba(8,7,22,0.95))"
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
            minHeight: "100svh"
          }}
        >
          <div style={{ paddingTop: "0.5rem" }}>
            <div
              style={{
                width: "10rem",
                height: "2.5rem",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.05)"
              }}
            />
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5rem",
              textAlign: "center"
            }}
          >
            <h1
              style={{
                margin: 0,
                fontFamily: "Raleway, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(3.1rem, 6vw, 5.625rem)",
                textTransform: "uppercase"
              }}
            >
              Das ist kein Pitch.
            </h1>
            <p
              style={{
                margin: 0,
                fontFamily: "Raleway, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(1rem, 1.2vw, 1.25rem)",
                textShadow: "0 10px 20px rgba(0,0,0,0.8)",
                maxWidth: "40rem"
              }}
            >
              Ein System f\u00fcr Wachstum, Umsatz, Mitarbeitergewinnung und
              Planbarkeit f\u00fcr Grass-Merkur.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
