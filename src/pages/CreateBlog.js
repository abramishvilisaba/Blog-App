import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Arrow from "../images/Arrow.png";
import LOGO from "../images/LOGO.png";
import infoCircle from "../images/infoCircle.svg";
import close from "../images/close.svg";

import { getCategories } from "../api/blogAPI";
import CategoryDropdown from "../components/CategoryDropdown";
import "./createBlog.css";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import _ from "lodash";
import { Link, useNavigate } from "react-router-dom";
import LoginSuccess from "../components/LoginSuccess";
import ImageUpload from "../components/ImageUpload";

const token = process.env.REACT_APP_TOKEN;

const CreateBlog = () => {
    const formik = useFormik({
        initialValues: {
            image: null,
            author: "",
            title: "",
            description: "",
            publish_date: "",
            categories: [],
            email: "",
        },
        onSubmit: (values) => {
            console.log(values);
        },
        validate: (values) => {
            const errors = {};
            if (values.author) {
                if (!values.author || values.author.length < 4) {
                    if (!errors.author) {
                        errors.author = [];
                    }
                    errors.author[0] = "მინიმუმ 4 სიმბოლო";
                }
                if (values.author.split(/\s+/).filter(Boolean).length < 2) {
                    if (!errors.author) {
                        errors.author = [];
                    }
                    errors.author[1] = "მინიმუმ ორი სიტყვა";
                }
                if (!/^[\u10D0-\u10F0\s]+$/.test(values.author)) {
                    if (!errors.author) {
                        errors.author = [];
                    }
                    errors.author[2] = "მხოლოდ ქართული სიმბოლოები";
                }
            }
            if (values.title && values.title.length < 2) {
                errors.title = "მინიმუმ 2 სიმბოლო";
            }
            if (values.description && values.description.length < 2) {
                errors.description = "მინიმუმ 2 სიმბოლო";
            }
            if (values.email && !values.email.endsWith("@redberry.ge")) {
                errors.email = "ელ. ფოსტა უნდა მთავრდებოდეს @redberry.ge-ით";
            }
            return errors;
        },
    });

    const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/jpeg": [],
            "image/png": [],
        },
    });
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [showPopup, setShowPopup] = useState(false);
    const [image, setImage] = useState(null);
    const [filledSomething, setFilledSomething] = useState(false);

    const prevFormikValues = useRef(formik.values);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const hasFilledValues = _.some(formik.values, (value) => !_.isEmpty(value));

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories();
    }, []);

    function saveImageToLocalStorage(file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageBlob = event.target.result;
            localStorage.setItem("blogImage", imageBlob);
        };
        reader.readAsDataURL(file);
    }

    function createImageBlobFromDataUrl(imageName = "blogImage", imageType = "image/png") {
        const dataUrl = localStorage.getItem("blogImage");
        function dataUrlToBlob(dataUrl) {
            if (dataUrl) {
                const parts = dataUrl.split(";base64,");
                const contentType = parts[0].split(":")[1];
                const byteCharacters = atob(parts[1]);
                const byteArrays = [];
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteArrays.push(byteCharacters.charCodeAt(i));
                }
                const byteArray = new Uint8Array(byteArrays);
                return new Blob([byteArray], { type: contentType });
            }
            return new File([new Blob()], imageName, { type: imageType });
        }
        const blob = dataUrlToBlob(dataUrl);
        return new File([blob], imageName, { type: imageType });
    }

    const saveDataToStorage = (data) => {
        try {
            if (data.image) {
                saveImageToLocalStorage(image);
            }
            const formDataString = JSON.stringify(data);
            localStorage.setItem("blogFormData", formDataString);
        } catch (error) {
            console.log("Error saving FormData to localStorage:", error);
        }
    };

    useEffect(() => {
        if (hasFilledValues || filledSomething) {
            if (!filledSomething) {
                setFilledSomething(true);
            }
            // console.log("saveDataToStorage", formik.values);
            saveDataToStorage(formik.values);
        }
    }, [formik.values, selectedCategories]);

    useEffect(() => {
        const savedFormData = JSON.parse(localStorage.getItem("blogFormData"));
        // console.log("savedFormData", savedFormData);
        formik.setValues((prevValues) => ({
            ...prevValues,
            ...savedFormData,
        }));

        if (savedFormData) {
            if (savedFormData.image) {
                // console.log("savedFormData.image", savedFormData.image);
                const imageBlob = createImageBlobFromDataUrl(
                    savedFormData.image.name,
                    savedFormData.image.type
                );
                setImage(imageBlob);
            }

            const updatedValues = _.merge({}, formik.values, savedFormData);
            formik.values = updatedValues;
        }

        if (selectedCategories) {
            if (selectedCategories.length === 0) {
                if (savedFormData) {
                    setSelectedCategories(savedFormData.categories);
                }
            }
        }
    }, []);

    const handleCategorySelection = (categoryId) => {
        if (!selectedCategories.includes(categoryId)) {
            const updatedCategories = [...selectedCategories, categoryId];
            setSelectedCategories(updatedCategories);
            formik.values.categories = updatedCategories;
        }
    };

    const handleChipRemoval = (categoryId) => {
        const updatedCategories = selectedCategories.filter((catId) => catId !== categoryId);
        setSelectedCategories(updatedCategories);
        formik.values.categories = updatedCategories;
    };

    const handleDrop = (acceptedFiles) => {
        if (acceptedFiles[0]) {
            setImage(acceptedFiles[0]);
            formik.setValues({
                ...formik.values,
                image: {
                    name: acceptedFiles[0].name,
                    path: acceptedFiles[0].path,
                },
            });
        }
    };

    useEffect(() => {
        if (acceptedFiles) {
            handleDrop(acceptedFiles);
        }
    }, [acceptedFiles]);

    const handleSubmit = async (e) => {
        // const formDataToSend = new FormData();
        // Object.entries(formik.values).forEach(([key, value]) => {
        //     formDataToSend.append(key, value);
        // });
        if (areFieldsFilled(formik.values) && Object.keys(formik.errors).length == 0) {
            formik.values.image = image;
            console.log("submit");
            console.log(formik.values);
            try {
                const response = await axios.post(
                    "https://api.blog.redberryinternship.ge/api/blogs",
                    formik.values,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                console.log("Blog created:", response.data);
            } catch (error) {
                console.log("Error creating blog:", error);
            } finally {
                localStorage.removeItem("blogFormData");
                localStorage.removeItem("blogImage");
                togglePopup();
            }
        } else {
            console.log("Error creating blog:");
        }
    };

    function areFieldsFilled(fields) {
        return _.every(fields, (value, key) => {
            if (key !== "email" && (_.isEmpty(value) || value === null)) {
                return false;
            }
            return true;
        });
    }

    const handleClose = () => {
        togglePopup();
        navigate("/");
    };

    const handleImageClose = () => {
        formik.setFieldValue("image", null);
    };

    // console.log(formik.values);

    return (
        <div className="bg-backGround h-fit pb-40">
            <div className="h-[80px] bg-white  ">
                <Link to={"/"}>
                    <img src={LOGO} alt="LOGO" className="mx-auto py-[28px]" />
                </Link>
            </div>
            <div className="flex flex-row h-fit pt-10">
                <div className="w-[31%]  pl-[76px]">
                    <div className="h-[44px] w-[44px]">
                        <Link to={"/"}>
                            <img src={Arrow} alt="Arrow" className="h-[44px] w-[44px]" />
                        </Link>
                    </div>
                </div>
                <div className="w-[600px] text-left  ">
                    <h1 className="w-fit  font-bold text-[32px]">ბლოგის დამატება</h1>
                </div>
            </div>
            <div className="flex w-[600px] h-[848px] ml-[31%] mt-10">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    className=" w-full "
                >
                    <div className="flex flex-col gap-6 h-[fit] justify-start">
                        <ImageUpload
                            setImage={setImage}
                            image={image}
                            values={formik.values}
                            handleImageClose={handleImageClose}
                            handleDrop={handleDrop}
                        />
                        <div className=" flex flex-row justify-between h-[140px]">
                            <div className="flex flex-col justify-start h-[140px] ">
                                <p class="inputLabel">ავტორი *</p>
                                <input
                                    type="text"
                                    name="author"
                                    placeholder="შეიყვანეთ ავტორი"
                                    class={
                                        formik.errors.author &&
                                        (formik.errors.author[0] ||
                                            formik.errors.author[1] ||
                                            formik.errors.author[2])
                                            ? "inputFieldError"
                                            : formik.values.author
                                            ? "inputFieldSuccess"
                                            : "inputField"
                                    }
                                    onChange={formik.handleChange}
                                    value={formik.values.author}
                                />
                                <ul className="list-disc pl-[18px] flex flex-col gap-1">
                                    <li
                                        class={
                                            formik.errors.author && formik.errors.author[0]
                                                ? "errorMessage"
                                                : formik.values.author
                                                ? "successMessage"
                                                : "defaultMessage"
                                        }
                                    >
                                        მინიმუმ 4 სიმბოლო
                                    </li>
                                    <li
                                        class={
                                            formik.errors.author && formik.errors.author[1]
                                                ? "errorMessage"
                                                : formik.values.author
                                                ? "successMessage"
                                                : "defaultMessage"
                                        }
                                    >
                                        მინიმუმ ორი სიტყვა
                                    </li>
                                    <li
                                        class={
                                            formik.errors.author && formik.errors.author[2]
                                                ? "errorMessage"
                                                : formik.values.author
                                                ? "successMessage"
                                                : "defaultMessage"
                                        }
                                    >
                                        მხოლოდ ქართული სიმბოლოები
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col justify-start h-[140px] ">
                                <p class="inputLabel">სათაური *</p>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="შეიყვანეთ სათაური"
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                    class={
                                        formik.errors.title
                                            ? "inputFieldError"
                                            : formik.values.title
                                            ? "inputFieldSuccess"
                                            : "inputField"
                                    }
                                />
                                <p
                                    className="font-normal text-grayText text-xs"
                                    class={
                                        formik.errors.title
                                            ? "errorMessage"
                                            : formik.values.title
                                            ? "successMessage"
                                            : "defaultMessage"
                                    }
                                >
                                    მინიმუმ 2 სიმბოლო
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-start h-[180px] w-full ">
                            <p class="inputLabel">აღწერა *</p>
                            <textarea
                                type="text"
                                name="description"
                                placeholder="შეიყვანეთ აღწერა"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                                class={
                                    formik.errors.description
                                        ? "inputFieldError"
                                        : formik.values.description
                                        ? "inputFieldSuccess"
                                        : "inputField"
                                }
                                style={{
                                    width: "100%",
                                    height: "124px",
                                    resize: "none",
                                    padding: "12px 16px",
                                    textAlign: "start",
                                }}
                            />
                            <p
                                className="font-normal text-grayText text-xs"
                                class={
                                    formik.errors.description
                                        ? "errorMessage"
                                        : formik.values.description
                                        ? "successMessage"
                                        : "defaultMessage"
                                }
                            >
                                მინიმუმ 2 სიმბოლო
                            </p>
                        </div>
                        <div className=" flex flex-row justify-between h-[72px]">
                            <div className="flex flex-col justify-start">
                                <p class="inputLabel">გამოქვეყნების თარიღი *</p>
                                <input
                                    type="date"
                                    name="publish_date"
                                    placeholder="შეიყვანეთ თარიღი"
                                    class={
                                        formik.errors.publish_date
                                            ? "inputFieldError"
                                            : formik.values.publish_date
                                            ? "inputFieldSuccess"
                                            : "inputField"
                                    }
                                    style={{ margin: "0px" }}
                                    onChange={formik.handleChange}
                                    value={formik.values.publish_date}
                                />
                            </div>
                            <div className="flex flex-col justify-start h-full">
                                <p class="inputLabel">კატეგორია</p>
                                <CategoryDropdown
                                    categories={categories}
                                    selectedCategories={selectedCategories}
                                    handleChipRemoval={handleChipRemoval}
                                    handleCategorySelection={handleCategorySelection}
                                    showDropdown={showDropdown}
                                    setShowDropdown={setShowDropdown}
                                    dropdownRef={dropdownRef}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-start h-[fit]">
                            <p class="inputLabel">ელ-ფოსტა</p>
                            <input
                                type="text"
                                name="email"
                                placeholder="შეიყვანეთ მეილი"
                                class={
                                    formik.errors.email
                                        ? "inputFieldError"
                                        : formik.values.email
                                        ? "inputFieldSuccess"
                                        : "inputField"
                                }
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            {formik.errors.email && (
                                <div className="flex flex-row gap-1">
                                    {formik.errors.title && (
                                        <img
                                            src={infoCircle}
                                            alt="infoCircle"
                                            className="h-5 w-5 mt-[-2px]"
                                        />
                                    )}
                                    <p
                                        class={
                                            formik.errors.email
                                                ? "errorMessage"
                                                : formik.values.email
                                                ? "successMessage"
                                                : "defaultMessage"
                                        }
                                    >
                                        მეილი უნდა მთავრდებოდეს @redberry.ge-ით
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full flex justify-end mt-10">
                        <button
                            type="submit"
                            onClick={() => {
                                console.log(formik.values);
                            }}
                            className="w-[288px] h-10 rounded-lg text-white text-sm font-medium "
                            style={{
                                backgroundColor:
                                    !areFieldsFilled(formik.values) ||
                                    !Object.keys(formik.errors).length == 0
                                        ? "#E4E3EB"
                                        : "rgb(93 55 243)",
                            }}
                            disabled={
                                !areFieldsFilled(formik.values) ||
                                !Object.keys(formik.errors).length == 0
                            }
                        >
                            გამოქვეყნება
                        </button>
                    </div>
                </form>
                {showPopup && (
                    <div
                        className="fixed flex flex-col w-1/4 h-[300px] justify-between top-1/2 left-1/2 transform
                             -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-lg"
                    >
                        <button
                            onClick={togglePopup}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <img src={close} alt="close" className="h-6 " />
                        </button>
                        <LoginSuccess
                            onClose={handleClose}
                            successText="ჩანაწერი წარმატებით დაემატა"
                            buttonText="მთავარ გვერდზე დაბრუნება"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateBlog;
