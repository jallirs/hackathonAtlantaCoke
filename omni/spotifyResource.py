
#Twisted Imports
from twisted.web import server, resource, http
from twisted.web.http import Request
from twisted.web.util import redirectTo
from twisted.web.resource import Resource
from twisted.internet import reactor, ssl, defer
from twisted.web.server import Site, Session
import json

import sys
import globalsList

class SpotifyResource( Resource):


	def render_GET(self, request):
			return "invalid string"
		
