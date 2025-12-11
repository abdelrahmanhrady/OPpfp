import React, { useEffect, useState } from "react";

/* =====================================================
   🖥️  TERMINAL / CLI THEME
   FULL JSON → TERMINAL SIMULATION
   Works with accent + theme dropdown
===================================================== */

export default function TerminalTheme({ profile }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 600); // pretend boot time
  }, [profile]);

  if (!profile) return null;

  const fullName = `${profile.first_name} ${profile.last_name}`;

  return (
    <>
      {/* ============================================
          GLOBAL RESET — Removes white page margins
      ============================================= */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body, #root {
          width: 100%;
          height: 100%;
          background: #000;
          overflow-x: hidden;
        }

        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>

      {/* ============================================
          TERMINAL SCREEN
      ============================================= */}
      <div style={S.screen}>
        <div style={S.window}>
          <div style={S.header}>
            <span style={S.dots.red}></span>
            <span style={S.dots.yellow}></span>
            <span style={S.dots.green}></span>
            <div style={S.titleBar}>terminal — portfolio</div>
          </div>

          <div style={S.body}>
            {/* Boot Message */}
            {!loaded ? (
              <pre style={S.pre}>
                booting portfolioOS 1.0…{"\n"}
                loading profile…{"\n"}
                initializing terminal…{"\n"}
                <span style={{ animation: "blink 1s infinite" }}>▌</span>
              </pre>
            ) : (
              <>
                {/* whoami */}
                <Command text="whoami" />
                <Output text={fullName} />

                {/* contact */}
                <Command text="cat contact.txt" />
                <Output
                  text={[
                    `email:    ${profile.contact.email}`,
                    profile.contact.phone
                      ? `phone:    ${profile.contact.phone}`
                      : null,
                    profile.contact.address?.city
                      ? `location: ${profile.contact.address.city}`
                      : null,
                  ]
                    .filter(Boolean)
                    .join("\n")}
                />

                {/* summary */}
                <Command text="cat summary.txt" />
                <Output text={profile.summary} />

                {/* work experience */}
                {profile.work_experiences?.length > 0 && (
                  <>
                    <Command text="ls work/" />
                    <Output
                      text={profile.work_experiences
                        .map((w) => `${w.job_title.replace(/ /g, "_")}.txt`)
                        .join("\n")}
                    />

                    {profile.work_experiences.map((w, i) => (
                      <React.Fragment key={i}>
                        <Command text={`cat work/${w.job_title.replace(/ /g, "_")}.txt`} />
                        <Output
                          text={[
                            `${w.job_title} @ ${w.employer}`,
                            `${w.date.start} - ${
                              w.date.ongoing ? "Present" : w.date.end
                            }`,
                            "",
                            w.description,
                            "",
                            ...(w.bullets || []),
                          ].join("\n")}
                        />
                      </React.Fragment>
                    ))}
                  </>
                )}

                {/* skills */}
                <Command text="cat skills.txt" />
                <Output
                  text={profile.skills.map((s) => `• ${s.name}`).join("\n")}
                />

                {/* projects */}
                {profile.extra_experiences?.length > 0 && (
                  <>
                    <Command text="ls projects/" />
                    <Output
                      text={profile.extra_experiences
                        .map((p) => `${p.name.replace(/ /g, "_")}.txt`)
                        .join("\n")}
                    />

                    {profile.extra_experiences.map((p, i) => (
                      <React.Fragment key={i}>
                        <Command
                          text={`cat projects/${p.name.replace(/ /g, "_")}.txt`}
                        />
                        <Output
                          text={[
                            p.name,
                            p.role || "",
                            p.description || "",
                            p.link ? `link: ${p.link}` : "",
                          ]
                            .filter(Boolean)
                            .join("\n")}
                        />
                      </React.Fragment>
                    ))}
                  </>
                )}

                {/* END */}
                <pre style={S.pre}>
                  portfolioOS ready.  
                  <span style={{ animation: "blink 1s infinite" }}>▌</span>
                </pre>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* =====================================================
   TERMINAL COMPONENTS
===================================================== */

function Command({ text }) {
  return (
    <pre style={S.command}>
      <span style={{ color: "var(--accent)" }}>$</span> {text}
    </pre>
  );
}

function Output({ text }) {
  return <pre style={S.output}>{text}</pre>;
}

/* =====================================================
   THEME STYLES
===================================================== */

const S = {
  screen: {
    width: "100%",
    minHeight: "100vh",
    background: "#000",
    display: "flex",
    justifyContent: "center",
    paddingTop: "40px",
  },

  window: {
    width: "90%",
    maxWidth: "900px",
    background: "#111",
    borderRadius: "10px",
    overflow: "hidden",
    border: "2px solid #222",
    boxShadow: "0 0 40px rgba(0,0,0,0.6)",
  },

  header: {
    background: "#222",
    height: "34px",
    display: "flex",
    alignItems: "center",
    paddingLeft: "12px",
    position: "relative",
  },

  dots: {
    red: {
      width: "12px",
      height: "12px",
      background: "#ff5f56",
      borderRadius: "50%",
      marginRight: "6px",
    },
    yellow: {
      width: "12px",
      height: "12px",
      background: "#ffbd2e",
      borderRadius: "50%",
      marginRight: "6px",
    },
    green: {
      width: "12px",
      height: "12px",
      background: "#27c93f",
      borderRadius: "50%",
      marginRight: "12px",
    },
  },

  titleBar: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "12px",
    opacity: 0.6,
    color: "#ddd",
  },

  body: {
    padding: "20px",
    color: "#ddd",
    fontFamily: "monospace",
    fontSize: "15px",
    whiteSpace: "pre-wrap",
  },

  pre: {
    fontFamily: "monospace",
    marginBottom: "20px",
  },

  command: {
    color: "var(--accent)",
    marginTop: "16px",
    marginBottom: "4px",
  },

  output: {
    whiteSpace: "pre-wrap",
    marginBottom: "12px",
  },
};
