const electron = require("electron");
const { ipcRenderer } = electron;
const food_table = document.getElementById("food_table_datas")

document.addEventListener("DOMContentLoaded", () =>{
    ipcRenderer.send("tableWindowLoaded")

})

ipcRenderer.on("resultSentFromFoodTable", (event, result) =>{
    console.log("Food table data are: ", result)
    food_table.innerHTML = "";
    var tr = "";
    result.forEach(x => {
        tr += '<tr>'
        tr += '<td>' + x.id + '</td>' + '<td>' + x.table_name + '</td>' + '<td>' + x.person_capacity + '</td>' + '<td>' + '<img src="'+ x.table_icon + '" width="80" height="40">'+'</td>'
        tr += '</tr>'
    });
    food_table.innerHTML +=tr;
    food_table.style.fontSize = "12px";

})

{/* <img src="./assets/logo.png"> */}