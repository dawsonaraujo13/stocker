/***
 * Fetches the json data from the API
 */
async function getData() {
  // Fetch to GET json of all stocks
  const res = await fetch("http://localhost:8080/stocks").then((response) => {
    //parses the response as JSON
    return response.json();
  });
  // Returns the data
  return res;
}

/**
 *  Populates the table given the api data
 */
async function populateTable() {
  // Retrieves the Json data from the getData function
  const tableData = await getData();
  // Saves a reference to the tableBody of the table
  const tableBody = document.getElementById("table-body");

  //  Iterates through every row and creates the content for the cells
  tableData.forEach((row) => {
    let newRow = document.createElement("tr");
    let rowElements = Object.values(row);
    let symbol = `<a href="${rowElements[3]}" target="_blank">${rowElements[1]}</a>`;
    let company = `<a href="${rowElements[3]}" target="_blank">${rowElements[2]}</a>`;
    let price = `${rowElements[4]}`;
    let change = `<p class = "chg">0.00</p>`;
    let changePer = `<p class = "chgp">0.00%</p>`;
    for (var i = 0; i < rowElements.length; i++) {
      let newCell = document.createElement("td");
      switch (i) {
        case 0:
          newCell.innerHTML = symbol;
          break;
        case 1:
          newCell.innerHTML = company;
          break;
        case 2:
          newCell.innerHTML = price;
          break;
        case 3:
          newCell.innerHTML = change;
          break;
        case 4:
          newCell.innerHTML = changePer;
          break;
      }
      newRow.appendChild(newCell);
    }
    tableBody.appendChild(newRow);
  });
  // Sorts the table initially by stock price
  sortTableColumn(document.querySelector("table"), 2);
  // Adds listeners to all of the table headers for sorting by column
  addListeners();
  // Periodically (5s) updates all the table prices and changes
  setInterval(updateValues, 5000);
}

// Kicks off the script
populateTable();
