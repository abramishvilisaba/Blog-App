import React from "react";
import arrowDown from "../images/arrowDown.png";
import add from "../images/add.svg";

const CategoryDropdown = ({
    categories,
    selectedCategories,
    handleChipRemoval,
    handleCategorySelection,
    showDropdown,
    setShowDropdown,
}) => {
    return (
        <div className="dropdown-box relative inline-block ">
            <div
                className="dropdown-header w-[288px] h-[44px] overflow-clip  text-center flex gap-1  
                        text-grayText font-normal border  rounded-xl focus:outline-none focus:border-indigo-500"
                style={{
                    borderColor: showDropdown
                        ? "rgb(93 55 243)"
                        : selectedCategories.length > 0
                        ? " #14D81C"
                        : "rgb(228 227 235)",
                    backgroundColor: showDropdown
                        ? "rgb(251 250 255)"
                        : selectedCategories.length > 0
                        ? " #F8FFF8"
                        : "rgb(252 252 253)",
                }}
            >
                <div className="w-[268px] flex flex-row overflow-hidden p-[6px] gap-1">
                    {selectedCategories.map((categoryId) => {
                        const category = categories.find((cat) => cat.id === categoryId);
                        return (
                            <div>
                                <span
                                    key={categoryId}
                                    onClick={() => handleChipRemoval(categoryId)}
                                    style={{
                                        backgroundColor: category?.background_color || "white",
                                        color: category?.text_color || "black",
                                        // width: "fit",
                                        whiteSpace: "nowrap",
                                    }}
                                    className={`flex flex-row w-max  items-center justify-between h-8 text-xs px-3 rounded-2xl overflow-visible hover:cursor-pointer `}
                                >
                                    {category?.title}
                                    <img
                                        src={add}
                                        alt="add"
                                        className="h-4 w-4 ml-[8px] text-white "
                                    ></img>
                                </span>
                            </div>
                        );
                    })}
                </div>
                <div
                    className="h-[44px] w-[40px]  cursor-pointer flex items-center"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <img src={arrowDown} alt="arrowDown" className="h-5 w-5 ml-[2px] "></img>
                </div>
            </div>

            {showDropdown && (
                <div className="dropdown-content  ">
                    <div className="dropdown-categories w-[288px] p-4 gap-y-2 gap-x-1 flex flex-wrap  bg-white shadow-2xl rounded-2xl relative ">
                        {categories.map((category) => (
                            <span
                                key={category.id}
                                onClick={() => {
                                    if (selectedCategories.includes(category.id)) {
                                        // handleChipRemoval(category.id);
                                    } else {
                                        handleCategorySelection(category.id);
                                    }
                                }}
                                style={{
                                    backgroundColor: category?.background_color || "white",
                                    color: category?.text_color || "black",
                                    width: "fit",
                                    whiteSpace: "nowrap",
                                }}
                                className={`flex items-center justify-between h-8 text-xs px-3 rounded-2xl hover:cursor-pointer whitespace-nowrap w-max`}
                            >
                                {category.title}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryDropdown;
