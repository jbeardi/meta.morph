var BrowserKeyValue = {
  DOM_VK_CANCEL: 3,
  DOM_VK_HELP: 6,
  DOM_VK_BACK_SPACE: 8,
  DOM_VK_TAB: 9,
  DOM_VK_CLEAR: 12,
  DOM_VK_RETURN: 13,
  DOM_VK_ENTER: 14,
  DOM_VK_SHIFT: 16,
  DOM_VK_CONTROL: 17,
  DOM_VK_ALT: 18,
  DOM_VK_PAUSE: 19,
  DOM_VK_CAPS_LOCK: 20,
  DOM_VK_ESCAPE: 27,
  DOM_VK_SPACE: 32,
  DOM_VK_PAGE_UP: 33,
  DOM_VK_PAGE_DOWN: 34,
  DOM_VK_END: 35,
  DOM_VK_HOME: 36,
  DOM_VK_LEFT: 37,
  DOM_VK_UP: 38,
  DOM_VK_RIGHT: 39,
  DOM_VK_DOWN: 40,
  DOM_VK_PRINTSCREEN: 44,
  DOM_VK_INSERT: 45,
  DOM_VK_DELETE: 46,
  DOM_VK_0: 48,
  DOM_VK_1: 49,
  DOM_VK_2: 50,
  DOM_VK_3: 51,
  DOM_VK_4: 52,
  DOM_VK_5: 53,
  DOM_VK_6: 54,
  DOM_VK_7: 55,
  DOM_VK_8: 56,
  DOM_VK_9: 57,
  DOM_VK_SEMICOLON: 59,
  DOM_VK_EQUALS: 61,
  DOM_VK_A: 65,
  DOM_VK_B: 66,
  DOM_VK_C: 67,
  DOM_VK_D: 68,
  DOM_VK_E: 69,
  DOM_VK_F: 70,
  DOM_VK_G: 71,
  DOM_VK_H: 72,
  DOM_VK_I: 73,
  DOM_VK_J: 74,
  DOM_VK_K: 75,
  DOM_VK_L: 76,
  DOM_VK_M: 77,
  DOM_VK_N: 78,
  DOM_VK_O: 79,
  DOM_VK_P: 80,
  DOM_VK_Q: 81,
  DOM_VK_R: 82,
  DOM_VK_S: 83,
  DOM_VK_T: 84,
  DOM_VK_U: 85,
  DOM_VK_V: 86,
  DOM_VK_W: 87,
  DOM_VK_X: 88,
  DOM_VK_Y: 89,
  DOM_VK_Z: 90,
  DOM_VK_CONTEXT_MENU: 93,
  DOM_VK_NUMPAD0: 96,
  DOM_VK_NUMPAD1: 97,
  DOM_VK_NUMPAD2: 98,
  DOM_VK_NUMPAD3: 99,
  DOM_VK_NUMPAD4: 100,
  DOM_VK_NUMPAD5: 101,
  DOM_VK_NUMPAD6: 102,
  DOM_VK_NUMPAD7: 103,
  DOM_VK_NUMPAD8: 104,
  DOM_VK_NUMPAD9: 105,
  DOM_VK_MULTIPLY: 106,
  DOM_VK_ADD: 107,
  DOM_VK_SEPARATOR: 108,
  DOM_VK_SUBTRACT: 109,
  DOM_VK_DECIMAL: 110,
  DOM_VK_DIVIDE: 111,
  DOM_VK_F1: 112,
  DOM_VK_F2: 113,
  DOM_VK_F3: 114,
  DOM_VK_F4: 115,
  DOM_VK_F5: 116,
  DOM_VK_F6: 117,
  DOM_VK_F7: 118,
  DOM_VK_F8: 119,
  DOM_VK_F9: 120,
  DOM_VK_F10: 121,
  DOM_VK_F11: 122,
  DOM_VK_F12: 123,
  DOM_VK_F13: 124,
  DOM_VK_F14: 125,
  DOM_VK_F15: 126,
  DOM_VK_F16: 127,
  DOM_VK_F17: 128,
  DOM_VK_F18: 129,
  DOM_VK_F19: 130,
  DOM_VK_F20: 131,
  DOM_VK_F21: 132,
  DOM_VK_F22: 133,
  DOM_VK_F23: 134,
  DOM_VK_F24: 135,
  DOM_VK_NUM_LOCK: 144,
  DOM_VK_SCROLL_LOCK: 145,
  DOM_VK_COMMA: 188,
  DOM_VK_PERIOD: 190,
  DOM_VK_SLASH: 191,
  DOM_VK_BACK_QUOTE: 192,
  DOM_VK_OPEN_BRACKET: 219,
  DOM_VK_BACK_SLASH: 220,
  DOM_VK_CLOSE_BRACKET: 221,
  DOM_VK_QUOTE: 222,
  DOM_VK_META: 224
};

var TVKeyValue = {
    KEY_RETURN : 0,
    KEY_ENTER : 13,
    KEY_UP : 38,
    KEY_DOWN : 40,
    KEY_LEFT : 37,
    KEY_RIGHT : 39,

    KEY_PAUSE : 74,
    KEY_PLAY : 71,
    KEY_STOP : 413,
    KEY_1 : 101,
    KEY_2 : 98,
    KEY_3 : 6,
    KEY_4 : 8,
    KEY_5 : 9,
    KEY_6 : 10,
    KEY_7 : 12,
    KEY_8 : 13,
    KEY_9 : 14,
    KEY_0 : 17,
    KEY_EMPTY : 0,

    KEY_PANEL_CH_UP : 105,
    KEY_PANEL_CH_DOWN : 106,
    KEY_PANEL_VOL_UP : 203,
    KEY_PANEL_VOL_DOWN : 204,
    KEY_PANEL_ENTER : 309,
    KEY_PANEL_SOURCE : 612,
    KEY_PANEL_MENU : 613,
    KEY_PANEL_POWER : 614,

    KEY_POWER : 76,
    KEY_TV : 77,
    KEY_VOL_UP : 7,
    KEY_VOL_DOWN : 11,
    KEY_CH_UP : 68,
    KEY_CH_DOWN : 65,

    KEY_BLUE : 406,

    KEY_EXIT :  45
};

var TVKeyValuePhilips = {
    KEY_BACK_SPACE : (typeof VK_BACK != 'undefined' ? VK_BACK : 8),
    KEY_ENTER : (typeof VK_ENTER != 'undefined' ? VK_ENTER : 13),
    KEY_UP : (typeof VK_UP != 'undefined' ? VK_UP : 130),
    KEY_DOWN : (typeof VK_DOWN != 'undefined' ? VK_DOWN : 131),
    KEY_LEFT : (typeof VK_LEFT != 'undefined' ? VK_LEFT : 132),
    KEY_RIGHT : (typeof VK_RIGHT != 'undefined' ? VK_RIGHT : 133),

    KEY_PAUSE : (typeof VK_PAUSE != 'undefined' ? VK_PAUSE : 19),
    KEY_PLAY : (typeof VK_PLAY != 'undefined' ? VK_PLAY : 415),
    KEY_STOP : (typeof VK_STOP != 'undefined' ? VK_STOP : 413),
    KEY_FF : (typeof VK_FAST_FWD != 'undefined' ? VK_FAST_FWD : 408),
    KEY_RW : (typeof VK_REWIND != 'undefined' ? VK_REWIND : 412),
    KEY_NEXT : (typeof VK_NEXT != 'undefined' ? VK_NEXT : 34),
    KEY_PREV : (typeof VK_PREV != 'undefined' ? VK_PREV : 33),

    KEY_POWER : (typeof VK_POWER != 'undefined' ? VK_POWER : 76),
    KEY_VOL_UP : (typeof VK_VOLUME_UP != 'undefined' ? VK_VOLUME_UP : 7),
    KEY_VOL_DOWN : (typeof VK_VOLUME_DOWN != 'undefined' ? VK_VOLUME_DOWN : 11),
    KEY_CH_UP : (typeof VK_CHANNEL_UP != 'undefined' ? VK_CHANNEL_UP : 68),
    KEY_CH_DOWN : (typeof VK_CHANNEL_DOWN != 'undefined' ? VK_CHANNEL_DOWN : 65),

    KEY_RED : (typeof VK_RED != 'undefined' ? VK_RED : 403),
    KEY_GREEN : (typeof VK_GREEN != 'undefined' ? VK_GREEN : 404),
    KEY_BLUE : (typeof VK_BLUE != 'undefined' ? VK_BLUE : 406),
    KEY_YELLOW : (typeof VK_YELLOW != 'undefined' ? VK_YELLOW : 502)
};

var TVKeyValueGoogleTV = {
    KEY_BACK_SPACE: 8,
    KEY_BACK: 8,
    KEY_ENTER : 13,
    KEY_UP : 38,
    KEY_DOWN : 40,
    KEY_LEFT : 37,
    KEY_RIGHT : 39,

    KEY_PLAY_PAUSE : 179,
    KEY_STOP : 178,
    KEY_EMPTY : 0,

    KEY_PANEL_CH_UP : 105,
    KEY_PANEL_CH_DOWN : 106,
    KEY_PANEL_VOL_UP : 203,
    KEY_PANEL_VOL_DOWN : 204,
    KEY_PANEL_ENTER : 309,
    KEY_PANEL_SOURCE : 612,
    KEY_PANEL_MENU : 613,
    KEY_PANEL_POWER : 614,

    KEY_POWER : 76,
    KEY_TV : 77,
    KEY_VOL_UP : 7,
    KEY_VOL_DOWN : 11,
    KEY_CH_UP : 68,
    KEY_CH_DOWN : 65,

    KEY_FF : 228,
    KEY_RW : 227,

    KEY_EXIT :  45,

    KEY_0 : (typeof VK_0 != 'undefined' ? VK_0 : null)
};

var TVKeyValueSonyCEB = {
    KEY_BACK_SPACE: (typeof VK_BACK_SPACE != 'undefined' ? VK_BACK_SPACE : 8),
    KEY_BACK: (typeof VK_BACK_SPACE != 'undefined' ? VK_BACK_SPACE : 8),
    KEY_ENTER : (typeof VK_ENTER != 'undefined' ? VK_ENTER : null),
    KEY_UP : (typeof VK_UP != 'undefined' ? VK_UP : null),
    KEY_DOWN : (typeof VK_DOWN != 'undefined' ? VK_DOWN : null),
    KEY_LEFT : (typeof VK_LEFT != 'undefined' ? VK_LEFT : null),
    KEY_RIGHT : (typeof VK_RIGHT != 'undefined' ? VK_RIGHT : null),

    KEY_PAUSE : (typeof VK_PAUSE != 'undefined' ? VK_PAUSE : null),
    KEY_PLAY : (typeof VK_PLAY != 'undefined' ? VK_PLAY : null),
    KEY_STOP : (typeof VK_STOP != 'undefined' ? VK_STOP : null),

    KEY_FF : (typeof VK_FAST_FWD != 'undefined' ? VK_FAST_FWD : null),
    KEY_RW : (typeof VK_REWIND != 'undefined' ? VK_REWIND : null),
    KEY_NEXT : (typeof VK_TRACK_NEXT != 'undefined' ? VK_TRACK_NEXT : null),
    KEY_PREV : (typeof VK_TRACK_PREV != 'undefined' ? VK_TRACK_PREV : null),

    KEY_EXIT :  (typeof VK_EXIT != 'undefined' ? VK_EXIT : null),

    KEY_0 : (typeof VK_0 != 'undefined' ? VK_0 : null),

    KEY_RED : (typeof VK_RED != 'undefined' ? VK_RED : null),
    KEY_GREEN : (typeof VK_GREEN != 'undefined' ? VK_GREEN : null),
    KEY_BLUE : (typeof VK_BLUE != 'undefined' ? VK_BLUE : null),
    KEY_YELLOW :(typeof VK_YELLOW != 'undefined' ? VK_YELLOW : null)
};

var TVKeyValuePanasonic = {
    KEY_RETURN:8,
    KEY_ENTER:13,
    KEY_UP:38,
    KEY_DOWN:40,
    KEY_LEFT:37,
    KEY_RIGHT:39,
    KEY_EMPTY:0,
    KEY_EXIT:null,

    KEY_1 : (typeof VK_1 != 'undefined' ? VK_1 : null),
    KEY_2 : (typeof VK_2 != 'undefined' ? VK_2 : null),
    KEY_3 : (typeof VK_3 != 'undefined' ? VK_3 : null),
    KEY_4 : (typeof VK_4 != 'undefined' ? VK_4 : null),
    KEY_5 : (typeof VK_5 != 'undefined' ? VK_5 : null),
    KEY_6 : (typeof VK_6 != 'undefined' ? VK_6 : null),
    KEY_7 : (typeof VK_7 != 'undefined' ? VK_7 : null),
    KEY_8 : (typeof VK_8 != 'undefined' ? VK_8 : null),
    KEY_9 : (typeof VK_9 != 'undefined' ? VK_9 : null),
    KEY_0 : (typeof VK_0 != 'undefined' ? VK_0 : null),

    KEY_PLAY  : (typeof VK_PLAY  != 'undefined' ? VK_PLAY : null),
    KEY_PAUSE : (typeof VK_PAUSE != 'undefined' ? VK_PAUSE : null),
    KEY_STOP  : (typeof VK_STOP  != 'undefined' ? VK_STOP : null),
    KEY_FF    : (typeof VK_FAST_FWD    != 'undefined' ? VK_FAST_FWD : null),
    KEY_RW    : (typeof VK_REWIND    != 'undefined' ? VK_REWIND : null),
    KEY_NEXT    : (typeof VK_NEXT    != 'undefined' ? VK_NEXT : null),
    KEY_PREV    : (typeof VK_PREV    != 'undefined' ? VK_PREV : null),

    KEY_RED : (typeof VK_RED != 'undefined' ? VK_RED : null),
    KEY_GREEN : (typeof VK_GREEN != 'undefined' ? VK_GREEN : null),
    KEY_BLUE : (typeof VK_BLUE != 'undefined' ? VK_BLUE : null),
    KEY_YELLOW :(typeof VK_YELLOW != 'undefined' ? VK_YELLOW : null)
};

var TVKeyValueToshiba = {
    KEY_EXIT: 461
};

var TVKeyValueFireTV = {
    
    
    // theses keys are handled directly within the webview
    KEY_ENTER : 13,
    KEY_UP : 38,
    KEY_DOWN : 40,
    KEY_LEFT : 37,
    KEY_RIGHT : 39,

    // these will be simulated from the AndroidWrapper app (see FireTVKeyHandler.simulateKeyDownEvent)
    KEY_BACK: 4,
    KEY_PLAY_PAUSE: 85,
    KEY_FF: 90,
    KEY_RW: 89,
    KEY_MENU: 82,
};

var TVKeyValueAndroidTV = {
    // theses keys are handled directly within the webview
    KEY_ENTER : 13,
    KEY_UP : 38,
    KEY_DOWN : 40,
    KEY_LEFT : 37,
    KEY_RIGHT : 39,
    // these will be simulated from the AndroidWrapper app (see FireTVKeyHandler.simulateKeyDownEvent)
    KEY_BACK: 4,
    KEY_PLAY_PAUSE: 85,
    KEY_FF: 90,
    KEY_RW: 89,
    KEY_MENU: 82
};

var TVKeyValueOppo = {
    KEY_BACK  : 461,
    KEY_OK    : 13,
    KEY_UP    : 38,
    KEY_DOWN  : 40,
    KEY_LEFT  : 37,
    KEY_RIGHT : 39,
    KEY_PLAY  : 71,
    KEY_PAUSE : 74,
    KEY_STOP  : 413,
    KEY_FF    : 228,
    KEY_RW    : 227,
    KEY_NEXT  : 65,
    KEY_PREV  : 68,
    KEY_BLUE  : 406
};

var TVKeyValueSamsungTizen = {
	KEY_LEFT  : 37,
	KEY_UP    : 38,
	KEY_RIGHT : 39,
	KEY_DOWN  : 40,
	KEY_OK    : 13,
	KEY_BACK  : 10009,	
	KEY_PLAY  : 415,
	KEY_PAUSE : 19,
	KEY_STOP  : 413,
	KEY_RW    : 412,
	KEY_FF    : 417
};
