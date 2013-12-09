designeditor
============

Couchdb _design documents editor.

Note this editor uses parts or full code from: 
- codemirror
- jquery

Introduction
============

This application was build to leverage the basic code editor that is built in CouchDB.
We started using CouchDB in 2012 and we faced an inflation of _design docs with associated views, list etc 
and the actual tool was no more answering to our needs
so we build a tool that is simple, included in CouchDB and allows to manage _design docs globally.

Enjoy using it, as we do!


How to install?
===============

0. Install CouchApp (http://couchapp.org/page/index), needed to push this application to local CouchDB server. You can upload files individually but I do not recommend it.
1. Clone this repository
2. Open a terminal, go to the directory /designeditor and issue commnad: couchapp push
3. Open you favorite web browser and go to: http://localhost:5984/designeditor/_design/designeditor/index.html#
4. Enjoy!


How to use it?
==============

The application has 5 zones: north, south, east, west and center.

- North (top) you can select the database and click Connect to database to connect to that database. Note: in this version authentication is not implemented. When you succesfully connect to the selected database the list of _design docs is automatically added to the west side.
- South (bottom) this is the console where you will receive log messages from the application. Watch it for possible errors.
- West (left) here you can select a _design doc and then all views with map-reduce, lists etc will be shown beneath. Select a map, reduce, list, show etc function to see the code in the center zone.
- East (right) this zone is minimized by default, you click on the handler in the middle to show it. Here you will find couchdb.js scripts. They are useful for managing your _design docs. You can also save your own scripts.
- Center zone is where the code is edited - the editor is codemirror. After you edit your code (if it is a _design doc) click Save changes. If it is a code sniplet click Run from East side or Save if you want to save it.


That's all for the moment.

Happy CouchDB codding!



