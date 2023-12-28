import React, { useState, useEffect } from "react";
import { getAllBlogs, getCategories } from "../api/blogAPI";
import CategoryDropdown from "../components/CategoryDropdown";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Brand from "../images/Blog.png";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await getAllBlogs();
                const filteredBlogs = response.data.filter(
                    (blog) => !blog.publish_date || new Date(blog.publish_date) <= new Date()
                );
                setBlogs(filteredBlogs);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchBlogs();
        fetchCategories();

        const storedSelectedCategories =
            JSON.parse(localStorage.getItem("selectedCategories")) || [];
        setSelectedCategories(storedSelectedCategories);
    }, []);

    useEffect(() => {
        localStorage.setItem("selectedCategories", JSON.stringify(selectedCategories));
    }, [selectedCategories]);

    const toggleCategorySelection = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            const updatedCategories = selectedCategories.filter((id) => id !== categoryId);
            setSelectedCategories(updatedCategories);
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    return (
        <div className=" min-h-screen bg-[#F3F2FA] pb-20 ">
            <Navbar />
            <div className="h-fit">
                <div className="h-[250px] mt-[80px] pt-8 px-[86px] flex flex-row justify-between ">
                    <div className="h-full w-fit flex ">
                        <h1 className="h-fit text-6xl font-semibold  ">ბლოგი</h1>
                    </div>
                    <img src={Brand} className="h-[200px]"></img>
                </div>
                <div className="w-full mt-10 mb-12 mx-auto flex flex-wrap xl:gap-x-2 xl:gap-y-4 gap-x-1 gap-y-2 justify-center">
                    {categories.length > 0 &&
                        categories.map((category) => (
                            <div
                                key={category.id}
                                onClick={() => toggleCategorySelection(category.id)}
                                className="cursor-pointer w-fit rounded-full border-1 border-solid"
                                style={{
                                    border: "solid",
                                    borderWidth: "1px",
                                    borderColor: selectedCategories.includes(category.id)
                                        ? "black"
                                        : "#F3F2FA",
                                    backgroundColor: `${category?.background_color}15` || "gray",
                                }}
                            >
                                <h3
                                    style={{
                                        color: `${category?.background_color}` || "white",

                                        // filter: "brightness(80%)",
                                    }}
                                    className="w-fit font-medium text-xs px-3 py-2"
                                >
                                    {category.title}
                                </h3>
                            </div>
                        ))}
                </div>
                <div className="max-w-[1320px] m-auto flex flex-wrap justify-center">
                    {blogs.length > 0 &&
                        blogs
                            .filter((blog) =>
                                selectedCategories.length === 0
                                    ? true
                                    : blog.categories.some((cat) =>
                                          selectedCategories.includes(cat.id)
                                      )
                            )
                            .map((blog) => (
                                <div className="w-fit m-4 h-[620px] mb-[30px] ">
                                    <Card key={blog.id} blog={blog} />
                                </div>
                            ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
