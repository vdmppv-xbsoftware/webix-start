const USER_LIST_ID = "user_list";
const USER_CHART_ID = "user_chart";
const SORT_ASC_BTN_ID = 'sort_asc';
const SORT_DESC_BTN_ID = 'sort_desc';
const ADD_USER_BTN_UD = 'add_user';
const HIGHLATED_ITEMS_AMOUNT = 5;

const countriesData = [
	{ "id": 1, "value": "Germany" },
	{ "id": 2, "value": "USA" },
	{ "id": 3, "value": "Canada" },
	{ "id": 4, "value": "France" },
	{ "id": 5, "value": "China" },
	{ "id": 6, "value": "Russia" },
	{ "id": 7, "value": "Italy" },
	{ "id": 8, "value": "Spain" }
];

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
            usersCollection.add({
              name: "Vadim Popov",
              age: Math.floor(Math.random() * 41) + 20, 
              country: (countriesData[Math.floor(Math.random() * 8) + 1].value),
            })
          }
        }
      ],
    },
    {
      view: "userlist",
      id: USER_LIST_ID,
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
          usersCollection.remove(id);
          return false;
        }
      },
    }
  ]
}

const usersChart = {
  view: "chart",
  id: USER_CHART_ID,
  type: "bar",
  value: "#country#",
  xAxis: {
      title: "Country",
      template: "#value#"
  },
  yAxis: {
      start: 0,
      end: 10,
      step: 2
  },
}