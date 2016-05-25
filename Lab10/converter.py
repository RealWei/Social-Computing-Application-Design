#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json

with open('data.json', encoding='utf-8') as data_file:    
    data = json.load(data_file)

def getUserCommon(type, returnArr, userCommArr):
	if type in member:
		for item in member[type]['data']:
			returnArr.append(item['name'])
			returnArr = sorted(returnArr)
			for member2 in data['friends']['data']:
				if member2['name'] == member['name']:
					continue
				if type in member2:
					for item2 in member2[type]['data']:
						if item2['id'] == item['id']:
							userCommArr[member2['name']] += 1
							# print(member['name'] + ' has common with ' +  member2['name'] + ' in ' + item['name'])
	return returnArr

result = ''
all_users = {}
for member in data['friends']['data']:
	all_users[member['name']] = {}

for member in data['friends']['data']:
	# print(member['name'])
	user_common = {}
	for member2 in data['friends']['data']:
		user_common[member2['name']] = 0
		user_music = []
		user_movies = []
		user_likes = []
	getUserCommon('music', user_music, user_common)
	getUserCommon('movies', user_movies, user_common)
	getUserCommon('likes', user_likes, user_common)
	all_users[member['name']] = user_common
title = ''
user_names = []
for user in all_users:
	title += ';'
	title += user
	user_names.append(user)

result += title
result += '\n'
for userName in user_names:
	data = ''
	for key in all_users[userName]:
		data += ';'
		data += str(all_users[userName][key])
	result += userName
	result += data
	result += '\n'

# print (result.encode('utf8'))

with open("data.csv", "w", encoding='utf-8') as text_file:
    text_file.write("%s" % result.replace(" ", "_"))
