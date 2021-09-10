import logo from './logos/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlayCircle} from "@fortawesome/free-solid-svg-icons"
import {faPauseCircle} from "@fortawesome/free-solid-svg-icons"
import {songs} from "./appl";
import './App.css';


var keySong;
var enable=false;
var enablePause=false;
var music = document.createElement("audio");
var audio = document.createElement("source");

const nameStyle = {color: 'black'};
function song(id,url,url2){
  var tds = document.getElementsByClassName("rr");
  keySong=id;
  if(enable===false){
    enable=true;
  
  for(var i = 0; i < tds.length; i++) {
     tds[i].style.color="black";
  }
  
  document.getElementById(id).style.color='blue';

  music = song_aux(url);

  }else{
    for(var i2 = 0; i2 < tds.length; i2++) {
      tds[i2].style.color="black";
      
   }music.src=url;
   document.getElementById(id).style.color='blue';
  }
  document.getElementById('img-album').setAttribute('src',url2); 
  
};


function botonReproducir(){
  if(enable===false){
    alert("Seleccione la canción")
  }else if(enablePause===true){
    enablePause=false;
    music.play();
  }
  
  else{
    music.pause();
    music.currentTime = 0;
    console.log(music);
    music.play();
  };
};  

function btnPause(){
  if(enable===false){
    alert("Seleccione la canción")
  }else{
    enablePause=true;
    music.pause();
    
  };
}; 
function Letra(){
  if(enable===false){
    alert("Seleccione la canción")
  }else{

    console.log();
    document.getElementById("lyricT").textContent=songs[keySong].lyrics;

    //document.getElementById("col-re2").textContent=songs[keySong].lyrics;
  }
  

};   
// El sonido que podemos reproducir o pausar


function song_aux(url){

  audio.src=url;
  audio.setAttribute("type", "audio/mpeg");
  music.setAttribute("controls","true");

  music.appendChild(audio); 
  document.body.appendChild(music);
  music.style.display = "none";
  return music;
}
function App() {

    return (
      <div className="App">
        
        <head className="App-header">
          
          <style>{"\
            .rr{\
              text-decoration: underline green;\
            }\
          "}
          </style>
          <style>{"\
            .col-re2{\
              display: flex;\
              align-items:center;\
            }\
          "}
          </style>
          
        </head>

        
        <body>
        <audio id="myAudio">
          
          <source src="love_race.mp3" type="audio/mpeg"/>
          Your browser does not support the audio element.
        </audio>
          <div class="container">
            <div class="row">
              <div class="col-re2">
                
                <img id="img-album" src={logo} width="300" alt=""/>
                <p id="lyricT">Lyrics</p>
                <audio id="player" controls=""></audio>
                
              </div> 
              <div class="col-re2">
                <p id="window">
                <button class="player" onClick={(e) => botonReproducir()}  id="btnReproducir"><FontAwesomeIcon icon={faPlayCircle}/></button>
                <button class="pause" onClick={(e) => btnPause()}  id="btnPause"><FontAwesomeIcon icon={faPauseCircle}/></button>
                <button class="lyric" onClick={(e) => Letra()}  id="btnLyric">Lyric</button>
                </p>
              </div>
              <div scr="stock-container" >
              <table>
                      <tr>
                        <th>Name</th>
                        <th>Artist</th>
                      </tr>
                {songs.map((data, key) => {
                  return (
                    
                      <tr id="songs" >
                        
                        <td style={nameStyle} className='rr' id={key} onClick={(e) => song(key,data.song,data.image)}>{data.nombre }</td>
                        
                        <td  >{data.artist}</td>
                      </tr>
                    
                    );
                })}
                </table>
                
              </div>
  
            </div>
  
          </div>
          
        </body>
      </div>
    );

};
  


export default App;
