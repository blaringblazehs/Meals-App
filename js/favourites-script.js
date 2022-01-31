const arr = localStorage.getItem("favourites-arr-key");
// const arr1 = JSON.parse(arr);
const mealList = document.getElementById("meal");
mealList.addEventListener("click", getMealRecipe);
console.log("recieved array : " + arr);
var str = "";
for (var i = 0; i < arr.length; i++) {
    if (arr[i] != ",") {
        str = str.concat(arr[i]);
        continue;
    }
    var strId = str;
    str = "";
    // console.log(strId);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${strId}`)
        .then((response) => response.json())
        .then((data) => displayMeals(data.meals));
}
if (str != "") {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${str}`)
        .then((response) => response.json())
        .then((data) => displayMeals(data.meals));
    str = "";
}
let html = "";
function displayMeals(meal) {
    {
        // console.log(data);

        //this is backtick not single quotes

        //this is backtick not single quotes
        if (meal) {
            meal.forEach((meals) => {
                //this is backtick not single quotes
                html += `
                <div class="meal-item" data-id="${meals.idMeal}">
                    <div class="meal-img">
                        <img src="${meals.strMealThumb}" alt="food">
                    </div>
                    <div class="meal-name">
                        <h3>${meals.strMeal}</h3>
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
        console.log(meal);
        mealList.innerHTML = html;
    }
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
