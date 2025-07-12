import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { contactAPI } from "../services/api"
import Button from "../components/Button"
import Card from "../components/Card"
import Input from "../components/Input"

const LandingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const TopNav = styled.nav`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadows.small};
`

const Logo = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.5rem;
  font-weight: 700;
`

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`

const HeroSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary}15, ${(props) => props.theme.colors.accent}15);
`

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.secondary};
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: 2rem;
  max-width: 600px;
`

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 4rem;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`

const FeatureCard = styled(Card)`
  text-align: center;
  
  h3 {
    color: ${(props) => props.theme.colors.primary};
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }
  
  p {
    color: ${(props) => props.theme.colors.text.secondary};
    line-height: 1.6;
  }
`

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.secondary};
  margin-bottom: 1rem;
`

const ContactSection = styled.section`
  padding: 4rem 2rem;
  background: ${(props) => props.theme.colors.background};
`

const ContactContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const ContactForm = styled.form`
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
  min-height: 120px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
  
  &::placeholder {
    color: ${(props) => props.theme.colors.text.secondary};
  }
`

const Message = styled.div`
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  
  &.success {
    background: ${(props) => props.theme.colors.success}20;
    color: ${(props) => props.theme.colors.success};
    border: 1px solid ${(props) => props.theme.colors.success};
  }
  
  &.error {
    background: #dc354520;
    color: #dc3545;
    border: 1px solid #dc3545;
  }
`

const Landing = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [contactLoading, setContactLoading] = useState(false)
  const [contactMessage, setContactMessage] = useState({ type: "", text: "" })

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    })
    setContactMessage({ type: "", text: "" })
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setContactLoading(true)
    setContactMessage({ type: "", text: "" })

    try {
      await contactAPI.submit(contactForm)
      setContactMessage({
        type: "success",
        text: "Thank you for your message! We'll get back to you soon.",
      })
      setContactForm({ name: "", email: "", message: "" })
    } catch (error) {
      setContactMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to send message. Please try again.",
      })
    } finally {
      setContactLoading(false)
    }
  }

  return (
    <LandingContainer>
      <TopNav>
        <Logo>MentorHub</Logo>
        <NavLinks>
          <Button as={Link} to="/login" variant="outline" size="small">
            Login
          </Button>
          <Button as={Link} to="/signup" size="small">
            Sign Up
          </Button>
        </NavLinks>
      </TopNav>

      <HeroSection>
        <HeroTitle>Connect. Learn. Grow.</HeroTitle>
        <HeroSubtitle>
          Join thousands of professionals in meaningful mentorship relationships. Whether you're looking to guide others
          or seeking guidance yourself, we're here to help you succeed.
        </HeroSubtitle>
        <CTAButtons>
          <Button as={Link} to="/signup" size="large">
            Get Started
          </Button>
          <Button as={Link} to="/mentee-dashboard" variant="outline" size="large">
            Find a Mentor
          </Button>
        </CTAButtons>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>Why Choose MentorHub?</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <h3>Expert Mentors</h3>
            <p>
              Connect with industry professionals who have the experience and knowledge to guide your career growth.
            </p>
          </FeatureCard>
          <FeatureCard variant="accent">
            <h3>Flexible Scheduling</h3>
            <p>
              Book sessions that fit your schedule. Our platform makes it easy to coordinate with your mentor or
              mentees.
            </p>
          </FeatureCard>
          <FeatureCard>
            <h3>Track Progress</h3>
            <p>
              Monitor your growth with built-in tools that help you set goals and measure your development over time.
            </p>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <ContactSection>
        <ContactContainer>
          <SectionTitle>Contact Us</SectionTitle>
          <Card>
            {contactMessage.text && <Message className={contactMessage.type}>{contactMessage.text}</Message>}

            <ContactForm onSubmit={handleContactSubmit}>
              <Input
                label="Name"
                type="text"
                name="name"
                placeholder="Your full name"
                value={contactForm.name}
                onChange={handleContactChange}
                required
              />

              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="Your email address"
                value={contactForm.email}
                onChange={handleContactChange}
                required
              />

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>Message</label>
                <TextArea
                  name="message"
                  placeholder="How can we help you?"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  required
                />
              </div>

              <Button type="submit" disabled={contactLoading}>
                {contactLoading ? "Sending..." : "Send Message"}
              </Button>
            </ContactForm>
          </Card>
        </ContactContainer>
      </ContactSection>
    </LandingContainer>
  )
}

export default Landing
