//same origin policy 
$.couch.urlPrefix = "http://localhost:5984"; 
//your database (use complete address for different servers) name here 
var database = "bd2012"; 

//get all _design docs 

$.couch.db(database).allDesignDocs({
		success: function(data) {
			//logAppend("<strong>Design docs found:</strong>&nbsp;"+JSON.stringify(data));
			
			$.each(data["rows"], function(key,value) {   
			//value["id"] is the design doc
				$.couch.db(database).openDoc(value["id"], {
				  success: function(dd_data) {
					//check for views
					if (typeof(dd_data.views)!=="undefined")
					{
						$.each(dd_data.views,function(val){
							//logAppend("<strong style='color: blue;'>view:</strong>&nbsp;"+JSON.stringify(val));
							//index each view with limit=1
                            var view_name = value["id"].substring(value["id"].indexOf("/")+1);
                            logAppend("<strong>call view:</strong>&nbsp;"+view_name+"/"+val);
							$.couch.db(database).view(view_name+"/"+val, {
								success: function(view_data) {
                                  logAppend(view_name+"/"+val+": &nbsp;<strong>OK!!!</strong>");
									//console.log(view_data);
								},
								error: function(status) {
                                  logAppend("<strong style='color:red;'>Error for "+view_name+"/"+val+"</strong>:&nbsp;"+JSON.stringify(status));
									//console.log(status);
								},
								limit: "1"
							});
						});
					}
					//console.log(dd_data);
				  },
				  error: function(status) {
					logAppend("<strong style='color: red;'>Error:</strong>&nbsp;"+JSON.stringify(status));
					console.log(status);
				  }
				});
			});			
			//console.log(data);
		}
	});
