"use strict";

const Main = imports.ui.main;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Menu = Me.imports.utils.menu;

class Extension {
    constructor() {
        log("Hello nba-games extension!");
        let _indicator = null;
    }
    
    enable() {
        log("Enable :)");
        this._indicator = new Menu.Menu(0.0, "NBA games");
        Main.panel.addToStatusArea("nba-games-menu", this._indicator);
    }
    
    disable() {
        log("Disable :(");
        this._indicator.destroy();
    }
}

function init() {
    return new Extension();
}
