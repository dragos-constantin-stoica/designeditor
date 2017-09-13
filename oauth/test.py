#!/usr/bin/env python2
from oauth import oauth # pip install oauth
import httplib

URL = 'http://192.168.1.17:5984/_session'
CONSUMER_KEY = 'key'
CONSUMER_SECRET = 'cheiadeacces'
TOKEN = 'token'
SECRET = 'gajpentrucheie'

consumer = oauth.OAuthConsumer(CONSUMER_KEY, CONSUMER_SECRET)
token = oauth.OAuthToken(TOKEN, SECRET)
req = oauth.OAuthRequest.from_consumer_and_token(
    consumer,
    token=token,
    http_method='GET',
    http_url=URL,
    parameters={}
)
req.sign_request(oauth.OAuthSignatureMethod_HMAC_SHA1(), consumer,token)

headers = req.to_header()
headers['Accept'] = 'application/json'

con = httplib.HTTPConnection('192.168.1.17', 5984)
con.request('GET', URL, headers=headers)
resp = con.getresponse()
print resp.read()
