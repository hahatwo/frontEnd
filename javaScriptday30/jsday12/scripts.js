/**
 * Created by 王航 on 2017/7/24.
 */

const player = document.querySelector('.player');
const video = player.querySelector('.player_video.viewer');
const controls = document.querySelector('.player_controls');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress_filled');
const toggleButton = document.querySelector('.toggle');
const ranges = document.querySelectorAll('.player_slider');
const skipButtons = document.querySelectorAll('[data-skip]');
const fullscreen = document.getElementById('fullscreen');
let flag = false;

function toggleScreen() {
   if(!flag){
       player.style.flexBasis = '100%';
       flag = true;
   } else {
      player.style.flexBasis = 'auto';
      flag = false;
   }
}

function togglePlay() {
    video.paused ? video.play() : video.pause();
}

function toggleButtonIcon() {
    const icon = video.paused ? '►' : '❚ ❚';
    toggleButton.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = percent + '%';
}

function srucb(e) {
    const percent = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = percent;
}

function initEventListener() {
    video.addEventListener('click', togglePlay);
    video.addEventListener('play', toggleButtonIcon);
    video.addEventListener('pause', toggleButtonIcon);
    toggleButton.addEventListener('click', togglePlay);
    ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
    ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
    skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));
    video.addEventListener('timeupdate', handleProgress);
    progress.addEventListener('click', srucb);
    fullscreen.addEventListener('click', toggleScreen);
}
initEventListener();