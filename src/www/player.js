(function () {
	var isIframeLoaded = false;
	var playerDOM = document.getElementById("player");
	var cloudMusic = "http://music.163.com/outchain/player?type=0&id=361168546&auto=1"; 
	if (/musicPlay=1/.test(document.cookie)) {
		loadIframe(cloudMusic);
	} 
	
	document.querySelector(".switch-angle").addEventListener("click", function () {
		if (playerDOM.className == "") {
			playerDOM.className = "show";
			if (!isIframeLoaded) loadIframe(cloudMusic);
			document.cookie = "musicPlay=1";
			return;
		} 
		playerDOM.className = ""; 
	});

	document.querySelector(".switch-exit").addEventListener("click", function () {
		isIframeLoaded = false;
		document.getElementById("player-iframe").innerHTML = '';
		playerDOM.className = ""; 
		document.cookie = "musicPlay=0";
	});

	function loadIframe(url) {
		document.getElementById("player-iframe").innerHTML = '<iframe src="' + url + '" border="0"></iframe>';
		isIframeLoaded = true;
	}
})();