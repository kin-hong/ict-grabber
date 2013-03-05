function copyToClipboard(text) {
	var copyDiv = document.createElement('div');
	copyDiv.contentEditable = true;
	document.body.appendChild(copyDiv);
	copyDiv.innerHTML = text;
	copyDiv.unselectable = "off";
	copyDiv.focus();
	document.execCommand('SelectAll');
	document.execCommand("Copy", false, null);
	document.body.removeChild(copyDiv);
}

$(function() {
	chrome.tabs.getSelected(null, function(tab) {
		// Send a request to the content script.
		if (tab.url.indexOf("www.aquaclusters.com") == -1) {
		 return;
		}
		chrome.tabs.sendMessage(tab.id, {action: "grabICT"}, function(response) {
			if (response) {
				var parts = tab.url.split("/");
				if (parts.length > 7 && response.issue && response.title) {
					var issueCheckinTitle = "&lt;"+parts[7]+":"+response.issue+"&gt;"+response.title;
					$(".ict").html("The following has been copied to clipboard:<br/><br/>"+issueCheckinTitle);
					copyToClipboard(issueCheckinTitle);
				}
			}
		});
	});
});
