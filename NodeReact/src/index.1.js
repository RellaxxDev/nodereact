import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";

ReactDOM.render(<App />, document.getElementById("root"));


function autocomplete(inp, arr) {

  inp.addEventListener('input', function(e) {

    closeAutocompleteList();

    let val = this.value;
    if (!val) return;

    //создается контейнер для списка
    let list = document.createElement('div');
    list.setAttribute('class', 'items-list');
    this.parentNode.appendChild(list);

    //наполняется список
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() != val.toUpperCase()) continue;

      let item = document.createElement('div');
      item.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
      item.innerHTML += arr[i].substr(val.length);
      item.setAttribute('class', 'item');

      item.addEventListener('click', function() {
        inp.value = this.innerText;
      });

      list.appendChild(item);
    }
  });

  // перемещение по списку стрелками и выбор по ENTER
  inp.addEventListener('keydown', function(e) {
    let list = document.getElementsByClassName('items-list')[0];
    if (!list) return;

    let hoverElement = list.querySelector(':hover') || list.querySelector('.hover');
    
    // key DOWN
    if (e.keyCode == 40) {
      if (!hoverElement) {
        list.firstChild.classList.add('hover');
      } else {
        hoverElement.classList.remove('hover');
        let next = hoverElement.nextSibling;
        if (next) next.classList.add('hover');
      }
    // key UP 
    } else if (e.keyCode == 38) {
      if (!hoverElement) {
        list.firstChild.classList.add('hover');
      } else {
        hoverElement.classList.remove('hover');
        let previous = hoverElement.previousSibling;
        if (previous) previous.classList.add('hover');
      }
    // key ENTER
    } else if (e.keyCode == 13) {
      if (!hoverElement) return;
      inp.value = hoverElement.innerText;
      closeAutocompleteList();
    }

  });
  
}

//удаление контейнера для списка
function closeAutocompleteList() {
  let list = document.getElementsByClassName('items-list')[0];
  if (!list) return;
  list.parentElement.removeChild(list);
}
document.addEventListener('click', closeAutocompleteList);

const countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan",
                   "Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil",
                   "British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands",
                   "Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus",
                   "Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia",
                   "Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana",
                   "Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary",
                   "Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati",
                   "Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia",
                   "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia",
                   "Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand",
                   "Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines",
                   "Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe",
                   "Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea",
                   "South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan",
                   "Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu",
                   "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam",
                   "Virgin Islands (US)","Yemen","Zambia","Zimbabwe"
];

autocomplete(document.getElementById("autocompleteInput"), countries);