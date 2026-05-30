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

//the following code was generated using Google's AI overview and adapted
/*const urls = ['https://a.com', 'https://b.com'];
const requests = urls.map(url => 
  fetch(url, { method: 'POST', body: JSON.stringify({ key: 'value' }) })
);

Promise.all(requests)
  .then(responses => Promise.all(responses.map(res => res.json())))
  .then(data => console.log(data))
  .catch(err => console.error(err));
*/

function prepareDeletion(ids, authToken, userAgent){

    var requests = ids.map(id => {
         fetch(id, {
            "credentials": "include",
            "headers": {
                "User-Agent": `${userAgent}`,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
                "Content-Type": "application/x-www-form-urlencoded",
                "Connection" : "keep-alive",
                "Host" : "egl.circlly.com",
                "Origin" : "https://egl.circlly.com",
                "Sec-GPC": "1",
                "Upgrade-Insecure-Requests": "1",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "same-origin",
                "Sec-Fetch-User": "?1",
                "Priority": "u=0, i",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache"
            },
            "referrer": "https://egl.circlly.com/favorites",
            "body": {
                "_method":"delete",
                "authenticity_token" : `${authToken}`
            },
            "method": "POST",
            "mode": "cors"
        });
    })

    console.log(typeof requests[0]);

    Promise.allSettled(requests)
        .then(result => console.log(result));

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

