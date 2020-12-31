const video = document.getElementById("video");
const playBtn = document.getElementById("play-button");
const volumeBtn = document.getElementById("volume-button");
const speed = document.getElementById("speed");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const currentTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const volumeRange = document.getElementById("volume-range");
const volumeBar = document.getElementById("volume-bar");
const fullscreenIcon = document.getElementById("fullscreen-button");
const mainContainer = document.getElementById("main-container");

let volume = 1;
let fullscreen = false;

// Play-Pause Video

const play = () => {

    video.play();
    playBtn.classList.replace("fa-play" , "fa-pause");
    playBtn.setAttribute("title" , "Pause");

};

const pause = () => {

    video.pause();
    playBtn.classList.replace("fa-pause" , "fa-play");
    playBtn.setAttribute("title" , "Play");

};

const playPauseVideo = () => {
    if(video.paused) {
        play();
    }
    else {
        pause();
    }
}


// Mute/Unmute Video

const muteUnmute = () => {

    if(video.muted===false) {
        video.muted = true;
        volumeBar.style.width = "0";
        volumeBtn.className = "";
        volumeBtn.classList.add("fas" , "fa-volume-off");
    }
    else {
        video.muted = false;
        volumeBar.style.width = `${volume * 100}%`;
        if(volume >= 0.7) {
            volumeBtn.classList.replace("fa-volume-off" , "fa-volume-up");
        }else if(volume > 0.1 && volume < 0.7) {
            volumeBtn.classList.replace("fa-volume-off" , "fa-volume-down");
        }
    }

};


// Speed Rate

const speedRate = () => {

    video.playbackRate = speed.value;

};


// Update Progress Bar

const updateProgress = (event) => {

    let clickedWidth = event.offsetX;
    let totalWidth = progress.offsetWidth;

    progressBar.style.width = `${clickedWidth / totalWidth * 100}%`;

    video.currentTime = clickedWidth / totalWidth * video.duration;


};


// Update Time

const transformTime = (time) => {
    if(time < 10) {
        return `0${time}`;
    }
    else{
        return time;
    }
};

const updateTime = () => {

    let currentMin = Math.floor(video.currentTime / 60);
    let currentSec = Math.floor(video.currentTime % 60);

    let totalMin = Math.floor(video.duration / 60);
    let totalSec = Math.floor(video.duration % 60);

    currentMin = transformTime(currentMin);
    currentSec = transformTime(currentSec);
    totalMin = transformTime(totalMin);
    totalSec = transformTime(totalSec);

    currentTime.textContent = `${currentMin}:${currentSec} / `;
    totalTime.textContent = `${totalMin}:${totalSec}`;


    progressBar.style.width = `${video.currentTime / video.duration * 100}%`;
};


// Update Volume Progress

const updateVolumeProgress = (event) => {


    const clickedWidth = event.offsetX;
    const totalWidth = volumeRange.offsetWidth;

    volumeBar.style.width = `${clickedWidth / totalWidth * 100}%`;
    volume = clickedWidth / totalWidth;

    video.volume = volume;

    if(volume >= 0.7) {
        volumeBtn.className = '';
        volumeBtn.classList.add("fas" , "fa-volume-up");
    }else if(volume > 0.1 && volume < 0.7) {
        volumeBtn.className = "";
        volumeBtn.classList.add("fas" , "fa-volume-down");
    }else {
        video.volume = 0;
        volumeBtn.className = "";
        volumeBtn.classList.add("fas" , "fa-volume-off");
    }
    

};


// Full Screen

const fullscreenMode = () => {

    if(!fullscreen) {
        openFullscreen(mainContainer);
    }else {
        closeFullscreen(mainContainer);
    }

};

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }
  
  /* Close fullscreen */
  function closeFullscreen(elem) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }





// Event Listeners
playBtn.addEventListener("click", playPauseVideo);
video.addEventListener("click" , playPauseVideo);

video.addEventListener("ended" , () => {
    pause();
    video.currentTime = 0;
});

volumeBtn.addEventListener("click" , muteUnmute);

speed.addEventListener("change" , speedRate);

progress.addEventListener("click" , updateProgress);

video.addEventListener("timeupdate" , updateTime);
// It helps us to load the current time and the video duration when the video can load and play.
video.addEventListener("canplay" , updateTime);

volumeRange.addEventListener("click" , updateVolumeProgress);

fullscreenIcon.addEventListener("click" , fullscreenMode);