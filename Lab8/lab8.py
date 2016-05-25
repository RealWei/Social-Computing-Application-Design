from nltk.util import bigrams
from nltk.tokenize import word_tokenize
from nltk.corpus import brown
from nltk.probability import ConditionalFreqDist

words = brown.words()
cfdist = ConditionalFreqDist(bigrams(words))

while (True):
    x = input("Enter you word : ")
    print(cfdist[x].most_common(5))


# print(cfdist['I'].most_common(3))
# print(cfdist['United'].most_common(3))
