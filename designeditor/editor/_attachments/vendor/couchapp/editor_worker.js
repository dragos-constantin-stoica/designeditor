/**
 * 
 * Worker that processes long requests for CouchDB
 * - index of a single view, the first map function is called.
 *   CouchDB will bulild the index for all
 * - index all views from a given database
 * - stop command is never used, if used the worker can not be reactivated
 * 
 * 
 * @author Dragos STOICA
 * @date 05.03.2014
 */ 
importScripts('/_utils/script/couch.js',
              '/_utils/script/json2.js',
              '/_utils/script/sha1.js');
              
self.onmessage = function(e) {
  var data = e.data;
  switch (data.cmd) {
    case 'start':
      self.postMessage('<em>WORKER :</em> Yes Master!');
	  //self.postMessage(JSON.parse(CouchDB.request("GET", "/").responseText));
      break;
    case 'saveDocumentation':
		self.postMessage('<em>WORKER</em> got: ' + data.msg.database + "-" + data.msg.ddoc);
		var xhr = CouchDB.request("PUT", "/" + data.msg.database + "/DOCUMENTATION/index.html" +
		((data.msg.rev != "")? "?rev=" + data.msg.rev:""), {
			headers:{"Content-Type":"text/html;charset=utf-8"},
			body:data.msg.ddoc
		  });
		self.postMessage('<em>WORKER</em> saveDocumentation for ' + data.msg.database + ((xhr.status != 201)?' <b>failed!</b>':' OK!'));

		break;
    case 'rebuildIndex':
		self.postMessage('<em>WORKER</em> got: ' + data.msg.database + "-" + data.msg.ddoc);
		//rebuil index for all views from the design document
		var db = new CouchDB(data.msg.database);
		var firstView = Object.keys(db.open('_design/'+data.msg.ddoc).views)[0];
		var result = db.view(data.msg.ddoc + '/' + firstView,{limit:1});
		self.postMessage('<em>WORKER</em> rebuildIndex for ' + data.msg.database + "-" + data.msg.ddoc + ((result === null)?' <b>failed!</b>':' OK!'));
		break;
	case 'rebuildAllIndex':
		self.postMessage('<em>WORKER</em> got: ' + data.msg.database);
		var db = new CouchDB(data.msg.database);
		var ddocs = db.designDocs().rows;
		var doc, result;
		for (idx in ddocs){
			doc = db.open(ddocs[idx].id);
			if (typeof doc.views !== 'undefined'){
				result = db.view(ddocs[idx].id.replace('_design/','')+'/'+Object.keys(doc.views)[0],{limit:1});
				self.postMessage('<em>WORKER</em> rebuildAllIndex for ' + data.msg.database + '/' + ddocs[idx].id + ((result === null)?' <b>failed!</b>':' OK!') );
			}
		}
		break;
	case 'replicateDB':
		self.postMessage('<em>WORKER</em> got: ' + data.msg.source + " - " + data.msg.destination + " - " + JSON.stringify(data.msg.options));
		var result = CouchDB.replicate(data.msg.source, data.msg.destination, data.msg.options);
		self.postMessage('<em>WORKER</em> replicateDB for ' + data.msg.source + ' to ' + data.msg.destination + ' is: ' + JSON.stringify(result) );
		break;
    case 'stop':
      self.postMessage('<strong>WORKER STOPPED:</strong> ' + data.msg);
      self.close(); // Terminates the worker.
      break;
    default:
      self.postMessage('<em>WORKER</em> Unknown command ?!? ' + data.msg);
  };
};
