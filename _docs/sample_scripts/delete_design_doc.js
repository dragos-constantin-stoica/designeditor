//same origin policy 
$.couch.urlPrefix = "http://localhost:5984"; 
//your database name here 
var database = "designeditor"; 
//your design document name 
var designdoc = "_design/test";

//open the _design doc 
//log the result to south area 
$.couch.db(database).openDoc(designdoc, {
  success: function(data) {
    $.couch.db(database).removeDoc(data, {
      success: function(data) {
        logAppend("<strong style='color: red;'><em>Document:&nbsp;" + data.id + " deleted!</em></strong>");
        //console.log(data); 
      }
      , 
      error: function(status) {        
        logAppend("<strong style='color: red;'>Error:</strong>&nbsp;"+JSON.stringify(status));      
        //console.log(status); 
      }      
    });
    //console.log(data);
  }
  ,
  error: function(status) {
    logAppend("<strong style='color: red;'>Error:</strong>&nbsp;"+JSON.stringify(status));
    console.log(status);
  }
});
