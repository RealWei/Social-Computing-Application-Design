#!/usr/bin/env python
# -*- coding: utf-8 -*-
from operator import itemgetter

# Please replace filename before testing
filename = "big-sequence.txt"

f = open(filename, 'r')

# The count of n-word will be stored infollowing item separately.
one_count = dict()
two_count = dict()
three_count = dict()
four_count = dict()
five_count = dict()

# Process single line at a time, rather than the whole content.
while True:
    line = f.readline()
    if not line:
        break
    words = line.split()
    # _count occurrence for each word.
    for i in xrange(len(words)):
        word = words[i]
        one_count[word] = one_count.get(word, 0) + 1
    # _count occurrence for 2-word sequence, by starting from index 1, and append
    # i - 1 to produce 2-word sequence. Following n-word loops does similar thing
    for i in xrange(1, len(words)):
        word = words[i - 1] + " " + words[i]
        two_count[word] = two_count.get(word, 0) + 1
    for i in xrange(2, len(words)):
        word = words[i - 2] + " " + words[i - 1] + " " + words[i]
        three_count[word] = three_count.get(word, 0) + 1
    for i in xrange(3, len(words)):
        word = words[i - 3] + " " + words[i - 2] + " " + words[i - 1] + " " + words[i]
        four_count[word] = four_count.get(word, 0) + 1
    for i in xrange(4, len(words)):
        word = words[i - 4] + " " + words[i - 3] + " " + words[i - 2] + " " + words[i - 1] + " " + words[i]
        five_count[word] = five_count.get(word, 0) + 1

# Sort the result by occurrence in decreasing order.
result1 = sorted(one_count.items(), key=itemgetter(1), reverse=True)
result2 = sorted(two_count.items(), key=itemgetter(1), reverse=True)
result3 = sorted(three_count.items(), key=itemgetter(1), reverse=True)
result4 = sorted(four_count.items(), key=itemgetter(1), reverse=True)
result5 = sorted(five_count.items(), key=itemgetter(1), reverse=True)

# Print the result.
print("-----Top five 1-words sequences-----")
for i in range(5):
    print(result1[i])

print("-----Top five 2-words sequences-----")
for i in range(5):
    print(result2[i])

print("-----Top five 3-words sequences-----")
for i in range(5):
    print(result3[i])

print("-----Top five 4-words sequences-----")
for i in range(5):
    print(result4[i])

print("-----Top five 5-words sequences-----")
for i in range(5):
    print(result5[i])
