const url = "./products.json";

let cart = [];

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка получения данных:', error);
    }
}

fetchData(url).then(data => {
    if (data) {
        displayCatalog(data);
    } else {
        console.error('Ошибка: данные не загружены');
    }
});

let cartContainer = document.querySelector('.cart');
const divContent = document.querySelector('.catalog__items');
const cartList = document.querySelector('.cart__items');

function displayCatalog(data) {
    data.products.forEach((element) => {
        divContent.insertAdjacentHTML('beforeend', `
            <div class="catalog__item">
                <div class="catalog__item__hover_bg">
                    <button class="add_to_cart" data-id="${element.id}">
                        <img src="./img/icons/cart.svg" alt="cart">
                        <span>Add to&nbsp;Cart</span>
                    </button>
                </div>
                <img src="${element.img}" class="catalog__item__img" alt="${element.name}" title="${element.name}">
                <div class="catalog__item__content">
                    <div class="catalog__item__title">${element.name}</div>
                    <div class="catalog__item__text">${element.description}</div>
                    <div class="catalog__item__price">${element.price}</div>
                </div>
            </div>
        `);
    });

    document.querySelectorAll('.add_to_cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            console.log('Кнопка нажата, id продукта:', id);
            addToCart(id, data);
        });
    });
}

function updateCartDisplay(data) {
    cartList.innerHTML = '';
    console.log('Обновление отрисовки корзины. Текущая корзина:', cart);
    if (cart.length === 0) {
        cartContainer.style.display = 'none';
    } else {
        cartContainer.style.display = 'flex';
        cart.forEach(item => {
            const product = data.products.find(product => product.id === item.id);
            if (product) {
                cartList.insertAdjacentHTML('beforeend', `
                <div class="cart__item">
                    <div class="cart__item__img">
                        <img src="${product.img}" alt="${product.name}" title="${product.name}">
                    </div>
                    <div class="cart__item__block">
                        <div class="cart__item__title">${product.name}</div>
                        <div class="cart__item__prop">Price: <span>${product.price}</span></div>
                        <div class="cart__item__prop">Size: ${product.size}</div>
                        <div class="cart__item__prop">Color: ${product.color}</div>
                        <div class="cart__item__prop">Quantity: <input class="cart__item__quantity" type="number" min="1" value="${item.quantity}"></div>
                        <i class="fa fa-times" aria-hidden="true" data-id="${item.id}"></i>
                    </div>
                </div>
            `);
            } else {
                console.error('Продукт с id:', item.id, 'не найден');
            }
        });

        document.querySelectorAll('.cart__item__block .fa-times').forEach(cross => {
            cross.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                console.log('крестик нажат, id продукта:', id);
                removeFormCart(id, data);
            });
        });
    }
}

function addToCart(id, data) {
    const existingItem = cart.find(item => item.id === parseInt(id, 10));
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const product = data.products.find(product => product.id === parseInt(id, 10));
        if (!product) {
            console.error('Продукт с id:', id, 'не найден в данных'); // Добавляем отладочное сообщение
            return;
        }
        cart.push({ id: parseInt(id, 10), quantity: 1 });
    }
    console.log('Элемент с id:', id, 'добавлен в корзину. Текущая корзина:', cart); // Добавляем отладочное сообщение
    updateCartDisplay(data);
}

function removeFormCart(id, data) {
    cart = cart.filter(product => product.id !== parseInt(id, 10));
    console.log('Текущая корзина:', cart); // Добавляем отладочное сообщение
    updateCartDisplay(data);
}
