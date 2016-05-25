#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import logging
import getpass
import re
import random
from optparse import OptionParser

import sleekxmpp

if sys.version_info < (3, 0):
    from sleekxmpp.util.misc_ops import setdefaultencoding
    setdefaultencoding('utf8')
else:
    raw_input = input


class EchoBot(sleekxmpp.ClientXMPP):
    def __init__(self, jid, password):
        sleekxmpp.ClientXMPP.__init__(self, jid, password)
        self.add_event_handler("session_start", self.start)
        self.add_event_handler("message", self.message)
        self.questions = list() # The predefined question regular expressions.
        self.responses = list() # The responses for each predefined question.
        self.load_conversation()
        self.load_words()

    def start(self, event):
        self.send_presence()
        self.get_roster()

    def message(self, msg):
        if msg['type'] in ('chat', 'normal'):
            question = msg['body'].lower()
            response = "Sorry, I don't understand what you said. OAQ"
            for i in xrange(len(self.questions)):
                """
                    Find whether user input matches predefined question regular expressions.
                    If it matches, response one of the possible responses by random.
                    If not, reply "Sorry, I don't understand what you said. OAQ".
                """
                if re.search(self.questions[i], question) is not None:
                    r = random.randint(0, len(self.responses[i]) - 1)
                    response = self.responses[i][r]
                    break
            msg.reply(response).send()

    """
        Load sentences and corresponding responses to memory.
    """
    def load_conversation(self):
        f = open("sentences", 'r')
        while True:
            line = f.readline()
            if not line:
                break
            sentences = line.split('-')
            self.questions.append(sentences[0])
            self.responses.append(sentences[1].split('| '))
        f.close()

    """
        Load words and corresponding responses to memory.
    """
    def load_words(self):
        f = open("words", 'r')
        while True:
            line = f.readline()
            if not line:
                break
            sentences = line.split('-')
            self.questions.append(sentences[0])
            self.responses.append(sentences[1].split('| '))
        f.close()

if __name__ == '__main__':
    optp = OptionParser()

    optp.add_option('-q', '--quiet', help='set logging to ERROR',
                    action='store_const', dest='loglevel',
                    const=logging.ERROR, default=logging.INFO)
    optp.add_option('-d', '--debug', help='set logging to DEBUG',
                    action='store_const', dest='loglevel',
                    const=logging.DEBUG, default=logging.INFO)
    optp.add_option('-v', '--verbose', help='set logging to COMM',
                    action='store_const', dest='loglevel',
                    const=5, default=logging.INFO)

    # JID and password options.
    optp.add_option("-j", "--jid", dest="jid",
                    help="JID to use")
    optp.add_option("-p", "--password", dest="password",
                    help="password to use")

    opts, args = optp.parse_args()

    # Setup logging.
    logging.basicConfig(level=opts.loglevel,
                        format='%(levelname)-8s %(message)s')

    if opts.jid is None:
        opts.jid = raw_input("Username: ")
    if opts.password is None:
        opts.password = getpass.getpass("Password: ")

    xmpp = EchoBot(opts.jid, opts.password)
    xmpp.register_plugin('xep_0030')  # Service Discovery
    xmpp.register_plugin('xep_0004')  # Data Forms
    xmpp.register_plugin('xep_0060')  # PubSub
    xmpp.register_plugin('xep_0199')  # XMPP Ping

    if xmpp.connect():
        xmpp.process(block=True)
        print("Done")
    else:
        print("Unable to connect.")
