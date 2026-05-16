var addonCheckbox = document.createElement("input");
addonCheckbox.type="checkbox";
var itemTable = document.querySelector('table');

//name of class for the table of items is "auction-table watchlist table table-hover"


const itemHeader = itemTable.querySelector("thead tr");
const newHeading = document.createElement("th");
newHeading.textContent = "Select?";
itemHeader.appendChild(newHeading);
