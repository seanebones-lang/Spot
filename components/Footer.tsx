"use client";

import Link from "next/link";
import { Globe } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[#121212] border-t border-white/10 px-8 w-full"
      style={{
        paddingLeft: "32px",
        paddingRight: "32px",
        paddingTop: "16px",
        paddingBottom: "16px",
        position: "relative",
        zIndex: 10,
      }}
    >
      <nav className="w-full">
        {/* Main Footer Links - Compact Spotify Structure */}
        <div
          className="mb-3"
          style={{
            gap: "16px",
            marginBottom: "12px",
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(150px, 1fr))",
            width: "100%",
            maxWidth: "100%",
          }}
        >
          {/* Company - TypeList Structure */}
          <div style={{ display: "block", minWidth: "150px" }}>
            <ul
              role="list"
              className="space-y-2"
              style={{ listStyle: "none", padding: 0, margin: 0, gap: "8px" }}
            >
              <li>
                <Link
                  href="/about"
                  className="text-spotify-text-gray hover:text-white transition-colors text-sm"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="text-spotify-text-gray hover:text-white transition-colors text-sm"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/for-the-record"
                  className="text-spotify-text-gray hover:text-white transition-colors text-sm"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  For the Record
                </Link>
              </li>
            </ul>
          </div>

          {/* Communities - TypeList Structure */}
          <div style={{ display: "block", minWidth: "150px" }}>
            <ul
              role="list"
              className="space-y-2"
              style={{ listStyle: "none", padding: 0, margin: 0, gap: "8px" }}
            >
              <li>
                <Link
                  href="/artist/signup"
                  className="text-spotify-text-gray hover:text-white transition-colors text-sm"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  For Artists
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/artist"
                  className="text-spotify-text-gray hover:text-white transition-colors text-sm font-medium"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  Artist Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/developers"
                  className="text-spotify-text-gray hover:text-white transition-colors text-sm"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  Developers
                </Link>
              </li>
              <li>
                <Link
                  href="/advertising"
                  className="text-spotify-text-gray hover:text-white transition-colors text-sm"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  Advertising
                </Link>
              </li>
              <li>
                <Link
                  href="/investors"
                  className="text-spotify-text-gray hover:text-white transition-colors text-sm"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  Investors
                </Link>
              </li>
              <li>
                <Link
                  href="/vendors"
                  className="text-spotify-text-gray hover:text-white transition-colors text-sm"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  Vendors
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links - TypeList Structure */}
          <div style={{ display: "block", minWidth: "150px" }}>
            <p
              className="text-white text-sm mb-2"
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 400,
                color: "#FFFFFF",
                marginBottom: "8px",
              }}
            >
              Useful links
            </p>
            <ul
              role="list"
              className="space-y-2"
              style={{ listStyle: "none", padding: 0, margin: 0, gap: "8px" }}
            >
              <li>
                <Link
                  href="/support"
                  className="text-spotify-text-gray hover:text-white transition-colors text-sm"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/mobile-app"
                  className="text-spotify-text-gray hover:text-white transition-colors text-sm"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  Free Mobile App
                </Link>
              </li>
              <li>
                <Link
                  href="/popular-by-country"
                  className="text-spotify-text-gray hover:text-white transition-colors text-sm"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  Popular by Country
                </Link>
              </li>
              <li>
                <Link
                  href="/import-music"
                  className="text-spotify-text-gray hover:text-white transition-colors text-sm"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  Import your music
                </Link>
              </li>
            </ul>
          </div>

          {/* EmPulse Plans - TypeList Structure */}
          <div style={{ display: "block", minWidth: "150px" }}>
            <ul
              role="list"
              className="space-y-2"
              style={{ listStyle: "none", padding: 0, margin: 0, gap: "8px" }}
            >
              <li>
                <Link
                  href="/subscription"
                  className="text-spotify-text-gray hover:text-white transition-colors text-sm"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  Premium Individual
                </Link>
              </li>
              <li>
                <Link
                  href="/subscription"
                  className="text-spotify-text-gray hover:text-white transition-colors text-sm"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  Premium Duo
                </Link>
              </li>
              <li>
                <Link
                  href="/subscription"
                  className="text-spotify-text-gray hover:text-white transition-colors text-sm"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  Premium Family
                </Link>
              </li>
              <li>
                <Link
                  href="/subscription"
                  className="text-spotify-text-gray hover:text-white transition-colors text-sm"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  Premium Student
                </Link>
              </li>
              <li>
                <Link
                  href="/subscription"
                  className="text-spotify-text-gray hover:text-white transition-colors text-sm"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  EmPulse Free
                </Link>
              </li>
              <li>
                <Link
                  href="/audiobooks"
                  className="text-spotify-text-gray hover:text-white transition-colors text-sm"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  Audiobooks Access
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mb-3" style={{ marginBottom: "12px" }}>
          <div className="flex items-center gap-2" style={{ gap: "16px" }}>
            <a
              href="https://instagram.com/spotify"
              aria-label="Instagram"
              title="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-full transition-colors hover:bg-white/10"
              style={{ width: "40px", height: "40px", color: "#B3B3B3" }}
            >
              <Globe size={16} />
            </a>
            <a
              href="https://twitter.com/spotify"
              aria-label="Twitter"
              title="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-full transition-colors hover:bg-white/10"
              style={{ width: "40px", height: "40px", color: "#B3B3B3" }}
            >
              <Globe size={16} />
            </a>
            <a
              href="https://www.facebook.com/Spotify"
              aria-label="Facebook"
              title="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-full transition-colors hover:bg-white/10"
              style={{ width: "40px", height: "40px", color: "#B3B3B3" }}
            >
              <Globe size={16} />
            </a>
          </div>
        </div>

        {/* Legal & Privacy Links - Compact Spotify Structure */}
        <div
          className="border-t border-white/10 pt-3"
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "12px",
          }}
        >
          <div
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-3"
            style={{ gap: "12px", marginBottom: "12px" }}
          >
            <div
              className="flex flex-wrap gap-x-4 gap-y-2"
              style={{ gap: "16px" }}
            >
              <Link
                href="/legal"
                className="text-spotify-text-gray hover:text-white text-xs transition-colors"
                style={{
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#B3B3B3",
                }}
              >
                Legal
              </Link>
              <Link
                href="/safety-privacy"
                className="text-spotify-text-gray hover:text-white text-xs transition-colors"
                style={{
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#B3B3B3",
                }}
              >
                Safety & Privacy Center
              </Link>
              <Link
                href="/legal/privacy"
                className="text-spotify-text-gray hover:text-white text-xs transition-colors"
                style={{
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#B3B3B3",
                }}
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookies"
                className="text-spotify-text-gray hover:text-white text-xs transition-colors"
                style={{
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#B3B3B3",
                }}
              >
                Cookies
              </Link>
              <Link
                href="/about-ads"
                className="text-spotify-text-gray hover:text-white text-xs transition-colors"
                style={{
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#B3B3B3",
                }}
              >
                About Ads
              </Link>
              <Link
                href="/accessibility"
                className="text-spotify-text-gray hover:text-white text-xs transition-colors"
                style={{
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#B3B3B3",
                }}
              >
                Accessibility
              </Link>
            </div>
          </div>

          {/* Copyright & Language Selector */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p
              className="text-spotify-text-gray text-xs"
              style={{ fontSize: "12px", lineHeight: "16px", color: "#B3B3B3" }}
            >
              © {currentYear} EmPulse Music AB
            </p>
            <button
              className="px-3 py-1.5 rounded-md text-spotify-text-gray hover:text-white hover:bg-white/10 transition-colors text-xs font-bold"
              style={{
                fontSize: "12px",
                lineHeight: "16px",
                fontWeight: 700,
                color: "#B3B3B3",
                padding: "8px 12px",
                height: "32px",
              }}
            >
              English
            </button>
          </div>
        </div>
      </nav>
    </footer>
  );
}
