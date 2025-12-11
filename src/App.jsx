import React, { useEffect, useState } from "react";
import MinimalTheme from "./themes/minimal";
import RetroTheme from "./themes/retro";
import ProfessionalTheme from "./themes/professional";
import MagazineTheme from "./themes/magazine";
import TerminalTheme from "./themes/terminal";


// import DarkMinimalTheme from "./themes/minimal.dark"; // (future)


const THEMES = {
  minimal: MinimalTheme,
  retro: RetroTheme,
  professional: ProfessionalTheme,
  magazine: MagazineTheme,
  terminal: TerminalTheme,
};




// ✅ REGISTER ALL 10 JSON FILES
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

export default function App() {
  const [jsonPath, setJsonPath] = useState(JSON_OPTIONS[0].path);
  const [profile, setProfile] = useState(null);
  const [color, setColor] = useState("#6366f1");
  const [open, setOpen] = useState(true);

  // ✅ NEW: THEME STATE
  const [theme, setTheme] = useState("minimal");
  const ActiveTheme = THEMES[theme];

  // ✅ LOAD JSON DYNAMICALLY
  useEffect(() => {
    fetch(jsonPath)
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error("JSON Load Error:", err));
  }, [jsonPath]);

  if (!profile) return <div style={{ padding: 40 }}>Loading profile...</div>;

  return (
    <>
      {/* ✅ CONTROL POPUP */}
      {open && (
        <div style={S.popup}>
          <div style={S.popupHeader}>
            <strong>Portfolio Controls</strong>
            <button onClick={() => setOpen(false)} style={S.closeBtn}>✕</button>
          </div>

          {/* ✅ THEME SELECT */}
          <label style={S.label}>Theme</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)} style={S.select}>
            {Object.keys(THEMES).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* ✅ ACCENT COLOR */}
          <label style={S.label}>Accent Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={S.color}
          />

          {/* ✅ SAMPLE JSON SELECT */}
          <label style={S.label}>Sample Profile</label>
          <select value={jsonPath} onChange={(e) => setJsonPath(e.target.value)} style={S.select}>
            {JSON_OPTIONS.map((j) => (
              <option key={j.path} value={j.path}>
                {j.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* ✅ OPEN BUTTON */}
      {!open && (
        <button onClick={() => setOpen(true)} style={S.openBtn}>
          ⚙ Customize
        </button>
      )}

      {/* ✅ ACTIVE THEME RENDER */}
      <div style={{ "--accent": color }}>
        <ActiveTheme profile={profile} />
      </div>
    </>
  );
}

/* ✅ POPUP STYLES */
const S = {
  popup: {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "#fff",
    borderRadius: "16px",
    padding: "16px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    zIndex: 9999,
    width: "260px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  popupHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "6px",
  },
  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "16px",
    cursor: "pointer",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
  },
  select: {
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  color: {
    height: "36px",
    border: "none",
    background: "none",
    padding: 0,
  },
  openBtn: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "12px 16px",
    borderRadius: "999px",
    border: "none",
    background: "#000",
    color: "#fff",
    cursor: "pointer",
    zIndex: 9999,
  },
};
