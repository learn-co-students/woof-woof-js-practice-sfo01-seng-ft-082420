// dogInfo = document.querySelector('#dog-info')
document.addEventListener('DOMContentLoaded', () => {
const dogBar = document.getElementById('dog-bar')

fetchDogs()
function fetchDogs() {
    fetch('http://localhost:3000/pups')
        .then(res => res.json())
        .then(dogs => dogs.forEach(dog => buildSpan(dog)))
}
function buildSpan(dog){
    let span = document.createElement('span')
    span.innerHTML = dog.name
    dogBar.appendChild(span)

    span.addEventListener('click', () => buildDog(dog))
    dogInfo = document.querySelector('#dog-info')
    }

function buildDog(dog) {
    dogInfo.innerHTML = ''
    let dogImg = document.createElement('img')
    dogImg.src = dog.image

    let dogTitle = document.createElement('h2')
    dogTitle.innerText = dog.name

    let dogBtn = document.createElement('button')
    dogBtn.innerText = dog.isGoodDog ? 'Good Dog' : 'Bad Dog'
    dogBtn.dataset.id = dog.id
            
        dogInfo.appendChild(dogImg)
        dogInfo.appendChild(dogTitle)
        dogInfo.appendChild(dogBtn)


        dogBtn.addEventListener('click', (e) => buttonClick(e))

     function buttonClick(e){
         let newValue;
         if (e.target.innerText.includes('Good')){
             e.target.innerText = 'Bad Dog'
             newValue = false
         }else{
             e.target.innerText = 'Good Dog'
             newValue = true
         }
         updateGoodDog(e.target.dataset.id, newValue)
         }
       
    function getIndividualDog(id){
        return fetch('http://localhost:3000/pups' + `/${id}`)
        .then(res => res.json())

    }
    
    function updateGoodDog(id, newValue){
        const options = {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                isGoodDog: newValue
            })
        }
        return fetch('http://localhost:3000/pups' + `/${id}`, options)
        .then(res => res.json())
    } 
        
        
    } 
})





