const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");

// event listener
searchBtn.addEventListener("click", getMealList);

mealList.addEventListener("click", getMealRecipe);
mealList.addEventListener("click", saveToFavouriteList);
window.onload = function () {
    getMealList();
};
//get meal list matches with the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById("search-input").value.trim();

    if (searchInputTxt === "") return;
    // console.log(searchInputTxt);
    fetch(
        "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + searchInputTxt
    )
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            let html = "";
            if (data.meals) {
                data.meals.forEach((meal) => {
                    //this is backtick not single quotes
                    html += `
                    <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                            <a href="#"  > <i class="fa fa-heart fa-2x heart"></i> </a>
                            
                            
                        </div>
                    </div>
                    `;
                    mealList.classList.remove("notFound");
                });
            } else {
                html += "Sorry, We didn't find any meal!";
                mealList.classList.add("notFound");
            }
            mealList.innerHTML = html;
        });
}

//get the recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    // console.log(e.target); //e.target gives you the html element you clicked
    if (e.target.classList.contains("recipe-btn")) {
        let mealItem = e.target.parentElement.parentElement;
        // console.log("button : " + mealItem.dataset.id);
        fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
        )
            .then((response) => response.json())
            .then((data) => mealRecipeModel(data.meals));
    }
}

//create a Model
let mealId;

function mealRecipeModel(meal) {
    // console.log(meal);
    meal = meal[0];
    console.log(meal);
    let html = ``;
    mealId = meal.idMeal;
    console.log(mealId);
    localStorage.setItem("mealIdKey", mealId);
    window.location.href = "meals_details.html";
}

//favourite list
function saveToFavouriteList(e) {
    // e.preventDefault();
    // console.log(e.target);
    if (e.target.classList.contains("heart")) {
        // console.log("hellow");
        let mealItem = e.target.parentElement.parentElement.parentElement;
        if (e.target.classList.contains("red-color")) {
            e.target.classList.remove("red-color");
        } else {
            e.target.classList.add("red-color");
        }

        // console.log(mealItem.dataset.id);
        fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
        )
            .then((response) => response.json())
            .then((data) => saveIdToList(data.meals));
    }
}
//favourites array
const favouriteIds = [];
function saveIdToList(meal) {
    meal = meal[0];
    if (favouriteIds.includes(meal.idMeal)) {
        for (var i = 0; i < favouriteIds.length; i++) {
            if (favouriteIds[i] === meal.idMeal) {
                favouriteIds.splice(i, 1);
            }
        }
        // document.getElementsByClassName("heart").classList.add("red-color");
    } else {
        favouriteIds.push(meal.idMeal);
    }

    localStorage.setItem("favourites-arr-key", favouriteIds);
    console.log(favouriteIds);
}
