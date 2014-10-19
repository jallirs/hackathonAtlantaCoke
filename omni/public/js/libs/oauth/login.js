$(document).ready( function() {
			console.log("This RANNNN");	
			var page = "";
			page += "<!DOCTYPE HTML>";
			page += "<html>";
			page += "<head>";
			page += "<title>Cisco Telepresence Admin UI Dashboard<\/title>";
			page += "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" \/>";
			page += "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\">";
			page += "<link rel=\"shortcut icon\" href=\"public\/assets\/favicon.ico\" type=\"image\/x-icon\" \/>";
			page += "<script data-main=\"public\/js\/main\" src=\"public\/js\/libs\/require\/require.js\"><\/script>";
			page += "<link rel=\"stylesheet\" type=\"text\/css\" href=\"public\/css\/foundation.min.css\">";
			page += "<link rel=\"stylesheet\" type=\"text\/css\" href=\"public\/css\/style.css\">";
			page += "<\/head>";
			page += "<body>";
			page += "<noscript>Please turn on javascript!<\/noscript>";
			page += "<\/body>";
			page += "<\/html>";

			var token = sessionStorage.getItem("auth_token_webui");
			if (typeof token != "undefined" ) {
				$.ajax({
					type: "GET",
					beforeSend: function (request)
					{
						request.setRequestHeader("authentication_token" , token);
					},
					url: "login",
					processData: false,
					complete: function(e, xhr, settings) {
						
						if(e.status === 200){
							document.open();
							document.write(page);
							document.close();
						}
						

					}
				
				});
				
			}


			$('button').click( function	(){
				

	
				var $form = $("#login");
				console.log($("input[name=username]").val());	
				data = new FormData();
				data.append("username", $("input[name=username]").val());
				data.append("password", $("input[name=password]").val());
				url = "login";
				


								$.ajaxSetup({async: false});	
				$.ajax({
								type: 'POST',								
								url: 		url, 
								data:		data,
								contentType: false, 
								processData: false,
								dataType:	"json",
								complete: 	function (data) {
											
											sessionStorage.setItem("auth_token_webui", data.responseJSON.authentication_token);
											tok = sessionStorage.getItem("auth_token_webui");
											console.log(tok);

											$.ajaxSetup({
												headers: {'authentication_token': tok}	
											});

											document.open();
											document.write(page);
											document.close();

											
											}
														});
				return false; 

	
				});

			
			
			});

