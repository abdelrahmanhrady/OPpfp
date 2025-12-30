import React from "react";

export default function NatureTheme({ profile }) {
  if (!profile) return null;
  const fullName = `${profile.first_name ?? ""} ${profile.last_name ?? ""}`;

  return (
    <div style={S.page}>
      {/* Background Gradients */}
      <div style={S.bgSky} />
      <div style={S.bgGrass} />

      {/* Navbar */}
      <nav style={S.nav}>{fullName}</nav>

      {/* Hero */}
      <header style={S.hero}>
        <h1 style={S.title}>{fullName}</h1>
        {profile.summary && <p style={S.subtitle}>{profile.summary}</p>}
        {profile.links?.length > 0 && (
          <div style={S.linkRow}>
            {profile.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer" style={S.link}>
                {l.name}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Main content */}
      <main style={S.container}>
        {/* Work Experience */}
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
                    {w.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                )}
              </Card>
            ))}
          </Section>
        )}

        {/* Education */}
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

        {/* Skills */}
        {profile.skills?.length > 0 && (
          <Section title="Skills">
            {profile.skills.map((s, i) => (
              <span key={i} style={S.skill}>{s.name}</span>
            ))}
          </Section>
        )}

        {/* Contact */}
        <Section title="Contact">
          <Card>
            {profile.contact?.email && <div>{profile.contact.email}</div>}
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
    </div>
  );
}

/* =========================
   REUSABLE COMPONENTS
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
   THEME STYLES
========================= */
const S = {
  page: { fontFamily: "Inter, system-ui, sans-serif", minHeight: "100vh", position: "relative", overflowX: "hidden" },

  /* Background gradients */
  bgSky: {
    position: "fixed",
    width: "100%",
    height: "50%",
    top: 0,
    left: 0,
    background: "linear-gradient(to bottom, #d0f0fd, #fefefc)",
    zIndex: 0,
  },
  bgGrass: {
    position: "fixed",
    width: "100%",
    height: "50%",
    bottom: 0,
    left: 0,
    background: "linear-gradient(to top, #cdebb0, #fefefc)",
    zIndex: 0,
  },

  nav: {
    position: "sticky",
    top: 0,
    padding: "1rem 2rem",
    fontWeight: 600,
    background: "rgba(255,255,255,0.85)",
    borderBottom: "1px solid #cdebb0",
    borderRadius: "0 0 12px 12px",
    zIndex: 5,
  },

  hero: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "6rem 2rem 4rem",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },

  title: {
    fontSize: "3rem",
    color: "#3a7d44",
  },

  subtitle: {
    marginTop: "1rem",
    color: "#567d6d",
    fontSize: "1.1rem",
  },

  linkRow: {
    marginTop: "1.5rem",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },

  link: {
    color: "#3a7d44",
    textDecoration: "none",
    fontWeight: 600,
  },

  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "2rem 1rem",
    position: "relative",
    zIndex: 1,
  },

  section: { marginBottom: "4rem" },
  sectionTitle: { fontSize: "1.6rem", marginBottom: "1rem", color: "#4a7c59" },
  sectionGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" },

  card: {
    background: "#fdfcf6",
    padding: "1.5rem",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    border: "1px solid #d0f0c0",
  },

  meta: {
    fontSize: ".85rem",
    color: "#567d6d",
    margin: ".5rem 0",
  },

  skill: {
    display: "inline-block",
    padding: ".5rem 1rem",
    borderRadius: "999px",
    background: "#d0f0c0",
    color: "#3a7d44",
    fontSize: ".85rem",
    margin: ".25rem",
  },
};
