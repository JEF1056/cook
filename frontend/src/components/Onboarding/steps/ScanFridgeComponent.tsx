import { StepsComponent } from "./StepsComponent";
import { useRef, useState, useCallback } from "react";
import { useWindowSize } from "../../../services/hooks";
import Webcam from "react-webcam";
import { Button, Tabs } from "react-daisyui";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  onboardingImageState,
  onboardingStepState,
} from "../../../services/atoms";

function ScanFridgeComponent() {
  const webcamRef = useRef<any>(null);
  const setOnboardingImageState = useSetRecoilState(onboardingImageState);
  const [onboardingStep, setOnboardingStep] =
    useRecoilState(onboardingStepState);
  const size = useWindowSize();

  const videoConstraints: MediaTrackConstraints = {
    aspectRatio: size.ratio,
    facingMode: "environment",
  };

  const capture = useCallback(() => {
    if (webcamRef.current != null) {
      const imageSrc = webcamRef.current.getScreenshot();
      setOnboardingImageState(imageSrc);
    }
  }, [webcamRef, setOnboardingImageState]);

  return (
    <div className="flex items-center justify-center">
      <div className="absolute top-5 bg-neutral bg-opacity-70 rounded-lg w-96 lg:w-128 p-2">
        <StepsComponent currentStep={onboardingStep} />
      </div>

      <Webcam
        audio={false}
        ref={webcamRef}
        width={size.width}
        height={size.height}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />

      <div className="flex flex-row absolute bottom-24 justify-center w-full">
        <Button
          onClick={() => {
            capture();
            setOnboardingStep(onboardingStep + 1);
          }}
        >
          Scan
        </Button>
      </div>
    </div>
  );
}

export default ScanFridgeComponent;
