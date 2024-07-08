import { SearchIcon } from '@/components/icons/common';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import WebcamComponent from '../webcam/webcam';
import { Camera, X } from 'lucide-react';
import useProductStore from '@/store/product.store';
import { useRouter } from 'next/navigation';

function ImageSearch({ setOpen }: { setOpen: any }) {
    const [preview, setPreview] = useState<string | null>(null);
    const [isWebcam, setIsWebcam] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const { setImageFile } = useProductStore();
    const { push } = useRouter();

    //Detect drag image
    const onDrop = useCallback((acceptedFiles: any) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setPreview(reader.result as string);
        };

        if (file) {
            reader.readAsDataURL(file);
            setFile(file);
        }
    }, []);

    //Setting accepted file
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpg', '.jpeg', '.png'],
        },
        maxFiles: 1,
    });

    const removeImage = () => {
        setPreview(null);
        setFile(null);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (file) {
            // Send image to /search-result
            setImageFile(file);
            // Close modal search
            setOpen(false)
            push('/search-result');
        } else {
            console.log('No file selected');
        }
    };

    return (
        <form className="grid items-start gap-4" onSubmit={handleSubmit}>
            <div className="relative grid min-h-[250px] h-fit border-4 border-dashed rounded-lg">
                {!isWebcam && (
                    <button
                        className="absolute top-0 left-0 m-2"
                        onClick={() => setIsWebcam(true)}
                    >
                        <Camera />
                    </button>
                )}
                <div className="mt-2">
                    {isWebcam && (
                        <WebcamComponent
                            setFile={setFile}
                            setPreview={setPreview}
                            setIsWebcam={setIsWebcam}
                        />
                    )}
                </div>
                {preview && !isWebcam && (
                    <div className="relative flex justify-center">
                        <Button
                            variant={'ghost'}
                            onClick={removeImage}
                            className="mt-2 absolute top-0 right-0"
                            size={'icon'}
                        >
                            <X />
                        </Button>
                        <Image
                            src={preview}
                            alt="Preview"
                            width={250}
                            height={250}
                            className="object-contain"
                        />
                    </div>
                )}
                <div
                    {...getRootProps()}
                    className="flex items-center justify-center w-full"
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        !preview &&
                        !isWebcam && <p>Click or Drag to upload a file</p>
                    )}
                </div>
            </div>
            <Button>
                <SearchIcon className="mr-2 h-4 w-4" /> Search
            </Button>
        </form>
    );
}

export default ImageSearch;
