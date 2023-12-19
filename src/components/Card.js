import React from "react";

const Card = ({ blog }) => (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
        <div className="bg-white rounded shadow-md">
            <img
                src={blog.image}
                alt={`Image for ${blog.title}`}
                className="w-full h-48 object-cover rounded-t"
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-700 mb-2">Author: {blog.author}</p>
                <p className="text-gray-700 mb-4">Description: {blog.description}</p>
                <p className="text-gray-700 mb-2">Publish Date: {blog.publish_date}</p>
            </div>
        </div>
    </div>
);

export default Card;
