let header = {
  view: "toolbar", css: "webix_dark", paddingX: 10, gravity: 1, 
  cols: [
    { view: "label", label: "My App" },
    { },
    { 
      view: "button", 
      label: "Profile", 
      type: "icon", 
      icon: "wxi-user",
      width: 100, 
      align: "right", 
      css: "webix_transparent"
    }
  ]
};

let sideMenu = {
  paddingY: 10,
  rows: [
    {
      view: "list",
      select: true,
      borderless: true,
      scroll: false,
      data: [ "Dashboard", "Users", "Products", "Locations" ],
      gravity: 1,
      css: "list-item-bg-color"
    },
    { },
    {
      view: "label", 
      template: "<span class='webix_icon wxi-check'></span><span class='text-status'>Connected</span>", 
      css: "align-center label-status-connected"
    }
  ],
  css: "list-bg-color"
}

let movieDataTable = {
  view: "datatable", 
  autoConfig: true,
  gravity: 6,
  data: small_film_set,
}

let inputForm = {
  view: "form",
  margin: 10,
  gravity: 2,
  rows: [ 
    { template: "EDIT FILMS", type: "section" },
    { view: "text", label: "Title", value: "" },
    { view: "text", label: "Year", value: "" },
    { view: "text", label: "Rating", value: "" },
    { view: "text", label: "Votes", value: "" },
    { 
      margin: 10, 
      cols: [
        {
          view: "button", 
          value: "Add new", 
          css: "webix_primary"
        },
        {
          view: "button", 
          value: "Clear"
        }
      ] 
    },
    { }
  ],
};

let footer = {
  view: "template",
  template: "The software is provided by <a href='https://webix.com'>https://webix.com</a>. All rights reserved (c)",
  css: "align-center",
  autoheight: true
}

webix.ready(function(){
  webix.ui({
    rows: [
      header,
      { 
        cols: [
          sideMenu,
          { view:"resizer" },
          movieDataTable,
          inputForm
        ], 
      },
      footer
    ]
  });
});