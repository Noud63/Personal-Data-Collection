// Search for specific entry
import { persons } from './main.js';
export let entriesFound = []

let data2 = localStorage.getItem('entriesFound') ;

        if(data2){
            entriesFound = JSON.parse(data2);
            loadList2(entriesFound);
        }
        
function loadList2(array2) {
        
            for(let el of array2) {
                const html = 
                    `<div id="${el.id}" class="item2">
                        <div class="info2">Name:<div class="name2">${el.name}</div></div>
                        <div class="info2">Date of birth:<div class="born2">${el.dob}</div></div>
                        <div class="info2">Age:<div class="age2">${el.age}</div></div>
                        <div class="info2">Place of birth:<div class="city2">${el.city}</div></div>
                        <div class="info2">ID:<div class="id2">${el.id}</div></div>
                        <div class="info2">Entered:<div class="added2">${el.entered}</div></div>
                     </div>`;
        
             document.querySelector('.searchResult').insertAdjacentHTML('beforeend', html)
            }
        };
        
export const searchBtn = document.querySelector('.search').addEventListener('click' , () => {

        let name = document.querySelector('.searchInput')

            if(name.value === "") {
                alert('No search query!')
                return;
            }

            if(entriesFound.length > 0){
                for(let el of entriesFound){
                    if(el.name === name.value) {
                        alert('You have found that one already!')
                        name.value = ""
                        return;
                    }
                }
            }

            if(persons.length > 0 ){
                for(let el of persons) {
                    if(el.name === name.value) {
                        addItem(el)
                        entriesFound.push(el)
                    }
                }
            }else if(persons.length === 0 ){
                alert('No data!')
                name.value = ""
                return;
            }
            
        let noMatch = persons.every( el => el.name !== name.value)
            console.log(noMatch)
            if(noMatch === true){
                alert('No match!');
                name.value = ""
                return;
            }
            
                console.log(entriesFound)
                console.log(persons)
                name.value = ""
                localStorage.setItem('entriesFound', JSON.stringify(entriesFound))
        });
        
function addItem(entry) {
           
                const html = 
                    `<div id="${entry.id}" class="item2">
                        <div class="info2">Name:<div class="name2">${entry.name}</div></div>
                        <div class="info2">Date of birth:<div class="born2">${entry.dob}</div></div>
                        <div class="info2">Age:<div class="age2">${entry.age}</div></div>
                        <div class="info2">Place of birth:<div class="city2">${entry.city}</div></div>
                        <div class="info2">ID:<div class="id2">${entry.id}</div></div>
                        <div class="info2">Entered:<div class="added2">${entry.entered}</div></div>
                     </div>`;
            
             document.querySelector('.searchResult').insertAdjacentHTML('beforeend', html)
        };
        
const clearResult = document.querySelector('.clearResultsBtn').addEventListener('click', () => {
        
        const searchResults = [...document.querySelectorAll('.item2')];
            for( let el of searchResults) {
                el.remove();
                entriesFound = []
                localStorage.setItem('entriesFound', JSON.stringify(entriesFound))
            }
});
