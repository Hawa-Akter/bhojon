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