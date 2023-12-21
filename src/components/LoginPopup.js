// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { apiLogin } from "../api/blogAPI";

// const LoginPopup = ({ showPopup, togglePopup }) => {
//     const login = async (email) => {
//         try {
//             const response = await apiLogin(email);
//             console.log(response.status);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <div
//             className={`fixed flex flex-col w-1/4 h-[272px] justify-between top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-2xl shadow-lg ${
//                 showPopup ? "" : "hidden"
//             }`}
//         >
//             <button
//                 onClick={togglePopup}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//                 <FontAwesomeIcon icon={faTimes} />
//             </button>

//             <h2 className="text-center font-bold text-2xl pt-4">შესვლა</h2>

//             <Formik
//                 initialValues={{
//                     email: "",
//                 }}
//                 validate={(values) => {
//                     const errors = {};
//                     if (!values.email) {
//                         errors.email = "Required";
//                     } else if (!values.email.endsWith("@redberry.ge")) {
//                         errors.email = "Email should end with @redberry.ge";
//                     }
//                     return errors;
//                 }}
//                 onSubmit={async (values, { setSubmitting }) => {
//                     try {
//                         await login(values.email);
//                     } catch (error) {
//                         console.error(error);
//                     } finally {
//                         setSubmitting(false);
//                         togglePopup();
//                     }
//                 }}
//             >
//                 {({ isSubmitting }) => (
//                     <Form>
//                         <div className="h-[192px] pt-8 flex flex-col justify-between">
//                             <div>
//                                 <p className="text-[18px] font-medium mb-2 w-fit">ელ-ფოსტა</p>
//                                 <Field
//                                     type="email"
//                                     name="email"
//                                     placeholder="example@redberry.ge"
//                                     className="border-2  border-primary outline-none w-full rounded-xl h-[44px] px-2 py-1"
//                                 />
//                                 <ErrorMessage
//                                     name="email"
//                                     component="div"
//                                     className="text-red-500 h-4 text-sm mt-1"
//                                 />
//                             </div>
//                             <button
//                                 type="submit"
//                                 disabled={isSubmitting}
//                                 className="bg-primary hover:bg-[#2522ea] text-white font-medium w-full px-4 py-2 mb-2 rounded-xl"
//                             >
//                                 {isSubmitting ? "იტვირთება..." : "შესვლა"}
//                             </button>
//                         </div>
//                     </Form>
//                 )}
//             </Formik>
//         </div>
//     );
// };

// export default LoginPopup;
