import { StepsComponent } from "./StepsComponent";
import { Button, Card, Divider, Progress, Tabs } from "react-daisyui";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  onboardingImageState,
  onboardingStepState,
} from "../../../services/atoms";
import { useState, useEffect } from "react";
import IngredientsComponent from "../../IngredientsComponent";

function ReviewIngredientsComponent() {
  const [onboardingStep, setOnboardingStep] =
    useRecoilState(onboardingStepState);
  const onboardingImage = useRecoilValue(onboardingImageState);
  const [imageIsProcessing, setImageIsProcessing] = useState(true);
  const [tabState, setTabState] = useState(0);

  const [tempFood, setTempFood] = useState<Array<string>>([]);

  useEffect(() => {
    let timer1 = setTimeout(() => {
      setImageIsProcessing(false);
      setTempFood([
        "breads",
        "apples",
        "peaches",
        "bananas",
        "carrots",
        "potatoes",
        "onions",
        "peppers",
        "pork",
        "beef",
        "chicken",
        "eggs",
      ]);
    }, 5 * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, [setTempFood, setImageIsProcessing]);

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

      <Divider />

      {imageIsProcessing ? (
        <p>Image is processing!</p>
      ) : (
        <>
          <div className="flex flex-row items-center justify-center gap-5 flex-wrap">
            {tempFood.map((food) => (
              <IngredientsComponent name={food} />
            ))}
          </div>
          <Button
            className="w-80 lg:w-96"
            color="primary"
            onClick={() => setOnboardingStep(onboardingStep + 1)}
          >
            Continue
          </Button>
        </>
      )}
    </div>
  );
}

export default ReviewIngredientsComponent;
