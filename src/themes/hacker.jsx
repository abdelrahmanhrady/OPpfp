import React, { useEffect, useRef, useState } from "react";

/* =====================================================
   💻 ENHANCED HACKER THEME
   Features:
   - Reactive accent color that updates in real-time
   - Optimized binary rain animation
   - Typing animation on load
   - Glitch effects
   - Terminal-style interface
   - Scan line effects
===================================================== */

export default function HackerTheme({ profile }) {
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [accentColor, setAccentColor] = useState("#00ff00");

  // Monitor accent color changes in real-time
  useEffect(() => {
    const updateAccent = () => {
      const color = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#00ff00";
      setAccentColor(color);
    };

    updateAccent();
    
    // Poll for changes (since CSS variables don't trigger events)
    const interval = setInterval(updateAccent, 100);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#000";
    document.body.style.overflowX = "hidden";

    setTimeout(() => setLoaded(true), 300);
  }, []);

  // Enhanced binary background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);
    const binary = "01";
    const speeds = Array(columns).fill(0).map(() => Math.random() * 0.5 + 0.5);

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = fontSize + "px monospace";

      drops.forEach((y, i) => {
        const text = binary.charAt(Math.floor(Math.random() * binary.length));
        const opacity = Math.random() * 0.5 + 0.5;
        ctx.fillStyle = accentColor + Math.floor(opacity * 255).toString(16).padStart(2, '0');
        ctx.fillText(text, i * fontSize, y * fontSize);

        if (y * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speeds[i];
      });
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [accentColor]);

  if (!profile) return null;

  const textGlow = {
    color: accentColor,
    textShadow: `0 0 3px ${accentColor}, 0 0 6px ${accentColor}, 0 0 12px ${accentColor}`,
  };

  const borderGlow = {
    borderColor: accentColor,
    boxShadow: `0 0 10px ${accentColor}40, inset 0 0 10px ${accentColor}20`,
  };

  return (
    <>
      <style>{`
        @keyframes scanline {
          0% { top: 0%; }
          100% { top: 100%; }
        }

        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.95; }
        }

        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .terminal-text {
          overflow: hidden;
          white-space: nowrap;
          animation: typewriter 1.5s steps(40) forwards;
        }

        .cursor::after {
          content: '▌';
          animation: blink 1s infinite;
        }
      `}</style>

      <div style={S.page}>
        <canvas ref={canvasRef} style={S.canvas} />

        {/* Scanline effect */}
        <div style={{
          ...S.scanline,
          background: `linear-gradient(transparent, ${accentColor}30, transparent)`,
        }} />

        {/* Terminal window */}
        <div style={{ ...S.terminal, ...borderGlow }}>
          {/* Terminal header */}
          <div style={{ ...S.terminalHeader, background: accentColor }}>
            <div style={S.terminalButtons}>
              <span style={S.terminalButton}></span>
              <span style={S.terminalButton}></span>
              <span style={S.terminalButton}></span>
            </div>
            <div style={S.terminalTitle}>
              root@portfolio:~$ cat resume.json
            </div>
          </div>

          {/* Terminal body */}
          <div style={S.terminalBody}>
            {loaded && (
              <>
                {/* System boot sequence */}
                <div style={{ ...S.bootText, ...textGlow }}>
                  <div className="terminal-text">[OK] Loading profile data...</div>
                  <div className="terminal-text" style={{ animationDelay: '0.5s' }}>
                    [OK] Initializing secure connection...
                  </div>
                  <div className="terminal-text" style={{ animationDelay: '1s' }}>
                    [OK] Access granted. Welcome.
                  </div>
                </div>

                <div style={S.divider}></div>

                {/* NAME */}
                <div style={S.section}>
                  <div style={{ ...S.prompt, ...textGlow }}>
                    <span className="cursor">root@portfolio:~$</span> whoami
                  </div>
                  <h1 style={{ ...S.name, ...textGlow }}>
                    &gt; {profile.first_name} {profile.last_name}
                  </h1>
                </div>

                {/* SUMMARY */}
                {profile.summary && (
                  <div style={S.section}>
                    <div style={{ ...S.prompt, ...textGlow }}>
                      <span>root@portfolio:~$</span> cat bio.txt
                    </div>
                    <p style={{ ...S.text, ...textGlow }}>{profile.summary}</p>
                  </div>
                )}

                {/* CONTACT */}
                <div style={S.section}>
                  <div style={{ ...S.prompt, ...textGlow }}>
                    <span>root@portfolio:~$</span> cat contact.json
                  </div>
                  <div style={{ ...S.card, ...borderGlow }}>
                    <div style={{ ...S.jsonLine, ...textGlow }}>
                      <span style={S.jsonKey}>"email"</span>: <span style={S.jsonValue}>"{profile.contact.email}"</span>
                    </div>
                    {profile.contact.phone && (
                      <div style={{ ...S.jsonLine, ...textGlow }}>
                        <span style={S.jsonKey}>"phone"</span>: <span style={S.jsonValue}>"{profile.contact.phone}"</span>
                      </div>
                    )}
                    {profile.contact.address?.city && (
                      <div style={{ ...S.jsonLine, ...textGlow }}>
                        <span style={S.jsonKey}>"location"</span>: <span style={S.jsonValue}>"{profile.contact.address.city}, {profile.contact.address.state}"</span>
                      </div>
                    )}
                  </div>
                  
                  {profile.links?.length > 0 && (
                    <div style={S.links}>
                      {profile.links.map((link, i) => (
                        <div key={i} style={{ ...S.link, ...textGlow }}>
                          → {link.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* SKILLS */}
                {profile.skills?.length > 0 && (
                  <div style={S.section}>
                    <div style={{ ...S.prompt, ...textGlow }}>
                      <span>root@portfolio:~$</span> ls -la skills/
                    </div>
                    <div style={S.skillsGrid}>
                      {profile.skills.map((s, i) => (
                        <div
                          key={i}
                          style={{
                            ...S.skillChip,
                            ...borderGlow,
                            ...textGlow,
                          }}
                        >
                          <span style={S.skillIcon}>◉</span> {s.name}
                          <div style={S.skillMeta}>
                            {s.level} • {s.years_experience}y
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* WORK EXPERIENCE */}
                {profile.work_experiences?.length > 0 && (
                  <div style={S.section}>
                    <div style={{ ...S.prompt, ...textGlow }}>
                      <span>root@portfolio:~$</span> cat experience.log
                    </div>
                    {profile.work_experiences.map((w, i) => (
                      <div key={i} style={{ ...S.card, ...borderGlow }}>
                        <div style={{ ...S.jobHeader, ...textGlow }}>
                          <span style={S.jobTitle}>[{w.job_title}]</span>
                          <span style={S.jobCompany}>@ {w.employer}</span>
                        </div>
                        <div style={{ ...S.jobMeta, color: accentColor }}>
                          {w.date.start} → {w.date.ongoing ? "PRESENT" : w.date.end} | {w.location}
                        </div>
                        <p style={{ ...S.text, ...textGlow }}>{w.description}</p>
                        {w.bullets && (
                          <ul style={S.bulletList}>
                            {w.bullets.map((bullet, bi) => (
                              <li key={bi} style={{ ...S.bullet, ...textGlow }}>
                                {'>'} {bullet}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* EDUCATION */}
                {profile.education?.length > 0 && (
                  <div style={S.section}>
                    <div style={{ ...S.prompt, ...textGlow }}>
                      <span>root@portfolio:~$</span> cat education.log
                    </div>
                    {profile.education.map((edu, i) => (
                      <div key={i} style={{ ...S.card, ...borderGlow }}>
                        <div style={{ ...S.jobHeader, ...textGlow }}>
                          <span style={S.jobTitle}>[{edu.degree}]</span>
                          <span style={S.jobCompany}>@ {edu.school_name}</span>
                        </div>
                        <div style={{ ...S.jobMeta, color: accentColor }}>
                          {edu.date.start} → {edu.date.ongoing ? "PRESENT" : edu.date.end}
                          {edu.gpa && ` | GPA: ${edu.gpa}`}
                        </div>
                        {edu.education_description && (
                          <p style={{ ...S.text, ...textGlow }}>{edu.education_description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* PROJECTS */}
                {profile.extra_experiences?.length > 0 && (
                  <div style={S.section}>
                    <div style={{ ...S.prompt, ...textGlow }}>
                      <span>root@portfolio:~$</span> ls projects/
                    </div>
                    {profile.extra_experiences.map((e, i) => (
                      <div key={i} style={{ ...S.card, ...borderGlow }}>
                        <div style={{ ...S.jobHeader, ...textGlow }}>
                          <span style={S.jobTitle}>[{e.name}]</span>
                          {e.role && <span style={S.jobCompany}>• {e.role}</span>}
                        </div>
                        <p style={{ ...S.text, ...textGlow }}>{e.description}</p>
                        {e.bullets && (
                          <ul style={S.bulletList}>
                            {e.bullets.map((bullet, bi) => (
                              <li key={bi} style={{ ...S.bullet, ...textGlow }}>
                                {'>'} {bullet}
                              </li>
                            ))}
                          </ul>
                        )}
                        {e.link && (
                          <div style={{ ...S.projectLink, ...textGlow }}>
                            → {e.link}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* CUSTOM SECTIONS */}
                {profile.custom_sections?.map((section, si) => (
                  <div key={si} style={S.section}>
                    <div style={{ ...S.prompt, ...textGlow }}>
                      <span>root@portfolio:~$</span> cat {section.name.toLowerCase().replace(/\s+/g, '_')}.log
                    </div>
                    {section.elements?.map((elem, ei) => (
                      <div key={ei} style={{ ...S.card, ...borderGlow }}>
                        <div style={{ ...S.jobHeader, ...textGlow }}>
                          <span style={S.jobTitle}>[{elem.name}]</span>
                          {elem.issuer && <span style={S.jobCompany}>@ {elem.issuer}</span>}
                        </div>
                        {elem.description && (
                          <p style={{ ...S.text, ...textGlow }}>{elem.description}</p>
                        )}
                        {elem.proficiency && (
                          <div style={{ ...S.jobMeta, color: accentColor }}>
                            Level: {elem.proficiency}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}

                {/* END */}
                <div style={{ ...S.prompt, ...textGlow, marginTop: 40 }}>
                  <span className="cursor">root@portfolio:~$</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* =======================
   STYLES
======================= */
const S = {
  page: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    fontFamily: "'Courier New', 'Consolas', monospace",
    overflow: "auto",
    background: "#000",
  },
  canvas: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 0,
    width: "100%",
    height: "100%",
  },
  scanline: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "3px",
    zIndex: 1,
    animation: "scanline 6s linear infinite",
    pointerEvents: "none",
  },
  terminal: {
    position: "relative",
    zIndex: 2,
    maxWidth: 1000,
    margin: "40px auto",
    border: "2px solid",
    borderRadius: 8,
    overflow: "hidden",
    animation: "flicker 0.15s infinite",
  },
  terminalHeader: {
    height: 32,
    display: "flex",
    alignItems: "center",
    padding: "0 12px",
    position: "relative",
  },
  terminalButtons: {
    display: "flex",
    gap: 6,
  },
  terminalButton: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "#000",
    opacity: 0.6,
  },
  terminalTitle: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  terminalBody: {
    padding: "20px",
    background: "rgba(0, 0, 0, 0.85)",
    backdropFilter: "blur(10px)",
    minHeight: 400,
  },
  bootText: {
    fontSize: 11,
    marginBottom: 16,
    lineHeight: 1.8,
  },
  divider: {
    height: 1,
    background: "rgba(0, 255, 0, 0.2)",
    margin: "20px 0",
  },
  section: {
    marginBottom: 32,
  },
  prompt: {
    fontSize: 13,
    marginBottom: 8,
    fontWeight: "bold",
    letterSpacing: "0.05em",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    letterSpacing: "0.1em",
  },
  text: {
    fontSize: 13,
    lineHeight: 1.7,
    opacity: 0.9,
  },
  card: {
    border: "1px solid",
    padding: 16,
    marginBottom: 12,
    background: "rgba(0, 0, 0, 0.4)",
    borderRadius: 4,
  },
  jsonLine: {
    fontSize: 13,
    marginBottom: 6,
    fontFamily: "monospace",
  },
  jsonKey: {
    opacity: 0.7,
  },
  jsonValue: {
    opacity: 1,
  },
  links: {
    marginTop: 12,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  link: {
    fontSize: 12,
    cursor: "pointer",
  },
  skillsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 12,
    marginTop: 12,
  },
  skillChip: {
    padding: "10px 14px",
    border: "1px solid",
    borderRadius: 4,
    fontSize: 13,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  skillIcon: {
    marginRight: 6,
  },
  skillMeta: {
    fontSize: 10,
    opacity: 0.7,
    marginTop: 4,
  },
  jobHeader: {
    marginBottom: 8,
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    alignItems: "center",
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  jobCompany: {
    fontSize: 14,
    opacity: 0.9,
  },
  jobMeta: {
    fontSize: 11,
    opacity: 0.7,
    marginBottom: 10,
    letterSpacing: "0.05em",
  },
  bulletList: {
    marginTop: 10,
    marginLeft: 0,
    listStyle: "none",
  },
  bullet: {
    fontSize: 12,
    marginBottom: 6,
    opacity: 0.85,
  },
  projectLink: {
    fontSize: 12,
    marginTop: 10,
    cursor: "pointer",
  },
};