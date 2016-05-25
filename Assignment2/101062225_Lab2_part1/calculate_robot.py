#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import logging
import getpass
import math
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

    def start(self, event):
        self.send_presence()
        self.get_roster()

    def message(self, msg):
        response = 0.0
        if msg['type'] in ('chat', 'normal'):
            expr = msg['body'].split()
            method = expr[0]
            numbers = map(float, expr[1:len(expr)])
            """
                Find the calculate function to be performed.
            """
            if method == "add":
                response = self.add(numbers)
            elif method == "minus":
                response = self.minus(numbers)
            elif method == "multiply":
                response = self.multiply(numbers)
            elif method == "divide":
                response = self.divide(numbers)
            elif method == "prime":
                response = self.prime_factor(numbers[0])
            elif method == "mod":
                response = math.fmod(numbers[0], numbers[1])
            elif method == "factorial":
                response = math.factorial(int(numbers[0]))
            elif method == "gcd":
                response = self.gcd(int(numbers[0]), int(numbers[1]))
            elif method == "exp":
                response = math.exp(numbers[0])
            elif method == "log":
                response = math.log(numbers[0]) if len(numbers) < 2 else math.log(numbers[0], numbers[1])
            elif method == "pow":
                response = math.pow(numbers[0], numbers[1])
            elif method == "sqrt":
                response = math.sqrt(numbers[0])

            msg.reply(str(response)).send()

    """
        The math.fsum() returns the sum of a list.
    """
    def add(self, *args):
        numbers = args[0]
        return math.fsum(map(float, numbers))

    """
        The first number n is the number to be subtracted.
        Then n is subtracted by each number in numbers except the first one.
    """
    def minus(self, *args):
        numbers = map(float, args[0])
        result = numbers[0]
        for i in xrange(1, len(numbers)):
            result -= numbers[i]
        return result

    """
        Iterate each number in numbers and multiply.
    """
    def multiply(self, *args):
        numbers = map(float, args[0])
        result = 1.0
        for n in numbers:
            result *= n
        return result

    """
        The first number n is the number to be divided.
        Then n is divided by each number in numbers except the first one.
    """
    def divide(self, *args):
        numbers = map(float, args[0])
        result = numbers[0]
        for i in xrange(1, len(numbers)):
            result /= numbers[i]
        return result

    """
        If x is not a prime number, it must have at least one prime factor <= sqrt(x)
        reference : http://calculus.nctu.edu.tw/upload/calculus_web/maple/Site/carnival/number/01.htm

        So for all prime factor p of x, 2 <= p <= sqrt(x).
        We can filter prime numbers first and build a prime table to speed up following factorizations.
        But I didn't implement it in this assignment.
    """
    def prime_factor(self, x):
        x = int(x)
        result = ""
        first = True
        for i in range(2, int(math.ceil(math.sqrt(x))) + 1):
            if x < 2:
                break
            while x % i == 0:
                if not first:
                    result += " * "
                else:
                    first = False
                result += str(i)
                x = x / i

        if x > 1:
            if not first:
                result += " * "
            result += str(x)
        return result

    """
        Divide x and y by each other until one of them become 0.
        Then return the other one.
    """
    def gcd(self, x, y):
        while x != 0 and y != 0:
            x %= y
            x, y = y, x
        return x if x > 0 else y

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
