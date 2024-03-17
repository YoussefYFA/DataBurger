const data = [
  { firstName: "Isabella", lastName: "Lee", date: "2022-08-22" },
  { firstName: "Youssef", lastName: "Fahmi", date: "2022-01-07" },
  { firstName: "Farid", lastName: "Wahid", date: "2019-12-04" },
  { firstName: "Ghada", lastName: "Ali", date: "2013-10-15" },
  { firstName: "Hamza", lastName: "Tariq", date: "2021-03-01" },
  { firstName: "Isra", lastName: "Lutfi", date: "2022-08-22" },
  { firstName: "Amina", lastName: "Sulaiman", date: "2014-01-23" },
  { firstName: "Bilal", lastName: "Jabir", date: "2018-02-06" },
  { firstName: "Khalid", lastName: "Ibrahim", date: "2016-07-11" },
  { firstName: "Dina", lastName: "Mustafa", date: "2015-05-19" },
  { firstName: "Emir", lastName: "Ghazi", date: "2017-09-28" },
  { firstName: "Jacob", lastName: "Robinson", date: "2022-01-07" },
  { firstName: "Frank", lastName: "Wilson", date: "2019-12-04" },
  { firstName: "Henry", lastName: "Thomas", date: "2021-03-01" },
  { firstName: "Alice", lastName: "Smith", date: "2014-01-23" },
  { firstName: "Bob", lastName: "Johnson", date: "2018-02-06" },
  { firstName: "Charlie", lastName: "Brown", date: "2016-07-11" },
  { firstName: "David", lastName: "Miller", date: "2015-05-19" },
  // { firstName: "David", lastName: "Miller", date: "2015-05-19" },
  { firstName: "Emily", lastName: "Garcia", date: "2017-09-28" },
  { firstName: "Grace", lastName: "Anderson", date: "2011-10-15" },
  { firstName: "Henry", lastName: "Thomas", date: "2024-03-01" },
];

const tableBody = document.querySelector("tbody");

// this section groups the data by year

let groupedData = {};
let uniqueGroup = [];

console.log("unique group", uniqueGroup);

data.forEach((item) => {
  const year = new Date(item.date).getFullYear();
  const person = {
    date: item.date,
    firstName: item.firstName,
    lastName: item.lastName,
  };

  if (!groupedData[year]) {
    groupedData[year] = []; // ! for negative
  }
  groupedData[year].push(person);
});

Object.keys(groupedData).forEach((year) => {
  if (groupedData[year].length === 1) {
    uniqueGroup = uniqueGroup.concat(groupedData[year]);
    delete groupedData[year];
  }
});

groupedData["Unique"] = uniqueGroup;
console.log(groupedData);

//tableBody.innerHTML = ""; // Clear existing rows if needed

for (const year in groupedData) {
  const isUniqueYear = groupedData[year].length === 1;
  const yearCellContent = isUniqueYear ? "Unique" : year;

  let html = ``;

  html += `
  <tr class="yearRow">
    <td class="year-button" colspan="1" data-bs-toggle="collapse" onclick="toggleChevron(this)" data-bs-target="[id^='content${year}']"">
    ${yearCellContent}  <i class="bi bi-chevron-down"></i></td> <td></td><td></td><td></td>
  </tr>
  
  `;
  for (let i = 0; i < groupedData[year].length; i++) {
   
    html += `
    <tr class="collapse" id="content${year}-${i}">
  
      <td><div class="form-check" onchange="highlightRow(this)">
      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault${i}">
      </div></td>
      <td>${groupedData[year][i].date}</td>
      <td>${groupedData[year][i].firstName}</td>
      <td>${groupedData[year][i].lastName}</td>
      </tr>
    `;
  }
  tableBody.insertAdjacentHTML("beforeend", html);


  
  //old full td code:
  //<td><div class="form-check" data-bs-toggle="collapse" data-bs-target="#content${year}-${i}" onclick="deleteRow(this)">

  function highlightRow(element) {
    let row = element.closest("tr");
    let checkbox = row.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      row.classList.add("highlighted-Row");
    } else {
      row.classList.remove("highlighted-Row");
    }
    // makes it highlight the active checked rows
    // row.remove();
  }

  function toggleChevron(element) {
    let chevron = element.querySelector("i");
    let row = element.closest("tr");
    let yearGroup = row.querySelector(".year-button").textContent.trim();

    console.log("chevron year:", year);
    chevron.classList.toggle("bi-chevron-down");
    chevron.classList.toggle("bi-chevron-up");

    if (yearGroup === "Unique") {
      const rows = document.querySelectorAll(`[id^='contentUnique']`);
      console.log(rows);
      rows.forEach((row) => {
      row.classList.remove("hide");
      
    });
  }
}}

//The search function starts here

let search = document.querySelector(".input-group input"),
  table_rows = document.querySelectorAll("tbody tr");

search.addEventListener("input", searchTable);

function searchTable() {

  table_rows.forEach((row, i) => {
    if (search.value === "" && !row.classList.contains("yearRow")) {
      row.classList.remove("show");
      row.classList.remove("hide");
      console.log("empty search");
    } else {
      row.classList.add("show");
      let table_data = row.textContent.toLowerCase(),
        search_data = search.value.toLowerCase();
      row.classList.toggle("hide", table_data.indexOf(search_data) < 0);
      // need to get back to next line to change the --delay value
      //row.style.setProperty("--delay", i / 25 + "s");

    }
  });
}
