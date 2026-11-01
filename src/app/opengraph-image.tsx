import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { MONOGRAM } from "@/components/ui/Monogram";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "radial-gradient(circle at 78% 38%, rgba(43,43,217,0.45), #0B0B12 58%)",
          color: "#F3EFE6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <svg width="72" height="72" viewBox={MONOGRAM.viewBox} fill="none">
            {MONOGRAM.letters.map((d) => (
              <path key={d} d={d} stroke="#F3EFE6" strokeWidth={2.4} strokeLinecap="square" />
            ))}
            <circle cx={MONOGRAM.signal.cx} cy={MONOGRAM.signal.cy} r={MONOGRAM.signal.r} fill="#EF7397" />
          </svg>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              border: "1px solid rgba(243,239,230,0.28)",
              borderRadius: 999,
              padding: "12px 22px",
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "#9494FF" }} />
            {profile.availability.label}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 148, lineHeight: 0.95, letterSpacing: -5 }}>{profile.fullName}</div>
          <div style={{ marginTop: 28, fontSize: 36, color: "#C9C5D2" }}>{profile.role}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(243,239,230,0.16)",
            paddingTop: 24,
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#9C98A6",
          }}
        >
          <span>{profile.location.display}</span>
          <span>{profile.hero.specs.find((spec) => spec.label === "Stack")?.value}</span>
        </div>
      </div>
    ),
    size,
  );
}
