#!/usr/bin/python

#import server resources
from twisted.web import server, xmlrpc, resource
from twisted.internet import reactor, ssl
from twisted.web.static import File
import globalsList
#import web resourcetwisted.s
from indexResource import IndexResource
from spotifyResource import SpotifyResource


#import system modules

import os

#Runner Class
class MainObj:
	def __init__(self):
		
		
		#import all of the plugins

		self._startHttp()

		
		#start the great and mighty reactor
		reactor.run()
	
	def _startHttp(self):
		#create a static file resource
		public = File("public")
		
		#set up data type rules 
		
		root = IndexResource()

		spotify = SpotifyResource()
		#static routings
		root.putChild("",       root)
		root.putChild("public", public)
		root.putChild("spotify", spotify)
		site = server.Site(root)
		
		
		#Tell the reactor where to listen
		contextFactory = ssl.DefaultOpenSSLContextFactory('server.key', 'server.crt')
		reactor.listenSSL(443, site, contextFactory)
		reactor.listenTCP(80, site)
	

#init shared globals for authentication		
globalsList.init()
keyDict = dict()
	
#Go to the proper directory


#start the runner...
mainObj = MainObj()
