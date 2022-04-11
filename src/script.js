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
        {
          gravity: 4,
          rows: [movieTabBar, movieDataTable] 
        }, 
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
      rows: [adminView]
    }
  ]
}

webix.protoUI({
  name: "userlist"
}, webix.EditAbility, webix.ui.list);


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
          { view: "resizer" },
          main
        ], 
      },
      footer
    ]
  });

  $$(USER_CHART_ID).sync($$(usersCollection), () => {
    $$(USER_CHART_ID).group({
      by: "country",
      map: {
        country: ["country", "count"]
      }
    })

    $$(USER_CHART_ID).sort("#country#", "desc");
  });

  $$(MOVIE_INPUTFORM_ID).bind($$(MOVIE_DATATABLE_ID));

  $$(MOVIE_DATATABLE_ID).registerFilter(
    $$(MOVIE_TABBAR_ID), 
    { 
      columnId: "year", 
      compare(value, filter, item){
        switch (filter) {
          case OLD_MOVIES_ID:
            return value < 1989;
          case MODERN_MOVIES_ID:
            return 1989 <= value && value <= 1999;
          case NEW_MOVIES_ID:
            return value >= 2000;
          default:
            return true;
        }
      }
    },
    { 
      getValue(node){
        return node.getValue();
      },
      setValue(node, value){
        node.setValue(value);
      }
    }
  );

  $$(USER_LIST_ID).sync(usersCollection);
  $$(ADMIN_VIEW_ID).sync(categoriesCollection);
});