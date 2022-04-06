let header = {
  view: "toolbar", 
  css: "webix_dark", 
  paddingX: 10, 
  gravity: 1, 
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
      popup: "profile_popup"
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

let movieDataTable = {
  view: "datatable",
  id: "movie_datatable", 
  autoConfig: true,
  gravity: 6,
  data: small_film_set,
}

const currentYear = new Date().getFullYear();

let inputForm = {
  view: "form",
  id: "movie_inputform",
  margin: 10,
  gravity: 2,
  rows: [ 
    { 
      template: "EDIT FILMS", 
      type: "section" 
    },
    { 
      view: "text", 
      id: "inp_title", 
      name: "title", 
      label: "Title", 
      value: "", 
      invalidMessage: "Title cannot be empty" 
    },
    { 
      view: "text", 
      id:"inp_year", 
      name: "year", 
      label: "Year", 
      value: "", 
      invalidMessage: `Year should be between 1970 and ${currentYear}` 
    },
    { 
      view: "text", 
      id:"inp_rating", 
      name: "rating", 
      label: "Rating", 
      value: "", 
      invalidMessage: "Rating should be between 0 and 10"
    },
    { 
      view: "text", 
      id:"inp_votes", 
      name: "votes", 
      label: "Votes", 
      value: "", 
      invalidMessage: "Votes should be between 1 and 100000" 
    },
    { 
      margin: 10, 
      cols: [
        {
          id: "btn_add",
          view: "button", 
          value: "Add new", 
          css: "webix_primary",
          click: addItem
        },
        {
          id: "btn_clr",
          view: "button", 
          value: "Clear",
          click: clearForm
        }
      ] 
    },
    { }
  ],
  rules: {
    title:webix.rules.isNotEmpty,
    year:function(value){ return (value >= 1970 && value <= currentYear) },
    rating:function(value){ return (value >= 0 && value <= 10) },
    votes:function(value){ return (value > 0 && value < 100000) },
  },
};

let footer = {
  view: "template",
  template: "The software is provided by <a href='https://webix.com'>https://webix.com</a>. All rights reserved (c)",
  css: "align-center",
  autoheight: true
}

function addItem(){
  let movieInputForm = $$("movie_inputform");
  if ( movieInputForm.validate() ) {
    let movieItemData = movieInputForm.getValues();
    $$("movie_datatable").add(movieItemData);
    webix.message("Movie added successfully!", "success", 1500);
  }
};

function clearForm(){
  webix.confirm("Are you sure you want to clean the form?", "confirm-warning").then(function() {
    let movieInputForm = $$("movie_inputform");
    movieInputForm.clear();
    movieInputForm.clearValidation();
  });
};

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
  webix.ui({
    view: "popup",
    id: "profile_popup",
    width: 300,
    body: {
      view: "list", 
      data: [ "Settings", "Log out" ],
      autoheight: true,
      select: true
    }
  });
});