const itemTable = document.querySelector('table');

//name of class for the table of items is "auction-table watchlist table table-hover"

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

async function prepareDeletion(ids, authToken) {
    const requests = ids.map(async (id) => {
        const response = await fetch(id, {
            method: "POST",
            credentials: "include",
            headers: {
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Content-Type": "application/x-www-form-urlencoded",
                "Origin": "https://egl.circlly.com",
                "Cache-Control": "no-cache",
                "Pragma": "no-cache"
            },
            referrer: "https://egl.circlly.com/favorites",
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

