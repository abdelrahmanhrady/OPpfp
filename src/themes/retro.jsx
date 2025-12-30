import React, { useState, useEffect } from "react";

/* =====================================================
   🕹️ RETRO / VINTAGE THEME
   Features:
   - 80s/90s aesthetic with VHS effects
   - CRT monitor simulation
   - Pixel art style badges
   - Retro color palette
   - Scan lines and chromatic aberration
   - Arcade-style cards
   - Neon accents
===================================================== */

export default function RetroTheme({ profile }) {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 8000);

    return () => clearInterval(glitchInterval);
  }, []);

  if (!profile) return null;

  const fullName = `${profile.first_name} ${profile.last_name}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body, #root {
          width: 100%;
          min-height: 100%;
          background: #1a0033;
          overflow-x: hidden;
        }

        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }

        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.95; }
        }

        @keyframes neonGlow {
          0%, 100% { 
            text-shadow: 0 0 10px var(--accent, #ff00ff), 0 0 20px var(--accent, #ff00ff), 0 0 30px var(--accent, #ff00ff);
          }
          50% { 
            text-shadow: 0 0 20px var(--accent, #ff00ff), 0 0 40px var(--accent, #ff00ff), 0 0 60px var(--accent, #ff00ff);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-3px, 3px); }
          40% { transform: translate(-3px, -3px); }
          60% { transform: translate(3px, 3px); }
          80% { transform: translate(3px, -3px); }
          100% { transform: translate(0); }
        }

        @keyframes colorShift {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .scanlines {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
          animation: scanlines 10s linear infinite;
          z-index: 9999;
        }

        .vhs-effect {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background: 
            linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
            linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          background-size: 100% 2px, 3px 100%;
          z-index: 9998;
          animation: flicker 0.15s infinite;
        }

        .pixel-text {
          font-family: 'Press Start 2P', cursive;
          image-rendering: pixelated;
        }

        .retro-text {
          font-family: 'VT323', monospace;
        }
      `}</style>

      <div style={S.page}>
        {/* VHS Effects */}
        <div className="scanlines"></div>
        <div className="vhs-effect"></div>

        {/* Retro Grid Background */}
        <div style={S.gridBackground}></div>

        {/* Main Container */}
        <div style={{
          ...S.container,
          animation: glitchActive ? 'glitch 0.2s' : 'none',
        }}>
          {/* Header / Hero */}
          <header style={S.header}>
            <div style={S.crtFrame}>
              <div style={S.crtScreen}>
                <div style={S.headerContent}>
                  {/* Retro Arcade Badge */}
                  <div style={S.arcadeBadge}>
                    <div style={S.arcadeBadgeInner}>
                      <div className="pixel-text" style={S.initials}>
                        {profile.first_name[0]}{profile.last_name[0]}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={S.insert}>INSERT COIN</div>
                    <h1 className="pixel-text" style={S.name}>
                      {fullName}
                    </h1>
                    <p className="retro-text" style={S.tagline}>
                      {profile.summary}
                    </p>

                    {/* Retro Status Bar */}
                    <div style={S.statusBar}>
                      <div style={S.statusItem}>
                        <span style={S.statusLabel}>STATUS:</span>
                        <span style={S.statusValue} className="retro-text">READY</span>
                      </div>
                      <div style={S.statusDivider}>|</div>
                      <div style={S.statusItem}>
                        <span style={S.statusLabel}>LEVEL:</span>
                        <span style={S.statusValue} className="retro-text">EXPERT</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info - Arcade Style */}
                <div style={S.contactBar}>
                  <div className="retro-text" style={S.contactItem}>
                    ✉ {profile.contact?.email}
                  </div>
                  {profile.contact?.phone && (
                    <div className="retro-text" style={S.contactItem}>
                      ☎ {profile.contact.phone}
                    </div>
                  )}
                  {profile.contact?.address?.city && (
                    <div className="retro-text" style={S.contactItem}>
                      ⌂ {profile.contact.address.city}, {profile.contact.address.state}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Grid */}
          <div style={S.grid}>
            {/* Sidebar */}
            <aside style={S.sidebar}>
              {/* Skills - Arcade Style */}
              {profile.skills?.length > 0 && (
                <div style={S.arcadeCard}>
                  <div style={S.arcadeCardHeader}>
                    <span className="pixel-text">SKILLS</span>
                    <div style={S.coinSlot}></div>
                  </div>
                  <div style={S.arcadeCardBody}>
                    {profile.skills.map((skill, i) => {
                      const levelMap = {
                        expert: 5,
                        advanced: 4,
                        intermediate: 3,
                        beginner: 2,
                      };
                      const level = levelMap[skill.level] || 3;

                      return (
                        <div key={i} style={S.skillItem}>
                          <div className="retro-text" style={S.skillName}>
                            {skill.name}
                          </div>
                          <div style={S.skillBar}>
                            {[...Array(5)].map((_, j) => (
                              <div
                                key={j}
                                style={{
                                  ...S.skillBlock,
                                  background: j < level ? 'var(--accent, #ff00ff)' : '#2a0a3a',
                                  boxShadow: j < level ? '0 0 10px var(--accent, #ff00ff)' : 'none',
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Links - Retro Buttons */}
              {profile.links?.length > 0 && (
                <div style={S.arcadeCard}>
                  <div style={S.arcadeCardHeader}>
                    <span className="pixel-text">LINKS</span>
                    <div style={S.coinSlot}></div>
                  </div>
                  <div style={S.arcadeCardBody}>
                    {profile.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        style={S.retroButton}
                        className="retro-text"
                      >
                        ▶ {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Sections */}
              {profile.custom_sections?.map((section, i) => (
                <div key={i} style={S.arcadeCard}>
                  <div style={S.arcadeCardHeader}>
                    <span className="pixel-text">{section.name.toUpperCase()}</span>
                    <div style={S.coinSlot}></div>
                  </div>
                  <div style={S.arcadeCardBody}>
                    {section.elements?.map((elem, j) => (
                      <div key={j} style={S.customItem}>
                        <div className="retro-text" style={S.customTitle}>
                          ★ {elem.name}
                        </div>
                        {elem.issuer && (
                          <div className="retro-text" style={S.customSubtext}>
                            {elem.issuer}
                          </div>
                        )}
                        {elem.description && (
                          <div className="retro-text" style={S.customDesc}>
                            {elem.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </aside>

            {/* Main Content */}
            <main style={S.main}>
              {/* Work Experience */}
              {profile.work_experiences?.length > 0 && (
                <div style={S.arcadeCard}>
                  <div style={S.arcadeCardHeader}>
                    <span className="pixel-text">WORK LOG</span>
                    <div style={S.coinSlot}></div>
                  </div>
                  <div style={S.arcadeCardBody}>
                    {profile.work_experiences.map((work, i) => (
                      <div key={i} style={S.workItem}>
                        <div style={S.workHeader}>
                          <div>
                            <div className="retro-text" style={S.workTitle}>
                              {work.job_title}
                            </div>
                            <div className="retro-text" style={S.workCompany}>
                              @ {work.employer}
                            </div>
                          </div>
                          <div style={S.workDate} className="retro-text">
                            {work.date.start} - {work.date.ongoing ? 'NOW' : work.date.end}
                          </div>
                        </div>
                        <div className="retro-text" style={S.workLocation}>
                          📍 {work.location}
                        </div>
                        <p className="retro-text" style={S.workDesc}>
                          {work.description}
                        </p>
                        {work.bullets && (
                          <div style={S.bulletList}>
                            {work.bullets.map((bullet, j) => (
                              <div key={j} className="retro-text" style={S.bulletItem}>
                                ▸ {bullet}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {profile.education?.length > 0 && (
                <div style={S.arcadeCard}>
                  <div style={S.arcadeCardHeader}>
                    <span className="pixel-text">EDUCATION</span>
                    <div style={S.coinSlot}></div>
                  </div>
                  <div style={S.arcadeCardBody}>
                    {profile.education.map((edu, i) => (
                      <div key={i} style={S.workItem}>
                        <div style={S.workHeader}>
                          <div>
                            <div className="retro-text" style={S.workTitle}>
                              {edu.degree}
                            </div>
                            <div className="retro-text" style={S.workCompany}>
                              @ {edu.school_name}
                            </div>
                          </div>
                          <div style={S.workDate} className="retro-text">
                            {edu.date.start} - {edu.date.ongoing ? 'NOW' : edu.date.end}
                          </div>
                        </div>
                        {edu.gpa && (
                          <div style={S.gpaBadge} className="retro-text">
                            GPA: {edu.gpa}
                          </div>
                        )}
                        {edu.education_description && (
                          <p className="retro-text" style={S.workDesc}>
                            {edu.education_description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {profile.extra_experiences?.length > 0 && (
                <div style={S.arcadeCard}>
                  <div style={S.arcadeCardHeader}>
                    <span className="pixel-text">PROJECTS</span>
                    <div style={S.coinSlot}></div>
                  </div>
                  <div style={S.arcadeCardBody}>
                    {profile.extra_experiences.map((project, i) => (
                      <div key={i} style={S.projectCard}>
                        <div className="retro-text" style={S.projectTitle}>
                          ▶ {project.name}
                        </div>
                        {project.role && (
                          <div className="retro-text" style={S.projectRole}>
                            {project.role}
                          </div>
                        )}
                        <p className="retro-text" style={S.projectDesc}>
                          {project.description}
                        </p>
                        {project.bullets && (
                          <div style={S.bulletList}>
                            {project.bullets.map((bullet, j) => (
                              <div key={j} className="retro-text" style={S.bulletItem}>
                                ▸ {bullet}
                              </div>
                            ))}
                          </div>
                        )}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            style={S.projectLink}
                            className="retro-text"
                          >
                            PLAY ▶
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>

          {/* Footer */}
          <footer style={S.footer}>
            <div className="pixel-text" style={S.footerText}>
              <span style={{ animation: 'blink 1s infinite' }}>▮</span> PRESS START TO CONTINUE
            </div>
            <div className="retro-text" style={S.footerCopyright}>
              © {new Date().getFullYear()} {fullName} - ALL RIGHTS RESERVED
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

/* =========================
   STYLES
========================= */

const S = {
  page: {
    minHeight: '100vh',
    background: '#1a0033',
    position: 'relative',
  },

  gridBackground: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `
      linear-gradient(0deg, transparent 24%, rgba(255, 0, 255, 0.05) 25%, rgba(255, 0, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 0, 255, 0.05) 75%, rgba(255, 0, 255, 0.05) 76%, transparent 77%, transparent),
      linear-gradient(90deg, transparent 24%, rgba(255, 0, 255, 0.05) 25%, rgba(255, 0, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 0, 255, 0.05) 75%, rgba(255, 0, 255, 0.05) 76%, transparent 77%, transparent)
    `,
    backgroundSize: '50px 50px',
    zIndex: 0,
  },

  container: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '40px 20px',
  },

  header: {
    marginBottom: '40px',
  },

  crtFrame: {
    background: 'linear-gradient(135deg, #2a0a3a, #1a0033)',
    border: '8px solid #4a1a5a',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: `
      0 0 0 2px #ff00ff,
      0 0 20px rgba(255, 0, 255, 0.5),
      inset 0 0 20px rgba(255, 0, 255, 0.1)
    `,
  },

  crtScreen: {
    background: 'rgba(0, 0, 0, 0.8)',
    border: '2px solid var(--accent, #ff00ff)',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: 'inset 0 0 50px rgba(255, 0, 255, 0.2)',
  },

  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    marginBottom: '20px',
  },

  arcadeBadge: {
    width: '100px',
    height: '100px',
    background: 'linear-gradient(135deg, #ff00ff, #00ffff)',
    border: '4px solid #fff',
    borderRadius: '12px',
    padding: '4px',
    boxShadow: '0 0 30px var(--accent, #ff00ff)',
    animation: 'float 3s ease-in-out infinite',
    flexShrink: 0,
  },

  arcadeBadgeInner: {
    width: '100%',
    height: '100%',
    background: '#1a0033',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  initials: {
    fontSize: '28px',
    color: 'var(--accent, #ff00ff)',
    textShadow: '0 0 20px var(--accent, #ff00ff)',
  },

  insert: {
    fontSize: '10px',
    color: '#ffff00',
    letterSpacing: '2px',
    marginBottom: '10px',
    animation: 'blink 1s infinite',
    fontFamily: "'Press Start 2P', cursive",
  },

  name: {
    fontSize: '32px',
    color: '#fff',
    marginBottom: '16px',
    textShadow: '0 0 20px var(--accent, #ff00ff), 3px 3px 0 #000',
    animation: 'neonGlow 2s ease-in-out infinite',
  },

  tagline: {
    fontSize: '20px',
    color: '#00ffff',
    lineHeight: '1.6',
    marginBottom: '20px',
    textShadow: '0 0 10px #00ffff',
  },

  statusBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '12px 16px',
    background: 'rgba(255, 0, 255, 0.1)',
    border: '2px solid var(--accent, #ff00ff)',
    borderRadius: '8px',
    width: 'fit-content',
  },

  statusItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  statusLabel: {
    fontSize: '14px',
    color: '#ff00ff',
    fontFamily: "'Press Start 2P', cursive",
  },

  statusValue: {
    fontSize: '18px',
    color: '#00ff00',
    textShadow: '0 0 10px #00ff00',
  },

  statusDivider: {
    color: '#ff00ff',
    fontSize: '20px',
  },

  contactBar: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
    padding: '16px',
    background: 'rgba(0, 255, 255, 0.05)',
    border: '2px solid #00ffff',
    borderRadius: '8px',
  },

  contactItem: {
    fontSize: '18px',
    color: '#00ffff',
    textShadow: '0 0 10px #00ffff',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: '350px 1fr',
    gap: '30px',
  },

  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },

  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },

  arcadeCard: {
    background: 'linear-gradient(135deg, #2a0a3a, #1a0033)',
    border: '4px solid var(--accent, #ff00ff)',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 0 30px rgba(255, 0, 255, 0.3)',
  },

  arcadeCardHeader: {
    background: 'var(--accent, #ff00ff)',
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: 'inset 0 -4px 0 rgba(0, 0, 0, 0.3)',
  },

  coinSlot: {
    width: '40px',
    height: '8px',
    background: '#000',
    borderRadius: '4px',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
  },

  arcadeCardBody: {
    padding: '24px',
  },

  skillItem: {
    marginBottom: '20px',
  },

  skillName: {
    fontSize: '16px',
    color: '#fff',
    marginBottom: '8px',
    textShadow: '2px 2px 0 #000',
  },

  skillBar: {
    display: 'flex',
    gap: '6px',
  },

  skillBlock: {
    width: '40px',
    height: '20px',
    border: '2px solid #fff',
    borderRadius: '4px',
    transition: 'all 0.3s',
  },

  retroButton: {
    display: 'block',
    padding: '12px 16px',
    background: 'rgba(0, 255, 255, 0.1)',
    border: '3px solid #00ffff',
    borderRadius: '8px',
    color: '#00ffff',
    textDecoration: 'none',
    fontSize: '16px',
    marginBottom: '12px',
    textShadow: '0 0 10px #00ffff',
    transition: 'all 0.2s',
    cursor: 'pointer',
  },

  customItem: {
    marginBottom: '20px',
    paddingBottom: '20px',
    borderBottom: '2px dashed rgba(255, 0, 255, 0.3)',
  },

  customTitle: {
    fontSize: '16px',
    color: '#ffff00',
    marginBottom: '6px',
    textShadow: '0 0 10px #ffff00',
  },

  customSubtext: {
    fontSize: '14px',
    color: '#00ffff',
    marginBottom: '8px',
  },

  customDesc: {
    fontSize: '14px',
    color: '#fff',
    lineHeight: '1.6',
  },

  workItem: {
    marginBottom: '32px',
    paddingBottom: '32px',
    borderBottom: '3px solid rgba(255, 0, 255, 0.3)',
  },

  workHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '12px',
    flexWrap: 'wrap',
  },

  workTitle: {
    fontSize: '20px',
    color: '#fff',
    marginBottom: '6px',
    textShadow: '2px 2px 0 #000',
  },

  workCompany: {
    fontSize: '18px',
    color: 'var(--accent, #ff00ff)',
    textShadow: '0 0 10px var(--accent, #ff00ff)',
  },

  workDate: {
    fontSize: '16px',
    color: '#00ff00',
    textShadow: '0 0 10px #00ff00',
  },

  workLocation: {
    fontSize: '16px',
    color: '#00ffff',
    marginBottom: '12px',
  },

  workDesc: {
    fontSize: '16px',
    color: '#fff',
    lineHeight: '1.8',
    marginBottom: '16px',
  },

  bulletList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  bulletItem: {
    fontSize: '15px',
    color: '#ccc',
    lineHeight: '1.6',
  },

  gpaBadge: {
    display: 'inline-block',
    padding: '6px 12px',
    background: 'rgba(255, 255, 0, 0.2)',
    border: '2px solid #ffff00',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#ffff00',
    marginBottom: '12px',
    textShadow: '0 0 10px #ffff00',
  },

  projectCard: {
    marginBottom: '24px',
    padding: '20px',
    background: 'rgba(0, 0, 0, 0.3)',
    border: '2px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '8px',
  },

  projectTitle: {
    fontSize: '18px',
    color: '#fff',
    marginBottom: '8px',
    textShadow: '2px 2px 0 #000',
  },

  projectRole: {
    fontSize: '14px',
    color: '#ff00ff',
    marginBottom: '12px',
  },

  projectDesc: {
    fontSize: '15px',
    color: '#fff',
    lineHeight: '1.6',
    marginBottom: '12px',
  },

  projectLink: {
    display: 'inline-block',
    padding: '8px 16px',
    background: '#ff00ff',
    color: '#000',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    borderRadius: '6px',
    boxShadow: '0 0 20px #ff00ff',
    marginTop: '12px',
  },

  footer: {
    marginTop: '60px',
    padding: '30px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #2a0a3a, #1a0033)',
    border: '4px solid var(--accent, #ff00ff)',
    borderRadius: '16px',
    boxShadow: '0 0 30px rgba(255, 0, 255, 0.3)',
  },

  footerText: {
    fontSize: '14px',
    color: '#ffff00',
    marginBottom: '16px',
    textShadow: '0 0 10px #ffff00',
  },

  footerCopyright: {
    fontSize: '16px',
    color: '#00ffff',
    textShadow: '0 0 10px #00ffff',
  },
};