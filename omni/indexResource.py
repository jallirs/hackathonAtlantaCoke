from twisted.web.resource import Resource, ErrorPage
from twisted.web.util import redirectTo
import json
import globalsList






##
# Route:       "/"
# Description: This is the root resource of the
#              admin web ui.
##
class IndexResource(Resource):
	def getChildWithDefault(self, path, request): 
			if request.prepath != ['public'] and request.prepath != ['favicon.ico'] and request.prepath != ['']:
				return Resource.getChildWithDefault(self, path, request)
					#forward to whever was requested
					#try:
						#return Resource.getChildWithDefault(self, path, request)
					#except AttributeError:
			return Resource.getChildWithDefault(self, path, request)


	##
	#render authenticated reponse
	##
	def authenticatedGet(self, request):
		
		#send the headers
		request.setHeader("content-type", "text/html")
		
		#put together the output
		output = """
			<!DOCTYPE HTML>
			<html>
				<head>
					<title>Omni Play</title>
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
					<link rel="shortcut icon" href="public/assets/favicon.ico" type="image/x-icon" />
					<script data-main="public/js/main" src="public/js/libs/require/require.js"></script>
					<link rel="stylesheet" type="text/css" href="public/css/foundation.min.css">
					<link rel="stylesheet" type="text/css" href="public/css/style.css">
				</head>

				<body>
					<noscript>Please turn on javascript!</noscript>
				</body>
			</html>
		"""
		
		#send the output
		return output
	

	def unauthenticatedGet(self, request):
		request.setHeader("content-type", "text/html")

		return """<!DOCTYPE HTML>
<html>
	<head>
		<title>LOG IN</title>
		<script src="/public/js/libs/jquery/jquery-2.0.3.min.js"></script>
	</head>
	<body>
	
			
	<form  id="login" >
		<label for="username">Username</label>
		<input type="text" name="username" required>
		
		<label for="password">Password</label>
		<input type="password" name="password" required>

		<button> Login </button>
	</form>
	<div id="result"></div>
	<script src = "/public/js/libs/oauth/login.js"></script>
	</body>
</html>"""

	##
	#render the get
	##
	def render_GET(self, request):
		#if self.isLoggedIn(request):
		#request.setHeader("content-type", "text/html")
		return self.authenticatedGet(request)
				
