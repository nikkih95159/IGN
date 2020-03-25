$(document).ready(function() {
    $.ajax({
        url: "https://ign-apis.herokuapp.com/videos?startIndex=0&count=20",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: "GET", /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {
        },
        success: function(data) {
            // console.log(data.data[0].assets[0].url);
            // console.log(data);
            for (i = 0; i < data.data.length; i++) {
                playlist[i] = {
                    contentId: data.data[i].contentId,
                    title: data.data[i].metadata.title,
                    thumbnail: data.data[i].thumbnails[2].url,
                    url: data.data[i].assets[3].url,
                    description: data.data[i].metadata.description,
                    // comments: 0
                }; 
            }
            loadVideos();
        },
        error: function(request, error) {
            alert("Request: " + JSON.stringify(request));
        }
    });
    // get articles for nav bar
    $.ajax({
        url: "https://ign-apis.herokuapp.com/articles?startIndex=0&count=5",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: "GET", /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {
        },
        success: function(data) {
            // console.log(data.data[0].assets[0].url);
            console.log(data);
            for (i = 0; i < data.data.length; i++) {
                if (data.data[i].metadata.objectName !== "")
                    document.getElementById(`nav${i}`).innerHTML = data.data[i].metadata.objectName;
                else {
                    // console.log(data.data[i].metadata.headline);
                    var nav = data.data[i].metadata.headline.substring(0, data.data[i].metadata.headline.indexOf(":"));
                    if (nav === "") {
                        // console.log(data.data[i].metadata.headline);
                        var ind1 = data.data[i].metadata.headline.indexOf(' ');
                        var ind2 = data.data[i].metadata.headline.indexOf(' ', ind1 + 1);
                        var substring = data.data[i].metadata.headline.substring(0,ind2);
                        // console.log(substring);
                        document.getElementById(`nav${i}`).innerHTML = substring;
                    }
                    else
                        document.getElementById(`nav${i}`).innerHTML = nav;
                }
            }
        },
        error: function(request, error) {
            alert("Request: " + JSON.stringify(request));
        }
    });
});
// var numComments = [];
var playlist = [];
const title = document.getElementById('title');
const videoTitle = document.getElementById('video-title');
const videoDescription = document.getElementById('video-description');
const videoComments = document.getElementById('video-comments');
const video = document.getElementById('video');
const videoControls = document.getElementById('video-controls');
const topControls = document.getElementById('top-controls');

function loadVideos() {
    //load main video

    // for (i = 0; i < playlist.length; i++) {
    //     $.ajax({
    //         url: `https://ign-apis.herokuapp.com/comments?ids=${playlist[i].contentId}`,
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         type: "GET", /* or type:"GET" or type:"PUT" */
    //         dataType: "json",
    //         data: {
    //         },
    //         success: function(data) {
    //             console.log(playlist[i].title);
    //             playlist[i].comments = data.content[0].comments;
    //             loadVideos();
    //         },
    //         error: function(request, error) {
    //             alert("Request: " + JSON.stringify(request));
    //         }
    //     });
    // }

    video.setAttribute('src', playlist[0].url);
    video.setAttribute('poster', playlist[0].thumbnail);
    title.innerHTML = playlist[0].title;
    videoTitle.innerHTML = playlist[0].title;
    videoDescription.innerHTML = playlist[0].description;
    videoComments.innerHTML = 'Number of commments: ' + playlist[0].comments;
    const showPlaylist = 4;
    for (i = 1; i <= showPlaylist; i++) {
        document.getElementById(`video${i}`).setAttribute('src', playlist[i].thumbnail);
        document.getElementById(`video${i}-title`).innerHTML = playlist[i].title;
    }
    
}

const videoWorks = !!document.createElement('video').canPlayType;
if (videoWorks) {
    video.controls = false;
    videoControls.classList.remove('hidden');
    topControls.classList.remove('hidden');
}

const playButton = document.getElementById('play');
playButton.addEventListener('click', togglePlay);
function togglePlay() {
    if (video.paused || video.ended) {
        video.play();
    }
    else {
        video.pause();
    }
}


// const playbackIcons = document.querySelectorAll('.playback-icons use');
const playbackIcons = document.querySelectorAll('.playback-icons object');
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
function updatePlayButton() {
    playbackIcons.forEach(icon => icon.classList.toggle('hidden'));

    if (video.paused || video.ended) {
        playButton.setAttribute('data-title', 'Play (k)');
    }
    else {
        playButton.setAttribute('data-title', 'Pause (k)');
    }
}

const timeElapsed = document.getElementById('time-elapsed');
const duration = document.getElementById('duration');
video.addEventListener('loadedmetadata', initializeVideo);
function formatTime(timeInSeconds) {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11,8);
  
    return {
        minutes: result.substr(3,2),
        seconds: result.substr(6,2),
    };
}
const progressBar = document.getElementById('progress-bar');
const seek = document.getElementById('seek');
function initializeVideo() {
    const videoDuration = Math.round(video.duration);
    seek.setAttribute('max', videoDuration);
    progressBar.setAttribute('max', videoDuration);
    const time = formatTime(videoDuration);
    duration.innerText = `${time.minutes}:${time.seconds}`;
    duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}

video.addEventListener('timeupdate', updateTimeElapsed);
video.addEventListener('timeupdate', updateProgress);
function updateTimeElapsed() {
    const time = formatTime(Math.round(video.currentTime));
    timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
    timeElapsed.setAttribute('datatime', `${time.minutes}m ${time.seconds}s`);
}

function updateProgress() {
    seek.value = Math.floor(video.currentTime);
    progressBar.value = Math.floor(video.currentTime);
}

const seekTooltip = document.getElementById('seek-tooltip');
seek.addEventListener('mousemove', updateSeekTooltip);
function updateSeekTooltip(event) {
    const skipTo = Math.round((event.offsetX / event.target.clientWidth) * parseInt(event.target.getAttribute('max'),10));
    seek.setAttribute('data-seek', skipTo);
    const t = formatTime(skipTo);
    seekTooltip.textContent = `${t.minutes}:${t.seconds}`;
    const rect = video.getBoundingClientRect();
    seekTooltip.style.left = `${event.pageX - rect.left}px`;
}

seek.addEventListener('input', skipAhead);
function skipAhead(event) {
    const skipTo = event.target.dataset.seek;
    video.currentTime = skipTo;
    progressBar.value = skipTo;
    seek.value = skipTo;
}

const volumeButton = document.getElementById('volume-button');
// const volumeIcons = document.querySelectorAll('.volume-button use');
const volumeIcons = document.querySelectorAll('.volume-button object');
const volumeMute = document.getElementById('mute');
const volumeLow = document.getElementById('volume-low');
const volumeHigh = document.getElementById('volume-high');
const volume = document.getElementById('volume');
volume.addEventListener('input', updateVolume);
function updateVolume() {
    if (video.muted) {
        video.muted = false;
    }
    
    video.volume = volume.value;
}

video.addEventListener('volumechange', updateVolumeIcon);
function updateVolumeIcon() {
    volumeIcons.forEach(icon => {
        icon.classList.add('hidden');
    });

    volumeButton.setAttribute('data-title', 'Mute (m)');

    if (video.muted || video.volume === 0) {
        volumeMute.classList.remove('hidden');
        volumeButton.setAttribute('data-title', 'Unmute (m)');
    }
    else if (video.volume > 0 && video.volume <= 0.5) {
        volumeLow.classList.remove('hidden');
    }
    else {
        volumeHigh.classList.remove('hidden');
    }
}

volumeButton.addEventListener('click', toggleMute);
function toggleMute() {
    video.muted = !video.muted;

    if (video.muted) {
        volume.setAttribute('data-volume', volume.value);
        volume.value = 0;
    }
    else {
        volume.value = volume.dataset.volume;
    }
}

video.addEventListener('click', togglePlay);
const playbackAnimation = document.getElementById('playback-animation');
video.addEventListener('click', animatePlayback);
function animatePlayback() {
    playbackAnimation.animate([
        {
            opacity: 1,
            transform: "scale(1)",
        },
        {
            opacity: 0,
            transform: "scale(1.3)",
        }], {
            duration: 500,
    });
}
document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        togglePlay();
        animatePlayback();
        e.preventDefault();
    }
}

const fullscreenButton = document.getElementById('fullscreen-button');
const videoContainer = document.getElementById('video-container');
fullscreenButton.onclick = toggleFullScreen;
function toggleFullScreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    else {
        videoContainer.requestFullscreen();
    }
}

const fullscreenIcons = fullscreenButton.querySelectorAll('object');
videoContainer.addEventListener('fullscreenchange', updateFullscreenButton);
function updateFullscreenButton() {
    fullscreenIcons.forEach(icon => icon.classList.toggle('hidden'));

    if (document.fullscreenElement) {
        fullscreenButton.setAttribute('data-title', 'Exit full screen (f)');
    }
    else {
        fullscreenButton.setAttribute('data-title', 'Full screen (f)');
    }
}

// show picture in picture element
const pipButton = document.getElementById('pip-button');
pipButton.addEventListener('click', togglePip);
document.addEventListener('DOMContentLoaded', () => {
    if (!('pictureInPictureEnabled' in document)) {
        pipButton.classList.add('hidden');
    }
});
async function togglePip() {
    try {
        if (video !== document.pictureInPictureElement) {
            pipButton.disabled = true;
            await video.requestPictureInPicture();
        }
        else {
            await document.exitPictureInPicture();
        }
    }
    catch (error) {
        console.error(error);
    }
    finally {
        pipButton.disabled = false;
    }
}

//show and hide controls
video.addEventListener('mouseenter', showControls);
video.addEventListener('mouseleave', hideControls);
videoControls.addEventListener('mouseenter', showControls);
videoControls.addEventListener('mouseleave', hideControls);
topControls.addEventListener('mouseenter', showControls);
topControls.addEventListener('mouseleave', hideControls);
function hideControls() {
    // if (video.paused) {
        // return;
    // }

    videoControls.classList.add('hide');
    topControls.classList.add('hide');
}
function showControls() {
    videoControls.classList.remove('hide');
    topControls.classList.remove('hide');
}

// add functionality for keyboard inputs
document.addEventListener('keyup', keyboardShortcuts);
function keyboardShortcuts(event) {
    const {key} = event;
    switch (key) {
        case 'k':
            togglePlay();
            animatePlayback();
            if (video.paused) {
                showControls();
            }
            else {
                setTimeout(() => {
                    hideControls();
                }, 2000);
            }
            break;
        case 'm':
            toggleMute();
            break;
        case 'f':
            toggleFullScreen();
            break;
        case 'p':
            togglePip();
            break;
    }
}

// play next video in playlist
var playlistIndex = 0;
video.addEventListener('ended', playNextVideo);
function playNextVideo() {
    console.log('ended');
    if (playlistIndex < playlist.length) {
        setTimeout(() => {
            video.setAttribute('src', playlist[playlistIndex].url);
            video.setAttribute('poster', playlist[playlistIndex].thumbnail);
            title.innerHTML = playlist[playlistIndex].title;
            videoTitle.innerHTML = playlist[playlistIndex].title;
            videoDescription.innerHTML = playlist[playlistIndex].description;
            videoComments.innerHTML = 'Number of commments: ' + playlist[playlistIndex].comments;
            video.play();
            playlistIndex++;
        }, 2000);
    }
    else {
        alert('You have watched all videos!');
    }
}

const video1 = document.getElementById('video1');
video1.addEventListener('click', function() {
    playClickedVideo(1);
});
const video2 = document.getElementById('video2');
video2.addEventListener('click', function() {
    playClickedVideo(2);
});
const video3 = document.getElementById('video3');
video3.addEventListener('click', function() {
    playClickedVideo(3);
});
const video4 = document.getElementById('video4');
video4.addEventListener('click', function() {
    playClickedVideo(4);
});
const playIcon = document.getElementById('play-button');
const pauseIcon = document.getElementById('pause-button');
function playClickedVideo(num) {
    console.log('hi');
    if (video.getAttribute('src') !== playlist[num].url) {
        video.setAttribute('src', playlist[num].url);
        video.setAttribute('poster', playlist[num].thumbnail);
        title.innerHTML = playlist[num].title;
        videoTitle.innerHTML = playlist[num].title;
        videoDescription.innerHTML = playlist[num].description;
        videoComments.innerHTML = 'Number of commments: ' + playlist[num].comments;
        pauseIcon.setAttribute('class', 'hidden');
        playIcon.setAttribute('class', '');
        setTimeout(() => {
            video.play();
        }, 1000);
    }
}

const loadButton = document.getElementById('load-button');
// loadButton.addEventListener('click', loadVideos);
const moreVideos = document.getElementById('more-videos');
var videosDisplayed = 4;
function loadMoreVideos() {
    // console.log(videosDisplayed);
    videosDisplayed++;
    for (i = videosDisplayed; i < videosDisplayed+4; i++) {
        console.log(i);
        if (i < 20) {
            moreVideos.innerHTML +=
                "<hr>" +
                "<div class='row'>" +
                "<div class='left'>" + 
                "<a href='#'>" +
                    "<img id='video" + i +"' src='' style='width: 125px; height:75px;'>" +
                "</a>" +
                "</div>" +
                "<div class='right' id='video" + i +"-title'>" +
                "</div>" +
                "</div>"
            ;
            document.getElementById(`video${i}`).setAttribute('src', playlist[i].thumbnail);
            document.getElementById(`video${i}-title`).innerHTML = playlist[i].title;
            document.getElementById(`video${i}`).addEventListener('click', function() {
                playClickedVideo(i);
            });
        }
        else {
            loadButton.hidden = true;
        }
    }
    videosDisplayed += 3;
}