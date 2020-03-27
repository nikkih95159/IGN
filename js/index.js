$(document).ready(function() {
    document.body.style.zoom = 1.0;
    // get the current date
    const date = document.getElementById('date');
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var dayoftheWeek= dateObj.getDay();
    date.innerHTML = `<h3>${days[dayoftheWeek]},</h3>` + `<h3>${months[month-1]} ${day}</h3>`;

    // API call to get videos and their metadata
    $.ajax({
        url: "https://ign-apis.herokuapp.com/videos?startIndex=0&count=20",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: "GET",
        dataType: "json",
        data: {
        },
        success: function(data) {
            for (i = 0; i < data.data.length; i++) {
                var date = new Date(data.data[i].metadata.publishDate);
                var dd = date.getDate(); 
                var mm = date.getMonth()+1;
                var yyyy = date.getFullYear(); 
                if (dd < 10)
                    dd = '0'+ dd; 
                if (mm < 10)
                    mm = '0' + mm;
                var d = mm+'/'+dd+'/'+yyyy;
                var assetSize = data.data[i].assets.length;
                var thumbnailSize = data.data[i].thumbnails.length;
                playlist[i] = {
                    contentId: data.data[i].contentId,
                    title: data.data[i].metadata.title,
                    thumbnail: data.data[i].thumbnails[thumbnailSize-1].url,
                    url: data.data[i].assets[1].url,
                    HDurl: data.data[i].assets[assetSize - 1].url,
                    description: data.data[i].metadata.description,
                    date: d,
                    comments: 0
                };
                addComments(i);
            }
            loadVideos();
        },
        error: function(request, error) {
            alert("Request: " + JSON.stringify(request));
        }
    })
    // API call to get videos and their metadata
    $.ajax({
        url: "https://ign-apis.herokuapp.com/videos?startIndex=20&count=20",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: "GET",
        dataType: "json",
        data: {
        },
        success: function(data) {
            for (i = 0; i < data.data.length; i++) {
                var date = new Date(data.data[i].metadata.publishDate);
                var dd = date.getDate(); 
                var mm = date.getMonth()+1;
                var yyyy = date.getFullYear(); 
                if (dd < 10)
                    dd = '0'+ dd; 
                if (mm < 10)
                    mm = '0' + mm;
                var d = mm+'/'+dd+'/'+yyyy;
                var assetSize = data.data[i].assets.length;
                var thumbnailSize = data.data[i].thumbnails.length;
                playlist[i+20] = {
                    contentId: data.data[i].contentId,
                    title: data.data[i].metadata.title,
                    thumbnail: data.data[i].thumbnails[thumbnailSize-1].url,
                    url: data.data[i].assets[1].url,
                    HDurl: data.data[i].assets[assetSize - 1].url,
                    description: data.data[i].metadata.description,
                    date: d,
                    comments: 0
                };
                addComments(i+20);
            }
        },
        error: function(request, error) {
            alert("Request: " + JSON.stringify(request));
        }
    });
    // API call to get videos and their metadata
    $.ajax({
        url: "https://ign-apis.herokuapp.com/videos?startIndex=40&count=20",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: "GET",
        dataType: "json",
        data: {
        },
        success: function(data) {
            for (i = 0; i < data.data.length; i++) {
                var date = new Date(data.data[i].metadata.publishDate);
                var dd = date.getDate(); 
                var mm = date.getMonth()+1;
                var yyyy = date.getFullYear(); 
                if (dd < 10)
                    dd = '0'+ dd; 
                if (mm < 10)
                    mm = '0' + mm;
                var d = mm+'/'+dd+'/'+yyyy;
                var assetSize = data.data[i].assets.length;
                var thumbnailSize = data.data[i].thumbnails.length;
                playlist[i+40] = {
                    contentId: data.data[i].contentId,
                    title: data.data[i].metadata.title,
                    thumbnail: data.data[i].thumbnails[thumbnailSize-1].url,
                    url: data.data[i].assets[1].url,
                    HDurl: data.data[i].assets[assetSize - 1].url,
                    description: data.data[i].metadata.description,
                    date: d,
                    comments: 0
                };
                addComments(i+40);
            }
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
        type: "GET",
        dataType: "json",
        data: {
        },
        success: function(data) {
            for (i = 0; i < data.data.length; i++) {
                // parse the article title name with either the words before the colon or if no colon exists, just get the first two words
                if (data.data[i].metadata.objectName !== "")
                    document.getElementById(`nav${i}`).innerHTML = data.data[i].metadata.objectName;
                else {
                    var nav = data.data[i].metadata.headline.substring(0, data.data[i].metadata.headline.indexOf(":"));
                    if (nav === "") {
                        var ind1 = data.data[i].metadata.headline.indexOf(' ');
                        var ind2 = data.data[i].metadata.headline.indexOf(' ', ind1 + 1);
                        var substring = data.data[i].metadata.headline.substring(0,ind2);
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

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var playlist = [];

// variables for the main video element
const title = document.getElementById('title');
const videoTitle = document.getElementById('video-title');
const videoDescription = document.getElementById('video-description');
const videoComments = document.getElementById('video-comments');
const videoDate = document.getElementById('video-date');
const video = document.getElementById('video0');

// control variables
const videoControls = document.getElementById('video-controls');
const topControls = document.getElementById('top-controls');

// API call to get the comments for videos based on their contentId
function addComments(i) {
    $.ajax({
        url: `https://ign-apis.herokuapp.com/comments?ids=${playlist[i].contentId}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: "GET",
        dataType: "json",
        data: {},
        success: function(data) {
            playlist[i].comments = data.content[0].count;
        },
        error: function(request, error) {
            alert("Request: " + JSON.stringify(request));
        } 
    })
}

// load the main video and its details
// default video quality size is low quality
function loadVideos() {
    video.setAttribute('src', playlist[0].url);
    video.setAttribute('poster', playlist[0].thumbnail);
    title.innerHTML = playlist[0].title;
    videoTitle.innerHTML = playlist[0].title;
    videoDescription.innerHTML = playlist[0].description;
    videoDate.innerHTML = 'Published on: ' + playlist[0].date;
    videoComments.innerHTML = 'Number of commments: ' + playlist[0].comments;
    video.loop = false;
    const showPlaylist = 4;
    for (i = 1; i <= showPlaylist; i++) {
        document.getElementById(`video${i}`).setAttribute('src', playlist[i].thumbnail);
        document.getElementById(`video${i}-title`).innerHTML = playlist[i].title;
    }
    
}

// remove native controls and implement our own
const videoWorks = !!document.createElement('video').canPlayType;
if (videoWorks) {
    video.controls = false;
    videoControls.classList.remove('hidden');
    topControls.classList.remove('hidden');
}

// toggle play and pause button controls
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

// update play and pause button when video is paused or played
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

// format time for video
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

// set video duration
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

// update time elapsed shown on video controls
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

// update tooltip when mouse hovers
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

// skip to video where user clicked
seek.addEventListener('input', skipAhead);
function skipAhead(event) {
    const skipTo = event.target.dataset.seek;
    video.currentTime = skipTo;
    progressBar.value = skipTo;
    seek.value = skipTo;
}

// update sound based on volume controls
const volumeButton = document.getElementById('volume-button');
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

// update volume icons based on sound
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

// toggle volume and mute buttons
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

// animate the fade pause and play icon
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
    // spacebar keyboard press, pause video
    if(e.keyCode == 32){
        togglePlay();
        animatePlayback();
        e.preventDefault();
    }

    // left arrow keyboard press, go back 10 seconds
    if (e.keyCode == 37) {
        video.currentTime -= 10;
    }
    
    // right arrow keyboard press, skip ahead by 10 seconds
    if (e.keyCode == 39) {
        video.currentTime += 10;
    }
    
}

// toggle fullscreen video
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

// update fullscreen icons and data titles
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
        case 'r':
            toggleLoop();
            break;
        case 'n':
            playNext();
            break;
    }
}

// if video ends without user clicking on a video, automatically play the next video in the playlist array
var playlistIndex = 1;
video.addEventListener('ended', playNextVideo);
function playNextVideo() {
    if (video.loop === true) {
        video.currentTime = 0;
        video.play();
    }
    else {
        if (playlistIndex < playlist.length) {
            setTimeout(() => {
                if (HDButton.getAttribute('data-title') === 'HD')
                    video.setAttribute('src', playlist[playlistIndex].url);
                else
                    video.setAttribute('src', playlist[playlistIndex].HDurl);
                video.setAttribute('poster', playlist[playlistIndex].thumbnail);
                title.innerHTML = playlist[playlistIndex].title;
                videoTitle.innerHTML = playlist[playlistIndex].title;
                videoDescription.innerHTML = playlist[playlistIndex].description;
                videoDate.innerHTML = 'Published on: ' + playlist[playlistIndex].date;
                videoComments.innerHTML = 'Number of commments: ' + playlist[playlistIndex].comments;
                video.play();
                index = playlistIndex;
                playlistIndex++;
            }, 2000);
        }
        else {
            alert('You have watched all videos!');
        }
    }
}

// play next video in playlist when the next arrow is clicked (top right)
const nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', playNext);
function playNext() {
    if (playlistIndex < playlist.length) {
        if (video.getAttribute('src') !== playlist[playlistIndex].url || video.getAttribute('src') !== playlist[playlistIndex].HDurl) {
            setTimeout(() => {
                if (HDButton.getAttribute('data-title') === 'HD')
                    video.setAttribute('src', playlist[playlistIndex].url);
                else
                    video.setAttribute('src', playlist[playlistIndex].HDurl);
                video.setAttribute('poster', playlist[playlistIndex].thumbnail);
                title.innerHTML = playlist[playlistIndex].title;
                videoTitle.innerHTML = playlist[playlistIndex].title;
                videoDescription.innerHTML = playlist[playlistIndex].description;
                videoDate.innerHTML = 'Published on: ' + playlist[playlistIndex].date;
                videoComments.innerHTML = 'Number of commments: ' + playlist[playlistIndex].comments;
                pauseIcon.setAttribute('class', 'hidden');
                playIcon.setAttribute('class', '');
                video.play();
                index = playlistIndex;
                playlistIndex++;
            }, 500);
        }
    }
}

// variables and click listeners for the 1st four videos shown
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
var index = 0;

// play the video the user clicks on
function playClickedVideo(num) {
    if (video.getAttribute('src') !== playlist[num].url || video.getAttribute('src') !== playlist[1].HDurl) {
        if (HDButton.getAttribute('data-title') === 'HD')
            video.setAttribute('src', playlist[num].url);
        else
            video.setAttribute('src', playlist[num].HDurl);
        video.setAttribute('poster', playlist[num].thumbnail);
        title.innerHTML = playlist[num].title;
        videoTitle.innerHTML = playlist[num].title;
        videoDescription.innerHTML = playlist[num].description;
        videoDate.innerHTML = 'Published on: ' + playlist[num].date;
        videoComments.innerHTML = 'Number of commments: ' + playlist[num].comments;
        pauseIcon.setAttribute('class', 'hidden');
        playIcon.setAttribute('class', '');
        index = num;
        playlistIndex = num + 1;
        setTimeout(() => {
            video.play();
        }, 1000);
    }
}

// load more videos if the 'Load More' button is pressed
const loadButton = document.getElementById('load-button');
const moreVideos = document.getElementById('more-videos');
var videosDisplayed = 4;
function loadMoreVideos() {
    videosDisplayed++;
    for (i = videosDisplayed; i < videosDisplayed+4; i++) {
        console.log(i);
        if (i < 60) {
            moreVideos.innerHTML +=
                "<hr>" +
                "<div class='row'>" +
                "<div class='left'>" + 
                "<a href='#' onclick='playClickedVideo(" + i + ")'>" +
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

// repeat current video if repeat button is clicked
const repeatButton = document.getElementById('repeat-button');
repeatButton.addEventListener('click', toggleLoop);
const repeatIcons = document.querySelectorAll('.repeat-button object');
function toggleLoop() {
    repeatIcons.forEach(icon => icon.classList.toggle('hidden'));
    if (video.loop === true) {
        video.loop = false;
        repeatButton.setAttribute('data-title', 'Repeat (r)');
    }
    else {
        video.loop = true;
        repeatButton.setAttribute('data-title', 'No Repeat (r)');
    }
}

// change current video quality to HD
const HDButton = document.getElementById('HD-button');
HDButton.addEventListener('click', toggleHD);
const HDIcons = document.querySelectorAll('.HD-button object');
function toggleHD() {
    HDIcons.forEach(icon => icon.classList.toggle('hidden'));
    if (HDButton.getAttribute('data-title') === 'HD') {
        var currTime = video.currentTime;
        HDButton.setAttribute('data-title', 'Regular');
        video.setAttribute('src', playlist[index].HDurl);
        video.currentTime = currTime;
        video.play();
    }
    else {
        var currTime = video.currentTime;
        HDButton.setAttribute('data-title', 'HD');
        video.setAttribute('src', playlist[index].url);
        video.currentTime = currTime;
        video.play();
    }
}
