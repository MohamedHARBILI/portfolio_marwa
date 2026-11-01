import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const photo = await readFile(join(process.cwd(), "src/assets/marwa-frej.jpg"));
const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

export default function OpengraphImage() {
  const stack = profile.hero.specs.find((spec) => spec.label === "Stack")?.value;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px",
          background: "linear-gradient(135deg, #FBF1F3 0%, #F7F3EE 45%, #F6E2E7 100%)",
          color: "#211A1D",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
              gap: 12,
              background: "#FFFFFF",
              border: "1px solid rgba(33,26,29,0.1)",
              borderRadius: 999,
              padding: "10px 22px",
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#1F8A5B" }} />
            {profile.availability.label}
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 36, fontSize: 124, lineHeight: 0.92, letterSpacing: -5, fontWeight: 700 }}>
            <span>{profile.firstName}</span>
            <span style={{ color: "#8C1D40" }}>{profile.lastName}</span>
          </div>
          <div style={{ marginTop: 30, fontSize: 38, fontWeight: 600 }}>{profile.role}</div>
          <div style={{ display: "flex", marginTop: 14, fontSize: 26, color: "#675D62" }}>
            {profile.location.display}
            {stack ? ` · ${stack}` : ""}
          </div>
        </div>

        <div style={{ display: "flex", position: "relative", width: 380, height: 475 }}>
          <div
            style={{
              position: "absolute",
              top: 18,
              left: 18,
              width: 380,
              height: 475,
              background: "#F6E2E7",
              borderRadius: "190px 190px 36px 36px",
              transform: "rotate(4deg)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
          <img
            src={photoSrc}
            alt=""
            width={380}
            height={475}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 380,
              height: 475,
              objectFit: "cover",
              objectPosition: "top",
              borderRadius: "190px 190px 36px 36px",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
