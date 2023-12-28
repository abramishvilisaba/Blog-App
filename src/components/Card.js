import React from "react";
import ArrowBlue from "../images/ArrowBlue.svg";
import { Link, useNavigate, redirect } from "react-router-dom";

const Card = ({ blog }) => {
    return (
        // <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 p-4 h-[620px] mb-[20px]">

        <div className=" rounded-xl w-[408px] h-[620px]">
            <img
                src={blog.image}
                alt={`Image for ${blog.title}`}
                className="w-full aspect-[1/0.8] object-cover rounded-2xl"
            />
            <div className="mt-4">
                {/* <h2 className="text-xl font-semibold mb-2">{blog.title}</h2> */}
                <p className="w-fit text-black text-base font-medium mb-0"> {blog.author}</p>
                <p className="w-fit text-grayText font-light text-xs mb-1">{blog.publish_date}</p>

                <p
                    className="w-fit text-black font-bold  text-xl mb-4 overflow-hidden"
                    style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        textOverflow: "ellipsis",
                    }}
                >
                    {blog.title}
                </p>
                <div
                    className="w-full flex  xl:gap-x-2 xl:gap-y-4 gap-x-1 gap-y-2 justify-start mb-2
                        overflow-auto scrollbar-thin scrollbar-track-transparent pb-2 overflow-y-hidden"
                >
                    {blog.categories.length > 0 &&
                        blog.categories.map((category) => (
                            <div
                                key={category.id}
                                className="cursor-pointer w-fit h-fit whitespace-nowrap rounded-full border-1 border-solid"
                                style={{
                                    backgroundColor: `${category?.background_color}15` || "black",
                                }}
                            >
                                <h3
                                    style={{
                                        color: `${category?.background_color}` || "white",
                                        // filter: "brightness(80%)",
                                    }}
                                    className="w-fit font-medium text-xs px-3 py-1.5"
                                >
                                    {category.title}
                                </h3>
                            </div>
                        ))}
                </div>
                <div className="h-[56px] mb-4">
                    <p
                        className="w-fit text-darkGrayText text-base font-regular  flex overflow-hidden  "
                        style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            textOverflow: "ellipsis",
                        }}
                    >
                        {blog.description}
                    </p>
                </div>

                <div
                    // onClick={loader}
                    className="flex flex-row w-fit h-fit hover:cursor-pointer mb-4"
                >
                    <Link to={`/blogpage/${blog.id}`}>
                        <p className="w-fit text-indigo text-base font-medium  flex overflow-hidden  ">
                            სრულად ნახვა
                        </p>
                    </Link>
                    <img src={ArrowBlue} alt="ArrowBlue" className="h-5 w-5 mt-[2px]" />
                </div>
            </div>
        </div>
        // </div>
    );
};

export default Card;
