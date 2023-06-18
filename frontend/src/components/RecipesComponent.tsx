import { Card } from "react-daisyui";
import { useEffect, useState } from "react";
import { useWindowSize } from "../services/hooks";
import { useSetRecoilState } from "recoil"
import { recipeDetailState } from "../services/atoms";

interface RecipesComponentProps {
  id?: Number;
  title: String;
  description?: String;
  source?: String;
  rowMode?: boolean;
}

function RecipesComponent(props: RecipesComponentProps) {
  const [recipeImage, setRecipeImage] = useState<string | undefined>(undefined);
  const [desc, setDesc] = useState(props.description);
  const size = useWindowSize();
  const setRecipeDetail = useSetRecoilState(recipeDetailState)
  //setRecipeDetail(obj)

  const imagePrompt =
    "Delicous, appetizing, and beautiful " +
    props.title.toLowerCase() +
    " ready to be served";

  const textPrompt = "name: " + props.title.toLowerCase();

  useEffect(() => {
    let timer1 = setTimeout(() => {
      fetch(
        `https://${
          window.location.hostname.split(":")[0]
        }:5000/get_image?prompt=` + imagePrompt
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

  useEffect(() => {
    if (props.description === undefined && props.rowMode === true) {
      let timer1 = setTimeout(() => {
        fetch(
          `https://${
            window.location.hostname.split(":")[0]
          }:5000/get_description?prompt=` + textPrompt
        )
          .then((response) => {
            response.text().then((text) => {
              setDesc(text);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }, 500);
      return () => {
        clearTimeout(timer1);
      };
    }
  }, [props.title]);

  return (
    <div className={props.rowMode === true ? "m-5" : ""}>
      <Card
        className={
          props.rowMode === true
            ? size.width > 512
              ? "w-full h-60"
              : "w-full h-128"
            : "w-full lg:w-96 m-5 lg:mx-0 h-64"
        }
        side={props.rowMode ? "sm" : undefined}
      >
        {recipeImage !== undefined ? (
          <Card.Image
            src={"data:image/png;base64," + recipeImage}
            alt={imagePrompt}
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
            alt={imagePrompt}
            className="animate-pulse z-0"
          />
        )}
        <Card.Body className="bg-base-200">
          <Card.Title className="text-md ">{props.title}</Card.Title>
          <p>{desc}</p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RecipesComponent;