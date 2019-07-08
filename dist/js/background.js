/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/APIs/GitHubAPI.js":
/*!*******************************!*\
  !*** ./src/APIs/GitHubAPI.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var GitHubAPI = {
  getFile: function getFile(url) {
    return new Promise(function (resolve, reject) {
      fetch(url).then(function (response) {
        return response.json();
      }).then(function (fileRaw) {
        resolve(fileRaw);
      })["catch"](function (error) {
        reject(error);
      });
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (GitHubAPI);

/***/ }),

/***/ "./src/APIs/YouTubeAPI.js":
/*!********************************!*\
  !*** ./src/APIs/YouTubeAPI.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../config */ "./src/config.js");

var YouTubeAPI = {
  /**
   * Return snippet part of playlist information
   * @param {Array} ids - Array of string of id playlist
   */
  getPlaylistInfo: function getPlaylistInfo(ids) {
    return new Promise(function (resolve, reject) {
      console.log('getPlaylistInfo', ids);
      var url = _config__WEBPACK_IMPORTED_MODULE_0__["YouTubeCONFIG"].urls.playlists;
      var params = new URLSearchParams();
      params.append('id', ids.toString());
      params.append('part', 'snippet,status');
      params.append('maxResults', '50');
      params.append('key', "AIzaSyDTDhHXa8VpxOOAhqo1OOP-okIbVpwArgg");
      fetch("".concat(url, "?").concat(params.toString())).then(function (responce) {
        return responce.json();
      }).then(function (responceParsed) {
        var playlists = responceParsed.items.map(function (playlist) {
          if (playlist.status.privacyStatus === 'public') {
            var plInfo = Object.assign({}, playlist.snippet, {
              id: playlist.id
            });
            return plInfo;
          }
        });
        resolve(playlists);
      })["catch"](function (err) {
        return reject(err);
      });
    });
  },
  getPlaylistItemsInfo: function getPlaylistItemsInfo(id) {
    console.log('getPlaylistItemsInfo', id);
    return new Promise(function (resolve, reject) {
      var url = _config__WEBPACK_IMPORTED_MODULE_0__["YouTubeCONFIG"].urls.playlistItems;
      var params = new URLSearchParams();
      params.append('playlistId', id);
      params.append('part', 'snippet,contentDetails,status');
      params.append('maxResults', '50');
      params.append('key', "AIzaSyDTDhHXa8VpxOOAhqo1OOP-okIbVpwArgg");
      fetch("".concat(url, "?").concat(params.toString())).then(function (res) {
        return res.json();
      }).then(function (json) {
        return resolve(json.items);
      })["catch"](function (err) {
        return reject(err);
      });
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (YouTubeAPI);

/***/ }),

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/config.js");
/* harmony import */ var _APIs_GitHubAPI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./APIs/GitHubAPI */ "./src/APIs/GitHubAPI.js");
/* harmony import */ var _APIs_YouTubeAPI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./APIs/YouTubeAPI */ "./src/APIs/YouTubeAPI.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var App =
/*#__PURE__*/
function () {
  function App() {
    _classCallCheck(this, App);

    // Set listener for URL changing
    chrome.webNavigation.onHistoryStateUpdated.addListener(this.onNavigate.bind(this));
    var landingURL = 'https://dimaspirit.github.io/YoutubeTutor';
    chrome.runtime.onInstalled.addListener(function (details) {
      if (details.reason === 'install') {
        chrome.tabs.create({
          'url': "".concat(landingURL, "/iamhappy")
        });
      } else if (details.reason === 'update') {
        chrome.tabs.create({
          'url': 'https://www.producthunt.com/posts/youtubetutor'
        });
      }
    });
    chrome.runtime.setUninstallURL("".concat(landingURL, "/iamsad"));
    chrome.runtime.onMessage.addListener(this.onMessage.bind(this));
  }

  _createClass(App, [{
    key: "sendMessage",
    value: function sendMessage(message) {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message);
      });
    }
  }, {
    key: "onNavigate",
    value: function onNavigate() {
      this.sendMessage({
        'action': 'route'
      });
    }
  }, {
    key: "onMessage",
    value: function onMessage(request, sender, sendResponse) {
      console.log('YouTubeTutor: Incoming message', JSON.stringify(request));

      if (request.action === 'getCoursesMy') {
        _APIs_GitHubAPI__WEBPACK_IMPORTED_MODULE_1__["default"].getFile(_config__WEBPACK_IMPORTED_MODULE_0__["CONFIG"].recommendCoursesUrl).then(function (courses) {
          return sendResponse(courses);
        });
      }

      if (request.action === 'getPlaylistInfo') {
        _APIs_YouTubeAPI__WEBPACK_IMPORTED_MODULE_2__["default"].getPlaylistInfo(request.ids).then(function (playlists) {
          console.log('getPlaylistInfo res', playlists);
          sendResponse(playlists);
        });
      }

      if (request.action === 'getPlaylistItemsInfo') {
        _APIs_YouTubeAPI__WEBPACK_IMPORTED_MODULE_2__["default"].getPlaylistItemsInfo(request.id).then(function (responce) {
          console.log('getPlaylistItemsInfo res', responce);
          sendResponse(responce);
        });
      } // Needed to make SendResponce async


      return true;
    }
  }]);

  return App;
}();

var app = new App();

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: PAGES, CONFIG, DB_TYPES, COURSE_TYPES, COURSE_STATES, YouTubeCONFIG, ERRORS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAGES", function() { return PAGES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONFIG", function() { return CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DB_TYPES", function() { return DB_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COURSE_TYPES", function() { return COURSE_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COURSE_STATES", function() { return COURSE_STATES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YouTubeCONFIG", function() { return YouTubeCONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERRORS", function() { return ERRORS; });
/**
 * All possible pages 
 * for YouTubeTutor usage
 */
var PAGES = {
  home: '/',
  course: '/playlist',
  lesson: '/watch'
};
var CONFIG = {
  version: '3.0.0',
  recommendCoursesUrl: 'https://raw.githubusercontent.com/dimaspirit/YoutubeTutor/master/playlists.json',
  maxActiveCourses: 4
};
var DB_TYPES = {
  sync: 'sync',
  local: 'local'
};
var COURSE_TYPES = {
  "default": 1,
  recommended: 2
};
var COURSE_STATES = {
  "default": 1,
  active: 2,
  passed: 3
};
var YouTubeCONFIG = {
  urls: {
    playlists: 'https://www.googleapis.com/youtube/v3/playlists',
    playlistItems: 'https://www.googleapis.com/youtube/v3/playlistItems'
  }
};
var ERRORS = {
  cannotStartWithoutInitLoad: "YouTubeTutor: Can't starting the app",
  ytCannotLoadPlaylists: "YouTubeTutor: Can't find / load playlist",
  ytPrivatePlaylist: 'YouTubeTutor: Requested playlist is private'
};

/***/ })

/******/ });
//# sourceMappingURL=background.js.map