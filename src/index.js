// index.js
const ramensArray = []

// Callbacks
const handleClick = (ramen) => {
  //should fire on a click on every img inside #ramen-menu
  //should append the correct data to the DOM
  const detailImageElement = document.querySelector('.detail-image')
  detailImageElement.src = ramen.image
  const nameElement = document.querySelector('.name')
  nameElement.textContent = ramen.name
  const restaurantNameElement = document.querySelector('.restaurant')
  restaurantNameElement.textContent = ramen.restaurant
  const ramenRating = document.getElementById("rating-display")
  ramenRating.textContent = ramen.rating
  const ramenComment = document.getElementById("comment-display")
  ramenComment.textContent = ramen.comment
};


const addSubmitListener = () => {
  const addToMenu = document.getElementById('new-ramen')
  addToMenu.addEventListener('submit', (event) => {
    event.preventDefault()
    const nameInForm = document.getElementById("new-name")
    const restaurantInForm = document.getElementById("new-restaurant")
    const imageInForm = document.getElementById("new-image")
    const ramenImageToAdd = document.createElement('img')
    const ratingInForm = document.getElementById("new-rating")
    const commentInForm = document.getElementById("new-comment")
    const newRamen = {
      id: ramensArray.length,
      name: nameInForm.value, 
      restaurant: restaurantInForm.value,
      image: imageInForm.value,
      rating: ratingInForm.value,
      comment: commentInForm.value
    }

    ramenImageToAdd.src = imageInForm.value
    ramenImageToAdd.addEventListener('click', () => {
      handleClick(newRamen)
  })
    const ramenMenu = document.getElementById("ramen-menu")
    ramenMenu.appendChild(ramenImageToAdd)
    
    event.target.reset()
  })
}


const displayRamens = () => {
  //Should fetch all ramens and display them as <img> inside #ramen-menu
  fetch('http://localhost:3000/ramens')
  .then(response => response.json())
  .then(ramens => {
    ramens.forEach(ramen => {
      ramensArray.push(ramen)
      const ramenImage = document.createElement('img')
      ramenImage.src = ramen.image
      const ramenMenu = document.getElementById("ramen-menu")
      ramenMenu.appendChild(ramenImage)

      ramenImage.addEventListener('click', () => {
        handleClick(ramen)
      })
    })
    handleClick(ramens[0])
  })
};




//Update Feature
const updateFeature = () => {
  const editMenu = document.getElementById('edit-ramen')
  editMenu.addEventListener('submit', (event) => {
    event.preventDefault()
    const newRating = document.getElementById("edit-rating")
    const ramenRating = document.getElementById("rating-display")
    ramenRating.textContent = newRating.value
    const newComment = document.getElementById("edit-comment")
    const ramenComment = document.getElementById("comment-display")
    ramenComment.textContent = newComment.value
  })
}

updateFeature()


//Delete feature
const deleteButton = document.querySelector("button")
const ramenToDelete = document.querySelector("#ramen-to-delete")
deleteButton.addEventListener("click", handleDelete) //call the handleDelete fucntion when delete button is clicked
function handleDelete() { //this should remove the ramen from the .json file
  fetch (`http://localhost:3000/ramens/${ramenToDelete.value}`, {method: 'DELETE'})
}


const main = () => {
  //Deliverable 1
  document.addEventListener('DOMContentLoaded', () => {
    displayRamens()
    addSubmitListener()
  })
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
