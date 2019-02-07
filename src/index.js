const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector("#toy-collection")
const toyInput = document.querySelector(".add-toy-form")


let addToy = false

state = {
  toys: [],
  currentToy: []
}

const TOYS = [
  {
    "id": 1,
    "name": "Woody",
    "image": "http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png",
    "likes": 5
  },
  {
    "id": 2,
    "name": "Buzz Lightyear",
    "image": "http://www.pngmart.com/files/6/Buzz-Lightyear-PNG-Transparent-Picture.png",
    "likes": 8
  },
  {
    "id": 3,
    "name": "Mr. Potato Head",
    "image": "https://vignette.wikia.nocookie.net/universe-of-smash-bros-lawl/images/d/d8/Mr-potato-head-toy-story.gif/revision/latest?cb=20151129131217",
    "likes": 3
  },
  {
    "id": 4,
    "name": "Slinky Dog",
    "image": "https://www.freeiconspng.com/uploads/slinky-png-transparent-1.png",
    "likes": 4
  },
  {
    "id": 5,
    "name": "Rex",
    "image": "http://umich.edu/~chemh215/W11HTML/SSG5/ssg5.2/FRex.png",
    "likes": 1
  },
  {
    "id": 6,
    "name": "Bo Peep",
    "image": "http://4.bp.blogspot.com/_OZHbJ8c71OM/Sog43CMFX2I/AAAAAAAADEs/0AKX0XslD4g/s400/bo.png",
    "likes": 2
  },
  {
    "id": 7,
    "name": "Hamm",
    "image": "https://cdn140.picsart.com/244090226021212.png?r1024x1024",
    "likes": 0
  },
  {
    "id": 8,
    "name": "Little Green Men",
    "image": "http://www.pngmart.com/files/3/Toy-Story-Alien-PNG-File.png",
    "likes": -2
  }
]


// YOUR CODE HERE




addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!

function displayToys() {
  toyCollection.innerHTML = ''
  state.toys.forEach(toy => {
    newToy = document.createElement("div")
    newToy.className = "card"
    newToy.innerHTML = `<h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
  </div >`
    likeButton = document.createElement('button')
    likeButton.className = "like-btn"
    likeButton.id = toy.id
    likeButton.innerText = "Like!"
    likeButton.addEventListener('click', () => {
      state.currentToy = state.toys.find(value => value.id === toy.id)
      state.currentToy.likes += 1
      addLikes()
      displayToys()

    })
    newToy.append(likeButton)
    toyCollection.append(newToy)
  })
}

function makeNewToy() {
  state.currentToy = {}
  state.currentToy.name = toyInput.name.value
  state.currentToy.image = toyInput.image.value
  state.currentToy.likes = 0
  state.toys.push(state.currentToy)
  postToy()
  displayToys()
  console.log(state.currentToy)
}

function addLikes() {
  return fetch(`http://localhost:3000/toys/${state.currentToy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(state.currentToy)
  })
}


function postToy() {
  return fetch(`http://localhost:3000/toys/`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state.currentToy)
  })
}

function getToy() {
  fetch('http://localhost:3000/toys').then(response => { return response.json() }).then(resp => state.toys = resp).then(displayToys)
}

toyInput.submit.addEventListener('click', () => makeNewToy())


getToy()