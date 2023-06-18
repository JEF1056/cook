import { Card } from "react-daisyui";
import { useEffect, useState } from "react";

interface RecipesComponentProps {
  id?: Number;
  title: String;
  description?: String;
  source?: String;
  rowMode?: boolean;
}

function RecipesComponent(props: RecipesComponentProps) {
  const [recipeImage, setRecipeImage] = useState<string | undefined>(undefined);

  const prompt =
    "Delicous, appetizing " + props.title.toLowerCase() + " ready to be served";

  useEffect(() => {
    let timer1 = setTimeout(() => {
      fetch(
        `https://${
          window.location.hostname.split(":")[0]
        }:5000/get_image?prompt=` + prompt
      )
        .then((response) => {
          response.text().then((text) => {
            setRecipeImage(text);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }, 500);
    return () => {
      clearTimeout(timer1);
    };
  }, [props.title]);

  return (
    <Card
      className={
        props.rowMode ? "w-full lg:w-96 mx-5 lg:mx-0 h-96" : "w-full mx-5"
      }
      side={props.rowMode ? "xs" : undefined}
    >
      {recipeImage !== undefined ? (
        <Card.Image
          src={"data:image/png;base64," + recipeImage}
          alt={prompt}
          className="z-0"
        />
      ) : (
        <Card.Image
          src="/placeholder.png"
          alt={prompt}
          className="animate-pulse z-0"
        />
      )}
      <Card.Body>
        <Card.Title tag="h2">{props.title}</Card.Title>
        {props.description !== undefined && <p>{props.description}</p>}
      </Card.Body>
    </Card>
  );
}

export default RecipesComponent;
