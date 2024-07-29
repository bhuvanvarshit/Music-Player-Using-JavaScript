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
      "SongImage": "./images/sugarmaroon.jpeg",
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
      "AudioMp3File": "somelike-like-you.mp3"
    },
    {
      "id": 6,
      "SongTitle": "WonderWall",
      "SongImage": "./images/wonder-wall.jpeg",
      "SongSingerName": "Oasis",
      "Genre": "Rock",
      "AudioMp3File": "./audio/wonderwall-mp3"
    }
  ]
};
console.log(jsonObject);

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

function allSongsList()
{
    const songsList = [];
     jsonObject.Songs.map(x=>{
        const songlistitem = x.SongTitle +" - "+ x.SongSingerName; 
        songsList.push(songlistitem);
    });
    console.log(songsList); 
    return songsList;
}

function appendSonglist()
{
        const songsList = allSongsList();
        document.addEventListener('DOMContentLoaded', () => {
            let count = 1;
            songsList?.forEach(songitem => {
            const buttondiv = document.getElementById('button-container');
            const button = document.createElement('button');//<button class="song-btn" id="song-btn-1"> songtitle + singername </button>
            button.textContent = songitem;
            button.className = "song-btn";
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


// function displaynewgenre(filteredData){
//            const genredropdownDiv = document.getElementsByClassName('Genre-dropdown');
//            genredropdownDiv.innerHTML ='';
//            filteredData.forEach(item => {
//                  const div = document.createElement('div');
//                  div.textcontent = item.SongSingerName;
//                  genredropdownDiv.appendChild(div);      
//            });

//         }

// document.getElementById('Genre').addEventListener('change', function(){
//     const selectedOption = this.value;
//     let filteredData;
 
//     if (selectedOption === 'all') {
//         filteredData = jsonObject;
//     } else {
//            filteredData = jsonObject.filter(item =>item.Genre === selectedOption);
//     }
//     displaynewgenre(filteredData);
// });

// displaynewgenre(jsonObject);

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
                 button.id="song-btn-"+ count;
                 count++;
                 buttondiv.appendChild(button);
             });          
 }