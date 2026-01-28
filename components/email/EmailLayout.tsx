import * as React from "react";

/**
 * EmailLayout Component
 *
 * Provides a consistent, branded layout for all email templates.
 *
 * Features:
 * - Brand colors matching frontend (#faf2f0, #6d7ca7, #3d3638, etc.)
 * - Logo in header
 * - Optional decorative adornments (house or taper SVG)
 * - Footer with contact information placeholders
 * - Email-safe inline CSS styling
 *
 * Note: Logo and adornment SVGs must be accessible via SITE_BASE_URL in production.
 * Ensure SITE_BASE_URL environment variable is set correctly.
 */

interface EmailLayoutProps {
  children: React.ReactNode;
  showAdornment?: boolean;
  adornmentType?: "house" | "taper";
}

export const EmailLayout: React.FC<EmailLayoutProps> = ({
  children,
  showAdornment = true,
  adornmentType = "house",
}) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#faf2f0",
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      {/* Header with Logo */}
      <div
        style={{
          backgroundColor: "#6d7ca7",
          padding: "30px 20px",
          textAlign: "center",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <div
          style={{
            display: "inline-block",
            maxWidth: "200px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${process.env.SITE_BASE_URL || "http://localhost:3000"}/icons/logo-fff.svg`}
            alt="Sieben Gipfel Blick Logo"
            width={203}
            height={62}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              maxWidth: "203px",
              border: "0",
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "40px 30px",
          color: "#3d3638",
          lineHeight: "1.6",
        }}
      >
        {children}
      </div>

      {/* Adornment Section */}
      {showAdornment && (
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px 30px",
            textAlign: "center",
          }}
        >
          <EmailAdornment type={adornmentType} />
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          backgroundColor: "#ebe3e1",
          padding: "30px 20px",
          textAlign: "center",
          fontSize: "14px",
          color: "#3d3638",
          borderRadius: "0 0 8px 8px",
        }}
      >
        <p style={{ margin: "0 0 10px 0" }}>
          <strong>Sieben Gipfel Blick</strong>
        </p>
        <p style={{ margin: "5px 0" }}>Email: [PLACEHOLDER_EMAIL]</p>
        <p style={{ margin: "5px 0" }}>Telefon: [PLACEHOLDER_PHONE]</p>
        <p style={{ margin: "5px 0" }}>Adresse: [PLACEHOLDER_ADDRESS]</p>
        <p
          style={{
            margin: "20px 0 0 0",
            fontSize: "12px",
            color: "#554f51",
          }}
        >
          © {new Date().getFullYear()} Sieben Gipfel Blick. Alle Rechte
          vorbehalten.
        </p>
      </div>
    </div>
  );
};

interface EmailAdornmentProps {
  type?: "house" | "taper";
}

export const EmailAdornment: React.FC<EmailAdornmentProps> = ({
  type = "house",
}) => {
  const adornmentSrc =
    type === "house"
      ? `${process.env.SITE_BASE_URL || "http://localhost:3000"}/icons/adornment-house.svg`
      : `${process.env.SITE_BASE_URL || "http://localhost:3000"}/icons/adornment-taper.svg`;

  return (
    <div
      style={{
        display: "inline-block",
        maxWidth: "200px",
        opacity: 0.8,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={adornmentSrc}
        alt=""
        width={496}
        height={30}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          maxWidth: "200px",
          border: "0",
        }}
      />
    </div>
  );
};
