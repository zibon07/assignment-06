


const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((json) => displayCategories(json.categories))
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
                            <h4 class="text-3xl mb-2 font-bold">${trees[i].name}</h4>
                            <p class="">${trees[i].description}</p>
                        </div>
                        <div class="flex mb-2 justify-between items-center mx-4">
                            <h3
                                class=" border-2 border-solid border-green-400   text-green-400 text-lg px-3 rounded-xl">
                                ${trees[i].category}</h3>
                            <h2 class="text-xl font-bold text-green-700">৳<span>${trees[i].price}</span></h2>
                        </div>
                        <button class="text-lg mx-3 mb-3 font-medium  rounded-4xl px-2 py-3 bg-[#15803D] text-white">Add to
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
                        class="bg-white flex flex-col gap-3 max-w-[350px] max-h-[480px] rounded-2xl shadow-3xl">
                        <img class="w-full  max-h-50 rounded-t-2xl object-cover"
                            src="${allTrees[i].image}" alt="">
                        <div class="mx-4 my-1">
                            <h4 class="text-3xl mb-2 font-bold">${allTrees[i].name}</h4>
                            <p class="">${allTrees[i].description}</p>
                        </div>
                        <div class="flex mb-2 justify-between items-center mx-4">
                            <h3
                                class=" border-2 border-solid border-green-400   text-green-400 text-lg px-3 rounded-xl">
                                ${allTrees[i].category}</h3>
                            <h2 class="text-xl font-bold text-green-700">৳<span>${allTrees[i].price}</span></h2>
                        </div>
                        <button class="text-lg mx-3 mb-3 font-medium  rounded-4xl px-2 py-3 bg-[#15803D] text-white">Add to
                            Cart</button>
                    </div>
        `
        cardContainer.append(treeCard)

    }
}


loadAllTrees()
loadCategories()