chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action == "grabICT") {
   	sendResponse({
   		issue: $(".issue-sidebar-table h4 a").text(),
   		title: $(".view-object-card .view-object-header .title h3").text()
   	});
	}
});