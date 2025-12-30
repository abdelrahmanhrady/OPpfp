import React, { useRef } from "react";

export default function MagazineTheme({ profile }) {
  if (!profile) return null;

  const fullName = `${profile.first_name ?? ""} ${profile.last_name ?? ""}`;
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({ left: direction * width, behavior: "smooth" });
  };

  return (
    <div style={S.page}>
      {/* Navbar */}
      <nav style={S.nav}>{fullName}</nav>

      {/* Hero */}
      <header style={S.hero}>
        <h1 style={{ ...S.title, color: "var(--accent)" }}>{fullName}</h1>
        {profile.summary && <p style={S.subtitle}>{profile.summary}</p>}
      </header>

      {/* Horizontal Scroll Flipbook */}
      <div style={S.containerWrapper}>
        <button style={S.navButton} onClick={() => scroll(-1)}>←</button>
        <div style={S.container} ref={scrollRef}>
          {/* Work Experience */}
          {profile.work_experiences?.length > 0 && (
            <Section title="Work Experience">
              {profile.work_experiences.map((w, i) => (
                <Card key={i}>
                  <strong>{w.job_title}</strong> — {w.employer}
                  <div style={S.meta}>
                    {w.date?.start} – {w.date?.ongoing ? "Present" : w.date?.end}
                    {w.location ? ` · ${w.location}` : ""}
                  </div>
                  {w.description && <p>{w.description}</p>}
                  {w.bullets?.length > 0 && (
                    <ul>{w.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
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
                  <div style={S.meta}>
                    {e.location} · GPA {e.gpa}
                  </div>
                  {e.education_description && <p>{e.education_description}</p>}
                  {e.awards?.length > 0 && (
                    <ul>{e.awards.map((a, j) => <li key={j}>{a}</li>)}</ul>
                  )}
                  {e.courses?.length > 0 && (
                    <p><em>Courses:</em> {e.courses.join(", ")}</p>
                  )}
                </Card>
              ))}
            </Section>
          )}

          {/* Extra Experiences */}
          {profile.extra_experiences?.length > 0 && (
            <Section title="Projects & Activities">
              {profile.extra_experiences.map((x, i) => (
                <Card key={i}>
                  {x.name && <strong>{x.name}</strong>} {x.role ? `— ${x.role}` : ""}
                  {x.date && (
                    <div style={S.meta}>
                      {x.date.start} – {x.date.ongoing ? "Present" : x.date.end}
                      {x.location ? ` · ${x.location}` : ""}
                    </div>
                  )}
                  {x.description && <p>{x.description}</p>}
                  {x.bullets?.length > 0 && (
                    <ul>{x.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
                  )}
                  {x.link && <a href={x.link} target="_blank" rel="noreferrer">Reference →</a>}
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

          {/* Custom Sections */}
          {profile.custom_sections?.length > 0 &&
            profile.custom_sections.map((section, i) => (
              <Section key={i} title={section.name}>
                {section.elements?.map((el, j) => (
                  <Card key={j}>
                    <strong>{el.name}</strong>
                    {el.description && <p>{el.description}</p>}
                    {el.bullets?.length > 0 && (
                      <ul>{el.bullets.map((b, k) => <li key={k}>{b}</li>)}</ul>
                    )}
                    {el.link && <a href={el.link} target="_blank" rel="noreferrer">Reference →</a>}
                  </Card>
                ))}
              </Section>
            ))
          }

          {/* Contact */}
          <Section title="Contact">
            <Card>
              {profile.contact?.email && <div>{profile.contact.email}</div>}
              {profile.contact?.phone && <div>{profile.contact.phone}</div>}
              {profile.contact?.address && (
                <div>
                  {profile.contact.address.line1} {profile.contact.address.line2 ?? ""}
                  {profile.contact.address.city && ` · ${profile.contact.address.city}`}
                  {profile.contact.address.state && `, ${profile.contact.address.state}`}
                  {profile.contact.address.zip && ` ${profile.contact.address.zip}`}
                </div>
              )}
            </Card>
          </Section>
        </div>
        <button style={S.navButton} onClick={() => scroll(1)}>→</button>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section style={S.section}>
      <h2 style={{ ...S.sectionTitle, color: "var(--accent)" }}>{title}</h2>
      <div style={S.sectionGrid}>{children}</div>
    </section>
  );
}

function Card({ children }) {
  return <div style={S.card}>{children}</div>;
}

const S = {
  page: {
    fontFamily: "Georgia, serif",
    background: "#fdfcfb",
    minHeight: "100vh",
    overflow: "hidden",
    position: "relative",
  },
  nav: {
    position: "sticky",
    top: 0,
    padding: "1rem 2rem",
    fontWeight: 600,
    background: "#fff",
    borderBottom: "2px solid #eee",
    zIndex: 5,
  },
  hero: {
    padding: "4rem 2rem",
    textAlign: "center",
  },
  title: {
    fontSize: "3rem",
    fontWeight: 700,
  },
  subtitle: {
    marginTop: "1rem",
    fontSize: "1.2rem",
    color: "#555",
  },
  containerWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    overflow: "hidden",
    position: "relative",
  },
  container: {
    display: "flex",
    overflowX: "auto",
    scrollSnapType: "x mandatory",
    gap: "2rem",
    padding: "2rem",
  },
  navButton: {
    fontSize: "2rem",
    background: "var(--accent)",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: 50,
    height: 50,
    cursor: "pointer",
    flexShrink: 0,
  },
  section: {
    flex: "0 0 80%",
    scrollSnapAlign: "center",
    background: "#fff",
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  sectionGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  card: {
    background: "#f9f9f9",
    padding: "1rem",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
  },
  meta: {
    fontSize: ".85rem",
    color: "#666",
    margin: ".5rem 0",
  },
  skill: {
    display: "inline-block",
    background: "var(--accent)",
    color: "#fff",
    padding: ".5rem 1rem",
    borderRadius: "999px",
    fontSize: ".85rem",
    margin: ".25rem",
  },
};
