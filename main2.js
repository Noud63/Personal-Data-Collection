
import { Person } from './app2.js';

let persons = [];
let data = localStorage.getItem('persons');
const fields = [...document.querySelectorAll('.field')];

if(data) {
    persons = JSON.parse(data)
    console.log(persons)
    loadList(persons)
   }; 

 function loadList(array) {
     
    for(let el of array){
    
        const html = 
            `<div id="${el.id}" class="item">
                <div class="info">Name:<div class="name">${el.name}</div></div>
                <div class="info">Year of Birth:<div class="born">${el.yearOfBirth}</div></div>
                <div class="info">Age:<div class="age">${el.age}</div></div>
                <div class="info">Place of birth:<div class="city">${el.city}</div></div>
                <div class="info">ID:<div class="id">${el.id}</div></div>
             </div>`;
    
             document.querySelector('.container').insertAdjacentHTML('beforeend', html)
       }
};


const btn = document.querySelector('.submitBtn')
btn.addEventListener('click', addToList)

function addToList() {
    
            const name = fields[0].value;
            const yearOfBirth = parseInt(fields[1].value);
            const city = fields[2].value;
            const id = persons.length;
            
            const obj = new Person(name, yearOfBirth, city, id)
            obj['age'] = obj.age()
            
            
            if( obj.name === "" || isNaN(obj.yearOfBirth) || obj.city === "") {
                 alert("Please fill out the input fields.")
                return;
            } else {
             const html = 
                `<div id="${id}" class="item">
                    <div class="info">Name:<div class="name">${obj.name}</div></div>
                    <div class="info">Year of birth:<div class="born2">${obj.yearOfBirth}</div></div>
                    <div class="info">Age:<div class="age">${obj.age}</div></div>
                    <div class="info">Place of birth:<div class="city">${obj.city}</div></div>
                    <div class="info">ID:<div class="id">${obj.id}</div></div>
                </div>`;
  
             document.querySelector('.container').insertAdjacentHTML('beforeend', html)
             
            };

            persons.push(obj);
            localStorage.setItem('persons', JSON.stringify(persons));
            console.log(persons)
            clearFields(fields)
    
};

//Clear input fields   
function clearFields(fields) {
     for( let el of fields){
       el.value = ""
     }
};


// Clear/delete items from UI and localStorage
document.querySelector('.buttons').addEventListener('click', clearInput)
function clearInput(event) {

       const info = [...document.querySelectorAll('.info')]

    if(event.target.classList.contains('clearInputBtn')){
        for(let el of info) {
            el.remove()
        }
    }

    if(event.target.classList.contains('clearStorageBtn')){
        localStorage.clear()
        location.reload()
        }

    if(event.target.classList.contains('removeLastItemBtn')){
        const lastItem = document.querySelector('.container div.item:last-of-type')
        lastItem.remove()

        persons.splice(-1, 1)    
        localStorage.setItem('persons', JSON.stringify(persons));
        
    };
}


// Delete item by ID
const delItem = document.querySelector('.deleteItemBtn')
delItem.addEventListener('click', deleteItem)

function deleteItem(event) {
    const items = [...document.querySelectorAll('.item')]
    const itemID = document.querySelector('.itemId')
    if(event.target) {
         let ID = itemID.value
         for( let el of items) {
             if( el.id == ID) {
                 el.remove()
             }
         }
         //persons = JSON.parse(localStorage.getItem('persons'))
         persons = persons.filter( x => {
             return x.id != ID
         })
    }
        localStorage.setItem('persons', JSON.stringify(persons));
}

/*
var index = persons.map(x => {
  return x.Id;
}).indexOf(id);
*/