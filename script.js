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
  { firstName: "Emily", lastName: "Garcia", date: "2017-09-28" },
  { firstName: "Grace", lastName: "Anderson", date: "2011-10-15" },
  { firstName: "Henry", lastName: "Thomas", date: "2024-03-01" },
];

const tableBody = document.querySelector("tbody");

//1 this section sets up the year groups

let groupedData = {};
let uniqueGroup = [];

/*
let uniqueGroup = data.filter(item => {
  const year = new Date(item.full_date).getFullYear();
//return data.every(obj => obj === item | new Date(obj.full_date).getFullYear() !== year);
  return data.filter(obj => new Date(obj.full_date).getFullYear() === year).length === 1;
  // I need the return to give me the items whose year !== other years 
});
*/

console.log("unique group", uniqueGroup);

data.forEach((item) => {
  const year = new Date(item.date).getFullYear(); //
  const person = {
    date: item.date,
    firstName: item.firstName,
    lastName: item.lastName,
  };

  if (!groupedData[year]) {
    groupedData[year] = []; // ! for negative
  }
  groupedData[year].push(person); // I need to get back to this part. Does push just add to array?
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
  <tr class="table-rowA">
    <td class="btn btn-link" data-bs-toggle="collapse" data-bs-target="[id^='content${year}']" onclick="toggleChevron(this)">
    ${yearCellContent}  <i class="bi bi-chevron-down chevron"></i></td>
  </tr>

  `;
  for (let i = 0; i < groupedData[year].length; i++) {
    //note: my form check has two faces. It both collapses the specific year row and deletes it too.
    //I did the collapse first, then kept the code to show why I use this data-bs-target="[id^='content${year}']"

    html += `
    <tr class="collapse" id="content${year}-${i}">
  
      <td><div class="form-check" data-bs-toggle="collapse" data-bs-target="#content${year}-${i}" onclick="deleteRow(this)">
      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault${i}">
      </div></td>
      <td>${groupedData[year][i].date}</td>
      <td>${groupedData[year][i].firstName}</td>
      <td>${groupedData[year][i].lastName}</td>
      </tr>
    `;
  }
  tableBody.insertAdjacentHTML("beforeend", html);

  function deleteRow(element) {
    let row = element.closest('tr');
    row.remove();
  }

  function toggleChevron(element) {
    let chevron = element.querySelector("i");
    chevron.classList.toggle("bi-chevron-down");
    chevron.classList.toggle("bi-chevron-up");
  }

  /*
  const dateCell = document.createElement("td");
  dateCell.textContent = groupedData[year][0].date;
  row.appendChild(dateCell);

  const firstNameCell = document.createElement("td");
  firstNameCell.textContent = groupedData[year][0].firstName;
  row.appendChild(firstNameCell);

  const lastNameCell = document.createElement("td");
  lastNameCell.textContent = groupedData[year][0].lastName;
  row.appendChild(lastNameCell);

  tableBody.appendChild(row);

  // 4 this section loops through remaining people in the year and creates separate rows
  for (let i = 1; i < groupedData[year].length; i++) {
    const person = groupedData[year][i];
    //i = 1 so that we skip the 0 index
    const row = document.createElement("tr");
    row.classList.add("collapse");
    row.setAttribute("id", `collapse${year}`); // these 3 lines helped hid my empty row lines

    const date1Cell = document.createElement("td");
    date1Cell.textContent = "";
    row.appendChild(date1Cell);

    const dateCell = document.createElement("td");
    dateCell.textContent = person.date;
    dateCell.classList.add("collapse");
    dateCell.setAttribute("id", `collapse${year}`);
    row.appendChild(dateCell);

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = person.firstName;
    firstNameCell.classList.add("collapse");
    firstNameCell.setAttribute("id", `collapse${year}`);
    row.appendChild(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = person.lastName;
    lastNameCell.classList.add("collapse");
    lastNameCell.setAttribute("id", `collapse${year}`);
    row.appendChild(lastNameCell);

    tableBody.appendChild(row);
    
  }
*/
}
