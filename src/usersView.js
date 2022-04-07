const USER_LIST_ID = "user_list";
const SORT_ASC_BTN_ID = 'sort_asc';
const SORT_DESC_BTN_ID = 'sort_desc';
const INPUT_USER_TEXT_ID = 'input_user';

const usersList = {
  padding: 10,
  rows: [
    {
      margin: 10,
      cols: [
        {
          view: "text",
          gravity: 5,
          on: {
            onTimedKeypress: function(){
              var text = this.getValue().toString().toLowerCase();
              $$(USER_LIST_ID).filter("#name#", text);
            }
          }
        },
        {
          view: "button",
          id: SORT_ASC_BTN_ID,
          label: "Sort asc",
          css: "webix_primary",
          click: function(){
            $$(USER_LIST_ID).sort("#name#", "asc", "string")
          }
        },
        {
          view: "button",
          id: SORT_DESC_BTN_ID,
          label: "Sort dsc",
          css: "webix_primary",
          click: function(){
            $$(USER_LIST_ID).sort("#name#", "desc", "string")
          }
        }
      ],
    },
    {
      view: "list",
      id: USER_LIST_ID,
      url: "../data/users.js",
      select: true,
      borderless: true,
      template: "#name# from #country# <div class='webix_icon wxi-close'></div>",
      onClick: {
        "wxi-close": function(e, id) {
          this.remove(id);
          return false;
        }
      },
      on: {
        onBeforeRender: function(){
          for (let i = 1; i <= 5; i++){
            $$(USER_LIST_ID).addCss(i, "marker", true);
          }
        }
      }
    }
  ]
}

const usersChart = {
  view: "chart",
  type: "bar", 
  url: "../data/users.js",
  value: "#age#",
  xAxis: {
    title: "Age",
    template: "#age#"
  }
}