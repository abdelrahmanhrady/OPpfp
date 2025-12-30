import React, { useState, useEffect } from "react";

/* =====================================================
   🎯 PREMIUM PROFESSIONAL THEME
   Features:
   - Sophisticated layout with smooth animations
   - Interactive hover effects
   - Progress bars for skills
   - Timeline view for experience
   - Glassmorphism effects
   - Responsive grid system
   - Status badges
===================================================== */

export default function ProfessionalTheme({ profile }) {
  const [activeSection, setActiveSection] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!profile) return null;

  const fullName = `${profile.first_name} ${profile.last_name}`;

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
          min-height: 100%;
          background: #0a0e1a;
          overflow-x: hidden;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .animate-in {
          animation: slideInUp 0.6s ease-out forwards;
        }

        .animate-left {
          animation: slideInLeft 0.6s ease-out forwards;
        }

        .animate-right {
          animation: slideInRight 0.6s ease-out forwards;
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(99, 102, 241, 0.15);
        }

        .skill-progress {
          position: relative;
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          overflow: hidden;
        }

        .skill-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), var(--accent-light));
          border-radius: 999px;
          transition: width 1s ease-out;
        }

        .timeline-dot {
          position: relative;
        }

        .timeline-dot::before {
          content: '';
          position: absolute;
          width: 12px;
          height: 12px;
          background: var(--accent);
          border: 3px solid #0a0e1a;
          border-radius: 50%;
          left: -26px;
          top: 6px;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
        }
      `}</style>

      <div style={S.page}>
        {/* HERO HEADER */}
        <header style={{
          ...S.hero,
          background: scrolled 
            ? 'rgba(10, 14, 26, 0.95)' 
            : 'linear-gradient(135deg, rgba(10, 14, 26, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
        }}>
          <div style={S.heroContent} className="animate-in">
            <div style={S.heroLeft}>
              {/* Avatar */}
              <div style={S.avatar}>
                <div style={S.avatarText}>
                  {profile.first_name[0]}{profile.last_name[0]}
                </div>
                <div style={S.avatarGlow}></div>
              </div>

              <div>
                <h1 style={S.heroName}>{fullName}</h1>
                <p style={S.heroTitle}>{profile.summary}</p>
                
                {/* Status badge */}
                <div style={S.statusBadge}>
                  <span style={S.statusDot}></span>
                  Available for opportunities
                </div>
              </div>
            </div>

            <div style={S.heroRight}>
              <div style={S.contactCard}>
                <div style={S.contactItem}>
                  <span style={S.contactIcon}>📧</span>
                  {profile.contact?.email}
                </div>
                {profile.contact?.phone && (
                  <div style={S.contactItem}>
                    <span style={S.contactIcon}>📱</span>
                    {profile.contact.phone}
                  </div>
                )}
                {profile.contact?.address?.city && (
                  <div style={S.contactItem}>
                    <span style={S.contactIcon}>📍</span>
                    {profile.contact.address.city}, {profile.contact.address.state}
                  </div>
                )}
              </div>

              {/* Social Links */}
              {profile.links?.length > 0 && (
                <div style={S.socialLinks}>
                  {profile.links.map((link, i) => (
                    <a key={i} href={link.url} target="_blank" rel="noreferrer" style={S.socialLink}>
                      {link.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MAIN CONTENT GRID */}
        <div style={S.container}>
          <div style={S.grid}>
            {/* LEFT SIDEBAR */}
            <aside style={S.sidebar} className="animate-left">
              {/* SKILLS */}
              {profile.skills?.length > 0 && (
                <section style={S.card} className="card-hover">
                  <h3 style={S.sectionTitle}>
                    <span style={S.sectionIcon}>⚡</span>
                    Technical Skills
                  </h3>
                  <div style={S.skillsList}>
                    {profile.skills.map((skill, i) => {
                      const levelMap = { 
                        expert: 95, 
                        advanced: 80, 
                        intermediate: 60, 
                        beginner: 40 
                      };
                      const width = levelMap[skill.level] || 70;
                      
                      return (
                        <div key={i} style={S.skillItem}>
                          <div style={S.skillHeader}>
                            <span style={S.skillName}>{skill.name}</span>
                            <span style={S.skillLevel}>{skill.level}</span>
                          </div>
                          <div className="skill-progress">
                            <div 
                              className="skill-progress-bar"
                              style={{ width: `${width}%` }}
                            />
                          </div>
                          {skill.years_experience && (
                            <div style={S.skillYears}>
                              {skill.years_experience} years experience
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* CUSTOM SECTIONS */}
              {profile.custom_sections?.map((section, i) => (
                <section key={i} style={S.card} className="card-hover">
                  <h3 style={S.sectionTitle}>
                    <span style={S.sectionIcon}>
                      {section.type === 'certifications' ? '🏆' : 
                       section.type === 'languages' ? '🌐' : 
                       section.type === 'awards' ? '⭐' : '📄'}
                    </span>
                    {section.name}
                  </h3>
                  <div style={S.customList}>
                    {section.elements?.map((elem, j) => (
                      <div key={j} style={S.customItem}>
                        <div style={S.customItemHeader}>
                          <strong style={S.customItemTitle}>{elem.name}</strong>
                          {elem.date && !elem.date.ongoing && (
                            <span style={S.customItemDate}>{elem.date.end || elem.date.start}</span>
                          )}
                        </div>
                        {elem.issuer && (
                          <div style={S.customItemSubtext}>{elem.issuer}</div>
                        )}
                        {elem.description && (
                          <p style={S.customItemDesc}>{elem.description}</p>
                        )}
                        {elem.proficiency && (
                          <span style={S.proficiencyBadge}>{elem.proficiency}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </aside>

            {/* MAIN CONTENT */}
            <main style={S.main} className="animate-right">
              {/* WORK EXPERIENCE */}
              {profile.work_experiences?.length > 0 && (
                <section style={S.card} className="card-hover">
                  <h2 style={S.mainSectionTitle}>
                    <span style={S.sectionIcon}>💼</span>
                    Work Experience
                  </h2>
                  <div style={S.timeline}>
                    {profile.work_experiences.map((work, i) => (
                      <div key={i} style={S.timelineItem} className="timeline-dot">
                        <div style={S.workHeader}>
                          <div>
                            <h4 style={S.workTitle}>{work.job_title}</h4>
                            <div style={S.workCompany}>
                              {work.employer}
                              <span style={S.workLocation}>• {work.location}</span>
                            </div>
                          </div>
                          <div style={S.workDate}>
                            <span style={work.date.ongoing ? S.currentBadge : S.dateBadge}>
                              {work.date.start} - {work.date.ongoing ? 'Present' : work.date.end}
                            </span>
                          </div>
                        </div>
                        <p style={S.workDescription}>{work.description}</p>
                        {work.bullets && (
                          <ul style={S.bulletList}>
                            {work.bullets.map((bullet, j) => (
                              <li key={j} style={S.bulletItem}>
                                <span style={S.bulletIcon}>→</span>
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* EDUCATION */}
              {profile.education?.length > 0 && (
                <section style={S.card} className="card-hover">
                  <h2 style={S.mainSectionTitle}>
                    <span style={S.sectionIcon}>🎓</span>
                    Education
                  </h2>
                  <div style={S.timeline}>
                    {profile.education.map((edu, i) => (
                      <div key={i} style={S.timelineItem} className="timeline-dot">
                        <div style={S.workHeader}>
                          <div>
                            <h4 style={S.workTitle}>{edu.degree}</h4>
                            <div style={S.workCompany}>{edu.school_name}</div>
                          </div>
                          <div style={S.workDate}>
                            <span style={S.dateBadge}>
                              {edu.date.start} - {edu.date.ongoing ? 'Present' : edu.date.end}
                            </span>
                          </div>
                        </div>
                        {edu.gpa && (
                          <div style={S.gpaTag}>GPA: {edu.gpa}</div>
                        )}
                        {edu.education_description && (
                          <p style={S.workDescription}>{edu.education_description}</p>
                        )}
                        {edu.awards && (
                          <div style={S.awards}>
                            {edu.awards.map((award, j) => (
                              <span key={j} style={S.awardBadge}>🏆 {award}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* PROJECTS */}
              {profile.extra_experiences?.length > 0 && (
                <section style={S.card} className="card-hover">
                  <h2 style={S.mainSectionTitle}>
                    <span style={S.sectionIcon}>🚀</span>
                    Projects & Activities
                  </h2>
                  <div style={S.projectsGrid}>
                    {profile.extra_experiences.map((project, i) => (
                      <div key={i} style={S.projectCard}>
                        <div style={S.projectHeader}>
                          <h4 style={S.projectTitle}>{project.name}</h4>
                          {project.role && (
                            <span style={S.projectRole}>{project.role}</span>
                          )}
                        </div>
                        <p style={S.projectDescription}>{project.description}</p>
                        {project.bullets && (
                          <ul style={S.bulletList}>
                            {project.bullets.map((bullet, j) => (
                              <li key={j} style={S.bulletItem}>
                                <span style={S.bulletIcon}>→</span>
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        )}
                        {project.link && (
                          <a href={project.link} target="_blank" rel="noreferrer" style={S.projectLink}>
                            View Project →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </main>
          </div>
        </div>

        {/* FOOTER */}
        <footer style={S.footer}>
          <div style={S.footerContent}>
            <p>© {new Date().getFullYear()} {fullName}. All rights reserved.</p>
            <p style={S.footerSubtext}>Built with passion and precision</p>
          </div>
        </footer>
      </div>
    </>
  );
}

/* =========================
   STYLES
========================= */

const S = {
  page: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    background: '#0a0e1a',
    color: '#e5e7eb',
    minHeight: '100vh',
  },

  hero: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
    transition: 'all 0.3s ease',
  },

  heroContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '40px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    flexWrap: 'wrap',
  },

  heroLeft: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
    flex: 1,
  },

  avatar: {
    position: 'relative',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--accent, #6366f1), #8b5cf6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  avatarText: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#fff',
    zIndex: 2,
  },

  avatarGlow: {
    position: 'absolute',
    inset: '-10px',
    background: 'linear-gradient(135deg, var(--accent, #6366f1), #8b5cf6)',
    borderRadius: '50%',
    filter: 'blur(20px)',
    opacity: 0.5,
    zIndex: 1,
  },

  heroName: {
    fontSize: '36px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #fff, #cbd5e1)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '8px',
  },

  heroTitle: {
    fontSize: '16px',
    color: '#94a3b8',
    maxWidth: '600px',
    lineHeight: '1.6',
    marginBottom: '12px',
  },

  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 14px',
    background: 'rgba(34, 197, 94, 0.1)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    borderRadius: '999px',
    fontSize: '13px',
    color: '#86efac',
    fontWeight: '500',
  },

  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#22c55e',
    animation: 'pulse 2s ease-in-out infinite',
  },

  heroRight: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  contactCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    padding: '16px',
    backdropFilter: 'blur(10px)',
  },

  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
    color: '#cbd5e1',
    marginBottom: '8px',
  },

  contactIcon: {
    fontSize: '18px',
  },

  socialLinks: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },

  socialLink: {
    padding: '8px 16px',
    background: 'rgba(99, 102, 241, 0.1)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    borderRadius: '8px',
    color: 'var(--accent, #6366f1)',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'all 0.2s',
  },

  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '40px 32px',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: '350px 1fr',
    gap: '32px',
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

  card: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '24px',
    backdropFilter: 'blur(10px)',
  },

  sectionTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  mainSectionTitle: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#f8fafc',
    marginBottom: '28px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  sectionIcon: {
    fontSize: '20px',
  },

  skillsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  skillItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  skillHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  skillName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#e5e7eb',
  },

  skillLevel: {
    fontSize: '12px',
    color: 'var(--accent, #6366f1)',
    textTransform: 'capitalize',
    fontWeight: '600',
  },

  skillYears: {
    fontSize: '11px',
    color: '#64748b',
    marginTop: '2px',
  },

  customList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  customItem: {
    paddingBottom: '16px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  },

  customItemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: '6px',
  },

  customItemTitle: {
    fontSize: '14px',
    color: '#f1f5f9',
  },

  customItemDate: {
    fontSize: '12px',
    color: '#64748b',
  },

  customItemSubtext: {
    fontSize: '13px',
    color: '#94a3b8',
    marginBottom: '6px',
  },

  customItemDesc: {
    fontSize: '13px',
    color: '#cbd5e1',
    lineHeight: '1.6',
    marginTop: '8px',
  },

  proficiencyBadge: {
    display: 'inline-block',
    padding: '4px 10px',
    background: 'rgba(99, 102, 241, 0.1)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    borderRadius: '999px',
    fontSize: '11px',
    color: 'var(--accent, #6366f1)',
    fontWeight: '600',
    marginTop: '8px',
  },

  timeline: {
    position: 'relative',
    paddingLeft: '32px',
    borderLeft: '2px solid rgba(99, 102, 241, 0.2)',
  },

  timelineItem: {
    marginBottom: '32px',
    position: 'relative',
  },

  workHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '12px',
    flexWrap: 'wrap',
  },

  workTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: '6px',
  },

  workCompany: {
    fontSize: '15px',
    color: 'var(--accent, #6366f1)',
    fontWeight: '600',
  },

  workLocation: {
    color: '#94a3b8',
    fontWeight: '400',
    marginLeft: '4px',
  },

  workDate: {
    flexShrink: 0,
  },

  dateBadge: {
    padding: '6px 12px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#94a3b8',
    fontWeight: '500',
  },

  currentBadge: {
    padding: '6px 12px',
    background: 'rgba(34, 197, 94, 0.1)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#86efac',
    fontWeight: '600',
  },

  workDescription: {
    fontSize: '14px',
    color: '#cbd5e1',
    lineHeight: '1.7',
    marginBottom: '16px',
  },

  bulletList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  bulletItem: {
    fontSize: '14px',
    color: '#94a3b8',
    lineHeight: '1.6',
    display: 'flex',
    gap: '12px',
  },

  bulletIcon: {
    color: 'var(--accent, #6366f1)',
    fontWeight: 'bold',
    flexShrink: 0,
  },

  gpaTag: {
    display: 'inline-block',
    padding: '4px 10px',
    background: 'rgba(99, 102, 241, 0.1)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    borderRadius: '6px',
    fontSize: '12px',
    color: 'var(--accent, #6366f1)',
    fontWeight: '600',
    marginBottom: '12px',
  },

  awards: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginTop: '12px',
  },

  awardBadge: {
    padding: '4px 10px',
    background: 'rgba(251, 191, 36, 0.1)',
    border: '1px solid rgba(251, 191, 36, 0.3)',
    borderRadius: '6px',
    fontSize: '12px',
    color: '#fbbf24',
    fontWeight: '500',
  },

  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },

  projectCard: {
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    transition: 'all 0.3s',
  },

  projectHeader: {
    marginBottom: '12px',
  },

  projectTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: '6px',
  },

  projectRole: {
    fontSize: '13px',
    color: 'var(--accent, #6366f1)',
    fontWeight: '600',
  },

  projectDescription: {
    fontSize: '13px',
    color: '#cbd5e1',
    lineHeight: '1.6',
    marginBottom: '12px',
  },

  projectLink: {
    display: 'inline-block',
    marginTop: '12px',
    color: 'var(--accent, #6366f1)',
    fontSize: '13px',
    fontWeight: '600',
    textDecoration: 'none',
  },

  footer: {
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '32px',
    marginTop: '40px',
  },

  footerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    textAlign: 'center',
  },

  footerSubtext: {
    fontSize: '13px',
    color: '#64748b',
    marginTop: '8px',
  },
};