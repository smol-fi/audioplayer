var player = document.getElementById('musicPlayer');
var seekbar = document.getElementById('seek');
var time = document.getElementById('time');
var cover = document.getElementById('display');
var select = document.getElementsByClassName('song-select');
var songName = document.getElementById('songname');
var volbar = document.getElementById('volumeBar');
var songs = [
	{
		artist: "Artist 1",
		title: "Title 1"
	},
	{
		artist: "Artist 2",
		title: "Song 2"
	},
	{
		artist: "Artist 3",
		title: "Song 3"},
];

songNr = 1;

player.addEventListener('durationchange', setupSeekbar);
player.addEventListener('timeupdate', updateSeekbar);
player.addEventListener('volumechange', prevVolume);

seconds = 0;


player.ontimeupdate = function() {
	tracktime = Math.floor(player.currentTime);
	duration = Math.floor(player.duration);

	seconds = tracktime % 60;
	minutes = (tracktime - seconds) / 60;

	seconds2 = duration % 60;
	minutes2 = (duration - seconds2) / 60;

	if (seconds < 10) {
			seconds = "0" + seconds;
	}

	if (minutes < 10) {
			minutes = "0" + minutes;
	}
	if (seconds2 < 10) {
			seconds2 = "0" + seconds2;
	}
	
	if (minutes2 < 10) {
			minutes2 = "0" + minutes2;
	}

	time.innerHTML = minutes + ':' + seconds + '/' + minutes2 + ':' + seconds2;
}

function songTitle() {

	var songMeta = songs[songNr - 1];
	player.src = "./audio/song" + songNr + ".mp3";
	cover.style.backgroundImage = "url(./img/cover" + songNr + ".jpg)";
	songName.innerHTML = songMeta.artist + ' - ' + songMeta.title;
}

seekbar.value = 0;

function setupSeekbar() {
	seekbar.min = player.startTime;
	seekbar.max = player.duration;
}

function seekAudio() {
	player.currentTime = seekbar.value;
}

seekbar.onchange = seekAudio;

function updateSeekbar() {
	var lastBuffered = player.buffered.end(player.buffered.length - 1);
	seekbar.min = player.startTime;
	seekbar.max = lastBuffered;
	seekbar.value = player.currentTime;
}


function playMusic () {
	player.play();
}

function pauseMusic () {
	player.pause();
}

function stopMusic () {
	player.pause();
	player.currentTime = 0;
}

function nextSong() {
	songNr++;
	if (songNr >=4) {
		songNr = 1;
		player.currentTime = 0;
		songTitle();
		player.play();
	}
	else {
		player.currentTime = 0;
		songTitle();
		player.play();
	}
}

function prevSong() {
		if (seconds >= 5) {
		player.currentTime = 0;
	}
	else if (seconds < 6 && songNr == 1) {
		songNr = 3;
		player.currentTime = 0;
		songTitle();
		player.play();
	}
	else if (seconds < 6) {
		songNr--;
		player.currentTime = 0;
		songTitle();
		player.play();
	}
}

prevVolume = 1;

function prevVolume () {
	if (player.volume != 0) {
	prevVolume = player.volume;
	}
}

function changeVolume(vol) {
	player.volume = vol;
	document.getElementById('volume').innerHTML = 'Volume ' + Math.floor(vol * 100) + '%';
}

volbar.value=1;

function muteVolume () {
	if (player.volume != 0) {
		player.volume = 0;
		volbar.value = 0;
		document.getElementById('volume').innerHTML = 'Volume MUT';
		document.getElementById('volbutton').classList.remove('glyphicon-volume-up');
		document.getElementById('volbutton').classList.add('glyphicon-volume-off');
	}

	else {
		player.volume = prevVolume;
		volbar.value = prevVolume;
		document.getElementById('volume').innerHTML = 'Volume ' + Math.floor(prevVolume * 100) + '%';
		document.getElementById('volbutton').classList.add('glyphicon-volume-up');
		document.getElementById('volbutton').classList.remove('glyphicon-volume-off');
	}
}

function playlistSelect(sel) {
	player.currentTime = 0;
	songNr = sel;
	songTitle();
	player.play();
}
