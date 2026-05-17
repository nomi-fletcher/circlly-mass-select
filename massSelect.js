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


const deleteButton = document.createElement("button");
deleteButton.innerText = "Remove items?";

// Source - https://stackoverflow.com/a/40284425
// Posted by FlatLander, modified by community. See post 'Timeline' for change history
// Retrieved 2026-05-16, License - CC BY-SA 4.0
//modified to use DELETE

function prepareDeletion(ids) {

    let url = window.location.origin;

    return fetch(url, {
        method: 'DELETE',
        body: ids
    }).then(response => response.json())
}

function massDelete() {
    let data = [];
    tableBody.forEach(row => {
        let checkBox = row.querySelector("input");
        let link = row.querySelectorAll('[data-method="delete"]');
        console.log(link);
        let favItem = link[0].href;
        if(checkBox.checked){
            data.push(favItem);
        }
    })
    console.log(data);
    prepareDeletion(data);

}

deleteButton.addEventListener("click", ()=>{
  if(confirm("Would you like to remove all selected items from your watchlist?")){
    console.log("Perform deletion");
    massDelete();
    
} 
    else{
        console.log("Deletion aborted");
    }
}

);

itemTable.append(deleteButton);

