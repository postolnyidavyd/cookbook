// <i class="fa-solid fa-heart"></i>
const heartContainer = document.body.querySelectorAll(".heart");
const emptyHeart = document.body.querySelector(".fa-regular");
const fullHeart = "fa-solid";
function changeStyle(){
    alert("Hello");
}
emptyHeart.addEventListener("click",() =>{
    heartContainer.removeChild(emptyHeart);
    heartContainer.add(fullHeart);
} )