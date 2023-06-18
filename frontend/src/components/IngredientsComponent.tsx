import { Card, Button, InputGroup, Input } from "react-daisyui";
import { useState } from "react";

interface IngredientsComponentProps {
  name: string;
}

function IngredientsComponent(props: IngredientsComponentProps) {
  const [quantity, setQuantity] = useState<number>(0);

  return (
    <Card className="w-full lg:w-96 mx-5 lg:mx-0 h-96">
      <Card.Image
        src="/pot_ate_toes.png"
        alt={props.name + " in the freezer"}
      />
      <Card.Body className="flex flex-row justify-between">
        <div className="flex">
          <Card.Title tag="h2">{props.name}</Card.Title>
        </div>
        <div>
          <InputGroup>
            <Button onClick={() => setQuantity(quantity - 1)}>{"<"}</Button>
            <Input
              className="w-14"
              type="string"
              value={quantity}
              onChange={(event) => {
                setQuantity(parseInt(event?.target.value));
              }}
              bordered
            />
            <Button onClick={() => setQuantity(quantity + 1)}>{">"}</Button>
          </InputGroup>
        </div>
      </Card.Body>
    </Card>
  );
}

export default IngredientsComponent;
