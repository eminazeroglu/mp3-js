const ui = {
    musicPhoto: document.getElementById('music-photo'),
    author: document.getElementById('author'),
    name: document.getElementById('name'),
    audio: document.getElementById('audio'),
    startTime: document.getElementById('startTime'),
    endTime: document.getElementById('endTime'),
    btnPrev: document.getElementById('btnPrev'),
    btnPlay: document.getElementById('btnPlay'),
    btnNext: document.getElementById('btnNext'),
    musicList: document.getElementById('musicList'),
    progressBar: document.getElementById('progressBar'),
    progressBarContent: document.getElementById('progressBarContent'),
    volumeControl: document.getElementById('volumeControl'),
    volumeLevel: document.getElementById('volumeLevel'),
    volume: document.getElementById('volume'),
    eqContent: document.getElementById('eqContent'),
}

const player = new MusicPlayer(musics, ui);

player.displayMusic();
player.createPlayList();