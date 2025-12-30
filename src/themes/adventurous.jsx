import React, { useEffect, useState } from "react";

/* =====================================================
   🐠 UNDERWATER THEME
   Deep sea portfolio with animated fish and bubbles
===================================================== */

export default function AdventurousTheme({ profile }) {
  const [bubbles, setBubbles] = useState([]);
  const [fish, setFish] = useState([]);

  useEffect(() => {
    // Generate random bubbles
    const newBubbles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 30,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 8,
    }));
    setBubbles(newBubbles);

    // Generate random fish
    const newFish = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      top: 10 + Math.random() * 80,
      size: 30 + Math.random() * 40,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 15,
      emoji: ["🐠", "🐟", "🐡", "🦈", "🐙", "🦑", "🐬"][Math.floor(Math.random() * 7)],
    }));
    setFish(newFish);
  }, []);

  if (!profile) return null;

  const fullName = `${profile.first_name} ${profile.last_name}`;

  return (
    <>
      {/* ============================================
          GLOBAL STYLES & ANIMATIONS
      ============================================= */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body, #root {
          width: 100%;
          min-height: 100%;
          overflow-x: hidden;
        }

        @keyframes bubbleRise {
          0% {
            transform: translateY(100vh) translateX(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px) scale(1);
            opacity: 0;
          }
        }

        @keyframes swimAcross {
          0% {
            transform: translateX(-100px) scaleX(1);
          }
          100% {
            transform: translateX(calc(100vw + 100px)) scaleX(1);
          }
        }

        @keyframes wave {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(2deg); }
          75% { transform: translateY(10px) rotate(-2deg); }
        }

        @keyframes seaweed {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }

        @keyframes shimmer {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>

      {/* ============================================
          OCEAN BACKGROUND WITH ANIMATIONS
      ============================================= */}
      <div style={S.ocean}>
        {/* Animated gradient layers */}
        <div style={S.waterLayer1}></div>
        <div style={S.waterLayer2}></div>

        {/* Bubbles */}
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            style={{
              ...S.bubble,
              left: `${bubble.left}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              animationDelay: `${bubble.delay}s`,
              animationDuration: `${bubble.duration}s`,
            }}
          />
        ))}

        {/* Fish swimming across */}
        {fish.map((f) => (
          <div
            key={f.id}
            style={{
              ...S.fish,
              top: `${f.top}%`,
              fontSize: `${f.size}px`,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.duration}s`,
            }}
          >
            {f.emoji}
          </div>
        ))}

        {/* Seaweed decorations */}
        <div style={S.seaweed1}>🌿</div>
        <div style={S.seaweed2}>🌿</div>

        {/* ============================================
            CONTENT CONTAINER
        ============================================= */}
        <div style={S.container}>
          {/* Header Treasure Chest */}
          <div style={S.header}>
            <div style={S.treasure}>💎</div>
            <h1 style={S.name}>{fullName}</h1>
            <div style={S.subtitle}>{profile.summary}</div>

            {/* Contact info as shells */}
            <div style={S.shells}>
              {profile.contact.email && (
                <div style={S.shell}>
                  <span style={S.shellIcon}>🐚</span>
                  {profile.contact.email}
                </div>
              )}
              {profile.contact.phone && (
                <div style={S.shell}>
                  <span style={S.shellIcon}>🐚</span>
                  {profile.contact.phone}
                </div>
              )}
              {profile.contact.address?.city && (
                <div style={S.shell}>
                  <span style={S.shellIcon}>🐚</span>
                  {profile.contact.address.city}
                </div>
              )}
            </div>

            {/* Links as pearls */}
            {profile.links?.length > 0 && (
              <div style={S.pearls}>
                {profile.links.map((link, i) => (
                  <a key={i} href={link.url} style={S.pearl}>
                    ✦ {link.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Work Experience */}
          {profile.work_experiences?.length > 0 && (
            <Section title="🏝️ Career Voyage" icon="⚓">
              {profile.work_experiences.map((work, i) => (
                <Card
                  key={i}
                  title={work.job_title}
                  subtitle={work.employer}
                  date={`${work.date.start} - ${work.date.ongoing ? "Present" : work.date.end}`}
                  location={work.location}
                  description={work.description}
                  bullets={work.bullets}
                />
              ))}
            </Section>
          )}

          {/* Education */}
          {profile.education?.length > 0 && (
            <Section title="📚 Academic Depths" icon="🎓">
              {profile.education.map((edu, i) => (
                <Card
                  key={i}
                  title={edu.degree}
                  subtitle={edu.school_name}
                  date={`${edu.date.start} - ${edu.date.ongoing ? "Present" : edu.date.end}`}
                  location={edu.location}
                  description={edu.education_description}
                  extras={[
                    edu.gpa && `GPA: ${edu.gpa}`,
                    edu.majors?.length > 0 && `Major: ${edu.majors.join(", ")}`,
                    edu.awards?.length > 0 && `Awards: ${edu.awards.join(", ")}`,
                  ].filter(Boolean)}
                />
              ))}
            </Section>
          )}

          {/* Projects */}
          {profile.extra_experiences?.length > 0 && (
            <Section title="🗺️ Expeditions" icon="🧭">
              {profile.extra_experiences.map((exp, i) => (
                <Card
                  key={i}
                  title={exp.name}
                  subtitle={exp.role}
                  date={exp.date ? `${exp.date.start} - ${exp.date.ongoing ? "Present" : exp.date.end}` : ""}
                  location={exp.location}
                  description={exp.description}
                  bullets={exp.bullets}
                  link={exp.link}
                />
              ))}
            </Section>
          )}

          {/* Skills */}
          {profile.skills?.length > 0 && (
            <Section title="🔱 Skills Arsenal" icon="⚔️">
              <div style={S.skillsOcean}>
                {profile.skills.map((skill, i) => (
                  <div key={i} style={S.skillBubble}>
                    <div style={S.skillName}>{skill.name}</div>
                    {skill.level && (
                      <div style={S.skillLevel}>
                        {skill.level === "expert" ? "⭐⭐⭐" : skill.level === "advanced" ? "⭐⭐" : "⭐"}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Custom Sections */}
          {profile.custom_sections?.map((section, idx) => (
            <Section key={idx} title={section.name} icon="🌊">
              {section.type === "certifications" && section.elements?.map((elem, i) => (
                <div key={i} style={S.cert}>
                  <strong>{elem.name}</strong> — {elem.issuer}
                  {elem.credential_id && <div style={S.certId}>ID: {elem.credential_id}</div>}
                </div>
              ))}
              
              {section.type === "languages" && (
                <div style={S.langContainer}>
                  {section.elements?.map((elem, i) => (
                    <span key={i} style={S.langTag}>
                      {elem.name} <span style={S.proficiency}>({elem.proficiency})</span>
                    </span>
                  ))}
                </div>
              )}
              
              {section.type === "awards" && section.elements?.map((elem, i) => (
                <div key={i} style={S.award}>
                  🏆 <strong>{elem.name}</strong> — {elem.issuer}
                </div>
              ))}
              
              {section.type === "publications" && section.elements?.map((elem, i) => (
                <div key={i} style={S.pub}>
                  📖 <strong>{elem.name}</strong>
                  {elem.authors && <div style={S.pubAuthors}>by {elem.authors.join(", ")}</div>}
                </div>
              ))}
            </Section>
          ))}

          {/* Footer */}
          <div style={S.footer}>
            <div style={S.anchor}>⚓</div>
            <div style={S.footerText}>End of Dive</div>
          </div>
        </div>
      </div>
    </>
  );
}

/* =====================================================
   SECTION COMPONENT
===================================================== */

function Section({ title, icon, children }) {
  return (
    <div style={S.section}>
      <h2 style={S.sectionTitle}>
        <span style={S.sectionIcon}>{icon}</span>
        {title}
      </h2>
      <div style={S.sectionContent}>{children}</div>
    </div>
  );
}

/* =====================================================
   CARD COMPONENT
===================================================== */

function Card({ title, subtitle, date, location, description, bullets, extras, link }) {
  return (
    <div style={S.card}>
      <div style={S.cardHeader}>
        <div>
          <h3 style={S.cardTitle}>{title}</h3>
          {subtitle && <div style={S.cardSubtitle}>{subtitle}</div>}
        </div>
        {date && <div style={S.cardDate}>{date}</div>}
      </div>

      {location && <div style={S.cardLocation}>📍 {location}</div>}
      {description && <p style={S.cardDesc}>{description}</p>}

      {bullets?.length > 0 && (
        <ul style={S.bulletList}>
          {bullets.map((b, i) => (
            <li key={i} style={S.bullet}>{b}</li>
          ))}
        </ul>
      )}

      {extras?.length > 0 && (
        <div style={S.extras}>
          {extras.map((e, i) => (
            <span key={i} style={S.extra}>{e}</span>
          ))}
        </div>
      )}

      {link && (
        <a href={link} style={S.cardLink}>
          → Explore Project
        </a>
      )}
    </div>
  );
}

/* =====================================================
   STYLES
===================================================== */

const S = {
  ocean: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0a2463 0%, #1e4d7b 30%, #247ba0 60%, #3da5d9 100%)",
    position: "relative",
    overflow: "hidden",
  },

  waterLayer1: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
    animation: "shimmer 8s ease-in-out infinite",
    pointerEvents: "none",
    zIndex: 1,
  },

  waterLayer2: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(ellipse at 70% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)",
    animation: "shimmer 12s ease-in-out infinite 2s",
    pointerEvents: "none",
    zIndex: 1,
  },

  bubble: {
    position: "fixed",
    background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.2))",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.3)",
    animation: "bubbleRise linear infinite",
    pointerEvents: "none",
    zIndex: 2,
  },

  fish: {
    position: "fixed",
    left: "-100px",
    animation: "swimAcross linear infinite",
    pointerEvents: "none",
    zIndex: 3,
    filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
  },

  seaweed1: {
    position: "fixed",
    bottom: 0,
    left: "10%",
    fontSize: "120px",
    opacity: 0.4,
    animation: "seaweed 4s ease-in-out infinite",
    transformOrigin: "bottom",
    pointerEvents: "none",
    zIndex: 1,
  },

  seaweed2: {
    position: "fixed",
    bottom: 0,
    right: "15%",
    fontSize: "150px",
    opacity: 0.3,
    animation: "seaweed 5s ease-in-out infinite 1s",
    transformOrigin: "bottom",
    pointerEvents: "none",
    zIndex: 1,
  },

  container: {
    position: "relative",
    zIndex: 10,
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "60px 20px 100px",
  },

  header: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    padding: "50px 40px",
    borderRadius: "30px",
    marginBottom: "60px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3), inset 0 -5px 20px rgba(36,123,160,0.2)",
    border: "3px solid rgba(255,255,255,0.5)",
    position: "relative",
    animation: "wave 6s ease-in-out infinite",
  },

  treasure: {
    position: "absolute",
    top: "-30px",
    right: "40px",
    fontSize: "50px",
    animation: "wave 3s ease-in-out infinite",
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
  },

  name: {
    fontSize: "48px",
    color: "#0a2463",
    marginBottom: "16px",
    fontWeight: "bold",
    textShadow: "2px 2px 0 rgba(61,165,217,0.3)",
  },

  subtitle: {
    fontSize: "18px",
    color: "#1e4d7b",
    lineHeight: "1.6",
    marginBottom: "30px",
  },

  shells: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "24px",
  },

  shell: {
    fontSize: "15px",
    color: "#1e4d7b",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  shellIcon: {
    fontSize: "20px",
  },

  pearls: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },

  pearl: {
    color: "var(--accent, #247ba0)",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "600",
    transition: "transform 0.2s",
    display: "inline-block",
  },

  section: {
    marginBottom: "50px",
  },

  sectionTitle: {
    fontSize: "36px",
    color: "#fff",
    marginBottom: "30px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textShadow: "2px 2px 8px rgba(0,0,0,0.4)",
  },

  sectionIcon: {
    fontSize: "40px",
    filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
  },

  sectionContent: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  card: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    padding: "32px",
    borderRadius: "24px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
    border: "2px solid rgba(255,255,255,0.5)",
    transition: "transform 0.3s, box-shadow 0.3s",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "16px",
    gap: "20px",
  },

  cardTitle: {
    fontSize: "26px",
    color: "#0a2463",
    marginBottom: "6px",
    fontWeight: "bold",
  },

  cardSubtitle: {
    fontSize: "18px",
    color: "var(--accent, #247ba0)",
    fontWeight: "600",
  },

  cardDate: {
    fontSize: "14px",
    color: "#1e4d7b",
    opacity: 0.8,
    whiteSpace: "nowrap",
  },

  cardLocation: {
    fontSize: "14px",
    color: "#1e4d7b",
    marginBottom: "14px",
    opacity: 0.9,
  },

  cardDesc: {
    fontSize: "16px",
    color: "#0a2463",
    lineHeight: "1.7",
    marginBottom: "16px",
  },

  bulletList: {
    listStyle: "none",
    paddingLeft: 0,
    margin: "16px 0",
  },

  bullet: {
    fontSize: "15px",
    color: "#0a2463",
    marginBottom: "10px",
    paddingLeft: "28px",
    position: "relative",
    lineHeight: "1.6",
    "&::before": {
      content: '"🐚"',
      position: "absolute",
      left: 0,
    },
  },

  extras: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "16px",
  },

  extra: {
    fontSize: "13px",
    background: "rgba(36,123,160,0.15)",
    padding: "6px 14px",
    borderRadius: "16px",
    color: "#0a2463",
  },

  cardLink: {
    display: "inline-block",
    marginTop: "16px",
    color: "var(--accent, #247ba0)",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "16px",
  },

  skillsOcean: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "16px",
  },

  skillBubble: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    padding: "20px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    border: "2px solid rgba(255,255,255,0.5)",
    animation: "wave 5s ease-in-out infinite",
  },

  skillName: {
    fontSize: "16px",
    color: "#0a2463",
    fontWeight: "600",
    marginBottom: "8px",
  },

  skillLevel: {
    fontSize: "14px",
    color: "#247ba0",
  },

  cert: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: "24px",
    borderRadius: "20px",
    marginBottom: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
  },

  certId: {
    fontSize: "13px",
    color: "#1e4d7b",
    marginTop: "8px",
    opacity: 0.8,
  },

  langContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },

  langTag: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: "14px 22px",
    borderRadius: "20px",
    fontSize: "15px",
    color: "#0a2463",
    boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
  },

  proficiency: {
    color: "#247ba0",
    fontWeight: "600",
  },

  award: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: "20px",
    borderRadius: "20px",
    marginBottom: "16px",
    fontSize: "16px",
    color: "#0a2463",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
  },

  pub: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: "20px",
    borderRadius: "20px",
    marginBottom: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
  },

  pubAuthors: {
    fontSize: "14px",
    color: "#1e4d7b",
    marginTop: "8px",
    fontStyle: "italic",
  },

  footer: {
    textAlign: "center",
    marginTop: "80px",
    color: "#fff",
  },

  anchor: {
    fontSize: "60px",
    marginBottom: "16px",
    animation: "wave 4s ease-in-out infinite",
    display: "inline-block",
    filter: "drop-shadow(2px 2px 8px rgba(0,0,0,0.4))",
  },

  footerText: {
    fontSize: "18px",
    fontWeight: "600",
    textShadow: "2px 2px 6px rgba(0,0,0,0.4)",
  },
};