// Might want to make a lookup table so I have each element associated with the proper
// Audio Element

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
// components and the index for their AudioObject
var componentDict = {};
// store AudioObject that is currently playing
var playingAudio = null;

/* AudioObject Constructor */
function AudioObject(audio, duration) {
	this.audio = audio;
	this.id = audio.id;
	this.duration = duration;
}
/* bindAudioPlayer
 * Store audioplayer components in correct AudioObject
 * num identifes correct audioplayer
 */
AudioObject.prototype.bindAudioPlayer = function (num) {
	this.audioplayer = document.getElementById("audioplayer-" + num);
	this.playbutton = document.getElementById("playbutton-" + num);
	this.timeline = document.getElementById("timeline-" + num);
	this.playhead = document.getElementById("playhead-" + num);
	this.timelineWidth = this.timeline.offsetWidth - this.playhead.offsetWidth
}

/* populateAudioList */
function populateAudioList() {
	var audioElements = document.getElementsByClassName("audio");
	for (i = 0; i < audioElements.length; i++) {
		audioList.push(
			new AudioObject(audioElements[i], 0)
		);
		audioList[i].bindAudioPlayer(i);
		audioList[i].addEventListeners();
	}
}

/* populateComponentDictionary() 
 * {key=element id : value=index of audioList} */
function populateComponentDictionary() {
	for (i = 0; i < audioList.length; i++) {
		console.log(i);
		componentDict[audioList[i].playbutton.id] = i;
		componentDict[audioList[i].timeline.id] = i;
		componentDict[audioList[i].playhead.id] = i;
	}
}

/* addEventListeners() */
AudioObject.prototype.addEventListeners = function () {
	this.audio.addEventListener("timeupdate", AudioObject.prototype.timeUpdate, false);
	this.timeline.addEventListener("click", AudioObject.prototype.timelineClick, false);
}

/* getDuration
 * get Duration and update audioList
 */
function getDuration() {
	for (i = 0; i < audioList.length; i++) {
		audioList[i].audio.addEventListener("durationchange", function () {
			var duration = document.getElementById(this.id).duration;
			var index = getAudioListIndex(this.id);
			audioList[index].duration = duration;
		}, false);
	}
}

///////////////////////////////////////////////
// Update Audio Player
///////////////////////////////////////////////

/* play() 
 * play or pause selected audio, if there is a song playing pause it
 */
AudioObject.prototype.play = function () {
	if (this == playingAudio) {
		playingAudio = null;
		this.audio.pause();
		changeClass(this.playbutton, "playbutton play");
	}
	// else check if playing audio exists and pause it, then start this
	else {
		if (playingAudio != null) {
			playingAudio.audio.pause();
			changeClass(playingAudio.playbutton, "playbutton play");
		}
		this.audio.play();
		playingAudio = this;
		changeClass(this.playbutton, "playbutton pause");
	}
}

/* timelineClick()
 *
 */
AudioObject.prototype.timelineClick = function (event) {
	console.log("This: " + this.id);
	// find audio object
	//	moveplayhead(event);
	//	music.currentTime = duration * clickPercent(event);
}

/* timeUpdate 
 * Synchronizes playhead position with current point in audio 
 * this is the html audio element
 */
AudioObject.prototype.timeUpdate = function () {
	// audio element's AudioObject
	var audioObject = audioList[getAudioListIndex(this.id)];
	var playPercent = audioObject.timelineWidth * (audioObject.audio.currentTime / audioObject.duration);
	audioObject.playhead.style.marginLeft = playPercent + "px";
	if (audioObject.audio.currentTime == audioObject.duration) {
		audioObject.playbutton.className = "";
		audioObject.playbutton.className = "play";
	}
}

///////////////////////////////////////////////
// Utility Methods
///////////////////////////////////////////////

/* changeClass 
 * overwrites element's class names */
function changeClass(element, newClasses) {
	element.className = newClasses;
}

/* getAudioListIndex
 * Given an id, find the index of element in audioList */
function getAudioListIndex(id) {
	for (x in audioList) {
		if (audioList[x].id == id) {
			return x;
		}
	}
}
/* clickPercent()
 * returns click as decimal (.77) of the total timelineWidth */
function clickPercent(e, timeline) {
	return (e.pageX - timeline.offsetLeft) / timelineWidth;
}

///////////////////////////////////////////////
// GENERATE HTML FOR AUDIO ELEMENTS AND PLAYERS
///////////////////////////////////////////////

/* createAudioElements
 * create audio elements for each file in files */
function createAudioElements() {
	for (f in files) {
		var audioString = "<audio id=\"audio-" + f + "\" class=\"audio\" preload=\"true\"><source src=\"audio/" + files[f] + "\"></audio>";
		$("#audio-players").append(audioString);
	}
}

/* createAudioPlayers
 * create audio players for each file in files */
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
	populateComponentDictionary();
	getDuration();




}