const MOVIE_DATATABLE_ID = "movie_datatable";
const MOVIE_INPUTFORM_ID = "movie_inputform";
const BTN_ADD_ID = "btn_add";
const BTN_CLR_ID = "btn_clr";
const PROFILE_POPUP_ID = "profile_popup"

const currentYear = new Date().getFullYear();

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
      popup: PROFILE_POPUP_ID
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
  id: MOVIE_DATATABLE_ID, 
  autoConfig: true,
  gravity: 6,
  data: small_film_set,
}

let inputForm = {
  view: "form",
  id: MOVIE_INPUTFORM_ID,
  margin: 10,
  gravity: 2,
  rows: [ 
    { 
      template: "EDIT FILMS", 
      type: "section" 
    },
    { 
      view: "text", 
      name: "title", 
      label: "Title", 
      value: "", 
      invalidMessage: "Title cannot be empty" 
    },
    { 
      view: "text", 
      name: "year", 
      label: "Year", 
      value: "", 
      invalidMessage: `Year should be between 1970 and ${currentYear}` 
    },
    { 
      view: "text",  
      name: "rating", 
      label: "Rating", 
      value: "", 
      invalidMessage: "Rating should be between 1 and 10"
    },
    { 
      view: "text", 
      name: "votes", 
      label: "Votes", 
      value: "", 
      invalidMessage: "Votes should be between 1 and 100000" 
    },
    { 
      margin: 10, 
      cols: [
        {
          id: BTN_ADD_ID,
          view: "button", 
          value: "Add new", 
          css: "webix_primary",
          click: addItem
        },
        {
          id: BTN_CLR_ID,
          view: "button", 
          value: "Clear",
          click: clearForm
        }
      ] 
    },
    { }
  ],
  rules: {
    title: webix.rules.isNotEmpty,
    year: value => (1970 <= value && value <= currentYear),
    rating: value => (0 < value && value <= 10),
    votes: value => (0 < value && value <= 100000),
  },
};

let footer = {
  view: "template",
  template: "The software is provided by <a href='https://webix.com'>https://webix.com</a>. All rights reserved (c)",
  css: "align-center",
  autoheight: true
}

function addItem(){
  let movieInputForm = $$(MOVIE_INPUTFORM_ID);
  if ( movieInputForm.validate() ) {
    const movieItemData = movieInputForm.getValues();
    $$(MOVIE_DATATABLE_ID).add(movieItemData);
    webix.message("Movie added successfully!", "success", 1500);
  }
};

function clearForm(){
  webix.confirm("Are you sure you want to clean the form?", "confirm-warning").then(() => {
    let movieInputForm = $$(MOVIE_INPUTFORM_ID);
    movieInputForm.clear();
    movieInputForm.clearValidation();
  }
  );
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
    id: PROFILE_POPUP_ID,
    width: 300,
    body: {
      view: "list", 
      data: [ "Settings", "Log out" ],
      autoheight: true,
      select: true
    }
  });
});