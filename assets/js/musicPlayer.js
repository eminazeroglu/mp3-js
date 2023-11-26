/* 
    Audio
    - Yuklendiyi anda datalari goturemek ucun loadedmetadata
        duration
    - Saniye gecdiyi muddeti goturmek ucun timeupdate
        currentTime
*/
class MusicPlayer {
    constructor (musicList, ui) {
        this.musicList = musicList;
        this.ui = ui;
        this.index = 0;
        this.played = false;
        this.volumed = true;
        this.currentVolume = 100;

        this.event();
    }

    displayMusic () {
        const music = this.musicList[this.index];
        this.ui.musicPhoto.src = `/assets/img/${music.img}`;
        this.ui.audio.src = `/assets/mp3/${music.mp3}`;
        this.ui.name.textContent = music.name;
        this.ui.author.textContent = music.author;
    }

    next () {
        if (this.index + 1 < this.musicList.length) {
            this.index++;
        }
        else {
            this.index = 0;
        }
        this.displayMusic();
        this.createPlayList();
        if (this.played) {
            this.play(true)
        }
    }

    prevous () {
        if (this.index > 0) {
            this.index--;
        }
        else {
            this.index = this.musicList.length - 1;
        }
        this.displayMusic();
        this.createPlayList();
        if (this.played) {
            this.play(true)
        }
    }

    play (status = false) {
        
        if (status) {
            this.played = true;
        }
        else {
            this.played = !this.played;
        }

        if (!this.played) {
            this.ui.audio.pause();
            this.ui.btnPlay.querySelector('i').classList = 'fa-solid fa-play';
            this.ui.eqContent.style.display = 'none'
        }
        else {
            this.ui.audio.play();
            this.ui.btnPlay.querySelector('i').classList = 'fa-solid fa-pause';
            this.ui.eqContent.style.display = 'block'
        }
    }

    calculateTime (seconder) {
        const minute = Math.floor(seconder / 60);
        const second = Math.floor(seconder % 60);
        return `${minute}:${(second < 10 ? '0' + second : second)}`;
    }

    createPlayList () {
        let html = ''
        this.musicList.forEach((music, musicIndex) => {
            html += `
                <button data-index="${musicIndex}" class="btnChangeMusic flex py-2 first:pt-0 last:pb-0 items-center ${this.index === musicIndex ? 'text-orange-300' : 'text-white'} justify-between w-full text-xs hover:text-orange-300">
                    <span>${music.author} - ${music.name}</span>
                </button>
            `
        });
        this.ui.musicList.innerHTML = html;

        document.querySelectorAll('.btnChangeMusic').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = btn.getAttribute('data-index');

                this.index = parseInt(index);
                this.displayMusic();
                this.createPlayList();
                this.play(true);
            })
        })
    }

    event () {

        const obj = this;
        this.ui.btnNext.addEventListener('click', () => this.next())
        this.ui.btnPrev.addEventListener('click', () => this.prevous())
        this.ui.btnPlay.addEventListener('click', () => this.play())

        this.ui.audio.addEventListener('loadedmetadata', () => {
             const endTime = this.calculateTime(this.ui.audio.duration);
             const currentTime = this.calculateTime(this.ui.audio.currentTime);
             this.ui.startTime.textContent = currentTime;
             this.ui.endTime.textContent = endTime;
        });

        this.ui.audio.addEventListener('timeupdate', () => {
            const currentTime = this.calculateTime(this.ui.audio.currentTime);
            const endTime = this.calculateTime(this.ui.audio.duration - this.ui.audio.currentTime);
            this.ui.startTime.textContent = currentTime;
            this.ui.endTime.textContent = endTime;

            const total = (this.ui.audio.currentTime / this.ui.audio.duration) * 100;

            this.ui.progressBar.style.width = total + '%';

            if (this.ui.audio.currentTime === this.ui.audio.duration) {
                this.next();
            }
        });

        this.ui.volume.addEventListener('click', () => {
            this.volumed = !this.volumed;

            if (!this.volumed) {
                this.ui.audio.muted = true;
                this.ui.volume.classList = 'fa-solid fa-volume-xmark'
                this.ui.volumeLevel.style.width = '0%'
            }
            else {
                this.ui.audio.muted = false;
                this.ui.volume.classList = 'fa-solid fa-volume-high'
                const calcWidth = this.currentVolume * 100;
                this.ui.volumeLevel.style.width = `${(calcWidth > 100 ? 100 : calcWidth)}%`
            }
        })

        this.ui.volumeControl.addEventListener('click', function (e) {
            const controlVolume = this.getBoundingClientRect();
            const progress = (e.clientX - controlVolume.left) / controlVolume.width;
            obj.ui.audio.volume = progress;
            obj.currentVolume = progress;
            obj.ui.volumeLevel.style.width = `${(obj.currentVolume * 100)}%`;
        })

        this.ui.progressBarContent.addEventListener('click', function (e) {
            const controlBar = this.getBoundingClientRect();
            const progress = (e.clientX - controlBar.left) / controlBar.width;

            obj.ui.progressBar.style.width = `${(progress * 100)}%`;

            obj.ui.startTime.textContent = obj.calculateTime(progress * obj.ui.audio.duration);
            obj.ui.audio.currentTime = progress * obj.ui.audio.duration;
        })

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                this.play();
            }
            else if (e.code === 'ArrowRight') {
                this.next();
                this.play(true);
            }
            else if (e.code === 'ArrowLeft') {
                this.prevous();
                this.play(true);
            }
        });
    }
}