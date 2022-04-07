const productsView = {
  view: "treetable",
  url: "../data/products.js",
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
      template: "{common.treetable()} #title#" 
    },
    { 
      id: "price",	
      header: "Price",	
      width: 200
    }
  ],
  select: true,
  ready: function(){
    this.openAll();
  }
}