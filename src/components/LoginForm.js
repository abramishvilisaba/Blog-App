import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const LoginForm = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={{
                email: "",
            }}
            validate={(values) => {
                const errors = {};
                if (!values.email) {
                    errors.email = "მეილი უნდა მთავრდებოდეს @redberry.ge-ით";
                } else if (!values.email.endsWith("@redberry.ge")) {
                    errors.email = "მეილი უნდა მთავრდებოდეს @redberry.ge-ით";
                }
                // else {
                //     errors.email = "";
                // }
                return errors;
            }}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
                try {
                    await onSubmit(values.email);
                    setFieldError("email", "ელ-ფოსტა არ მოიძებნა");
                } catch (error) {
                    console.log("login Error");
                    console.log(error);

                    setFieldError("email", "ელ-ფოსტა არ მოიძებნა");
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting, errors }) => (
                <Form className="h-full">
                    <div className="h-full flex flex-col justify-around">
                        <div>
                            <h2 className="text-center font-bold text-2xl pt-4 pb-8">შესვლა</h2>
                            <p className="text-[18px] font-medium mb-2 w-fit">ელ-ფოსტა</p>
                            <Field
                                // type="email"
                                name="email"
                                placeholder="example@redberry.ge"
                                className="border-2   border-indigo outline-none w-full rounded-xl h-[44px] px-2 py-1"
                                style={{
                                    border: `2px solid ${
                                        errors.email ? "rgb(234 25 25 )" : " rgb(81 43 231) "
                                    }`,
                                    background: ` ${
                                        errors.email ? "rgb(250 242 243)" : " rgb(247 247 255) "
                                    }`,
                                }}
                            />
                            <div className="py-2 h-2">
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-error h-4 text-sm"
                                />
                                {console.log(errors)}
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-indigo hover:bg-[#2522ea] text-white font-medium w-full px-4 py-2 mt-4 rounded-xl"
                        >
                            {isSubmitting ? "იტვირთება..." : "შესვლა"}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
