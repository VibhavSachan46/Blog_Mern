const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
}

// Tag Endpoints
export const TagEndpoints = {
    TAGS_API: BASE_URL + "/post/getAllTags"
}

// Post Endpoints
export const PostEndPoints ={
    GETPost_API: BASE_URL + "/post/getAllPosts"
}