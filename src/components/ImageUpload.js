import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import close from "../images/close.svg";
import gallery from "../images/gallery.svg";
import folderAdd from "../images/folderAdd.png";

const ImageUpload = ({ setImage, image, values, handleImageClose, handleDrop }) => {
    const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/jpeg": [],
            "image/png": [],
        },
    });

    console.log(values);

    useEffect(() => {
        if (acceptedFiles) {
            handleDrop(acceptedFiles);
        }
    }, [acceptedFiles]);

    return (
        <div>
            <p className="font-medium text-sm w-[fit] mb-2">ატვირთეთ ფოტო</p>

            {!values.image ? (
                <section>
                    <div
                        {...getRootProps({
                            className:
                                "dropzone box w-[100%] h-[180px] m-[-1px] py-12 flex flex-col justify-between items-center bg-indigoLight border-dashed border-[1px] rounded-2xl border-[#85858D]  cursor-pointer",
                        })}
                    >
                        <input {...getInputProps()} />
                        <img src={folderAdd} alt="folderAdd" className="h-10 w-10"></img>
                        <div className="flex felx-row gap-1">
                            <h3 className="text-sm font-normal">ჩააგდეთ ფაილი აქ ან</h3>
                            <h3 className="text-sm font-medium underline">აირჩიეთ ფაილი</h3>
                        </div>
                    </div>
                </section>
            ) : (
                <div
                    className="w-[600px] h-[44px] mb-2 py-[12px] px-[18px] text-black text-sm font-normal flex flex-row justify-between
                                     rounded-xl  bg-altGrayFill "
                >
                    <div className="flex flex-row gap-2">
                        <img src={gallery} alt="gallery" className="h-6 w-6 mt-[-2px]"></img>
                        {values.image.name}
                    </div>

                    <img
                        src={close}
                        alt="close"
                        className="h-6 w-6 hover:cursor-pointer"
                        onClick={handleImageClose}
                    ></img>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
