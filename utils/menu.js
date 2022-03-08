'use strict';

const St = imports.gi.St;
const Gio = imports.gi.Gio;
const GObject = imports.gi.GObject;
const panelMenu = imports.ui.panelMenu;
const { arrowIcon } = imports.ui.popupMenu;
const extensionUtils = imports.misc.extensionUtils;
const Me = extensionUtils.getCurrentExtension();

const Lang = imports.lang;
const GLib = imports.gi.GLib;

const Api = Me.imports.utils.api;

var Menu = GObject.registerClass(
    class Menu extends panelMenu.Button {
        _games = [];
        
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

            this._refreshGames();

            this.show();
        }

        _refreshGames() {
            log("Refreshing games");
            // Getting date check this
            // https://gjs-docs.gnome.org/glib20~2.66.1/glib.datetime
            let now = GLib.DateTime.new_now_utc();
            let yesterday = now.add_days(-1);
            log("Yesterday: " + yesterday.format("%Y-%m-%d"));

            this._games = Api.getGames(yesterday);
            if (this._games) {
                this.buttonText.set_text(this._games.length.toString());
                this._prettyPrint(this._games);
            }
        }

        _prettyPrint(games) {
            log("Games played: " + games.length);
            games.forEach(game => {
                log("\n*** GAME " + game.id + " ***");
                log(game.home_team.full_name.padEnd(30) + game.home_team_score.toString().padStart(3));
                log(game.visitor_team.full_name.padEnd(30) + game.visitor_team_score.toString().padStart(3));
                log("*******************");
            });
        }
    }
)
