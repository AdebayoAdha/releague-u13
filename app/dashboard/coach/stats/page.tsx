"use client";
import { useState, useEffect } from "react";
import Main from "../../../components/Main";
import Section from "../../../components/Section";
import { FaArrowLeft, FaTrophy, FaFutbol, FaUsers } from "react-icons/fa";

export default function TeamStats() {
  const [stats, setStats] = useState({
    totalMatches: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    winRate: 0,
  });
  const [players, setPlayers] = useState([]);
  const [matchResults, setMatchResults] = useState([]);
  const [matchReports, setMatchReports] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch team data and fixtures
        const teamResponse = await fetch("/api/team");
        if (teamResponse.ok) {
          const teamData = await teamResponse.json();
          if (teamData.team?.teamName) {
            const teamName = teamData.team.teamName;

            const fixturesResponse = await fetch("/api/fixtures");
            if (fixturesResponse.ok) {
              const fixturesData = await fixturesResponse.json();
              if (fixturesData.success) {
                const teamMatches = fixturesData.fixtures.filter(
                  (f) =>
                    f.status === "completed" &&
                    (f.homeTeam === teamName || f.awayTeam === teamName)
                );

                let wins = 0,
                  draws = 0,
                  losses = 0,
                  goalsFor = 0,
                  goalsAgainst = 0;

                teamMatches.forEach((match) => {
                  const isHome = match.homeTeam === teamName;
                  const ourScore = isHome ? match.homeScore : match.awayScore;
                  const theirScore = isHome ? match.awayScore : match.homeScore;

                  goalsFor += ourScore || 0;
                  goalsAgainst += theirScore || 0;

                  if (ourScore > theirScore) wins++;
                  else if (ourScore === theirScore) draws++;
                  else losses++;
                });

                const winRate =
                  teamMatches.length > 0
                    ? Math.round((wins / teamMatches.length) * 100)
                    : 0;

                setStats({
                  totalMatches: teamMatches.length,
                  wins,
                  draws,
                  losses,
                  goalsFor,
                  goalsAgainst,
                  winRate,
                });
              }
            }
          }
        }

        // Fetch players
        const playersResponse = await fetch("/api/players");
        if (playersResponse.ok) {
          const playersData = await playersResponse.json();
          if (playersData.players) {
            setPlayers(playersData.players);
          }
        }

        // Fetch match results
        const resultsResponse = await fetch("/api/match-results");
        if (resultsResponse.ok) {
          const resultsData = await resultsResponse.json();
          if (resultsData.success) {
            setMatchResults(resultsData.results);
          }
        }

        // Fetch match reports
        const reportsResponse = await fetch("/api/match-reports");
        if (reportsResponse.ok) {
          const reportsData = await reportsResponse.json();
          if (reportsData.success) {
            setMatchReports(reportsData.reports);
          }
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  const goalScorers = matchResults.filter((r) => r.goalScorer);
  const topScorers = goalScorers.reduce((acc, result) => {
    acc[result.goalScorer] = (acc[result.goalScorer] || 0) + 1;
    return acc;
  }, {});

  return (
    <Main>
      <div style={{ padding: "20px 16px 0" }}>
        <a
          href="/dashboard/coach"
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
      <Section title="Team Stats">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "white",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <FaTrophy style={{ fontSize: "24px", marginBottom: "8px" }} />
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>
              {stats.wins}
            </div>
            <div style={{ fontSize: "14px", opacity: 0.9 }}>Wins</div>
          </div>
          <div
            style={{
              background: "linear-gradient(135deg, #059669, #047857)",
              color: "white",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <FaFutbol style={{ fontSize: "24px", marginBottom: "8px" }} />
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>
              {stats.goalsFor}
            </div>
            <div style={{ fontSize: "14px", opacity: 0.9 }}>Goals For</div>
          </div>
          <div
            style={{
              background: "linear-gradient(135deg, #dc2626, #b91c1c)",
              color: "white",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>⚽</div>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>
              {stats.goalsAgainst}
            </div>
            <div style={{ fontSize: "14px", opacity: 0.9 }}>Goals Against</div>
          </div>
          <div
            style={{
              background: "linear-gradient(135deg, #ca8a04, #a16207)",
              color: "white",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <FaUsers style={{ fontSize: "24px", marginBottom: "8px" }} />
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>
              {stats.winRate}%
            </div>
            <div style={{ fontSize: "14px", opacity: 0.9 }}>Win Rate</div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "24px",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                marginBottom: "16px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Match Record
            </h3>
            <div style={{ display: "grid", gap: "12px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <span>Total Matches:</span>
                <span style={{ fontWeight: "bold" }}>{stats.totalMatches}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <span>Wins:</span>
                <span style={{ fontWeight: "bold", color: "#059669" }}>
                  {stats.wins}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <span>Draws:</span>
                <span style={{ fontWeight: "bold", color: "#ca8a04" }}>
                  {stats.draws}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                }}
              >
                <span>Losses:</span>
                <span style={{ fontWeight: "bold", color: "#dc2626" }}>
                  {stats.losses}
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                marginBottom: "16px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Top Scorers
            </h3>
            {Object.keys(topScorers).length > 0 ? (
              <div style={{ display: "grid", gap: "8px" }}>
                {Object.entries(topScorers)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([player, goals], index) => (
                    <div
                      key={player}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px 0",
                        borderBottom: index < 4 ? "1px solid #e5e7eb" : "none",
                      }}
                    >
                      <span>{player}</span>
                      <span style={{ fontWeight: "bold", color: "#059669" }}>
                        {goals} goals
                      </span>
                    </div>
                  ))}
              </div>
            ) : (
              <p style={{ color: "#6b7280" }}>No goal scorers recorded yet.</p>
            )}
          </div>

          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                marginBottom: "16px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Top Assists
            </h3>
            {(() => {
              const assists = matchResults.filter((r) => r.assistBy);
              const topAssists = assists.reduce((acc, result) => {
                acc[result.assistBy] = (acc[result.assistBy] || 0) + 1;
                return acc;
              }, {});

              return Object.keys(topAssists).length > 0 ? (
                <div style={{ display: "grid", gap: "8px" }}>
                  {Object.entries(topAssists)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([player, assists], index) => (
                      <div
                        key={player}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "8px 0",
                          borderBottom:
                            index < 4 ? "1px solid #e5e7eb" : "none",
                        }}
                      >
                        <span>{player}</span>
                        <span style={{ fontWeight: "bold", color: "#2563eb" }}>
                          {assists} assists
                        </span>
                      </div>
                    ))}
                </div>
              ) : (
                <p style={{ color: "#6b7280" }}>No assists recorded yet.</p>
              );
            })()}
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            marginTop: "24px",
          }}
        >
          <h3
            style={{
              marginBottom: "16px",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Squad Overview
          </h3>
          {players.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "left",
                        fontWeight: "600",
                      }}
                    >
                      Player
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "left",
                        fontWeight: "600",
                      }}
                    >
                      Position
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      Number
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      Matches
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      Goals
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      Assists
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "center",
                        fontWeight: "600",
                      }}
                    >
                      Clean Sheets
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {players
                    .sort((a, b) => {
                      const positionOrder = {
                        Goalkeeper: 1,
                        Defender: 2,
                        Midfielder: 3,
                        Forward: 4,
                      };
                      const aPos = positionOrder[a.position] || 5;
                      const bPos = positionOrder[b.position] || 5;
                      if (aPos !== bPos) return aPos - bPos;
                      return a.number - b.number;
                    })
                    .map((player, index) => {
                      const playerGoals = matchResults.filter(
                        (r) => r.goalScorer === player.name
                      ).length;
                      const playerAssists = matchResults.filter(
                        (r) => r.assistBy === player.name
                      ).length;
                      const playerCleanSheets = matchResults.filter(
                        (r) => r.cleanSheet === player.name
                      ).length;

                      // Count matches played from match reports
                      const matchesPlayed = matchReports.filter((report) => {
                        const selectedPlayers = JSON.parse(
                          report.selectedPlayers || "[]"
                        );
                        return selectedPlayers.includes(player.name);
                      }).length;

                      return (
                        <tr
                          key={index}
                          style={{ borderBottom: "1px solid #e5e7eb" }}
                        >
                          <td style={{ padding: "12px", fontWeight: "600" }}>
                            {player.name}
                          </td>
                          <td style={{ padding: "12px", color: "#6b7280" }}>
                            {player.position}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              textAlign: "center",
                              fontWeight: "600",
                            }}
                          >
                            #{player.number}
                          </td>
                          <td style={{ padding: "12px", textAlign: "center" }}>
                            {matchesPlayed}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              textAlign: "center",
                              color: "#059669",
                              fontWeight: "600",
                            }}
                          >
                            {playerGoals}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              textAlign: "center",
                              color: "#2563eb",
                              fontWeight: "600",
                            }}
                          >
                            {playerAssists}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              textAlign: "center",
                              color: "#ca8a04",
                              fontWeight: "600",
                            }}
                          >
                            {playerCleanSheets}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: "#6b7280" }}>
              No players added to the squad yet.
            </p>
          )}
        </div>
      </Section>
    </Main>
  );
}
