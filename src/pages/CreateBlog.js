import React, { useState, useEffect } from "react";
import axios from "axios";
import Arrow from "../images/Arrow.png";
import LOGO from "../images/LOGO.png";
import folderAdd from "../images/folderAdd.png";
import { getAllBlogs, getCategories } from "../api/blogAPI";
import CategoryDropdown from "../components/CategoryDropdown";
import "./createBlog.css";
import { useFormik } from "formik";
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import _ from "lodash";
const token = process.env.REACT_APP_TOKEN;

const CreateBlog = () => {
    const formik = useFormik({
        initialValues: {
            image: null,
            author: "",
            title: "",
            description: "",
            publish_date: "",
            categories: "",
            email: "",
        },
        onSubmit: (values) => {
            console.log(values);
        },
        validate: (values) => {
            const errors = {};
            if (values.author) {
                errors.author = [];
                if (!values.author || values.author.length < 4) {
                    errors.author[0] = "მინიმუმ 4 სიმბოლო";
                }
                if (values.author.split(/\s+/).filter(Boolean).length < 2) {
                    errors.author[1] = "მინიმუმ ორი სიტყვა";
                }
                if (!/^[\u10D0-\u10F0\s]+$/.test(values.author)) {
                    errors.author[2] = "მხოლოდ ქართული სიმბოლოები";
                }
            }
            if (values.title && values.title.length < 2) {
                errors.title = "მინიმუმ 2 სიმბოლო";
            }
            if (values.description && values.description.length < 2) {
                errors.description = "მინიმუმ 2 სიმბოლო";
            }
            if (values.publish_date) {
                errors.publish_date = "თარიღი აუცილებელია";
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
    const [image, setImage] = useState(null);
    const hasFilledValues = _.some(formik.values, (value) => !_.isEmpty(value));

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

    function saveImageToSessionStorage(file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageBlob = event.target.result;
            sessionStorage.setItem("blogImage", imageBlob);
        };
        reader.readAsDataURL(file);
    }

    useEffect(() => {
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
        }
        const dataUrl = sessionStorage.getItem("blogImage");
        const blob = dataUrlToBlob(dataUrl);
        const file1 = new File([blob], "blogImage", { type: "image/png" });
        setImage(file1);
        console.log("image", file1);
    }, []);

    useEffect(() => {
        formik.values.image = image;
    }, [image]);

    const saveDataToStorage = (data) => {
        try {
            if (data.image) {
                saveImageToSessionStorage(data.image);
            }
            // sessionStorage.setItem("blogImage", JSON.stringify(data.image) ? data.image : null);
            const formDataString = JSON.stringify(data);
            sessionStorage.setItem("blogFormData", formDataString);
        } catch (error) {
            console.log("Error saving FormData to sessionStorage:", error);
        }
    };

    useEffect(() => {
        if (hasFilledValues) {
            console.log("saveDataToStorage");
            saveDataToStorage(formik.values);
        }
    }, [formik.values, selectedCategories]);

    useEffect(() => {
        // const storedImage = JSON.parse(sessionStorage.getItem("blogImage"));
        // const storedImage = sessionStorage.getItem("blogImage");
        // savedFormData.image = storedImage;

        const savedFormData = JSON.parse(sessionStorage.getItem("blogFormData"));
        console.log("savedFormData", savedFormData);

        formik.values = savedFormData;
        // formik.setValues(savedFormData);

        if (selectedCategories.length === 0) {
            if (savedFormData) {
                setSelectedCategories(savedFormData.categories);
            }
        }
    }, []);

    const handleCategorySelection = (categoryId) => {
        console.log("handleCategorySelection");
        if (!selectedCategories.includes(categoryId)) {
            const updatedCategories = [...selectedCategories, categoryId];
            setSelectedCategories(updatedCategories);
            console.log(updatedCategories);
            formik.values.categories = updatedCategories;
        }
    };

    const handleChipRemoval = (categoryId) => {
        const updatedCategories = selectedCategories.filter((catId) => catId !== categoryId);
        setSelectedCategories(updatedCategories);
        console.log(updatedCategories);
        formik.values.categories = updatedCategories;
    };

    const handleDrop = (acceptedFiles) => {
        formik.setValues({
            ...formik.values,
            image: acceptedFiles[0],
        });
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
        }
    };

    console.log(formik.values);
    console.log(selectedCategories);

    return (
        <div className="bg-backGround h-fit pb-40">
            <div className="h-[80px] bg-white  ">
                <img src={LOGO} alt="LOGO" className="mx-auto py-[28px]" />
            </div>
            <div className="flex flex-row h-fit pt-10">
                <div className="w-[35%]  pl-[76px]">
                    <img src={Arrow} alt="Arrow" className="h-[44px] w-[44px] " />
                </div>
                <div className="w-[600px] text-left  ">
                    <h1 className="w-fit  font-bold text-[32px]">ბლოგის დამატება</h1>
                </div>
            </div>
            <div className="flex w-[600px] h-[848px] ml-[35%] mt-10">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    className=" w-full "
                >
                    <div className="flex flex-col gap-6 h-[768px] justify-start">
                        <section>
                            <p className="font-medium text-sm w-[fit] mb-2">ატვირთეთ ფოტო</p>
                            <div
                                // className="box w-[100%] h-[180px] m-[-1px] py-12 flex flex-col justify-between items-center
                                //          bg-indigoLight border-dashed border-[1px] rounded-2xl border-[#85858D]  cursor-pointer "
                                {...getRootProps({
                                    className:
                                        "dropzone box w-[100%] h-[180px] m-[-1px] py-12 flex flex-col justify-between items-center bg-indigoLight border-dashed border-[1px] rounded-2xl border-[#85858D]  cursor-pointer",
                                })}
                            >
                                <input {...getInputProps()} />
                                <img src={folderAdd} alt="folderAdd" className="h-10 w-10"></img>
                                <div className="flex felx-row gap-1">
                                    <h3 className="text-sm font-normal">ჩააგდეთ ფაილი აქ ან </h3>
                                    <h3 className="text-sm font-medium underline">აირჩიეთ ფაილი</h3>
                                </div>
                            </div>
                        </section>
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
                                    // validate={validateAuthor}
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
                                    // validate={validateTitle}
                                    class={
                                        formik.errors.title
                                            ? "inputFieldError"
                                            : formik.values.title
                                            ? "inputFieldSuccess"
                                            : "inputField"
                                    }
                                />
                                <p
                                    className="font-normal text-greyText text-xs"
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
                                // as="textarea"
                                type="text"
                                name="description"
                                placeholder="შეიყვანეთ აღწერა"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                                // validate={validateDescription}
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
                                className="font-normal text-greyText text-xs"
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
                        <div className=" flex flex-row justify-between h-[72px]">
                            <div className="flex flex-col justify-start h-full">
                                <p class="inputLabel">გამოქვეყნების თარიღი *</p>
                                <input
                                    type="date"
                                    name="publish_date"
                                    placeholder="შეიყვანეთ თარიღი"
                                    className="px-[14px] w-[288px] h-[44px] text-sm text-greyText font-normal 
                                            border rounded-xl focus:outline-none focus:border-indigo-500"
                                    style={{ backgroundColor: "rgb(252 252 253)" }}
                                    // validate={validateDate}
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
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-start h-[fit]">
                            <p class="inputLabel">გამოქვეყნების თარიღი *</p>
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
                                // validate={validateEmail}
                            />
                            <p
                                className="font-normal text-greyText text-xs"
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
                    </div>
                    <div className="w-full flex justify-end mt-10">
                        <button
                            type="submit"
                            onClick={() => {
                                console.log(formik.values);
                            }}
                            className="w-[288px] h-10 rounded-lg text-white bg-indigo"
                        >
                            Create Blog
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;
