import React, { useState, useEffect, useRef } from "react";
import { getBlogById, getCategories, getAllBlogs } from "../api/blogAPI";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { useParams, Link } from "react-router-dom";
import Arrow2 from "../images/Arrow2.svg";
import ArrowButtonRight from "../images/ArrowButtonRight.svg";
import ArrowButtonLeft from "../images/ArrowButtonLeft.svg";
import ArrowButtonInactive from "../images/ArrowButtonInactive.svg";

const Home = () => {
    let { id } = useParams();

    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [blog, setBlog] = useState("");
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === blogs.length - 4 ? 0 : prevSlide + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? blogs.length - 3 : prevSlide - 1));
    };
    console.log(blogs.length);
    console.log(currentSlide);

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

        const fetchBlogById = async (id) => {
            try {
                const response = await getBlogById(id);
                setBlog(response);
            } catch (error) {
                console.log(error);
            }
        };

        fetchBlogs();
        fetchCategories();
        fetchBlogById(id);
        console.log("scroll");
    }, [id]);

    const scrollToRef = useRef(null);

    useEffect(() => {
        scrollToRef.current.scrollIntoView({ behavior: "smooth" });
    }, [id]);

    return (
        <div className=" min-h-screen bg-[#F3F2FA] pb-20" ref={scrollToRef}>
            <Navbar />
            {blog && (
                <div className="h-fit px-[0%] pt-20 ">
                    <div className="flex flex-row pt-10">
                        <div className="w-[25%] ">
                            <div className="h-[44px] w-[44px] ml-[76px]">
                                <Link to={"/"}>
                                    <img src={Arrow2} alt="Arrow2" className="h-[44px] w-[44px]" />
                                </Link>
                            </div>
                        </div>
                        <div className="h-fit w-[50%] flex flex-row justify-center mb-[98px]  ">
                            <div className="h-fit w-[720px]    flex flex-row justify-center  ">
                                {blog && (
                                    <div className="w-full   h-[fit] ">
                                        <div className=" rounded-xl w-full">
                                            <img
                                                src={blog.image}
                                                alt={`Image for ${blog.title}`}
                                                className="w-full aspect-[2.22/1] object-cover rounded-2xl"
                                            />
                                            <div className="mt-4">
                                                <p className="w-fit text-black text-base font-medium mb-0">
                                                    {blog.author}
                                                </p>
                                                <div className="flex flex-row mb-1">
                                                    <p className="w-fit text-grayText font-light text-xs ">
                                                        {blog.publish_date}
                                                    </p>
                                                    {blog.email && (
                                                        <ul className="list-disc text-xs pl-[22px]  ">
                                                            <li className="w-fit text-grayText font-light text-xs ">
                                                                {blog.email}
                                                            </li>
                                                        </ul>
                                                    )}
                                                </div>

                                                <p className="w-fit text-black font-bold  text-xl mb-6">
                                                    {blog.title}
                                                </p>
                                                <div
                                                    className="w-full flex  xl:gap-x-2 xl:gap-y-4 gap-x-1 gap-y-2 justify-start mb-10
                                            overflow-auto scrollbar-thin scrollbar-track-transparent  overflow-y-hidden"
                                                >
                                                    {blog.categories.length > 0 &&
                                                        blog.categories.map((category) => (
                                                            <div
                                                                key={category.id}
                                                                className="cursor-pointer w-fit h-fit whitespace-nowrap rounded-full border-1 border-solid"
                                                                style={{
                                                                    backgroundColor:
                                                                        `${category?.background_color}15` ||
                                                                        "black",
                                                                }}
                                                            >
                                                                <h3
                                                                    style={{
                                                                        color:
                                                                            `${category?.background_color}` ||
                                                                            "white",
                                                                        // filter: "brightness(80%)",
                                                                    }}
                                                                    className="w-fit font-medium text-xs px-3 py-1.5"
                                                                >
                                                                    {category.title}
                                                                </h3>
                                                            </div>
                                                        ))}
                                                </div>
                                                <p className="w-fit text-darkGrayText text-base leading-7 font-regular mb-4 flex overflow-hidden   ">
                                                    {blog.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-[25%]"></div>
                    </div>
                    {blogs && (
                        <div>
                            <div className="w-fit m-auto">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-[32px] font-bold ">მსგავსი სტატიები</h2>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={prevSlide}
                                            className="bg-gray-200 rounded-3xl"
                                            disabled={currentSlide === 0}
                                        >
                                            {currentSlide === 0 ? (
                                                <img
                                                    src={ArrowButtonInactive}
                                                    alt="ArrowButtonInactive"
                                                    className="h-[44px] w-[44px]"
                                                />
                                            ) : (
                                                <img
                                                    src={ArrowButtonLeft}
                                                    alt="ArrowButtonLeft"
                                                    className="h-[44px] w-[44px]"
                                                />
                                            )}
                                        </button>
                                        <button
                                            onClick={nextSlide}
                                            className="bg-gray-200 rounded-3xl"
                                        >
                                            <img
                                                src={ArrowButtonRight}
                                                alt="ArrowButtonRight"
                                                className="h-[44px] w-[44px]"
                                            />
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto flex space-x-4">
                                    {blogs
                                        .filter((blog) => blog.id != id)
                                        .slice(currentSlide, currentSlide + 3)
                                        .map((blog) => (
                                            <div key={blog.id}>
                                                <Link to={`/blogpage/${blog.id}`}>
                                                    <Card blog={blog} />
                                                </Link>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
