"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { blogAPI } from "../services/api"
import Card from "../components/Card"
import Input from "../components/Input"
import Button from "../components/Button"

const BlogsContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const Title = styled.h1`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
`

const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto;
`

const SearchSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  
  .search-container {
    max-width: 400px;
    width: 100%;
  }
`

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`

const BlogCard = styled(Card)`
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${(props) => props.theme.shadows.large};
  }
  
  .image-container {
    width: 100%;
    height: 200px;
    background: ${(props) => props.theme.colors.background};
    border-radius: 8px;
    margin-bottom: 1rem;
    overflow: hidden;
    
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
      font-size: 3rem;
    }
  }
  
  .content {
    h3 {
      color: ${(props) => props.theme.colors.secondary};
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }
    
    .excerpt {
      color: ${(props) => props.theme.colors.text.secondary};
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    
    .meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.875rem;
      color: ${(props) => props.theme.colors.text.secondary};
      
      .author {
        font-weight: 500;
        color: ${(props) => props.theme.colors.primary};
      }
      
      .date {
        opacity: 0.8;
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

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${(props) => props.theme.colors.text.secondary};
  
  h3 {
    color: ${(props) => props.theme.colors.secondary};
    margin-bottom: 1rem;
  }
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  
  .page-info {
    color: ${(props) => props.theme.colors.text.secondary};
    font-size: 0.875rem;
  }
`

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    pages: 0,
  })

  useEffect(() => {
    fetchBlogs()
  }, [pagination.page])

  const fetchBlogs = async (search = searchTerm) => {
    try {
      setLoading(true)
      const params = {
        page: pagination.page,
        limit: pagination.limit,
      }

      if (search) {
        params.search = search
      }

      const response = await blogAPI.getAll(params)
      setBlogs(response.data.blogs)
      setPagination((prev) => ({
        ...prev,
        ...response.data.pagination,
      }))
      setError("")
    } catch (error) {
      setError("Failed to load blog posts")
      console.error("Error fetching blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setPagination((prev) => ({ ...prev, page: 1 }))
    fetchBlogs(searchTerm)
  }

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading && blogs.length === 0) {
    return (
      <BlogsContainer>
        <LoadingState>Loading blog posts...</LoadingState>
      </BlogsContainer>
    )
  }

  if (error && blogs.length === 0) {
    return (
      <BlogsContainer>
        <ErrorState>
          <h3>Error Loading Blogs</h3>
          <p>{error}</p>
          <Button onClick={() => fetchBlogs()}>Try Again</Button>
        </ErrorState>
      </BlogsContainer>
    )
  }

  return (
    <BlogsContainer>
      <Header>
        <Title>Mentorship Insights</Title>
        <Subtitle>Discover valuable insights, career advice, and industry knowledge from our expert mentors</Subtitle>
      </Header>

      <SearchSection>
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <Input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
      </SearchSection>

      {blogs.length === 0 ? (
        <EmptyState>
          <h3>No blog posts found</h3>
          <p>
            {searchTerm
              ? "Try adjusting your search terms or clear the search to see all posts."
              : "No blog posts have been published yet. Check back soon for new content!"}
          </p>
        </EmptyState>
      ) : (
        <>
          <BlogGrid>
            {blogs.map((blog) => (
              <BlogCard key={blog.id} as={Link} to={`/blogs/${blog.id}`} hoverable>
                <div className="image-container">
                  {blog.image_url ? (
                    <img src={blog.image_url || "/placeholder.svg"} alt={blog.title} />
                  ) : (
                    <div className="placeholder">📝</div>
                  )}
                </div>
                <div className="content">
                  <h3>{blog.title}</h3>
                  <p className="excerpt">{blog.excerpt}</p>
                  <div className="meta">
                    <span className="author">By {blog.mentor_name}</span>
                    <span className="date">{formatDate(blog.created_at)}</span>
                  </div>
                </div>
              </BlogCard>
            ))}
          </BlogGrid>

          {pagination.pages > 1 && (
            <Pagination>
              <Button
                variant="outline"
                size="small"
                disabled={pagination.page === 1}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                Previous
              </Button>

              <span className="page-info">
                Page {pagination.page} of {pagination.pages}
              </span>

              <Button
                variant="outline"
                size="small"
                disabled={pagination.page === pagination.pages}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                Next
              </Button>
            </Pagination>
          )}
        </>
      )}
    </BlogsContainer>
  )
}

export default Blogs
