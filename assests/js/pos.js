const electron = require("electron");
const { ipcRenderer } = electron;

const myList = document.getElementById("myItemList")
const customer_type_dropdown = document.getElementById("customer_type_dropdown")


const food_varient_table = document.getElementById("food_varient_datas")
const food_availability_table = document.getElementById("food_availability_datas")
const allList = document.getElementById("allCategoryByList")
const all_food_category_list = document.getElementById("food_category_list")



function pos(evt, posSytem) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(posSytem).style.display = "block";
    evt.currentTarget.className += " active";
}



document.addEventListener("DOMContentLoaded", () => {
    ipcRenderer.send("customerTypeDropdownLoaded")

})

ipcRenderer.on("replySentCustomerTypeDropdown", function (evt, results){
    console.log("Customer type dropdown list", results);

   
    customer_type_dropdown.innerHTML = "";
    var option = ""

    results.forEach(x => {
        option += '<option value="3">' + x.type_name + '</option>'

    });

    customer_type_dropdown.innerHTML += option;
    console.log(customer_type_dropdown)
    
 
})

allList.addEventListener("click", () => {
    ipcRenderer.send("allCategoryListLoaded")
})

ipcRenderer.on("replySentAllCategory", function (evt, results) {
    console.log("ALl category for lists", results);

    
    all_food_category_list.innerHTML = "";
    var div = "";

    results.forEach(x => {
        div += '<div class="card col-md-2" style="width: 12rem; height: 170px; margin: 4px;">'
        div += '<img src="' + x.category_image + '" height="100" width="206" class="card-img-top">'
        div += '<div class="card-body">'
        div += '<p><a href="#" style="text-decoration:none; color:black; text-align: center;">' + x.name + '</a></p>'
        div += '</div>'

        div += '</div>'

    });

    all_food_category_list.innerHTML += div;
    console.log(all_food_category_list);

})

//new order result
document.addEventListener("DOMContentLoaded", () => {
    ipcRenderer.send("newOrderCategoryItemLoaded");
});


ipcRenderer.on("replySentCategoryListResult", function (event, results) {
    console.log("The result is ", results);

    // Create an unordered list
    var list = document.createElement('ul');

    // Create a list item for each wizard
    // and append it to the list
    results.forEach(function (result) {
        var li = document.createElement('li');
        var a = document.createElement('a')

        a.textContent = result.name;
        li.appendChild(a)
        list.appendChild(li);
    });

    console.log(list);

    // Inject into the DOM
    myList.appendChild(list);

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
