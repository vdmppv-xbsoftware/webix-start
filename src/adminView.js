const ADMIN_VIEW_ID = "admin_datatable";

const adminView = {
  rows: [
    {
      view: "datatable",
      id: ADMIN_VIEW_ID,
      columns: [
        { 
          id: "id", 
          header: "" 
        },
        { 
          id: "value", 
          editor: "text", 
          header: "Category", 
          fillspace: true 
        },
        { 
          template: "{common.trashIcon()}",
          width: 50,
        },
      ],
      editable: true,
      editAction: "click",
      rules: {
        value: webix.rules.isNotEmpty,
      },
      onClick: {
        "wxi-trash"(e, id) {
          categoriesCollection.remove(id);
          return false;
        },
      },
      hover: "datatable-hover"
    },
    { 
      view: "button", 
      value: "Add item", 
      click() {
        categoriesCollection.add({ value: "Action" });
      }, 
      css: "webix_primary" 
    },
  ],
};