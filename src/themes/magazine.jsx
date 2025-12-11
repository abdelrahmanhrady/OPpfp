import React from "react";

/* =====================================================
   ✅ EDITORIAL / MAGAZINE THEME
   ✅ PRINT-STYLE LUXURY PUBLICATION
   ✅ JSON-BIBLE COMPLIANT
===================================================== */

export default function MagazineTheme({ profile }) {
  if (!profile) return null;

  const fullName = `${profile.first_name} ${profile.last_name}`;

  return (
    <>
      {/* ✅ GLOBAL RESET (REMOVES WHITE BORDER) */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body, #root {
          width: 100%;
          height: 100%;
          background: #f9f9f9;
          overflow-x: hidden;
        }
      `}</style>

      <div style={S.page}>
        {/* ✅ HERO COVER */}
        <header style={S.hero}>
          <h1 style={S.title}>{fullName}</h1>
          <div style={S.rule} />
          <p style={S.subtitle}>{profile.summary}</p>
        </header>

        {/* ✅ META STRIP */}
        <section style={S.meta}>
          <span>{profile.contact?.email}</span>
          {profile.contact?.phone && <span>{profile.contact.phone}</span>}
          {profile.contact?.address?.city && (
            <span>{profile.contact.address.city}</span>
          )}
        </section>

        {/* ✅ TWO COLUMN EDITORIAL BODY */}
        <main style={S.columns}>
          {/* ✅ LEFT COLUMN */}
          <div style={S.col}>
            {/* ✅ WORK EXPERIENCE */}
            {profile.work_experiences?.length > 0 && (
              <Article title="Experience">
                {profile.work_experiences.map((w, i) => (
                  <div key={i} style={S.entry}>
                    <h3 style={S.entryTitle}>{w.job_title}</h3>
                    <div style={S.entryMeta}>
                      {w.employer} • {w.date.start} —{" "}
                      {w.date.ongoing ? "Present" : w.date.end}
                    </div>
                    <p>{w.description}</p>
                  </div>
                ))}
              </Article>
            )}

            {/* ✅ EDUCATION */}
            {profile.education?.length > 0 && (
              <Article title="Education">
                {profile.education.map((e, i) => (
                  <div key={i} style={S.entry}>
                    <h3 style={S.entryTitle}>{e.degree}</h3>
                    <div style={S.entryMeta}>{e.school_name}</div>
                    <div>{e.location}</div>
                  </div>
                ))}
              </Article>
            )}
          </div>

          {/* ✅ RIGHT COLUMN */}
          <div style={S.col}>
            {/* ✅ SKILLS */}
            {profile.skills?.length > 0 && (
              <Article title="Skills">
                <div style={S.skillGrid}>
                  {profile.skills.map((s, i) => (
                    <span key={i} style={S.skill}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </Article>
            )}

            {/* ✅ PROJECTS */}
            {profile.extra_experiences?.length > 0 && (
              <Article title="Selected Works">
                {profile.extra_experiences.map((p, i) => (
                  <div key={i} style={S.entry}>
                    <h3 style={S.entryTitle}>{p.name}</h3>
                    {p.description && <p>{p.description}</p>}
                    {p.link && (
                      <a href={p.link} style={S.link}>
                        View Project →
                      </a>
                    )}
                  </div>
                ))}
              </Article>
            )}

            {/* ✅ CUSTOM SECTIONS */}
            {profile.custom_sections?.map((section, i) => (
              <Article key={i} title={section.name}>
                {section.elements.map((el, j) => (
                  <div key={j} style={S.entry}>
                    <h3 style={S.entryTitle}>{el.name}</h3>
                    {el.description && <p>{el.description}</p>}
                  </div>
                ))}
              </Article>
            ))}
          </div>
        </main>

        {/* ✅ FOOTER */}
        <footer style={S.footer}>
          © {new Date().getFullYear()} {fullName} • Editorial Portfolio
        </footer>
      </div>
    </>
  );
}

/* ✅ ARTICLE WRAPPER */
function Article({ title, children }) {
  return (
    <section style={S.article}>
      <h2 style={S.articleTitle}>{title}</h2>
      {children}
    </section>
  );
}

/* =========================
   ✅ MAGAZINE STYLES
========================= */

const S = {
  page: {
    fontFamily: `"Playfair Display", "Times New Roman", serif`,
    background: "#f9f9f9",
    color: "#111",
    minHeight: "100vh",
  },

  hero: {
    padding: "100px 20px 60px",
    textAlign: "center",
    background: "#fff",
  },

  title: {
    fontSize: "64px",
    fontWeight: "700",
    letterSpacing: "-1px",
    lineHeight: 1,
  },

  rule: {
    width: "140px",
    height: "4px",
    background: "var(--accent)",
    margin: "26px auto",
  },

  subtitle: {
    maxWidth: "760px",
    margin: "0 auto",
    fontSize: "18px",
    lineHeight: 1.7,
    opacity: 0.75,
  },

  meta: {
    display: "flex",
    justifyContent: "center",
    gap: "32px",
    fontSize: "13px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    padding: "12px 20px",
    borderTop: "1px solid #ddd",
    borderBottom: "1px solid #ddd",
    background: "#fff",
  },

  columns: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "60px",
    padding: "80px",
    maxWidth: "1400px",
    margin: "0 auto",
  },

  col: {
    display: "flex",
    flexDirection: "column",
    gap: "60px",
  },

  article: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  articleTitle: {
    fontSize: "26px",
    fontWeight: "700",
    borderBottom: "3px solid var(--accent)",
    paddingBottom: "10px",
  },

  entry: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    fontSize: "15px",
    lineHeight: 1.6,
  },

  entryTitle: {
    fontSize: "18px",
    fontWeight: "700",
  },

  entryMeta: {
    fontSize: "12px",
    opacity: 0.7,
  },

  skillGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },

  skill: {
    fontSize: "13px",
    padding: "6px 14px",
    border: "1px solid var(--accent)",
  },

  link: {
    marginTop: "6px",
    fontSize: "13px",
    color: "var(--accent)",
    textDecoration: "none",
  },

  footer: {
    textAlign: "center",
    padding: "40px 20px",
    borderTop: "1px solid #ddd",
    fontSize: "13px",
    background: "#fff",
  },
};
