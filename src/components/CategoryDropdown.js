import React from "react";

const CategoryDropdown = ({
    categories,
    selectedCategories,
    handleChipRemoval,
    handleCategorySelection,
    showDropdown,
    setShowDropdown,
}) => {
    return (
        <div className="dropdown-box">
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
            <div className="dropdown-header h-8  w-64 bg-slate-300 text-center flex gap-1">
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
                <span
                    className="w-full text-left px-2 cursor-pointer"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    &#9660;
                </span>
            </div>
            {showDropdown && (
                <div className="dropdown-content">
                    <div className="dropdown-categories w-64 flex flex-wrap gap-1 ">
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
                                className={`flex items-center justify-between p-2 rounded-md `}
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
