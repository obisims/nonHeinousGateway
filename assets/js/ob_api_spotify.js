

/*////////////////////////////////////////////////////////////////////
//////////////////////////SPOTIFY CURRENT PLAYING
*/////////////////////////////////////////////////////////////////////


function spotifyCurrentPlaying() {
    var apiUrl = invoiceSettings.extensions.spotifyCurrentPlaying.url
    console.log('[spotifyCurrentPlaying] v0.6','initiating...')
 // Your code here
   // Will execute myCallback every 10  seconds /0.5/
//var intervalID = window.setInterval(spotifyCurrentPlaying(), 10000);

//console.log('spotifyCurrentPlaying starting',intervalID)
//$('#SpotifyCurrentlyPlaying').html('Now Playing: '+artist)
/*
fetch(url)
.then(res => res.json())
.then((out) => {
  console.log('Checkout this JSON! ', out);
})
.catch(err => { throw err });
*/
 $.getJSON(apiUrl, function(data) {
    console.log('[spotifyCurrentPlaying]','data',data)
    //var text = `Date: ${data.date}<br>
    //            Time: ${data.time}<br>
    //            Unix time: ${data.milliseconds_since_epoch}`
    //construct html
    pushSpotifyIntoDude(data)
   

   
    //$(".mypanel").html(text);
    });

}
function pushSpotifyIntoDude(data){
    if(data.is_playing===false||!data.item){
        console.log('[spotifyCurrentPlaying] not playing',data)
        $('#SpotifyCurrentlyPlaying').html('')
        return 
    }
    console.log('[pushSpotifyIntoDude] data',data)
    //edge case? fucked context?// when spotify is playing shuffle, loses track of what to play and stops, kinda forgetting where it is, it publishes playing = true but no .item
    //if(data.is_playing===false)return
    var spotifyData = {
        context:data.context,
       // is_playing:data.is_playing,
        artistName:data.item.artists[0].name,
        trackName:data.item.name,
        progress_ms:data.progress_ms,
        duration_ms:data.item.duration_ms,

        track:{
            name:data.item.name,
            url:data.item.external_urls.spotify,
            url_preview:data.item.preview_url,
        },
        artist:{
            name:data.item.artists[0].name,
            url:data.item.artists[0].external_urls.spotify
        },
      }
      
    var percentagePlayed = spotifyData.progress_ms/spotifyData.duration_ms // 0.23 .. 
    
    //((spotifyData.progress_ms/1000)/60).toFixed(2)+' ━━━━●────── '+((spotifyData.duration_ms/1000)/60).toFixed(2)
    var progressIn = ((percentagePlayed*10)/2).toFixed(0) // 2
    var bar_prefix_count = (new Number(progressIn))-1
    if(bar_prefix_count<0)bar_prefix_count=0
    var bar_suffix_count = 5-(new Number(progressIn))
    if(bar_suffix_count<0)bar_suffix_count=0
    var bar_prefix = '━'
    var bar_suffix = '─'
    
    var constructPlaybackBar = bar_prefix.repeat(bar_prefix_count)+'●'+bar_suffix.repeat(bar_suffix_count)
   // console.log('pushing in ',constructPlaybackBar,spotifyData)
    var constructListener = ` is listening to <a href="${spotifyData.track.url}" target="_blank">${spotifyData.track.name}</a> by <a href="${spotifyData.artist.url}" target="_blank">${spotifyData.artist.name}</a>  <span id="constructPlaybackBar" data-preview-state="paused" data-preview-url="${spotifyData.track.url_preview}">${constructPlaybackBar}</span>`
    console.log('pushing in ',constructListener)
    // Setting the DOM element's onclick to null removes 
        // the inline click handler
        //if($('#elemId').length){

      //  }
      
        $('#SpotifyCurrentlyPlaying').html(constructListener)
        $("#constructPlaybackBar")[0].onclick = null;
       // var audio_trackPreview = '';
        if(audio_trackPreview){
            audio_trackPreview.pause()
            audio_trackPreview=''
        }else{
            var audio_trackPreview = '';
        }
        $("#constructPlaybackBar").click(function() {
            
            var audio_track_state = $(this).attr('data-preview-state');
            audio_trackPreview = new Audio($(this).attr('data-preview-url'));
            if(audio_track_state=="paused"){
                audio_trackPreview.play();
                $(this).attr('data-preview-url','playing')
            }else{
                audio_trackPreview.pause();
            }
            
            alert("playing")
            //url_preview
        });
    //$('#SpotifyCurrentlyPlaying').html(' | listening now: '+spotifyData.trackName+' - '+spotifyData.artistName+' '+constructPlaybackBar)
   // constructPlaybackBar

}
var audio_trackPreview = '';
function spotify_preview_playPause(elem){
    if(audio_track_state=="paused"){
        audio_trackPreview.play();
        $(elem).attr('data-preview-url','playing')
    }else{
        audio_trackPreview.pause();
        $(elem).attr('data-preview-url','paused')
    }
}