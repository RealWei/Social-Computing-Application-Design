from TwitterAPI import TwitterAPI
import json
import sys
from operator import itemgetter

consumer_key = 'znBqTxcOUeQwFCLCrM52y90At'
consumer_secret = 'fqwvztVYt5nm8oshYlFpl7CUOxHBbZdgWgkuI5ezGyQtOC6T6a'
access_token_key = '314989726-WOWIC8XGJD87ZfczQItdzkaajt8L6HTfnXI7zaox'
access_token_secret = 'Q1HaKg95YzjjSXCvA5MaBwGA22UXnwoAx1b9UXTNN4sTA'

api = TwitterAPI(consumer_key, consumer_secret, access_token_key, access_token_secret)

## Track tweets containing keyword
r = api.request('statuses/filter', {'locations':'-74,40,-73,41'})
counter = 0;
tags = {}

for item in r:
    hasgtags = item['entities']['hashtags']
    print(counter)
    print(json.dumps(hasgtags, indent=4, sort_keys=True))  ##print the tweet objects out

    for tag in hasgtags:
        tag = tag['text'].lower()
        if tag not in tags:
            tags[tag] = 1
        else:
            tags[tag] += 1
    counter += 1
    if counter == 30:
        result = sorted(tags.items(), key=itemgetter(1), reverse=True)
        for i in range(5):
            pair = result[i]
            print("tag: %-10s count:%d" % (pair[0], pair[1]))
        sys.exit()
