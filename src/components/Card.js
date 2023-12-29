import React from "react";
import ArrowBlue from "../images/ArrowBlue.svg";
import { Link, useNavigate, redirect } from "react-router-dom";

const Card = ({ blog }) => {
    return (
        <div className=" rounded-xl w-[408px] h-[620px]">
            <img
                src={blog.image}
                alt={`Image for ${blog.title}`}
                className="w-full aspect-[1/0.8] object-cover rounded-2xl"
            />
            <div className="mt-4">
                <p className="w-fit text-black text-base font-medium mb-2"> {blog.author}</p>
                <p className="w-fit text-grayText font-light text-xs mb-4">{blog.publish_date}</p>
                <p
                    className="w-fit h-[56px]  text-black font-bold  text-xl mb-4 overflow-hidden"
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
                        overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 pb-2 h-10 overflow-y-hidden"
                >
                    {blog.categories.length > 0 &&
                        blog.categories.map((category) => (
                            <div
                                key={category.id}
                                // className="cursor-pointer w-fit h-fit whitespace-nowrap rounded-full border-1 border-solid"
                                className=" w-fit h-fit whitespace-nowrap rounded-full border-1 border-solid"
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

                <div className="flex flex-row w-fit h-fit hover:cursor-pointer mb-4">
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
