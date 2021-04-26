const electron = require("electron");
const { ipcMain } = electron;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const { Menu } = electron;
const dialog = electron.dialog;
const { Notification } = require("electron");



const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./database.sqlite",
  },
  useNullAsDefault: true,
});


let window;
function createWindow() {
  window = new BrowserWindow({
    // width: 414,
    // height: 736,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  window.loadFile("assests/html/index.html");
  window.maximize();
}

//food window
var foodWin = null;
function openFoodsWindow() {
  if (foodWin) {
    foodWin.focus();
    return;
  }

  foodWin = new BrowserWindow({
    height: 230,
    width: 414,
    resizable: false,
    title: "Foods",
    minimizable: false,
    fullscreenable: false,
    parent: window,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  foodWin.loadFile("assests/html/food_list.html");
  foodWin.maximize();


  // food list grp
  ipcMain.on("newOrderCategoryItemLoaded", () => {
    let query_results = knex.select('name').from('food_category')

    query_results.then(function (rows) {
      foodWin.webContents.send("replySentCategoryListResult", rows)

    })

  })

  //retrieving foods data from database
  ipcMain.on("foodWindowLoaded", () => {
    let query_results = knex('foods')
      .join('food_category', 'foods.category_id', 'food_category.id')
      .select('foods.id', 'foods.product_image', 'food_category.name',
        'foods.product_name', 'foods.component', 'foods.product_vat', 'foods.products_is_active')

    query_results.then(function (rows) {
      foodWin.webContents.send("resultSentFromFoods", rows)

    })

  })

  //food varient data
  ipcMain.on("foodVarientWindow", () => {
    let foodVarientResult = knex('varient')
      .join('foods', 'varient.food_id', 'foods.id')
      .select('varient.id', 'varient.name', 'foods.product_name')
    
    foodVarientResult.then(function (rows) {
      foodWin.webContents.send("resultSentFromFoodsVarient", rows)

    })

  })

  // food availability data
  ipcMain.on("foodAvailabilityWindow", () => {
    let foodAvaialbilityResult = knex('food_availability')
      .join('foods', 'food_availability.food_id', 'foods.id')
      .select('food_availability.id', 'foods.product_name', 'food_availability.avail_day', 'food_availability.avail_time')
    
    foodAvaialbilityResult.then(function (rows) {
      foodWin.webContents.send("resultSentFromFoodAvailability", rows)

    })

  })



  foodWin.on("closed", () => {
    foodWin = null;
  });
}

var newWindow = null;

function openAboutWindow() {
  if (newWindow) {
    newWindow.focus();
    return;
  }

  newWindow = new BrowserWindow({
    height: 230,
    resizable: false,
    width: 414,
    title: "",
    minimizable: false,
    fullscreenable: false,
    parent: window,
    modal: true,

  });

  newWindow.loadFile("assests/html/food_list.html");

  newWindow.on("closed", function () {
    newWindow = null;
  });
}

//foodAddons window
var foodAddsOn = null;

function foodAddsOnWindow() {
  if (foodAddsOn) {
    foodAddsOn.focus();
    return;
  }

  foodAddsOn = new BrowserWindow({
    height: 230,
    resizable: false,
    width: 414,
    title: "",
    minimizable: false,
    fullscreenable: false,
    parent: window,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  foodAddsOn.loadFile("assests/html/food_addson.html");
  foodAddsOn.maximize();

  //addons Assign list
  ipcMain.on("addOnAssignListWindow", () => {
    let addsOnAssignResult = knex('add_on_assign')
      .join('foods', 'add_on_assign.food_id', 'foods.id')
      .join('add_on', 'add_on_assign.add_on_id', 'add_on.id')
      .select('add_on_assign.id', 'add_on.add_on_name', 'foods.product_name')

    addsOnAssignResult.then(function (rows) {
      foodAddsOn.webContents.send("resultSentFromFoodsAssignList", rows)

    })

  })

   //add ons 
   ipcMain.on("addOnWindow", () => {
    
    let addsOnResult = knex.select().table('add_on')
    

      addsOnResult.then(function (rows) {
      foodAddsOn.webContents.send("resultSentFromAddsOn", rows)

    })

  })


  foodAddsOn.on("closed", function () {
    foodAddsOn = null;
  });
}

//food category window
var foodCategory = null;
function foodCategoryWindow() {
  if (foodCategory) {
    foodCategory.focus();
    return;
  }

  foodCategory = new BrowserWindow({
    height: 230,
    resizable: false,
    width: 414,
    title: "",
    minimizable: false,
    fullscreenable: false,
    parent: window,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  foodCategory.loadFile("assests/html/food_category.html");
  foodCategory.maximize();
  ipcMain.on("mainWindowLoaded", () => {
    let queryResult = knex.select().table("food_category");

    queryResult.then(function (rows) {
      foodCategory.webContents.send("resultSent", rows);
    });
  });
  foodCategory.on("closed", function () {
    foodCategory = null;
  });
}

//food tables window
var foodTables = null;
function foodTableWindow() {
  if (foodTables) {
    foodTables.focus();
    return;
  }

  foodTables = new BrowserWindow({
    height: 230,
    resizable: false,
    width: 414,
    title: "",
    minimizable: false,
    fullscreenable: false,
    parent: window,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  foodTables.loadFile("assests/html/food_table.html");
  foodTables.maximize();
  ipcMain.on("tableWindowLoaded", () => {
    let queryResult = knex.select().table("food_tables");

    queryResult.then(function (rows) {
      foodTables.webContents.send("resultSentFromFoodTable", rows);
    });
  });
  foodTables.on("closed", function () {
    foodTables = null;
  });
}

//customer type window
var customerType = null;
function customerWindow() {
  if (customerType) {
    customerType.focus();
    return;
  }

  customerType = new BrowserWindow({
    height: 230,
    resizable: false,
    width: 414,
    title: "",
    minimizable: false,
    fullscreenable: false,
    parent: window,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  customerType.loadFile("assests/html/customer_type.html");
  customerType.maximize();

  // retrieving third party customer data
  ipcMain.on("thirdPartyCustomerWindowLoaded", () => {
    let thirdPartyCustomerQueryResult = knex.select().table("third_party_customer");

    thirdPartyCustomerQueryResult.then(function (rows) {
      customerType.webContents.send("resultSentFromThirdPartyCustomer", rows);
    });
  });

  //retrieving customer type data
  ipcMain.on("customerTypeWindowLoaded", () => {
    let queryResult = knex.select().table("customer_type");

    queryResult.then(function (rows) {
      customerType.webContents.send("resultSentFromCustomerType", rows);
    });
  });

  customerType.on("closed", function () {
    customerType = null;
  });

}

//Payment window
var paymentWin = null;
function paymentWindow() {
  if (paymentWin) {
    paymentWin.focus();
    return;
  }

  paymentWin = new BrowserWindow({
    height: 230,
    width: 414,
    resizable: false,
    title: "Foods",
    minimizable: true,
    fullscreenable: false,
    parent: window,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  paymentWin.loadFile("assests/html/payment.html");
  paymentWin.maximize();


  //retrieving payment method data from database
  ipcMain.on("paymentWindowLoaded", () => {
    let query_results = knex.select().table('payment_method')

    query_results.then(function (rows) {
      paymentWin.webContents.send("resultSentFromPayment", rows)

    })

  })

  //Card terminal data
  ipcMain.on("cardTerminalWindowLoaded", () => {

    let card_terminal_result = knex.select().table('card_terminal')

    card_terminal_result.then(function (rows) {
      paymentWin.webContents.send("resultSentFromCardTerminal", rows)

    })

  })

  // Bank data
  ipcMain.on("bankWindowLoaded", () => {

    let foodAvaialbilityResult = knex.select('id','bank_name').from('bank')
      
    foodAvaialbilityResult.then(function (rows) {
      paymentWin.webContents.send("resultSentFromBank", rows)

    })

  })

  paymentWin.on("closed", () => {
    paymentWin = null;
  });

}

//Order window
var orderWin = null;
function orderWindow() {
  if (orderWin) {
    orderWin.focus();
    return;
  }

  orderWin = new BrowserWindow({
    height: 230,
    width: 414,
    resizable: false,
    title: "Foods",
    minimizable: false,
    fullscreenable: false,
    parent: window,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  orderWin.loadFile("assests/html/order.html");
  orderWin.maximize();


  //retrieving payment method data from database
  ipcMain.on("paymentWindowLoaded", () => {
    let query_results = knex.select().table('payment_method')

    query_results.then(function (rows) {
      orderWin.webContents.send("resultSentFromPayment", rows)

    })

  })

  //Card terminal data
  ipcMain.on("cardTerminalWindowLoaded", () => {

    let card_terminal_result = knex.select().table('card_terminal')

    card_terminal_result.then(function (rows) {
      orderWin.webContents.send("resultSentFromCardTerminal", rows)

    })

  })

  // Bank data
  ipcMain.on("bankWindowLoaded", () => {

    let foodAvaialbilityResult = knex.select('id','bank_name').from('bank')
      
    foodAvaialbilityResult.then(function (rows) {
      orderWin.webContents.send("resultSentFromBank", rows)

    })

  })

  orderWin.on("closed", () => {
    orderWin = null;
  });

}

//POS window
var posWin = null;
function posWindow() {
  if (posWin) {
    posWin.focus();
    return;
  }

  posWin = new BrowserWindow({
    height: 230,
    width: 414,
    resizable: true,
    title: "Foods",
    minimizable: true,
    fullscreenable: false,
    parent: window,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  posWin.loadFile("assests/html/pos.html");
  posWin.maximize();



  // customer type dropdown data 
  ipcMain.on("customerTypeDropdownLoaded", () => {
    let query_results = knex.select().table('customer_type')

    query_results.then(function (rows) {
      posWin.webContents.send("replySentCustomerTypeDropdown", rows)

  })
})

//allCategory list
  ipcMain.on("allCategoryListLoaded", () =>{
    
    let query_results = knex.select().table('food_category')

    query_results.then(function (rows) {
      posWin.webContents.send("replySentAllCategory", rows)

    })

  
  })


  //retrieving payment method data from database
  ipcMain.on("newOrderCategoryItemLoaded", () => {
    let query_results = knex.select('name').from('food_category')

    query_results.then(function (rows) {
      posWin.webContents.send("replySentCategoryListResult", rows)

    })

  })

  //Card terminal data
  ipcMain.on("cardTerminalWindowLoaded", () => {

    let card_terminal_result = knex.select().table('card_terminal')

    card_terminal_result.then(function (rows) {
      posWin.webContents.send("resultSentFromCardTerminal", rows)

    })

  })

  // Bank data
  ipcMain.on("bankWindowLoaded", () => {

    let foodAvaialbilityResult = knex.select('id','bank_name').from('bank')
      
    foodAvaialbilityResult.then(function (rows) {
      posWin.webContents.send("resultSentFromBank", rows)

    })

  })

  posWin.on("closed", () => {
    posWin = null;
  });

}

const menuTemplate = [
  //start of view menu
  {
    label: "View",
    submenu: [
      {
        label: "Foods...",
        role: "Foods...",
        click: () => {
          openFoodsWindow();
        },
      },
      {
        label: "Food Add-ons...",
        role: "Food Add-ons...",
        click: () => {
          foodAddsOnWindow();
        },
      },
      {
        label: "Food Category...",
        role: "Food Category...",
        click: () => {
          foodCategoryWindow();
        },
      },
      {
        label: "Tables...",
        click: () => {
          foodTableWindow()
        }

      },

      {
        label: "Customer Type...",
        role: "Customer Type...",
        click: () => {
          customerWindow()

        }
      },
      {
        label: "Payment...",
        role: "Payment...",
        click: () => {
          paymentWindow()
        }
      },
    ],
  },

  //Start of manage order menu
  {
    label: "Manage Order",
    submenu: [
      {
        label: "Order...",
        role: "Order...",
        click: () =>{
          orderWindow()
          
        }
      },
      {
        label: "POS...",
        role: "POS...",
        click: () =>{
          posWindow()
        }
      },
    ],
  },

  //Start of setting menu
  {
    label: "Setting",
    submenu: [
      {
        label: "Application Setting...",
        role: "Application Setting...",
      },
      {
        label: "Synchronization...",
        role: "Synchronization...",
      },
    ],
  },

  //Help
  {
    role: "Help",
    submenu: [
      {
        label: "Learn More",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://electronjs.org");
        },
      },
    ],
  },
  {
    label: "r eloadDevTools",
    submenu: [
      {
        label: "DEV tools",
        role: "toggleDevTools",
      },
      {
        label: "Reload",
        role: "reload",
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);
//require("./menu/mainmenu.js");

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});
