import axios from "axios";

const baseURL = "https://api.blog.redberryinternship.ge/api/";
const token = process.env.REACT_APP_TOKEN;

const axiosInstance = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
    },
});

const getAllBlogs = async () => {
    try {
        const response = await axiosInstance.get("blogs");
        return response.data;
    } catch (error) {
        throw new Error("Error fetching blogs:", error);
    }
};

const getCategories = async () => {
    try {
        const response = await axiosInstance.get("categories");
        return response.data;
    } catch (error) {
        throw new Error("Error fetching blogs:", error);
    }
};

const getBlogById = async (id) => {
    try {
        const response = await axiosInstance.get(`blogs/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching blog:", error);
    }
};

const createBlog = async (formData) => {
    try {
        const response = await axiosInstance.post("blogs", formData);
        return response.data;
    } catch (error) {
        throw new Error("Error creating blog:", error);
    }
};

const apiLogin = async (email) => {
    try {
        const response = await axiosInstance.post("login", { email: email });
        return response;
    } catch (error) {
        throw new Error("Error logging in:", error);
    }
};

export { getAllBlogs, getBlogById, createBlog, getCategories, apiLogin };
