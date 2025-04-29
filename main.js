import videojs from "video.js";

import 'video.js/dist/video-js.css'

import 'videojs-youtube'

document.addEventListener('DOMContentLoaded', () => {
    const playlist = [
        { src: "https://www.youtube.com/watch?v=S980-z1qx3g", title: "title3" },
        { src: "https://www.youtube.com/watch?v=L7kF4MXXCoA", title: "title1" },
        { src: "https://www.youtube.com/watch?v=iZLLrr3z7N0", title: "title2" }
    ];
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
});

document.addEventListener('DOMContentLoaded', () => {
    const player = videojs('my-video');
    
    player.on('userinactive', () => {
        const iframeBlocker = document.querySelector('.vjs-iframe-blocker');
        if (iframeBlocker) {
            iframeBlocker.style.display = 'none';
        }
    });

    player.on('useractive', () => {
        const iframeBlocker = document.querySelector('.vjs-iframe-blocker');
        if (iframeBlocker) {
            iframeBlocker.style.display = 'none';
        }
    });
});