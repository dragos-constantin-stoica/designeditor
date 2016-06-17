Appzip
======

CouchDB application deployment/installer.  
Appzip allows you to publish (load) into CouchDB applicaitons (couchapps) as zip file.


How to install
==============

* Download files or just app.zip (unzip it after download).
* In a terminal, automatic install:

`./push2couch.sh`

Or install manually:

* createa new CouchDB database appzip
* create new design document _design/appzip
* attach all files from archive (except *.zip)

Access url: [http://localhost:5984/appzip/_design/appzip/index.html](http://localhost:5984/appzip/_design/appzip/index.html) and you should see the web interface.

Usage
=====

- If you have CouchDB administrator user declared (no admin party) enter the user name and password in the first fields.
- Then choose your zip file. You will see on the page the content of the zip file displayed.
- Click on **Push Application to CouchDB**.
-  If everything is ok then the message **Succesfully imported Application to CouchDB!** is displayed.

Access your published application, relax and have fun!

Structure of zip file
=====================

There are a couple of rules that must be respected:

1. In the root of your zip a file named *manifest.json* must be present. The structure of the file is:
  ```json
  {
	  "database":["database_name"]
  }
  ```
  
  The **database** attibute contains a list of strings with database names

2. For each database_name a folder and file structure must be implemented. The database folder is at top level:

	Directory and file structure:

	```
	[project_folder]
	  |
	  |_ manifest.json
	  |
	  |_ [database_name]
	  	|
	  	|_ [document_name]
	  	|	|
	  	|	|_ doc_attributes.json
	  	|	|
	  	|	|_[design_document_structure]        
	  	.        
	  	.
	```

	Design document folder contains `doc_attributes.json` file, folders corresponding to special CoucDB document fields and subforlders structure structure containing source code files:
	
	```
	[database_name]
	  |
	  |_ [document_name]
	  	|_ doc_attributes.json	
	  	|
		|_ _attachements
		|_ views
		|	|_[view_name]
		|		|_ map.js
		|		|_ reduce
		|_ lists
		|_ shows
		|_ updates
		|_ filters
		|_ rewrites
		|_ validate_doc_update.js
		|_ fulltext	        
	  .
	  .
	  .

	```
	Special fields that are translated into folderls are:
	
	* `_attachments`  - all subfolders and files are attached to the document as they are stored on local drive
	* `views` - they contain a subfolder structure representing the views, the name of the subforder is the name of the view. Inside each subfolder there is manadatory file `map.js` containing the map functiona and an optional `reduce.js` containing the reduce function source code. If you are using another programming language for your view you may use `map.erl` for Erlang written map function.
	* `lists` - each list function source code is containen in `[list_function_name].js` file
	* `shows` - each show function source code is containen in `[show_function_name].js` file
	* `updates` - each update function source code is containen in `[update_function_name].js` file
	* `filters` - each filter function source code is containen in `[filter_function_name].js` file
	* `rewrites`
	* `validate_doc_update.js` - a single JavaScript file that contains an update 
	* `fulltext` - Lucene index specific.
	
	One may use the `doc_attributes.json` file to define entire documents with `_id` and all attributes/fileds.
	
	doc_attributes.json file structure

	A JSON containing all atributes of the document. If no _id is provided then a new "data" document is created using a CouchDB generated id. In order to create a design_doc use "_id": "_design/[design_document_name]. Defult language is javascript if not provided.
	

	```json
	{
	 "_id":"[design_document_name | document_id]",
	 "language":"javascript",
	 ["attribute"]:[value]
	}
	```

3. Zip all these files and push them to CouchDB and you will have your application

A good example is designeditor, it is distributed as an appzip CouchDB application.

