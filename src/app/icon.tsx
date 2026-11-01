import { ImageResponse } from "next/og";
import { MONOGRAM } from "@/components/ui/Monogram";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0B12",
          borderRadius: 12,
        }}
      >
        <svg width="48" height="48" viewBox={MONOGRAM.viewBox} fill="none">
          {MONOGRAM.letters.map((d) => (
            <path key={d} d={d} stroke="#F3EFE6" strokeWidth={3.2} strokeLinecap="square" />
          ))}
          <circle cx={MONOGRAM.signal.cx} cy={MONOGRAM.signal.cy} r={3.2} fill="#EF7397" />
        </svg>
      </div>
    ),
    size,
  );
}
