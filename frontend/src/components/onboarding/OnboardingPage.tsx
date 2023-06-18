import { useRecoilState, useRecoilValue } from "recoil";
import {
  onboardingImageState,
  onboardingStepState,
} from "../../services/atoms";
import ScanFridgeComponent from "./steps/ScanFridgeComponent";
import ReviewIngredientsComponent from "./steps/ReviewIngredientsComponent";
import BrowseRecipesComponent from "./steps/BrowseRecipesComponent";

function OnboardingPage() {
  const [onboardingStep, setOnboardingStep] =
    useRecoilState(onboardingStepState);
  const onboardingImage = useRecoilValue(onboardingImageState);

  if (onboardingImage === undefined) {
    setOnboardingStep(0);
  }

  const getStepContent = () => {
    switch (onboardingStep) {
      case 0:
        return <ScanFridgeComponent />;
      case 1:
        return <ReviewIngredientsComponent />;
      case 2:
        return <BrowseRecipesComponent />;
      default:
        setOnboardingStep(0);
        return <ScanFridgeComponent />;
    }
  };

  return getStepContent();
}

export default OnboardingPage;
