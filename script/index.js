


const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((json) => displayCategories(json.categories))
}

const displayCategories = (categories) => {
    // console.log(categories)
    // 1.get the container & empty it
    const categoryContainer = document.getElementById("category-container");
    // categoryContainer.innerHTML = " ";

    // 2.get into every category
    for (let i = 0; i < categories.length; i++) {
        // console.log(categories[i].category_name)

        // 3.create element
        const categoryList = document.createElement("div");
        categoryList.innerHTML = `
                    <div class="category-list mt-3 text-left">
                        <button class="text-lg font-medium w-full justify-start text-left rounded-lg p-2 hover:bg-[#15803D] hover:text-white">${categories[i].category_name}</button>
                    </div>

        `
        categoryContainer.append(categoryList)

    }

}
loadCategories()