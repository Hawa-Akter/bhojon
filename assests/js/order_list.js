const electron = require("electron");
const { ipcRenderer } = electron;

const table = document.getElementById("datas")
const food_varient_table = document.getElementById("food_varient_datas")
const food_availability_table = document.getElementById("food_availability_datas")


function orderList(evt, orderFood) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(orderFood).style.display = "block";
  evt.currentTarget.className += " active";
}


//foods page result
document.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.send("foodWindowLoaded");
});
ipcRenderer.on("resultSentFromFoods", function (event, result) {
  console.log("The result is ", result);
  table.innerHTML = "";
  var tr = "";
  result.forEach(x => {
    tr += '<tr>';
    tr += '<td>' + x.id + '</td>' + '<td>' +'<img src="'+ x.product_image + '" height="30" width="50">' + '</td>' + '<td>' + x.name + '</td>' + '<td>' + x.product_name + '</td>' + '<td>' + x.component + '</td>' + '<td>' + x.product_vat + '</td>' + '<td>' + (x.products_is_active == 1 ? "Active" : "Inactive") + '</td>'
    tr += '</tr>'


  })
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
  result.forEach(x => {
    tr += '<tr>';
    tr += '<td>' + x.id + '</td>' + '<td>' + x.name + '</td>' + '<td>' + x.product_name + '</td>'
    tr += '</tr>'


  })
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
  result.forEach(x => {
    tr += '<tr>';
    tr += '<td>' + x.id + '</td>' + '<td>' + x.product_name + '</td>' + '<td>' + x.avail_day + '</td>' + '<td>' + x.avail_time + '</td>'
    tr += '</tr>'


  })
  food_availability_table.innerHTML += tr;
  food_availability_table.style.fontSize = "12px";

});
