"use client";

import Link from "next/link";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop",
];

const SPECIALTY_COLORS = {
  "Cardiologist":      { bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.25)",   text: "#fca5a5",  glow: "rgba(239,68,68,0.15)" },
  "Neurologist":       { bg: "rgba(139,92,246,0.12)",  border: "rgba(139,92,246,0.25)",  text: "#c4b5fd",  glow: "rgba(139,92,246,0.12)" },
  "Dermatologist":     { bg: "rgba(236,72,153,0.12)",  border: "rgba(236,72,153,0.25)",  text: "#f9a8d4",  glow: "rgba(236,72,153,0.12)" },
  "General Physician": { bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.25)",  text: "#93c5fd",  glow: "rgba(59,130,246,0.12)" },
  "Orthopedist":       { bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.25)",  text: "#fcd34d",  glow: "rgba(245,158,11,0.12)" },
  "Pediatrician":      { bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.25)",  text: "#6ee7b7",  glow: "rgba(16,185,129,0.12)" },
  "Gynecologist":      { bg: "rgba(244,114,182,0.12)", border: "rgba(244,114,182,0.25)", text: "#fbcfe8",  glow: "rgba(244,114,182,0.12)" },
  "Psychiatrist":      { bg: "rgba(99,102,241,0.12)",  border: "rgba(99,102,241,0.25)",  text: "#a5b4fc",  glow: "rgba(99,102,241,0.12)" },
  "ENT Specialist":    { bg: "rgba(14,165,233,0.12)",  border: "rgba(14,165,233,0.25)",  text: "#7dd3fc",  glow: "rgba(14,165,233,0.12)" },
};

const DEFAULT_COLOR = {
  bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.2)", text: "#93c5fd", glow: "rgba(59,130,246,0.1)"
};

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const VerifiedIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
      stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
);

export default function DoctorsCard({ doctor, index = 0 }) {
  const {
    name = "Dr. Unknown",
    specialty = "General Physician",
    image,
    rating = 4.8,
    reviews = 120,
    experience = "5+ Years",
    location = "Dhaka, Bangladesh",
    available = true,
    fee = 800,
    _id,
  } = doctor;

  const imgSrc = image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
  const colors = SPECIALTY_COLORS[specialty] || DEFAULT_COLOR;
  const delay = `${index * 0.1}s`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@600;700&display=swap');

        .dc-card {
          font-family: 'Outfit', sans-serif;
          background: linear-gradient(160deg, rgba(15,23,42,0.95), rgba(10,18,35,0.98));
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
          animation: dc-fadein 0.5s ease both;
          animation-delay: var(--dc-delay);
          cursor: pointer;
        }
        .dc-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255,255,255,0.14);
          box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 40px var(--dc-glow);
        }
        .dc-card:hover .dc-img {
          transform: scale(1.05);
        }
        .dc-card:hover .dc-book-btn {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes dc-fadein {
          from { opacity:0; transform: translateY(20px); }
          to   { opacity:1; transform: translateY(0); }
        }

        .dc-img-wrap {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        .dc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: transform 0.5s ease;
          display: block;
        }
        .dc-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(10,18,35,0.95) 100%);
        }
        .dc-avail-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          backdrop-filter: blur(8px);
          border: 1px solid;
        }
        .dc-avail-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          animation: dc-pulse 2s ease infinite;
        }
        @keyframes dc-pulse {
          0%,100% { opacity:1; }
          50% { opacity:0.4; }
        }

        .dc-body { padding: 20px 20px 0; }

        .dc-specialty-tag {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          margin-bottom: 10px;
          border: 1px solid;
        }

        .dc-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 700;
          color: #f1f5f9;
          margin: 0 0 4px;
          line-height: 1.2;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dc-location {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #475569;
          margin-bottom: 16px;
        }

        .dc-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 0 -20px;
        }

        .dc-stats {
          display: grid;
          grid-template-columns: 1fr 1px 1fr 1px 1fr;
          padding: 14px 0;
          gap: 0;
        }
        .dc-stat { text-align: center; }
        .dc-stat-val {
          font-size: 15px;
          font-weight: 700;
          color: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3px;
        }
        .dc-stat-label {
          font-size: 10px;
          color: #334155;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 2px;
        }
        .dc-stat-sep { background: rgba(255,255,255,0.07); }

        .dc-footer {
          padding: 0 20px 20px;
        }

        .dc-book-btn {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          background: linear-gradient(135deg, #1d4ed8, #4338ca);
          color: white;
          box-shadow: 0 4px 20px rgba(29,78,216,0.3);
          transition: all 0.25s ease;
          opacity: 0.85;
          transform: translateY(3px);
          text-decoration: none;
        }
        .dc-book-btn:hover {
          background: linear-gradient(135deg, #2563eb, #4f46e5);
          box-shadow: 0 8px 28px rgba(37,99,235,0.45);
        }
      `}</style>

      <div
        className="dc-card"
        style={{
          "--dc-delay": delay,
          "--dc-glow": colors.glow,
        }}
      >
        {/* Image */}
        <div className="dc-img-wrap">
          <img
            className="dc-img"
            src={imgSrc}
            alt={name}
            onError={e => { e.currentTarget.src = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]; }}
          />
          <div className="dc-img-overlay" />

          {/* Available badge */}
          <div
            className="dc-avail-badge"
            style={{
              background: available ? "rgba(16,185,129,0.15)" : "rgba(100,116,139,0.15)",
              borderColor: available ? "rgba(16,185,129,0.3)" : "rgba(100,116,139,0.3)",
              color: available ? "#34d399" : "#64748b",
            }}
          >
            <span
              className="dc-avail-dot"
              style={{ background: available ? "#34d399" : "#64748b" }}
            />
            {available ? "Available" : "Unavailable"}
          </div>
        </div>

        {/* Body */}
        <div className="dc-body">
          {/* Specialty tag */}
          <div
            className="dc-specialty-tag"
            style={{
              background: colors.bg,
              borderColor: colors.border,
              color: colors.text,
            }}
          >
            {specialty}
          </div>

          {/* Name */}
          <div className="dc-name">
            {name}
            <VerifiedIcon />
          </div>

          {/* Location */}
          <div className="dc-location">
            <LocationIcon />
            {location}
          </div>

          <div className="dc-divider" />

          {/* Stats */}
          <div className="dc-stats">
            <div className="dc-stat">
              <div className="dc-stat-val">
                <StarIcon />
                {Number(rating).toFixed(1)}
              </div>
              <div className="dc-stat-label">Rating</div>
            </div>
            <div className="dc-stat-sep" />
            <div className="dc-stat">
              <div className="dc-stat-val">{experience}</div>
              <div className="dc-stat-label">Experience</div>
            </div>
            <div className="dc-stat-sep" />
            <div className="dc-stat">
              <div className="dc-stat-val">{reviews}+</div>
              <div className="dc-stat-label">Reviews</div>
            </div>
          </div>

          <div className="dc-divider" />
        </div>

        {/* Footer */}
        <div className="dc-footer">
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 0 14px",
          }}>
            <div>
              <div style={{ fontSize: 11, color: "#334155", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Consultation Fee
              </div>
              <div style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 22, fontWeight: 700, color: "#f1f5f9", marginTop: 2,
              }}>
                ৳{fee}
                <span style={{ fontSize: 13, fontFamily: "'Outfit',sans-serif", fontWeight: 400, color: "#475569" }}>
                  {" "}/ visit
                </span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#475569", fontSize: 12 }}>
              <CalendarIcon />
              Today
            </div>
          </div>

          <Link
            href={`/appointments/${_id}`}
            className="dc-book-btn"
          >
            <CalendarIcon />
            View Details
          </Link>
        </div>
      </div>
    </>
  );
}