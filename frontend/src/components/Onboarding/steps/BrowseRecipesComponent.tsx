import { StepsComponent } from "./StepsComponent";
import { Button } from "react-daisyui";
import { useRecoilState } from "recoil";
import { onboardingStepState } from "../../../services/atoms";
import { useState, useEffect } from "react";
import IngredientsComponent from "../../IngredientsComponent";
import RecipesComponent from "../../RecipesComponent";

function BrowseRecipesComponent() {
  const [onboardingStep, setOnboardingStep] =
    useRecoilState(onboardingStepState);
  const [recipies, setRecipies] = useState<any[]>([]);

  useEffect(() => {
    let timer1 = setTimeout(() => {
      fetch(
        `https://${
          window.location.hostname.split(":")[0]
        }:5000/recipes?increase=10`
      ).then((response) => {
        response.json().then((json) => {
          setRecipies(json);
        });
      });
    }, 500);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

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

      <div className="w-full">
        {recipies.map((recipe) => (
          <RecipesComponent title={recipe.title} rowMode />
        ))}
      </div>
    </div>
  );
}

export default BrowseRecipesComponent;
