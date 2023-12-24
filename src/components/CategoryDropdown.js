import React from "react";
import arrowDown from "../images/arrowDown.png";

const CategoryDropdown = ({
    categories,
    selectedCategories,
    handleChipRemoval,
    handleCategorySelection,
    showDropdown,
    setShowDropdown,
}) => {
    return (
        <div className="dropdown-box ">
            <div
                className="dropdown-header w-[288px] h-[44px] overflow-clip  text-center flex gap-1 
                        text-greyText font-normal border  rounded-xl focus:outline-none focus:border-indigo-500"
                style={{
                    borderColor: showDropdown ? "rgb(93 55 243)" : " rgb(228 227 235)",
                    backgroundColor: showDropdown ? "rgb(251 250 255)" : "rgb(252 252 253)",
                }}
            >
                <div className="w-[268px] flex flex-row overflow-hidden p-[6px] gap-1">
                    {selectedCategories.map((categoryId) => {
                        const category = categories.find((cat) => cat.id === categoryId);
                        return (
                            <span
                                key={categoryId}
                                onClick={() => handleChipRemoval(categoryId)}
                                style={{
                                    backgroundColor: category?.background_color || "white",
                                    color: category?.text_color || "black",
                                    // width: "fit",
                                    whiteSpace: "nowrap",
                                }}
                                className={`flex flex-row w-fit  items-center justify-between h-8 text-xs px-3 rounded-2xl overflow-visible  `}
                            >
                                {category?.title}
                            </span>
                        );
                    })}
                </div>
                <div
                    className="h-[44px] w-[40px]  cursor-pointer flex items-center"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    {/* &#9660; */}
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
                                        handleChipRemoval(category.id);
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
                                className={`flex items-center justify-between h-8 text-xs px-3 rounded-2xl`}
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
