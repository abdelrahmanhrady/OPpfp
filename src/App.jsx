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
  const [color, setColor] = useState("#6366f1");
  const [open, setOpen] = useState(true);

  /* =========================
     AI THEME GENERATOR STATE
  ========================= */
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiCode, setAiCode] = useState("");
  const [aiThemeComponent, setAiThemeComponent] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [babelLoaded, setBabelLoaded] = useState(false);

  /* =========================
     LOAD BABEL DYNAMICALLY
  ========================= */
  useEffect(() => {
    // Check if Babel is already loaded
    if (window.Babel) {
      setBabelLoaded(true);
      return;
    }

    // Load Babel standalone
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@babel/standalone/babel.min.js';
    script.async = true;
    script.onload = () => {
      console.log("✅ Babel loaded successfully");
      setBabelLoaded(true);
    };
    script.onerror = () => {
      console.error("❌ Failed to load Babel");
      setError("Failed to load Babel transpiler");
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

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

    // Check if Babel is loaded
    if (!babelLoaded) {
      setError("Babel is still loading, please wait a moment and try again...");
      return;
    }

    setGenerating(true);
    setAiCode("");
    setAiThemeComponent(null);
    setError(null);

    try {
      console.log("=== AI Theme Generation Started ===");
      console.log("Prompt:", aiPrompt);

      // Get API key from environment variable
      const OPENROUTER_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
      
      if (!OPENROUTER_KEY) {
        setError("API key not found. Add VITE_OPENROUTER_API_KEY to your .env file");
        setGenerating(false);
        return;
      }
      
      console.log("✅ API key loaded from environment");

      const THEME_GENERATION_BIBLE = `You are an expert React developer specializing in creating stunning, animated portfolio themes.

# CRITICAL RULES - FOLLOW EXACTLY:

## 1. CODE STRUCTURE
- Generate a COMPLETE, WORKING React component
- Must be a default export: export default function ThemeName({ profile })
- Use inline styles ONLY (const S = {...})
- NO external CSS files or styled-components
- NO imports except React hooks (useState, useEffect if needed)

## 2. REQUIRED COMPONENT STRUCTURE
\`\`\`javascript
import React, { useEffect, useState } from "react";

export default function YourTheme({ profile }) {
  if (!profile) return null;
  
  const fullName = \`\${profile.first_name} \${profile.last_name}\`;
  
  return (
    <>
      <style>{\`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body, #root { width: 100%; min-height: 100%; overflow-x: hidden; }
        
        @keyframes yourAnimation {
          0% { /* start */ }
          100% { /* end */ }
        }
      \`}</style>
      
      <div style={S.container}>
        {/* Your theme content */}
      </div>
    </>
  );
}

const S = {
  container: {
    minHeight: "100vh",
    // ... styles
  },
  // ... more styles
};
\`\`\`

## 3. PROFILE DATA STRUCTURE - USE THESE FIELDS:
\`\`\`javascript
profile = {
  first_name, last_name,
  contact: { email, phone, address: { city, state, zip, line1, line2 } },
  links: [{ name, url }],
  summary: "text",
  work_experiences: [{ 
    job_title, employer, date: {start, end, ongoing}, 
    location, description, bullets: []
  }],
  education: [{
    degree, school_name, date: {start, end, ongoing},
    location, majors: [], minors: [], gpa, education_description
  }],
  extra_experiences: [{
    name, role, type, date: {start, end, ongoing},
    location, description, bullets: [], link
  }],
  skills: [{ name, category, level, years_experience }],
  custom_sections: [{
    type, name, elements: [...]
  }]
}
\`\`\`

## 4. ALWAYS RENDER THESE SECTIONS (if data exists):
1. Header with name, summary, contact info, links
2. Work Experience section
3. Education section
4. Projects/Extra Experiences section
5. Skills section
6. Custom sections (certifications, languages, awards, publications)
7. Footer

## 5. STYLING REQUIREMENTS:
- Use CSS-in-JS with inline styles object
- Support accent color via: \`var(--accent, #fallback)\`
- Include rich animations using @keyframes in <style> tag
- Make it visually STUNNING and UNIQUE
- Add hover effects, transitions, animations
- Ensure responsive design (works on mobile)
- Use creative layouts, not boring vertical lists

## 6. ANIMATION EXAMPLES:
- Floating elements: translateY with ease-in-out
- Fading in: opacity 0 to 1
- Sliding: translateX
- Rotating: rotate(360deg)
- Pulsing: scale transforms
- Background animations: gradient shifts
- Parallax effects
- Particle systems (if theme appropriate)

## 7. THEME INSPIRATION - BE CREATIVE:
- Use metaphors (underwater, space, ancient, cyberpunk, nature)
- Add atmospheric elements (particles, gradients, textures)
- Include decorative icons and emojis for visual interest
- Layer backgrounds for depth
- Use shadows and lighting effects
- Add texture overlays for realism

## 8. CODE QUALITY:
- Clean, readable code with comments
- Organized style object with logical grouping
- Reusable sub-components (Section, Card, etc.)
- Proper null checks (if !profile.work_experiences?.length)
- No console.logs or debug code
- No placeholder text like "TODO" or "Add content here"

## 9. FORBIDDEN - NEVER DO THESE:
- ❌ NO localStorage or sessionStorage
- ❌ NO external API calls
- ❌ NO file imports except React hooks
- ❌ NO CSS modules or external stylesheets
- ❌ NO incomplete code or placeholders
- ❌ NO "..." or truncated sections
- ❌ NO libraries except React (no lodash, no three.js unless specifically requested)
🚨 NEVER render raw objects in JSX.
🚨 NEVER do: <div>{object}</div>
🚨 When rendering arrays of objects, ALWAYS render explicit properties
(e.g. name, description, bullets), never the object itself.
🚨 custom_sections.elements are OBJECTS, not strings.


## 10. OUTPUT FORMAT:
- Return ONLY the complete React component code
- NO markdown code blocks
- NO explanations before or after the code
- NO "Here's the code..." or "This theme features..."
- Just pure, valid JavaScript/JSX code ready to use

Remember: Generate COMPLETE, PRODUCTION-READY code that works immediately when imported. No placeholders, no incomplete sections, no explanations.`;

      const requestBody = {
        model: "google/gemini-3-pro-preview",
        messages: [
          { role: "system", content: THEME_GENERATION_BIBLE },
          { role: "user", content: `Create a ${aiPrompt}-themed portfolio React component. Make it visually stunning, unique, and professional with smooth animations.` }
        ]
      };

      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENROUTER_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "Portfolio Generator"
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("API error response:", text);
        setError(`API error: ${res.status} - ${text}`);
        setGenerating(false);
        return;
      }

      const data = await res.json();
      console.log("=== API Response Received ===");
      console.log("Full API data:", data);

      // Extract the generated code from the response
      let generatedCode = data.choices?.[0]?.message?.content || "";
      
      if (!generatedCode) {
        setError("No code generated by API");
        setGenerating(false);
        return;
      }
      
      console.log("Raw generated code (first 500 chars):", generatedCode.substring(0, 500));
      console.log("Raw generated code (last 500 chars):", generatedCode.substring(generatedCode.length - 500));
      
      // Clean up the code - remove markdown code blocks more thoroughly
      generatedCode = generatedCode
        .replace(/```javascript\n?/gi, '')
        .replace(/```jsx\n?/gi, '')
        .replace(/```js\n?/gi, '')
        .replace(/```\n?/g, '')
        .trim();
      
      // Check if it starts with valid code
      if (!generatedCode.includes('import React') && !generatedCode.includes('function') && !generatedCode.includes('export')) {
        console.error("❌ Generated code doesn't look like valid React component");
        console.error("Full cleaned code:", generatedCode);
        setError("API returned invalid code format. Check console for details.");
        setGenerating(false);
        return;
      }
      
      console.log("✅ Cleaned code length:", generatedCode.length);
      console.log("Cleaned code (first 300 chars):", generatedCode.substring(0, 300));
      setAiCode(generatedCode);

      // Convert the code string into a usable React component
      if (generatedCode) {
        try {
          console.log("=== Attempting to create component ===");
          const ComponentFromCode = createComponentFromCode(generatedCode);
          console.log("✅ Component created:", ComponentFromCode);
          
          setAiThemeComponent(() => ComponentFromCode);
          setTheme("ai-generated"); // Switch to AI theme
          console.log("✅ AI Theme component set and theme switched");
        } catch (err) {
          console.error("❌ Error creating component:", err);
          console.error("Error stack:", err.stack);
          setError("Failed to compile generated theme: " + err.message);
        }
      }

    } catch (err) {
      console.error("❌ Generation Error:", err);
      console.error("Error stack:", err.stack);
      setError("Failed to generate theme: " + err.message);
    }

    setGenerating(false);
    console.log("=== AI Theme Generation Finished ===");
  }

  /* =========================
     CREATE COMPONENT FROM CODE STRING - USING BABEL
  ========================= */
  function createComponentFromCode(code) {
    try {
      console.log("=== Creating Component from Code ===");
      console.log("Original code length:", code.length);
      console.log("First 300 chars:", code.substring(0, 300));
      
      // Clean up markdown code blocks more aggressively
      let cleanCode = code
        .replace(/```javascript\n?/gi, '')
        .replace(/```jsx\n?/gi, '')
        .replace(/```js\n?/gi, '')
        .replace(/```\n?/g, '')
        .trim();
      
      // Remove any HTML tags that might have been included
      if (cleanCode.includes('<html') || cleanCode.includes('<!DOCTYPE')) {
        console.error("❌ Code contains HTML document structure");
        throw new Error("Generated code appears to be HTML, not React component");
      }
      
      // Remove import statements as they won't work in eval
      cleanCode = cleanCode.replace(/import\s+React\s*,?\s*\{[^}]*\}\s+from\s+['"]react['"];?/gi, '');
      cleanCode = cleanCode.replace(/import\s+\{[^}]*\}\s+from\s+['"]react['"];?/gi, '');
      cleanCode = cleanCode.replace(/import\s+React\s+from\s+['"]react['"];?/gi, '');
      
      console.log("After import cleanup, first 300 chars:", cleanCode.substring(0, 300));
      
      // Extract the component function name
      const componentMatch = cleanCode.match(/export\s+default\s+function\s+(\w+)/);
      const componentName = componentMatch ? componentMatch[1] : 'GeneratedTheme';
      
      console.log("Detected component name:", componentName);
      
      if (!componentName) {
        throw new Error("Could not find component name in generated code");
      }
      
      // Replace export default with just function definition
      cleanCode = cleanCode.replace(/export\s+default\s+function/g, 'function');
      
      console.log("Final clean code (first 300 chars):", cleanCode.substring(0, 300));
      console.log("Final clean code (last 300 chars):", cleanCode.substring(cleanCode.length - 300));
      
      // Check if Babel is available (loaded from CDN)
      if (typeof window.Babel === 'undefined') {
        console.error("❌ Babel is not loaded!");
        throw new Error("Babel transpiler is required but not loaded. Add Babel standalone script to your HTML.");
      }
      
      // Transform JSX to regular JavaScript using Babel
      console.log("🔄 Transforming JSX with Babel...");
      const transformed = window.Babel.transform(cleanCode, {
        presets: ['react']
      });
      
      console.log("✅ JSX transformed successfully");
      console.log("Transformed code (first 300 chars):", transformed.code.substring(0, 300));
      
      // Create a function that returns the component
      const componentFunction = new Function(
        'React', 
        'useState', 
        'useEffect', 
        `
        "use strict";
        try {
          ${transformed.code}
          if (typeof ${componentName} === 'undefined') {
            throw new Error('Component ${componentName} was not defined');
          }
          return ${componentName};
        } catch (error) {
          console.error('Error in generated component code:', error);
          throw error;
        }
        `
      );
      
      // Execute and get the component
      const Component = componentFunction(React, useState, useEffect);
      console.log("✅ Component created successfully:", Component);
      console.log("Component type:", typeof Component);
      console.log("Component name:", Component.name);
      
      if (typeof Component !== 'function') {
        throw new Error('Generated component is not a function');
      }
      
      return Component;
    } catch (err) {
      console.error("❌ Error in createComponentFromCode:", err);
      console.error("Error stack:", err.stack);
      
      // Provide helpful error message if Babel is not loaded
      if (err.message.includes('Babel')) {
        throw new Error(`Babel transpiler required. Add this to your index.html:\n<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>`);
      }
      
      throw new Error(`Component compilation failed: ${err.message}`);
    }
  }

  /* =========================
     COPY CODE TO CLIPBOARD
  ========================= */
  function copyToClipboard() {
    if (aiCode) {
      navigator.clipboard.writeText(aiCode).then(() => {
        alert("Code copied to clipboard!");
      }).catch(err => {
        console.error("Failed to copy:", err);
      });
    }
  }

  /* =========================
     DOWNLOAD CODE AS FILE
  ========================= */
  function downloadCode() {
    if (aiCode) {
      const themeName = aiPrompt.trim().replace(/\s+/g, '') || 'Generated';
      const blob = new Blob([aiCode], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${themeName}Theme.jsx`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  /* =========================
     DETERMINE ACTIVE THEME
  ========================= */
  const ActiveTheme = theme === "ai-generated" && aiThemeComponent 
    ? aiThemeComponent 
    : THEMES[theme] || MinimalTheme;

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
            {aiThemeComponent && (
              <option value="ai-generated">🤖 AI Generated</option>
            )}
          </select>

          <label style={S.label}>Accent Color</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={S.color} />

          <label style={S.label}>Sample Profile</label>
          <select value={jsonPath} onChange={(e) => setJsonPath(e.target.value)} style={S.select}>
            {JSON_OPTIONS.map((j) => (
              <option key={j.path} value={j.path}>{j.name}</option>
            ))}
          </select>

          <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '16px 0' }} />

          <label style={S.label}>🤖 AI Theme Generator</label>
          <textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="e.g. cyberpunk terminal, luxury magazine, brutalist grid, space galaxy, steampunk vintage"
            style={S.textarea}
          />

          <button 
            onClick={generateTheme} 
            disabled={generating || !aiPrompt.trim() || !babelLoaded} 
            style={{
              ...S.aiButton,
              opacity: (generating || !aiPrompt.trim() || !babelLoaded) ? 0.5 : 1,
              cursor: (generating || !aiPrompt.trim() || !babelLoaded) ? 'not-allowed' : 'pointer'
            }}
          >
            {!babelLoaded ? "⏳ Loading..." : generating ? "🎨 Generating…" : "✨ Generate Theme"}
          </button>

          {error && (
            <div style={S.errorBox}>
              ⚠️ {error}
            </div>
          )}

          {aiCode && (
            <div style={S.successBox}>
              <div style={S.successHeader}>
                <span>✅ Theme Generated!</span>
                <div style={S.buttonRow}>
                  <button onClick={copyToClipboard} style={S.smallBtn} title="Copy code">
                    📋
                  </button>
                  <button onClick={downloadCode} style={S.smallBtn} title="Download as file">
                    💾
                  </button>
                </div>
              </div>
              <pre style={S.codePreview}>{aiCode.substring(0, 500)}...</pre>
              <div style={{ fontSize: 11, color: '#666', marginTop: 4 }}>
                {aiCode.length} characters generated
              </div>
            </div>
          )}
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
    width: 320,
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
    marginBottom: 8,
  },
  closeBtn: { 
    border: "none", 
    background: "transparent", 
    fontSize: 18, 
    cursor: "pointer",
    padding: 4,
    lineHeight: 1,
  },
  label: { 
    fontSize: 13, 
    fontWeight: 600,
    marginTop: 4,
  },
  select: { 
    padding: 8, 
    borderRadius: 8, 
    border: "1px solid #ddd",
    fontSize: 13,
  },
  color: { 
    height: 40, 
    width: '100%',
    border: "1px solid #ddd",
    borderRadius: 8,
    cursor: 'pointer',
  },
  textarea: { 
    padding: 10, 
    borderRadius: 8, 
    border: "1px solid #ddd", 
    minHeight: 80, 
    resize: "vertical", 
    fontSize: 13,
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  aiButton: { 
    padding: 12, 
    borderRadius: 10, 
    border: "none", 
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff", 
    cursor: "pointer", 
    fontWeight: 600,
    fontSize: 14,
    transition: 'all 0.3s',
  },
  errorBox: {
    background: '#fee',
    border: '1px solid #fcc',
    borderRadius: 8,
    padding: 10,
    fontSize: 12,
    color: '#c00',
  },
  successBox: {
    background: '#efe',
    border: '1px solid #cfc',
    borderRadius: 8,
    padding: 10,
  },
  successHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    fontSize: 13,
    fontWeight: 600,
    color: '#060',
  },
  buttonRow: {
    display: 'flex',
    gap: 6,
  },
  smallBtn: {
    border: 'none',
    background: '#fff',
    padding: '4px 8px',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 14,
    transition: 'transform 0.2s',
  },
  codePreview: { 
    fontSize: 10, 
    background: "#1e1e1e", 
    color: "#d4d4d4", 
    padding: 10, 
    borderRadius: 6, 
    maxHeight: 150, 
    overflow: "auto", 
    whiteSpace: "pre-wrap",
    fontFamily: 'Consolas, Monaco, monospace',
  },
  openBtn: { 
    position: "fixed", 
    bottom: 20, 
    right: 20, 
    padding: "12px 16px", 
    borderRadius: 999, 
    border: "none", 
    background: "#000", 
    color: "#fff", 
    cursor: "pointer", 
    zIndex: 9999,
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    fontWeight: 600,
  },
};