const search = document.getElementById('button-addon2');
const input = document.getElementById('input');
const cocktails = document.querySelector('.cocktails');
const modal = document.querySelector('.modal');
const btnClose = document.querySelector('.btn-close');
const ingredientsInfo = document.querySelector('.modal-body');




let drinksArr = '';
let currentDrink = '';


const getCocktailsList = async (value) => {
  const cocktailsUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`;
  const response = await fetch(cocktailsUrl);
  const result = await response.json();
  drinksArr = result.drinks;
  showCocktails(result.drinks);
};

const showCocktails = arr => {
  arr.forEach(element => {
    const cocktailCard = document.createElement('div');
    cocktailCard.classList.add('col-lg-2');
    cocktailCard.innerHTML = `<div class="card">
                                <img src=${element.strDrinkThumb} class="card-img-top cocktail-img" alt=${element.strDrink}>
                                <div class="card-body">
                                  <p class="card-text">${element.strDrink}</p>
                                </div>
                              </div>`;
    cocktails.append(cocktailCard);
  });
};



search.addEventListener('click', e => {
  e.target.value = input.value;
  cocktails.innerHTML = '';
  getCocktailsList(input.value);
});


const getCocktailInfo = async obj => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${obj.strDrink}`;
  const response = await fetch(url);
  const result = await response.json();
  return result.drinks;
}


const showIngredients = obj => {
  const ingredients = document.createElement('div');
  for (let i = 1; i <= 15; i++) {
    let key = 'strIngredient' + i;
    let measure = 'strMeasure' + i;
    if (!obj[key]) {
      break;
    } else {
      let ingredientItem = document.createElement('div');
      let ingredient = '';
      if (obj[key].includes(' ')) {
        let re = / /g;
        ingredient = (obj[key]).replace(re, '%20');
      } else {
        ingredient = obj[key];
      }
      console.log(ingredient);
      let picUrl = `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`
      ingredientItem.innerHTML = `<img src=${picUrl}><span>${obj[key]} ${obj[measure]}</span>`
                                  
      ingredients.append(ingredientItem);
    }
  }
  ingredientsInfo.append(ingredients);
  const instructions = document.createElement('div');
  instructions.innerText = obj.strInstructions;
  ingredientsInfo.append(instructions);
}

cocktails.addEventListener('click', e => {
  const drink = e.target.closest('div');
  const drinkName = drink.lastElementChild.lastElementChild.innerText;
  modal.style.display = 'block';
  const currentDrink = drinksArr.find(element => element.strDrink === drinkName);
  console.log(currentDrink);
  showIngredients(currentDrink);
});

btnClose.addEventListener('click', e => {
  modal.style.display = 'none';
  ingredientsInfo.innerHTML = '';
});