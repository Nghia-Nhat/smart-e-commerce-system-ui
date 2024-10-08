import { Button } from "@/components/ui/button";
import { base64ToFile } from "@/lib/image.util";
import { Camera } from "lucide-react";
import React, { useRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

function WebcamComponent({
  setFile,
  setPreview,
  setIsWebcam,
  onCapture,
}: {
  setFile: any;
  setPreview: any;
  setIsWebcam: any;
  onCapture: (file: File) => void;
}) {
  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const file = base64ToFile(imageSrc, "screenshot.jpg");
      setPreview(imageSrc);
      setFile(file);
      setIsWebcam(false);
      onCapture(file); // Call the onCapture function with the file
    } else {
      console.log("Image src not found");
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <Button
        onClick={capture}
        className="w-full flex gap-2 items-center"
        variant={"outline"}
      >
        <Camera />
        Capture photo
      </Button>
    </div>
  );
}

export default WebcamComponent;
