import { Steps } from "react-daisyui";

interface StepsComponentProps {
  currentStep: number;
}

export function StepsComponent(props: StepsComponentProps) {
  return (
    <Steps className="w-full">
      <Steps.Step color={props.currentStep >= 0 ? "primary" : undefined}>
        Scan Fridge
      </Steps.Step>
      <Steps.Step color={props.currentStep >= 1 ? "primary" : undefined}>
        Review Ingredients
      </Steps.Step>
      <Steps.Step color={props.currentStep >= 2 ? "primary" : undefined}>
        Browse Recipies
      </Steps.Step>
    </Steps>
  );
}
