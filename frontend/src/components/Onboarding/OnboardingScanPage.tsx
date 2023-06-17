import { StepsComponent } from "./StepsComponent";
import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

function OnboardingScanPage() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const videoConstraints = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  //   const capture = useCallback(() => {
  //     if (webcamRef.current != null) {
  //       const imageSrc = webcamRef.current.getScreenshot();
  //       setImgSrc(imageSrc);
  //     }
  //   }, [webcamRef, setImgSrc]);

  return (
    <div>
      <div className="flex flex-row absolute top-10 justify-center w-full px-2">
        <StepsComponent currentStep={0} />
      </div>

      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
    </div>
  );
}

export default OnboardingScanPage;
