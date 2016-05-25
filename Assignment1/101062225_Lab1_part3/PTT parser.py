#!/usr/bin/python
# -*- coding: utf-8 -*-
import requests
from bs4 import BeautifulSoup
postURL = "https://www.ptt.cc/bbs/StupidClown/M.1443521969.A.C78.html"

# Retrieve html by http request.
r = requests.get(postURL)
# Use lxml as parser, you can replace with Python built-in HTML parser instead.
soup = BeautifulSoup(r.text, "lxml")
title = "Result of " + soup.title.string.encode("utf-8")

# Retrieve comment part of a PTT post.
comments = soup.find_all("div", class_="push")

# Put back html as string.
x = ''.join(str(e) for e in comments)

# Reparse html only for comment part. (for output)
soup = BeautifulSoup(x, "lxml")

# Initialize counter of three kinds of comment type.
pushes = 0
boos = 0
arrows = 0

# Count comments by type.
for commentTypeHtml in soup.find_all("span", class_="push-tag"):
    commentType = commentTypeHtml.string.encode("utf-8")
    if commentType == "噓 ":
        boos += 1
    elif commentType == "推 ":
        pushes += 1
    elif commentType == "→ ":
        arrows += 1

# Append output in html form.
htmlToWrite = "<!DOCTYPE html>\n" + "<html>\n" + "\t<head>\n" + "\t\t<meta charset=\"utf-8\" />\n" + "\t\t<title>" + title + "</title>\n\t</head>\n<body>\n"

htmlToWrite += "<div>推 " + str(pushes) + "</div>"
htmlToWrite += "<div>噓 " + str(boos) + "</div>"
htmlToWrite += "<div>→ " + str(arrows) + "</div><div></br></div>"
htmlToWrite += soup.prettify().encode("utf-8")

htmlToWrite += "</body></html>"

# Write to file.
outputFile = open("output.html", 'w')
outputFile.write(htmlToWrite)
outputFile.close()
