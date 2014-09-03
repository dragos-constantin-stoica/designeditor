//same origin policy 
$.couch.urlPrefix = "http://localhost:5984"; 
//your databases (use complete address for different servers) name here 
var source_database = "designeditor"; 
var destination_database ="test";
//your design documents ids 
var docs = ["_design/test2"]; 

//do the replication
//log the result to south area 

$.couch.replicate(source_database, destination_database, {
    success: function(data) {
      logAppend("<strong>Replication result:</strong>&nbsp" + JSON.stringify(data));
        //console.log(data);
    },
    error: function(status) {
      logAppend("<strong style='color: red;'>Error:</strong>&nbsp;"+JSON.stringify(status)); 
        //console.log(status);
    }
	}, {
  	doc_ids: docs,
  	create_target: true //only if you want to create destination_database
});

