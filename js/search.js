// Search for specific entry
import { persons } from './main.js';
export let entriesFound = []

let data2 = localStorage.getItem('entriesFound') ;

        if(data2){
            entriesFound = JSON.parse(data2)
            loadList2(entriesFound)
        }
        
function loadList2(array2) {
        
            for(let el of array2) {
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
        
export const searchBtn = document.querySelector('.search').addEventListener('click' , () => {
            let name = document.querySelector('.searchInput')
            
            if(name.value === "") {
                alert('No search query!')
                return;
            }

            for( let ele of entriesFound) {
                if( ele.name === name.value) {
                      alert('You have already found what you were looking for!')
                      name.value = ""
                      return
                }
            }
        
            for(let el of persons) {
                if(el.name === name.value) {
                        addItem(el)
                        entriesFound.push(el) 
                        name.value = ""
                }
            }
        
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
        
        const searchResults = [...document.querySelectorAll('.item2')];
            for( let el of searchResults) {
                el.remove();
                entriesFound =[]
                localStorage.setItem('entriesFound', JSON.stringify(entriesFound))
            }
})
