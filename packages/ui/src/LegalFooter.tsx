import React from "react";

const footerStyle: React.CSSProperties = {
  background: "#0d1117",
  color: "rgba(255,255,255,0.6)",
  padding: "1.5rem",
  marginTop: "auto",
};

const containerStyle: React.CSSProperties = {
  maxWidth: "1100px",
  margin: "0 auto",
};

const disclaimerBoxStyle: React.CSSProperties = {
  borderTop: "1px solid rgba(255,255,255,0.1)",
  paddingTop: "1rem",
  marginBottom: "0.75rem",
  fontSize: "0.78rem",
  lineHeight: "1.7",
  color: "rgba(255,255,255,0.55)",
};

const bottomRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap" as const,
  gap: "0.5rem",
  fontSize: "0.8rem",
};

const termsLinkStyle: React.CSSProperties = {
  color: "#60a5fa",
  textDecoration: "none",
  fontSize: "0.8rem",
};

export function LegalFooter() {
  return (
    <footer style={footerStyle} aria-label="Legal footer">
      <div style={containerStyle}>
        <div style={disclaimerBoxStyle}>
          <strong style={{ color: "rgba(255,255,255,0.8)" }}>
            Copyright Notice:
          </strong>{" "}
          © Textbook content belongs exclusively to its respective authors and
          authorities. Lessons here are provided solely as enhancement. It is
          assumed that students have purchased the official textbooks and have a
          legitimate right to study from them. IIS Academy only delivers
          supplementary content and does not reproduce copyrighted material
          without license.
        </div>
        <div style={bottomRowStyle}>
          <span>
            © {new Date().getFullYear()} IIS Academy. All rights reserved.
          </span>
          <span>
            <a href="/terms" style={termsLinkStyle}>
              Terms &amp; Conditions
            </a>
            {" · "}
            <a href="https://iisacademy.com" style={termsLinkStyle}>
              iisacademy.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
