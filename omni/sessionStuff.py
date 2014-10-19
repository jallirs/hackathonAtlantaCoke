import spotify

config = spotify.Settings()
config.application_key = '~/Documents/omni/spotify_appkey.key'
with open('~/Documents/omni/spotify_appkey.key', mode='rb') as file:
	config.application_key = file.read()


#config.load_application_key_file()
session = spotify.Session(config=config)
print dir(session)
