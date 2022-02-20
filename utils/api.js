'use strict';

const Soup = imports.gi.Soup;

const BASE_URL = 'https://www.balldontlie.io/api/v1';

function getGames(date) {
  log("Getting games from: " + date.format("%Y-%m-%d"));
  const url = BASE_URL + "/games?dates[]=" + date.format("%Y-%m-%d");
  log("url: " + url);
  let _session = new Soup.SessionAsync();
  let request = Soup.Message.new('GET', url);
  _session.queue_message(request, function(_session, message) {
      let response = JSON.parse(message.response_body.data);
      let games = response.data;
      log("Games played: " + games.length);
      games.forEach(game => {
          log("\n*** GAME " + game.id + " ***");
          log(game.home_team.full_name.padEnd(30) + game.home_team_score.toString().padStart(3));
          log(game.visitor_team.full_name.padEnd(30) + game.visitor_team_score.toString().padStart(3));
          log("*******************");
      });
  });
}