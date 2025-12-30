import React, { useEffect, useState } from "react";

/* =====================================================
   🏛️ ANCIENT THEME
   Greek/Roman inspired portfolio with text on stone tablets
===================================================== */

export default function AncientTheme({ profile }) {
  const [torches, setTorches] = useState([]);

  useEffect(() => {
    // Generate flickering torches
    const newTorches = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: (i * 20) + 10,
    }));
    setTorches(newTorches);
  }, []);

  if (!profile) return null;

  const fullName = `${profile.first_name} ${profile.last_name}`;

  return (
    <>
      {/* ============================================
          GLOBAL STYLES & ANIMATIONS
      ============================================= */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap');

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

        @keyframes flicker {
          0%, 100% { 
            opacity: 1; 
            text-shadow: 0 0 20px #ff6b00, 0 0 40px #ff6b00, 0 0 60px #ff4500;
          }
          25% { 
            opacity: 0.8; 
            text-shadow: 0 0 15px #ff6b00, 0 0 30px #ff6b00, 0 0 45px #ff4500;
          }
          50% { 
            opacity: 0.9; 
            text-shadow: 0 0 25px #ff6b00, 0 0 45px #ff6b00, 0 0 65px #ff4500;
          }
          75% { 
            opacity: 0.85; 
            text-shadow: 0 0 18px #ff6b00, 0 0 35px #ff6b00, 0 0 50px #ff4500;
          }
        }

        @keyframes dust {
          0% {
            transform: translateY(100vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-20vh) translateX(30px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes carve {
          0% {
            transform: scale(0.95);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes crumble {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }

        @keyframes glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(218, 165, 32, 0.3), inset 0 0 20px rgba(218, 165, 32, 0.1);
          }
          50% { 
            box-shadow: 0 0 40px rgba(218, 165, 32, 0.5), inset 0 0 30px rgba(218, 165, 32, 0.2);
          }
        }

        @keyframes hieroglyph-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }

        @keyframes chisel {
          0% {
            clip-path: inset(0 100% 0 0);
            opacity: 0;
          }
          100% {
            clip-path: inset(0 0 0 0);
            opacity: 1;
          }
        }
      `}</style>

      {/* ============================================
          ANCIENT TEMPLE BACKGROUND
      ============================================= */}
      <div style={S.temple}>
        {/* Stone texture overlay */}
        <div style={S.stoneTexture}></div>

        {/* Floating dust particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            style={{
              ...S.dust,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}

        {/* Torches along the top */}
        <div style={S.torchContainer}>
          {torches.map((torch) => (
            <div key={torch.id} style={{ ...S.torch, left: `${torch.left}%` }}>
              🔥
            </div>
          ))}
        </div>

        {/* Decorative hieroglyphs */}
        <div style={S.hieroglyphLeft}>𓀀</div>
        <div style={S.hieroglyphRight}>𓂀</div>

        {/* ============================================
            CONTENT CONTAINER
        ============================================= */}
        <div style={S.container}>
          {/* Header Tablet */}
          <div style={S.header}>
            <div style={S.headerBorder}>
              <div style={S.headerPattern}>◈ ◈ ◈</div>
              <h1 style={S.name}>{fullName}</h1>
              <div style={S.title}>SCRIBE OF THE DIGITAL REALM</div>
              <div style={S.subtitle}>{profile.summary}</div>
              
              {/* Contact inscriptions */}
              <div style={S.inscriptions}>
                {profile.contact.email && (
                  <div style={S.inscription}>
                    <span style={S.runeIcon}>✉</span>
                    {profile.contact.email}
                  </div>
                )}
                {profile.contact.phone && (
                  <div style={S.inscription}>
                    <span style={S.runeIcon}>☎</span>
                    {profile.contact.phone}
                  </div>
                )}
                {profile.contact.address?.city && (
                  <div style={S.inscription}>
                    <span style={S.runeIcon}>⌖</span>
                    {profile.contact.address.city}
                  </div>
                )}
              </div>

              {/* Sacred links */}
              {profile.links?.length > 0 && (
                <div style={S.sacredLinks}>
                  {profile.links.map((link, i) => (
                    <a key={i} href={link.url} style={S.sacredLink}>
                      ⟡ {link.name}
                    </a>
                  ))}
                </div>
              )}
              
              <div style={S.headerPattern}>◈ ◈ ◈</div>
            </div>
          </div>

          {/* Work Experience */}
          {profile.work_experiences?.length > 0 && (
            <Section title="CHRONICLES OF LABOR" symbol="⚒">
              {profile.work_experiences.map((work, i) => (
                <Tablet
                  key={i}
                  title={work.job_title}
                  subtitle={work.employer}
                  date={`${work.date.start} - ${work.date.ongoing ? "PRESENT" : work.date.end}`}
                  location={work.location}
                  description={work.description}
                  bullets={work.bullets}
                />
              ))}
            </Section>
          )}

          {/* Education */}
          {profile.education?.length > 0 && (
            <Section title="HALLS OF WISDOM" symbol="📜">
              {profile.education.map((edu, i) => (
                <Tablet
                  key={i}
                  title={edu.degree}
                  subtitle={edu.school_name}
                  date={`${edu.date.start} - ${edu.date.ongoing ? "PRESENT" : edu.date.end}`}
                  location={edu.location}
                  description={edu.education_description}
                  extras={[
                    edu.gpa && `Excellence: ${edu.gpa}`,
                    edu.majors?.length > 0 && `Focus: ${edu.majors.join(", ")}`,
                    edu.awards?.length > 0 && `Honors: ${edu.awards.join(", ")}`,
                  ].filter(Boolean)}
                />
              ))}
            </Section>
          )}

          {/* Projects */}
          {profile.extra_experiences?.length > 0 && (
            <Section title="LEGENDARY QUESTS" symbol="⚔">
              {profile.extra_experiences.map((exp, i) => (
                <Tablet
                  key={i}
                  title={exp.name}
                  subtitle={exp.role}
                  date={exp.date ? `${exp.date.start} - ${exp.date.ongoing ? "PRESENT" : exp.date.end}` : ""}
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
            <Section title="ANCIENT ARTS" symbol="✦">
              <div style={S.skillsGrid}>
                {profile.skills.map((skill, i) => (
                  <div key={i} style={S.skillRune}>
                    <div style={S.runeTop}>⬡</div>
                    <div style={S.skillName}>{skill.name}</div>
                    {skill.level && (
                      <div style={S.skillMastery}>
                        {skill.level === "expert" ? "MASTER" : skill.level === "advanced" ? "ADEPT" : "NOVICE"}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Custom Sections */}
          {profile.custom_sections?.map((section, idx) => (
            <Section key={idx} title={section.name.toUpperCase()} symbol="◇">
              {section.type === "certifications" && section.elements?.map((elem, i) => (
                <div key={i} style={S.seal}>
                  <span style={S.sealIcon}>⚜</span>
                  <div>
                    <strong style={S.sealTitle}>{elem.name}</strong> — {elem.issuer}
                    {elem.credential_id && <div style={S.sealId}>Seal: {elem.credential_id}</div>}
                  </div>
                </div>
              ))}
              
              {section.type === "languages" && (
                <div style={S.langGrid}>
                  {section.elements?.map((elem, i) => (
                    <div key={i} style={S.langStone}>
                      <div style={S.langName}>{elem.name}</div>
                      <div style={S.langProf}>{elem.proficiency}</div>
                    </div>
                  ))}
                </div>
              )}
              
              {section.type === "awards" && section.elements?.map((elem, i) => (
                <div key={i} style={S.trophy}>
                  <span style={S.trophyIcon}>👑</span>
                  <div>
                    <strong style={S.trophyTitle}>{elem.name}</strong>
                    <div style={S.trophyGiver}>{elem.issuer}</div>
                  </div>
                </div>
              ))}
              
              {section.type === "publications" && section.elements?.map((elem, i) => (
                <div key={i} style={S.scroll}>
                  <span style={S.scrollIcon}>📖</span>
                  <div>
                    <strong style={S.scrollTitle}>{elem.name}</strong>
                    {elem.authors && <div style={S.scrollScribe}>Scribed by: {elem.authors.join(", ")}</div>}
                  </div>
                </div>
              ))}
            </Section>
          ))}

          {/* Footer */}
          <div style={S.footer}>
            <div style={S.footerDivider}>◈ ◈ ◈ ◈ ◈</div>
            <div style={S.footerText}>THUS ENDS THE CHRONICLE</div>
            <div style={S.footerSymbol}>⚱</div>
          </div>
        </div>
      </div>
    </>
  );
}

/* =====================================================
   SECTION COMPONENT
===================================================== */

function Section({ title, symbol, children }) {
  return (
    <div style={S.section}>
      <div style={S.sectionHeader}>
        <span style={S.sectionSymbol}>{symbol}</span>
        <h2 style={S.sectionTitle}>{title}</h2>
        <span style={S.sectionSymbol}>{symbol}</span>
      </div>
      <div style={S.sectionContent}>{children}</div>
    </div>
  );
}

/* =====================================================
   TABLET COMPONENT
===================================================== */

function Tablet({ title, subtitle, date, location, description, bullets, extras, link }) {
  return (
    <div style={S.tablet}>
      {/* Stone tablet texture with carved text effect */}
      <div style={S.tabletStone}>
        <div style={S.tabletCorner1}>◢</div>
        <div style={S.tabletCorner2}>◣</div>
        <div style={S.tabletCorner3}>◤</div>
        <div style={S.tabletCorner4}>◥</div>
        
        <div style={S.tabletHeader}>
          <div>
            <h3 style={S.tabletTitle}>{title}</h3>
            {subtitle && <div style={S.tabletSubtitle}>{subtitle}</div>}
          </div>
          {date && <div style={S.tabletDate}>{date}</div>}
        </div>

        {location && <div style={S.tabletLocation}>⌖ {location}</div>}
        {description && <p style={S.tabletDesc}>{description}</p>}

        {bullets?.length > 0 && (
          <ul style={S.runeList}>
            {bullets.map((b, i) => (
              <li key={i} style={S.runeItem}>{b}</li>
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
          <a href={link} style={S.tabletLink}>
            ⟶ Examine Artifact
          </a>
        )}
      </div>
    </div>
  );
}

/* =====================================================
   STYLES
===================================================== */

const S = {
  temple: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #2a1a0f 0%, #3d2817 50%, #2a1a0f 100%)",
    position: "relative",
    overflow: "hidden",
  },

  stoneTexture: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      repeating-linear-gradient(90deg, transparent 0px, rgba(139, 90, 43, 0.03) 1px, transparent 2px, transparent 20px),
      repeating-linear-gradient(0deg, transparent 0px, rgba(139, 90, 43, 0.03) 1px, transparent 2px, transparent 20px)
    `,
    pointerEvents: "none",
    zIndex: 1,
  },

  dust: {
    position: "fixed",
    width: "3px",
    height: "3px",
    background: "rgba(218, 165, 32, 0.4)",
    borderRadius: "50%",
    animation: "dust linear infinite",
    pointerEvents: "none",
    zIndex: 2,
  },

  torchContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "100px",
    pointerEvents: "none",
    zIndex: 3,
  },

  torch: {
    position: "absolute",
    top: "30px",
    fontSize: "40px",
    animation: "flicker 2s ease-in-out infinite",
    filter: "drop-shadow(0 0 10px rgba(255, 107, 0, 0.8))",
  },

  hieroglyphLeft: {
    position: "fixed",
    left: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "60px",
    color: "rgba(218, 165, 32, 0.2)",
    animation: "hieroglyph-float 6s ease-in-out infinite",
    pointerEvents: "none",
    zIndex: 1,
  },

  hieroglyphRight: {
    position: "fixed",
    right: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "60px",
    color: "rgba(218, 165, 32, 0.2)",
    animation: "hieroglyph-float 6s ease-in-out infinite 3s",
    pointerEvents: "none",
    zIndex: 1,
  },

  container: {
    position: "relative",
    zIndex: 10,
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "80px 20px 100px",
  },

  header: {
    background: "linear-gradient(135deg, #c9a961 0%, #d4af6a 50%, #c9a961 100%)",
    padding: "4px",
    borderRadius: "8px",
    marginBottom: "60px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6), inset 0 0 40px rgba(0, 0, 0, 0.2)",
    animation: "glow 4s ease-in-out infinite",
  },

  headerBorder: {
    background: "#1a120a",
    padding: "50px 40px",
    borderRadius: "4px",
  },

  headerPattern: {
    textAlign: "center",
    fontSize: "24px",
    color: "#daa520",
    marginBottom: "20px",
    letterSpacing: "20px",
    fontFamily: "'Cinzel', serif",
  },

  name: {
    fontSize: "48px",
    color: "#daa520",
    textAlign: "center",
    marginBottom: "10px",
    fontWeight: "bold",
    letterSpacing: "4px",
    textShadow: "3px 3px 0 rgba(0, 0, 0, 0.8), inset 0 -2px 4px rgba(0,0,0,0.5)",
    animation: "carve 1s ease-out",
    fontFamily: "'Cinzel', serif",
  },

  title: {
    fontSize: "14px",
    color: "#b8942c",
    textAlign: "center",
    marginBottom: "20px",
    letterSpacing: "6px",
    fontWeight: "600",
    fontFamily: "'Cinzel', serif",
  },

  subtitle: {
    fontSize: "17px",
    color: "#d4c5a0",
    textAlign: "center",
    lineHeight: "1.7",
    marginBottom: "30px",
    fontStyle: "italic",
    fontFamily: "'EB Garamond', serif",
  },

  inscriptions: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "24px",
    alignItems: "center",
  },

  inscription: {
    fontSize: "15px",
    color: "#d4c5a0",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontFamily: "'EB Garamond', serif",
  },

  runeIcon: {
    fontSize: "18px",
    color: "#daa520",
  },

  sacredLinks: {
    display: "flex",
    gap: "24px",
    justifyContent: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
  },

  sacredLink: {
    color: "var(--accent, #daa520)",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "600",
    letterSpacing: "1px",
    transition: "color 0.3s",
    fontFamily: "'Cinzel', serif",
  },

  section: {
    marginBottom: "60px",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "40px",
  },

  sectionSymbol: {
    fontSize: "32px",
    color: "#daa520",
    filter: "drop-shadow(0 0 8px rgba(218, 165, 32, 0.6))",
  },

  sectionTitle: {
    fontSize: "32px",
    color: "#daa520",
    fontWeight: "bold",
    letterSpacing: "4px",
    textAlign: "center",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
    fontFamily: "'Cinzel', serif",
  },

  sectionContent: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },

  tablet: {
    animation: "carve 0.6s ease-out",
  },

  tabletStone: {
    background: `
      linear-gradient(135deg, 
        rgba(139, 115, 85, 0.3) 0%, 
        rgba(160, 130, 109, 0.5) 50%, 
        rgba(139, 115, 85, 0.3) 100%
      ),
      repeating-linear-gradient(90deg, 
        transparent 0px, 
        rgba(90, 74, 58, 0.1) 1px, 
        transparent 2px, 
        transparent 5px
      ),
      repeating-linear-gradient(0deg, 
        transparent 0px, 
        rgba(90, 74, 58, 0.1) 1px, 
        transparent 2px, 
        transparent 5px
      ),
      linear-gradient(180deg, #8b7355 0%, #9d8167 50%, #8b7355 100%)
    `,
    padding: "40px",
    borderRadius: "8px",
    boxShadow: `
      0 20px 50px rgba(0, 0, 0, 0.6),
      inset 0 0 30px rgba(0, 0, 0, 0.4),
      inset 0 2px 2px rgba(255, 255, 255, 0.1),
      inset 0 -2px 2px rgba(0, 0, 0, 0.5)
    `,
    position: "relative",
    border: "3px solid #5a4a3a",
    backgroundBlendMode: "multiply, overlay, overlay, normal",
  },

  tabletCorner1: {
    position: "absolute",
    top: "10px",
    left: "10px",
    fontSize: "20px",
    color: "rgba(26, 18, 10, 0.6)",
    textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
  },

  tabletCorner2: {
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "20px",
    color: "rgba(26, 18, 10, 0.6)",
    textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
  },

  tabletCorner3: {
    position: "absolute",
    bottom: "10px",
    left: "10px",
    fontSize: "20px",
    color: "rgba(26, 18, 10, 0.6)",
    textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
  },

  tabletCorner4: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    fontSize: "20px",
    color: "rgba(26, 18, 10, 0.6)",
    textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
  },

  tabletHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "20px",
    gap: "20px",
  },

  tabletTitle: {
    fontSize: "26px",
    color: "#1a120a",
    marginBottom: "8px",
    fontWeight: "bold",
    letterSpacing: "1px",
    textShadow: "2px 2px 0 rgba(212, 175, 106, 0.3), 1px 1px 3px rgba(0,0,0,0.5)",
    fontFamily: "'Cinzel', serif",
  },

  tabletSubtitle: {
    fontSize: "19px",
    color: "#2a1a0f",
    fontWeight: "600",
    textShadow: "1px 1px 2px rgba(212, 175, 106, 0.2)",
    fontFamily: "'EB Garamond', serif",
  },

  tabletDate: {
    fontSize: "13px",
    color: "#2a1a0f",
    fontWeight: "600",
    whiteSpace: "nowrap",
    letterSpacing: "1px",
    textShadow: "1px 1px 1px rgba(0,0,0,0.3)",
    fontFamily: "'Cinzel', serif",
  },

  tabletLocation: {
    fontSize: "15px",
    color: "#2a1a0f",
    marginBottom: "16px",
    textShadow: "1px 1px 1px rgba(0,0,0,0.2)",
    fontFamily: "'EB Garamond', serif",
  },

  tabletDesc: {
    fontSize: "16px",
    color: "#1a120a",
    lineHeight: "1.8",
    marginBottom: "18px",
    textShadow: "1px 1px 1px rgba(212, 175, 106, 0.15)",
    fontFamily: "'EB Garamond', serif",
  },

  runeList: {
    listStyle: "none",
    paddingLeft: 0,
    margin: "18px 0",
  },

  runeItem: {
    fontSize: "15px",
    color: "#1a120a",
    marginBottom: "12px",
    paddingLeft: "28px",
    position: "relative",
    lineHeight: "1.7",
    textShadow: "1px 1px 1px rgba(212, 175, 106, 0.15)",
    fontFamily: "'EB Garamond', serif",
    "&::before": {
      content: '"◆"',
      position: "absolute",
      left: 0,
      color: "#2a1a0f",
    },
  },

  extras: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "18px",
  },

  extra: {
    fontSize: "13px",
    background: "rgba(26, 18, 10, 0.4)",
    padding: "8px 16px",
    borderRadius: "4px",
    color: "#d4c5a0",
    border: "1px solid #5a4a3a",
    textShadow: "1px 1px 1px rgba(0,0,0,0.5)",
    fontFamily: "'EB Garamond', serif",
  },

  tabletLink: {
    display: "inline-block",
    marginTop: "18px",
    color: "var(--accent, #daa520)",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "16px",
    letterSpacing: "1px",
    textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
    fontFamily: "'Cinzel', serif",
  },

  skillsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  },

  skillRune: {
    background: `
      repeating-linear-gradient(90deg, 
        transparent 0px, 
        rgba(90, 74, 58, 0.1) 1px, 
        transparent 2px, 
        transparent 5px
      ),
      repeating-linear-gradient(0deg, 
        transparent 0px, 
        rgba(90, 74, 58, 0.1) 1px, 
        transparent 2px, 
        transparent 5px
      ),
      linear-gradient(135deg, #8b7355 0%, #a0826d 50%, #8b7355 100%)
    `,
    padding: "24px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(0, 0, 0, 0.2)",
    border: "2px solid #5a4a3a",
    animation: "crumble 3s ease-in-out infinite",
  },

  runeTop: {
    fontSize: "28px",
    color: "#2a1a0f",
    marginBottom: "10px",
    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
  },

  skillName: {
    fontSize: "17px",
    color: "#1a120a",
    fontWeight: "600",
    marginBottom: "8px",
    letterSpacing: "1px",
    textShadow: "1px 1px 2px rgba(212, 175, 106, 0.2)",
    fontFamily: "'Cinzel', serif",
  },

  skillMastery: {
    fontSize: "12px",
    color: "#2a1a0f",
    letterSpacing: "2px",
    fontWeight: "bold",
    textShadow: "1px 1px 1px rgba(0,0,0,0.3)",
    fontFamily: "'Cinzel', serif",
  },

  seal: {
    background: `
      repeating-linear-gradient(90deg, 
        transparent 0px, 
        rgba(90, 74, 58, 0.1) 1px, 
        transparent 2px, 
        transparent 5px
      ),
      repeating-linear-gradient(0deg, 
        transparent 0px, 
        rgba(90, 74, 58, 0.1) 1px, 
        transparent 2px, 
        transparent 5px
      ),
      linear-gradient(135deg, #8b7355 0%, #a0826d 50%, #8b7355 100%)
    `,
    padding: "24px",
    borderRadius: "8px",
    marginBottom: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(0, 0, 0, 0.2)",
    border: "2px solid #5a4a3a",
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },

  sealIcon: {
    fontSize: "32px",
    color: "#daa520",
    filter: "drop-shadow(0 0 6px rgba(218, 165, 32, 0.6))",
  },

  sealTitle: {
    fontFamily: "'Cinzel', serif",
    textShadow: "1px 1px 2px rgba(212, 175, 106, 0.2)",
  },

  sealId: {
    fontSize: "13px",
    color: "#2a1a0f",
    marginTop: "6px",
    textShadow: "1px 1px 1px rgba(0,0,0,0.2)",
    fontFamily: "'EB Garamond', serif",
  },

  langGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "16px",
  },

  langStone: {
    background: `
      repeating-linear-gradient(90deg, 
        transparent 0px, 
        rgba(90, 74, 58, 0.1) 1px, 
        transparent 2px, 
        transparent 5px
      ),
      repeating-linear-gradient(0deg, 
        transparent 0px, 
        rgba(90, 74, 58, 0.1) 1px, 
        transparent 2px, 
        transparent 5px
      ),
      linear-gradient(135deg, #8b7355 0%, #a0826d 50%, #8b7355 100%)
    `,
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(0, 0, 0, 0.2)",
    border: "2px solid #5a4a3a",
  },

  langName: {
    fontSize: "17px",
    color: "#1a120a",
    fontWeight: "600",
    marginBottom: "6px",
    textShadow: "1px 1px 2px rgba(212, 175, 106, 0.2)",
    fontFamily: "'Cinzel', serif",
  },

  langProf: {
    fontSize: "13px",
    color: "#2a1a0f",
    textTransform: "uppercase",
    letterSpacing: "1px",
    textShadow: "1px 1px 1px rgba(0,0,0,0.2)",
    fontFamily: "'EB Garamond', serif",
  },

  trophy: {
    background: `
      repeating-linear-gradient(90deg, 
        transparent 0px, 
        rgba(90, 74, 58, 0.1) 1px, 
        transparent 2px, 
        transparent 5px
      ),
      repeating-linear-gradient(0deg, 
        transparent 0px, 
        rgba(90, 74, 58, 0.1) 1px, 
        transparent 2px, 
        transparent 5px
      ),
      linear-gradient(135deg, #8b7355 0%, #a0826d 50%, #8b7355 100%)
    `,
    padding: "24px",
    borderRadius: "8px",
    marginBottom: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(0, 0, 0, 0.2)",
    border: "2px solid #5a4a3a",
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },

  trophyIcon: {
    fontSize: "32px",
    filter: "drop-shadow(0 0 6px rgba(218, 165, 32, 0.6))",
  },

  trophyTitle: {
    fontFamily: "'Cinzel', serif",
    textShadow: "1px 1px 2px rgba(212, 175, 106, 0.2)",
  },

  trophyGiver: {
    fontSize: "14px",
    color: "#2a1a0f",
    marginTop: "6px",
    textShadow: "1px 1px 1px rgba(0,0,0,0.2)",
    fontFamily: "'EB Garamond', serif",
  },

  scroll: {
    background: `
      repeating-linear-gradient(90deg, 
        transparent 0px, 
        rgba(90, 74, 58, 0.1) 1px, 
        transparent 2px, 
        transparent 5px
      ),
      repeating-linear-gradient(0deg, 
        transparent 0px, 
        rgba(90, 74, 58, 0.1) 1px, 
        transparent 2px, 
        transparent 5px
      ),
      linear-gradient(135deg, #8b7355 0%, #a0826d 50%, #8b7355 100%)
    `,
    padding: "24px",
    borderRadius: "8px",
    marginBottom: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(0, 0, 0, 0.2)",
    border: "2px solid #5a4a3a",
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },

  scrollIcon: {
    fontSize: "32px",
  },

  scrollTitle: {
    fontFamily: "'Cinzel', serif",
    textShadow: "1px 1px 2px rgba(212, 175, 106, 0.2)",
  },

  scrollScribe: {
    fontSize: "14px",
    color: "#2a1a0f",
    marginTop: "6px",
    fontStyle: "italic",
    textShadow: "1px 1px 1px rgba(0,0,0,0.2)",
    fontFamily: "'EB Garamond', serif",
  },

  footer: {
    textAlign: "center",
    marginTop: "80px",
  },

  footerDivider: {
    fontSize: "24px",
    color: "#daa520",
    marginBottom: "20px",
    letterSpacing: "20px",
    fontFamily: "'Cinzel', serif",
  },

  footerText: {
    fontSize: "18px",
    color: "#daa520",
    fontWeight: "600",
    letterSpacing: "4px",
    marginBottom: "20px",
    textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
    fontFamily: "'Cinzel', serif",
  },

  footerSymbol: {
    fontSize: "48px",
    color: "#daa520",
    filter: "drop-shadow(0 0 12px rgba(218, 165, 32, 0.6))",
    animation: "crumble 4s ease-in-out infinite",
  },
};