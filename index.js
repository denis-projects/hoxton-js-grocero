/*
This is how an item object should look like
{
  id: 1, // <- the item id matches the icon name in the assets/icons folder
  name: "beetroot",
  price: 0.35 // <- You can come up with your own prices
}
*/

const cartUl = document.querySelector("#cart .item-list")
const totalSum = document.querySelector(".total-number")


const state = {
    groceries: [
        {
            id: 1,
            name: "beetroot",
            price: 0.35,
            amount: 0
        },
        {
            id: 2,
            name: "carrot",
            price: 0.40,
            amount: 0
        },
        {
            id: 3,
            name: "apple",
            price: 0.45,
            amount: 0
        },
        {
            id: 4,
            name: "appricot",
            price: 0.50,
            amount: 0
        },
        {
            id: 5,
            name: "avocado",
            price: 0.95,
            amount: 0
        },
        {
            id: 6,
            name: "bananas",
            price: 0.55,
            amount: 0
        },
        {
            id: 7,
            name: "bell-pepper",
            price: 0.60,
            amount: 0
        },
        {
            id: 8,
            name: "berry",
            price: 0.80,
            amount: 0
        },
        {
            id: 9,
            name: "blueberry",
            price: 0.85,
            amount: 0
        },
        {
            id: 10,
            name: "eggplant",
            price: 0.5,
            amount: 0
        }
    ],

    cartGroceries: []
}

function addToCart(grocery) {
    for (let cartGrocery of state.cartGroceries) {
        if (grocery.name === cartGrocery.name) {
            cartGrocery.amount++
            return false
        }
    }
    state.cartGroceries.push(grocery)
    grocery.amount++
}

// create store grocery

function createStoreGrocery() {

    const storeUl = document.querySelector("header .item-list")

    for (const grocery of state.groceries) {

        const storeLi = document.createElement("li")

        const storeDiv = document.createElement("div")
        storeDiv.setAttribute("class", ".store--item-icon")

        const storeImg = document.createElement("img")
        storeImg.setAttribute(`src`, `assets/icons/${grocery.id < 10 ? '00' : '0'}${grocery.id}-${grocery.name}.svg`)

        const storeButton = document.createElement("button")
        storeButton.textContent = "Add to cart"

        storeButton.addEventListener("click", function () {
            addToCart(grocery)
            renderCardGroceries()
        })

        storeDiv.append(storeImg)
        storeUl.append(storeLi)
        storeLi.append(storeDiv, storeButton)
    }
}

// create cart grocery

function createCartGrocery(grocery) {

    const cartLi = document.createElement("li")

    const cartImg = document.createElement("img")
    cartImg.setAttribute("class", "cart--item-icon")
    cartImg.setAttribute(`src`, `assets/icons/${grocery.id < 10 ? '00' : '0'}${grocery.id}-${grocery.name}.svg`)

    const cartGroceryName = document.createElement("p")
    cartGroceryName.textContent = grocery.name

    const removeButton = document.createElement("button")
    removeButton.setAttribute("class", "quantity-btn remove-btn center")
    removeButton.textContent = "-"

    const span = document.createElement("span")
    span.setAttribute("class", "quantity-text center")
    span.textContent = grocery.amount

    const addButton = document.createElement("button")
    addButton.setAttribute("class", "quantity-btn add-btn center")
    addButton.textContent = "+"

    cartUl.append(cartLi)
    cartLi.append(cartImg, cartGroceryName, removeButton, span, addButton)

    removeButton.addEventListener("click", function () {
        reduceGroceryAmount(grocery)
        renderCardGroceries()
    })

    addButton.addEventListener("click", function () {
        addGroceryAmount(grocery)
        renderCardGroceries()
    })
}

function reduceGroceryAmount(grocery) {
    grocery.amount--
    if (grocery.amount === 0) {
        state.cartGroceries.splice(state.cartGroceries.indexOf(grocery), 1)
    }
}

function addGroceryAmount(grocery) {
    grocery.amount++
}

function renderCardGroceries() {
    cartUl.innerHTML = ""
    let totalprice = 0

    for (const grocery of state.cartGroceries) {
        createCartGrocery(grocery)
        totalprice += grocery.price * grocery.amount
    }
    totalSum.textContent = totalprice.toFixed(2)
    console.log(totalprice)
}

function render() {
    createStoreGrocery()
    createCartGrocery()
}
render()