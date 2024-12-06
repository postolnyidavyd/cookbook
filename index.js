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
// Обирання категорії рецепту
const blocks = document.querySelectorAll('.categories');
const elements = document.querySelectorAll('.content');

// Функція для оновлення видимості елементів
function updateVisibility(group) {
    // Спочатку приховуємо всі елементи
    elements.forEach(element => {
        element.classList.remove('visible-recipe');
        element.classList.add('hidden-recipe');
    });

    // Виконуємо з затримкою, щоб створити ефект оновлення
    setTimeout(() => {
        elements.forEach(element => {
            if (group === 'all' || element.dataset.group === group) {
                element.classList.remove('hidden-recipe');
                element.classList.add('visible-recipe');
            }
        });
    }, 50); // Час затримки в мілісекундах
}

// Початкове встановлення видимості
updateVisibility('all');

// Додати обробник подій для кожного блоку
blocks.forEach(block => {
    block.addEventListener('click', () => {
        blocks.forEach(b => b.classList.remove('selected'));
        block.classList.add('selected'); // Робимо обраний блок активним
        updateVisibility(block.dataset.show); // Оновлюємо видимість елементів
    });
});
// Відкриття/закриття рецепту
const buttons = document.querySelectorAll(".recipe-button");
const recipes = document.querySelectorAll(".recipe-wrapper");


buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const recipeId = button.getAttribute("data-id");
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
