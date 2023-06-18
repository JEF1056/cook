import { Button, Input, InputGroup } from "react-daisyui";
import RecipesComponent from "../RecipesComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function SearchPage() {
  const [recipes, setRecipies] = useState<any[] | undefined>(undefined);
  const [inp, setInp] = useState("");

  useEffect(() => {
    fetch(`https://${window.location.hostname.split(":")[0]}:5000/recipes`)
      .then((response) => {
        response.text().then((text) => {
          console.log(text);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <InputGroup className="px-5 pt-5">
        <Input
          className="w-full"
          placeholder="Search for recipes"
          value={inp}
          onChange={(event) => setInp(event.currentTarget.value)}
        />
        <Button
          onClick={() => {
            setRecipies(undefined);
            fetch(
              `https://${
                window.location.hostname.split(":")[0]
              }:5000/vector_search?query=${inp}`
            )
              .then((response) => {
                response.json().then((json) => {
                  setRecipies(json);
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </InputGroup>
      {recipes === undefined ? (
        <div className="flex flex-row justify-center items-center">
          <div className="pt-10">
            Nothing here. Search for some recipes above!
          </div>
        </div>
      ) : (
        <>
          {recipes.map((recipe) => (
            <RecipesComponent
              title={recipe.title}
                ingredients={recipe.ingredients}
                directions={recipe.directions}
              rowMode
            />
          ))}
        </>
      )}
    </>
  );
}

export default SearchPage;
