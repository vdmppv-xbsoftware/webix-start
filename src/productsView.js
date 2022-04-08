const productsView = {
  view: "treetable",
  url: "data/products.js",
  columns: [
    { 
      id: "id",	
      header: "",
      width: 50
    },
    { 
      id: "title",	
      header: "Title",
      width: 250,
      editor: "text",
      template: "{common.treetable()} #title#" 
    },
    { 
      id: "price",	
      header: "Price",
      editor: "text",	
      fillspace: true
    }
  ],
  select: "cell",
  ready() {
    this.openAll();
  },
  editable: true,
  rules: {
    title: webix.rules.isNotEmpty,
    price: webix.rules.isNumber
  }
}