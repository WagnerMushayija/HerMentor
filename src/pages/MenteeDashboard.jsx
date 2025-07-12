"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { mentorsAPI, menteesAPI } from "../services/api"
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

const MentorCard = styled(Card)`
  cursor: pointer;
  
  .mentor-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: ${(props) => props.theme.colors.primary};
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 1.25rem;
      margin-right: 1rem;
    }
    
    .info {
      flex: 1;
      
      h3 {
        color: ${(props) => props.theme.colors.secondary};
        margin-bottom: 0.25rem;
      }
      
      .title {
        color: ${(props) => props.theme.colors.text.secondary};
        font-size: 0.875rem;
      }
    }
  }
  
  .expertise {
    margin-bottom: 1rem;
    
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.5rem;
      
      .tag {
        background: ${(props) => props.theme.colors.accent};
        color: ${(props) => props.theme.colors.secondary};
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 500;
      }
    }
  }
  
  .rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: ${(props) => props.theme.colors.text.secondary};
    
    .stars {
      color: #ffc107;
    }
  }
  
  .bio {
    font-size: 0.875rem;
    color: ${(props) => props.theme.colors.text.secondary};
    margin-bottom: 1rem;
    line-height: 1.4;
  }
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`

const ModalContent = styled(Card)`
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  
  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: ${(props) => props.theme.colors.text.secondary};
    
    &:hover {
      color: ${(props) => props.theme.colors.secondary};
    }
  }
  
  .mentor-profile {
    .header {
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
      
      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: ${(props) => props.theme.colors.primary};
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-size: 1.5rem;
        margin-right: 1.5rem;
      }
      
      .info {
        h2 {
          color: ${(props) => props.theme.colors.secondary};
          margin-bottom: 0.5rem;
        }
        
        .title {
          color: ${(props) => props.theme.colors.text.secondary};
          margin-bottom: 0.5rem;
        }
        
        .rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          
          .stars {
            color: #ffc107;
          }
        }
      }
    }
    
    .section {
      margin-bottom: 2rem;
      
      h3 {
        color: ${(props) => props.theme.colors.secondary};
        margin-bottom: 1rem;
      }
      
      p {
        color: ${(props) => props.theme.colors.text.secondary};
        line-height: 1.6;
        margin-bottom: 1rem;
      }
    }
    
    .expertise-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      
      .tag {
        background: ${(props) => props.theme.colors.accent};
        color: ${(props) => props.theme.colors.secondary};
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 500;
      }
    }
  }
`

const LoadingState = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${(props) => props.theme.colors.text.secondary};
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

const MenteeDashboard = () => {
  const [mentors, setMentors] = useState([])
  const [selectedMentor, setSelectedMentor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState("")
  const [requestingMentorship, setRequestingMentorship] = useState(false)

  useEffect(() => {
    fetchMentors()
  }, [])

  const fetchMentors = async (search = "") => {
    try {
      setLoading(true)
      const response = await mentorsAPI.getAll(search)
      setMentors(response.data)
      setError("")
    } catch (error) {
      setError("Failed to load mentors")
      console.error("Error fetching mentors:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchMentors(searchTerm)
  }

  const openMentorProfile = (mentor) => {
    setSelectedMentor(mentor)
  }

  const closeMentorProfile = () => {
    setSelectedMentor(null)
  }

  const handleRequestMentorship = async (mentorId) => {
    try {
      setRequestingMentorship(true)
      await menteesAPI.requestMentorship(mentorId)
      alert("Mentorship request sent successfully!")
      closeMentorProfile()
    } catch (error) {
      const message = error.response?.data?.message || "Failed to send mentorship request"
      alert(message)
    } finally {
      setRequestingMentorship(false)
    }
  }

  const generateStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    let stars = "★".repeat(fullStars)
    if (hasHalfStar) stars += "☆"
    return stars.padEnd(5, "☆")
  }

  if (loading && mentors.length === 0) {
    return (
      <DashboardContainer>
        <LoadingState>Loading mentors...</LoadingState>
      </DashboardContainer>
    )
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <Title>Find Your Mentor</Title>
        <Subtitle>Discover experienced professionals who can guide your career journey</Subtitle>
      </DashboardHeader>

      <Section>
        <SectionTitle>Available Mentors</SectionTitle>

        <SearchContainer>
          <form onSubmit={handleSearch}>
            <Input
              type="text"
              placeholder="Search mentors by name, title, or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </SearchContainer>

        {error && <div style={{ color: "#dc3545", marginBottom: "1rem" }}>{error}</div>}

        {loading ? (
          <LoadingState>Searching...</LoadingState>
        ) : mentors.length === 0 ? (
          <EmptyState>
            <h3>No mentors found</h3>
            <p>
              {searchTerm
                ? "Try adjusting your search terms or clear the search to see all mentors."
                : "No mentors are currently available. Please check back later."}
            </p>
          </EmptyState>
        ) : (
          <Grid>
            {mentors.map((mentor) => (
              <MentorCard key={mentor.id} hoverable onClick={() => openMentorProfile(mentor)}>
                <div className="mentor-header">
                  <div className="avatar">
                    {mentor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="info">
                    <h3>{mentor.name}</h3>
                    <div className="title">{mentor.title || "Professional Mentor"}</div>
                  </div>
                </div>

                {mentor.expertise && mentor.expertise.length > 0 && (
                  <div className="expertise">
                    <div className="tags">
                      {mentor.expertise.slice(0, 3).map((skill, index) => (
                        <span key={index} className="tag">
                          {skill}
                        </span>
                      ))}
                      {mentor.expertise.length > 3 && <span className="tag">+{mentor.expertise.length - 3} more</span>}
                    </div>
                  </div>
                )}

                <div className="rating">
                  <span className="stars">{generateStars(mentor.rating || 0)}</span>
                  <span>
                    {mentor.rating || 0} ({mentor.total_reviews || 0} reviews)
                  </span>
                </div>

                <div className="bio">{mentor.bio ? `${mentor.bio.substring(0, 100)}...` : "No bio available"}</div>

                <Button size="small" style={{ width: "100%" }}>
                  View Profile
                </Button>
              </MentorCard>
            ))}
          </Grid>
        )}
      </Section>

      {selectedMentor && (
        <Modal onClick={closeMentorProfile}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeMentorProfile}>
              ×
            </button>

            <div className="mentor-profile">
              <div className="header">
                <div className="avatar">
                  {selectedMentor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="info">
                  <h2>{selectedMentor.name}</h2>
                  <div className="title">{selectedMentor.title || "Professional Mentor"}</div>
                  <div className="rating">
                    <span className="stars">{generateStars(selectedMentor.rating || 0)}</span>
                    <span>
                      {selectedMentor.rating || 0} ({selectedMentor.total_reviews || 0} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="section">
                <h3>About</h3>
                <p>{selectedMentor.bio || "No bio available"}</p>
              </div>

              {selectedMentor.expertise && selectedMentor.expertise.length > 0 && (
                <div className="section">
                  <h3>Expertise</h3>
                  <div className="expertise-tags">
                    {selectedMentor.expertise.map((skill, index) => (
                      <span key={index} className="tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedMentor.experience && (
                <div className="section">
                  <h3>Experience</h3>
                  <p>{selectedMentor.experience}</p>
                </div>
              )}

              {selectedMentor.availability && (
                <div className="section">
                  <h3>Availability</h3>
                  <p>{selectedMentor.availability}</p>
                </div>
              )}

              <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                <Button
                  style={{ flex: 1 }}
                  disabled={requestingMentorship}
                  onClick={() => handleRequestMentorship(selectedMentor.id)}
                >
                  {requestingMentorship ? "Sending Request..." : "Request Mentorship"}
                </Button>
                <Button variant="outline" style={{ flex: 1 }}>
                  Send Message
                </Button>
              </div>
            </div>
          </ModalContent>
        </Modal>
      )}
    </DashboardContainer>
  )
}

export default MenteeDashboard
