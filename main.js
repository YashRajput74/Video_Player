import videojs from "video.js";

import 'video.js/dist/video-js.css'

document.addEventListener('DOMContentLoaded', () => {
    const player = videojs('my-video', {
        autoplay: true,
        controls: true,
        loop: true,
        muted: false,
    });
    const player2=videojs('myVideo2',{
        autoplay: true,
        controls: true,
        loop: true,
        muted: false,
    })
});