"use client";

import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

interface StyledQRProps {
  value: string;
  logo?: string | null;
  fgColor?: string;
  bgColor?: string;
}

export default function StyledQR({ value, logo, fgColor, bgColor }: StyledQRProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);

  // Init QR
  useEffect(() => {
    qrCode.current = new QRCodeStyling({
      width: 240,
      height: 240,
      type: "svg",
      data: value,
      image: logo || undefined,
      dotsOptions: {
        color: "url(#grad)", // gradient fill
        type: "rounded", // rounded dots
      },
      backgroundOptions: {
        color: bgColor || "#ffffff",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 4,
      },
    });

    if (qrRef.current && qrCode.current) {
      qrCode.current.append(qrRef.current);
    }

    return () => {
      if (qrRef.current) {
        qrRef.current.innerHTML = ""; // cleanup
      }
    };
  }, []);

  // Update on changes
  useEffect(() => {
    if (qrCode.current) {
      qrCode.current.update({
        data: value,
        image: logo || undefined,
        backgroundOptions: { color: bgColor || "#ffffff" },
      });
    }
  }, [value, logo, fgColor, bgColor]);

  return (
    <div ref={qrRef} className="relative">
      {/* Gradient Def */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={fgColor || "#4f46e5"} />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
