// Search for specific entry
import { persons } from './main.js';

let entriesFound = []
let data = localStorage.getItem('entriesFound') ;

if(data){
    entriesFound = JSON.parse(data)
    loadList(entriesFound)
}

function loadList(array) {

    for(let el of array) {
        const html = 
        `<div id="${el.id}" class="item2">
        <div class="info2">Name:<div class="name">${el.name}</div></div>
        <div class="info2">Date of birth:<div class="born">${el.dob}</div></div>
        <div class="info2">Age:<div class="age">${el.age}</div></div>
        <div class="info2">Place of birth:<div class="city">${el.city}</div></div>
        <div class="info2">ID:<div class="id">${el.id}</div></div>
        <div class="info2">Entered:<div class="added">${el.entered}</div></div>
        </div>`;

     document.querySelector('.searchResult').insertAdjacentHTML('beforeend', html)
    }
}

export const searchBtn = document.querySelector('.search').addEventListener('click' , function() {
    const name = document.querySelector('.searchInput')
     persons.forEach( el => {
      if(el.name === name.value) {
           addItem(el)
           entriesFound.push(el);
        }
    })
        name.value = ""
        localStorage.setItem('entriesFound', JSON.stringify(entriesFound))
})

function addItem(entry) {
   
        const html = 
                `<div id="${entry.id}" class="item2">
                <div class="info2">Name:<div class="name">${entry.name}</div></div>
                <div class="info2">Date of birth:<div class="born">${entry.dob}</div></div>
                <div class="info2">Age:<div class="age">${entry.age}</div></div>
                <div class="info2">Place of birth:<div class="city">${entry.city}</div></div>
                <div class="info2">ID:<div class="id">${entry.id}</div></div>
                <div class="info2">Entered:<div class="added">${entry.entered}</div></div>
                </div>`;
    
             document.querySelector('.searchResult').insertAdjacentHTML('beforeend', html)
        
}

const clearResult = document.querySelector('.clearResultsBtn')
clearResult.addEventListener('click', () => {
    document.querySelector('.searchResult').innerHTML = ""
    
    localStorage.removeItem('entriesFound')
    localStorage.setItem('entriesFound', entriesFound = [])
})

