import axios from "axios"

const API_BASE_URL = "https://hermentor-production.up.railway.app/api"

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Auth API
export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  login: (credentials) => api.post("/auth/login", credentials),
  getProfile: () => api.get("/auth/profile"),
}

// Mentors API
export const mentorsAPI = {
  getAll: (search = "") => api.get(`/mentors${search ? `?search=${search}` : ""}`),
  getById: (id) => api.get(`/mentors/${id}`),
  getMentees: (search = "") => api.get(`/mentors/dashboard/mentees${search ? `?search=${search}` : ""}`),
  updateProfile: (profileData) => api.put("/mentors/profile", profileData),
  updateMentorshipStatus: (menteeId, status) => api.post("/mentors/mentorship/status", { menteeId, status }),
}

// Mentees API
export const menteesAPI = {
  updateProfile: (profileData) => api.put("/mentees/profile", profileData),
  requestMentorship: (mentorId) => api.post("/mentees/request-mentorship", { mentorId }),
}

// Users API
export const usersAPI = {
  update: (userData) => api.put("/users", userData),
  delete: () => api.delete("/users"),
  changePassword: (passwordData) => api.put("/users/change-password", passwordData),
}

// Contact API
export const contactAPI = {
  submit: (contactData) => api.post("/contact", contactData),
}

// Blog API
export const blogAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return api.get(`/blogs${queryString ? `?${queryString}` : ""}`)
  },
  getById: (id) => api.get(`/blogs/post/${id}`),
  getBySlug: (slug) => api.get(`/blogs/slug/${slug}`),
  create: (blogData) => api.post("/blogs", blogData),
  getMentorBlogs: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return api.get(`/blogs/my-blogs${queryString ? `?${queryString}` : ""}`)
  },
  update: (id, blogData) => api.put(`/blogs/${id}`, blogData),
  delete: (id) => api.delete(`/blogs/${id}`),
}


export const blogsAPI = {
  getAll: () => api.get("/blogs"),
  create: (blogData) => api.post("/blogs", blogData),
};

export default api
