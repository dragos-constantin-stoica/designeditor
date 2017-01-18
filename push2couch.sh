#!/bin/bash

#
# Push to CouchDB all files in this directory
# as attachetemts to _design/appzip in database
# appzip
#

# Change your connection string accordingly
# COUCHDB_CONNECTION="http://admin:password@localhost:5984"
COUCHDB_CONNECTION="http://localhost:5984"


#
# Cleanup first
# Delete database
#

curl -X DELETE $COUCHDB_CONNECTION/appzip
curl -X PUT $COUCHDB_CONNECTION/appzip
curl -X PUT $COUCHDB_CONNECTION/appzip/_design/appzip -d {}

for file in *; do
    rev="$(curl -sS $COUCHDB_CONNECTION/appzip/_design/appzip | sed -ne 's/^.*"_rev":"\([^"]*\)".*$/\1/p')"
	#echo $rev

	contenttype="Content-Type: application/octet-stream"

	case "$file" in
	*.txt | *.map)
			contenttype="Content-Type: text/plain"
	        ;;
	*.js)
			contenttype="Content-Type: application/x-javascript"
			;;
	*.html)
			contenttype="Content-Type: text/html"
			;;
	*.css)
			contenttype="Content-Type: text/css"
			;;
	*.jpg | *.jpeg)
			contenttype="Content-Type: image/jpeg"
			;;
	*.gif)
			contenttype="Content-Type: image/gif"
			;;
	*.png)
			contenttype="Content-Type: image/png"
			;;
	*)
			contenttype="Content-Type: application/octet-stream"
	        ;;
	esac


	curl -vX PUT $COUCHDB_CONNECTION/appzip/_design/appzip/$file?rev="$rev" --data-binary @"$file" -H "$contenttype"
done
