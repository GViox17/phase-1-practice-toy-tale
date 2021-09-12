const TOY_URL = 'http://localhost:3000/toys'
let addToy = false;
const toyForm = document.querySelector('.add-toy-form')
const newToyInput = document.querySelector('#input-text')
const newToyImageUrl = document.querySelector('#image-url')
const submitNewToy = document.querySelector('#submit-new-toy')
const toyCardContainer = document.querySelector('#toy-collection')
let fetchData = () => {
  fetch(TOY_URL)
  .then(response => response.json())
  .then(json => renderToysFactory(json))
}

let renderToysFactory = (json) => {
  json.map(toy => renderToy(toy)) 
}

let renderToy = (toy) => {
  let toyCard = document.createElement('div')
  toyCard.className = 'card'
  toyCard.id= `toy-${toy.id}`

  const toyName = document.createElement('h2')
  toyName.textConent = toy.Name

  const toyImage = document.createElement('img')
  toyImage.src = toy.image
  toyImage.className = 'toy-avatar'

  const toyLikes = document.createElement('p')
  toyLikes.textContent = `${toy.likes} Likes`

  let likeBtn = document.createElement('button')
  likeBtn.className = 'like-btn'
  likeBtn.id = `${toy.id}`
  likeBtn.textContent = '♥'

  toyCard.append(toyName, toyImage, toyLikes)
  toyCardContainer.append(toyCard)
  toyCard.append(likeBtn)

  likeBtn.addEventListener('click', () => {
    addLike(toyLikes, toy.id)
  })
}

let addLike = (toyLikes, toyId) => {
  let newCardLikes = toyLikes.innerText
  let newCardLikesParse = parseInt(newCardLikes)
  newCardLikesParseIncrease = newCardLikesParse + 1
  toyLikes.innerText = `${newCardLikesParseIncrease} Likes`

  fetch(`${TOY_URL}/${toyId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      'likes': newCardLikesParseIncrease
    })
  })
  .then(response => response.json())
  .then(toy => console.log(toy))
}


let createNewToy = (event) => {
  event.preventDefault()
  fetch(TOY_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      'name' : newToyInput.value,
      'image': newToyImageUrl.value,
      'likes': 0
    })
  })
  .then(response => response.json())
  .then(data => renderToy(data))
}
// console.log(newToyInput.value, newToyImageUrl.value) 
submitNewToy.addEventListener('click', createNewToy)





fetchData()


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});