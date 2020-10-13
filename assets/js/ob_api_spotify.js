

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
    if(data.is_playing===false){
        console.log('[spotifyCurrentPlaying] not playing',data)
        $('#SpotifyCurrentlyPlaying').html('')
        return 
    }
    var spotifyData = {
        context:data.context,
       // is_playing:data.is_playing,
        artistName:data.item.artists[0].name,
        trackName:data.item.name,
        progress_ms:data.progress_ms,
        duration_ms:data.item.duration_ms,

        track:{
            name:data.item.name,
            url:data.item.external_urls.spotify
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
    var constructListener = ` is listening to <a href="${spotifyData.track.url}" target="_blank">${spotifyData.track.name}</a> by <a href="${spotifyData.artist.url}" target="_blank">${spotifyData.artist.name}</a>  `+constructPlaybackBar
    console.log('pushing in ',constructListener)
    $('#SpotifyCurrentlyPlaying').html(constructListener)
    //$('#SpotifyCurrentlyPlaying').html(' | listening now: '+spotifyData.trackName+' - '+spotifyData.artistName+' '+constructPlaybackBar)


}

