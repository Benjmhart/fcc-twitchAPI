

//list of twitch channels
var twitchers=["FreeCodeCamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

    

//function to get data and put it into the page

function twitchCall(twitchers) {
  $.each(twitchers, function(i){ 
    var twitchName=twitchers[i];
  $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: 'https://wind-bow.gomix.me/twitch-api/streams/'+twitchers[i],
        success: function(data){
          //setup parameters and logic
          var streamStat='offline';
          var gameName='n/a';
          var streamLink='http://twitch.tv/'+twitchName;
          console.log(data);
          if(data.stream) {
            streamStat=data.stream.stream_type;
            gameName=data.stream.game;
          }
          //create  html variable and append to status div
        var html='<div id='+twitchName+' class='+streamStat+'><h3>'+twitchName+'</h3><p>'+streamStat+ ' Game:'+gameName+'</p>';
          if (streamStat==='live'){
            html='<div id='+twitchName+' class='+streamStat+'><a href="'+streamLink+'"><h3>'+twitchName+'</h3><p>'+streamStat+ ' Game:'+gameName+'</a></p>';
          }
          //console.log(html);
        $("#status").append(html);
          }
      });
    });

 }

//filter for all/online/offline divs to appear/disappear
$( "#all" ).click(function() {
  $('.offline').slideDown();
  $('.live').slideDown();
});
$( "#online" ).click(function() {
  $('.offline').slideUp();
  $('.live').slideDown();
  });
$( "#offline" ).click(function() {
  $('.offline').slideDown();
  $('.live').slideUp();
  });

//filter for search
$('#search').change(function(){
  var searchTerm=$('#search').val();
  var matches=[];
  //console.log(searchTerm);
  for ( var j=0; j<twitchers.length; j++) {
   // console.log(twitchers[j]);
    var val=twitchers[j];
    if(val === searchTerm){
     // console.log('match!');
      matches.push(twitchers[j]);
    }
  }
  //console.log(matches);
  $('.offline').slideUp();
  $('.live').slideUp();
  for(var k=0; k<matches.length; k++) {
    var show=matches[k];
    $('#'+show).slideDown();
  }
  if (searchTerm===''){
    $('.offline').slideDown();
    $('.live').slideDown();
  }
});


$(document).ready(function(){
  twitchCall(twitchers);
});