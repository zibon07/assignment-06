


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
                    <div class="category-list mt-2 text-left">
                        <button class="text-lg font-medium w-full justify-start text-left rounded-md px-2 hover:bg-[#15803D] hover:text-white">${categories[i].category_name}</button>
                    </div>
        `
        categoryContainer.append(categoryList)

    }

}
const loadAllTrees = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then((json) => displayAllTrees(json.plants))
}

const displayAllTrees = (allTrees) => {
    console.log(allTrees)
}


loadAllTrees()
loadCategories()