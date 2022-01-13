const result = document.getElementById('result')
const form = document.querySelector('form')
const input = document.getElementById('search')
let meals = []


input.addEventListener('input', (e) => {
    fetchMeals(e.target.value)
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    mealsDisplay()
})

const fetchMeals = async (search) => {
    await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then((res) => res.json())
        .then((data) => (meals = data.meals))
        .catch((err) => console.log(err))
    // console.log(meals)
}

const mealsDisplay = () => {
    if(meals !== null) {
        meals.length = 12
        console.log(meals.strMeal)
        result.innerHTML = meals.map(
            (meal) => {
                let ingredients = []
                for(let i = 1; i < 21; i++) {
                    if(meal[`strIngredient${i}`]) {
                        let ingredient = meal[`strIngredient${i}`]
                        let measure = meal[`strMeasure${i}`]
                        ingredients.push(`<li>${ingredient} - ${measure}</li>`)
                    }
                }
                return `
                    <li class="cards">
                        <h2>${meal.strMeal}</h2>
                        <p>${meal.strArea}</p>
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <ul>${ingredients.join('')}</ul>
                    </li>
                `
            }
        ).join('')
    } else {
        result.innerHTML = '<h2>No result</h2>'
    }
}
