import { menuArray } from "./data.js"


// global variables
let myOrder = []
let totalP = 0
const form = document.getElementById("payment-form")
const saleModalContainer = document.getElementById("sale-b-c")

// event listeners
document.addEventListener("click", function(e) {
    if (e.target.dataset.add) {
        checkout(e.target.dataset.add)
    }
    else if (e.target.dataset.remove) {
        removeItem(e.target.dataset.remove)
    }
    else if (e.target.dataset.completeo) {
        getPaymentModal()
    }
    else if (e.target.dataset.neworder) {
        startNewOrder()
    }
    else if (e.target.dataset.closesale) {
        closeSaleModal()
    }
})

// loading in sale 
setTimeout(function(){
    saleModalContainer.style.display = 'block'
}, 1500)

// form event listener
// closes the payment modal and renders the message

form.addEventListener("submit", function(e) {
    e.preventDefault()
    document.getElementById("card-info").classList.add("hidden")

    const nameInput = document.getElementById("name")

    const messageHtml = `<div class="message-container">
    <div class="message">
        <h2>Thanks ${nameInput.value}!  Your order is on its way</h2>
        <button class="complete-order-btn" data-neworder="n1">Start new order</button>
    </div>
</div>`
    
    document.getElementById("checkout-c").innerHTML = messageHtml
    document.getElementById("checkout-c").classList.remove("hidden")
})

// close sale modal
function closeSaleModal() {
    saleModalContainer.style.display = "none";
}

// chekout items
function checkout(itemId) {

    const currentItem = menuArray.filter(function(menuItem) {
        return menuItem.id === itemId
    })[0]

    myOrder.push(currentItem)

    document.getElementById("order-item").innerHTML = getCheckoutHtml(myOrder)
    document.getElementById("checkout-c").classList.remove("hidden")

    checkOrder(myOrder)
}

// get checkout html
function getCheckoutHtml(item, id) {
    let checkOutHtml = ''


    if (item.length > 0) {
        item.forEach(function(order) {
            checkOutHtml += `<div class="order-details">
    <div class="food-order">
        <h3 class="order-item">${order.name}</h3>
        <p class="remove" data-remove="${order.id}">remove</p>
    </div>
    <div>
        <h3 class="order-price">$${order.price}</h3>
    </div>    
</div>`

        })
    }

    if (!id) {
        if (item.length > 0) {
            totalP += item[item.length - 1].price
        }
    } else {
        if (item.length === 0) {
            document.getElementById("checkout-c").classList.add("hidden")
        }
    }
    
    document.getElementById("t-price-amount").innerHTML = `$${totalP}`

    return checkOutHtml
}

// remove items
function removeItem(itemId) {
    
    const targetItem = myOrder.filter(function(item) {
        return item.id === itemId
    })[0]

    totalP -= targetItem.price
    myOrder.splice(myOrder.indexOf(targetItem), 1)

    document.getElementById("order-item").innerHTML = getCheckoutHtml(myOrder, itemId)
    document.getElementById("t-price-amount").innerHTML = `$${totalP}`
    checkOrder(myOrder)
}

// checking your orders
// for burger + beer sale
function checkOrder(item) {
    let orderArray = []
    let count = {}

    item.forEach(function(order) {
        orderArray.push(order.name)
    })

    orderArray.forEach(function(order) {count[order] = (count[order] || 0) + 1})


    if (!count["Pizza"]) {
        if (count["Hamburger"] === 1 && count["Beer"] === 1) {
            totalP = totalP / 2
            document.getElementById("t-price-amount").innerHTML = `$${totalP}`
        }
    } 
}

// display the card info
function getPaymentModal() {
    document.getElementById("card-info").classList.remove("hidden")
}

// start new order
function startNewOrder() {
    location.reload()
}

// loading in items
function getMenuHtml() {

    let menuHtml = ''

    menuArray.forEach(function(menuItem) {
        menuHtml += `<div class="menu-item">
        <div class="details">
            <div class="icon">
                <h1 class="item-img">${menuItem.emoji}</h1>
            </div>
            <div class="description">
                <h2>${menuItem.name}</h2>
                <p class="ingredients">${menuItem.ingredients}</p>
                <h3 class="price">$${menuItem.price}</h3>
            </div>
        </div>
        <div class="add-button" data-add="${menuItem.id}">
            <i class="fa-solid fa-plus add-icon" data-add="${menuItem.id}"></i>
        </div>
    </div>`
    })
    return menuHtml
}

function render() { 

    document.getElementById("menu-section").innerHTML = getMenuHtml()
}

render()
