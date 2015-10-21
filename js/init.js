// Event listener for DOM
document.addEventListener("DOMContentLoaded", theDomHasLoaded, false);

// array of audio files
var files = ["driveslow.m4a",
			"golddigger.m4a",
			"heardemsay.m4a",
			"touchthesky.m4a"];

// array of audio element, id, and duration
var audioList = [];

function populateAudioList() {
	var audioElements = document.getElementsByClassName("audio");
	for (i = 0; i < audioElements.length; i++) {
		audioList.push({
			element: audioElements[i],
			id: audioElements[i].id,
			duration: 0
		});
	}
}

// getDuration
function getDuration() {
	for (i = 0; i < audioList.length; i++) {
		audioList[i].element.addEventListener("durationchange", function () {
			// Why can't I get duration with this.element.duration
			var duration = document.getElementById(this.id).duration;
			console.log(duration);
		}, false);
	}
}


///////////////////////////////////////////////
// GENERATE HTML FOR AUDIO ELEMENTS AND PLAYERS
///////////////////////////////////////////////

// createAudioElements
// create audio elements for each file in files
function createAudioElements() {
	for (f in files) {
		var audioString = "<audio id=\"audio-" + f + "\" class=\"audio\" preload=\"true\"><source src=\"audio/" + files[f] + "\"></audio>";
		$("#audio-players").append(audioString);
	}
}

// createAudioPlayers
// create audio players for each file in files
function createAudioPlayers() {
	for (f in files) {
		var playerString = "<div id=\"audioplayer-" + f + "\" class=\"audioplayer\"><button id=\"pButton-" + f + "\" class=\"play pButton\"></button><div id=\"timeline-" + f + "\" class=\"timeline\"><div id=\"playhead-" + f + "\" class=\"playhead\"></div></div></div>";
		$("#audio-players").append(playerString);
	}
}

function theDomHasLoaded(e) {
	// Create audio elements and audio players
	createAudioElements();
	createAudioPlayers();

	// Populate Audio List
	populateAudioList();

	getDuration();




}