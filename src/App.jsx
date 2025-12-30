import React, { useEffect, useState } from "react";
import MinimalTheme from "./themes/minimal";
import ProfessionalTheme from "./themes/professional";
import MagazineTheme from "./themes/magazine";
import TerminalTheme from "./themes/terminal";
import HackerHUDTheme from "./themes/hacker";
import RetroTheme from "./themes/retro";
import NatureTheme from "./themes/nature";
import AdventurousTheme from "./themes/adventurous";
import BookTheme from "./themes/book";
import AncientTheme from "./themes/ancient";

/* =====================================================
   THEME REGISTRY
===================================================== */
const THEMES = {
  minimal: MinimalTheme,
  professional: ProfessionalTheme,
  magazine: MagazineTheme,
  terminal: TerminalTheme,
  hacker: HackerHUDTheme,
  retro: RetroTheme,
  nature: NatureTheme,
  adventurous: AdventurousTheme,
  book: BookTheme,
  ancient: AncientTheme,
};

/* =====================================================
   SAMPLE JSON FILES
===================================================== */
const JSON_OPTIONS = [
  { name: "Sample 1", path: "/src/data/sample1.json" },
  { name: "Sample 2", path: "/src/data/sample2.json" },
  { name: "Sample 3", path: "/src/data/sample3.json" },
  { name: "Sample 4", path: "/src/data/sample4.json" },
  { name: "Sample 5", path: "/src/data/sample5.json" },
  { name: "Sample 6", path: "/src/data/sample6.json" },
  { name: "Sample 7", path: "/src/data/sample7.json" },
  { name: "Sample 8", path: "/src/data/sample8.json" },
  { name: "Sample 9", path: "/src/data/sample9.json" },
  { name: "Sample 10", path: "/src/data/sample10.json" },
];

/* =====================================================
   APP
===================================================== */
export default function App() {
  const [jsonPath, setJsonPath] = useState(JSON_OPTIONS[0].path);
  const [profile, setProfile] = useState(null);

  const [theme, setTheme] = useState("minimal");
  const ActiveTheme = THEMES[theme];

  const [color, setColor] = useState("#6366f1");
  const [open, setOpen] = useState(true);

  /* =========================
     AI THEME GENERATOR STATE
  ========================= */
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiCode, setAiCode] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  /* =========================
     LOAD PROFILE JSON
  ========================= */
  useEffect(() => {
    setProfile(null);
    setError(null);

    console.log("Loading JSON profile:", jsonPath);

    fetch(jsonPath)
      .then((res) => res.json())
      .then((data) => {
        console.log("Profile data loaded:", data);
        setProfile(data);
      })
      .catch((err) => {
        console.error("JSON Load Error:", err);
        setError("Failed to load JSON profile");
      });
  }, [jsonPath]);

  /* =========================
     AI GENERATE THEME
  ========================= */
  async function generateTheme() {
    if (!aiPrompt.trim()) return;

    setGenerating(true);
    setAiCode("");
    setError(null);

    try {
      console.log("=== AI Theme Generation Started ===");
      console.log("Prompt:", aiPrompt);

      const res = await fetch("http://localhost:3001/api/generate-theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server error response:", text);
        setError("Server error: " + text);
        setGenerating(false);
        return;
      }

      const data = await res.json();
      console.log("Parsed Response Data:", data);

      setAiCode(data.code || "");
    } catch (err) {
      console.error("Generation Error:", err);
      setError("Failed to generate theme: " + err.message);
    }

    setGenerating(false);
    console.log("=== AI Theme Generation Finished ===");
  }

  if (!profile) {
    return <div style={{ padding: 40 }}>Loading profile…</div>;
  }

  return (
    <>
      {open && (
        <div style={S.popup}>
          <div style={S.popupHeader}>
            <strong>Portfolio Controls</strong>
            <button onClick={() => setOpen(false)} style={S.closeBtn}>✕</button>
          </div>

          <label style={S.label}>Theme</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)} style={S.select}>
            {Object.keys(THEMES).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <label style={S.label}>Accent Color</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={S.color} />

          <label style={S.label}>Sample Profile</label>
          <select value={jsonPath} onChange={(e) => setJsonPath(e.target.value)} style={S.select}>
            {JSON_OPTIONS.map((j) => (
              <option key={j.path} value={j.path}>{j.name}</option>
            ))}
          </select>

          <label style={S.label}>AI Theme Generator</label>
          <textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="e.g. cyberpunk terminal, luxury magazine, brutalist grid"
            style={S.textarea}
          />

          <button onClick={generateTheme} disabled={generating} style={S.aiButton}>
            {generating ? "Generating…" : "Generate Theme"}
          </button>

          {error && <div style={{ color: "red", fontSize: 12 }}>{error}</div>}
          {aiCode && <pre style={S.codePreview}>{aiCode}</pre>}
        </div>
      )}

      {!open && (
        <button onClick={() => setOpen(true)} style={S.openBtn}>⚙ Customize</button>
      )}

      <div style={{ "--accent": color }}>
        <ActiveTheme profile={profile} />
      </div>
    </>
  );
}

/* =====================================================
   STYLES
===================================================== */
const S = {
  popup: {
    position: "fixed",
    top: 20,
    right: 20,
    background: "#fff",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    zIndex: 9999,
    width: 280,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    maxHeight: "90vh",
    overflowY: "auto",
  },
  popupHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeBtn: { border: "none", background: "transparent", fontSize: 16, cursor: "pointer" },
  label: { fontSize: 13, fontWeight: 600 },
  select: { padding: 8, borderRadius: 8, border: "1px solid #ddd" },
  color: { height: 36, border: "none", padding: 0 },
  textarea: { padding: 8, borderRadius: 8, border: "1px solid #ddd", minHeight: 70, resize: "vertical", fontSize: 13 },
  aiButton: { padding: 10, borderRadius: 10, border: "none", background: "#000", color: "#fff", cursor: "pointer", fontWeight: 600 },
  codePreview: { fontSize: 11, background: "#111", color: "#0f0", padding: 10, borderRadius: 8, maxHeight: 200, overflow: "auto", whiteSpace: "pre-wrap" },
  openBtn: { position: "fixed", bottom: 20, right: 20, padding: "12px 16px", borderRadius: 999, border: "none", background: "#000", color: "#fff", cursor: "pointer", zIndex: 9999 },
};
