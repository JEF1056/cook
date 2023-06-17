import { StepsComponent } from "./StepsComponent";
import { Button, Card, Progress, Tabs } from "react-daisyui";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  onboardingImageState,
  onboardingStepState,
} from "../../../services/atoms";
import IngredientsComponent from "../../IngredientsComponent";
import { useState, useEffect } from "react";

function ReviewIngredientsComponent() {
  const [onboardingStep, setOnboardingStep] =
    useRecoilState(onboardingStepState);
  const onboardingImage = useRecoilValue(onboardingImageState);
  const [imageIsProcessing, setImageIsProcessing] = useState(true);

  const [tempFood, setTempFood] = useState<Array<string>>([]);

  useEffect(() => {
    let timer1 = setTimeout(() => {
      setImageIsProcessing(false);
      setTempFood(["Bok Choy", "Chicken Breast", "Potato"]);
    }, 5 * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, [setTempFood]);

  return (
    <div className="flex flex-col items-center justify-center pt-5 gap-5">
      <div className="rounded-lg w-96 lg:w-128 p-2">
        <StepsComponent currentStep={onboardingStep} />
      </div>

      <Card className={imageIsProcessing ? "w-1/2" : "w-1/2 h-30"} imageFull>
        {imageIsProcessing && <Card.Image src={onboardingImage!} />}
        <Card.Body className="items-center">
          {imageIsProcessing && (
            <p className="flex gap-2 flex-col items-center w-full lg:w-1/2">
              Processing...
              <Progress color="secondary" className="mt-2" />
            </p>
          )}
          <Card.Actions className="justify-end">
            <Button color="primary" onClick={() => setOnboardingStep(0)}>
              Retake
            </Button>
          </Card.Actions>
        </Card.Body>
      </Card>

      <p>Review Your Ingredients</p>

      <Tabs variant="bordered" size="md">
        <Tabs.Tab value={0}>Food Detected</Tabs.Tab>
        <Tabs.Tab value={1}>Edit</Tabs.Tab>
      </Tabs>

      <div className="flex flex-row items-center justify-center gap-5 flex-wrap">
        {tempFood.map((food) => (
          <IngredientsComponent name={food} />
        ))}
      </div>
    </div>
  );
}

export default ReviewIngredientsComponent;
