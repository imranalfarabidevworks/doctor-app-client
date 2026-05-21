"use client";

import { FiShield, FiClock, FiUserCheck, FiHeart } from "react-icons/fi";

const features = [
  {
    id: 1,
    icon: FiShield,
    color: { icon: "#3b82f6", bg: "rgba(37,99,235,0.1)", border: "rgba(37,99,235,0.2)", glow: "rgba(37,99,235,0.15)", shine: "rgba(59,130,246,0.06)" },
    label: "Trust",
    title: "100% Verified Doctors",
    desc: "Every specialist is strictly verified with BMDC registration and thorough background checks before joining our platform.",
    stat: "550+", statLabel: "Verified Specialists",
  },
  {
    id: 2,
    icon: FiClock,
    color: { icon: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)", glow: "rgba(16,185,129,0.15)", shine: "rgba(16,185,129,0.06)" },
    label: "Speed",
    title: "Instant Live Booking",
    desc: "No more waiting in hospital queues. Pick your preferred slot and confirm your appointment in under a minute.",
    stat: "< 1min", statLabel: "Avg. Booking Time",
  },
  {
    id: 3,
    icon: FiUserCheck,
    color: { icon: "#8b5cf6", bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.2)", glow: "rgba(139,92,246,0.15)", shine: "rgba(139,92,246,0.06)" },
    label: "Expertise",
    title: "Top-Tier Specialists",
    desc: "Direct access to senior consultants from leading medical colleges and hospitals across Bangladesh.",
    stat: "4.9★", statLabel: "Average Rating",
  },
  {
    id: 4,
    icon: FiHeart,
    color: { icon: "#f43f5e", bg: "rgba(244,63,94,0.1)", border: "rgba(244,63,94,0.2)", glow: "rgba(244,63,94,0.15)", shine: "rgba(244,63,94,0.06)" },
    label: "Care",
    title: "Patient-First Care",
    desc: "Manage bookings, health history, and reviews in one secure dashboard built entirely around your wellbeing.",
    stat: "50k+", statLabel: "Happy Patients",
  },
];

export default function WhyChooseUs() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

        .wcu-section {
          font-family: 'Outfit', sans-serif;
          background: #020817;
          padding: 100px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          position: relative;
          overflow: hidden;
        }

        /* subtle grid texture */
        .wcu-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%);
          pointer-events: none;
        }

        .wcu-glow {
          position: absolute;
          top: -80px; left: 50%; transform: translateX(-50%);
          width: 700px; height: 300px;
          background: radial-gradient(ellipse, rgba(16,185,129,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .wcu-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }

        /* Header */
        .wcu-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(16,185,129,0.08);
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: 100px; padding: 5px 14px 5px 8px;
          margin-bottom: 18px;
        }
        .wcu-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px rgba(16,185,129,0.8);
        }
        .wcu-eyebrow-text {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #34d399;
        }

        .wcu-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(34px, 4.5vw, 50px);
          font-weight: 700; color: #f1f5f9;
          line-height: 1.1; margin: 0 0 14px;
        }
        .wcu-title em {
          font-style: italic;
          background: linear-gradient(135deg, #34d399, #3b82f6);
          -webkit-background-clip: text; background-clip: text;
          color: transparent;
        }

        .wcu-sub {
          font-size: 15px; font-weight: 300;
          color: #475569; max-width: 440px;
          margin: 0 auto; line-height: 1.7;
        }

        .wcu-divider {
          width: 40px; height: 2px;
          background: linear-gradient(90deg, #10b981, #3b82f6);
          border-radius: 2px; margin: 0 auto 16px;
        }

        /* Grid */
        .wcu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px; margin-top: 60px;
        }
        @media (min-width: 1024px) {
          .wcu-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* Card */
        .wcu-card {
          position: relative;
          background: linear-gradient(160deg, rgba(15,23,42,0.9), rgba(8,14,28,0.95));
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 28px 24px 24px;
          overflow: hidden;
          transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
          animation: wcu-in 0.5s ease both;
        }
        .wcu-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px var(--c-glow);
          border-color: var(--c-border);
        }
        .wcu-card:hover .wcu-icon-wrap {
          box-shadow: 0 0 24px var(--c-glow);
          border-color: var(--c-border);
        }
        .wcu-card:hover .wcu-shine { opacity: 1; }
        .wcu-card:hover .wcu-stat { color: var(--c-icon); }

        @keyframes wcu-in {
          from { opacity:0; transform: translateY(18px); }
          to   { opacity:1; transform: translateY(0); }
        }

        /* Top shine line */
        .wcu-shine {
          position: absolute; top: 0; left: 20px; right: 20px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--c-border), transparent);
          opacity: 0; transition: opacity 0.35s ease;
        }

        /* Corner decoration */
        .wcu-corner {
          position: absolute; top: 16px; right: 16px;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 3px 9px; border-radius: 100px;
          border: 1px solid; opacity: 0.7;
        }

        .wcu-icon-wrap {
          width: 52px; height: 52px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 20px;
          transition: all 0.3s ease;
          flex-shrink: 0;
          background: var(--c-bg);
        }

        .wcu-card-title {
          font-family: 'Outfit', sans-serif;
          font-size: 16px; font-weight: 700;
          color: #f1f5f9; margin: 0 0 8px;
          line-height: 1.3;
        }

        .wcu-card-desc {
          font-size: 13px; font-weight: 300;
          color: #475569; line-height: 1.7;
          margin: 0 0 20px;
        }

        .wcu-card-footer {
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex; align-items: baseline; gap: 6px;
        }

        .wcu-stat {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 700;
          color: #cbd5e1;
          transition: color 0.3s ease;
        }

        .wcu-stat-label {
          font-size: 11px; color: #334155;
          text-transform: uppercase; letter-spacing: 0.08em;
        }

        /* Bottom CTA strip */
        .wcu-bottom {
          margin-top: 56px; text-align: center;
          display: flex; align-items: center; justify-content: center; gap: 32px;
          flex-wrap: wrap;
        }
        .wcu-trust-item {
          display: flex; align-items: center; gap: 7px;
          font-size: 13px; color: #334155; font-weight: 500;
        }
        .wcu-trust-dot {
          width: 7px; height: 7px; border-radius: 50%;
        }
      `}</style>

      <section className="wcu-section">
        <div className="wcu-glow" />

        <div className="wcu-inner">
          {/* Header */}
          <div style={{ textAlign: "center" }}>
            <div className="wcu-eyebrow" style={{ display: "inline-flex" }}>
              <span className="wcu-eyebrow-dot" />
              <span className="wcu-eyebrow-text">Our Core Values</span>
            </div>
            <h2 className="wcu-title">
              Why Patients Trust <em>DocAppoint</em>
            </h2>
            <div className="wcu-divider" />
            <p className="wcu-sub">
              Built for Bangladesh's healthcare needs — transparent, fast, and genuinely patient-focused.
            </p>
          </div>

          {/* Cards */}
          <div className="wcu-grid">
            {features.map((item, i) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  className="wcu-card"
                  style={{
                    "--c-icon":   item.color.icon,
                    "--c-bg":     item.color.bg,
                    "--c-border": item.color.border,
                    "--c-glow":   item.color.glow,
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  <div className="wcu-shine" />

                  {/* Corner label */}
                  <div
                    className="wcu-corner"
                    style={{
                      background: item.color.bg,
                      borderColor: item.color.border,
                      color: item.color.icon,
                    }}
                  >
                    {item.label}
                  </div>

                  {/* Icon */}
                  <div className="wcu-icon-wrap">
                    <IconComp size={22} color={item.color.icon} />
                  </div>

                  {/* Text */}
                  <h3 className="wcu-card-title">{item.title}</h3>
                  <p className="wcu-card-desc">{item.desc}</p>

                  {/* Stat */}
                  <div className="wcu-card-footer">
                    <span className="wcu-stat">{item.stat}</span>
                    <span className="wcu-stat-label">{item.statLabel}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust strip */}
          <div className="wcu-bottom">
            {[
              { color: "#3b82f6", text: "BMDC Verified Doctors" },
              { color: "#10b981", text: "SSL Encrypted Payments" },
              { color: "#8b5cf6", text: "24/7 Patient Support" },
              { color: "#f43f5e", text: "No Hidden Charges" },
            ].map((t, i) => (
              <div className="wcu-trust-item" key={i}>
                <span className="wcu-trust-dot" style={{ background: t.color, boxShadow: `0 0 6px ${t.color}` }} />
                {t.text}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}