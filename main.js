import videojs from "video.js";

import 'video.js/dist/video-js.css'

document.addEventListener('DOMContentLoaded', () => {
    const player = videojs('my-video', {
        autoplay: true,
        controls: true,
        loop: true,
        muted: false,
    });
    player.ready(()=>{
        const controlBar=player.getChild('controlBar');
        const customButton=player.controlBar.el().appendChild(document.createElement('div'));
        customButton.className='vjs-control vjs-button custom-settings-button';
        customButton.setAttribute("role","button");
        customButton.setAttribute("tabindex","0");
        customButton.setAttribute("aria-label","Custom Settings ");
        customButton.innerHTML=`<span class="vjs-icon-placeholder">S</span>`;
        customButton.addEventListener("click",()=>{
            alert("clicked!")
        })
    })
    const player2=videojs('myVideo2',{
        autoplay: true,
        controls: true,
        loop: true,
        muted: false,
    })
});