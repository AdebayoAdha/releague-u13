"use client";
import { useState, useEffect } from "react";
import Main from "../../../components/Main";
import Section from "../../../components/Section";
import { FaArrowLeft } from "react-icons/fa";

export default function TeamDetail() {
  const [savedTeamData, setSavedTeamData] = useState({
    teamName: "",
    teamCoach: "",
    teamLogo: null as File | string | null,
    coachImage: null as File | string | null,
  });
  const [editingTeam, setEditingTeam] = useState(false);
  const [editingCoach, setEditingCoach] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [coachName, setCoachName] = useState("");

  useEffect(() => {
    // Load saved team data on page load
    const loadTeamData = async () => {
      try {
        const response = await fetch('/api/team/get');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.team) {
            setSavedTeamData({
              teamName: data.team.teamName || '',
              teamCoach: data.team.teamCoach || '',
              teamLogo: data.team.teamLogo || null,
              coachImage: data.team.coachImage || null,
            });
            setTeamName(data.team.teamName || '');
            setCoachName(data.team.teamCoach || '');
          }
        }
      } catch (error) {
        console.error('Failed to load team data:', error);
      }
    };
    loadTeamData();
  }, []);



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
      <Section title="Team Detail">
        <div
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >


          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '32px' }}>
            {savedTeamData.teamName && (
              <div
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  padding: "32px",
                  borderRadius: "20px",
                  boxShadow: "0 12px 40px rgba(124, 58, 237, 0.3)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transform: "translateY(0)",
                  transition: "all 0.3s ease",
                  position: "relative",
                }}
              >
                <button
                  onClick={() => setEditingTeam(!editingTeam)}
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    background: "rgba(255,255,255,0.2)",
                    border: "none",
                    color: "white",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "12px"
                  }}
                >
                  {editingTeam ? "Cancel" : "Edit"}
                </button>
                {editingTeam ? (
                  <div style={{ paddingTop: "40px" }}>
                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>Team Name</label>
                      <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: "8px",
                          border: "none",
                          fontSize: "16px",
                          background: "rgba(255,255,255,0.95)",
                          color: "#333",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>Team Logo</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const formData = new FormData();
                            formData.append('teamLogo', file);
                            const response = await fetch('/api/team/update-logo', {
                              method: 'POST',
                              body: formData
                            });
                            if (response.ok) {
                              setSavedTeamData({...savedTeamData, teamLogo: URL.createObjectURL(file)});
                            }
                          }
                        }}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: "8px",
                          border: "none",
                          background: "rgba(255,255,255,0.95)",
                          color: "#333",
                          fontSize: "14px",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>
                    <button
                      onClick={async () => {
                        const response = await fetch('/api/team/update-name', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ teamName })
                        });
                        if (response.ok) {
                          setSavedTeamData({...savedTeamData, teamName});
                          setEditingTeam(false);
                        }
                      }}
                      style={{
                        background: "rgba(255,255,255,0.95)",
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        color: "#7c3aed",
                        fontWeight: "600",
                        fontSize: "14px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        transition: "all 0.2s ease"
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {savedTeamData.teamLogo ? (
                      <img
                        src={typeof savedTeamData.teamLogo === 'string' ? savedTeamData.teamLogo : URL.createObjectURL(savedTeamData.teamLogo)}
                        alt="Team Logo"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "16px",
                          border: "3px solid white",
                          marginRight: "20px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          background: "rgba(255,255,255,0.3)",
                          borderRadius: "16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "20px",
                          fontSize: "24px",
                          fontWeight: "bold",
                        }}
                      >
                        LOGO
                      </div>
                    )}
                    <div>
                      <h2
                        style={{
                          fontSize: "24px",
                          fontWeight: "bold",
                          margin: "0",
                          marginBottom: "8px",
                          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                      >
                        {savedTeamData.teamName}
                      </h2>
                      <p style={{ fontSize: "16px", opacity: 0.9, margin: "0", fontWeight: "500" }}>
                        U13 Football Team
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {savedTeamData.teamCoach && (
              <div
                style={{
                  background: "linear-gradient(135deg, #059669, #047857)",
                  padding: "32px",
                  borderRadius: "20px",
                  boxShadow: "0 12px 40px rgba(5, 150, 105, 0.3)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transform: "translateY(0)",
                  transition: "all 0.3s ease",
                  position: "relative",
                }}
              >
                <button
                  onClick={() => setEditingCoach(!editingCoach)}
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    background: "rgba(255,255,255,0.2)",
                    border: "none",
                    color: "white",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "12px"
                  }}
                >
                  {editingCoach ? "Cancel" : "Edit"}
                </button>
                {editingCoach ? (
                  <div style={{ paddingTop: "40px" }}>
                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>Coach Name</label>
                      <input
                        type="text"
                        value={coachName}
                        onChange={(e) => setCoachName(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: "8px",
                          border: "none",
                          fontSize: "16px",
                          background: "rgba(255,255,255,0.95)",
                          color: "#333",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>Coach Photo</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const formData = new FormData();
                            formData.append('coachImage', file);
                            const response = await fetch('/api/team/update-coach-image', {
                              method: 'POST',
                              body: formData
                            });
                            if (response.ok) {
                              setSavedTeamData({...savedTeamData, coachImage: URL.createObjectURL(file)});
                            }
                          }
                        }}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: "8px",
                          border: "none",
                          background: "rgba(255,255,255,0.95)",
                          color: "#333",
                          fontSize: "14px",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>
                    <button
                      onClick={async () => {
                        const response = await fetch('/api/team/update-coach', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ teamCoach: coachName })
                        });
                        if (response.ok) {
                          setSavedTeamData({...savedTeamData, teamCoach: coachName});
                          setEditingCoach(false);
                        }
                      }}
                      style={{
                        background: "rgba(255,255,255,0.95)",
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        color: "#059669",
                        fontWeight: "600",
                        fontSize: "14px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        transition: "all 0.2s ease"
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {savedTeamData.coachImage ? (
                      <img
                        src={typeof savedTeamData.coachImage === 'string' ? savedTeamData.coachImage : URL.createObjectURL(savedTeamData.coachImage)}
                        alt="Coach"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "50%",
                          border: "3px solid white",
                          marginRight: "20px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          background: "rgba(255,255,255,0.3)",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "20px",
                          fontSize: "24px",
                          fontWeight: "bold",
                        }}
                      >
                        C
                      </div>
                    )}
                    <div>
                      <h2
                        style={{
                          fontSize: "24px",
                          fontWeight: "bold",
                          margin: "0",
                          marginBottom: "8px",
                          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                      >
                        {savedTeamData.teamCoach}
                      </h2>
                      <p style={{ fontSize: "16px", opacity: 0.9, margin: "0", fontWeight: "500" }}>
                        Team Coach
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Section>
    </Main>
  );
}