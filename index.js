const jsonObject = {
  "Songs": [
    {
      "id": 1,
      "SongTitle": "Locked Away",
      "SongImage": "./images/Locked_Away.jpeg",
      "SongSingerName": "R. City",
      "Genre": "Hip Hop",
      "AudioMp3File": "./audio/Locked_Away.mp3"
    },
    {
      "id": 2,
      "SongTitle": "Sugar",
      "SongImage": "./images/sugar maroon.jpeg",
      "SongSingerName": "Maroon",
      "Genre": "Hip Hop",
      "AudioMp3File": "./audio/sugar.mp3"
    },
    {
      "id": 3,
      "SongTitle": "Shape Of You",
      "SongImage": "./images/shape of you.jpeg",
      "SongSingerName": "Ed Sheeran",
      "Genre": "Pop",
      "AudioMp3File": "./audio/shape of you.mp3"
    },
    {
      "id": 4,
      "SongTitle": "All of Me",
      "SongImage": "./images/all of me.jpeg",
      "SongSingerName": "Adele",
      "Genre": "Pop",
      "AudioMp3File": "./audio/All of me.mp3"
    },
    {
      "id": 5,
      "SongTitle": "Somelike Like You",
      "SongImage": "./images/somelike Like You.jpeg",
      "SongSingerName": "Adele",
      "Genre": "Pop",
      "AudioMp3File": "./audio/somelike-like-you.mp3"
    },
    {
      "id": 6,
      "SongTitle": "WonderWall",
      "SongImage": "./images/wonder-wall.jpeg",
      "SongSingerName": "Oasis",
      "Genre": "Rock",
      "AudioMp3File": "./audio/wonderwall.mp3"
    }
  ]
};
console.log(jsonObject);

let playlists = [];
let currentPlaylist = [];
let saveplaylist= new Map();

function getGenre()
{
    const genre = jsonObject.Songs.map(x=>x.Genre);
    return [...new Set(genre)];
};

function appendGenreDropdown()
{
        const genres = getGenre();
        document.addEventListener('DOMContentLoaded', () => {
            const dropdown = document.getElementById('Genre');
            genres?.forEach(genre => {     
                const option = document.createElement('option'); //<option value="hiphop">hip hop</option>
                option.value = genre;
                option.textContent = genre;
                dropdown.appendChild(option);
            });
    });
}
appendGenreDropdown();

function appendSonglist()
{
        document.addEventListener('DOMContentLoaded', () => {
            let count = 1;
            jsonObject.Songs?.forEach(songitem => {
            const buttondiv = document.getElementById('button-container');
            const button = document.createElement('button');//<button class="song-btn" id="song-btn-1"> songtitle + singername </button>
            button.textContent = songitem.SongTitle +" - "+ songitem.SongSingerName; ;
            button.className = "song-btn";
            button.setAttribute("song-btn-data-id",songitem.id);
            button.id="song-btn-"+ count;
            count++;
            buttondiv.appendChild(button);
        });
    });
}
appendSonglist();

function addnewgenre(){
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('Genre').addEventListener('change', function(){
            const selectedValue = this.value;
            const selectedText =  this.options[this.selectedIndex].text;
            return selectedValue;
        });
    });
}

document.addEventListener('DOMContentLoaded', filterbasedonGenre);

function filterbasedonGenre() {
    document.getElementById('Genre').addEventListener('change', function() {
        let selectedValue = this.value;
        let filteredData; 
        
        if (selectedValue === "all") {
            filteredData = jsonObject.Songs;
        } else {
            filteredData = jsonObject.Songs.filter(item => item.Genre === selectedValue);
        }
        appendSongslisttoButton(filteredData);
        return filteredData;
    });
}
 
function appendSongslisttoButton(filteredData){    
        let count = 1;
        let buttondiv = document.getElementById('button-container');
        buttondiv.innerHTML ='';
        filteredData?.forEach(item => {
               let button = document.createElement('button');//<button class="song-btn" id="song-btn-1"> songtitle + singername </button>
                 button.textContent = item.SongTitle + " - "+ item.SongSingerName;
                 button.className = "song-btn";
                 button.setAttribute("song-btn-data-id",item.id);
                 button.id="song-btn-"+ count;
                 count++;
                 buttondiv.appendChild(button);
                 button.addEventListener('click', handleClick);
          });     
}

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    document.querySelectorAll('.song-btn').forEach(button => {
      button.addEventListener('click', handleClick);
  });
});
});

let currentIndex =0;
let playlist = [];
function onclickprevnextbutton(){
  document.getElementById('back').addEventListener('click', () => changeSong(-1));
  document.getElementById('next').addEventListener('click', () => changeSong(1));
}
document.addEventListener('DOMContentLoaded', onclickprevnextbutton);
function changeSong(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = jsonObject.Songs.length - 1;
  if (currentIndex >= jsonObject.Songs.length) currentIndex = 0;
  updateSong(jsonObject.Songs[currentIndex]);
}

function updateSong(matchedItem){
        let image = document.getElementById('song-image');
         let songtitle = document.getElementById('song-title');
         let singername = document.getElementById('song-singer');
         let AudioFile = document.getElementById('audio-file')
         let back = document.getElementById('back');
         let next = document.getElementById('next');
         if(matchedItem){
           if(image) {
                image.src =  matchedItem.SongImage;
           }
           if(songtitle) {
            songtitle.textContent =  matchedItem.SongTitle;
           }
           if(singername) {
            singername.textContent =  matchedItem.SongSingerName;
           }
           if(AudioFile) {
            let audioSource = AudioFile.querySelector('source');
            audioSource.src = matchedItem.AudioMp3File;
            AudioFile.load();
           }
           back.setAttribute("prev-id", matchedItem.id - 1);
           next.setAttribute("next-id", matchedItem.id + 1);
          }
           
}

function handleClick(event){
  let buttonid = parseInt(event.target.getAttribute('song-btn-data-id'));
   console.log(buttonid);
   let matchedItem = jsonObject.Songs.filter(item => item.id === parseInt(buttonid));
   currentIndex = buttonid -1;
   if (matchedItem) {
    updateSong(matchedItem[0]);
    }
 }

function addtoplaylist(){
       let matchedItem = jsonObject.Songs[currentIndex];
       let isAlreadyInPlaylist = playlist.some(song => song.id === matchedItem.id);
      
       if (!isAlreadyInPlaylist) {
           playlist.push(matchedItem);
           console.log('Added to playlist:', matchedItem);
           currentplaylist();
       } else {
           console.log('Song is already in the playlist');
       }
       if(playlist.length>0){
        let playlistid = document.querySelectorAll('.playlistbutton');
        if(playlistid.length>0){
           saveplaylist.set(playlistid[playlistid.length -1].id, playlist) 
          } ;
        }
   }

   function currentplaylist(){
           const playlistContainer = document.getElementById('playlist');
           playlistContainer.innerHTML = '';

           playlist.forEach((song,index) => {
              const songButton = document.createElement('button');
              songButton.className = 'current-playlist-button';
              songButton.textContent = song.SongTitle + " - "+ song.SongSingerName;
              songButton.setAttribute("song-btn-data-id", song.id);

              songButton.addEventListener('click', () => {
                  index = jsonObject.Songs.findIndex(s => s.id === song.id);
                  updateSong(song);
              });
              playlistContainer.appendChild(songButton);
              
           }); 
   }

function createPlaylist()
{
  const playlistid = document.getElementById('playlistid');
  const playlistcontainer = document.getElementById('myplaylistcontainer');
  const playlistbutton = document.createElement('button');
  const currentplaylistContainer = document.getElementById('playlist');
  currentplaylistContainer.innerHTML = '';  
  if(playlistid.value){
      playlistbutton.textContent = playlistid.value;
      playlistbutton.className = 'playlistbutton';
      playlistbutton.id = playlistid.value.replace(" ", "-");
      saveplaylist.set(playlistbutton.id, "");
      playlist = [];
      playlistbutton.addEventListener('click', () => {
        refreshplaylist(playlistbutton.id);
     });
      playlistcontainer.appendChild(playlistbutton);
  }
}

function refreshplaylist(playlistid)
{
    const playlistContainer = document.getElementById('playlist');
    playlistContainer.innerHTML = '';   
        let getplaylist = saveplaylist.get(playlistid);
        getplaylist.forEach((song,index) => {
          const songButton = document.createElement('button');
          songButton.className = 'current-playlist-button';
          songButton.textContent = song.SongTitle + " - "+ song.SongSingerName;
          songButton.setAttribute("song-btn-data-id", song.id);
          songButton.addEventListener('click', () => {
            index = jsonObject.Songs.findIndex(s => s.id === song.id);
            updateSong(song);
        });
          playlistContainer.appendChild(songButton);    
       }); 
    playlist = [];
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('create-playlist').addEventListener('click', createPlaylist);
});
document .addEventListener('DOMContentLoaded', function(){
  document.getElementById('AddToPlaylist').addEventListener('click', addtoplaylist);
});


document.addEventListener('DOMContentLoaded', () => {
  const themeToggleButton = document.getElementById('themeToggleButton');
  const themeStylesheet = document.getElementById('themeStylesheet');
  themeToggleButton.addEventListener('click', () => {
    if (themeStylesheet.getAttribute('href') === 'lightthemestyle.css') 
      {
      themeStylesheet.setAttribute('href', 'darkthemestyle.css');
      themeToggleButton.removeAttribute('checked');
      } 
    else 
    {
      themeStylesheet.setAttribute('href', 'lightthemestyle.css');
      themeToggleButton.setAttribute('checked',true);
    }
  });
});

  

  
