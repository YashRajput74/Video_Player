import videojs from "video.js";
import 'video.js/dist/video-js.css'
import 'videojs-youtube'
import { playlist, themePalette } from "./data";
function renderHeader(){
    return `
        <div>
            <img src="/image-removebg-preview.png" alt="logo">
            <span>PlayNest</span>
        </div>
        <nav>
            <ul>
                <li>Upload local videos</li>
                <li id="themeBtn">Themes
                    <ul id="themesDropdown" class="theme-dropdown">
                    </ul>
                </li>
                <li>Settings</li>
            </ul>
            
        </nav>
    `
};
function renderMainSection(){
    return `<div id="video-container">
                <video id="my-video" class="video-js vjs-default-skin" controls preload="auto">
                    Your browser does not support HTML5 video.
                </video>
            </div>`;
}
function renderSidebar(){
    return `
            <div>
                Want to make a playlist paste your links here to add videos in the playlist.
            </div>
            <div>
            <label for="inputURL"></label>
            <input type="text" id="inputURL" placeholder="Paste the link here">
            <button class="submitLink">Submit</button>
            </div>
            <div class="playlistDisplay">
                <!-- Playlist content goes here -->
            </div>`;
}
function renderPage(){
    document.querySelector("header").innerHTML=renderHeader();
    document.querySelector("main").innerHTML=renderMainSection();
    document.querySelector("#sidebar").innerHTML=renderSidebar();
}
function initializeVideoPlayer(){

    let currentVideoIndex=0;
    
    const player = videojs('my-video', {
        autoplay: false,
        controls: true,
        loop: false,
        muted: false,
        techOrder: ['youtube'],
        sources: [{
            type: "video/youtube",
            src: playlist[currentVideoIndex].src
        }]
    });
    player.volume(0.5);
    function playNextVideo(){
        currentVideoIndex=(currentVideoIndex+1)%playlist.length;
        player.src({type:"video/youtube",src: playlist[currentVideoIndex].src});
        player.play();
    }
    player.on("ended",playNextVideo)
    const controlBar=player.getChild('controlBar');
    const speedButton=document.createElement('div');
    speedButton.className='vjs-control vjs-button custom-speed-button';
    speedButton.setAttribute("role","button");
    speedButton.setAttribute('aria-label',"Playback Speed");
    speedButton.innerHTML="Speed";
    player.controlBar.el().appendChild(speedButton);
    const speedDropdown=document.createElement("ul");
    speedDropdown.className="speed-dropdown";
    speedDropdown.style.display="none";
    ['1','1.25','1.5'].forEach(speed=>{
        const option=document.createElement("li");
        option.textContent=`${speed}x`;
        option.addEventListener('click',()=>{
            player.playbackRate(parseFloat(speed));
            speedDropdown.style.display="none";
        });
        speedDropdown.appendChild(option);
    });
    speedButton.appendChild(speedDropdown);
    speedButton.addEventListener("click",()=>{
        speedDropdown.style.display=speedDropdown.style.display==="none"?"block":"none";
    })
}document.addEventListener('DOMContentLoaded', () => {
    renderPage();
    initializeVideoPlayer();
    renderThemes();
    addThemeDropdownToggle();
});

function addThemeDropdownToggle() {
    const themeBtn = document.getElementById('themeBtn');
    const themesDropdown = document.getElementById('themesDropdown');

    themeBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        themesDropdown.style.display = themesDropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function(event) {
        if (!themeBtn.contains(event.target) && !themesDropdown.contains(event.target)) {
            themesDropdown.style.display = 'none';
        }
    });
}

function renderThemes() {
    const dropdown = document.getElementById('themesDropdown');
    themePalette.forEach((gradient, index) => {
        const themeItem = document.createElement('li');
        themeItem.style.cursor = 'pointer';
        themeItem.innerHTML = `Theme ${index + 1}`;
        themeItem.style.background = gradient;
        themeItem.addEventListener('click', () => changeBackground(gradient));
        dropdown.appendChild(themeItem);
    });
}

function changeBackground(gradient) {
    document.body.style.background = gradient;
    document.getElementById('themesDropdown').style.display = 'none';
}
