const electron = require("electron");
const { ipcRenderer } = electron;

const SI = document.getElementById("SI");
const image = document.getElementById("image");
const category_name = document.getElementById("category_name");
const parent_menu = document.getElementById("parent_menu");
const status = document.getElementById("status");
const food_data_frm_db = document.getElementById("food_data_frm_db");
var table = document.getElementById("datas");

document.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.send("mainWindowLoaded");
});
ipcRenderer.on("resultSent", function (evt, result) {
  console.log("The result is ", result);

  // for (let i of result) {
  //   SI.innerHTML = i.id;
  //   category_name.innerHTML = i.name.toString();
  //   image.innerHTML = i.category_image.toString();
  //   parent_menu.innerHTML = i.offer_start_date;
  //   status.innerHTML = i.category_is_activate.toString();
  // }

  table.innerHTML = "";
  var tr = "";
  result.forEach((x) => {
    tr += "<tr>";
    tr +="<td>" +x.id +"</td>" +"<td>" +'<img src="' + x.category_image + '" height="40" width="60">' + "</td>" +
      "<td>" +
      x.name +
      "</td>" +
      "<td>" +
      x.parent_menu +
      "</td>" +
      "<td>" +
      (x.category_is_activate == 1 ? "Active" : "Inactive") +
      "</td>";
    tr += "</tr>";
  });
  table.innerHTML += tr;
  table.style.fontSize = "12px";
  table.style.textAlign ="center";

  // if (food_data_frm_db) {
  //   for (var i = 0; i < result.length; i++) {
  //     SI.innerHTML = i;
  //     category_name.innerHTML = result[i].name.toString();
  //     image.innerHTML = result[i].category_image.toString();
  //     parent_menu.innerHTML = result[i].offer_start_date;
  //     status.innerHTML = result[i].category_is_activate.toString();
  //   }
  // }
});
