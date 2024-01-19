const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector('.searchBtn');
const recipeContainer=document.querySelector('.recipe-container');
const recipeDetailsContent=document.querySelector('.recipe-details-content');
const recipeCloseBtn=document.querySelector('.close-btn');

const fetchRecipes= async (query)=>{
    recipeContainer.innerHTML="<h2>fetching recipes for you...</h2>";
    try{
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const res=await data.json();
    //console.log(res);
    recipeContainer.innerHTML="";
    res.meals.forEach(meal => {
        const recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
        <h3 id="dishName">${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" id="pic">
        <p id="area">${meal.strArea} dish</p>
        <p id="type">Type: ${meal.strCategory}</p>
        `
        const button=document.createElement('button');
        button.classList.add('RecipeBtn');
        button.textContent="View Recipe";
        recipeDiv.appendChild(button);
        button.addEventListener('click',()=>{
            openRecipePopUp(meal);
        });

        recipeContainer.appendChild(recipeDiv);
    });
    }
    catch(error){
        recipeContainer.innerHTML=`<h2>Sorry,Error in Fetching Recipe!</h2>`;
    }

};


const fetchIngrediants=(meal)=>{
    let ingredientsList="";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            ingredientsList+=`<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
};
const openRecipePopUp=(meal)=>{
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    </br>
    <h3>INGREDIANTS:</h3>

    <ul class="ingList">${fetchIngrediants(meal)}</ul>
    <div class="instructions">
        <h3>INSTRUCTIONS:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display="block";
};

recipeCloseBtn.addEventListener("click",()=>{
    recipeDetailsContent.parentElement.style.display="none";
});

searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML=`<h2>Please type the meal in the search box!</h2>`;
        return;
    }
    fetchRecipes(searchInput);
    // console.log("button clicked");
});