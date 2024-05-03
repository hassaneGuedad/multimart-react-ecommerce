# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# import nltk
# from nltk.stem import WordNetLemmatizer
# from nltk.corpus import stopwords

# # initialize the lemmatizer and stopwords
# lemmatizer = WordNetLemmatizer()
# stop_words = set(stopwords.words('english'))

# @api_view(['POST'])
# def chatbot(request):
#     # get the user's message from the POST request
#     message = request.data['message']

#     # tokenize the user's message
#     words = nltk.word_tokenize(message.lower())

#     # remove stop words from the user's message
#     words = [word for word in words if word not in stop_words]

#     # lemmatize the remaining words in the user's message
#     words = [lemmatizer.lemmatize(word) for word in words]

#     # determine the chatbot's response based on the user's message
#     response = 'Hello, how can I help you?'
#     if 'help' in words:
#         response = 'Sure, what do you need help with?'
#     elif 'problem' in words:
#         response = 'What seems to be the problem?'
#     elif 'thanks' in words or 'thank you' in words:
#         response = 'You\'re welcome!'

#     # return the chatbot's response in a JSON format
#     return Response({'message': response})

from rest_framework.decorators import api_view
from rest_framework.response import Response
import nltk
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from nltk import pos_tag
from nltk.corpus.reader.wordnet import NOUN, VERB, ADJ, ADV

class ChatBot:
    def __init__(self):
        self.lemmatizer = WordNetLemmatizer()
        self.stop_words = set(stopwords.words('english'))

    def get_wordnet_pos(self, treebank_tag):
        if treebank_tag.startswith('J'):
            return ADJ
        elif treebank_tag.startswith('V'):
            return VERB
        elif treebank_tag.startswith('N'):
            return NOUN
        elif treebank_tag.startswith('R'):
            return ADV
        else:
            return NOUN  # Default to noun

    def preprocess(self, message):
        tokens = nltk.word_tokenize(message.lower())
        tagged_tokens = pos_tag(tokens)
        words = [self.lemmatizer.lemmatize(word, pos=self.get_wordnet_pos(tag))
                for word, tag in tagged_tokens if word not in self.stop_words]
        return words

    def determine_response(self, words):
        words_set = set(words)  # Use a set for faster lookup
        if 'help' in words_set:
            return 'Sure, what do you need help with?'
        if 'problem' in words_set:
            return 'What seems to be the problem?'
        if any(word in words_set for word in ['thanks', 'thank you']):
            return 'You\'re welcome!'
        if 'product' in words_set:
            # Créer un lien où le mot "product" est cliquable
            response = 'Cliquer <a href="http://localhost:3000/shop">ici</a> sur le mot "product"'
            return response
        if any(word in words_set for word in ['order', 'buy', 'purchase']):
            return 'Looks like you are interested in placing an order. What would you like to buy?'
        return 'Hello, how can I help you?'
    
    
        

@api_view(['POST'])
def chatbot(request):
    bot = ChatBot()
    message = request.data.get('message', '')
    words = bot.preprocess(message)
    response = bot.determine_response(words)
    return Response({'message': response})
