//Зміна сердечка
const hearts = document.querySelectorAll(".heart");

hearts.forEach(function(heart) {
    heart.addEventListener("click", function() {
        if (heart.classList.contains("fa-regular")) {
            heart.classList.replace("fa-regular", "fa-solid");
        } else {
            heart.classList.replace("fa-solid", "fa-regular");
        }
    });
});
// Відкриття/закриття рецепту
const buttons = document.querySelectorAll(".recipe-button");
const recipes = document.querySelectorAll(".recipe-wrapper");


buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const recipeId = button.getAttribute("data");
        const recipe = document.getElementById(recipeId);

        recipe.classList.add('show');
    });
});

// Закриття при натисканні на кнопку або фон
recipes.forEach(function(recipe) {
    const closeButton = recipe.querySelector(".close-btn");

    // Закрити при натисканні на кнопку закриття
    closeButton.addEventListener("click", function() {
        recipe.classList.remove('show');
    });

    // Закрити при натисканні поза блоком рецепту
    recipe.addEventListener("click", function(event) {
        if (event.target === recipe) { // Перевірка, що натиснута саме область поза блоком
            recipe.classList.remove('show');
        }
    });
});
