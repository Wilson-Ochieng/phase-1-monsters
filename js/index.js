document.addEventListener("DOMContentLoaded", () => {
    fetchMonster(), createForm()
    document.querySelector("#monster-form").addEventListener('submit', (event) => {
        event.preventDefault()
        let name = document.querySelector('#monster-name').value
        let age = document.querySelector('#monster-age').value
        let description = document.querySelector('#monster-description').value

        monsterObj = {
            name: name,
            age: age,
            description: description
        }
        postNewMonster(monsterObj, event)
    })
})

let fetchMonster = () => {
fetch('http://localhost:3000/monsters/?_limit=50&page=1')
    .then(resp => resp.json())
    .then(monsterData => {
        console.log(monsterData)
        monsterData.forEach((monster) => {
            addOneMonster(monster)
        })
    })
}

let addOneMonster = (monster) => {
    let monsterContainer = document.querySelector("#monster-container")
    let card = document.createElement('div')
    let name = document.createElement('h2')
    let description = document.createElement('p')
    let age = document.createElement('h4')
    name.innerText = monster.name
    age.innerText = `Age: ${monster.age}`
    description.innerText = `Bio: ${monster.description}`

    card.append(name, age, description)
    monsterContainer.append(card)
}


let createForm = () => {
    let formContainer = document.querySelector('#create-monster')
    let form = document.createElement('form')
    form.id = 'monster-form'
    let nameInput = document.createElement('input')
    let nameLabel = document.createElement('label')
    let ageInput = document.createElement('input')
    let ageLabel = document.createElement('label')
    let descriptionInput = document.createElement('input')
    let descriptionLabel = document.createElement('label')
    let h2 = document.createElement('h2')
    let button = document.createElement('button')
    button.innerText = "Make Monster!!"

    nameInput.id = "monster-name"
    ageInput.id = "monster-age"
    descriptionInput.id = "monster-description"
    
    h2.innerHTML= 'Create Monster'
    nameLabel.innerText = 'name'
    ageLabel.innerText = 'age'
    descriptionLabel.innerText = 'description'

    form.append(nameLabel, nameInput, ageLabel, ageInput,  descriptionLabel, descriptionInput, button)
    formContainer.append(h2, form)
}

let postNewMonster = ({name, age, description}, event) => {
    event.preventDefault()
    fetch('http://localhost:3000/monsters', {
        method: "POST",
        headers:
            {
            "Content-Type": "application/json",
            Accept: "application/json"
            },
        body: JSON.stringify({name, age, description })
        })
    .then(resp => resp.json())
    .then(monster => {
        addOneMonster(monster)
        event.target.reset()
    })
}