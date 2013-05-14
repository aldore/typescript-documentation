function loadTemplate(templateName, target, url, data, beforeRender){
	switch(arguments.length){
		case 3:
		case 4:
      case 5:
			$.ajax({
				url: url,
				type: "POST",
				data: (data) ? data : {},
				success: function(answer){
					try{
						answer = $.parseJSON(answer); 
					}catch(e){
						console.log("Error happend:( Answer was:", answer);
					}
					loadTemplateSource(templateName);
               if(beforeRender){
                   answer = beforeRender(answer);
               }
					var template = $("#" + templateName + "Tmpl").tmpl(answer);
					$(target).html(template);
				}
			})
			break;
		case 2:
			loadTemplateSource(templateName);
			var template = $("#" + templateName + "Tmpl").tmpl();
			$(target).html(template);
			break;
      case 1:
			loadTemplateSource(templateName);
			var template = $("#" + templateName + "Tmpl").tmpl();
			$(document.body).append(template);
			break;
		default:
			return false;
	}
}

function loadTemplateSource(templateName) {
	var templatePath = "assets/templates/";
	if($("#" + templateName + "Tmpl").length == 0){
		$.ajax({
			url: templatePath + templateName + ".tmpl.html",
			async: false,
			success: function(data) {
				$('body').append('<script id="' + templateName + 'Tmpl" type="text/x-jquery-tmpl"></script>');
				$("#"+templateName+"Tmpl").html(data);
				var templates = data.match(/\{\{(\s*)tmpl\(([\w\s\{\}\(\)\.\+:,"]*)\)(\s*)"#([\w]*)Tmpl"(\s*)\}\}/gi);
				if(templates !== null){
					for(var i = 0; i < templates.length; i++){
						var addTemplateName = templates[i].match(/\{\{(\s*)tmpl\(([\w\s\{\}\(\)\.\+:,"]*)\)(\s*)"#([\w]*)Tmpl"(\s*)\}\}/i)[4];
						loadTemplateSource(addTemplateName);
					}
				}
			}
		});
	}else{
		var templates = $("#" + templateName + "Tmpl").html().match(/\{\{(\s*)tmpl\(([\w\s\{\}\(\)\.\+:,"]*)\)(\s*)"#([\w]*)Tmpl"(\s*)\}\}/gi);
		if(templates !== null){
			for(var i = 0; i < templates.length; i++){
				var addTemplateName = templates[i].match(/\{\{(\s*)tmpl\(([\w\s\{\}\(\)\.\+:,"]*)\)(\s*)"#([\w]*)Tmpl"(\s*)\}\}/i)[4];
            if(addTemplateName != templateName){
                loadTemplateSource(addTemplateName);
            }
			}
		}
	}
	$.getScript(templatePath + templateName + ".js");
}