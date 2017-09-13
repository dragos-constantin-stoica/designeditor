webix.CouchDB = webix.proto({
  name: 'CouchDB',

  protocol: 'http://',
  host: 'localhost',
  port: 5984,
  urlPrefix: 'http://localhost:5984/',
  config: {},
  api_table: {},
  callback:[],

  $init: function(){
    /*
     * Detect protocol, host, port, username, password
     * e.g. http://localhost:5984
     */
     if (typeof window !== 'undeifned'){
       //we are in a browser
       this.protocol = window.location.protocol + '//';
       this.host = window.location.hostname;
       this.port = window.location.port;
       this.urlPrefix = this.protocol + this.hostname + ':' + this.port + '/';
     }

     //TODO - Remove the line bellow - it is for tesing purposes only
     this.urlPrefix = 'http://localhost:5984/';

     this.initAPI_table();
     this.setCallback();
  },

  setCallback: function(cbk) {
    this.callback = [
      {
          error: function(text, data, xhr){
              console.log(data.json());
              console.log(xhr);
            },
          success: function(text, data, xhr){
              console.log(data.json());
              console.log(xhr);
            }
      }
    ];
    if (cbk) this.callback.push(cbk);
  },

  getCallback: function(){
    return this.callback;
  },

  initAPI_table: function(){
    this.api_table = {
      "restart":{
        method: this.doPOST,
        headers:{
          'Content-type': 'application/json',
          'Accept': 'application/json'
        },
        url: this.urlPrefix + '_restart',
        doc: null //just to notify that there will be a field doc provided by caller
      },

      "login":{
        method: this.doPOST,
        headers:{
          'Content-type': 'application/json',
          'X-CouchDB-WWW-Authenticate': 'Cookie'
        },
        url:this.urlPrefix + '_session'
      },

      "logout": {
        method: this.doDELETE,
        headers:{
          'Accept': 'application/json'
        },
        url: this.urlPrefix + '_session'
      },

      "session":{
        method: this.doGET,
        headers:{
          'Accept': 'application/json'
        },
        url: this.urlPrefix + '_session'
      },

      "stats": {
        method: this.doGET,
        headers:{
          'Accept': 'application/json'
        },
        url: this.urlPrefix + '_stats'
      },

      "server_info":{
        method: this.doGET,
        headers:{
          'Accept': 'application/json'
        },
        url: this.urlPrefix
      },

      "active_tasks":{
        method: this.doGET,
        headers: {
          'Accept': 'application/json'
        },
        url: this.urlPrefix + '_active_tasks'
      },

      "all_dbs":{
        method: this.doGET,
        headers: {
          'Accept': 'application/json'
        },
        url: this.urlPrefix + '_all_dbs'
      },

      "db_updates":{
        method: this.doGET,
        headers: {
          'Accept': 'application/json'
        },
        url: this.urlPrefix + '_db_updates'
      },

      "membership":{
        method: this.doGET,
        headers: {
          'Accept': 'application/json'
        },
        url: this.urlPrefix + '_membership'
      },

      "log":{
        method: this.doGET,
        headers: {
          'Accept': 'application/json'
        },
        url: this.urlPrefix + '_log'
      },

      "uuids":{
        method: this.doPUT,
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        url: this.urlPrefix + '_uuids'
      },

      "config":{
        method: this.doGET,
        headers: {
          'Accept': 'application/json'
        },
        url: this.urlPrefix + '_config'
      },

      "upsert_admin":{
        method: this.doPUT,
        headers: {'Accept': 'application/json'}
      },

      "delete_admin":{
        method: this.doDELETE,
        headers: {'Accept': 'application/json'}
      },

      "create_user":{
        method: this.doPUT,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
      },

      "administer_user":{
        method: this.doUPSERT,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
      },

      "delete_user":{
        method: this.doREV_DELETE,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      },

      "headDB":{
        method: this.doHEAD,
        headers:{
          'Accept': 'application/json'
        }
      },

      "getDB":{
          method: this.doGET,
          headers:{
            'Accept': 'application/json'
          }
      },

      "putDB":{
        method: this.doPUT,
        headers: {
          'Accept': 'application/json'
        }
      },

      "delDB":{
        method: this.doDELETE,
        headers: {
          'Accept': 'application/json'
        }
      },

      "postDB":{
        method: this.doPOST,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      },

      "compactDB":{
        method: this.doPOST,
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      },

      "full_commitDB":{
        method: this.doPOST,
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      },

      "view_cleanupDB":{
        method: this.doPOST,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      },

      "purgeDB": {
        method: this.doPOST,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      },

      "get_securityDB":{
        method: this.doGET,
        headers: {
          'Accept': 'application/json'
        }
      },

      "manage_securityDB":{
        method: this.doPUT,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      },

      "compactDDoc": {
        method: this.doPOST,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      },

      "putDDoc": {
        method: this.doPUT,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Couch-Full-Commit': true
        }
      },

      "infoDDoc": {
        method: this.doGET,
        headers: {
          'Accept': 'application/json'
        }
      },

      "headAttachment":{
        method: this.doHEAD,
        headers: {
          'Accept': 'application/json'
        }
      },

      "getAttachment":{
        method: this.doGET,
        headers: {
          'Accept': 'application/json'
        }
      },

      "delAttachment":{
        method: this.doDELETE
      },

      "getLDoc": {
        method: this.doGET,
        headers: {
          'Accept': 'application/json'
        }
      },

      "putLDoc": {
        method: this.doPUT
      },

      "delLDoc": {
        method: this.doDELETE,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Couch-Full-Commit': true
        }
      },

      "headDoc":{
        method: this.doHEAD,
        headers: {
          'Accept': 'application/json'
        }
      },

      "getDoc":{
        method: this.doGET,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      },

      "putDoc": {
        method: this.doUPSERT,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      },

      "delDoc":{
        method: this.doDELETE,
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Couch-Full-Commit': true
        }
      }

    }
  },

  call_api: function(api_name, ...in_params){
    var [doc, url, headers] = in_params;

    var tmp = this.api_table[api_name];
    doc = tmp.doc || doc || {};
    url = tmp.url || url || '';
    headers = tmp.headers || headers || {};
    tmp.method(headers, url, doc, this.getCallback());
  },

  //General server functions
  restart: function(){
    this.call_api(arguments.callee.name);
  },

  login: function(doc){
    /* Expected doc structure
    {
      name: user,
      password: password
    }
    */
    this.call_api(arguments.callee.name, doc);
  },

  logout: function(){
    this.call_api(arguments.callee.name);
  },

  session: function(){
    this.call_api(arguments.callee.name);
  },

  stats: function(){
    this.call_api(arguments.callee.name);
  },

  server_info: function(){
    this.call_api(arguments.callee.name);
  },

  active_tasks: function(){
    this.call_api(arguments.callee.name);
  },

  all_dbs: function(){
    this.call_api(arguments.callee.name);
  },

  db_updates: function(){
    this.call_api(arguments.callee.name);
  },

  membership: function(){
    this.call_api(arguments.callee.name);
  },

  log: function(){
    this.call_api(arguments.callee.name);
  },

  uuids: function(){
    this.call_api(arguments.callee.name);
  },
  //End general functions

  //Config functions
  config: function(){
    this.call_api(arguments.callee.name);
  },
  //End config functions

  //Server admin functions
  //this is done via _config API but it is special
  upsert_admin: function(user, password){
    this.call_api(arguments.callee.name,
                  password,
                  this.urlPrefix + '/_config/admins/'+user);
  },

  delete_admin: function(user){
    this.call_api(arguments.callee.name,
                  password,
                  this.urlPrefix + '/_config/admins/'+user);
  },
  //End server admin functions

  //User management functions
  /*
    The expected structure of the user document is
    {
      name: 'user-name',
      password: 'clear-text-password',
      roles: [],
      type: 'user'
    }
    on the server there are a couple of extra fields
    added automatically by CouchDB
  */
  create_user: function(doc){
    this.call_api(arguments.callee.name,
                  doc,
                  this.urlPrefix + '_users' + '/org.couchdb.user:' + doc.name);
  },

  administer_user: function(doc){
    //Upsert CouchDB style GET->_rev->PUT
    this.call_api(arguments.callee.name,
                  doc,
                  this.urlPrefix + '_users' + '/org.couchdb.user:' + doc.name
    );
  },

  delete_user: function(doc){
    //Delete CouchDB style GET->_rev-DELETE
    this.call_api(arguments.callee.name,
                  null,
                  this.urlPrefix + '_users' + '/org.couchdb.user:' + doc.name
    );
  },
  //End user management functions

  //Database related operations
  headDB: function(dbname){
    this.call_api(arguments.callee.name, null, this.urlPrefix + dbname);
  },

  getDB: function(dbname) {
    this.call_api(arguments.callee.name, null, this.urlPrefix + dbname);
  },

  putDB: function(dbname){
    this.call_api(arguments.callee.name, null, this.urlPrefix + dbname);
  },

  delDB: function(dbname){
    this.call_api(arguments.callee.name, null, this.urlPrefix + dbname);
  },

  postDB:function(dbname, doc){
    this.call_api(arguments.callee.name, doc, this.urlPrefix + dbname);
  },

  compactDB: function(dbname){
    this.call_api(arguments.callee.name,
                  null,
                  this.urlPrefix + dbname + '/_compact');
  },

  full_commitDB: function(dbname){
    this.call_api(arguments.callee.name,
                  null,
                  this.urlPrefix + dbname + '/_ensure_full_commit');
  },

  view_cleanupDB: function(dbname){
    this.call_api(arguments.callee.name,
                  null,
                  this.urlPrefix + dbname + '_view_cleanup');
  },

  purgeDB: function(dbname){
    this.call_api(arguments.callee.name,
                  null,
                  this.urlPrefix + dbname + '/_purge');
  },

  /*
    The security object has the following mandatory structure
    {
      admins:{
        names: [],
        roles: []
      },
      members:{
        names: [],
        roles: []
      }
    }
   */
  get_securityDB: function(dbname){
    this.call_api(arguments.callee.name,
                  null,
                  this.urlPrefix + dbname + '/_security');
  },

  manage_securityDB:function(dbname, doc){
    this.call_api(arguments.callee.name,
                  doc,
                  this.urlPrefix + dbname + '/_security');
  },
  //End database operations

  //Design Document operations
  compactDDoc: function(dbname, ddoc){
    this.call_api(arguments.callee.name,
                  null,
                  this.urlPrefix + dbname + '/_compact/' + ddoc.name);
  },

  /*
    Expected ddoc format is:
    {
      id: '_design/[name]',
      _attachments : {
        "path_to_file/file_name": {
          "content_type": "[mime-type]",
          "data": [base64_content],
          "digest": "[md5_of_file]",
          "length": [bytes],
          "revpos": [since_revision],
          "stub": true
        },
      },
      language: [string],
      options:{
        local_seq: true|false,
        include_design: true|false
      },
      filters: {
        [filter_name]: "[source_code]"
      },
      lists: {
        [list_name]: "[source_code]"
      },
      rewrites: [array | string],
      shows:{
        [show_name]: "[source_code]"
      },
      updates:{
        [update_name]: "[source_code]"
      },
      validate_doc_update: [string],
      views:{
        [view_name]:{
          "map":"[source_code]",
          "reduce":"[source_code]"
        }
      }
    }
   */
  putDDoc: function(dbname, ddoc){
    this.call_api(arguments.callee.name,
                  ddoc,
                  this.urlPrefix + dbname + '/' + ddoc._id);
  },

  infoDDoc: function(dbname, ddoc){
    this.call_api(arguments.callee.name,
                  null,
                  this.urlPrefix + dbname + '/' + ddoc._id + '/_info');
  },
  //End design document operations

  //Local document operations
  getLDoc: function(dbname, ldoc){
    this.call_api(arguments.callee.name,
                  null,
                  this.urlPrefix + dbname + '/' + ldoc._id);
  },

  /*
    The expected format of a local document is:
    {
      _id: "_local/[document_name]"
    }
   */
   putLDoc: function(dbname, ldoc){
     this.call_api(arguments.callee.name,
                   ldoc,
                   this.urlPrefix + dbname + '/' + ldoc._id);
   },

   delLDoc: function(dbname, ldoc){
     this.call_api(arguments.callee.name,
                   null,
                   this.urlPrefix + dbname + '/' + ddoc._id);
   },
  //End local document operations

  //Normal document operations
  headDoc: function(dbname, doc){
    this.call_api(arguments.callee.name,
                  null,
                  this.urlPrefix + dbname + '/' + doc._id);
  },

  getDoc: function(dbname, doc){
    this.call_api(arguments.callee.name,
                  null,
                  this.urlPrefix + dbname + '/' + doc._id);
  },

  putDoc: function(dbname, doc){
    this.call_api(arguments.callee.name,
                  doc,
                  this.urlPrefix + dbname + '/' + doc._id);
  },

  delDoc: function(dbname, doc){
    this.call_api(arguments.callee.name,
                  null,
                  this.urlPrefix + dbname + '/' + doc._id + '?rev=' + doc._rev);
  },

  headAttachment: function(dbname, doc, attachment){
    this.call_api(arguments.callee.name,
                  null,
                  this.urlPrefix + dbname + '/' + doc._id + '/' + attachment);
  },

  getAttachment: function(dbname, doc, attachment){
    this.call_api(arguments.callee.name,
                  null,
                  this.urlPrefix + dbname + '/' + doc._id + '/' + attachment);
  },

  delAttachment: function(dbname, doc, attachment){
    var headers = {
      'Accept': 'application/json',
      'X-Couch-Full-Commit': true,
      'If-Match': doc._rev
    };
    this.call_api(arguments.callee.name,
                  attachment,
                  this.urlPrefix + dbname + '/' + doc._id + '/' + attachment,
                  headers);
  },
  //End normal document operations


  //Internal HTTP operations
  doHEAD: function(headers, url, doc, cbk){
    var xhr = webix.ajax().getXHR();
    xhr.open('HEAD', url, true);
    for (var field in headers) {
      xhr.setRequestHeader(field, headers[field]);
    }
    xhr.onreadystatechange = function () {
            if(xhr.readyState === XMLHttpRequest.DONE &&
               xhr.status === 200) {
                console.log(xhr);
                console.log(xhr.getResponseHeader('ETag'));
            }else if(xhr.readyState === XMLHttpRequest.DONE &&
               xhr.status != 200){
              console.log(xhr.status);
            }
        };
    xhr.send();
  },

  doGET: function(headers, url, doc, cbk){
    webix.ajax().
      headers(headers).
      get(url, cbk);
  },

  doPOST: function(headers, url, doc, cbk){
    webix.ajax().headers(headers).post(url,
      JSON.stringify(doc),
      {
          error: function(text, data, xhr){
              console.log(data.json());
              console.log(xhr);
            },
          success: function(text, data, xhr){
              console.log(data.json());
              console.log(xhr);
            }
      }

      )

  },

  doPUT: function(headers, url, doc, cbk){
    webix.ajax().headers(headers).put(url,
      JSON.stringify(doc),
      {
          error: function(text, data, xhr){
              console.log(data.json());
              console.log(xhr);
            },
          success: function(text, data, xhr){
              console.log(data.json());
              console.log(xhr);
            }
      }

      )
  },

  doDELETE: function(headers, url, doc, cbk){
    webix.ajax().headers(headers).del(url,
      JSON.stringify(doc),
      {
          error: function(text, data, xhr){
              console.log(data.json());
              console.log(xhr);
            },
          success: function(text, data, xhr){
              console.log(data.json());
              console.log(xhr);
            }
      }

      )
  },

  doCOPY: function(){
    //TODO - implement copy for documents
  },

  doUPSERT: function(headers, url, doc, cbk){
    //UPdate document if exists else inSERT
    var xhr = webix.ajax().getXHR();
    xhr.open('HEAD', url, true);
    //Fixed headers - see CouchDB official doc
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
            if(xhr.readyState === XMLHttpRequest.DONE &&
               xhr.status === 200) {
                 //document found ETag has the _rev, update
                console.log(xhr);
                console.log(xhr.getResponseHeader('ETag'));

                this.doPUT(
                  {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'If-Match': xhr.getResponseHeader('ETag')
                  },
                  url,
                  doc);

            }else if(xhr.readyState === XMLHttpRequest.DONE &&
               xhr.status === 404){
                 //document not found, insert new one
              console.log(xhr.status);
              this.doPUT(headers, url, doc);
            }
        };
    xhr.send();
  },

  doREV_DELETE: function(headers, url, doc, cbk){
    //CouchdB specific Doc DELETE, must specify _rev
    var xhr = webix.ajax().getXHR();
    xhr.open('HEAD', url, true);
    //Fixed headers - see CouchDB official doc
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
            if(xhr.readyState === XMLHttpRequest.DONE &&
               xhr.status === 200) {
                 //document found ETag has the _rev, update
                console.log(xhr);
                console.log(xhr.getResponseHeader('ETag'));

                this.doDELETE(
                  {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'If-Match': xhr.getResponseHeader('ETag')
                  },
                  url);
            }
        };
    xhr.send();
  }

  //End internal HTTP operations

});


webix.proxy.CouchDB = {
    $proxy:true,
    load:function(view, callback){
        //your loading pattern
        webix.ajax(this.source, callback, view);
    },
    save:function(view, update, dp, callback){
        //your saving pattern for single records
        webix.ajax().post(url, update, callback);
    },
    result:function(state, view, dp, text, data, loader){
        //your logic of server-side response processing
        dp.processResult(state, data, details);
    },

    //other custom properties and methods
    host: '',
    method1:function(){ }
};
