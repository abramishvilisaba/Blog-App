import React, { useState, useEffect } from "react";
import axios from "axios";
import Arrow from "../images/Arrow.png";
import LOGO from "../images/LOGO.png";
import folderAdd from "../images/folderAdd.png";
import { getAllBlogs, getCategories } from "../api/blogAPI";
import CategoryDropdown from "../components/CategoryDropdown";
import "./createBlog.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";

const CreateBlog = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: null,
        author: "",
        date: "",
        categories: "",
        email: "",
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

    const handleCategorySelection = (categoryId) => {
        if (!selectedCategories.includes(categoryId)) {
            const updatedCategories = [...selectedCategories, categoryId];
            setSelectedCategories(updatedCategories);
            setFormData((prevData) => ({
                ...prevData,
                ["categories"]: updatedCategories,
            }));
        }
    };

    const handleChipRemoval = (categoryId) => {
        const updatedCategories = selectedCategories.filter((catId) => catId !== categoryId);
        setSelectedCategories(updatedCategories);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            image: file,
        }));
    };

    const handleDrop = (acceptedFiles) => {
        setFormData((prevData) => ({
            ...prevData,
            image: acceptedFiles[0],
        }));
    };

    useEffect(() => {
        if (acceptedFiles) {
            handleDrop(acceptedFiles);
        }
    }, [acceptedFiles]);

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // const formDataToSend = new FormData();
        // Object.entries(formData).forEach(([key, value]) => {
        //     formDataToSend.append(key, value);
        // });
        // try {
        //     const token = process.env.REACT_APP_TOKEN;
        //     const response = await axios.post(
        //         "https://api.blog.redberryinternship.ge/api/blogs",
        //         formDataToSend,
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //                 "Content-Type": "multipart/form-data",
        //             },
        //         }
        //     );
        //     console.log("Blog created:", response.data);
        // } catch (error) {
        //     console.error("Error creating blog:", error);
        // }
    };

    function validateAuthor(value, validateIfEmpty = false) {
        let error = [];
        if (value || validateIfEmpty) {
            if (!value || value.length < 4) {
                error[0] = "მინიმუმ 4 სიმბოლო";
            }
            if (!value || value.split(/\s+/).filter(Boolean).length < 2) {
                error[1] = "მინიმუმ ორი სიტყვა";
            }
            if (!value || !/^[\u10D0-\u10F0\s]+$/.test(value)) {
                error[2] = "მხოლოდ ქართული სიმბოლოები";
            }
        }
        setFormData((prevData) => ({
            ...prevData,
            ["author"]: value,
        }));
        if (error) {
            // console.log(error);
        }
        return error;
    }

    function validateTitle(value, validateIfEmpty = false) {
        let error;

        if (value || validateIfEmpty) {
            if (!value || value.length < 2) {
                error = "მინიმუმ 4 სიმბოლო";
            }
            if (error) {
                // console.log(error);
            }
            setFormData((prevData) => ({
                ...prevData,
                ["title"]: value,
            }));
        }
        return error;
    }
    function validateDescription(value, validateIfEmpty = false) {
        let error;

        if (value || validateIfEmpty) {
            if (!value || value.length < 2) {
                error = "მინიმუმ 4 სიმბოლო";
            }
            if (error) {
                // console.log(error);
            }
            setFormData((prevData) => ({
                ...prevData,
                ["description"]: value,
            }));
        }
        return error;
    }

    function validateDate(value) {
        let error;
        if (!value) {
            error = "თარიღი აუცილებელია";
        }
        setFormData((prevData) => ({
            ...prevData,
            ["date"]: value,
        }));
        return error;
    }

    function validateEmail(value, validateIfEmpty = false) {
        let error;
        if (!value && validateIfEmpty) {
            error = "თარიღი აუცილებელია";
        }
        if (value && !value.endsWith("@redberry.ge")) {
            error = "მეილი უნდა მთავრდებოდეს @redberry.ge-ით";
        }
        setFormData((prevData) => ({
            ...prevData,
            ["email"]: value,
        }));
        return error;
    }

    return (
        <div className="bg-backGround h-fit pb-16">
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
                <Formik
                    initialValues={{
                        author: "",
                        title: "",
                        description: "",
                        date: "",
                        email: "",
                    }}
                    // onSubmit={(values, errors, actions) => {
                    //     console.log("submit");
                    // actions.setSubmitting(false);
                    // }}
                >
                    {({ values, errors, touched, isValidating, handleBlur }) => (
                        <Form
                            // onSubmit={(e) => {
                            //     e.preventDefault();
                            //     console.log("submit");
                            //     console.log(values);
                            //     if (errors) {
                            //         console.log(errors);
                            //     }
                            //     console.log(errors);
                            // }}
                            className=" w-full "
                        >
                            <div className="flex flex-col gap-6 h-[768px] justify-start">
                                <section>
                                    <p className="font-medium text-sm w-[fit] mb-2">
                                        ატვირთეთ ფოტო
                                    </p>
                                    <div
                                        // className="box w-[100%] h-[180px] m-[-1px] py-12 flex flex-col justify-between items-center
                                        //          bg-indigoLight border-dashed border-[1px] rounded-2xl border-[#85858D]  cursor-pointer "
                                        {...getRootProps({
                                            className:
                                                "dropzone box w-[100%] h-[180px] m-[-1px] py-12 flex flex-col justify-between items-center bg-indigoLight border-dashed border-[1px] rounded-2xl border-[#85858D]  cursor-pointer",
                                        })}
                                    >
                                        <input {...getInputProps()} />
                                        <img
                                            src={folderAdd}
                                            alt="folderAdd"
                                            className="h-10 w-10"
                                        ></img>
                                        <div className="flex felx-row gap-1">
                                            <h3 className="text-sm font-normal">
                                                ჩააგდეთ ფაილი აქ ან{" "}
                                            </h3>
                                            <h3 className="text-sm font-medium underline">
                                                აირჩიეთ ფაილი
                                            </h3>
                                        </div>
                                    </div>
                                </section>
                                <div className=" flex flex-row justify-between h-[140px]">
                                    <div className="flex flex-col justify-start h-[140px] ">
                                        <p class="inputLabel">ავტორი *</p>
                                        <Field
                                            type="text"
                                            name="author"
                                            placeholder="შეიყვანეთ ავტორი"
                                            class={
                                                errors.author &&
                                                (errors.author[0] ||
                                                    errors.author[1] ||
                                                    errors.author[2])
                                                    ? "inputFieldError"
                                                    : values.author
                                                    ? "inputFieldSuccess"
                                                    : "inputField"
                                            }
                                            validate={validateAuthor}
                                            // onChange={(e) => handleInputChange(e)}
                                        />
                                        <ul className="list-disc pl-[18px] flex flex-col gap-1">
                                            <li
                                                class={
                                                    errors.author && errors.author[0]
                                                        ? "errorMessage"
                                                        : values.author
                                                        ? "successMessage"
                                                        : "defaultMessage"
                                                }
                                            >
                                                მინიმუმ 4 სიმბოლო
                                            </li>
                                            <li
                                                class={
                                                    errors.author && errors.author[1]
                                                        ? "errorMessage"
                                                        : values.author
                                                        ? "successMessage"
                                                        : "defaultMessage"
                                                }
                                            >
                                                მინიმუმ ორი სიტყვა
                                            </li>
                                            <li
                                                class={
                                                    errors.author && errors.author[2]
                                                        ? "errorMessage"
                                                        : values.author
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
                                        <Field
                                            type="text"
                                            name="title"
                                            placeholder="შეიყვანეთ სათაური"
                                            validate={validateTitle}
                                            class={
                                                errors.title
                                                    ? "inputFieldError"
                                                    : values.title
                                                    ? "inputFieldSuccess"
                                                    : "inputField"
                                            }
                                        />
                                        <p
                                            className="font-normal text-greyText text-xs"
                                            class={
                                                errors.title
                                                    ? "errorMessage"
                                                    : values.title
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
                                    <Field
                                        as="textarea"
                                        type="text"
                                        name="description"
                                        placeholder="შეიყვანეთ აღწერა"
                                        validate={validateDescription}
                                        class={
                                            errors.title
                                                ? "inputFieldError"
                                                : values.title
                                                ? "inputFieldSuccess"
                                                : "inputField"
                                        }
                                        style={{
                                            width: "100%",
                                            height: "124px",
                                            resize: "none",
                                            padding: "12px 16px",
                                        }}
                                    />
                                    <p
                                        className="font-normal text-greyText text-xs"
                                        class={
                                            errors.title
                                                ? "errorMessage"
                                                : values.title
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
                                        <Field
                                            type="date"
                                            name="date"
                                            placeholder="შეიყვანეთ თარიღი"
                                            className="px-[14px] w-[288px] h-[44px] text-sm text-greyText font-normal 
                                            border rounded-xl focus:outline-none focus:border-indigo-500"
                                            style={{ backgroundColor: "rgb(252 252 253)" }}
                                            validate={validateDate}
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
                                    <Field
                                        type="text"
                                        name="email"
                                        placeholder="შეიყვანეთ მეილი"
                                        class={
                                            errors.email
                                                ? "inputFieldError"
                                                : values.email
                                                ? "inputFieldSuccess"
                                                : "inputField"
                                        }
                                        validate={validateEmail}
                                    />
                                    <p
                                        className="font-normal text-greyText text-xs"
                                        class={
                                            errors.email
                                                ? "errorMessage"
                                                : values.email
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
                                    // type="submit"
                                    onClick={() => {
                                        console.log(values);
                                        console.log(formData);
                                    }}
                                    className="w-[288px] h-10 rounded-lg text-white bg-indigo"
                                >
                                    Create Blog
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CreateBlog;
