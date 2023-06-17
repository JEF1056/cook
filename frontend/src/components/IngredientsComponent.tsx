import { Card, Button } from "react-daisyui";

interface IngredientsComponentProps {
  name: string;
}

function IngredientsComponent(props: IngredientsComponentProps) {
  return (
    <Card className="w-full lg:w-96 mx-5 lg:mx-0">
      <Card.Image
        src="/pot_ate_toes.png"
        alt={props.name + " in the freezer"}
      />
      <Card.Body className="flex flex-row ">
        <Card.Title tag="h2">{props.name}</Card.Title>
        <Card.Actions className="justify-end">
          <Button color="primary">Buy Now</Button>
        </Card.Actions>
      </Card.Body>
    </Card>
  );
}

export default IngredientsComponent;
