console.log("Music Player");

let songIndex = 1;
let masterPlay = document.getElementById('masterPlay');
let audioElement = new Audio('songs/1.mp3')
let musicRange = document.getElementById('music-range');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let next = document.getElementById('next');
let previous = document.getElementById('previous');

let availableSongs = [
    {songName : 'song1' , filePath : 'songs/1.mp3' , coverPath : 'covers/1.jpg'},
    {songName : 'song2' , filePath : 'songs/2.mp3' , coverPath : 'covers/2.jpg'},
    {songName : 'song3' , filePath : 'songs/3.mp3' , coverPath : 'covers/3.jpg'},
    {songName : 'song4' , filePath : 'songs/4.mp3' , coverPath : 'covers/4.jpg'},
    {songName : 'song5' , filePath : 'songs/5.mp3' , coverPath : 'covers/5.jpg'},
    {songName : 'song6' , filePath : 'songs/6.mp3' , coverPath : 'covers/6.jpg'},
    {songName : 'song7' , filePath : 'songs/7.mp3' , coverPath : 'covers/7.jpg'},
    {songName : 'song8' , filePath : 'songs/8.mp3' , coverPath : 'covers/8.jpg'},
    {songName : 'song9' , filePath : 'songs/9.mp3' , coverPath : 'covers/9.jpg'},
    {songName : 'song10' , filePath : 'songs/10.mp3' , coverPath : 'covers/10.jpg'}
];

//updating names and photos.
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = availableSongs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = availableSongs[i].songName; 
});

//masterPlay button
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        document.getElementById('musicflow').style.opacity=1;
    }
    else{
        audioElement.pause()
        document.getElementById('musicflow').style.opacity=0;
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
})

//Updating playtime
musicRange.addEventListener('change',()=>{
    audioElement.currentTime = musicRange.value * audioElement.duration/100;
})

audioElement.addEventListener('timeupdate',()=>{
    musicRange.value = (audioElement.currentTime / audioElement.duration)*100;
})

// console.log(songItems);
songItems.forEach((element,index)=>{
    element.getElementsByClassName('fa-play-circle')[0].addEventListener('click',()=>{
        if(audioElement.paused){
            let newSong = document.getElementById((index+1));
            newSong.classList.remove('fa-play-circle');
            newSong.classList.add('fa-pause-circle');
            if(songIndex!=index+1){
                audioElement.src = availableSongs[index].filePath;
                audioElement.currentTime = 0; 
            }
            songIndex = index+1;
            document.getElementById('masterSongName').innerHTML = availableSongs[index].songName;       
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
        else{
            audioElement.pause();
            let oldSong = document.getElementById(songIndex);
            oldSong.classList.remove('fa-pause-circle');
            oldSong.classList.add('fa-play-circle');

            if(songIndex != index+1){
                let newSong = document.getElementById((index+1));
                newSong.classList.remove('fa-play-circle');
                newSong.classList.add('fa-pause-circle');
                audioElement.src = availableSongs[index].filePath;
                songIndex = index+1;
                audioElement.play();

                //progressBar
                audioElement.currentTime = 0;
                document.getElementById('masterSongName').innerHTML = availableSongs[index].songName;
            }
            else{
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
            }
        }
    })
})

next.addEventListener('click',()=>{
    let oldSong = document.getElementById(songIndex);
    oldSong.classList.remove('fa-pause-circle');
    oldSong.classList.add('fa-play-circle');

    if(songIndex>9){
        songIndex=1;
    }
    else{
        songIndex+=1;
    }

    audioElement.pause();
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    document.getElementById('masterSongName').innerHTML = availableSongs[songIndex-1].songName;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    audioElement.play();
})

previous.addEventListener('click',()=>{
    let oldSong = document.getElementById(songIndex);
    oldSong.classList.remove('fa-pause-circle');
    oldSong.classList.add('fa-play-circle');
    
    if(songIndex<=1){
        songIndex=10;
    }
    else{
        songIndex-=1;
    }

    audioElement.pause();
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    document.getElementById('masterSongName').innerHTML = availableSongs[songIndex-1].songName;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    audioElement.play();
})
