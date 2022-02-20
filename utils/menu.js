'use strict';

const St = imports.gi.St;
const Gio = imports.gi.Gio;
const GObject = imports.gi.GObject;
const panelMenu = imports.ui.panelMenu;
const { arrowIcon } = imports.ui.popupMenu;
const extensionUtils = imports.misc.extensionUtils;
const Me = extensionUtils.getCurrentExtension();

const Lang = imports.lang;
// const Soup = imports.gi.Soup;
const GLib = imports.gi.GLib;

const Api = Me.imports.utils.api;

var Menu = GObject.registerClass(
    class Menu extends panelMenu.Button {
        _init(menuAlignment, nameText) {
            super._init(menuAlignment, nameText);
            
            // Binding callbacks
            this._refreshGames = this._refreshGames.bind(this);

            // Creating menu
            const hbox = new St.BoxLayout({ style_class: "panel-status-menu-box" });
            const gicon = Gio.icon_new_for_string(Me.path + "/icons/basketball-icon.svg")
            const icon = new St.Icon({
                gicon: gicon,
                style_class: "system-status-icon"
            });
            this.buttonText = new St.Label({
                text: "Loading ...",
                style: "margin-top: 4px"
            })
            hbox.add_child(icon);
            hbox.add_child(arrowIcon(St.Side.BOTTOM));
            hbox.add_child(this.buttonText);
            this.add_child(hbox);
            this.show();
            
            // Getting date check this
            // https://gjs-docs.gnome.org/glib20~2.66.1/glib.datetime
            // let now = GLib.DateTime.new_now_utc();
            // let yesterday = now.add_days(-1);
            // log("Yesterday: " + yesterday.format("%Y-%m-%d"));

            // XXX: Last available date for games is 17-02-2022
            let date = GLib.DateTime.new_local(2022, 2, 17, 0, 0, 0);
            Api.getGames(date);
            
            // Sample GET call
            // let _session = new Soup.SessionAsync();
            // const url = "https://www.balldontlie.io/api/v1/games?dates[]=" + yesterday.format("%Y-%m-%d");
            // let request = Soup.Message.new('GET', url);
            // _session.queue_message(request, function(_session, message) {
            //     //log(message.response_body.data);
            //     let response = JSON.parse(message.response_body.data);
            //     let games = response.data;
            //     log("Games played: " + games.length);
            //     games.forEach(game => {
            //         log("\n*** GAME " + game.id + " ***");
            //         log(game.home_team.full_name.padEnd(30) + game.home_team_score.toString().padStart(3));
            //         log(game.visitor_team.full_name.padEnd(30) + game.visitor_team_score.toString().padStart(3));
            //         log("*******************");
            //     });
            // });
        }

        async _refreshGames() {
            log("Refreshing games");
        }
    }
)