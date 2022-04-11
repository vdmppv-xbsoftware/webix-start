const MOVIE_DATATABLE_ID = "movie_datatable";
const MOVIE_INPUTFORM_ID = "movie_inputform";
const BTN_SAVE_ID = "btn_save";
const BTN_CLR_ID = "btn_clr";

const ALL_MOVIES_ID = "all_movies";
const OLD_MOVIES_ID = "old_movies";
const MODERN_MOVIES_ID = "modern_movies";
const NEW_MOVIES_ID = "new_movies";
const MOVIE_TABBAR_ID = "movie_tabbar";

const currentYear = new Date().getFullYear();

const movieTabBar = {
  view: "tabbar",
  id: MOVIE_TABBAR_ID,  
  multiview: true,
  options: [
    { 
      value: "All", 
      id: ALL_MOVIES_ID
    },
    { 
      value: "Old", 
      id: OLD_MOVIES_ID 
    },
    { 
      value: "Modern", 
      id: MODERN_MOVIES_ID
    },
    { 
      value: "New", 
      id: NEW_MOVIES_ID
    },
  ],
  on: {
    onChange(){
      $$(MOVIE_DATATABLE_ID).filterByAll();
    }
  }
}

let movieDataTable = {
  view: "datatable",
  id: MOVIE_DATATABLE_ID,
  select: "row", 
  gravity: 6,
  url: "data/data.js",
  editable: true,
  columns: [
    { 
      id: "rank", 
      header: "#", 
      sort: "int", 
      width: 50, 
      css: "rank-style" 
    },
    { 
      id: "title", 
      header: ["Film Title", { content: "textFilter" }], 
      sort: "string", 
      fillspace: true 
    },
    { 
      id: "category", 
      header: ["Category", { content: "selectFilter" }],
      editor: "richselect",
      collection: categoriesCollection
    },
    { 
      id: "rating", 
      header: ["Rating", { content: "numberFilter" }],
      sort: "int"  
    },
    { 
      id: "votes", 
      header: ["Votes", { content: "numberFilter" }],
      sort: "int"  
    },
    { 
      id: "year", 
      header: "Year", 
    },
    {  
      template: "{common.trashIcon()}",  
      width: 50 
    }
  ],
  scheme: {
    $init: (obj) => {
      obj.category = Math.floor(Math.random() * 4 + 1);
      obj.rating = obj.rating.replace(",", ".");
      obj.votes = obj.votes.replace(",", "");
    }
  },
  hover: "datatable-hover",
  onClick: {
  	"wxi-trash"(e, id) {
      this.remove(id);
      return false;
    }
  }
}

let inputForm = {
  view: "form",
  id: MOVIE_INPUTFORM_ID,
  minWidth: 350,
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
          id: BTN_SAVE_ID,
          view: "button", 
          value: "Save", 
          css: "webix_primary",
          click: saveItem
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

function saveItem(){
  let movieInputForm = $$(MOVIE_INPUTFORM_ID);
  if ( movieInputForm.validate() ) {
    movieInputForm.save();
    webix.message("Movie saved successfully!", "success", 1500);
    movieInputForm.clear();
    $$(MOVIE_DATATABLE_ID).clearSelection();
  }
};

function clearForm(){
  webix.confirm("Are you sure you want to clean the form?", "confirm-warning").then(() => {
    let movieInputForm = $$(MOVIE_INPUTFORM_ID);
    movieInputForm.clear();
    movieInputForm.clearValidation();
    $$(MOVIE_DATATABLE_ID).clearSelection();
  });
};
