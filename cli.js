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
