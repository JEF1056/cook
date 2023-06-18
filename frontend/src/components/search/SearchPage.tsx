import RecipesComponent from "../RecipesComponent";

function SearchPage() {
  return (
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
    </>
  );
}

export default SearchPage;
