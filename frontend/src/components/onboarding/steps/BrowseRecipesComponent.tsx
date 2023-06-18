import { StepsComponent } from "./StepsComponent";
import { Button, Card, Divider, Progress, Tabs } from "react-daisyui";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  onboardingImageState,
  onboardingStepState,
} from "../../../services/atoms";
import { useState, useEffect } from "react";
import IngredientsComponent from "../../IngredientsComponent";

function BrowseRecipesComponent() {
  const [onboardingStep, setOnboardingStep] =
    useRecoilState(onboardingStepState);

  return (
    <div className="flex flex-col items-center justify-center pt-5 gap-5">
      <div className="rounded-lg w-96 lg:w-128 p-2">
        <StepsComponent currentStep={onboardingStep} />
      </div>

      <Button
        color="primary"
        className="w-80 lg:w-96"
        onClick={() => {
          setOnboardingStep(0);
          window.location.href = "/";
        }}
      >
        Done
      </Button>
    </div>
  );
}

export default BrowseRecipesComponent;
