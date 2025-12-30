import React, { useState } from "react";

/* =====================================================
   📖  BOOK THEME
   RESUME AS A FLIP-ABLE BOOK
   Works with accent + theme dropdown
===================================================== */

export default function BookTheme({ profile }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState(null);
  const [showContent, setShowContent] = useState(true);

  if (!profile) return null;

  const fullName = `${profile.first_name} ${profile.last_name}`;

  // Build pages array
  const pages = [];

  // Page 0: Cover
  pages.push({
    type: "cover",
    content: { name: fullName, title: profile.summary },
  });

  // Page 1: About & Contact
  pages.push({
    type: "about",
    content: {
      name: fullName,
      summary: profile.summary,
      contact: profile.contact,
      links: profile.links,
    },
  });

  // Page 2+: Work Experience (one per page)
  if (profile.work_experiences) {
    profile.work_experiences.forEach((work) => {
      pages.push({
        type: "work",
        content: work,
      });
    });
  }

  // Skills page
  if (profile.skills) {
    pages.push({
      type: "skills",
      content: profile.skills,
    });
  }

  // Education page
  if (profile.education) {
    pages.push({
      type: "education",
      content: profile.education,
    });
  }

  // Projects page
  if (profile.extra_experiences) {
    profile.extra_experiences.forEach((exp) => {
      pages.push({
        type: "project",
        content: exp,
      });
    });
  }

  // Custom sections
  if (profile.custom_sections) {
    profile.custom_sections.forEach((section) => {
      pages.push({
        type: "custom",
        content: section,
      });
    });
  }

  // Back cover
  pages.push({
    type: "back-cover",
    content: { name: fullName },
  });

  const nextPage = () => {
    if (currentPage < pages.length - 1 && !flipping) {
      setFlipDirection("next");
      setFlipping(true);
      setShowContent(false);
      
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
      }, 400);
      
      setTimeout(() => {
        setShowContent(true);
        setFlipping(false);
        setFlipDirection(null);
      }, 800);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !flipping) {
      setFlipDirection("prev");
      setFlipping(true);
      setShowContent(false);
      
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
      }, 400);
      
      setTimeout(() => {
        setShowContent(true);
        setFlipping(false);
        setFlipDirection(null);
      }, 800);
    }
  };

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
          min-height: 100vh;
          background: linear-gradient(135deg, #8b7355 0%, #5d4e37 100%);
          overflow-x: hidden;
        }

        @keyframes pageFlipNext {
          0% { 
            transform: rotateY(0deg);
            box-shadow: 0 0 20px rgba(0,0,0,0.2);
          }
          50% {
            box-shadow: 0 0 40px rgba(0,0,0,0.4);
          }
          100% { 
            transform: rotateY(-180deg);
            box-shadow: 0 0 20px rgba(0,0,0,0.2);
          }
        }

        @keyframes pageFlipPrev {
          0% { 
            transform: rotateY(0deg);
            box-shadow: 0 0 20px rgba(0,0,0,0.2);
          }
          50% {
            box-shadow: 0 0 40px rgba(0,0,0,0.4);
          }
          100% { 
            transform: rotateY(180deg);
            box-shadow: 0 0 20px rgba(0,0,0,0.2);
          }
        }

        @keyframes fadeIn {
          from { 
            opacity: 0;
          }
          to { 
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from { 
            opacity: 1;
          }
          to { 
            opacity: 0;
          }
        }
      `}</style>

      <div style={S.container}>
        {/* Book */}
        <div style={S.book}>
          {/* Left page (previous or blank) */}
          <div style={S.page.left}>
            {currentPage > 0 && showContent && (
              <div style={{
                ...S.pageContent,
                animation: 'fadeIn 0.4s ease-out',
              }}>
                {renderPageContent(pages[currentPage - 1])}
              </div>
            )}
            {currentPage > 0 && (
              <div style={S.pageNumber.left}>{currentPage}</div>
            )}
          </div>

          {/* Spine */}
          <div style={S.spine} />

          {/* Right page (current) with flip animation */}
          <div style={{
            ...S.page.right,
            animation: flipping 
              ? (flipDirection === 'next' ? 'pageFlipNext 0.8s ease-in-out' : 'pageFlipPrev 0.8s ease-in-out')
              : 'none',
            transformOrigin: flipDirection === 'prev' ? 'right center' : 'left center',
          }}>
            {showContent && (
              <div style={{
                ...S.pageContent,
                animation: 'fadeIn 0.4s ease-out',
              }}>
                {renderPageContent(pages[currentPage])}
              </div>
            )}
            {currentPage > 0 && currentPage < pages.length - 1 && (
              <div style={S.pageNumber.right}>{currentPage + 1}</div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div style={S.navigation}>
          <button
            onClick={prevPage}
            disabled={currentPage === 0 || flipping}
            style={{
              ...S.navButton,
              opacity: currentPage === 0 || flipping ? 0.3 : 1,
              cursor: currentPage === 0 || flipping ? 'not-allowed' : 'pointer',
            }}
          >
            ← Previous
          </button>

          <div style={S.pageIndicator}>
            Page {currentPage + 1} of {pages.length}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === pages.length - 1 || flipping}
            style={{
              ...S.navButton,
              opacity: currentPage === pages.length - 1 || flipping ? 0.3 : 1,
              cursor: currentPage === pages.length - 1 || flipping ? 'not-allowed' : 'pointer',
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </>
  );
}

/* =====================================================
   RENDER PAGE CONTENT
===================================================== */

function renderPageContent(page) {
  switch (page.type) {
    case "cover":
      return (
        <div style={S.cover}>
          <div style={S.coverOrnament}>✦</div>
          <h1 style={S.coverTitle}>{page.content.name}</h1>
          <div style={S.coverSubtitle}>{page.content.title}</div>
          <div style={S.coverOrnament}>✦</div>
        </div>
      );

    case "about":
      return (
        <div style={S.contentPage}>
          <h2 style={S.sectionTitle}>About</h2>
          <div style={S.divider} />
          <p style={S.text}>{page.content.summary}</p>

          <h3 style={S.subsectionTitle}>Contact</h3>
          <div style={S.contactInfo}>
            <div style={S.contactItem}>
              📧 {page.content.contact.email}
            </div>
            {page.content.contact.phone && (
              <div style={S.contactItem}>
                📞 {page.content.contact.phone}
              </div>
            )}
            {page.content.contact.address && (
              <div style={S.contactItem}>
                📍 {page.content.contact.address.city}, {page.content.contact.address.state}
              </div>
            )}
          </div>

          {page.content.links && (
            <>
              <h3 style={S.subsectionTitle}>Links</h3>
              <div style={S.links}>
                {page.content.links.map((link, i) => (
                  <div key={i} style={S.linkItem}>
                    🔗 {link.name}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      );

    case "work":
      return (
        <div style={S.contentPage}>
          <h2 style={S.sectionTitle}>Experience</h2>
          <div style={S.divider} />
          
          <h3 style={S.jobTitle}>{page.content.job_title}</h3>
          <div style={S.company}>{page.content.employer}</div>
          <div style={S.date}>
            {page.content.date.start} - {page.content.date.ongoing ? "Present" : page.content.date.end}
          </div>
          <div style={S.location}>📍 {page.content.location}</div>

          <p style={S.text}>{page.content.description}</p>

          {page.content.bullets && (
            <ul style={S.bulletList}>
              {page.content.bullets.map((bullet, i) => (
                <li key={i} style={S.bulletItem}>{bullet}</li>
              ))}
            </ul>
          )}
        </div>
      );

    case "skills":
      return (
        <div style={S.contentPage}>
          <h2 style={S.sectionTitle}>Skills</h2>
          <div style={S.divider} />
          
          <div style={S.skillsGrid}>
            {page.content.map((skill, i) => (
              <div key={i} style={S.skillCard}>
                <div style={S.skillName}>{skill.name}</div>
                <div style={S.skillLevel}>{skill.level}</div>
                {skill.years_experience && (
                  <div style={S.skillYears}>{skill.years_experience} years</div>
                )}
              </div>
            ))}
          </div>
        </div>
      );

    case "education":
      return (
        <div style={S.contentPage}>
          <h2 style={S.sectionTitle}>Education</h2>
          <div style={S.divider} />
          
          {page.content.map((edu, i) => (
            <div key={i} style={S.eduSection}>
              <h3 style={S.jobTitle}>{edu.degree}</h3>
              <div style={S.company}>{edu.school_name}</div>
              <div style={S.date}>
                {edu.date.start} - {edu.date.ongoing ? "Present" : edu.date.end}
              </div>
              {edu.gpa && <div style={S.gpa}>GPA: {edu.gpa}</div>}
              {edu.education_description && (
                <p style={S.text}>{edu.education_description}</p>
              )}
            </div>
          ))}
        </div>
      );

    case "project":
      return (
        <div style={S.contentPage}>
          <h2 style={S.sectionTitle}>Project</h2>
          <div style={S.divider} />
          
          <h3 style={S.jobTitle}>{page.content.name}</h3>
          {page.content.role && <div style={S.company}>{page.content.role}</div>}
          {page.content.date && (
            <div style={S.date}>
              {page.content.date.start} - {page.content.date.ongoing ? "Present" : page.content.date.end}
            </div>
          )}

          {page.content.description && (
            <p style={S.text}>{page.content.description}</p>
          )}

          {page.content.bullets && (
            <ul style={S.bulletList}>
              {page.content.bullets.map((bullet, i) => (
                <li key={i} style={S.bulletItem}>{bullet}</li>
              ))}
            </ul>
          )}

          {page.content.link && (
            <div style={S.projectLink}>🔗 View Project</div>
          )}
        </div>
      );

    case "custom":
      return (
        <div style={S.contentPage}>
          <h2 style={S.sectionTitle}>{page.content.name}</h2>
          <div style={S.divider} />
          
          {page.content.elements && page.content.elements.map((elem, i) => (
            <div key={i} style={S.customElement}>
              <div style={S.customTitle}>{elem.name}</div>
              {elem.issuer && <div style={S.company}>{elem.issuer}</div>}
              {elem.description && <div style={S.text}>{elem.description}</div>}
              {elem.proficiency && <div style={S.skillLevel}>{elem.proficiency}</div>}
            </div>
          ))}
        </div>
      );

    case "back-cover":
      return (
        <div style={S.cover}>
          <div style={S.backCoverText}>
            Thank you for reading
          </div>
          <div style={S.coverOrnament}>✦</div>
          <div style={S.backCoverName}>{page.content.name}</div>
        </div>
      );

    default:
      return null;
  }
}

/* =====================================================
   STYLES
===================================================== */

const S = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    perspective: "2000px",
  },

  book: {
    width: "900px",
    height: "600px",
    display: "flex",
    position: "relative",
    boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
    transformStyle: "preserve-3d",
  },

  page: {
    left: {
      width: "50%",
      height: "100%",
      background: "#f9f7f4",
      padding: "50px 40px",
      position: "relative",
      borderLeft: "1px solid #d4c5b0",
      boxShadow: "inset 5px 0 10px rgba(0,0,0,0.05)",
    },
    right: {
      width: "50%",
      height: "100%",
      background: "#f9f7f4",
      padding: "50px 40px",
      position: "relative",
      borderRight: "1px solid #d4c5b0",
      boxShadow: "inset -5px 0 10px rgba(0,0,0,0.05)",
      transformStyle: "preserve-3d",
    },
  },

  spine: {
    width: "20px",
    background: "linear-gradient(to right, #8b7355, #6b5d4f, #8b7355)",
    boxShadow: "inset 0 0 10px rgba(0,0,0,0.3)",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    height: "100%",
    zIndex: 10,
  },

  pageContent: {
    width: "100%",
    height: "100%",
    overflow: "auto",
  },

  pageNumber: {
    left: {
      position: "absolute",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: "12px",
      color: "#8b7355",
      fontFamily: "Georgia, serif",
    },
    right: {
      position: "absolute",
      bottom: "20px",
      right: "50%",
      transform: "translateX(50%)",
      fontSize: "12px",
      color: "#8b7355",
      fontFamily: "Georgia, serif",
    },
  },

  cover: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "30px",
    background: "linear-gradient(135deg, var(--accent, #6366f1) 0%, #4f46e5 100%)",
    color: "#fff",
    textAlign: "center",
  },

  coverOrnament: {
    fontSize: "40px",
    opacity: 0.8,
  },

  coverTitle: {
    fontSize: "42px",
    fontFamily: "Georgia, serif",
    fontWeight: "bold",
    letterSpacing: "2px",
  },

  coverSubtitle: {
    fontSize: "18px",
    fontFamily: "Georgia, serif",
    maxWidth: "80%",
    lineHeight: "1.6",
    opacity: 0.95,
  },

  contentPage: {
    fontFamily: "Georgia, serif",
    color: "#2c2c2c",
  },

  sectionTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "var(--accent, #6366f1)",
    marginBottom: "10px",
    fontFamily: "Georgia, serif",
  },

  divider: {
    width: "60px",
    height: "3px",
    background: "var(--accent, #6366f1)",
    marginBottom: "25px",
  },

  text: {
    fontSize: "15px",
    lineHeight: "1.8",
    marginBottom: "20px",
    color: "#4a4a4a",
  },

  subsectionTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "25px",
    marginBottom: "12px",
    color: "#2c2c2c",
  },

  contactInfo: {
    marginBottom: "20px",
  },

  contactItem: {
    fontSize: "14px",
    marginBottom: "8px",
    color: "#4a4a4a",
  },

  links: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  linkItem: {
    fontSize: "14px",
    color: "var(--accent, #6366f1)",
  },

  jobTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#2c2c2c",
  },

  company: {
    fontSize: "18px",
    color: "var(--accent, #6366f1)",
    marginBottom: "6px",
  },

  date: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "6px",
    fontStyle: "italic",
  },

  location: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "15px",
  },

  bulletList: {
    marginLeft: "20px",
    marginTop: "15px",
  },

  bulletItem: {
    fontSize: "14px",
    lineHeight: "1.8",
    marginBottom: "8px",
    color: "#4a4a4a",
  },

  skillsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },

  skillCard: {
    padding: "15px",
    background: "#fff",
    borderRadius: "8px",
    border: "1px solid #e0d5c7",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },

  skillName: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "6px",
    color: "#2c2c2c",
  },

  skillLevel: {
    fontSize: "13px",
    color: "var(--accent, #6366f1)",
    textTransform: "capitalize",
    marginBottom: "4px",
  },

  skillYears: {
    fontSize: "12px",
    color: "#666",
  },

  eduSection: {
    marginBottom: "30px",
  },

  gpa: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px",
  },

  projectLink: {
    marginTop: "20px",
    fontSize: "14px",
    color: "var(--accent, #6366f1)",
    fontWeight: "bold",
  },

  customElement: {
    marginBottom: "25px",
    paddingBottom: "20px",
    borderBottom: "1px solid #e0d5c7",
  },

  customTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#2c2c2c",
  },

  backCoverText: {
    fontSize: "24px",
    fontFamily: "Georgia, serif",
  },

  backCoverName: {
    fontSize: "20px",
    fontFamily: "Georgia, serif",
    opacity: 0.9,
  },

  navigation: {
    marginTop: "40px",
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },

  navButton: {
    padding: "12px 24px",
    background: "#fff",
    border: "2px solid var(--accent, #6366f1)",
    borderRadius: "8px",
    color: "var(--accent, #6366f1)",
    fontSize: "16px",
    fontWeight: "bold",
    fontFamily: "Georgia, serif",
    transition: "all 0.3s ease",
  },

  pageIndicator: {
    fontSize: "16px",
    color: "#fff",
    fontFamily: "Georgia, serif",
  },
};