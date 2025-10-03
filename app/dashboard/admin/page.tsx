"use client";
import { useState, useEffect } from 'react'
import Main from "../../components/Main";
import { FaUsers, FaCalendar, FaTrophy, FaCog } from "react-icons/fa";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalTeams: 0,
    activeTeams: 0,
    upcomingMatches: 0,
    completedMatches: 0,
    articles: 0,
    drafts: 0,
    photos: 0,
    albums: 0,
    seasons: 1,
    rounds: 0,
    modules: 6,
    systemStatus: true
  })

  useEffect(() => {
    fetch('/api/teams')
      .then(res => res.json())
      .then(data => {
        setStats(prev => ({
          ...prev,
          totalTeams: data.length || 0,
          activeTeams: data.filter(team => team.status !== 'disqualified').length || data.length || 0
        }))
      })
      .catch(() => {})
    
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        const articles = data.articles || []
        setStats(prev => ({
          ...prev,
          articles: articles.filter(a => a.status === 'published').length,
          drafts: articles.filter(a => a.status === 'draft').length
        }))
      })
      .catch(() => {})
    
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        const photos = data.photos || []
        const albums = [...new Set(photos.map(p => p.album))]
        setStats(prev => ({
          ...prev,
          photos: photos.length,
          albums: albums.length
        }))
      })
      .catch(() => {})
    
    fetch('/api/fixtures')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const fixtures = data.fixtures
          const completedFixtures = fixtures.filter(f => f.status === 'completed')
          const currentRound = completedFixtures.length > 0 ? Math.max(...completedFixtures.map(f => f.round || 1)) : 1
          setStats(prev => ({
            ...prev,
            upcomingMatches: fixtures.filter(f => f.status === 'scheduled').length,
            completedMatches: completedFixtures.length,
            rounds: currentRound
          }))
        }
      })
      .catch(() => {})
  }, [])
  return (
    <Main>
      <div style={{ padding: "40px 16px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1
            style={{
              color: "#065f46",
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "32px",
            }}
          >
            Admin Dashboard
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "32px",
              marginBottom: "48px",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #059669, #047857)",
                padding: "32px",
                borderRadius: "20px",
                boxShadow: "0 20px 40px rgba(5, 150, 105, 0.2)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.1)",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 25px 50px rgba(5, 150, 105, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(5, 150, 105, 0.2)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  opacity: "0.1",
                  fontSize: "120px",
                }}
              >
                👥
              </div>
              <FaUsers
                style={{
                  fontSize: "48px",
                  color: "white",
                  marginBottom: "20px",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                  position: "relative",
                  zIndex: 1,
                }}
              />
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                Manage Teams
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.9)",
                  marginBottom: "24px",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Add, edit, and organize teams
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "bold",
                      marginBottom: "4px",
                    }}
                  >
                    {stats.totalTeams}
                  </div>
                  <div style={{ fontSize: "14px", opacity: "0.8" }}>
                    Total Teams
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginBottom: "4px",
                    }}
                  >
                    {stats.activeTeams}
                  </div>
                  <div style={{ fontSize: "14px", opacity: "0.8" }}>Active</div>
                </div>
              </div>
              <a
                href="/dashboard/admin/teams"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "2px solid rgba(255,255,255,0.3)",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "inline-block",
                  fontWeight: "600",
                  fontSize: "14px",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                }}
              >
                View Teams
              </a>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                padding: "32px",
                borderRadius: "20px",
                boxShadow: "0 20px 40px rgba(37, 99, 235, 0.2)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.1)",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 25px 50px rgba(37, 99, 235, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(37, 99, 235, 0.2)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  opacity: "0.1",
                  fontSize: "120px",
                }}
              >
                📅
              </div>
              <FaCalendar
                style={{
                  fontSize: "48px",
                  color: "white",
                  marginBottom: "20px",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                  position: "relative",
                  zIndex: 1,
                }}
              />
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                Schedule Matches
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.9)",
                  marginBottom: "24px",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Create and manage fixtures
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "bold",
                      marginBottom: "4px",
                    }}
                  >
                    {stats.upcomingMatches}
                  </div>
                  <div style={{ fontSize: "14px", opacity: "0.8" }}>
                    Upcoming
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginBottom: "4px",
                    }}
                  >
                    {stats.completedMatches}
                  </div>
                  <div style={{ fontSize: "14px", opacity: "0.8" }}>
                    Completed
                  </div>
                </div>
              </div>
              <a
                href="/dashboard/admin/matches"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "2px solid rgba(255,255,255,0.3)",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "inline-block",
                  fontWeight: "600",
                  fontSize: "14px",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                }}
              >
                Schedule
              </a>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, #ca8a04, #a16207)",
                padding: "32px",
                borderRadius: "20px",
                boxShadow: "0 20px 40px rgba(202, 138, 4, 0.2)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.1)",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 25px 50px rgba(202, 138, 4, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(202, 138, 4, 0.2)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  opacity: "0.1",
                  fontSize: "120px",
                }}
              >
                🏆
              </div>
              <FaTrophy
                style={{
                  fontSize: "48px",
                  color: "white",
                  marginBottom: "20px",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                  position: "relative",
                  zIndex: 1,
                }}
              />
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                League Management
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.9)",
                  marginBottom: "24px",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Manage league standings
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "bold",
                      marginBottom: "4px",
                    }}
                  >
                    {stats.seasons}
                  </div>
                  <div style={{ fontSize: "14px", opacity: "0.8" }}>Season</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginBottom: "4px",
                    }}
                  >
                    {stats.rounds}
                  </div>
                  <div style={{ fontSize: "14px", opacity: "0.8" }}>Rounds</div>
                </div>
              </div>
              <a
                href="/dashboard/admin/league"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "2px solid rgba(255,255,255,0.3)",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "inline-block",
                  fontWeight: "600",
                  fontSize: "14px",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                }}
              >
                Manage
              </a>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginBottom: '48px' }}>
            <div
              style={{
                background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                  padding: "32px",
                  borderRadius: "20px",
                  boxShadow: "0 20px 40px rgba(220, 38, 38, 0.2)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.1)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 25px 50px rgba(220, 38, 38, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(220, 38, 38, 0.2)";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "-20px",
                    opacity: "0.1",
                    fontSize: "120px",
                  }}
                >
                  📰
                </div>
                <div
                  style={{
                    fontSize: "48px",
                    marginBottom: "20px",
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  📰
                </div>
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginBottom: "12px",
                    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  News Management
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    marginBottom: "24px",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  Create and manage news articles
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "28px",
                        fontWeight: "bold",
                        marginBottom: "4px",
                      }}
                    >
                      {stats.articles}
                    </div>
                    <div style={{ fontSize: "14px", opacity: "0.8" }}>
                      Articles
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginBottom: "4px",
                      }}
                    >
                      {stats.drafts}
                    </div>
                    <div style={{ fontSize: "14px", opacity: "0.8" }}>
                      Drafts
                    </div>
                  </div>
                </div>
                <a
                  href="/dashboard/admin/news-management"
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                    border: "2px solid rgba(255,255,255,0.3)",
                    padding: "12px 24px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    textDecoration: "none",
                    display: "inline-block",
                    fontWeight: "600",
                    fontSize: "14px",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                  }}
                >
                  Manage News
                </a>
            </div>
            
            <div
              style={{
                background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                  padding: "32px",
                  borderRadius: "20px",
                  boxShadow: "0 20px 40px rgba(124, 58, 237, 0.2)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.1)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 25px 50px rgba(124, 58, 237, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(124, 58, 237, 0.2)";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "-20px",
                    opacity: "0.1",
                    fontSize: "120px",
                  }}
                >
                  🖼️
                </div>
                <div
                  style={{
                    fontSize: "48px",
                    marginBottom: "20px",
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  🖼️
                </div>
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginBottom: "12px",
                    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  Gallery Management
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    marginBottom: "24px",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  Upload and organize photos
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "28px",
                        fontWeight: "bold",
                        marginBottom: "4px",
                      }}
                    >
                      {stats.photos}
                    </div>
                    <div style={{ fontSize: "14px", opacity: "0.8" }}>
                      Photos
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginBottom: "4px",
                      }}
                    >
                      {stats.albums}
                    </div>
                    <div style={{ fontSize: "14px", opacity: "0.8" }}>
                      Albums
                    </div>
                  </div>
                </div>
                <a
                  href="/dashboard/admin/gallery-management"
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                    border: "2px solid rgba(255,255,255,0.3)",
                    padding: "12px 24px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    textDecoration: "none",
                    display: "inline-block",
                    fontWeight: "600",
                    fontSize: "14px",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                  }}
                >
                  Manage Gallery
                </a>
            </div>
            
            <div
              style={{
                background: "linear-gradient(135deg, #6b7280, #4b5563)",
                padding: "32px",
                borderRadius: "20px",
                boxShadow: "0 20px 40px rgba(107, 114, 128, 0.2)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.1)",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 25px 50px rgba(107, 114, 128, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(107, 114, 128, 0.2)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  opacity: "0.1",
                  fontSize: "120px",
                }}
              >
                ⚙️
              </div>
              <FaCog
                style={{
                  fontSize: "48px",
                  color: "white",
                  marginBottom: "20px",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                  position: "relative",
                  zIndex: 1,
                }}
              />
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                System Settings
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.9)",
                  marginBottom: "24px",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Configure system preferences
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "28px",
                      fontWeight: "bold",
                      marginBottom: "4px",
                    }}
                  >
                    {stats.modules}
                  </div>
                  <div style={{ fontSize: "14px", opacity: "0.8" }}>
                    Modules
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginBottom: "4px",
                    }}
                  >
                    {stats.systemStatus ? '✓' : '✗'}
                  </div>
                  <div style={{ fontSize: "14px", opacity: "0.8" }}>Active</div>
                </div>
              </div>
              <a
                href="/dashboard/admin/settings"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "2px solid rgba(255,255,255,0.3)",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "inline-block",
                  fontWeight: "600",
                  fontSize: "14px",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                }}
              >
                Settings
              </a>
            </div>
          </div>


        </div>
      </div>
    </Main>
  );
}
