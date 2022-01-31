let mealIdRecieved = localStorage.getItem("mealIdKey");
const mealDetailsContent = document.getElementById("meal-details-content");
// console.log(localStorage.getItem("mealIdKey"));
fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealIdRecieved}`)
    .then((response) => response.json())
    .then((data) => mealRecipeDisplay(data.meals));
function mealRecipeDisplay(mealObj) {
    mealObj = mealObj[0];
    console.log(mealObj);
    let html = `
    <h1 class="recipe-title">${mealObj.strMeal}</h1>
        <p class="recipe-category">${mealObj.strCategory}</p>
        <h2>Instructions:</h2>
        <div class="recipe-instruct">
            <div class="instruct-para"><p>${mealObj.strInstructions}</p></div>
            
            <div class="recipe-meal-img">
                <img src="${mealObj.strMealThumb}" alt="recipe image">
            </div>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
}
