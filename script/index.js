console.log("js connected")


const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((json) => displayCategories(json))
}

const displayCategories = (categories) => {
    console.log(categories)
}
loadCategories()