import { playlist } from "./data";
import videojs from "video.js";
import 'video.js/dist/video-js.css'
function renderHeader(){
    return `
        <div>
            <img src="/image-removebg-preview.png" alt="logo">
            <span>PlayNest</span>
        </div>
        <nav>
            <ul>
                <li>Upload local videos</li>
                
                <li>Settings</li>
            </ul>
            
        </nav>
    `
};

function renderSidebar(){
    return `
            <div>
                Want to make a playlist paste your links here to add videos in the playlist.
            </div>
            <div>
            <label for="inputURL"></label>
            <input type="text" id="inputURL" placeholder="Paste the link here">
            <button class="submitLink">Submit</button>
            <button id="addVideo">Add video</button>
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
    document.querySelector("#sidebar").innerHTML=renderSidebar();
}

function videoPlayer(){
    let currentVideoIndex=0;
    function init(){
        if (currentVideoIndex >= playlist.length) return;

        let currentVideo=playlist[currentVideoIndex];
        let title=currentVideo.title;
        let src=currentVideo.src;
        let config=currentVideo.config||{};

        let autoplay = config.autoplay !== undefined ? config.autoplay : false;
        let controls = config.controls !== undefined ? config.controls : true;
        let loop = config.loop !== undefined ? config.loop : false;
        let muted = config.muted !== undefined ? config.muted : false;

        const videoContainer=document.createElement("div");
        videoContainer.className="video-container";
        
        const videoTitle=document.createElement("p");
        videoTitle.textContent=title;
        
        const videoElement=document.createElement("video");
        videoElement.id=`my-video-${currentVideoIndex}`;
        videoElement.className="video-js"
        videoElement.classList.add("vjs-default-skin");
        videoElement.setAttribute("preload","auto");
        
        const sourceElement=document.createElement("source");
        sourceElement.src=src;
        sourceElement.type="video/mp4";
        
        videoElement.appendChild(sourceElement);
        videoContainer.appendChild(videoTitle);
        videoContainer.appendChild(videoElement);
        
        document.querySelector("main").appendChild(videoContainer);

        const player = videojs(videoElement.id, {
            autoplay: autoplay,
            controls: controls,
            loop: loop,
            muted: muted,
        });
        player.volume(0.5);
        if(autoplay) player.play();
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
        });
        
        currentVideoIndex++;

    }
    return {
        init
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderPage();
    const playerController=videoPlayer();
    playerController.init();        
    playerController.init();
});
