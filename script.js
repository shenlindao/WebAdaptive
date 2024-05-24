const url = "./products.json";

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка получения данных:', error);
    }
}
const data = await fetchData(url);

const divContent = document.querySelector('.catalog__items');
data.products.forEach((element) => {
    divContent.insertAdjacentHTML('beforeend', `
    <div class="catalog__item">
    <div class="catalog__item__hover_bg">
    <button class="add_to_cart">
    <img src="./img/icons/cart.svg" alt="cart">
    <span>Add to&nbsp;Cart</span>
    </button>
    </div>
    <img src="${element.img}" class="catalog__item__img" alt="item_1" title="item_1">
    <div class="catalog__item__content">
    <div class="catalog__item__title">${element.name}</div>
    <div class="catalog__item__text">${element.description}</div>
    <div class="catalog__item__price">${element.price}</div>
    </div>
    </div>
    `);
});