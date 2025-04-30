import videojs from "video.js";
import 'video.js/dist/video-js.css'
import { themePalette } from "./data";
function renderHeader(){
    return `
        <div>
            <img src="/image-removebg-preview.png" alt="logo">
            <span>PlayNest</span>
        </div>
        <nav>
            <ul>
                <li>Watch videos online</li>
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
                <input type="file" id="fileInput" accept="video/*">
                <button id="submitBtn">Upload</button>
            </div>
            <div class="playlistDisplay">
                <!-- Playlist content goes here -->
                <ul id="playlist">
                <!-- Dynamically filled with playlist videos -->
                </ul>
            </div>`;
}
function renderPage(){
    document.querySelector("header").innerHTML=renderHeader();
    document.querySelector("main").innerHTML=renderMainSection();
    document.querySelector("#sidebar").innerHTML=renderSidebar();
}
function initializeVideoPlayer() {
    const player = videojs('my-video', {
        autoplay: false,
        controls: true,
        loop: false,
        muted: false,
    });
    player.volume(0.5);

    // File input and submit button
    const fileInput = document.getElementById('fileInput');
    const submitBtn = document.getElementById('submitBtn');

    submitBtn.addEventListener('click', function () {
        const file = fileInput.files[0];

        if (file) {
            const fileURL = URL.createObjectURL(file);

            player.src({ type: file.type, src: fileURL });

            player.load();

            console.log("Attempting to play video...");
            
            player.muted(true);

            player.play().then(() => {
                console.log("Video is now playing.");
            }).catch((error) => {
                console.error("Error playing the video:", error);
            });
        } else {
            alert("Please select a video file to upload!");
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
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