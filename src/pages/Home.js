import React, { useState, useEffect } from "react";
import { getAllBlogs, getCategories } from "../api/blogAPI";
import Card from "../components/Card";
import CategoryDropdown from "../components/CategoryDropdown";
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

    return (
        <div className=" min-h-screen bg-[#F3F2FA] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <Navbar />
            <div className="h-fit ">
                <div className="h-[250px] pt-24 flex flex-row justify-between px-28 ">
                    <div className="h-full w-fit flex items-center">
                        <h1 className="h-fit text-6xl font-semibold  ">ბლოგი</h1>
                    </div>

                    <img src={Brand} className="h-full"></img>

                    <>
                        {/* <CategoryDropdown
                    categories={categories}
                    selectedCategories={selectedCategories}
                    handleChipRemoval={handleChipRemoval}
                    handleCategorySelection={handleCategorySelection}
                    showDropdown={showDropdown}
                    setShowDropdown={setShowDropdown}
                />
                <div>
                    {selectedCategories.map((categoryId) => {
                        const category = categories.find((cat) => cat.id === categoryId);
                        return (
                            <span
                                key={categoryId}
                                className="chip"
                                onClick={() => handleChipRemoval(categoryId)}
                                style={{
                                    backgroundColor: category?.background_color || "white",
                                    color: category?.text_color || "black",
                                }}
                            >
                                {category?.title}
                            </span>
                        );
                    })}
                </div> */}
                    </>
                </div>
                <div className="w-2/3 m-auto flex flex-wrap">
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
