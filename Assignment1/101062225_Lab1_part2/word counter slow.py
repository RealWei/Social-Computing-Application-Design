# -*- coding: utf-8 -*-
'''
    This program counts the occurrence of n-word sequences (n = 1~5).
'''
from operator import itemgetter

# Please replace filename before testing
filename = "/Users/RealWei/Documents/社群/Assignment1/101062225_Lab1_part2/big-sequence.txt"

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
    for i in xrange(0, len(words)):
        one_count[words[i]] = one_count.get(words[i], 0) + 1
        if i > 0:
            word = ''.join(words[j] for j in range(i - 1, i + 1))
            two_count[word] = two_count.get(word, 0) + 1
        if i > 1:
            word = ''.join(words[j] for j in range(i - 2, i + 1))
            three_count[word] = two_count.get(word, 0) + 1
        if i > 2:
            word = ''.join(words[j] for j in range(i - 3, i + 1))
            four_count[word] = four_count.get(word, 0) + 1
        if i > 3:
            word = ''.join(words[j] for j in range(i - 4, i + 1))
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
