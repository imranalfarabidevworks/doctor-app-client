import DoctorsCard from "@/app/components/DoctorsCard";

const TopDoctors = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`, {
    cache: "no-store",
  });

  const result = await res.json();
  const doctors = result.success ? result.data : [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600&display=swap');

        .td-section {
          font-family: 'Outfit', sans-serif;
          padding: 80px 24px;
          position: relative;
          overflow: hidden;
        }

        .td-bg-glow {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .td-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(37,99,235,0.1);
          border: 1px solid rgba(37,99,235,0.2);
          border-radius: 100px;
          padding: 5px 16px 5px 8px;
          margin-bottom: 18px;
        }
        .td-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #3b82f6;
          box-shadow: 0 0 8px rgba(59,130,246,0.8);
        }
        .td-eyebrow-text {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #60a5fa;
        }

        .td-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 700;
          color: #f1f5f9;
          line-height: 1.1;
          margin: 0 0 14px;
        }
        .td-title span {
          color: transparent;
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          background-clip: text;
        }

        .td-subtitle {
          font-size: 15px;
          font-weight: 300;
          color: #475569;
          max-width: 460px;
          margin: 0 auto 56px;
          line-height: 1.7;
        }

        .td-divider {
          width: 48px;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 2px;
          margin: 0 auto 20px;
        }

        .td-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 28px;
          max-width: 1040px;
          margin: 0 auto;
        }

        @media (min-width: 1024px) {
          .td-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .td-cta-wrap {
          margin-top: 52px;
          text-align: center;
        }
        .td-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 32px;
          border-radius: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: #94a3b8;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .td-cta:hover {
          background: rgba(59,130,246,0.1);
          border-color: rgba(59,130,246,0.3);
          color: #93c5fd;
          transform: translateY(-1px);
        }
      `}</style>

      <section className="td-section">
        <div className="td-bg-glow" />

        {/* Header — centered */}
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div className="td-eyebrow" style={{ display: "inline-flex" }}>
            <span className="td-eyebrow-dot" />
            <span className="td-eyebrow-text">Verified Specialists</span>
          </div>
          <h2 className="td-title">
            Meet Our <span>Top Doctors</span>
          </h2>
          <div className="td-divider" />
          <p className="td-subtitle">
            Handpicked from the best in their fields — trusted by thousands of patients for expert, compassionate care.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="td-grid" style={{ position: "relative", zIndex: 1 }}>
          {doctors.length > 0 ? (
            doctors.slice(0, 3).map((doc, i) => (
              <DoctorsCard key={doc._id} doctor={doc} index={i} />
            ))
          ) : (
            <p style={{ color: "#475569", gridColumn: "1/-1", textAlign: "center", padding: "48px 0" }}>
              No top doctors found.
            </p>
          )}
        </div>

        {/* View All CTA */}
        <div className="td-cta-wrap">
          <a href="/appointments" className="td-cta">
            View All Doctors
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>
    </>
  );
};

export default TopDoctors;