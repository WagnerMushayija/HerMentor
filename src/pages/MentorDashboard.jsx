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

const MentorDashboard = () => {
  const [mentees, setMentees] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState("")

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
              <MenteeCard key={mentee.id}>
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

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Button size="small" style={{ flex: 1 }}>
                    Schedule Meeting
                  </Button>
                  <Button size="small" variant="outline" style={{ flex: 1 }}>
                    Send Message
                  </Button>
                </div>
              </MenteeCard>
            ))}
          </Grid>
        )}
      </Section>
    </DashboardContainer>
  )
}

export default MentorDashboard
