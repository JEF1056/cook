import { StepsComponent } from "./steps/StepsComponent";
import { Button, Card, Progress, Tabs } from "react-daisyui";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  onboardingImageState,
  onboardingStepState,
} from "../../services/atoms";
import ScanFridgeComponent from "./steps/ScanFridgeComponent";
import ReviewIngredientsComponent from "./steps/ReviewIngredientsComponent";

function OnboardingPage() {
  const [onboardingStep, setOnboardingStep] =
    useRecoilState(onboardingStepState);
  const onboardingImage = useRecoilValue(onboardingImageState);

  if (onboardingImage === undefined) {
    setOnboardingStep(0);
  }

  switch (onboardingStep) {
    case 0:
      return <ScanFridgeComponent />;
    case 1:
      return <ReviewIngredientsComponent />;
    default:
      return <>Yeet</>;
  }
}

export default OnboardingPage;
