const electron = require("electron");
const { ipcRenderer } = electron;

const payment_method_table = document.getElementById("payment_method_datas")
const card_terminal_table = document.getElementById("card_terminal_datas")
const bank_table = document.getElementById("bank_datas")


function paymentMenu(evt, paymnt) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(paymnt).style.display = "block";
    evt.currentTarget.className += " active";
}


//Payment method result
document.addEventListener("DOMContentLoaded", () => {
    ipcRenderer.send("paymentWindowLoaded");
});

ipcRenderer.on("resultSentFromPayment", function (event, result) {
    console.log("The result is ", result);

    payment_method_table.innerHTML = "";
    var tr = "";

    result.forEach(x => {
        tr += '<tr>';
        tr += '<td>' + x.id + '</td>' + '<td>' + x.payment_method_type + '</td>' + '<td>' + (x.status == 1 ? "Active" : "Inactive") + '</td>'
        tr += '</tr>'

    })

    payment_method_table.innerHTML += tr;
    payment_method_table.style.fontSize = "12px";

});


//Card terminal result
document.addEventListener("DOMContentLoaded", () => {
    ipcRenderer.send("cardTerminalWindowLoaded");
});

ipcRenderer.on("resultSentFromCardTerminal", function (event, result) {
    console.log("The result is ", result);

    card_terminal_table.innerHTML = "";
    var tr = "";

    result.forEach(x => {
        tr += '<tr>';
        tr += '<td>' + x.id + '</td>' + '<td>' + x.terminal_name + '</td>'
        tr += '</tr>'


    })
    card_terminal_table.innerHTML += tr;

});


//bank result
document.addEventListener("DOMContentLoaded", () => {
    ipcRenderer.send("bankWindowLoaded");
});

ipcRenderer.on("resultSentFromBank", function (event, result) {

    bank_table.innerHTML = "";
    var tr = "";

    result.forEach(x => {
        tr += '<tr>';
        tr += '<td>' + x.id + '</td>' + '<td>' + x.bank_name + '</td>'
        tr += '</tr>'


    })

    bank_table.innerHTML += tr;
    bank_table.fontSize = "12px";

});
