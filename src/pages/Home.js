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
                setBlogs(response.data);
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
    }, []);

    const handleCategorySelection = (categoryId) => {
        if (!selectedCategories.includes(categoryId)) {
            const updatedCategories = [...selectedCategories, categoryId];
            setSelectedCategories(updatedCategories);
        }
    };

    const handleChipRemoval = (categoryId) => {
        const updatedCategories = selectedCategories.filter((catId) => catId !== categoryId);
        setSelectedCategories(updatedCategories);
    };

    const toggleCategorySelection = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            const updatedCategories = selectedCategories.filter((id) => id !== categoryId);
            setSelectedCategories(updatedCategories);
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    console.log(selectedCategories);

    return (
        <div className=" min-h-screen bg-[#F3F2FA] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <Navbar />
            <div className="h-fit px-[6%] ">
                <div className="h-[250px] mt-[80px] pt-8 flex flex-row justify-between ">
                    <div className="h-full w-fit flex items-center">
                        <h1 className="h-fit text-6xl font-semibold  ">ბლოგი</h1>
                    </div>
                    <img src={Brand} className="h-[200px]"></img>
                </div>
                <div className="w-full my-8 mx-auto flex flex-wrap xl:gap-x-2 xl:gap-y-4 gap-x-1 gap-y-2 justify-center">
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
                                    backgroundColor: `${category?.background_color}15` || "black",
                                }}
                            >
                                <h3
                                    style={{
                                        color: `${category?.background_color}` || "white",

                                        // filter: "brightness(80%)",
                                    }}
                                    className="w-fit font-medium text-sm px-3 py-2"
                                >
                                    {category.title}
                                </h3>
                            </div>
                        ))}
                </div>
                <div className="w-full sm:px-[0] xl:px-[0] 2xl:px-[8%]  flex flex-wrap">
                    {blogs.length > 0 &&
                        blogs
                            .filter((blog) =>
                                selectedCategories.length === 0
                                    ? true
                                    : blog.categories.some((cat) =>
                                          selectedCategories.includes(cat.id)
                                      )
                            )
                            .map((blog) => <Card key={blog.id} blog={blog} />)}
                </div>
            </div>
        </div>
    );
};

export default Home;
