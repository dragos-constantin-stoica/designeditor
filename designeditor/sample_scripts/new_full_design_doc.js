//same origin policy 
$.couch.urlPrefix = "http://localhost:5984"; 
//your database name here 
var database = "designeditor"; 
//your design document name 
//change name of the functions, code will be changed afterwards 
//add/remove functions as needed
var doc = { 
  "_id":"_design/test1", 
  "language":"javascript", 
  "views":{ 
    "view1":{"map":"function(doc) { emit(doc._id, doc);}", 
             "reduce":"function(keys, values) {return 0;}" 
            }
  },
  "lists":{
    "list1":"function(head, req) { send(0); }"
  },
  "shows":{
    "show1":"function(doc, req) { return 0;}"
  },
  "updates":{
    "update1":"function(doc, req) {return [doc, toJSON(doc)];}"
  },
  "filters":{
    "filter1":"function(doc, req){return true;}"
  },
  "validate_doc_update":"function(newDoc, oldDoc, userCtx, secObj) {return;}"
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
