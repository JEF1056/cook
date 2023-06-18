import { Button, Input, InputGroup } from "react-daisyui";
import RecipesComponent from "../RecipesComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function SearchPage() {
  const [recipes, setRecipies] = useState<any[]>([]);

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
        <Input className="w-full" placeholder="Search for recipes" />
        <Button>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </InputGroup>
      <>
        <RecipesComponent
          title="Spring roll"
          description="A buttery, crisp boi that is yumm"
          rowMode
        />
        <RecipesComponent
          title="Chocolate sundae"
          description="Nothing like a sundae for sunday"
          rowMode
        />
        <RecipesComponent
          title="A stick of butter, deep fried in butter"
          description="Mmm, clogged arteries"
          rowMode
        />
        <RecipesComponent
          title="Fried rice on a stick"
          description="How- how do you eat this?"
          rowMode
        />
        <RecipesComponent
          title="Charred tsar cake"
          description="better not be burnt"
          rowMode
        />
      </>
    </>
  );
}

export default SearchPage;
