import React, { useState } from "react";
import { useFormik } from "formik";
import "../pages/createBlog.css";
import infoCircle from "../images/infoCircle.svg";

const LoginForm = ({ onSubmit }) => {
    const [error, setError] = useState("");

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validate: (values) => {
            const errors = {};
            if (!values.email) {
                errors.email = "მეილი უნდა მთავრდებოდეს @redberry.ge-ით";
            } else if (!values.email.endsWith("@redberry.ge")) {
                errors.email = "მეილი უნდა მთავრდებოდეს @redberry.ge-ით";
            }
            return errors;
        },
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                await onSubmit(values.email);
                console.log("submit");
            } catch (error) {
                console.log("login Error");
                setFieldError("email", "ელ-ფოსტა არ მოიძებნა");
            } finally {
                setError("ელ-ფოსტა არ მოიძებნა");
                setSubmitting(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="h-full">
            <div className="h-full flex flex-col justify-start">
                <div>
                    <h2 className="text-center font-bold text-2xl pt-6 pb-6">შესვლა</h2>
                    <p className="text-sm font-medium mb-2 w-fit">ელ-ფოსტა</p>
                    <input
                        type="text"
                        name="email"
                        placeholder="example@redberry.ge"
                        style={{ width: "100%" }}
                        className={
                            formik.errors.email && formik.values.email
                                ? "inputFieldError"
                                : !formik.errors.email && formik.values.email
                                ? "inputFieldSuccess"
                                : "inputField"
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    <div className=" h-[20px]">
                        {formik.values.email && (
                            <div className="flex flex-row gap-1">
                                {formik.errors.email && (
                                    <img
                                        src={infoCircle}
                                        alt="infoCircle"
                                        className="h-5 w-5 mt-[-2px]"
                                    />
                                )}
                                <p className="errorMessage">{formik.errors.email}</p>
                            </div>
                        )}
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="bg-indigo hover:bg-[#2522ea] text-white font-medium text-sm w-full px-4 py-2 mt-6 rounded-xl"
                >
                    {formik.isSubmitting ? "იტვირთება..." : "შესვლა"}
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
