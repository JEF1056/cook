import { Card } from "react-daisyui";
import { useEffect, useState } from "react";
import { useWindowSize } from "../services/hooks";

interface RecipesComponentProps {
  id?: Number;
  title: String;
  description?: String;
  source?: String;
  rowMode?: boolean;
}

function RecipesComponent(props: RecipesComponentProps) {
  const [recipeImage, setRecipeImage] = useState<string | undefined>(undefined);
  const size = useWindowSize();

  const prompt =
    "Delicous, appetizing, and beautiful " +
    props.title.toLowerCase() +
    " ready to be served";

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
    <div className={props.rowMode === true ? "m-5" : ""}>
      <Card
        className={
          props.rowMode === true
            ? size.width > 512
              ? "w-full h-60"
              : "w-full h-96"
            : "w-full lg:w-96 m-5 lg:mx-0 h-64"
        }
        side={props.rowMode ? "sm" : undefined}
      >
        {recipeImage !== undefined ? (
          <Card.Image
            src={"data:image/png;base64," + recipeImage}
            alt={prompt}
            className={
              size.width > 512
                ? props.rowMode === true
                  ? "z-0 w-64"
                  : "z-0"
                : "z-0"
            }
          />
        ) : (
          <Card.Image
            src="/placeholder.png"
            alt={prompt}
            className="animate-pulse z-0"
          />
        )}
        <Card.Body className="bg-base-200">
          <Card.Title className="text-md ">{props.title}</Card.Title>
          {props.description !== undefined && <p>{props.description}</p>}
        </Card.Body>
      </Card>
    </div>
  );
}

export default RecipesComponent;
