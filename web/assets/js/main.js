var oDoc = {};

$(function(){
	loadTemplateSource("docnav");

	$.ajax({
		url: "../tests/akra-test/akra.json",
		dataType: "json",
		success: function(answer){
			oDoc = answer;
			var template = $("#docnavTmpl").tmpl({data: answer});
			$("#doc-nav-wrap").html(template);
		}
	})

	$("body").on("click", ".dropdown-container .dropdown-header", function(){
		var pContainer = $(this).parents(".dropdown-container");
		var isClosed = pContainer.hasClass("closed");

		pContainer.toggleClass("closed", !isClosed);

		if(isClosed) {
			pContainer.find(".dropdown-header .icon").removeClass("icon-chevron-right");
			pContainer.find(".dropdown-header .icon").addClass("icon-chevron-down");
		} else {
			pContainer.find(".dropdown-header .icon").removeClass("icon-chevron-down");
			pContainer.find(".dropdown-header .icon").addClass("icon-chevron-right");
		}
	})
})

