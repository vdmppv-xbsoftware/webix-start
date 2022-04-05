var header = {
  view: "toolbar", css: "webix_dark", paddingX: 10, gravity: 1, 
  cols: [
    { view: "label", label: "My App", width: 100 },
    { },
    { 
      view: "button", 
      label: '<span class="webix_icon wxi-user"></span><span>Profile</span>', 
      width: 90, 
      align: "right", 
      css: "webix_transparent"
    }
  ]
};

var sideMenu = {
  paddingY: 10,
  rows: [
    {
      view: "list",
      select: true,
      borderless: true,
      scroll: false,
      data: [ "Dashboard", "Users", "Products", "Locations" ],
      gravity: 1,
    },
    { },
    {
      view: "label", 
      template: "<span class='webix_icon wxi-check'></span><span class='text_connected'>Connected</span>", 
      css: "webix_template_connected"
    }
  ],
  css: "webix_list"
}

var movieDataTable = {
  view: "datatable", 
  autoConfig: true,
  gravity: 6,
  data: small_film_set,
}

var inputForm = {
  view: "form",
  margin: 10,
  gravity: 2,
  rows: [ 
    { template: "EDIT FILMS", type: "section"},
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
    }
  ],
};

var footer = {
  view: "template",
  template: "The software is provided by <a href='https://webix.com'>https://webix.com</a>. All rights reserved (c)",
  css: "webix_template"
}

webix.ready(function(){
  webix.ui({
    rows: [
      header,
      { 
        cols: [
          sideMenu,
          { view:"resizer"},
          movieDataTable,
          inputForm
        ], 
        minHeight:680},
      footer
    ]
  });
});