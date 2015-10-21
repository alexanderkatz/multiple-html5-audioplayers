// Event listener for DOM
document.addEventListener("DOMContentLoaded", theDomHasLoaded, false);

// array of audio files
var files = ["driveslow.m4a", // 0 = 272 secs
			"golddigger.m4a", // 1 = 207 secs
			"heardemsay.m4a", // 2 = 203 secs
			"touchthesky.m4a" // 3 = 236 secs
			];

// array of audio element, id, and duration
var audioList = [];

function populateAudioList() {
	var audioElements = document.getElementsByClassName("audio");
	for (i = 0; i < audioElements.length; i++) {
		audioList.push({
			id: audioElements[i].id,
			element: audioElements[i],
			duration: 0
		});
	}
}

// getDuration
// get Duration and update audioList
function getDuration() {
	for (i = 0; i < audioList.length; i++) {
		audioList[i].element.addEventListener("durationchange", function () {
			var duration = document.getElementById(this.id).duration;
			var index = getAudioListIndex(this.id);
			audioList[index].duration = duration;
		}, false);
	}
}

// getAudioListIndex
// Given an id, find the index of element in audioList
function getAudioListIndex(id) {
	for (x in audioList) {
		if (audioList[x].id == id) {
			return x;
		}
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