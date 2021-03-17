async function updateValues() {
  const green = "#6FF74E";
  const red = "#F96242";
  const table = document.querySelector("table");
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));

  rows.forEach((row) => {
    // Gets the array of cells for every row
    const children = row.children;
    // Gets the current price
    const price = parseFloat(children[2].innerHTML);
    // Changa may or may not be negative
    const sign = Math.random() < 0.5 ? -1 : 1;
    // Price change relative to price amount
    const priceChange = ((sign * Math.random() * price) / 8).toFixed(2);

    // Stock price can never fall under 0
    if (price + priceChange < 0) {
      priceChange = Math.abs(priceChange);
    }

    // Change price
    children[2].innerHTML = (
      parseFloat(price) + parseFloat(priceChange)
    ).toFixed(2);

    // price change color and sign
    if (priceChange < 0) {
      children[3].style.color = red;
      children[3].innerHTML = priceChange;
    } else if (priceChange === 0) {
      children[3].style.color = "white";
      children[3].innerHTML = priceChange;
    } else {
      children[3].style.color = green;
      children[3].innerHTML = "+" + priceChange;
    }

    // percentage pprice change color and sign
    const percent = ((priceChange / price) * 100).toFixed(2);
    if (percent < 0) {
      children[4].style.color = red;
      children[4].innerHTML = percent + "%";
    } else if (percent === 0) {
      children[4].style.color = "white";
      children[4].innerHTML = percent + "%";
    } else {
      children[4].style.color = green;
      children[4].innerHTML = "+" + percent + "%";
    }
  });

  //gets current sorted column header
  const head = document.querySelectorAll("th");

  // checks header class to see which way it was sorted
  const isAscending = head[globalSortedCol].classList.contains("sort-asc");

  // Sorts apropriately
  sortTableColumn(table, globalSortedCol, isAscending);
}
