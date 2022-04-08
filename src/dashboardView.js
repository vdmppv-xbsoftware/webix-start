const MOVIE_DATATABLE_ID = "movie_datatable";
const MOVIE_INPUTFORM_ID = "movie_inputform";
const BTN_ADD_ID = "btn_add";
const BTN_CLR_ID = "btn_clr";

const currentYear = new Date().getFullYear();

const movieTabBar = {
  view: "tabbar",  
  multiview: true,
  options: [
    { 
      value: "All", 
      id: "all_movies_view" 
    },
    { 
      value: "Old", 
      id: "old_movies_view" 
    },
    { 
      value: "Modern", 
      id: "modern_movies_view" 
    },
    { 
      value: "New", 
      id: "new_movies_view" 
    },
  ]
}

let movieDataTable = {
  view: "datatable",
  id: MOVIE_DATATABLE_ID,
  select: "row", 
  gravity: 6,
  url: "data/data.js",
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
      collection: "data/categories.js"
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
  on: {
    onAfterSelect: setMovieValues
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

function addItem(){
  let movieInputForm = $$(MOVIE_INPUTFORM_ID);
  if ( movieInputForm.validate() ) {
    const movieItemData = movieInputForm.getValues();
    if ( movieItemData.id ) {
      $$(MOVIE_DATATABLE_ID).updateItem(movieItemData.id, movieItemData);
      webix.message("Movie edited successfully!", "success", 1500);
    }
    else {
      $$(MOVIE_DATATABLE_ID).add(movieItemData);
      webix.message("Movie added successfully!", "success", 1500);
    }
    movieInputForm.clear();
  }
};

function clearForm(){
  webix.confirm("Are you sure you want to clean the form?", "confirm-warning").then(() => {
    let movieInputForm = $$(MOVIE_INPUTFORM_ID);
    movieInputForm.clear();
    movieInputForm.clearValidation();
  });
};

function setMovieValues(id){
  let movieItem = $$(MOVIE_DATATABLE_ID).getItem(id);
  $$(MOVIE_INPUTFORM_ID).setValues(movieItem);
}