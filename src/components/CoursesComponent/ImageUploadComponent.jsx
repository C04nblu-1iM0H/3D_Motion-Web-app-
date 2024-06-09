import { useRef } from "react";
import { Button } from '@nextui-org/react';
import { GrDownload } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";

export default function ImageUploadPreview({ fileInfo, file, setFile, setFileInfo, handleFileChange }) {
    const fileInputRef = useRef(null);
    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleClearfile = () =>{
        setFile(null);
        setFileInfo({
            name: '',
            size: 0,
        });

        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    }

    return (
        <div className="w-full flex items-center">
            <Button
                className='cursor-pointer'
                color="success"
                endContent={ <GrDownload/>}
                onClick={handleClick}
            > Загрузить фото </Button>
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                />

            {file && (
                <div className="w-1/2 flex items-center justify-evenly ml-10">
                    <p className="">Название: {fileInfo.name}</p>
                    <p className="">Размер: {fileInfo.size} MB</p>
                    <Button 
                        isIconOnly 
                        size='sm' 
                        color="danger" 
                        aria-label="del"
                        onClick={handleClearfile}
                    >
                        <RxCross2 className='w-5 h-5'/>
                    </Button>
                </div>
            )}
        </div>
    );
}
