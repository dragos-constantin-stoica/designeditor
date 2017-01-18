#!/bin/bash

rm *.zip; zip -r designeditor.zip designeditor manifest.json -x "*/\.DS_Store*"