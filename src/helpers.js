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

export function numFormatter(num) {
    if(num > 999 && num < 1000000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    else if(num > 1000000) {
        return (num / 1000000).toFixed(0) + 'M';
    }
    else if(num <= 999) {
        return num;
    }
}
// const url = urlFromObj({
//     url: 'http://localhost:3001/api/music',
//     search: songName,
//     limit: 3,
//     orderBy: "likes"
// }))
export function urlFromObj(obj) {
    const str = [];
    for (let p in obj) {
        if (obj.hasOwnProperty(p) && p !== 'url') {
            str.push(p + "=" + obj[p]);
        }
    }
        
  return obj.url + '?' + str.join("&");
}