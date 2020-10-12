import { getTimeStamp } from './timestamp.js';
import {searchBtn, entriesFound} from './search.js';

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
    
    // Clear UI data container before adding new data
       clearUI()
    
    //Add new entry
       const fields = [...document.querySelectorAll('.field')];
       
            const name = fields[0].value;
            const DOB = fields[1].value;
            let city = fields[2].value;
            city = city.charAt(0).toUpperCase() + city.slice(1)
            const firstLetter = city.slice(0, 1).toUpperCase();
            let type = DOB.split("-")[0].slice(2);
            let id = name.split(' ');
            let num = Math.floor(Math.random() * 99) + 1;
            let num2 = Math.floor(Math.random() * 99) + 1;
            if(num < 10) num = '0'+ num;
            if(num2 < 10) num2 = '0'+ num2;
            
            //Uniqui id for each entry
            id = id[0] + num2 + '-' + type + '-' + firstLetter + num;
            
            //Calculates age by date
            let age = function(DOB) {
                var birthday = +new Date(DOB);                       // + converts date object to integer
                return ~~((Date.now() - birthday) / (31557600000));  // 31557600000 ms = 24 * 3600 * 365.25 * 1000
              };                                                     // ~~ returns an integer, no decimals
            
            let entered = getTimeStamp()

            let obj = {
                name: name,
                dob: DOB,
                city: city,
                id : id,
                age: age(DOB),
                entered: entered
              };

            persons.forEach( el => {
                
            if( obj.name === el.name && obj.city === el.city && obj.dob === el.dob) {
                    alert("Data already exist!") 
                    clearFields(fields)
                    loadList(persons)  
                    obj = {}                   
                    return;
                };
            })

            if( obj.name === "" || obj.city === "" || obj.dob === "") {
                alert("Please fill out all required fields!")
                loadList(persons)                
                return;
            };
            
            //Fill in firstname AND surname
            if(obj.name.trim().indexOf(' ') == -1){
                 alert('Fill in both first and lastname!')
                 loadList(persons)
                 return
            }
            
            //regex date (yyyy-dd-mm) validation
            const regEx = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/;
           
            if(!obj.dob.match(regEx)){
                alert('Please fill out correct date format.')
                loadList(persons)
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


document.querySelector('.clearStorageBtn').addEventListener('click', clearAllData)
function clearAllData() {

    document.querySelector('.overlay').style.display = 'flex';

    document.querySelector('.yesno').addEventListener( 'click', (e) => {
        if(e.target.classList.contains('yes')){
            document.querySelector('.overlay').style.display = 'none';
            clearUI();
            persons = [];
            localStorage.setItem('persons', JSON.stringify(persons));
        } 
         
         if(e.target.classList.contains('no')){
            document.querySelector('.overlay').style.display = 'none';
            clearUI()
            loadList(persons)
         }
        })
        
}

// Clear/delete items from UI and localStorage
document.querySelector('.removeLastItemBtn').addEventListener('click', deleteLastItem)
function deleteLastItem() {
        const item = document.querySelector('.container div.item:last-of-type')
        item.remove()
        persons.splice(-1, 1)
        localStorage.setItem('persons', JSON.stringify(persons));
    };


// Delete an item by ID
const delItem = document.querySelector('.deleteItemBtn')
delItem.addEventListener('click', deleteItem)

function deleteItem() {
    
    const items = [...document.querySelectorAll('.item')];
    const itemID = document.querySelector('.itemId');

    if(itemID.value === ""){
        alert('No ID!')
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
             return x.id != ID;                
         })
            
    }
         localStorage.setItem('persons', JSON.stringify(persons));
};

