const USER_LIST_ID = "user_list";
const SORT_ASC_BTN_ID = 'sort_asc';
const SORT_DESC_BTN_ID = 'sort_desc';
const ADD_USER_BTN_UD = 'add_user';
const HIGHLATED_ITEMS_AMOUNT = 5;

const usersList = {
  padding: 10,
  margin: 5,
  rows: [
    {
      margin: 10,
      cols: [
        {
          view: "text",
          gravity: 5,
          on: {
            onTimedKeypress() {
              let text = this.getValue().toLowerCase();
              $$(USER_LIST_ID).filter("#name#", text);
            }
          }
        },
        {
          view: "button",
          id: SORT_ASC_BTN_ID,
          label: "Sort asc",
          css: "webix_primary",
          click() {
            $$(USER_LIST_ID).sort("#name#", "asc", "string")
          }
        },
        {
          view: "button",
          id: SORT_DESC_BTN_ID,
          label: "Sort dsc",
          css: "webix_primary",
          click() {
            $$(USER_LIST_ID).sort("#name#", "desc", "string")
          }
        },
        {
          view: "button",
          id: ADD_USER_BTN_UD,
          label: "Add user",
          css: "webix_primary",
          click() {
            $$(USER_LIST_ID).add({
              name: "Vadim Popov",
              age: Math.floor(Math.random() * 41) + 20, 
              country: "Belarus",
            })
          }
        }
      ],
    },
    {
      view: "userlist",
      id: USER_LIST_ID,
      url: "data/users.js",
      select: true,
      template: "#name# from #country# <div class='webix_icon wxi-close'></div>",
      editable: true,
      editor: "text",
      editValue: "name",
      rules: {
        name: webix.rules.isNotEmpty
      },
      onClick: {
        "wxi-close"(e, id) {
          this.remove(id);
          return false;
        }
      },
      scheme: {
        $init: (obj) => {
          if (obj.age < 26) {
            obj.$css = "marked-userlist-item"
          } 
        }
      },
    }
  ]
}

const usersChart = {
  view: "chart",
  id: "user-chart",
  type: "bar", 
  url: "data/users.js",
  value: "#age#",
  xAxis: {
    title: "Age",
    template: "#age#"
  }
}

webix.protoUI(
  { name: "userlist" },
  webix.EditAbility, webix.ui.list
);