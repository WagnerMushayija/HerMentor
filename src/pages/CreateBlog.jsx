"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { blogAPI } from "../services/api"
import Card from "../components/Card"
import Input from "../components/Input"
import Button from "../components/Button"

const CreateBlogContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`

const Title = styled.h1`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`

const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: 2rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 300px;
  transition: border-color 0.3s ease;
  line-height: 1.6;
  
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
  
  &::placeholder {
    color: ${(props) => props.theme.colors.text.secondary};
  }
`

const ImagePreview = styled.div`
  width: 100%;
  height: 200px;
  border: 2px dashed #e9ecef;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .placeholder {
    text-align: center;
    color: ${(props) => props.theme.colors.text.secondary};
    
    .icon {
      font-size: 3rem;
      margin-bottom: 0.5rem;
      display: block;
    }
  }
`

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`

const SuccessMessage = styled.div`
  color: ${(props) => props.theme.colors.success};
  font-size: 0.875rem;
  margin-top: 0.5rem;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`

const CreateBlog = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image_url: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear messages when user starts typing
    if (error) setError("")
    if (success) setSuccess("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    const { title, content, image } = formData
  
    if (!title.trim() || title.length < 5) {
      setError("Title must be at least 5 characters")
      return
    }
  
    if (!content.trim() || content.length < 50) {
      setError("Content must be at least 50 characters")
      return
    }
  
    setLoading(true)
    setError("")
  
    try {
      const data = new FormData()
      data.append("title", title)
      data.append("content", content)
      if (image) data.append("image", image)
  
      const response = await blogAPI.create(data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
  
      setSuccess("Blog post created!")
  
      setTimeout(() => {
        navigate(`/blogs/${response.data.blog.id}`)
      }, 1500)
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create blog")
    } finally {
      setLoading(false)
    }
  }
  

  const isValidImageUrl = (url) => {
    if (!url) return false
    try {
      new URL(url)
      return /\.(jpg|jpeg|png|gif|webp)$/i.test(url)
    } catch {
      return false
    }
  }

  return (
    <CreateBlogContainer>
      <Title>Create New Blog Post</Title>
      <Subtitle>Share your insights and expertise with the community</Subtitle>

      <Card padding="2rem">
        <Form onSubmit={handleSubmit}>
          <Input
            label="Blog Title"
            type="text"
            name="title"
            placeholder="Enter an engaging title for your blog post"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label style={{ fontWeight: 500, marginBottom: "0.5rem" }}>Upload Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                image: e.target.files[0],
              }))
              setError("")
              setSuccess("")
            }}
          />

          {formData.image_url && (
            <ImagePreview>
              {isValidImageUrl(formData.image_url) ? (
                <img
                  src={formData.image_url || "/placeholder.svg"}
                  alt="Preview"
                  onError={(e) => {
                    e.target.style.display = "none"
                    e.target.nextSibling.style.display = "flex"
                  }}
                />
              ) : null}
              <div className="placeholder" style={{ display: isValidImageUrl(formData.image_url) ? "none" : "flex" }}>
                <div>
                  <span className="icon">🖼️</span>
                  <div>Image preview will appear here</div>
                </div>
              </div>
            </ImagePreview>
          )}

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
                color: "#2b2d42",
              }}
            >
              Content *
            </label>
            <TextArea
              name="content"
              placeholder="Write your blog content here. Share your insights, experiences, and advice that will help others in their professional journey.

You can write multiple paragraphs by separating them with double line breaks.

This will create well-formatted content that's easy to read."
              value={formData.content}
              onChange={handleChange}
              required
            />
            <div
              style={{
                fontSize: "0.75rem",
                color: "#6c757d",
                marginTop: "0.25rem",
              }}
            >
              {formData.content.length} characters (minimum 50 required)
            </div>
          </div>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <ButtonGroup>
            <Button type="button" variant="outline" onClick={() => navigate(-1)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || success}>
              {loading ? "Creating..." : success ? "Created!" : "Publish Blog Post"}
            </Button>
          </ButtonGroup>
        </Form>
      </Card>
    </CreateBlogContainer>
  )
}

export default CreateBlog
