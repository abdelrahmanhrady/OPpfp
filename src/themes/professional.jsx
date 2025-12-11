import React from "react";

/* =====================================================
   ✅ DARK PROFESSIONAL / CORPORATE THEME
   ✅ RECRUITER / ENTERPRISE / SAAS STYLE
   ✅ FULL JSON SCHEMA SUPPORT
===================================================== */

export default function ProfessionalTheme({ profile }) {
  if (!profile) return null;

  const fullName = `${profile.first_name} ${profile.last_name}`;

  return (
    <>
        {/* ✅ GLOBAL RESET — REMOVES WHITE PAGE BORDER */}
    <style>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html, body, #root {
        width: 100%;
        height: 100%;
        background: #020617;
        overflow-x: hidden;
      }
    `}</style>
    <div style={S.page}>
      {/* ✅ HEADER */}
      <header style={S.header}>
        <div>
          <h1 style={S.name}>{fullName}</h1>
          <p style={S.subtitle}>{profile.summary}</p>
        </div>

        <div style={S.contact}>
          <div>{profile.contact?.email}</div>
          {profile.contact?.phone && <div>{profile.contact.phone}</div>}
          {profile.contact?.address?.city && (
            <div>
              {profile.contact.address.city}
              {profile.contact.address.state && `, ${profile.contact.address.state}`}
            </div>
          )}
        </div>
      </header>

      {/* ✅ MAIN GRID */}
      <div style={S.grid}>
        {/* ✅ LEFT COLUMN */}
        <aside style={S.sidebar}>
          {/* SKILLS */}
          {profile.skills?.length > 0 && (
            <section style={S.card}>
              <h3 style={S.sectionTitle}>Skills</h3>
              <div style={S.skillGrid}>
                {profile.skills.map((s, i) => (
                  <span key={i} style={S.skill}>
                    {s.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* LINKS */}
          {profile.links?.length > 0 && (
            <section style={S.card}>
              <h3 style={S.sectionTitle}>Links</h3>
              {profile.links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noreferrer" style={S.link}>
                  {l.name}
                </a>
              ))}
            </section>
          )}

          {/* CUSTOM SECTIONS */}
          {profile.custom_sections?.map((section, i) => (
            <section key={i} style={S.card}>
              <h3 style={S.sectionTitle}>{section.name}</h3>
              {section.elements.map((el, j) => (
                <div key={j} style={S.item}>
                  <strong>{el.name}</strong>
                  {el.description && <p>{el.description}</p>}
                </div>
              ))}
            </section>
          ))}
        </aside>

        {/* ✅ RIGHT COLUMN */}
        <main style={S.main}>
          {/* WORK EXPERIENCE */}
          {profile.work_experiences?.length > 0 && (
            <section style={S.card}>
              <h2 style={S.sectionTitle}>Work Experience</h2>
              {profile.work_experiences.map((w, i) => (
                <div key={i} style={S.block}>
                  <div style={S.blockHeader}>
                    <strong>{w.job_title}</strong>
                    <span>
                      {w.date.start} – {w.date.ongoing ? "Present" : w.date.end}
                    </span>
                  </div>
                  <div style={S.muted}>{w.employer} · {w.location}</div>
                  <p>{w.description}</p>
                  {w.bullets?.map((b, j) => (
                    <div key={j}>• {b}</div>
                  ))}
                </div>
              ))}
            </section>
          )}

          {/* PROJECTS / EXTRA */}
          {profile.extra_experiences?.length > 0 && (
            <section style={S.card}>
              <h2 style={S.sectionTitle}>Projects & Activities</h2>
              {profile.extra_experiences.map((p, i) => (
                <div key={i} style={S.block}>
                  <strong>{p.name}</strong>
                  {p.role && ` — ${p.role}`}
                  <p>{p.description}</p>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer" style={S.link}>
                      View →
                    </a>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* EDUCATION */}
          {profile.education?.length > 0 && (
            <section style={S.card}>
              <h2 style={S.sectionTitle}>Education</h2>
              {profile.education.map((e, i) => (
                <div key={i} style={S.block}>
                  <div style={S.blockHeader}>
                    <strong>{e.degree}</strong>
                    <span>
                      {e.date.start} – {e.date.ongoing ? "Present" : e.date.end}
                    </span>
                  </div>
                  <div style={S.muted}>{e.school_name} · {e.location}</div>
                  <div style={S.muted}>GPA: {e.gpa}</div>
                  <p>{e.education_description}</p>
                </div>
              ))}
            </section>
          )}
        </main>
      </div>

      {/* ✅ FOOTER */}
      <footer style={S.footer}>
        © {new Date().getFullYear()} {fullName}
      </footer>
    </div>
    </>
  );
  
}

/* =========================
   ✅ DARK PROFESSIONAL STYLES
========================= */

const S = {
  page: {
    fontFamily: "Inter, Arial, sans-serif",
    background: "#020617",
    color: "#e5e7eb",
    minHeight: "100vh",
  },

  header: {
    background: "rgba(2,6,23,0.95)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    padding: "32px",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px",
  },

  name: {
    fontSize: "32px",
    fontWeight: 800,
    color: "#f8fafc",
  },

  subtitle: {
    marginTop: "8px",
    color: "#94a3b8",
    maxWidth: "600px",
  },

  contact: {
    textAlign: "right",
    fontSize: "14px",
    color: "#cbd5f5",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: "24px",
    padding: "32px",
  },

  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  main: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  card: {
    background: "rgba(255,255,255,0.03)",
    borderRadius: "18px",
    padding: "22px",
    border: "1px solid rgba(255,255,255,0.06)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
  },

  sectionTitle: {
    marginBottom: "16px",
    fontSize: "18px",
    fontWeight: 700,
    borderBottom: "2px solid var(--accent)",
    display: "inline-block",
    paddingBottom: "4px",
    color: "#f1f5f9",
  },

  block: {
    marginBottom: "18px",
  },

  blockHeader: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "15px",
    fontWeight: 600,
    color: "#f8fafc",
  },

  muted: {
    color: "#94a3b8",
    fontSize: "13px",
  },

  item: {
    marginBottom: "10px",
    color: "#cbd5f5",
  },

  skillGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  skill: {
    background: "rgba(255,255,255,0.06)",
    color: "var(--accent)",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 600,
    border: "1px solid rgba(255,255,255,0.15)",
  },

  link: {
    display: "block",
    marginBottom: "6px",
    color: "var(--accent)",
    textDecoration: "none",
    fontWeight: 500,
  },

  footer: {
    textAlign: "center",
    padding: "24px",
    fontSize: "13px",
    color: "#94a3b8",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
};
