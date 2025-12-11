import React from "react";

/* =========================================================
   ✅ MINIMAL STRUCTURED THEME
   ✅ JSON BIBLE FULLY ENFORCED
   ✅ SAFE AGAINST MISSING DATA
   ✅ GEOMETRIC BACKGROUND SYSTEM
========================================================= */

export default function MinimalTheme({ profile }) {
  if (!profile) return null;

  const fullName = `${profile.first_name ?? ""} ${profile.last_name ?? ""}`;

  return (
    <div style={S.page}>
      {/* ✅ GEOMETRIC BACKGROUND */}
      <div style={S.bgCircle} />
      <div style={S.bgSquare} />
      <div style={S.bgTriangle} />

      {/* ✅ NAVBAR */}
      <nav style={S.nav}>
        <strong>{fullName}</strong>
      </nav>

      {/* ✅ HERO */}
      <header style={S.hero}>
        <div style={S.heroCard}>
          <h1 style={S.heroTitle}>{fullName}</h1>
          {profile.summary && <p style={S.subtitle}>{profile.summary}</p>}

          {profile.links?.length > 0 && (
            <div style={S.linkRow}>
              {profile.links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
                  {l.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      <main style={S.container}>
        {/* ✅ WORK EXPERIENCE */}
        {profile.work_experiences?.length > 0 && (
          <Section title="Work Experience">
            {profile.work_experiences.map((w, i) => (
              <Card key={i}>
                <strong>{w.job_title}</strong> — {w.employer}
                <div style={S.meta}>
                  {w.date?.start} – {w.date?.ongoing ? "Present" : w.date?.end}
                </div>
                <p>{w.description}</p>
                {w.bullets?.length > 0 && (
                  <ul>
                    {w.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                )}
              </Card>
            ))}
          </Section>
        )}

        {/* ✅ PROJECTS / EXTRA EXPERIENCE */}
        {profile.extra_experiences?.length > 0 && (
          <Section title="Projects & Activities">
            {profile.extra_experiences.map((p, i) => (
              <Card key={i}>
                <strong>{p.name}</strong> {p.role && `— ${p.role}`}
                <p>{p.description}</p>
                {p.link && <a href={p.link} target="_blank" rel="noreferrer">View →</a>}
              </Card>
            ))}
          </Section>
        )}

        {/* ✅ EDUCATION */}
        {profile.education?.length > 0 && (
          <Section title="Education">
            {profile.education.map((e, i) => (
              <Card key={i}>
                <strong>{e.degree}</strong> — {e.school_name}
                <div style={S.meta}>{e.location} · GPA {e.gpa}</div>
                <p>{e.education_description}</p>
              </Card>
            ))}
          </Section>
        )}

        {/* ✅ SKILLS */}
        {profile.skills?.length > 0 && (
          <Section title="Skills">
            {profile.skills.map((s, i) => (
              <span key={i} style={S.skill}>{s.name}</span>
            ))}
          </Section>
        )}

        {/* ✅ CUSTOM SECTIONS */}
        {profile.custom_sections?.map((section, i) => (
          <Section key={i} title={section.name}>
            {section.elements?.map((el, j) => (
              <Card key={j}>
                <strong>{el.name}</strong>
                {el.description && <p>{el.description}</p>}
                {el.bullets?.length > 0 && (
                  <ul>
                    {el.bullets.map((b, k) => <li key={k}>{b}</li>)}
                  </ul>
                )}
                {el.link && <a href={el.link} target="_blank" rel="noreferrer">Reference →</a>}
              </Card>
            ))}
          </Section>
        ))}

        {/* ✅ CONTACT */}
        <Section title="Contact">
          <Card>
            <div>{profile.contact?.email}</div>
            {profile.contact?.phone && <div>{profile.contact.phone}</div>}
            {profile.contact?.address?.city && (
              <div>
                {profile.contact.address.city}
                {profile.contact.address.state && `, ${profile.contact.address.state}`}
              </div>
            )}
          </Card>
        </Section>
      </main>

      <footer style={S.footer}>
        © {new Date().getFullYear()} {fullName}
      </footer>
    </div>
  );
}

/* =========================
   ✅ REUSABLE COMPONENTS
========================= */

function Section({ title, children }) {
  return (
    <section style={S.section}>
      <h2 style={S.sectionTitle}>{title}</h2>
      <div style={S.sectionGrid}>{children}</div>
    </section>
  );
}

function Card({ children }) {
  return <div style={S.card}>{children}</div>;
}

/* =========================
   ✅ THEME STYLES
========================= */

const S = {
  page: {
    fontFamily: "Inter, system-ui, sans-serif",
    background: "linear-gradient(180deg, #f9fafb, #f3f4f6)",
    minHeight: "100vh",
    position: "relative",
    overflowX: "hidden",
    color: "#0f172a",
  },

  /* ✅ BACKGROUND SHAPES */
  bgCircle: {
    position: "fixed",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background: "radial-gradient(circle, var(--accent), #e0f2fe)",
    top: "-120px",
    left: "-140px",
    zIndex: 0,
    opacity: 0.18,
  },
  bgSquare: {
    position: "fixed",
    width: "300px",
    height: "300px",
    background: "linear-gradient(135deg, #ede9fe, var(--accent))",
    top: "30%",
    right: "-120px",
    transform: "rotate(12deg)",
    zIndex: 0,
    opacity: 0.15,
  },
  bgTriangle: {
    position: "fixed",
    width: 0,
    height: 0,
    borderLeft: "180px solid transparent",
    borderRight: "180px solid transparent",
    borderTop: "300px solid #dcfce7",
    bottom: "-140px",
    left: "30%",
    zIndex: 0,
    opacity: 0.25,
  },

  nav: {
    position: "sticky",
    top: 0,
    zIndex: 5,
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid #e5e7eb",
    padding: "1rem 2rem",
  },

  hero: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "7rem 1.5rem 4rem",
    position: "relative",
    zIndex: 1,
  },

  heroCard: {
    background: "white",
    padding: "3rem",
    borderRadius: "24px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 30px 80px rgba(0,0,0,0.08)",
    maxWidth: "720px",
  },

  heroTitle: {
    fontSize: "3rem",
    lineHeight: 1.1,
  },

  subtitle: {
    marginTop: "1rem",
    color: "#475569",
    lineHeight: 1.6,
  },

  linkRow: {
    marginTop: "1.4rem",
    display: "flex",
    gap: "1.4rem",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "2rem 1.5rem",
    position: "relative",
    zIndex: 1,
  },

  section: { marginBottom: "4rem" },

  sectionTitle: {
    fontSize: "1.6rem",
    marginBottom: "1.5rem",
  },

  sectionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
  },

  card: {
    background: "white",
    padding: "1.75rem",
    borderRadius: "20px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 18px 60px rgba(0,0,0,0.06)",
  },

  meta: {
    fontSize: ".85rem",
    color: "#64748b",
    margin: ".5rem 0",
  },

  skill: {
    background: "white",
    padding: ".55rem 1rem",
    borderRadius: "999px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    fontSize: ".85rem",
  },

  footer: {
    textAlign: "center",
    padding: "3rem 1.5rem",
    fontSize: ".85rem",
    color: "#64748b",
  },
};
