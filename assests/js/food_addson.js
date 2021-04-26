const electron = require("electron");
const { ipcRenderer } = electron;

const add_on_assign_list_table = document.getElementById("add_on_assign_list_datas");
const add_on_table = document.getElementById("addons_datas");


function foodAddsOn(event, addsOn) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(addsOn).style.display = "block";
  event.currentTarget.className += " active";
}

//adds on assign list
document.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.send("addOnAssignListWindow");
});

ipcRenderer.on("resultSentFromFoodsAssignList", function (evt, result) {
  
  add_on_assign_list_table.innerHTML = "";
  var tr = "";
  result.forEach(x => {
    tr += '<tr>';
    tr += '<td>' + x.id + '</td>' +'<td>' + x.add_on_name + '</td>' + '<td>' + x.product_name + '</td>'
    tr += '</tr>'
   

  })
  add_on_assign_list_table.innerHTML += tr;
  add_on_assign_list_table.style.fontSize = "12px";
});

//food adds on 
document.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.send("addOnWindow");
});

ipcRenderer.on("resultSentFromAddsOn", function (evt, result) {
  
  add_on_table.innerHTML = "";
  var tr = "";
  result.forEach(x => {
    tr += '<tr>';
    tr += '<td>' + x.id + '</td>' +'<td>' + x.add_on_name + '</td>' + '<td>' + x.price + '</td>'+ '<td>' + (x.is_active == 1?"Active":"Inactive") + '</td>'
    tr += '</tr>'
   

  })
  add_on_table.innerHTML += tr;
  add_on_table.style.fontSize = "12px";
});