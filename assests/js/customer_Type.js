const electron = require("electron");
const { ipcRenderer } = electron;

const third_party_customer_table = document.getElementById("third_party_customer_datas");
const customer_type_table = document.getElementById("customer_type_datas");


function customer(event, cmr) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cmr).style.display = "block";
    event.currentTarget.className += " active";
}

//third party customer
document.addEventListener("DOMContentLoaded", () => {
    ipcRenderer.send("thirdPartyCustomerWindowLoaded");
});

ipcRenderer.on("resultSentFromThirdPartyCustomer", function (evt, result) {

    third_party_customer_table.innerHTML = "";
    var tr = "";

    result.forEach(x => {
        tr += '<tr>';
        tr += '<td>' + x.id + '</td>' + '<td>' + x.company_name + '</td>' + '<td>' + x.comission + '</td>' + '<td>' + x.address + '</td>'
        tr += '</tr>'
    })

    third_party_customer_table.innerHTML += tr;
    third_party_customer_table.style.fontSize = "12px";
});

//customer type
document.addEventListener("DOMContentLoaded", () => {
    ipcRenderer.send("customerTypeWindowLoaded");
});

ipcRenderer.on("resultSentFromCustomerType", function (evt, result) {

    customer_type_table.innerHTML = "";
    var tr = "";

    result.forEach(x => {
        tr += '<tr>';
        tr += '<td>' + x.id + '</td>' + '<td>' + x.type_name + '</td>'
        tr += '</tr>'
    })
    
    customer_type_table.innerHTML += tr;
    customer_type_table.style.fontSize = "12px";

});