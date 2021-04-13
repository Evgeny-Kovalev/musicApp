export function formatSecondsAsTime(seconds) {
    let hr  = Math.floor(seconds / 3600);
    let min = Math.floor((seconds - (hr * 3600))/60);
    let sec = Math.floor(seconds - (hr * 3600) -  (min * 60));

    if (min < 10){ 
        min = "0" + min; 
    }
    if (sec < 10){ 
        sec  = "0" + sec;
    }

    return min + ':' + sec;
}