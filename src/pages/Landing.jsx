"use client"

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
  background:#1a1a2e;
  color: #ffffff;
`

const TopNav = styled.nav`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(4, 7, 163, 0.23);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, rgba(255, 94, 228, 0.21), rgba(255, 255, 255, 0));
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/hero.jpg') center/cover no-repeat;
    opacity: 0.1;
    z-index: 1;
  }
`

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  max-width: 700px;
  line-height: 1.6;
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

const StatsSection = styled.section`
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
`

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`

const StatItem = styled.div`
  .number {
    font-size: 3rem;
    font-weight: 700;
    color: ${(props) => props.theme.colors.primary};
    margin-bottom: 0.5rem;
  }
  
  .label {
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.8);
  }
`

const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
`

const FeatureCard = styled(Card)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  padding: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
  }
  
  .icon {
    width: 80px;
    height: 80px;
    background: ${(props) => props.theme.colors.primary};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    font-size: 2rem;
    color: white;
  }
  
  h3 {
    color: #ffffff;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
  }
`

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  color: #ffffff;
  margin-bottom: 1rem;
  font-weight: 700;
`

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
`

const MissionVisionSection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, rgba(43, 45, 66, 0.8), rgba(145, 94, 255, 0.1));
`

const MissionVisionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 4rem;
  margin-top: 3rem;
`

const MissionVisionCard = styled(Card)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem;
  text-align: center;
  
  .icon {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, ${(props) => props.theme.colors.primary}, ${(props) => props.theme.colors.accent});
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 2rem;
    font-size: 2.5rem;
    color: white;
  }
  
  h3 {
    color: #ffffff;
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.8;
    font-size: 1.125rem;
  }
`

const TestimonialsSection = styled.section`
  padding: 6rem 2rem;
  background: rgba(255, 255, 255, 0.02);
`

const TestimonialsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`

const TestimonialCard = styled(Card)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  position: relative;
  
  .quote {
    font-size: 3rem;
    color: ${(props) => props.theme.colors.primary};
    position: absolute;
    top: 1rem;
    left: 1.5rem;
    opacity: 0.3;
  }
  
  .content {
    margin-top: 1rem;
    margin-bottom: 2rem;
    
    p {
      color: rgba(255, 255, 255, 0.9);
      line-height: 1.6;
      font-style: italic;
      font-size: 1.125rem;
    }
  }
  
  .author {
    display: flex;
    align-items: center;
    gap: 1rem;
    
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
    }
    
    .info {
      .name {
        color: #ffffff;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      
      .role {
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.875rem;
      }
    }
  }
`

const TeamSection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, rgba(145, 94, 255, 0.1), rgba(43, 45, 66, 0.8));
`

const TeamContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`

const TeamCard = styled(Card)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  padding: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
  }
  
  .photo {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${(props) => props.theme.colors.primary}, ${(props) => props.theme.colors.accent});
    margin: 0 auto 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: white;
    font-weight: 600;
  }
  
  h4 {
    color: #ffffff;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  .position {
    color: ${(props) => props.theme.colors.primary};
    font-weight: 500;
    margin-bottom: 1rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
    line-height: 1.5;
  }
`

const ContactSection = styled.section`
  padding: 6rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
`

const ContactContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`

const Message = styled.div`
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  
  &.success {
    background: rgba(65, 180, 124, 0.2);
    color: ${(props) => props.theme.colors.success};
    border: 1px solid ${(props) => props.theme.colors.success};
  }
  
  &.error {
    background: rgba(220, 53, 69, 0.2);
    color: #ff6b6b;
    border: 1px solid #ff6b6b;
  }
`

const Footer = styled.footer`
  background: #0f0f1e;
  padding: 4rem 2rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
`

const FooterSection = styled.div`
  h4 {
    color: #ffffff;
    font-size: 1.25rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  p, a {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  a:hover {
    color: ${(props) => props.theme.colors.primary};
  }
  
  ul {
    list-style: none;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
`

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  
  .social-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
    
    a {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.7);
      transition: all 0.3s ease;
      
      &:hover {
        background: ${(props) => props.theme.colors.primary};
        color: white;
        transform: translateY(-2px);
      }
    }
  }
`

const DarkInput = styled(Input)`
  input {
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    
    &:focus {
      border-color: ${(props) => props.theme.colors.primary};
    }
  }
  
  label {
    color: #ffffff;
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

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Meta",
      content:
        "HerMentor connected me with an amazing mentor who helped me transition from junior to senior developer. The guidance I received was invaluable for my career growth.",
      avatar: "SC",
    },
    {
      name: "Marcus Johnson",
      role: "Product Manager at Stripe",
      content:
        "As a mentor on this platform, I've had the privilege of guiding talented individuals. The matching system is excellent and the mentees are truly motivated to learn.",
      avatar: "MJ",
    },
    {
      name: "Elena Rodriguez",
      role: "UX Designer at Airbnb",
      content:
        "The mentorship I received through HerMentor was life-changing. My mentor helped me build confidence and develop skills that landed me my dream job.",
      avatar: "ER",
    },
  ]

  const teamMembers = [
    {
      name: "Alex Thompson",
      position: "CEO & Founder",
      bio: "Former Google engineer passionate about connecting talent with opportunity.",
      avatar: "AT",
    },
    {
      name: "Maria Garcia",
      position: "Head of Product",
      bio: "Product leader with 10+ years experience building user-centric platforms.",
      avatar: "MG",
    },
    {
      name: "David Kim",
      position: "CTO",
      bio: "Full-stack engineer focused on building scalable, secure platforms.",
      avatar: "DK",
    },
    {
      name: "Lisa Park",
      position: "Head of Community",
      bio: "Community builder dedicated to fostering meaningful professional relationships.",
      avatar: "LP",
    },
  ]

  return (
    <LandingContainer>
      <TopNav>
        <Logo>HerMentor</Logo>
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
        <HeroTitle>Empowering Women Through Mentorship</HeroTitle>
        <HeroSubtitle>
          Connect with industry-leading female professionals who will guide your career journey. Whether you're starting
          out or looking to level up, find your perfect mentor today.
        </HeroSubtitle>
        <CTAButtons>
          <Button as={Link} to="/signup" size="large">
            Start Your Journey
          </Button>
          <Button as={Link} to="/mentee-dashboard" variant="outline" size="large">
            Find a Mentor
          </Button>
        </CTAButtons>
      </HeroSection>

      <StatsSection>
        <StatsContainer>
          <StatItem>
            <div className="number">2,500+</div>
            <div className="label">Active Mentors</div>
          </StatItem>
          <StatItem>
            <div className="number">10,000+</div>
            <div className="label">Successful Matches</div>
          </StatItem>
          <StatItem>
            <div className="number">95%</div>
            <div className="label">Success Rate</div>
          </StatItem>
          <StatItem>
            <div className="number">50+</div>
            <div className="label">Industries</div>
          </StatItem>
        </StatsContainer>
      </StatsSection>

      <FeaturesSection>
        <SectionTitle>Why Choose HerMentor?</SectionTitle>
        <SectionSubtitle>
          We're more than just a platform - we're a community dedicated to empowering women in their professional
          journeys.
        </SectionSubtitle>
        <FeaturesGrid>
          <FeatureCard>
            <div className="icon">👩‍💼</div>
            <h3>Expert Female Mentors</h3>
            <p>
              Connect with successful women leaders across various industries who understand your unique challenges and
              can provide targeted guidance.
            </p>
          </FeatureCard>
          <FeatureCard>
            <div className="icon">🎯</div>
            <h3>Personalized Matching</h3>
            <p>
              Our AI-powered matching system connects you with mentors based on your goals, industry, and career stage
              for the most relevant guidance.
            </p>
          </FeatureCard>
          <FeatureCard>
            <div className="icon">📈</div>
            <h3>Track Your Growth</h3>
            <p>
              Monitor your progress with built-in goal setting, milestone tracking, and regular check-ins to ensure
              you're achieving your objectives.
            </p>
          </FeatureCard>
          <FeatureCard>
            <div className="icon">🌐</div>
            <h3>Global Community</h3>
            <p>
              Join a worldwide network of ambitious women supporting each other's success through mentorship,
              networking, and collaboration.
            </p>
          </FeatureCard>
          <FeatureCard>
            <div className="icon">⏰</div>
            <h3>Flexible Scheduling</h3>
            <p>
              Book sessions that fit your busy schedule with our easy-to-use calendar system and multiple communication
              options.
            </p>
          </FeatureCard>
          <FeatureCard>
            <div className="icon">🏆</div>
            <h3>Proven Results</h3>
            <p>
              Join thousands of women who have accelerated their careers, increased their confidence, and achieved their
              professional goals.
            </p>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <MissionVisionSection>
        <SectionTitle>Our Purpose</SectionTitle>
        <MissionVisionContainer>
          <MissionVisionCard>
            <div className="icon">🎯</div>
            <h3>Our Mission</h3>
            <p>
              To bridge the gender gap in leadership by connecting ambitious women with experienced female mentors who
              can provide guidance, support, and inspiration for career advancement. We believe every woman deserves
              access to the wisdom and networks that accelerate professional growth.
            </p>
          </MissionVisionCard>
          <MissionVisionCard>
            <div className="icon">🌟</div>
            <h3>Our Vision</h3>
            <p>
              A world where every woman has equal access to career opportunities and leadership positions. We envision a
              future where mentorship is the norm, not the exception, and where women consistently support each other's
              success across all industries and career levels.
            </p>
          </MissionVisionCard>
        </MissionVisionContainer>
      </MissionVisionSection>

      <TestimonialsSection>
        <TestimonialsContainer>
          <SectionTitle>Success Stories</SectionTitle>
          <SectionSubtitle>
            Hear from the women who have transformed their careers through our mentorship platform.
          </SectionSubtitle>
          <TestimonialsGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index}>
                <div className="quote">"</div>
                <div className="content">
                  <p>{testimonial.content}</p>
                </div>
                <div className="author">
                  <div className="avatar">{testimonial.avatar}</div>
                  <div className="info">
                    <div className="name">{testimonial.name}</div>
                    <div className="role">{testimonial.role}</div>
                  </div>
                </div>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>
        </TestimonialsContainer>
      </TestimonialsSection>

      {/* <TeamSection>
        <TeamContainer>
          <SectionTitle>Meet Our Team</SectionTitle>
          <SectionSubtitle>
            The passionate individuals behind HerMentor, dedicated to empowering women worldwide.
          </SectionSubtitle>
          <TeamGrid>
            {teamMembers.map((member, index) => (
              <TeamCard key={index}>
                <div className="photo">{member.avatar}</div>
                <h4>{member.name}</h4>
                <div className="position">{member.position}</div>
                <p>{member.bio}</p>
              </TeamCard>
            ))}
          </TeamGrid>
        </TeamContainer>
      </TeamSection> */}

      <ContactSection>
        <ContactContainer>
          <SectionTitle>Get In Touch</SectionTitle>
          <SectionSubtitle>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </SectionSubtitle>
          <Card
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              marginTop: "2rem",
            }}
          >
            {contactMessage.text && <Message className={contactMessage.type}>{contactMessage.text}</Message>}

            <ContactForm onSubmit={handleContactSubmit}>
              <DarkInput
                label="Name"
                type="text"
                name="name"
                placeholder="Your full name"
                value={contactForm.name}
                onChange={handleContactChange}
                required
              />

              <DarkInput
                label="Email"
                type="email"
                name="email"
                placeholder="Your email address"
                value={contactForm.email}
                onChange={handleContactChange}
                required
              />

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "#ffffff" }}>
                  Message
                </label>
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

      <Footer>
        <FooterContainer>
          <FooterContent>
            <FooterSection>
              <h4>HerMentor</h4>
              <p>
                Empowering women through meaningful mentorship connections. Join our community and accelerate your
                career journey today.
              </p>
            </FooterSection>

            <FooterSection>
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/mentee-dashboard">Find Mentors</Link>
                </li>
                <li>
                  <Link to="/mentor-dashboard">Become a Mentor</Link>
                </li>
              </ul>
            </FooterSection>

            <FooterSection>
              <h4>Support</h4>
              <ul>
                <li>
                  <a href="#help">Help Center</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
                <li>
                  <a href="#privacy">Privacy Policy</a>
                </li>
                <li>
                  <a href="#terms">Terms of Service</a>
                </li>
              </ul>
            </FooterSection>

            <FooterSection>
              <h4>Contact</h4>
              <p>Email: hello@hermentor.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Innovation St, Tech City, TC 12345</p>
            </FooterSection>
          </FooterContent>

          <FooterBottom>
            <div className="social-links">
              <a href="#twitter" aria-label="Twitter">
                🐦
              </a>
              <a href="#linkedin" aria-label="LinkedIn">
                💼
              </a>
              <a href="#instagram" aria-label="Instagram">
                📷
              </a>
              <a href="#facebook" aria-label="Facebook">
                📘
              </a>
            </div>
            <p>&copy; 2024 HerMentor. All rights reserved. Made with ❤️ for empowering women.</p>
          </FooterBottom>
        </FooterContainer>
      </Footer>
    </LandingContainer>
  )
}

export default Landing
