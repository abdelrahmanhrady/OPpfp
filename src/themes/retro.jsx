import React from "react";

/* =====================================================
   ✅ RETRO / OLD-WEBSITE THEME
   ✅ 90s / EARLY-2000s INTERNET STYLE
   ✅ FULLY JSON-BIBLE COMPLIANT
===================================================== */

export default function RetroTheme({ profile }) {
  if (!profile) return null;

  const fullName = `${profile.first_name ?? ""} ${profile.last_name ?? ""}`;

  return (
    <>
      <style>{`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body, #root {
      width: 100%;
      height: 100%;
      background: black;
      overflow-x: hidden;
    }
  `}</style>
    <div style={S.page}>
      {/* ✅ FAKE STAR BACKGROUND */}
      <div style={S.stars} />

      {/* ✅ MARQUEE HEADER */}
      <header style={S.header}>
        <marquee behavior="alternate">
          🚀 Welcome to {fullName}'s Personal Website 🚀
        </marquee>
      </header>

      {/* ✅ MAIN WRAPPER */}
      <div style={S.wrapper}>
        {/* ✅ LEFT SIDEBAR */}
        <aside style={S.sidebar}>
          <div style={S.box}>
            <strong>Navigation</strong>
            <ul>
              <li><a href="#work">Work</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#education">Education</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div style={S.box}>
            <strong>Links</strong>
            {profile.links?.map((l) => (
              <div key={l.url}>
                <a href={l.url} target="_blank" rel="noreferrer">
                  {l.name}
                </a>
              </div>
            ))}
          </div>
        </aside>

        {/* ✅ MAIN CONTENT */}
        <main style={S.content}>
          {/* ✅ HERO */}
          <div style={S.box}>
            <h1>{fullName}</h1>
            {profile.summary && <p>{profile.summary}</p>}
          </div>

          {/* ✅ WORK */}
          {profile.work_experiences?.length > 0 && (
            <section id="work" style={S.box}>
              <h2>Work Experience</h2>
              {profile.work_experiences.map((w, i) => (
                <div key={i} style={S.item}>
                  <strong>{w.job_title}</strong> — {w.employer}
                  <div>{w.date?.start} – {w.date?.ongoing ? "Present" : w.date?.end}</div>
                  <p>{w.description}</p>
                  {w.bullets?.map((b, j) => (
                    <div key={j}>• {b}</div>
                  ))}
                </div>
              ))}
            </section>
          )}

          {/* ✅ PROJECTS */}
          {profile.extra_experiences?.length > 0 && (
            <section id="projects" style={S.box}>
              <h2>Projects & Activities</h2>
              {profile.extra_experiences.map((p, i) => (
                <div key={i} style={S.item}>
                  <strong>{p.name}</strong>
                  {p.role && ` — ${p.role}`}
                  <p>{p.description}</p>
                  {p.link && <a href={p.link}>View Project</a>}
                </div>
              ))}
            </section>
          )}

          {/* ✅ EDUCATION */}
          {profile.education?.length > 0 && (
            <section id="education" style={S.box}>
              <h2>Education</h2>
              {profile.education.map((e, i) => (
                <div key={i} style={S.item}>
                  <strong>{e.degree}</strong> — {e.school_name}
                  <div>{e.location} · GPA {e.gpa}</div>
                  <p>{e.education_description}</p>
                </div>
              ))}
            </section>
          )}

          {/* ✅ SKILLS */}
          {profile.skills?.length > 0 && (
            <section id="skills" style={S.box}>
              <h2>Skills</h2>
              <div>
                {profile.skills.map((s, i) => (
                  <span key={i} style={S.skill}>{s.name}</span>
                ))}
              </div>
            </section>
          )}

          {/* ✅ CUSTOM SECTIONS */}
          {profile.custom_sections?.map((section, i) => (
            <section key={i} style={S.box}>
              <h2>{section.name}</h2>
              {section.elements?.map((el, j) => (
                <div key={j} style={S.item}>
                  <strong>{el.name}</strong>
                  {el.description && <p>{el.description}</p>}
                  {el.bullets?.map((b, k) => (
                    <div key={k}>• {b}</div>
                  ))}
                  {el.link && <a href={el.link}>More Info</a>}
                </div>
              ))}
            </section>
          ))}

          {/* ✅ CONTACT */}
          <section id="contact" style={S.box}>
            <h2>Contact</h2>
            <div>Email: {profile.contact?.email}</div>
            {profile.contact?.phone && <div>Phone: {profile.contact.phone}</div>}
            {profile.contact?.address?.city && (
              <div>
                Location: {profile.contact.address.city}
                {profile.contact.address.state && `, ${profile.contact.address.state}`}
              </div>
            )}
          </section>
        </main>
      </div>

      {/* ✅ FOOTER */}
      <footer style={S.footer}>
        © {new Date().getFullYear()} {fullName} — Best viewed in 1024×768 😎
      </footer>
    </div>
    </>
  );
}

/* =========================
   ✅ RETRO STYLES
========================= */

const S = {
  page: {
    fontFamily: "Courier New, monospace",
    background: "black",
    color: "#00ff00",
    minHeight: "100vh",
  },

  stars: {
    position: "fixed",
    inset: 0,
    background:
      "radial-gradient(white 1px, transparent 1px), black",
    backgroundSize: "20px 20px",
    opacity: 0.15,
    zIndex: 0,
  },

  header: {
    background: "linear-gradient(to right, red, yellow, lime, cyan, blue, magenta)",
    color: "black",
    padding: "10px",
    fontWeight: "bold",
  },

  wrapper: {
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    gap: "12px",
    padding: "12px",
    position: "relative",
    zIndex: 1,
  },

  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  box: {
    border: "2px solid var(--accent)",
    padding: "10px",
    background: "#001100",
  },

  item: {
    borderTop: "1px dashed #00ff00",
    paddingTop: "8px",
    marginTop: "8px",
  },

  skill: {
    display: "inline-block",
    border: "1px solid #00ff00",
    padding: "4px 8px",
    margin: "4px",
  },

  footer: {
    textAlign: "center",
    padding: "20px",
    fontSize: "12px",
    borderTop: "2px solid #00ff00",
  },
};
