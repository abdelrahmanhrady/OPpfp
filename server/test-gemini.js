// api/test-openrouter.js
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

async function callOpenRouter() {
  const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
  
  if (!OPENROUTER_KEY) {
    console.error("Error: OPENROUTER_API_KEY not set in .env");
    return;
  }

  const endpoint = "https://openrouter.ai/api/v1/chat/completions";
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

## 10. OUTPUT FORMAT:
- Return ONLY the complete React component code
- NO markdown code blocks
- NO explanations before or after the code
- NO "Here's the code..." or "This theme features..."
- Just pure, valid JavaScript/JSX code ready to use

Remember: Generate COMPLETE, PRODUCTION-READY code that works immediately when imported. No placeholders, no incomplete sections, no explanations.`;

  const body = {
    model: "google/gemini-2.0-flash-exp:free", // Free Gemini model via OpenRouter
    messages: [
      { role: "system", content: THEME_GENERATION_BIBLE },
      { role: "user", content: "Create a cyberpunk-themed portfolio React component. Make it visually stunning, unique, and professional with smooth animations." }
    ]
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_KEY}`,
        "HTTP-Referer": "http://localhost:3000", // Required by OpenRouter
        "X-Title": "Portfolio Generator" // Optional but recommended
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    console.log("Status:", res.status);
    
    try {
      const data = JSON.parse(text);
      console.log("Response:", JSON.stringify(data, null, 2));
      
      if (data.choices && data.choices[0]) {
        console.log("\n✅ API Working! Message:", data.choices[0].message.content);
      }
    } catch {
      console.error("Non-JSON response:", text);
    }

  } catch (err) {
    console.error("Error calling OpenRouter API:", err);
  }
}

callOpenRouter();