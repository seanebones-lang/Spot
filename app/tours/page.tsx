"use client";

import { Calendar, MapPin, Ticket } from "lucide-react";

const tourDates = [
  {
    id: "1",
    date: "2026-03-01",
    venue: "The Fillmore",
    city: "Denver, CO",
    tickets: true,
  },
  {
    id: "2",
    date: "2026-03-15",
    venue: "House of Blues",
    city: "Chicago, IL",
    tickets: true,
  },
];

export default function ToursPage() {
  return (
    <div
      className="min-h-screen bg-spotify-dark text-white p-8"
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        padding: "32px",
        color: "#FFFFFF",
      }}
    >
      <h1
        className="text-4xl font-bold mb-8"
        style={{
          fontSize: "32px",
          lineHeight: "36px",
          fontWeight: 700,
          color: "#FFFFFF",
          marginBottom: "32px",
        }}
      >
        Tour Dates
      </h1>
      <div className="space-y-4" style={{ gap: "16px" }}>
        {tourDates.map((date) => (
          <div
            key={date.id}
            className="bg-spotify-light-gray rounded-lg p-6 flex items-center justify-between hover:bg-spotify-dark-gray transition-all duration-200"
            style={{
              backgroundColor: "#181818",
              borderRadius: "8px",
              padding: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              transition: "background-color 200ms ease-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#282828";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#181818";
            }}
          >
            <div
              className="flex items-center gap-6"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
              }}
            >
              <div>
                <div
                  className="text-2xl font-bold"
                  style={{
                    fontSize: "24px",
                    lineHeight: "28px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                  }}
                >
                  {new Date(date.date).getDate()}
                </div>
                <div
                  className="text-sm text-spotify-text-gray"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  {new Date(date.date).toLocaleDateString("en-US", {
                    month: "short",
                  })}
                </div>
              </div>
              <div>
                <h3
                  className="font-bold text-lg"
                  style={{
                    fontSize: "18px",
                    lineHeight: "24px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: "4px",
                  }}
                >
                  {date.venue}
                </h3>
                <p
                  className="text-sm text-spotify-text-gray"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#B3B3B3",
                  }}
                >
                  {date.city}
                </p>
              </div>
            </div>
            {date.tickets && (
              <button
                className="bg-spotify-green hover:bg-[#8a1dd0] text-black px-6 py-2 rounded-full font-medium transition-colors"
                style={{
                  backgroundColor: "#7209B7",
                  color: "#000000",
                  padding: "12px 24px",
                  borderRadius: "500px",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  transition: "all 200ms ease-out",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#8a1dd0";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#7209B7";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Get Tickets
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
