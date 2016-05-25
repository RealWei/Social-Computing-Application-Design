#!/usr/bin/env python
# -*- coding: utf-8 -*-
from TwitterAPI import TwitterAPI
import json

consumer_key = 'znBqTxcOUeQwFCLCrM52y90At'
consumer_secret = 'fqwvztVYt5nm8oshYlFpl7CUOxHBbZdgWgkuI5ezGyQtOC6T6a'
access_token_key = '314989726-WOWIC8XGJD87ZfczQItdzkaajt8L6HTfnXI7zaox'
access_token_secret = 'Q1HaKg95YzjjSXCvA5MaBwGA22UXnwoAx1b9UXTNN4sTA'

api = TwitterAPI(consumer_key, consumer_secret, access_token_key, access_token_secret)
r = api.request('followers/list', {'screen_name': 'adele'})

for item in r:
    print(item['screen_name'])    ##print user's screen_name
