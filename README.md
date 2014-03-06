designeditor
============

Couchdb _design documents editor, and some other nice features.

Note this editor uses parts or full code from: 

- jquery.couchdb.js
- couchdb.js
- Futon CouchDB
- jquery EasyUI
- Ace Editor
- jsbeautifier 

Introduction
============

This application was build to leverage the basic code editor that is built in CouchDB.
We started using CouchDB in 2012 and we faced an inflation of \_design docs with associated views, list, shows etc 
and the actual tool was no more answering to our needs
so we build a tool that is simple, included in CouchDB and allows to manage \_design docs globally.

Enjoy using it, as we do!


How to install?
===============

0. Install CouchApp (http://couchapp.org/page/index), needed to push this application to local CouchDB server. You can upload files individually but I do not recommend it.
1. Clone this repository (git clone git://github.com/dragos-constantin-stoica/designeditor.git)
2. Open a terminal, go to the directory  (cd /designeditor) and issue commnad: couchapp push
3. Open you favorite web browser and go to: http://localhost:5984/designeditor/_design/editor/index.html
4. Enjoy!


How to use it?
==============

The application has 3 main tabs: 

+ Databases, 
+ Design Document Editor and 
+ Application Log.

There is a clickable icon on the right most side with a menu: 

- Server Log: opens in new tab CouchDb server log. You have a refresh button on the tab to
reload the server log, 
- Server Status: opens in new tab the list of active tasks on the CouchDB server,
- Snippets: opens in new tab snippets that can be run from the browser. **CAUTION!** The execution is synchronous and
may block the browser if the script takes too long to complete, and
- About.

Aftre susccessfully loading the applcation, you will see the list of databases loaded intro the database grid.
You have a contextual menu for each database row. You have a global database menu:

- New Database: creates a new empty database
- Replicator: does the replication. You can replicate only some documentes or/and use filters with parameters
- Refresh: reload all local databases intro the database grid

The context menu for database
--------------------------

- Design Documents: loads all design documents (_design/) into the Design Documents tab
- Compact Database: compacts the database. **CAUTION!** All versions of the documents will be deleted but last -- the only to be kept
will be kept. Do not perform this operation on production environments.
- Cleaup Views: clean up old index files. Useful for housekeeping of disk space
- Rebuild All Index: run by workers, will rebuild for each view the index files. According to the number of view 
in the database, this operation may take time. The messages from workers will be visible in Application Log and
you may check the indexer status in Server Status.
- Open Document: open a document with a given doc._id. The document content is displayed in new tab as
javascript and can be directly edited
- New Document: creates a new document with specified ID or new UUID if no ID is specified. The you can edit the 
document.
- Delete Database: deletes selected database. **CAUTION!** This operation is irreversible!

The content of Design Documents Editor
----------------------------------

On the left side you have a collapsible panel with a tree grid contanting the list of all design documents from selected
database. The following document types are recognized: **views** (map and reduce functions), **lists**, **shows**, **updates**, 
**filters**, **validate_doc_update**, and **fulltext** (index functions - used by Lucene). On the center - main area, you 
have a code editing zone. Each function (the code) is displayed in a new tab. Only for wiews you may rebuild the indexe
from the context menu of the tree grid.

The tree grid is strucured as follows:

+ database (root)
  + design documents (by name)
    + validate doc update (function)
    + lists
    + views
    + updates
    + shows
    + filters
    + fulltext
      + functions (by name) with markers M: map, R: reduce, IDX: index

The tree grid has a main menu: Refresh, Collapse All, Expand All, Collapse level 1 (at design documents level) and Expand level 1

The context menu for design documents grid:

Level 0: database -- create new design document

Level 1: design document -- rename, duplicate, delete design document; change programming language; add new design document
element (view, list, show, update, filter, fulltext, validate doc update)

Level 2: design document element -- new ~~function~~ element, delete ~~function~~ element, rebuild index and compact view available
only for views. Validate doc update is a single function per design document so it is stored here and
has the contextual menu of a function (see Level 3).  

Level 3: function level -- rename, duplicate and delete function. For code editing just click on the leaf.

Replicator
---------

The replication mechanism is similar with Futon and extended with design document ids to replicate and filters with parameters.

Basic replication:
> Introduce database names for source and destination. Check if you want to create the destination database and if
you want continuous replication.

Replication of selected documents only
> Same as basic and you should check "Only selected documents". For local source database you may select the design documents,
and you can introduce as a list of coma "," separated values the doc._id of documents you wanto to replicate.

Filtered replication
> Same as basic replication and you should check "Replicate with Filter". For local source database you may select
the filter. Optionaly you may complete query parameters in JSON format e.g. {"key":"value"}.

TODO
====

1. implement security management (authentication, user and rights management)
2. support for file attachement management
3. display a list with all documents from a database
4. display results for views, lists, shows
5. build a tool to generate documentation from comments
6. cancel replication (continuous) function

That's all for the moment.
Please fork the code and help to complete this tool.

Thank you!

Happy CouchDB codding!



