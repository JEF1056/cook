import { Card, Button, InputGroup, Input } from "react-daisyui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

interface IngredientsComponentProps {
  name: string;
}

function IngredientsComponent(props: IngredientsComponentProps) {
  const [quantity, setQuantity] = useState<number>(0);
  const [ingredientImage, setIngredientImage] = useState<string | undefined>(
    undefined
  );

  const prompt = "Super tasty " + props.name.toLowerCase() + " in the freezer";

  useEffect(() => {
    fetch("http://localhost:5000/get_image?prompt=" + prompt)
      .then((response) => {
        response.text().then((text) => {
          console.log(text);
          setIngredientImage(text);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.name]);

  return (
    <Card className="w-full lg:w-96 mx-5 lg:mx-0 h-96 relative">
      <Card.Image
        src={
          ingredientImage !== undefined
            ? "data:image/png;base64," + ingredientImage
            : "/placeholder.png"
        }
        alt={prompt}
        className="z-0"
      />
      <div className="absolute top-2 right-2 z-10">
        <Button>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
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
