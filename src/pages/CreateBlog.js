import React, { useState } from "react";
import axios from "axios";

const CreateBlog = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: null,
        author: "",
        publish_date: "",
        categories: "",
        email: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            image: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });

        try {
            const token = process.env.REACT_APP_TOKEN; // Replace with your token
            const response = await axios.post(
                "https://api.blog.redberryinternship.ge/api/blogs",
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Blog created:", response.data); // Log the response or handle it as needed
            // Optionally redirect or show success message upon successful creation
        } catch (error) {
            console.error("Error creating blog:", error);
            // Handle errors if the request fails
        }
    };

    return (
        <div className="flex justify-center mt-[20vh]">
            <form onSubmit={handleSubmit} className="max-w-md w-full mt-8">
                <div className="grid grid-cols-1 gap-4">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Title"
                        className="p-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        className="p-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        className="p-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        placeholder="Author"
                        className="p-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="text"
                        name="publish_date"
                        value={formData.publish_date}
                        onChange={handleInputChange}
                        placeholder="Publish Date"
                        className="p-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="text"
                        name="categories"
                        value={formData.categories}
                        onChange={handleInputChange}
                        placeholder="Categories"
                        className="p-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="p-2 border rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Create Blog
                </button>
            </form>
        </div>
    );
};

export default CreateBlog;
