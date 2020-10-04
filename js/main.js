// Input fields for collecting data, with localStorage
import { getTimeStamp } from './timestamp.js';
import {searchBtn} from './search.js';

export let persons = [];
let data = localStorage.getItem('persons');

if(data) {
    persons = JSON.parse(data)
    loadList(persons)
   }; 

 function loadList(array) {
   
    for(let el of array){
        const html = 
                `<div id="${el.id}" class="item">
                <div class="info">Name:<div class="name">${el.name}</div></div>
                <div class="info">Date of birth:<div class="born">${el.dob}</div></div>
                <div class="info">Age:<div class="age">${el.age}</div></div>
                <div class="info">Place of birth:<div class="city">${el.city}</div></div>
                <div class="info">ID:<div class="id">${el.id}</div></div>
                <div class="info enter">Entered:<div class="added">${el.entered}</div></div>
                </div>`;
    
             document.querySelector('.container').insertAdjacentHTML('beforeend', html)
       }
};

const btn = document.querySelector('.submitBtn')
btn.addEventListener('click', addToList)

function addToList() {
    
    // Clear entry container before adding new entry
       clearUI()
    
    //Add new entry
       const fields = [...document.querySelectorAll('.field')];
       
            const name = fields[0].value;
            const DOB = fields[1].value;
            let city = fields[2].value;
            //city = city[0].toUpperCase() + city.slice(1, city.length)
            const firstLetter = city.slice(0, 1).toUpperCase();
            let type = DOB.split("-")[0].slice(2);
            let id = name.split(' ');
            let num = Math.floor(Math.random() * 99) + 1;
            if(num < 10) {
                num = '0'+ num 
            }
            id = id[0] + '-' + type + '-' + firstLetter + num;

            let age = function(DOB) {
                var birthday = +new Date(DOB);                       // + converts date object to integer
                return ~~((Date.now() - birthday) / (31557600000));  // 31557600000 ms = 24 * 3600 * 365.25 * 1000
              };                                                     // ~~ returns an integer, no decimals
            
            let entered = getTimeStamp()

            const obj = {
                name: name,
                dob: DOB,
                city: city,
                id : id,
                age: age(DOB),
                entered: entered
              };
             
            
            if( obj.name === "" || obj.city === "" || obj.dob === "") {
                alert("Please fill out all input fields.")
                loadList(persons)                
                return;
            };
            
            //regex date (yyyy-dd-mm) validation
            const regEx = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/;
           
            if(!obj.dob.match(regEx)){
                alert('Please fill out correct date format.')
                return;
            } else {
             const html = 
                    `<div id="${obj.id}" class="item">
                    <div class="info">Name:<div class="name">${obj.name}</div></div>
                    <div class="info">Date of birth:<div class="born">${obj.dob}</div></div>
                    <div class="info">Age:<div class="age">${obj.age}</div></div>
                    <div class="info">Place of birth:<div class="city">${obj.city}</div></div>
                    <div class="info">ID:<div class="id">${obj.id}</div></div>
                    <div class="info enter">Entered:<div class="added">${obj.entered}</div></div>
                    <div class="checkandadd"><button type="submit" class="btn2">Check entry before adding</button></div>
                    </div>`;
             
             document.querySelector('.container').insertAdjacentHTML('beforeend', html)
            
            };

            persons.push(obj);
            btn.disabled = true

            //Check button attached at new entry, add entry and update UI
            const btn2 = document.querySelector('.btn2');
            btn2.addEventListener('click', () => {
                document.querySelector('.item').classList.remove('checkandadd')
                clearUI()
                loadList(persons)
                btn.disabled = false
            })
            
            localStorage.setItem('persons', JSON.stringify(persons));
            clearFields(fields);
};


//Clear UI
function clearUI() {
    const info = [...document.querySelectorAll('.item')]
    for(let el of info) {
        el.remove()
    }
}


// Clear input fields    
function clearFields(fields) {
     for( let el of fields){
       el.value = ""
     }
};


// Clear/delete items from UI and localStorage
document.querySelector('.buttons').addEventListener('click', clearInput)
function clearInput(event) {
       
       const info = [...document.querySelectorAll('.item')]
       
    if(event.target.classList.contains('clearInputBtn')){
        clearUI()
    }

    if(event.target.classList.contains('clearStorageBtn')){
        localStorage.removeItem('persons')
        location.reload()
        }

    if(event.target.classList.contains('removeLastItemBtn')){
        const item = document.querySelector('.container div.item:last-of-type')
        item.remove()
        persons.splice(-1, 1)
        localStorage.setItem('persons', JSON.stringify(persons));
    };
}


// Delete an item by ID
const delItem = document.querySelector('.deleteItemBtn')
delItem.addEventListener('click', deleteItem)

function deleteItem() {
    
    const items = [...document.querySelectorAll('.item')];
    const itemID = document.querySelector('.itemId');

    if(itemID.value === ""){
        alert('No ID inserted!')
        return;
    }else{
        let ID = itemID.value
         for( let el of items) {
             if( el.id == ID) {
                 el.remove()
                 itemID.value =""
             }
         };
         
         persons = persons.filter( x => {
             return x.id != ID               
         })
            
    }
         localStorage.setItem('persons', JSON.stringify(persons));
};

