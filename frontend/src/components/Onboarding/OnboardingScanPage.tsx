import { StepsComponent } from "./StepsComponent";
import { useRef, useState, useCallback } from "react";
import { useWindowSize } from "../../services/hooks";
import Webcam from "react-webcam";

function OnboardingScanPage() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const size = useWindowSize();

  const videoConstraints: MediaTrackConstraints = {
    aspectRatio: size.ratio,
    facingMode: "environment",
  };

  //   const capture = useCallback(() => {
  //     if (webcamRef.current != null) {
  //       const imageSrc = webcamRef.current.getScreenshot();
  //       setImgSrc(imageSrc);
  //     }
  //   }, [webcamRef, setImgSrc]);

  console.log(size);

  return (
    <div className="flex items-center justify-center">
      <div className="absolute top-5 bg-neutral bg-opacity-80 rounded-lg w-96 lg:w-128 p-2">
        <StepsComponent currentStep={0} />
      </div>

      <Webcam
        audio={false}
        ref={webcamRef}
        width={size.width}
        height={size.height}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />

      <div className="flex flex-row absolute bottom-10 justify-center w-full">
        <button className="btn btn-primary">Scan</button>
      </div>
    </div>
  );
}

export default OnboardingScanPage;
