import React from "react";

const Card = ({ blog }) => {
    return (
        <div className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 p-4 h-[620px]">
            <div className=" rounded-xl">
                <img
                    src={blog.image}
                    alt={`Image for ${blog.title}`}
                    className="w-full aspect-[1/0.8] object-cover rounded-2xl"
                />
                <div className="mt-4">
                    {/* <h2 className="text-xl font-semibold mb-2">{blog.title}</h2> */}
                    <p className="w-fit text-black font-medium text-lg mb-0"> {blog.author}</p>
                    <p className="w-fit text-gray-500 font-light text-sm mb-1">
                        {blog.publish_date}
                    </p>

                    <p className="w-fit text-black font-medium text-lg mb-4">
                        EOMM-ის მრჩეველთა საბჭოს ნინო ეგაძე შეუერთდა
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
                                        backgroundColor:
                                            `${category?.background_color}15` || "black",
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
                    <p className="w-fit text-black font-medium mb-4">{blog.description}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;
