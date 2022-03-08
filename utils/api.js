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
    let games = []
    if (responseCode == 200) {
        try {
            games = JSON.parse(message.response_body.data).data;
        } catch (error) {
            log("Error parsing response");
            log(error);
        }
    } else {
        log("Error getting response; responseCode: " + responseCode);
    }
    return games;
}
