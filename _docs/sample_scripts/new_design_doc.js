//same origin policy 
$.couch.urlPrefix = "http://localhost:5984"; 
//your database name here 
var database = "designeditor"; 
//your design document name 
var doc = { 
  "_id":"_design/test" 
}; 

//create the _design doc 
//log the result to south area 
$.couch.db(database).saveDoc(doc, { 
    success: function(data) { 
        logAppend("<strong>Document:&nbsp;" + doc._id + " created!</strong>"); 
        //console.log(data); 
    }, 
    error: function(status) { 
      	logAppend("<strong style='color: red;'>Error:</strong>&nbsp;"+JSON.stringify(status)); 
        //console.log(status); 
    } 
});
