const PROFILE_POPUP_ID = "profile_popup"

let header = {
  view: "toolbar", 
  css: "webix_dark", 
  paddingX: 10, 
  cols: [
    { 
      view: "label", 
      label: "My App" 
    },
    { },
    { 
      view: "button", 
      label: "Profile", 
      type: "icon", 
      icon: "wxi-user",
      width: 100, 
      align: "right", 
      css: "webix_transparent",
      popup: PROFILE_POPUP_ID
    }
  ]
};

let sideMenu = {
  paddingY: 10,
  gravity: 0.1,
  rows: [
    {
      view: "list",
      select: true,
      borderless: true,
      scroll: false,
      data: [ "Dashboard", "Users", "Products", "Admin" ],
      on: {
        onAfterSelect: (id) => $$(id).show()
      },
      css: "sidemenu-bg-color"
    },
    { },
    {
      view: "label", 
      template: "<span class='webix_icon wxi-check'></span><span class='text-status'>Connected</span>", 
      css: "align-center label-status-connected"
    }
  ],
  css: "sidemenu-bg-color"
}

let footer = {
  view: "template",
  template: "The software is provided by <a href='https://webix.com'>https://webix.com</a>. All rights reserved (c)",
  css: "align-center",
  autoheight: true
}

let main = {
  cells: [
    { 
      id: "Dashboard", 
      cols: [
        movieDataTable, 
        inputForm
      ]
    },
    { 
      id: "Users", 
      rows: [usersList, usersChart]
    },
    { 
      id: "Products", 
      rows: [productsView]
    },
    { 
      id: "Admin", 
      template: "Admin view" 
    }
  ]
}

webix.ready(function(){
  webix.ui({
    view: "popup",
    id: PROFILE_POPUP_ID,
    width: 300,
    body: {
      view: "list", 
      data: [ "Settings", "Log out" ],
      autoheight: true,
      select: true
    }
  });
  webix.ui({
    rows: [
      header,
      { 
        cols: [
          sideMenu,
          { view:"resizer" },
          main
        ], 
      },
      footer
    ]
  });
});