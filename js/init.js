// Event listener for DOM
document.addEventListener("DOMContentLoaded", theDomHasLoaded, false);

// array of audio files
var files = ["driveslow.m4a", // 0 = 272 secs
			"golddigger.m4a", // 1 = 207 secs
			"heardemsay.m4a", // 2 = 203 secs
			"touchthesky.m4a" // 3 = 236 secs
			];

///////////////////////////////////////////////
// Find and store audio info
///////////////////////////////////////////////

// array for AudioObjects
var audioList = [];

// AudioObject Constructor
function AudioObject(element, duration) {
	this.element = element;
	this.id = element.id;
	this.duration = duration;
}

// Connects Audio Player to AudioObject
// This asscosciates the play button and other player elements with the correct AudioObject
// num is used to find the correct pieces of the audio player
AudioObject.prototype.bindAudioPlayer = function (num) {
	this.audioplayer = document.getElementById("audioplayer-" + num);
	this.playbutton = document.getElementById("playbutton-" + num);
	this.timeline = document.getElementById("timeline-" + num);
	this.playhead = document.getElementById("playhead-" + num);
}

// play
AudioObject.prototype.play = function () {
	// start music
	if (this.element.paused) {
		this.element.play();
		// remove play, add pause
		playbutton.className = "";
		playbutton.className = "pause";
	} else { // pause music
		this.element.pause();
		// remove pause, add play
		playbutton.className = "";
		playbutton.className = "play";
	}
}

// populateAudioList
function populateAudioList() {
	var audioElements = document.getElementsByClassName("audio");
	for (i = 0; i < audioElements.length; i++) {
		audioList.push(
			new AudioObject(audioElements[i], 0)
		);
		audioList[i].bindAudioPlayer(i);
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
// Control Audio Player
///////////////////////////////////////////////

//for (i = 0; i < audioList.length; i++) {
//	audioList[i].element.addEventListener("click", function () {});
//}

//Play and Pause
function play() {
	// start music
	if (music.paused) {
		music.play();
		// remove play, add pause
		playbutton.className = "";
		playbutton.className = "pause";
	} else { // pause music
		music.pause();
		// remove pause, add play
		playbutton.className = "";
		playbutton.className = "play";
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
		var playerString = "<div id=\"audioplayer-" + f + "\" class=\"audioplayer\"><button id=\"playbutton-" + f + "\" class=\"play playbutton\"></button><div id=\"timeline-" + f + "\" class=\"timeline\"><div id=\"playhead-" + f + "\" class=\"playhead\"></div></div></div>";
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