const itemTable = document.querySelector('table');
const site = window.location.hostname;
console.log(site)
//name of class for the table of items is "auction-table watchlist table table-hover"
//the below code adds a column to the table that creates checkboxes next to each item
//and creates a button to initiate a deletion of the selected items

const itemHeader = itemTable.querySelector("thead tr");
const newHeading = document.createElement("th");
newHeading.textContent = "Select?";
itemHeader.appendChild(newHeading);

const tableBody = itemTable.querySelectorAll("tbody tr");

var authToken = document.querySelector('meta[name="csrf-token"]').content;
var userAgent = Navigation.userAgent;

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

//the below function takes the urls of the items that are selected and the authToken from the browser
//and deletes the selected items

async function prepareDeletion(ids, authToken) {
    const requests = ids.map(async (id) => {
        const response = await fetch(id, {
            method: "POST",
            credentials: "include",
            headers: {
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Content-Type": "application/x-www-form-urlencoded",
                "Origin": site,
                "Cache-Control": "no-cache",
                "Pragma": "no-cache"
            },
            referrer: `https://${site}/favorites`,
            body: new URLSearchParams({
                _method: "delete",
                authenticity_token: authToken
            })
        });

        const text = await response.text();

        if (!response.ok) {
            throw new Error(
                `Deletion failed for ${id}: ${response.status} ${response.statusText}\n${text}`
            );
        }

        return {
            id,
            status: response.status,
            body: text
        };
    });

    const results = await Promise.allSettled(requests);

    console.log("Deletion results:", results);

    return results;
}

//finds all items that have been selected for deletion and executes deletion
function massDelete() {
    let data = [];
    tableBody.forEach(row => {
        let checkBox = row.querySelector("input");
        let link = row.querySelectorAll('[data-method="delete"]');
        //console.log(link);
        let favItem = link[0].href;
        if(checkBox.checked){
            data.push(favItem);
        }
    })
    console.log(data);
    prepareDeletion(data, authToken, userAgent);

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

