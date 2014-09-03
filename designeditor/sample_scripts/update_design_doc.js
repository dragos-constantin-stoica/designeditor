//same origin policy 
$.couch.urlPrefix = "http://localhost:5984"; 
//your database name here 
var database = "designeditor"; 
//your design document name 
var designdoc = "_design/test2";

//open the _design doc 
//log the result to south area 
$.couch.db(database).openDoc(designdoc, {
  success: function(data) {
    //change/delete your _design doc structure here
    data.language = "javascript";
    //create a new view and discard the existing ones
    data.views={ 
    "view2":{"map":"function(doc) { emit(doc._id, doc);}", 
             "reduce":"function(keys, values) {return 0;}" 
            }};
    //delete all lists
  	delete data.lists;
    //add show2 to shows
  	data.shows.show2= "function(doc, req) { return 0;}";
    delete data.validate_doc_update;
    
    //save changes
    $.couch.db(database).saveDoc(data, {
      success: function(data) {
        logAppend("<strong>Document:&nbsp;" + data.id + " saved!</strong>");
        //console.log(data); 
      }, 
      error: function(status) {        
        logAppend("<strong style='color: red;'>Error:</strong>&nbsp;"+JSON.stringify(status));      
        //console.log(status); 
      }      
    });
    //console.log(data);
  },
  error: function(status) {
    logAppend("<strong style='color: red;'>Error:</strong>&nbsp;"+JSON.stringify(status));
    console.log(status);
  }
});
