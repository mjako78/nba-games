'use strict';

const Soup = imports.gi.Soup;

const BASE_URL = 'https://www.balldontlie.io/api/v1';

function getGames(date) {
    log("Getting games from: " + date.format("%Y-%m-%d"));
    const url = BASE_URL + "/games?dates[]=" + date.format("%Y-%m-%d");
    log("url: " + url);
    let _session = new Soup.SessionAsync();
    let message = Soup.Message.new('GET', url);
    message.request_headers.set_content_type("application/json", null);
    let responseCode = _session.send_message(message);
    let games;
    if (responseCode == 200) {
        try {
            games = JSON.parse(message.response_body.data).data;
            // log(message['response-body'].data);
            // log("---");
            // log(JSON.parse(message['response-body'].data).data);
            // let out = JSON.parse(message['response-body'].data);
            // log(out);
        } catch (error) {
            log("Error parsing response");
            log(error);
        }
    } else {
        log("Error getting response");
    }
    return games;
    // if (games) {
    //     log("Games played: " + games.length);
    //     games.forEach(game => {
    //         log("");
    //         log("*** GAME " + game.id + " ***");
    //         log(game.home_team.full_name.padEnd(30) + game.home_team_score.toString().padStart(3));
    //         log(game.visitor_team.full_name.padEnd(30) + game.visitor_team_score.toString().padStart(3));
    //         log("*******************");
    //     });
    // }

//   return games;
//   _session.queue_message(request, function(_session, message) {
//       let response = JSON.parse(message.response_body.data);
//       let games = response.data;
//       log("Games played: " + games.length);
//       games.forEach(game => {
//           log("\n*** GAME " + game.id + " ***");
//           log(game.home_team.full_name.padEnd(30) + game.home_team_score.toString().padStart(3));
//           log(game.visitor_team.full_name.padEnd(30) + game.visitor_team_score.toString().padStart(3));
//           log("*******************");
//       });
//   });
}

// FIXME: Check this out
function send_request(url, type='GET') {
  let message = Soup.Message.new(type, url);
  message.request_headers.append(
      'Authorization',
      `Bearer ${token}`
  )
  message.request_headers.set_content_type("application/json", null);
  let responseCode = soupSyncSession.send_message(message);
  let out;
  if(responseCode == 200) {
      try {
          out = JSON.parse(message['response-body'].data);
      } catch(error) {
          log(error);
      }
  }
  return out;
}
