const itemTable = document.querySelector('table');

//name of class for the table of items is "auction-table watchlist table table-hover"

const itemHeader = itemTable.querySelector("thead tr");
const newHeading = document.createElement("th");
newHeading.textContent = "Select?";
itemHeader.appendChild(newHeading);

const tableBody = itemTable.querySelectorAll("tbody tr");

function addCheckboxes() {
			tableBody.forEach(row => {
                let newCell = document.createElement("td");
                let newCheckbox = document.createElement("input");
                newCheckbox.setAttribute('type', 'checkbox');
				row.appendChild(newCell);
                newCell.appendChild(newCheckbox); 
			});
		}
        
addCheckboxes();


