


const loadCategories = () => {
    manageSpinner(true)
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((json) => displayCategories(json.categories))
}

const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("content").classList.add("hidden")
    }
    else {
        document.getElementById("spinner").classList.add("hidden")
        document.getElementById("content").classList.remove("hidden")
    }
}

const displayCategories = (categories) => {

    // 1.get the container & empty it

    const categoryContainer = document.getElementById("category-container");

    // 2.get into every category

    for (let i = 0; i < categories.length; i++) {

        // 3.create element

        const categoryList = document.createElement("div");
        categoryList.innerHTML = `
                    <div class="mt-2 text-left">
                        <button id="category-btn-${categories[i].id}" onclick="loadCategoryTrees(${categories[i].id})" class="text-lg font-medium w-full justify-start text-left rounded-md px-2 py-1 hover:bg-[#15803D] hover:text-white category-btn">${categories[i].category_name}</button>
                    </div>
        `
        categoryContainer.append(categoryList)

    }
    manageSpinner(false)
}

const removeActive = () => {
    const categoryButton = document.querySelectorAll(".category-btn")
    categoryButton.forEach((btn) => btn.classList.remove("active"))
}

const loadCategoryTrees = (id) => {
    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(json => {
            removeActive()
            const clickBtn = document.getElementById(`category-btn-${id}`)
            clickBtn.classList.add("active")
            displayCategoryTrees(json.plants)
        })
}

const displayCategoryTrees = (trees) => {

    const cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = " "

    for (let i = 0; i < trees.length; i++) {
        const categoryTree = document.createElement("div")
        categoryTree.innerHTML = `
           <div id="tree-card"
                        class="bg-white flex flex-col gap-3 max-w-[350px] max-h-[480px] rounded-2xl shadow-3xl">
                        <img class="w-full  max-h-50 rounded-t-2xl object-cover"
                            src="${trees[i].image}" alt="">
                        <div class="mx-4 my-1">
                            <h4 onclick="loadWPlantDetail(${trees[i].id})" class="text-3xl mb-2 font-bold">${trees[i].name}</h4>
                            <p class="">${trees[i].description}</p>
                        </div>
                        <div class="flex mb-2 justify-between items-center mx-4">
                            <h3
                                class=" border-2 border-solid border-green-400   text-green-400 text-lg px-3 rounded-xl">
                                ${trees[i].category}</h3>
                            <h2 class="text-xl font-bold text-green-700">৳<span>${trees[i].price}</span></h2>
                        </div>
                        <button onclick="loadCartDetails(${trees[i].id})" class="text-lg mx-3 mb-3 font-medium  rounded-4xl px-2 py-3 bg-[#15803D] text-white">Add to
                            Cart</button>
                    </div>
        `
        cardContainer.append(categoryTree)
    }
}

const loadAllTrees = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then((json) => displayAllTrees(json.plants))
}

const displayAllTrees = (allTrees) => {

    // 1.get the container

    const cardContainer = document.getElementById("card-container")

    // 2.get into card details

    for (let i = 0; i < allTrees.length; i++) {
        // console.log(allTrees[i].name)

        // 3.create element

        const treeCard = document.createElement("div")

        treeCard.innerHTML = `
        <div id="tree-card"
                        class="bg-white flex flex-col gap-3 max-w-[330px] max-h-[500px] rounded-2xl shadow-3xl">
                        <img class="w-full  max-h-50 rounded-t-2xl object-cover"
                            src="${allTrees[i].image}" alt="">
                        <div class="mx-4 my-1">
                            <h4 onclick="loadPlantDetail(${allTrees[i].id})" class="text-3xl mb-1 font-bold">${allTrees[i].name}</h4>
                            <p class="">${allTrees[i].description}</p>
                        </div>
                        <div class="flex mb-1 justify-between items-center mx-4">
                            <h3
                                class=" border-2 border-solid border-green-400   text-green-400 text-lg px-3 rounded-xl">
                                ${allTrees[i].category}</h3>
                            <h2 class="text-xl font-bold text-green-700">৳<span>${allTrees[i].price}</span></h2>
                        </div>
                        <button onclick="loadCartDetails(${allTrees[i].id})" class="text-lg mx-3 mb-3 font-medium  rounded-4xl px-2 py-3 bg-[#15803D] text-white">Add to
                            Cart</button>
                    </div>
        `
        cardContainer.append(treeCard)

    }
}

const loadPlantDetail = async (id) => {
    // my_modal_5.showModal()
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    const res = await fetch(url);
    const details = await res.json()
    displayModal(details.plants)
}

const displayModal = (modal) => {
    const detailsContainer = document.getElementById("details-container")
    detailsContainer.innerHTML = `
     <h2 class="text-2xl mb-2 font-semibold">${modal.name}</h2>
                    <img class="w-full mb-3 rounded-2xl max-h-[300px] object-cover" src=${modal.image} alt="">
                    <h2 class="text-2xl mb-2 font-semibold">category: <span class="font-normal">${modal.category}</span></h2>
                    <h2 class="text-xl font-semibold mb-2 lg">price: $<span class="font-bold">${modal.price}</span></h2>
                    <h4 class="text-2xl mb-2 font-semibold">Description: <span class="text-normal font-normal">${modal.description}</span></h4>
    `
    document.getElementById("my_modal_5").showModal()
}

const loadCartDetails = (id) => {
    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(json => displayCart(json.plants))
}

const displayCart = (cart) => {
    // console.log(cart)
    const cartContainer = document.getElementById("cart-container")
    // console.log(cartContainer)
    const div = document.createElement("div")
    div.innerHTML = `
                    <div id="cart-item" class="cart bg-green-100 p-2 w-full h-[70px] rounded-2xl mb-3 flex  justify-between items-center">
                        <div>
                            <h2 class="text-lg font-medium">${cart.name}</h2>
                            <h3 class=" font-medium">price: $<span class="font-bold price">${cart.price}</span></h3>
                        </div>
                        <i onclick="clearCart(${cart.id})" class="fa-solid fa-xmark text-2xl"></i>
                    </div>
                    
`
    cartContainer.append(div)
    calculateAll()
}

let total = 0;
const totalEl = document.getElementById("total")
if (total === 0) {
    totalEl.parentElement.style.display = "none"

}
const calculateAll = () => {
    let total = 0
    const prices = document.querySelectorAll(".cart .price");
    console.log(prices)
    prices.forEach(price => {
        total += Number(price.innerHTML)
    })
    // console.log(total)

    console.log(totalEl)
    if (prices.length < 1) {
        totalEl.parentElement.style.display = "none"
    }
    else {
        totalEl.parentElement.style.display = "block"
        document.getElementById("total").innerText = total;
    }

}

const clearCart = () => {
    const cartItem = document.getElementById("cart-item")
    cartItem.remove()
    calculateAll()

}


loadAllTrees()
loadCategories()