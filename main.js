import videojs from "video.js";

import 'video.js/dist/video-js.css'

document.addEventListener('DOMContentLoaded', () => {
    const player = videojs('my-video', {
        autoplay: true,
        controls: true,
        loop: false,
        muted: false,
    });
    const playlist=[
        {src:"./video/bird_video.mp4",title:"title1"},
        {src:"./video/everest.mp4",title:"title2"},
        {src:"./video/sea_video.mp4",title:"title3"},
        {src:"./video/seagulls.mp4",title:"title4"}
    ]
    let currentVideoIndex=0;
    function playNextVideo(){
        currentVideoIndex=(currentVideoIndex+1)%playlist.length;
        player.src({type:"video/mp4",src: playlist[currentVideoIndex].src});
        player.play();
    }
    player.src({ type: 'video/mp4', src: playlist[currentVideoIndex].src });
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
   /*  const player2=videojs('myVideo2',{
        autoplay: true,
        controls: true,
        loop: true,
        muted: false,
    })
    document.body.addEventListener('click', () => {
        player.pause();
    });
    //with ambient mode you cant play any other video while this is on... */
});