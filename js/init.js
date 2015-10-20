// Event listener for DOM
document.addEventListener("DOMContentLoaded", theDomHasLoaded, false);

// array of audio files
var files = ["driveslow.m4a",
			"golddigger.m4a",
			"heardemsay.m4a",
			"touchthesky.m4a"];

// createAudioElements
// create audio elements for each file in files
function createAudioElements() {
	for (f in files) {
		var audioString = "<audio id=\"music-" + f + "\" preload=\"true\"><source src=\"audio/" + files[f] + "\"></audio>";
		$("#audio-players").append(audioString);
	}
}

// createAudioPlayers
// should each element of audio player have number that can be tied to the parent and its file
function createAudioPlayers() {
	for (f in files) {
		var playerString = "<div id=\"audioplayer-" + f + "\" class=\"audioplayer\"><button id=\"pButton-" + f + "\" class=\"play pButton\"></button><div id=\"timeline-" + f + "\" class=\"timeline\"><div id=\"playhead-" + f + "\" class=\"playhead\"></div></div></div>";
		$("#audio-players").append(playerString);
	}
}

function theDomHasLoaded(e) {
	createAudioElements();
	createAudioPlayers();
}