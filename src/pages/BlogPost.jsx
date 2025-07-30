"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import styled from "styled-components"
import { blogAPI } from "../services/api"
import Card from "../components/Card"
import Button from "../components/Button"

const BlogPostContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`

const BackButton = styled(Button)`
  margin-bottom: 2rem;
`

const ArticleCard = styled(Card)`
  padding: 3rem;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 2rem;
  }
`

const Header = styled.header`
  margin-bottom: 2rem;
  
  h1 {
    color: ${(props) => props.theme.colors.secondary};
    font-size: 2.5rem;
    line-height: 1.3;
    margin-bottom: 1rem;
    
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: 2rem;
    }
  }
  
  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    color: ${(props) => props.theme.colors.text.secondary};
    font-size: 0.875rem;
    
    .author {
      color: ${(props) => props.theme.colors.primary};
      font-weight: 500;
    }
    
    .separator {
      opacity: 0.5;
    }
  }
`

const FeaturedImage = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2rem;
  background: ${(props) => props.theme.colors.background};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, ${(props) => props.theme.colors.primary}20, ${(props) => props.theme.colors.accent}20);
    color: ${(props) => props.theme.colors.text.secondary};
    font-size: 4rem;
  }
`

const Content = styled.div`
  line-height: 1.8;
  font-size: 1.125rem;
  color: ${(props) => props.theme.colors.text.primary};
  
  p {
    margin-bottom: 1.5rem;
  }
  
  h2, h3, h4 {
    color: ${(props) => props.theme.colors.secondary};
    margin: 2rem 0 1rem 0;
  }
  
  h2 {
    font-size: 1.75rem;
  }
  
  h3 {
    font-size: 1.5rem;
  }
  
  h4 {
    font-size: 1.25rem;
  }
  
  blockquote {
    border-left: 4px solid ${(props) => props.theme.colors.primary};
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: ${(props) => props.theme.colors.text.secondary};
  }
  
  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
`

const AuthorSection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${(props) => props.theme.colors.background};
  
  .author-card {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    
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
      flex-shrink: 0;
    }
    
    .info {
      flex: 1;
      
      h3 {
        color: ${(props) => props.theme.colors.secondary};
        margin-bottom: 0.5rem;
      }
      
      .title {
        color: ${(props) => props.theme.colors.primary};
        font-weight: 500;
        margin-bottom: 0.5rem;
      }
      
      .bio {
        color: ${(props) => props.theme.colors.text.secondary};
        line-height: 1.6;
        margin-bottom: 1rem;
      }
      
      .expertise {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        
        .tag {
          background: ${(props) => props.theme.colors.accent};
          color: ${(props) => props.theme.colors.secondary};
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }
      }
    }
  }
`

const LoadingState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 1.125rem;
`

const ErrorState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #dc3545;
  
  h3 {
    margin-bottom: 1rem;
  }
`

const BlogPost = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchBlog()
  }, [id])

  const fetchBlog = async () => {
    try {
      setLoading(true)
      const response = await blogAPI.getById(id)
      setBlog(response.data)
      setError("")
    } catch (error) {
      if (error.response?.status === 404) {
        setError("Blog post not found")
      } else {
        setError("Failed to load blog post")
      }
      console.error("Error fetching blog:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatContent = (content) => {
    // Simple formatting - split by double newlines to create paragraphs
    return content.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)
  }

  if (loading) {
    return (
      <BlogPostContainer>
        <LoadingState>Loading blog post...</LoadingState>
      </BlogPostContainer>
    )
  }

  if (error) {
    return (
      <BlogPostContainer>
        <ErrorState>
          <h3>Error Loading Blog Post</h3>
          <p>{error}</p>
          <Button as={Link} to="/blogs">
            Back to Blogs
          </Button>
        </ErrorState>
      </BlogPostContainer>
    )
  }

  if (!blog) {
    return null
  }

  return (
    <BlogPostContainer>
      <BackButton as={Link} to="/blogs" variant="outline" size="small">
        ← Back to Blogs
      </BackButton>

      <ArticleCard>
        <Header>
          <h1>{blog.title}</h1>
          <div className="meta">
            <span className="author">By {blog.mentor_name}</span>
            <span className="separator">•</span>
            <span>{formatDate(blog.created_at)}</span>
          </div>
        </Header>

        {blog.image_url && (
          <FeaturedImage>
            <img src={blog.image_url || "/placeholder.svg"} alt={blog.title} />
          </FeaturedImage>
        )}

        <Content>{formatContent(blog.content)}</Content>

        <AuthorSection>
          <div className="author-card">
            <div className="avatar">
              {blog.mentor_name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="info">
              <h3>{blog.mentor_name}</h3>
              {blog.mentor_title && <div className="title">{blog.mentor_title}</div>}
              {blog.mentor_bio && <div className="bio">{blog.mentor_bio}</div>}
              {blog.mentor_expertise && blog.mentor_expertise.length > 0 && (
                <div className="expertise">
                  {blog.mentor_expertise.map((skill, index) => (
                    <span key={index} className="tag">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </AuthorSection>
      </ArticleCard>
    </BlogPostContainer>
  )
}

export default BlogPost
