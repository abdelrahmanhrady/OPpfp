import React, { useEffect, useState } from "react";

export default function CyberpunkTheme({ profile }) {
  if (!profile) return null;

  const fullName = `${profile.first_name} ${profile.last_name}`;

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');

          * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Roboto Mono', monospace; }
          html, body, #root { width: 100%; min-height: 100%; overflow-x: hidden; background-color: #111; color: #eee; }        

          @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
          }

          @keyframes neon {
            0% { text-shadow: 0 0 5px var(--accent, #0ff), 0 0 10px var(--accent, #0ff), 0 0 20px var(--accent, #0ff); }       
            50% { text-shadow: 0 0 2px var(--accent, #0ff), 0 0 5px var(--accent, #0ff), 0 0 10px var(--accent, #0ff); }       
            100% { text-shadow: 0 0 5px var(--accent, #0ff), 0 0 10px var(--accent, #0ff), 0 0 20px var(--accent, #0ff); }     
          }

          .glitch {
            animation: glitch 0.5s steps(2, end) infinite;
          }

          .neon {
            animation: neon 2s ease-in-out infinite alternate;
          }

          .fade-in {
            animation: fadeIn 1s ease-in-out forwards;
          }

          @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
          }

          .slide-in-left {
              animation: slideInLeft 1s ease-out forwards;
          }

          @keyframes slideInLeft {
              from {
                  transform: translateX(-100%);
                  opacity: 0;
              }
              to {
                  transform: translateX(0);
                  opacity: 1;
              }
          }
        `}
      </style>

      <div style={S.container}>
        <header style={S.header}>
          <div style={S.headerContent}>
            <h1 style={{ ...S.name, ...S.neon }} className="glitch">{fullName}</h1>
            <p style={S.summary} className="fade-in">{profile.summary}</p>
            <div style={S.contactInfo} className="fade-in">
              <a href={`mailto:${profile.contact.email}`} style={S.contactLink}>Email</a>
              <span> | </span>
              <span>{profile.contact.phone}</span>
              {profile.links && profile.links.map((link, i) => (
                <a key={i} href={link.url} style={S.contactLink} target="_blank" rel="noopener noreferrer">
                  <span> | </span>
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </header>

        <section style={S.section}>
          <h2 style={{...S.sectionTitle, ...S.neon}}>Work Experience</h2>
          {profile.work_experiences?.map((work, i) => (
            <div key={i} style={S.card} className="slide-in-left">
              <h3 style={S.cardTitle}>{work.job_title}</h3>
              <p style={S.cardSubtitle}>{work.employer} | {work.date.start} - {work.date.end || 'Present'}</p>
              <p style={S.cardDescription}>{work.description}</p>
              {work.bullets?.map((bullet, j) => (
                <li key={j} style={S.bullet}>{bullet}</li>
              ))}
            </div>
          ))}
        </section>

        <section style={S.section}>
          <h2 style={{...S.sectionTitle, ...S.neon}}>Education</h2>
          {profile.education?.map((edu, i) => (
            <div key={i} style={S.card} className="slide-in-left">
              <h3 style={S.cardTitle}>{edu.degree}</h3>
              <p style={S.cardSubtitle}>{edu.school_name} | {edu.date.start} - {edu.date.end || 'Present'}</p>
              <p style={S.cardDescription}>{edu.education_description}</p>
            </div>
          ))}
        </section>

        <section style={S.section}>
          <h2 style={{...S.sectionTitle, ...S.neon}}>Projects/Extra Experiences</h2>
          {profile.extra_experiences?.map((exp, i) => (
            <div key={i} style={S.card} className="slide-in-left">
              <h3 style={S.cardTitle}>{exp.name}</h3>
              <p style={S.cardSubtitle}>{exp.role} | {exp.date.start} - {exp.date.end || 'Present'}</p>
              <p style={S.cardDescription}>{exp.description}</p>
              {exp.link && (
                <a href={exp.link} style={S.projectLink} target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              )}
            </div>
          ))}
        </section>

        <section style={S.section}>
          <h2 style={{...S.sectionTitle, ...S.neon}}>Skills</h2>
          <div style={S.skillsContainer}>
            {profile.skills?.map((skill, i) => (
              <div key={i} style={S.skillItem}>
                <span style={S.skillName}>{skill.name}</span>
                <div style={S.skillBar}>
                  <div style={{ ...S.skillLevel, width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

         {profile.custom_sections?.map((section, idx) => (
            <section key={idx} style={S.section}>
              <h2 style={{...S.sectionTitle, ...S.neon}}>{section.name}</h2>
              {section.elements.map((element, i) => (
                <div key={i} style={S.card} className="slide-in-left">
                    {element.title && (<h3 style={S.cardTitle}>{element.title}</h3>)}
                    {element.subtitle && (<p style={S.cardSubtitle}>{element.subtitle}</p>)}
                    {element.description && (<p style={S.cardDescription}>{element.description}</p>)}
                    {element.link && (<a href={element.link} style={S.projectLink} target="_blank" rel="noopener noreferrer">View</a>)}
                </div>
              ))}
            </section>
          ))}

        <footer style={S.footer}>
          <p style={S.footerText}>
            &copy; {new Date().getFullYear()} {fullName}. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}

const S = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    background: "#111",
    color: "#eee",
  },
  header: {
    background: "#222",
    padding: "40px",
    marginBottom: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
  },
  headerContent: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  name: {
    fontSize: "3em",
    fontWeight: "700",
    marginBottom: "10px",
    color: "var(--accent, #0ff)",
    textShadow: "0 0 5px var(--accent, #0ff), 0 0 10px var(--accent, #0ff), 0 0 20px var(--accent, #0ff)",
  },
  summary: {
    fontSize: "1.2em",
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  contactInfo: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    fontSize: "0.9em",
    color: "#aaa",
  },
  contactLink: {
    color: "var(--accent, #0ff)",
    textDecoration: "none",
    transition: "color 0.3s ease",
    ":hover": {
      color: "#fff",
    },
  },
  section: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "2em",
    fontWeight: "700",
    marginBottom: "20px",
    color: "var(--accent, #0ff)",
    borderBottom: "2px solid var(--accent, #0ff)",
    paddingBottom: "5px",
    textShadow: "0 0 3px var(--accent, #0ff)",
  },
  card: {
    background: "#222",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    ":hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
    },
  },
  cardTitle: {
    fontSize: "1.5em",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#ddd",
  },
  cardSubtitle: {
    fontSize: "0.9em",
    color: "#aaa",
    marginBottom: "10px",
  },
  cardDescription: {
    fontSize: "1em",
    lineHeight: "1.5",
    color: "#ccc",
  },
  bullet: {
    fontSize: "1em",
    lineHeight: "1.5",
    color: "#ccc",
    listStyleType: "square",
    marginLeft: "20px",
  },
  projectLink: {
    display: "inline-block",
    padding: "10px 20px",
    background: "var(--accent, #0ff)",
    color: "#111",
    textDecoration: "none",
    borderRadius: "5px",
    marginTop: "15px",
    transition: "background 0.3s ease, color 0.3s ease",
    ":hover": {
      background: "#fff",
      color: "#000",
    },
  },
  skillsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  skillItem: {
    width: "calc(50% - 20px)",
    marginBottom: "15px",
  },
  skillName: {
    fontSize: "1.1em",
    fontWeight: "500",
    color: "#eee",
    marginBottom: "5px",
    display: "block",
  },
  skillBar: {
    background: "#333",
    height: "8px",
    borderRadius: "4px",
    overflow: "hidden",
  },
  skillLevel: {
    background: "var(--accent, #0ff)",
    height: "8px",
    borderRadius: "4px",
    width: "0",
    transition: "width 0.5s ease",
  },
  footer: {
    background: "#222",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "30px",
    textAlign: "center",
    boxShadow: "0 -2px 4px rgba(0,0,0,0.3)",
  },
  footerText: {
    fontSize: "0.8em",
    color: "#aaa",
  },
  neon: {
      textShadow: "0 0 5px var(--accent, #0ff), 0 0 10px var(--accent, #0ff), 0 0 20px var(--accent, #0ff)",
  }
};