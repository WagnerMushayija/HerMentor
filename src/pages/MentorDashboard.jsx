import { useState, useEffect } from "react"
import styled from "styled-components"
import { mentorsAPI } from "../services/api"
import Card from "../components/Card"
import Button from "../components/Button"
import Input from "../components/Input"

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const DashboardHeader = styled.div`
  margin-bottom: 3rem;
`

const Title = styled.h1`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`

const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 1.125rem;
`

const Section = styled.section`
  margin-bottom: 3rem;
`

const SectionTitle = styled.h2`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`

const SearchContainer = styled.div`
  margin-bottom: 1.5rem;
  max-width: 400px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`

const MenteeCard = styled(Card)`
  h3 {
    color: ${(props) => props.theme.colors.primary};
    margin-bottom: 0.5rem;
  }
  
  .role {
    color: ${(props) => props.theme.colors.text.secondary};
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }
  
  .interests {
    margin-bottom: 1rem;
    
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      margin-top: 0.5rem;
      
      .tag {
        background: ${(props) => props.theme.colors.accent};
        color: ${(props) => props.theme.colors.secondary};
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.75rem;
      }
    }
  }
  
  .goals {
    font-size: 0.875rem;
    color: ${(props) => props.theme.colors.text.secondary};
    margin-bottom: 1rem;
    line-height: 1.4;
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`

const StatCard = styled(Card)`
  text-align: center;
  
  .number {
    font-size: 2rem;
    font-weight: 700;
    color: ${(props) => props.theme.colors.primary};
    margin-bottom: 0.5rem;
  }
  
  .label {
    color: ${(props) => props.theme.colors.text.secondary};
    font-size: 0.875rem;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${(props) => props.theme.colors.text.secondary};
  
  h3 {
    margin-bottom: 1rem;
    color: ${(props) => props.theme.colors.secondary};
  }
`

const LoadingState = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${(props) => props.theme.colors.text.secondary};
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;

  .row {
    display: flex;
    gap: 0.5rem;

    button {
      flex: 1;
    }
  }
`


const MentorDashboard = () => {
  const [mentees, setMentees] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState("")
  const [selectedMentee, setSelectedMentee] = useState(null)


  useEffect(() => {
    fetchMentees()
  }, [])

  const fetchMentees = async (search = "") => {
    try {
      setLoading(true)
      const response = await mentorsAPI.getMentees(search)
      setMentees(response.data)
      setError("")
    } catch (error) {
      setError("Failed to load mentees")
      console.error("Error fetching mentees:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchMentees(searchTerm)
  }

  if (loading && mentees.length === 0) {
    return (
      <DashboardContainer>
        <LoadingState>Loading your dashboard...</LoadingState>
      </DashboardContainer>
    )
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <Title>Mentor Dashboard</Title>
        <Subtitle>Manage your mentees and track their progress</Subtitle>
      </DashboardHeader>

      <StatsGrid>
        <StatCard>
          <div className="number">{mentees.length}</div>
          <div className="label">Active Mentees</div>
        </StatCard>
        <StatCard>
          <div className="number">0</div>
          <div className="label">Upcoming Meetings</div>
        </StatCard>
        <StatCard>
          <div className="number">24</div>
          <div className="label">Hours This Month</div>
        </StatCard>
        <StatCard>
          <div className="number">4.8</div>
          <div className="label">Average Rating</div>
        </StatCard>
      </StatsGrid>

      <Section>
        <SectionTitle>Your Mentees</SectionTitle>

        <SearchContainer>
          <form onSubmit={handleSearch}>
            <Input
              type="text"
              placeholder="Search mentees by name or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </SearchContainer>

        {error && <div style={{ color: "#dc3545", marginBottom: "1rem" }}>{error}</div>}

        {loading ? (
          <LoadingState>Searching...</LoadingState>
        ) : mentees.length === 0 ? (
          <EmptyState>
            <h3>No mentees found</h3>
            <p>
              {searchTerm
                ? "Try adjusting your search terms or clear the search to see all mentees."
                : "You don't have any active mentees yet. Mentees will appear here when they request mentorship and you accept."}
            </p>
          </EmptyState>
        ) : (
        <Grid>
          {mentees.map((mentee) => (
            <MenteeCard
              key={mentee.id}
              onClick={() => setSelectedMentee(mentee)}
              style={{ cursor: "pointer" }}
            >
              <h3>{mentee.name}</h3>
              <div className="role">{mentee.current_role || "Role not specified"}</div>

              {mentee.interests && mentee.interests.length > 0 && (
                <div className="interests">
                  <strong>Interests:</strong>
                  <div className="tags">
                    {mentee.interests.map((interest, index) => (
                      <span key={index} className="tag">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {mentee.learning_goals && (
                <div className="goals">
                  <strong>Goals:</strong> {mentee.learning_goals}
                </div>
              )}

              <ButtonGroup>
                <div className="row">
                  <Button
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation()
                      const title = encodeURIComponent("Mentorship Meeting")
                      const details = encodeURIComponent("Let's have a mentorship session")
                      const email = encodeURIComponent(mentee.email)
                      const calendarUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${title}&details=${details}&add=${email}`
                      window.open(calendarUrl, "_blank")
                    }}
                  >
                    Schedule Meeting
                  </Button>
                  <Button
                    size="small"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(`mailto:${mentee.email}`, "_blank")
                    }}
                  >
                    Send Message
                  </Button>
                </div>

                <div className="row">
                  <Button
                    size="small"
                    variant="success"
                    onClick={async (e) => {
                      e.stopPropagation()
                      await mentorsAPI.updateMentorshipStatus(mentee.id, "accepted")
                      fetchMentees()
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    size="small"
                    variant="danger"
                    onClick={async (e) => {
                      e.stopPropagation()
                      await mentorsAPI.updateMentorshipStatus(mentee.id, "rejected")
                      fetchMentees()
                    }}
                  >
                    Reject
                  </Button>
                </div>
              </ButtonGroup>
            </MenteeCard>
          ))}
        </Grid>

        )}
      </Section>
      {selectedMentee && (
        <div
          onClick={() => setSelectedMentee(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.6)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "12px",
              maxWidth: "600px",
              width: "90%",
              boxShadow: "0 2px 20px rgba(0,0,0,0.2)",
            }}
          >
            <h2>{selectedMentee.name}</h2>
            <p><strong>Email:</strong> {selectedMentee.email}</p>
            <p><strong>Current Role:</strong> {selectedMentee.current_role}</p>
            <p><strong>Experience Level:</strong> {selectedMentee.experience_level}</p>
            <p><strong>Learning Goals:</strong> {selectedMentee.learning_goals}</p>
            <p><strong>Interests:</strong> {selectedMentee.interests?.join(", ")}</p>
            <div style={{ marginTop: "1rem" }}>
              <Button size="small" onClick={() => setSelectedMentee(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}

    </DashboardContainer>
  )
}




export default MentorDashboard
