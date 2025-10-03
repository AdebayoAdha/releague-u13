"use client";
import { useState, useEffect } from "react";
import Main from "../../../components/Main";
import Section from "../../../components/Section";
import { FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa";

interface Fixture {
  id?: string;
  round: number;
  leg: number;
  homeTeam: string;
  awayTeam: string;
  homeTeamId?: string;
  awayTeamId?: string;
  status: string;
  date?: string;
  time?: string;
  venue: string;
  matchDate?: string;
}

export default function ScheduleMatches() {
  const [showForm, setShowForm] = useState(false);
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingFixture, setEditingFixture] = useState<number | null>(null);

  useEffect(() => {
    fetchFixtures();
  }, []);

  const fetchFixtures = async () => {
    try {
      const response = await fetch('/api/fixtures');
      const data = await response.json();
      if (data.success) {
        setFixtures(data.fixtures);
      }
    } catch (error) {
      console.error('Failed to fetch fixtures:', error);
    }
  };

  const resetFixtures = async () => {
    if (confirm('Are you sure you want to delete all fixtures? This action cannot be undone.')) {
      try {
        const response = await fetch('/api/fixtures', { method: 'DELETE' });
        const data = await response.json();
        if (data.success) {
          setFixtures([]);
          alert('All fixtures have been reset successfully!');
        } else {
          alert('Failed to reset fixtures');
        }
      } catch (error) {
        alert('Error resetting fixtures');
      }
    }
  };
  return (
    <Main>
      <div style={{ padding: "20px 16px 0" }}>
        <a
          href="/dashboard/admin"
          style={{
            display: "flex",
            alignItems: "center",
            color: "#059669",
            textDecoration: "none",
            marginBottom: "20px",
          }}
        >
          <FaArrowLeft style={{ marginRight: "8px" }} />
          Back to Dashboard
        </a>
      </div>
      <Section title="Schedule Matches">
        <div
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
            <button
              onClick={() => setShowForm(!showForm)}
              style={{
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                color: "white",
                border: "none",
                padding: "14px 28px",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(37, 99, 235, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(37, 99, 235, 0.3)";
              }}
            >
              <FaPlus />
              {showForm ? "Cancel" : "Schedule New Match"}
            </button>

            <button
              onClick={async () => {
                if (
                  confirm(
                    "Generate automatic fixtures for all teams? This will create a complete season schedule."
                  )
                ) {
                  try {
                    const response = await fetch("/api/fixtures/generate", {
                      method: "POST",
                    });
                    const data = await response.json();

                    if (data.success) {
                      setFixtures(data.fixtures);
                      alert(
                        `Fixtures generated successfully!\n${data.totalMatches} matches created across ${data.totalRounds} rounds.`
                      );
                    } else {
                      alert(data.error || "Failed to generate fixtures");
                    }
                  } catch (error) {
                    alert("Error generating fixtures");
                  }
                }
              }}
              style={{
                background: "linear-gradient(135deg, #059669, #047857)",
                color: "white",
                border: "none",
                padding: "14px 28px",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 12px rgba(5, 150, 105, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(5, 150, 105, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(5, 150, 105, 0.3)";
              }}
            >
              ⚡ Auto Generate Fixtures
            </button>

            {fixtures.length > 0 && (
              <button
                onClick={resetFixtures}
                style={{
                  background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                  color: "white",
                  border: "none",
                  padding: "14px 28px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(220, 38, 38, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(220, 38, 38, 0.3)";
                }}
              >
                <FaTrash />
                Reset Fixtures
              </button>
            )}
          </div>

          {showForm && (
            <div
              style={{
                background: "#f8fafc",
                padding: "24px",
                borderRadius: "12px",
                border: "2px solid #e2e8f0",
                marginBottom: "24px",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                  color: "#1e293b",
                }}
              >
                Schedule New Match
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <select
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: "2px solid #e2e8f0",
                    fontSize: "14px",
                  }}
                >
                  <option>Select Home Team</option>
                </select>
                <select
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: "2px solid #e2e8f0",
                    fontSize: "14px",
                  }}
                >
                  <option>Select Away Team</option>
                </select>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <input
                  type="date"
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: "2px solid #e2e8f0",
                    fontSize: "14px",
                  }}
                />
                <input
                  type="time"
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: "2px solid #e2e8f0",
                    fontSize: "14px",
                  }}
                />
              </div>
              <input
                type="text"
                placeholder="Venue"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "2px solid #e2e8f0",
                  fontSize: "14px",
                  marginBottom: "16px",
                  boxSizing: "border-box",
                }}
              />
              <button
                style={{
                  background: "#059669",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  marginRight: "12px",
                }}
              >
                Schedule Match
              </button>
            </div>
          )}

          {fixtures.length > 0 && (
            <div style={{ marginTop: "32px" }}>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                  color: "#1e293b",
                }}
              >
                Generated Fixtures ({fixtures.length} matches)
              </h3>
              <div style={{ display: "grid", gap: "16px" }}>
                {fixtures.map((fixture, index) => (
                  <div
                    key={index}
                    style={{
                      background: "white",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      padding: "16px",
                    }}
                  >
                    {editingFixture === index ? (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            marginBottom: "16px",
                          }}
                        >
                          <div
                            style={{
                              background: "#2563eb",
                              color: "white",
                              padding: "4px 8px",
                              borderRadius: "6px",
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          >
                            R{fixture.round}
                          </div>
                          <div style={{ fontSize: "16px", fontWeight: "600" }}>
                            {fixture.homeTeam} vs {fixture.awayTeam}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            gap: "12px",
                            marginBottom: "12px",
                          }}
                        >
                          <input
                            type="date"
                            defaultValue={fixture.date || ""}
                            style={{
                              padding: "8px",
                              borderRadius: "6px",
                              border: "1px solid #e2e8f0",
                              fontSize: "14px",
                            }}
                            onChange={(e) => {
                              const updatedFixtures = [...fixtures];
                              updatedFixtures[index] = {
                                ...fixture,
                                date: e.target.value,
                              };
                              setFixtures(updatedFixtures);
                            }}
                          />
                          <input
                            type="time"
                            defaultValue={fixture.time || ""}
                            style={{
                              padding: "8px",
                              borderRadius: "6px",
                              border: "1px solid #e2e8f0",
                              fontSize: "14px",
                            }}
                            onChange={(e) => {
                              const updatedFixtures = [...fixtures];
                              updatedFixtures[index] = {
                                ...fixture,
                                time: e.target.value,
                              };
                              setFixtures(updatedFixtures);
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Venue"
                            defaultValue={fixture.venue || "TBD"}
                            style={{
                              padding: "8px",
                              borderRadius: "6px",
                              border: "1px solid #e2e8f0",
                              fontSize: "14px",
                            }}
                            onChange={(e) => {
                              const updatedFixtures = [...fixtures];
                              updatedFixtures[index] = {
                                ...fixture,
                                venue: e.target.value,
                              };
                              setFixtures(updatedFixtures);
                            }}
                          />
                        </div>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            onClick={async () => {
                              if (!fixture.id) {
                                alert("Cannot update fixture: Missing ID");
                                return;
                              }
                              try {
                                const response = await fetch(
                                  `/api/fixtures/${fixture.id}`,
                                  {
                                    method: "PUT",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      date: fixture.date,
                                      time: fixture.time,
                                      venue: fixture.venue,
                                    }),
                                  }
                                );
                                if (response.ok) {
                                  setEditingFixture(null);
                                  alert("Fixture updated successfully!");
                                } else {
                                  const errorData = await response.json();
                                  alert(
                                    errorData.error ||
                                      "Failed to update fixture"
                                  );
                                }
                              } catch (error) {
                                alert("Failed to update fixture");
                              }
                            }}
                            style={{
                              background: "#059669",
                              color: "white",
                              border: "none",
                              padding: "6px 12px",
                              borderRadius: "6px",
                              fontSize: "12px",
                              cursor: "pointer",
                            }}
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingFixture(null)}
                            style={{
                              background: "#6b7280",
                              color: "white",
                              border: "none",
                              padding: "6px 12px",
                              borderRadius: "6px",
                              fontSize: "12px",
                              cursor: "pointer",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                          }}
                        >
                          <div
                            style={{
                              background: "#2563eb",
                              color: "white",
                              padding: "4px 8px",
                              borderRadius: "6px",
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          >
                            R{fixture.round}
                          </div>
                          <div style={{ fontSize: "16px", fontWeight: "600" }}>
                            {fixture.homeTeam} vs {fixture.awayTeam}
                          </div>
                          {(fixture.matchDate || fixture.date) && (
                            <span
                              style={{ color: "#6b7280", fontSize: "14px" }}
                            >
                              {fixture.matchDate ? new Date(fixture.matchDate).toLocaleDateString() : fixture.date}{" "}
                              {(fixture.matchTime || fixture.time) && `at ${fixture.matchTime || fixture.time}`}
                            </span>
                          )}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <span style={{ color: "#6b7280", fontSize: "14px" }}>
                            {fixture.venue}
                          </span>
                          <button
                            onClick={() => setEditingFixture(index)}
                            style={{
                              background: "#2563eb",
                              color: "white",
                              border: "none",
                              padding: "4px 8px",
                              borderRadius: "6px",
                              fontSize: "12px",
                              cursor: "pointer",
                            }}
                          >
                            Edit
                          </button>
                          <span
                            style={{
                              background: "#f1f5f9",
                              color: "#475569",
                              padding: "4px 8px",
                              borderRadius: "6px",
                              fontSize: "12px",
                              fontWeight: "500",
                            }}
                          >
                            {fixture.status}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {fixtures.length === 0 && (
            <p style={{ color: "#6b7280" }}>
              No fixtures generated yet. Use the buttons above to create
              matches.
            </p>
          )}
        </div>
      </Section>
    </Main>
  );
}
