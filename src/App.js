import React, {useEffect, useState} from 'react'
import Recipe from './Recipe';
import {v1 as uuid} from 'uuid';
import './App.css'

function App() {
  const APP_ID = "f1e0674a";
  const APP_KEY = "b81f460cf3e1ffbdc7c8c628d4d8d6bd";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');




  useEffect(() => {
    getRecipes();
  }, [query])
  const getRecipes = async () => {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();
      console.log(data.hits);
      setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value)
  }
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
    {recipes.map(recipe => (
      <Recipe key={uuid()} title={recipe.recipe.label} calories={recipe.recipe.calories}
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients}
      />
    ))}
    </div>
  )
}

export default App
