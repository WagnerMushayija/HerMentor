"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useAuth } from "../context/AuthContext"
import { authAPI, mentorsAPI, menteesAPI, usersAPI } from "../services/api"
import Card from "../components/Card"
import Input from "../components/Input"
import Button from "../components/Button"

const ProfileContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`

const Title = styled.h1`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 2.5rem;
  margin-bottom: 2rem;
`

const Section = styled.section`
  margin-bottom: 2rem;
`

const SectionTitle = styled.h2`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`

const TagInput = styled.div`
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    
    .tag {
      background: ${(props) => props.theme.colors.accent};
      color: ${(props) => props.theme.colors.secondary};
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      .remove {
        cursor: pointer;
        font-weight: bold;
        
        &:hover {
          color: #dc3545;
        }
      }
    }
  }
  
  .input-container {
    display: flex;
    gap: 0.5rem;
    
    input {
      flex: 1;
    }
  }
`

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  background: white;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`

const SuccessMessage = styled.div`
  color: ${(props) => props.theme.colors.success};
  font-size: 0.875rem;
  margin-bottom: 1rem;
`

const DangerZone = styled(Card)`
  border: 2px solid #dc3545;
  margin-top: 2rem;
  
  h3 {
    color: #dc3545;
    margin-bottom: 1rem;
  }
  
  p {
    color: ${(props) => props.theme.colors.text.secondary};
    margin-bottom: 1rem;
  }
`

const Profile = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [profile, setProfile] = useState(null)
  const [newTag, setNewTag] = useState("")

  const [basicInfo, setBasicInfo] = useState({
    name: "",
    email: "",
  })

  const [mentorProfile, setMentorProfile] = useState({
    title: "",
    bio: "",
    expertise: [],
    experience: "",
    availability: "",
  })

  const [menteeProfile, setMenteeProfile] = useState({
    interests: [],
    learning_goals: "",
    current_role: "",
    experience_level: "beginner",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {

    console.log("Fetching profile...") // ✅ Step 1: Confirm function is running
    console.log("User from context:", user) // ✅ Step 2: Log user from AuthContext
    try {
      const response = await authAPI.getProfile()
      console.log("Profile response:", response.data) // ✅ Step 3: See what's returned

      const profileData = response.data
      setProfile(profileData)

      setBasicInfo({
        name: profileData.name,
        email: profileData.email,
      })

      if (user.role === "mentor") {
        setMentorProfile({
          title: profileData.title || "",
          bio: profileData.bio || "",
          expertise: profileData.expertise || [],
          experience: profileData.experience || "",
          availability: profileData.availability || "",
        })
      } else {
        setMenteeProfile({
          interests: profileData.interests || [],
          learning_goals: profileData.learning_goals || "",
          current_role: profileData.current_role || "",
          experience_level: profileData.experience_level || "beginner",
        })
      }
    } catch (error) {
      console.error("Error loading profile:", error) // ✅ Log error to browser console
      setError("Failed to load profile")
    }
  }

  const handleBasicInfoSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      await usersAPI.update(basicInfo)
      setSuccess("Basic information updated successfully")
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update basic information")
    } finally {
      setLoading(false)
    }
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      if (user.role === "mentor") {
        await mentorsAPI.updateProfile(mentorProfile)
      } else {
        await menteesAPI.updateProfile(menteeProfile)
      }
      setSuccess("Profile updated successfully")
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match")
      return
    }

    if (passwordData.newPassword.length < 6) {
      setError("New password must be at least 6 characters")
      return
    }

    setLoading(true)

    try {
      await usersAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })
      setSuccess("Password changed successfully")
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      setError(error.response?.data?.message || "Failed to change password")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await usersAPI.delete()
        logout()
        navigate("/")
      } catch (error) {
        setError("Failed to delete account")
      }
    }
  }

  const addTag = (tagArray, setTagArray) => {
    if (newTag.trim() && !tagArray.includes(newTag.trim())) {
      setTagArray([...tagArray, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove, tagArray, setTagArray) => {
    setTagArray(tagArray.filter((tag) => tag !== tagToRemove))
  }

  if (!profile) {
    return (
      <ProfileContainer>
        <div>Loading profile...</div>
      </ProfileContainer>
    )
  }

  return (
    <ProfileContainer>
      <Title>Profile Settings</Title>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}

      <Section>
        <Card>
          <SectionTitle>Basic Information</SectionTitle>
          <Form onSubmit={handleBasicInfoSubmit}>
            <Input
              label="Full Name"
              type="text"
              value={basicInfo.name}
              onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={basicInfo.email}
              onChange={(e) => setBasicInfo({ ...basicInfo, email: e.target.value })}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Basic Info"}
            </Button>
          </Form>
        </Card>
      </Section>

      <Section>
        <Card>
          <SectionTitle>{user.role === "mentor" ? "Mentor" : "Mentee"} Profile</SectionTitle>
          <Form onSubmit={handleProfileSubmit}>
            {user.role === "mentor" ? (
              <>
                <Input
                  label="Professional Title"
                  type="text"
                  placeholder="e.g., Senior Software Engineer at Google"
                  value={mentorProfile.title}
                  onChange={(e) => setMentorProfile({ ...mentorProfile, title: e.target.value })}
                />

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Bio</label>
                  <TextArea
                    placeholder="Tell mentees about yourself, your experience, and what you can help with..."
                    value={mentorProfile.bio}
                    onChange={(e) => setMentorProfile({ ...mentorProfile, bio: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
                    Areas of Expertise
                  </label>
                  <TagInput>
                    <div className="tags">
                      {mentorProfile.expertise.map((skill, index) => (
                        <span key={index} className="tag">
                          {skill}
                          <span
                            className="remove"
                            onClick={() =>
                              removeTag(skill, mentorProfile.expertise, (newExpertise) =>
                                setMentorProfile({ ...mentorProfile, expertise: newExpertise }),
                              )
                            }
                          >
                            ×
                          </span>
                        </span>
                      ))}
                    </div>
                    <div className="input-container">
                      <input
                        type="text"
                        placeholder="Add a skill (e.g., React, Leadership, etc.)"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addTag(mentorProfile.expertise, (newExpertise) =>
                              setMentorProfile({ ...mentorProfile, expertise: newExpertise }),
                            )
                          }
                        }}
                      />
                      <Button
                        type="button"
                        size="small"
                        onClick={() =>
                          addTag(mentorProfile.expertise, (newExpertise) =>
                            setMentorProfile({ ...mentorProfile, expertise: newExpertise }),
                          )
                        }
                      >
                        Add
                      </Button>
                    </div>
                  </TagInput>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Experience</label>
                  <TextArea
                    placeholder="Describe your professional experience and background..."
                    value={mentorProfile.experience}
                    onChange={(e) => setMentorProfile({ ...mentorProfile, experience: e.target.value })}
                  />
                </div>

                <Input
                  label="Availability"
                  type="text"
                  placeholder="e.g., Weekdays 6-8 PM, Weekends flexible"
                  value={mentorProfile.availability}
                  onChange={(e) => setMentorProfile({ ...mentorProfile, availability: e.target.value })}
                />
              </>
            ) : (
              <>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Interests</label>
                  <TagInput>
                    <div className="tags">
                      {menteeProfile.interests.map((interest, index) => (
                        <span key={index} className="tag">
                          {interest}
                          <span
                            className="remove"
                            onClick={() =>
                              removeTag(interest, menteeProfile.interests, (newInterests) =>
                                setMenteeProfile({ ...menteeProfile, interests: newInterests }),
                              )
                            }
                          >
                            ×
                          </span>
                        </span>
                      ))}
                    </div>
                    <div className="input-container">
                      <input
                        type="text"
                        placeholder="Add an interest (e.g., Web Development, Career Growth, etc.)"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addTag(menteeProfile.interests, (newInterests) =>
                              setMenteeProfile({ ...menteeProfile, interests: newInterests }),
                            )
                          }
                        }}
                      />
                      <Button
                        type="button"
                        size="small"
                        onClick={() =>
                          addTag(menteeProfile.interests, (newInterests) =>
                            setMenteeProfile({ ...menteeProfile, interests: newInterests }),
                          )
                        }
                      >
                        Add
                      </Button>
                    </div>
                  </TagInput>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Learning Goals</label>
                  <TextArea
                    placeholder="What do you want to learn or achieve through mentorship?"
                    value={menteeProfile.learning_goals}
                    onChange={(e) => setMenteeProfile({ ...menteeProfile, learning_goals: e.target.value })}
                  />
                </div>

                <Input
                  label="Current Role"
                  type="text"
                  placeholder="e.g., Junior Developer, Student, Career Changer"
                  value={menteeProfile.current_role}
                  onChange={(e) => setMenteeProfile({ ...menteeProfile, current_role: e.target.value })}
                />

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
                    Experience Level
                  </label>
                  <Select
                    value={menteeProfile.experience_level}
                    onChange={(e) => setMenteeProfile({ ...menteeProfile, experience_level: e.target.value })}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </Select>
                </div>
              </>
            )}

            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </Form>
        </Card>
      </Section>

      <Section>
        <Card>
          <SectionTitle>Change Password</SectionTitle>
          <Form onSubmit={handlePasswordSubmit}>
            <Input
              label="Current Password"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              required
            />
            <Input
              label="New Password"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              required
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Changing..." : "Change Password"}
            </Button>
          </Form>
        </Card>
      </Section>

      <DangerZone>
        <h3>Danger Zone</h3>
        <p>Once you delete your account, there is no going back. Please be certain.</p>
        <Button variant="outline" onClick={handleDeleteAccount}>
          Delete Account
        </Button>
      </DangerZone>
    </ProfileContainer>
  )
}

export default Profile
