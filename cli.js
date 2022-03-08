'use strict';

imports.searchPath.unshift('.');

const GLib = imports.gi.GLib;
const Api = imports.utils.api;

let now = GLib.DateTime.new_now_utc();
let yesterday = now.add_days(-1);
log("Yesterday: " + yesterday.format("%Y-%m-%d"));

let games = Api.getGames(yesterday);
if (games) {
  log("Games played: " + games.length);
  games.forEach(game => {
      log("");
      log("*** GAME " + game.id + " ***");
      log(game.home_team.full_name.padEnd(30) + game.home_team_score.toString().padStart(3));
      log(game.visitor_team.full_name.padEnd(30) + game.visitor_team_score.toString().padStart(3));
      log("*******************");
  });
}

function mydump(arr,level) {
  var dumped_text = "";
  if(!level) level = 0;

  var level_padding = "";
  for(var j=0;j<level+1;j++) level_padding += "    ";

  if(typeof(arr) == 'object') {  
      for(var item in arr) {
          var value = arr[item];

          if(typeof(value) == 'object') { 
              dumped_text += level_padding + "'" + item + "' ...\n";
              dumped_text += mydump(value,level+1);
          } else {
              dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
          }
      }
  } else { 
      dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
  }
  return dumped_text;
}