let array = [
    { Time: "10:00am", Place: "Leave hotel" },
    { Time: "10:00am - 10:30am", Place: "Travel from Hotel to Puffer's Pond" },
    { Time: "10:30am - 11:30am", Place: "Stay in Puffer's Pond" },
    { Time: "11:30am - 12:00pm", Place: "Travel from Puffer's Pond to DuBois" },
    { Time: "12:00am - 12:45pm", Place: "Stay in DuBois" }
  ];

  function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }
  
  function generateTable(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }
  
  let table = document.querySelector("table");
  let data = Object.keys(array[0]);
  generateTableHead(table, data);
  generateTable(table, array);