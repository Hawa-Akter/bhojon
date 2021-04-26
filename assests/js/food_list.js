const electron = require("electron");
const { ipcRenderer } = electron;

const listBtn = document.getElementById("listBtn");
const table = document.getElementById("datas");
const myList = document.getElementById("myList");
const food_varient_table = document.getElementById("food_varient_datas");
const food_availability_table = document.getElementById(
  "food_availability_datas"
);

function foods(evt, checkingFood) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(checkingFood).style.display = "block";
  evt.currentTarget.className += " active";
}

function getId(id) {
  console.log("Getting the category id", id);
}
ipcRenderer.send("CategoryIdSent", get);
//food list grp data
document.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.send("newOrderCategoryItemLoaded");
});

ipcRenderer.on("replySentCategoryListResult", function (event, results) {
  console.log("The result is ", results);
  // myList.innerHTML = "";
  // var ul = "";
  // results.forEach(x => {
  //   ul += '<ul>';
  //   ul += '<li>' + x.name + '</li>'
  //   ul += '</ul>'

  // });
  // myList.innerHTML += ul;

  // Create an unordered list
  var list = document.createElement("ul");

  // Create a list item for each wizard
  // and append it to the list
  results.forEach(function (result) {
    var li = document.createElement("li");
    li.textContent = result.name;
    list.appendChild(li);
  });

  // Log
  console.log(list);

  // Inject into the DOM
  myList.appendChild(list);
});

//foods page result
document.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.send("foodWindowLoaded");
});
ipcRenderer.on("resultSentFromFoods", function (event, result) {
  console.log("The result is ", result);
  table.innerHTML = "";
  var tr = "";
  result.forEach((x) => {
    tr += "<tr>";
    tr +=
      `<td id=${x.id} onclick = {getId(${x.id})}>` +
      x.id +
      "</td>" +
      `<td id=${x.id}>` +
      '<img src="' +
      x.product_image +
      '" height="30" width="50">' +
      "</td>" +
      `<td id=${x.id}>` +
      x.name +
      "</td>" +
      `<td >` +
      x.product_name +
      "</td>" +
      `<td id=${x.id}>` +
      x.component +
      "</td>" +
      `<td id=${x.id}>` +
      x.product_vat +
      "</td>" +
      `<td id=${x.id}>` +
      (x.products_is_active == 1 ? "Active" : "Inactive") +
      "</td>";
    tr += "</tr>";
  });
  table.innerHTML += tr;
  table.style.fontSize = "12px";
});

//foods varient result
document.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.send("foodVarientWindow");
});
ipcRenderer.on("resultSentFromFoodsVarient", function (event, result) {
  console.log("The result is ", result);
  food_varient_table.innerHTML = "";
  var tr = "";
  result.forEach((x) => {
    tr += "<tr>";
    tr +=
      "<td>" +
      x.id +
      "</td>" +
      "<td>" +
      x.name +
      "</td>" +
      "<td>" +
      x.product_name +
      "</td>";
    tr += "</tr>";
  });
  food_varient_table.innerHTML += tr;
});

//foods availability result
document.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.send("foodAvailabilityWindow");
});
ipcRenderer.on("resultSentFromFoodAvailability", function (event, result) {
  console.log("The result is ", result);
  food_availability_table.innerHTML = "";
  var tr = "";
  result.forEach((x) => {
    tr += "<tr>";
    tr +=
      "<td>" +
      x.id +
      "</td>" +
      "<td>" +
      x.product_name +
      "</td>" +
      "<td>" +
      x.avail_day +
      "</td>" +
      "<td>" +
      x.avail_time +
      "</td>";
    tr += "</tr>";
  });
  food_availability_table.innerHTML += tr;
  food_availability_table.style.fontSize = "12px";
});
