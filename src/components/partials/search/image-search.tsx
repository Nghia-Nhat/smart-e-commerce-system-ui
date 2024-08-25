import { SearchIcon } from "@/components/icons/common";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useCallback, useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import WebcamComponent from "../webcam/webcam";
import { Camera, X } from "lucide-react";
import useProductStore from "@/store/product.store";
import { useRouter } from "next/navigation";
import { Rnd } from "react-rnd";
import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BASE_API_URL = "http://localhost:8000/ai-api";

interface DetectedObject {
  class: string;
  coordinates: [number, number, number, number];
}

function ImageSearch({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isWebcam, setIsWebcam] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [objects, setObjects] = useState<DetectedObject[]>([]);
  const { setImageFile } = useProductStore();
  const { push } = useRouter();
  const imageRef = useRef<HTMLImageElement>(null);
  const [selectedObjects, setSelectedObjects] = useState<DetectedObject[]>([]);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      setImageDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      });
    }
  }, [preview]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
      setFile(file);
      detectObjects(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    maxFiles: 1,
  });

  const removeImage = () => {
    setPreview(null);
    setFile(null);
    setObjects([]);
  };

  const detectObjects = async (file: File) => {
    if (isWebcam) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const url = BASE_API_URL + "/detect_objects";
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        setObjects(data.objects);
      } catch (error) {
        console.error("Error detecting objects:", error);
      }
    }
  };

  const handleContextMenu = (e: React.MouseEvent, obj: DetectedObject) => {
    e.preventDefault();
    setSelectedObjects((prev) =>
      prev.includes(obj) ? prev.filter((o) => o !== obj) : [...prev, obj],
    );
  };

  const createFullImageObject = (): DetectedObject => {
    if (!imageDimensions)
      return { class: "full_image", coordinates: [0, 0, 0, 0] };
    return {
      class: "full_image",
      coordinates: [0, 0, imageDimensions.width, imageDimensions.height],
    };
  };

  const cropImage = (obj: DetectedObject): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = imageRef.current;

      if (img && ctx) {
        const [x, y, width, height] = obj.coordinates;

        canvas.width = width - x;
        canvas.height = height - y;

        ctx.drawImage(
          img,
          x,
          y,
          width - x,
          height - y,
          0,
          0,
          width - x,
          height - y,
        );

        canvas.toBlob((blob) => {
          if (blob) {
            const croppedFile = new File([blob], "cropped_image.jpg", {
              type: "image/jpeg",
            });
            resolve(croppedFile);
          }
        }, "image/jpeg");
      }
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (file) {
      let objectsToProcess: DetectedObject[];
      if (selectedObjects.length > 0) {
        objectsToProcess = selectedObjects;
      } else if (objects.length > 0) {
        objectsToProcess = objects;
      } else {
        objectsToProcess = [createFullImageObject()];
      }

      const croppedImages = await Promise.all(objectsToProcess.map(cropImage));

      let finalImage: File;
      if (croppedImages.length === 1) {
        finalImage = croppedImages[0];
        setImageFile(finalImage);
        setOpen(false);
        push("/search-result");
      } else {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = imageDimensions?.width || 0;
          canvas.height = imageDimensions?.height || 0;

          const loadPromises = croppedImages.map((img, index) => {
            return new Promise<void>((resolve) => {
              const imgElement = document.createElement("img");
              imgElement.onload = () => {
                const [x, y] = objectsToProcess[index].coordinates;
                ctx.drawImage(imgElement, x, y);
                resolve();
              };
              imgElement.src = URL.createObjectURL(img);
            });
          });

          await Promise.all(loadPromises);

          canvas.toBlob((blob) => {
            if (blob) {
              finalImage = new File([blob], "combined_image.jpg", {
                type: "image/jpeg",
              });
              setImageFile(finalImage);
              setOpen(false);
              push("/search-result");
            }
          }, "image/jpeg");
        }
      }
    } else {
      console.log("No file selected");
    }
  };

  return (
    <form className="grid items-start gap-4" onSubmit={handleSubmit}>
      <div className="relative grid min-h-[250px] h-fit border-4 border-dashed rounded-lg">
        {!isWebcam && !preview && (
          <button
            type="button"
            className="absolute top-0 left-0 m-2 z-10"
            onClick={() => setIsWebcam(true)}
          >
            <Camera />
          </button>
        )}
        <div className="mt-2">
          {isWebcam && (
            <>
              <WebcamComponent
                setFile={setFile}
                setPreview={setPreview}
                setIsWebcam={setIsWebcam}
                onCapture={detectObjects}
              />

              <div className="mt-2 absolute top-0 right-0 flex gap-2 items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-[300px] text-justify">
                      Wait about 3 seconds for the system to detect the object, then right-click to choose the one you want to search.<br></br>
                      You can drag and resize the box if the system does not recognize the expected object.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button
                  type="button"
                  variant={"ghost"}
                  onClick={() => setIsWebcam(false)}
                  size={"icon"}
                >
                  <X />
                </Button>
              </div>
            </>
          )}
        </div>
        {preview && !isWebcam && (
          <div className="relative flex justify-center">
            <Button
              type="button"
              variant={"ghost"}
              onClick={removeImage}
              className="mt-2 absolute top-0 right-0"
              size={"icon"}
            >
              <X />
            </Button>
            <div style={{ position: "relative" }}>
              <Image
                ref={imageRef}
                src={preview}
                alt="Preview"
                width={720}
                height={1280}
                className="object-contain w-full"
                onLoad={() => {
                  if (imageRef.current) {
                    setImageDimensions({
                      width: imageRef.current.naturalWidth,
                      height: imageRef.current.naturalHeight,
                    });
                  }
                }}
              />
              {objects.map((obj, index) => (
                <Rnd
                  key={index}
                  default={{
                    x: obj.coordinates[0],
                    y: obj.coordinates[1],
                    width: obj.coordinates[2] - obj.coordinates[0],
                    height: obj.coordinates[3] - obj.coordinates[1],
                  }}
                  bounds="parent"
                  onDragStop={(e, d) => {
                    const newObjects = [...objects];
                    newObjects[index].coordinates[0] = d.x;
                    newObjects[index].coordinates[1] = d.y;
                    newObjects[index].coordinates[2] =
                      d.x + (obj.coordinates[2] - obj.coordinates[0]);
                    newObjects[index].coordinates[3] =
                      d.y + (obj.coordinates[3] - obj.coordinates[1]);
                    setObjects(newObjects);
                  }}
                  onResize={(e, direction, ref, delta, position) => {
                    const newObjects = [...objects];
                    newObjects[index].coordinates = [
                      position.x,
                      position.y,
                      position.x + ref.offsetWidth,
                      position.y + ref.offsetHeight,
                    ];
                    setObjects(newObjects);
                  }}
                  style={{
                    border: "2px solid red",
                    backgroundColor: selectedObjects.includes(obj)
                      ? "rgba(255, 0, 0, 0.4)"
                      : "rgba(255, 0, 0, 0.2)",
                  }}
                  onContextMenu={(e: React.MouseEvent<Element, MouseEvent>) =>
                    handleContextMenu(e, obj)
                  }
                ></Rnd>
              ))}
            </div>
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
            !preview && !isWebcam && <p>Click or Drag to upload a file</p>
          )}
        </div>
      </div>
      <Button type="submit">
        <SearchIcon className="mr-2 h-4 w-4" /> Search
      </Button>
    </form>
  );
}

export default ImageSearch;
