// holds the current sorted column number
var globalSortedCol;

/***
 *  Sorts column given a table, column number, and ascending boolean
 */
function sortTableColumn(table, col, asc = true) {
  //Grabs all rows except for the header row
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));
  direction = asc ? 1 : -1;
  globalSortedCol = col;

  // sort each row
  const sortedRows = rows.sort((first, second) => {
    //here we will collect all the data and trim the cell for sorting purposes
    let firstColText = first
      .querySelector(`td:nth-child(${col + 1})`)
      .textContent.trim();
    let secondColText = second
      .querySelector(`td:nth-child(${col + 1})`)
      .textContent.trim();

    // This checks if the values are numbers
    if (!isNaN(parseFloat(firstColText)) && !isNaN(parseFloat(secondColText))) {
      firstColText = parseFloat(firstColText);
      secondColText = parseFloat(secondColText);
    }
    // Sorts based on direction
    return firstColText > secondColText ? 1 * direction : -1 * direction;
  });

  // remove all existing table rows
  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  // add sorrted rows
  tBody.append(...sortedRows);

  //Remember current sort by adding appropriate class
  table
    .querySelectorAll("th")
    .forEach((th) => th.classList.remove("sort-asc", "sort-desc"));
  table
    .querySelector(`th:nth-child(${col + 1})`)
    .classList.toggle("sort-asc", asc);

  table
    .querySelector(`th:nth-child(${col + 1})`)
    .classList.toggle("sort-desc", !asc);
}

// Adds listeners to all headers for sorting
async function addListeners() {
  document.querySelectorAll("th").forEach((header) => {
    header.addEventListener("click", () => {
      // Here we get the table
      const table = document.getElementById("table");
      // Here we get the array of children of the tHead to then find the index of current header
      const headerIndex = Array.prototype.indexOf.call(
        header.parentElement.children,
        header
      );

      // Check the current status of sorting so we can alternate the sort on click
      const isAscending = header.classList.contains("sort-asc");
      // Sorts in the opposite direction
      sortTableColumn(table, headerIndex, !isAscending);
    });
  });
}
