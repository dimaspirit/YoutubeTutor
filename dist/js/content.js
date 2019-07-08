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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/content.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/CourseList/CourseList.js":
/*!**************************************!*\
  !*** ./src/CourseList/CourseList.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * COURSE schema:
 * {
 *   id: <string>
 *   db_type: <string> - Possible values: `sync` or `local`, ONLY for CourseListActive
 * }
 */
var CourseList =
/*#__PURE__*/
function () {
  function CourseList() {
    var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, CourseList);

    this.items = list;
  }

  _createClass(CourseList, [{
    key: "_copy",
    value: function _copy(inpList) {
      var list = inpList ? inpList : this.items;
      return list.map(function (el) {
        return Object.assign({}, el);
      });
    }
  }, {
    key: "getData",
    value: function getData() {
      return this._copy();
    }
  }, {
    key: "_requestData",
    value: function _requestData(ids) {
      return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage({
          ids: ids,
          action: 'getPlaylistInfo'
        }, function (response) {
          var lastError = chrome.runtime.lastError;

          if (lastError) {
            reject(lastError.message);
            return;
          }

          resolve(response);
        });
      });
    }
    /**
     * Extends courses with data
     * from Youtube API DATA
     */

  }, {
    key: "extendsByYTData",
    value: function extendsByYTData() {
      var _this = this;

      var ids = this.items.map(function (element) {
        return element.id;
      });
      return new Promise(function (resolve, reject) {
        _this._requestData(ids).then(function (playlists) {
          _this.items.forEach(function (item) {
            var playlistsFounded = playlists.filter(function (pl) {
              return pl.id === item.id;
            });

            if (playlistsFounded.length) {
              Object.assign.apply(Object, [item].concat(_toConsumableArray(playlistsFounded)));
            }
          });

          resolve();
        })["catch"](function (error) {
          return reject(error);
        });
      });
    }
  }]);

  return CourseList;
}();

/* harmony default export */ __webpack_exports__["default"] = (CourseList);

/***/ }),

/***/ "./src/CourseList/CourseListActive.js":
/*!********************************************!*\
  !*** ./src/CourseList/CourseListActive.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../config */ "./src/config.js");
/* harmony import */ var _CourseList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CourseList */ "./src/CourseList/CourseList.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



/**
 * Lifecycle of CourseListActive
 * 
 * Change -> Update Local copy -> Update Storage
 * 
 * extends COURSE schema by ACTIVE list:
 * {
 *   db_type: <string> - Possible values: `sync` or `local`
 * }
 */

var _DB_NAMES = {
  local: 'courses',
  sync: 'coursesSync'
};

var CourseListActive =
/*#__PURE__*/
function (_CourseList) {
  _inherits(CourseListActive, _CourseList);

  function CourseListActive() {
    var _this;

    _classCallCheck(this, CourseListActive);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CourseListActive).call(this));
    _this.previousState = [];
    return _this;
  }
  /**
   * Return is possible to save more courses or not
   */


  _createClass(CourseListActive, [{
    key: "isMax",
    value: function isMax() {
      return this.items.length >= _config__WEBPACK_IMPORTED_MODULE_0__["CONFIG"].maxActiveCourses;
    }
    /**
     * Return course or undefined
     * @param {String} id - id of playlist / course
     */

  }, {
    key: "get",
    value: function get(id) {
      return this.items.find(function (item) {
        return item.id === id;
      });
    }
  }, {
    key: "_fetchByDBName",
    value: function _fetchByDBName(dbName, type) {
      return new Promise(function (resolve, reject) {
        chrome.storage[type].get(dbName, function (result) {
          if (chrome.runtime.lastError) {
            reject({
              error: chrome.runtime.lastError
            });
          } else {
            var responce = result[dbName];
            var courses = responce && responce.length ? responce : [];
            resolve(courses);
          }
        });
      });
    }
    /**
     * Return new (copy) of courses with field db_name={dbName}
     * @param {Array} list 
     * @param {String} dbName 
     */

  }, {
    key: "_markCoursesByDB",
    value: function _markCoursesByDB(list, dbName) {
      var courses = this._copy(list);

      courses.forEach(function (el) {
        el.db_type = dbName;
      });
      return courses;
    }
    /**
     * The default set of courses
     * for this list from the databases:
     *  - local
     *  - sync
     */

  }, {
    key: "fetch",
    value: function fetch() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var getSyncCourses = _this2._fetchByDBName(_DB_NAMES.sync, 'sync');

        var getLocalCourses = _this2._fetchByDBName(_DB_NAMES.local, 'local');

        Promise.all([getSyncCourses, getLocalCourses]).then(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              sync = _ref2[0],
              local = _ref2[1];

          var syncCourses = _this2._markCoursesByDB(sync, _config__WEBPACK_IMPORTED_MODULE_0__["DB_TYPES"].sync);

          var localCourses = _this2._markCoursesByDB(local, _config__WEBPACK_IMPORTED_MODULE_0__["DB_TYPES"].local);

          var courses = syncCourses.concat(localCourses);
          _this2.items = _this2._copy(courses);
          resolve(_this2.items);
        });
      });
    }
  }, {
    key: "_saveSync",
    value: function _saveSync(courses) {
      return new Promise(function (resolve, reject) {
        chrome.storage.sync.set(_defineProperty({}, _DB_NAMES.sync, courses), function () {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      });
    }
  }, {
    key: "_saveLocal",
    value: function _saveLocal(courses) {
      return new Promise(function (resolve, reject) {
        chrome.storage.local.set(_defineProperty({}, _DB_NAMES.local, courses), function () {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      });
    }
    /**
     * To persist the state 
     * of a list to the database
     */

  }, {
    key: "_save",
    value: function _save() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var courses = _this3._copy();

        var syncCourses = courses.filter(function (el) {
          return el.db_type === 'sync';
        });
        var localCourses = courses.filter(function (el) {
          return el.db_type === 'local';
        });
        syncCourses.forEach(function (el) {
          delete el.db_type;
        });
        localCourses.forEach(function (el) {
          delete el.db_type;
        });
        var awaitSaves = [_this3._saveSync(syncCourses), _this3._saveLocal(localCourses)];
        Promise.all(awaitSaves).then(function (responce) {
          resolve();
        })["catch"](function (error) {
          reject(error);
        });
      });
    }
    /**
     * Add a course in YouTubeTutor
     * @param {Object} params
     * @param {String} params.id - id of playlist
     */

  }, {
    key: "add",
    value: function add(_ref3) {
      var _this4 = this;

      var id = _ref3.id;
      this.previousState = this._copy();
      return new Promise(function (resolve, reject) {
        _this4._fill({
          id: id
        }).then(function (course) {
          var newCourse = _this4._markCoursesByDB([course], _config__WEBPACK_IMPORTED_MODULE_0__["DB_TYPES"].local)[0];

          _this4.items.push(newCourse);

          return _this4._save();
        }).then(function () {
          return resolve();
        })["catch"](function (error) {
          _this4._previousState();

          reject(error);
        });
      });
    }
  }, {
    key: "makeSync",
    value: function makeSync(id) {
      var _this5 = this;

      this.previousState = this._copy();
      return new Promise(function (resolve, reject) {
        var courseIndex = _this5.items.findIndex(function (item) {
          return item.id === id;
        });

        var course = Object.assign({}, _this5.items[courseIndex]);
        course.db_type = 'sync';

        _this5.items.forEach(function (el) {
          el.db_type = 'local';
        });

        _this5.items.splice(courseIndex, 1, course);

        _this5._save().then(function () {
          return resolve();
        })["catch"](function (error) {
          _this5._previousState();

          reject(error);
        });
      });
    }
    /**
     * Remove a course from YouTubeTutor
     * @param {Object} params
     * @param {String} params.id - id of playlist
     */

  }, {
    key: "remove",
    value: function remove(_ref4) {
      var _this6 = this;

      var id = _ref4.id;
      this.previousState = this._copy();
      return new Promise(function (resolve, reject) {
        _this6.items = _this6.items.filter(function (item) {
          return item.id !== id;
        });

        _this6._save().then(function () {
          return resolve();
        })["catch"](function (error) {
          _this6._previousState();

          reject(error);
        });
      });
    }
  }, {
    key: "setLessonState",
    value: function setLessonState(id, courseId, state) {
      var _this7 = this;

      this._previousState = this._copy();
      return new Promise(function (resolve, reject) {
        var courseIndex = _this7.items.findIndex(function (item) {
          return item.id === courseId;
        });

        var course = _this7.items[courseIndex];
        var lessonIndex = course.lessons.findIndex(function (item) {
          return item.id === id;
        });
        var lesson = course.lessons[lessonIndex];
        lesson.progress.state = state;
        var isCourseFinished = course.lessons.every(function (lesson) {
          return lesson.progress.state === 1;
        });

        if (isCourseFinished) {
          _this7.remove({
            id: courseId
          }).then(function () {
            return resolve();
          })["catch"](function (error) {
            _this7._previousState();

            reject(error);
          });
        } else {
          _this7.items.splice(courseIndex, 1, course);

          _this7._save().then(function () {
            return resolve();
          })["catch"](function (error) {
            _this7._previousState();

            reject(error);
          });
        }
      });
    }
  }, {
    key: "handleGetPlaylistInfo",
    value: function handleGetPlaylistInfo(ids) {
      return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage({
          ids: ids,
          action: 'getPlaylistInfo'
        }, function (response) {
          console.log('handleGetPlaylistInfo', response);
          var lastError = chrome.runtime.lastError;

          if (lastError) {
            reject(lastError.message);
            return;
          }

          resolve(response);
        });
      });
    }
  }, {
    key: "handleGetPlaylistItemsInfo",
    value: function handleGetPlaylistItemsInfo(id) {
      return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage({
          id: id,
          action: 'getPlaylistItemsInfo'
        }, function (response) {
          console.log('handleGetPlaylistItemsInfo', response);
          var lastError = chrome.runtime.lastError;

          if (lastError) {
            reject(lastError.message);
            return;
          }

          resolve(response);
        });
      });
    }
    /**
     * Load data from YouTube API
     * @param {Object} course
     * @param {String} course.id - id of playlist
     */

  }, {
    key: "_fill",
    value: function _fill(course) {
      var _this8 = this;

      return new Promise(function (resolve, reject) {
        var getInfoFromYoutube = [];
        getInfoFromYoutube.push(_this8.handleGetPlaylistInfo([course.id]));
        getInfoFromYoutube.push(_this8.handleGetPlaylistItemsInfo(course.id));
        Promise.all(getInfoFromYoutube).then(function (response) {
          var _response = _slicedToArray(response, 2),
              playlistsInfo = _response[0],
              videosInfo = _response[1];

          var playlistInfo = playlistsInfo[0];
          Object.assign(course, {
            channelId: playlistInfo.channelId,
            channelTitle: playlistInfo.channelTitle,
            description: playlistInfo.description,
            id: playlistInfo.id,
            publishedAt: playlistInfo.publishedAt,
            title: playlistInfo.title,
            thumbnails: playlistInfo.thumbnails
          }, {
            lessons: []
          });
          videosInfo.forEach(function (videoInfo, index) {
            var snippet = videoInfo.snippet,
                contentDetails = videoInfo.contentDetails,
                status = videoInfo.status;

            if (status.privacyStatus !== 'private') {
              var lesson = {
                id: contentDetails.videoId,
                position: snippet.position,
                parentId: snippet.playlistId,
                thumbnails: {
                  standard: snippet.thumbnails.standard,
                  maxres: snippet.thumbnails.maxres
                },
                progress: {
                  state: 0
                }
              };
              course.lessons.push(lesson);
            }
          });
          resolve(course);
        })["catch"](function (error) {
          console.log('fill error', error);
          reject({
            error: 'Can not load data from YouTube API'
          });
        });
      });
    }
  }, {
    key: "_previousState",
    value: function _previousState() {
      this.items = this.previousState.slice();
    }
  }]);

  return CourseListActive;
}(_CourseList__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (CourseListActive);

/***/ }),

/***/ "./src/CourseList/CourseListRecommended.js":
/*!*************************************************!*\
  !*** ./src/CourseList/CourseListRecommended.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CourseList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CourseList */ "./src/CourseList/CourseList.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var CourseListRecommended =
/*#__PURE__*/
function (_CourseList) {
  _inherits(CourseListRecommended, _CourseList);

  function CourseListRecommended(list) {
    _classCallCheck(this, CourseListRecommended);

    return _possibleConstructorReturn(this, _getPrototypeOf(CourseListRecommended).call(this, list));
  }

  _createClass(CourseListRecommended, [{
    key: "_request",
    value: function _request(action) {
      return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage({
          action: action
        }, function (response) {
          var lastError = chrome.runtime.lastError;

          if (lastError) {
            reject(lastError.message);
            return;
          }

          resolve(response);
        });
      });
    }
  }, {
    key: "handleGet",
    value: function handleGet() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this._request('getCoursesMy').then(function (res) {
          return resolve(res);
        })["catch"](function (error) {
          return reject(error);
        });
      });
    }
    /**
     * The default set of recommended courses
     * from the Github
     */

  }, {
    key: "fetch",
    value: function fetch() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.handleGet().then(function (list) {
          _this2.items = list.items;
          return _this2.extendsByYTData();
        }).then(function () {
          resolve(_this2.items);
        })["catch"](function (error) {
          reject(error);
        });
      });
    }
  }]);

  return CourseListRecommended;
}(_CourseList__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (CourseListRecommended);

/***/ }),

/***/ "./src/RouteHelper.js":
/*!****************************!*\
  !*** ./src/RouteHelper.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getRouteFromURL; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/config.js");

/**
 * Return route (URL)
 * and specific data from URL for each page.
 * 
 * Index page: returns only pathname;
 * Playlist page: returns pathname, data.playlistId - id of playlist;
 * Watch page: returns pathname, data.id - id of playlist;
 * 
 * @returns {object} route
 * @returns {string} route.pathname
 * @returns {object} route.data - specific data which parsing from URL
 * @returns {string} [route.data.playlistId]
 * @returns {string} [route.data.id] - id of video
 */

function getRouteFromURL() {
  var route = {
    data: {},
    pathname: window.location.pathname
  };
  var params = new URL(window.location).searchParams;
  var data = {};

  switch (route.pathname) {
    case _config__WEBPACK_IMPORTED_MODULE_0__["PAGES"].lesson:
      data.id = params.get('v');
      data.playlistId = params.get('list');
      break;

    case _config__WEBPACK_IMPORTED_MODULE_0__["PAGES"].course:
      data.playlistId = params.get('list');
      break;
  }

  Object.assign(route.data, data);
  return route;
}
;

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

/***/ }),

/***/ "./src/content.js":
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/config.js");
/* harmony import */ var _RouteHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RouteHelper */ "./src/RouteHelper.js");
/* harmony import */ var _CourseList_CourseListActive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CourseList/CourseListActive */ "./src/CourseList/CourseListActive.js");
/* harmony import */ var _CourseList_CourseListRecommended__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CourseList/CourseListRecommended */ "./src/CourseList/CourseListRecommended.js");
/* harmony import */ var _views_layots_Home__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./views/layots/Home */ "./src/views/layots/Home.js");
/* harmony import */ var _views_layots_Playlist__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/layots/Playlist */ "./src/views/layots/Playlist.js");
/* harmony import */ var _views_layots_PlaylistItems__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./views/layots/PlaylistItems */ "./src/views/layots/PlaylistItems.js");
/* harmony import */ var _views_layots_Video__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./views/layots/Video */ "./src/views/layots/Video.js");
/* harmony import */ var _views_layots_VideoCourseAction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./views/layots/VideoCourseAction */ "./src/views/layots/VideoCourseAction.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





/** VIEWS */







var Client =
/*#__PURE__*/
function () {
  function Client() {
    var _this = this;

    _classCallCheck(this, Client);

    this.user = {
      isEnabled: true
    };
    var timeEnabled = 3600000; // 1 hours 3600000

    chrome.storage.local.get(['yttDisabled'], function (result) {
      var disabledTime = result['yttDisabled'];

      if (disabledTime && Date.now() - disabledTime < timeEnabled) {
        _this.user.isEnabled = false;
      }

      if (_this.user.isEnabled) {
        // Set lister for messaging with backbground.js
        chrome.runtime.onMessage.addListener(_this.onMessage.bind(_this));
        _this.activeCourses = new _CourseList_CourseListActive__WEBPACK_IMPORTED_MODULE_2__["default"]();
        _this.recommendedCourses = new _CourseList_CourseListRecommended__WEBPACK_IMPORTED_MODULE_3__["default"]();
        var loadInit = [];
        loadInit.push(_this.activeCourses.fetch());
        loadInit.push(_this.recommendedCourses.fetch());
        Promise.all(loadInit).then(function () {
          _this.route();
        })["catch"](function (error) {
          console.error(error);
        });
      }
    });
  }

  _createClass(Client, [{
    key: "onMessage",
    value: function onMessage(request, sender, sendResponse) {
      if (request.action === 'route') {
        this.route();
      }
    }
  }, {
    key: "route",
    value: function route() {
      var self = this;
      var route = Object(_RouteHelper__WEBPACK_IMPORTED_MODULE_1__["default"])();

      if (route.pathname === _config__WEBPACK_IMPORTED_MODULE_0__["PAGES"].home) {
        var activeCourse = this.activeCourses.getData();
        var recommendedCourses = this.recommendedCourses.getData(); // function handleSync(id) {
        //   self.activeCourses.makeSync(id)
        //     .then(() => {
        //       self.route();
        //     }).catch((error) => {
        //       alert(error);
        //       console.log(error);
        //     })
        // }

        _views_layots_Home__WEBPACK_IMPORTED_MODULE_4__["default"].render(recommendedCourses, activeCourse, {
          switchoff: function switchoff() {
            chrome.storage.local.set({
              'yttDisabled': Date.now()
            }, function () {
              location.reload();
            });
          }
        });
      }

      if (route.pathname === _config__WEBPACK_IMPORTED_MODULE_0__["PAGES"].course) {
        var handleError = function handleError(error) {
          console.error(error);
          alert(JSON.stringify(error));
        };

        var handleResponce = function handleResponce() {
          _self.route();
        };

        var handleAddCourse = function handleAddCourse(id) {
          _self.activeCourses.add({
            id: id
          }).then(handleResponce)["catch"](handleError);
        };

        var handleRemoveCourse = function handleRemoveCourse(id) {
          _self.activeCourses.remove({
            id: id
          }).then(handleResponce)["catch"](handleError);
        };

        var _self = this;

        var isMaxCoursesSavedAlready = this.activeCourses.isMax();
        var course = this.activeCourses.get(route.data.playlistId);
        var isSavedCourse = course ? true : false;
        _views_layots_PlaylistItems__WEBPACK_IMPORTED_MODULE_6__["default"].destroy();

        if (!isSavedCourse) {
          course = {
            id: route.data.playlistId
          };
        } else {
          _views_layots_PlaylistItems__WEBPACK_IMPORTED_MODULE_6__["default"].render(course);
        }

        _views_layots_Playlist__WEBPACK_IMPORTED_MODULE_5__["default"].render(isMaxCoursesSavedAlready, course, isSavedCourse ? handleRemoveCourse : handleAddCourse);
      }

      if (route.pathname === _config__WEBPACK_IMPORTED_MODULE_0__["PAGES"].lesson && route.data.playlistId) {
        var _course = this.activeCourses.get(route.data.playlistId);

        _views_layots_Video__WEBPACK_IMPORTED_MODULE_7__["default"].destroy();
        _views_layots_VideoCourseAction__WEBPACK_IMPORTED_MODULE_8__["default"].destroy();

        if (_course) {
          var toggleStateLesson = function toggleStateLesson(_ref) {
            var id = _ref.id,
                courseId = _ref.courseId,
                state = _ref.state;

            _self2.activeCourses.setLessonState(id, courseId, state).then(function () {
              _self2.route();
            });
          };

          var _self2 = this;

          var lesson = _course.lessons.find(function (el) {
            return el.id === route.data.id;
          });

          _views_layots_Video__WEBPACK_IMPORTED_MODULE_7__["default"].render(lesson, toggleStateLesson);
        } else {
          var _handleError = function _handleError(error) {
            console.error(error);
            alert(JSON.stringify(error));
          };

          var _handleResponce = function _handleResponce() {
            _self3.route();
          };

          var _handleAddCourse = function _handleAddCourse(id) {
            _self3.activeCourses.add({
              id: id
            }).then(_handleResponce)["catch"](_handleError);
          };

          var _self3 = this;

          _views_layots_VideoCourseAction__WEBPACK_IMPORTED_MODULE_8__["default"].render(route.data.playlistId, _handleAddCourse);
        }
      }
    }
  }]);

  return Client;
}();

var app = new Client();

/***/ }),

/***/ "./src/views/ViewHelpers.js":
/*!**********************************!*\
  !*** ./src/views/ViewHelpers.js ***!
  \**********************************/
/*! exports provided: isRenderedDOMElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRenderedDOMElement", function() { return isRenderedDOMElement; });
/**
 * Check out and return el when it will be render
 * @param {string} query - string containing CSS selector
 * 
 * @example
 * const mountElClassName = '.mountEl';
 * 
 * isRenderedDOMElement(mountElClassName).then((el) => {
 *  el.append('Your included html');
 * }).catch(() => {
 *  throw new Error('Element not found');
 * });
 */
function isRenderedDOMElement(query) {
  return new Promise(function (resolve, reject) {
    var timeToWaiting = 10; // sec

    var counter = 0;
    var timerId = setInterval(function () {
      var el = document.querySelector(query);

      if (el) {
        clearInterval(timerId);
        resolve(el);
      } else if (counter > timeToWaiting) {
        clearInterval(timerId);
        reject();
      } else {
        ++counter;
      }
    }, 1000);
  });
}

;


/***/ }),

/***/ "./src/views/components/CoursePreview.js":
/*!***********************************************!*\
  !*** ./src/views/components/CoursePreview.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var CoursePreview = {
  compose: function compose(course) {
    var thumbnailUrl;
    var elClassMod;

    if (course.thumbnails.standard && course.thumbnails.standard.url) {
      thumbnailUrl = course.thumbnails.standard.url;
      elClassMod = 'standart';
    } else if (course.thumbnails.medium && course.thumbnails.medium.url) {
      thumbnailUrl = course.thumbnails.medium.url;
      elClassMod = 'medium';
    } else if (course.thumbnails["default"] && course.thumbnails["default"].url) {
      thumbnailUrl = course.thumbnails["default"].url;
      elClassMod = 'default';
    } else {
      thumbnailUrl = 'https://dummyimage.com/600x400/000/9100ff.png&text=No+image';
      elClassMod = 'noone';
    }

    var elDOM = "\n      <div class=\"ytt-course_preview\">\n        <div class=\"ytt-course_preview__thumbnail ytt-course_preview__thumbnai--".concat(elClassMod, " \"\n          style=\"background-image: url(").concat(thumbnailUrl, ")\">\n      ");

    if (course.db_type) {
      var isSync = course.db_type === 'sync' ? true : false;
      elDOM += "\n          <button data-id=\"".concat(course.id, "\" \n            class=\"ytt-course_preview__db ").concat(isSync ? 'ytt-course_preview__db-sync' : '', " j-ytt-sync\" >\n          </button>\n          ");
    }

    elDOM += "\n          <a class=\"ytt-course_preview__link\" \n            href=\"/playlist?list=".concat(course.id, "\"\n            title=\"Go to course page\"></a>\n        </div>\n\n        <div class=\"ytt-course_preview__details\">\n          <a class=\"ytt-course_preview__title\"\n            href=\"/playlist?list=").concat(course.id, "\">\n            ").concat(course.title, "\n          </a> by ").concat(course.channelTitle, "\n        ");

    if (course.lessons && course.lessons.length) {
      var firstUnpassedLesson = course.lessons.filter(function (el) {
        return el.progress.state === 0;
      })[0];

      if (firstUnpassedLesson) {
        elDOM += "\n          <div class=\"course_preview_actions\">\n            <a class=\"ytt-link\" \n              href=\"/watch?v=".concat(firstUnpassedLesson.id, "&list=").concat(firstUnpassedLesson.parentId, "\">Up next lesson</a>\n          </div>\n        ");
      }
    }

    elDOM += "  </div>\n      </div>\n    ";
    return elDOM;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (CoursePreview);

/***/ }),

/***/ "./src/views/components/CoursePreviewList.js":
/*!***************************************************!*\
  !*** ./src/views/components/CoursePreviewList.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CoursePreview__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CoursePreview */ "./src/views/components/CoursePreview.js");
/* harmony import */ var _components_EmptyState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../components/EmptyState */ "./src/views/components/EmptyState.js");


var CoursePreviewList = {
  compose: function compose(_ref, courses) {
    var title = _ref.title,
        annotation = _ref.annotation,
        action = _ref.action;
    var elDOM = "\n      <div class=\"ytt-home__section\">\n        <div class='ytt-home__header'>\n          <h1 class='ytt-home__title'>YoutubeTutor / ".concat(title, "\n            <span class=\"ytt-home__annotation\">").concat(annotation, "</span>\n          </h1>\n    ");

    if (action) {
      elDOM += "\n          <div class=\"ytt-home__action\">\n            <button class=\"".concat(action.className, " ytt-link ytt-link-primary\">").concat(action.content, "</button> \n          </div>\n      ");
    }

    elDOM += "\n        </div>\n      <div class=\"ytt-home__content\">\n    ";

    if (courses.length) {
      courses.forEach(function (course) {
        elDOM += _CoursePreview__WEBPACK_IMPORTED_MODULE_0__["default"].compose(course);
      });
    } else {
      elDOM += _components_EmptyState__WEBPACK_IMPORTED_MODULE_1__["default"].compose();
    }

    elDOM += "\n        </div>\n      </div>\n    ";
    return elDOM;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (CoursePreviewList);

/***/ }),

/***/ "./src/views/components/EmptyState.js":
/*!********************************************!*\
  !*** ./src/views/components/EmptyState.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var EmptyState = {
  compose: function compose() {
    return "\n      <div class=\"ytt-empty_state\">\n        <h4 class=\"ytt-empty_state__title\">There is no course to learn :(</h4>\n\n        <p>\n          Check out \n          <a class=\"ytt-link\" \n            href=\"http://dimaspirit.gitlab.io/YoutubeTutor\"\n            target=\"_blank\"\n            title=\"http://dimaspirit.gitlab.io/YoutubeTutor\">\n          YoutubeTutor site</a> to get more information about this Chrome extension.\n        </p>\n\n        <p>\n          To start using just go to a \n          <a class=\"ytt-link\"\n            href=\"/playlist?list=PL0zVEGEvSaeF_zoW9o66wa_UCNE3a7BEr\"\n            title=\"Unit testing in Javascript by Fun Fun Function\">\n          playlist page</a> and add to YoutubeTutor as a course\n          by clicking the button 'Add as a course to YoutubeTutor'.\n      </div>\n    ";
  }
};
/* harmony default export */ __webpack_exports__["default"] = (EmptyState);

/***/ }),

/***/ "./src/views/layots/Home.js":
/*!**********************************!*\
  !*** ./src/views/layots/Home.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../ViewHelpers */ "./src/views/ViewHelpers.js");
/* harmony import */ var _components_CoursePreviewList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/CoursePreviewList */ "./src/views/components/CoursePreviewList.js");


var Home = {
  containerClassName: "ytd-browse.ytd-page-manager[page-subtype='home']",
  wrapperClassName: 'ytt-home',
  btnMakeSync: 'j-ytt-sync',
  ui: {
    btnSwitchOff: 'j-ytt-switch_off'
  },
  destroy: function destroy() {
    var elms = document.querySelectorAll(".".concat(this.wrapperClassName));

    if (elms.length) {
      [].forEach.call(elms, function (el) {
        el.remove();
      });
    }
  },
  render: function render(recommendedCourses, activeCourse, callbacks) {
    var _this = this;

    Object(_ViewHelpers__WEBPACK_IMPORTED_MODULE_0__["isRenderedDOMElement"])(this.containerClassName).then(function (container) {
      _this.destroy();

      var composedDOM = _this.compose(recommendedCourses, activeCourse);

      container.insertAdjacentHTML('afterbegin', composedDOM);
      container.addEventListener('click', function (e) {
        var el = e.target;

        if (el.classList.contains(_this.ui.btnSwitchOff)) {
          e.preventDefault();
          callbacks.switchoff();
        } // if(el.classList.contains(this.btnMakeSync) && el.dataset.id) {
        //   handleSync(el.dataset.id);
        // }

      });
    });
  },
  compose: function compose(recommendedCourses, activeCourses) {
    var self = this;
    var elDOM = "\n      <div class=\"".concat(this.wrapperClassName, "\">");
    elDOM += _components_CoursePreviewList__WEBPACK_IMPORTED_MODULE_1__["default"].compose({
      title: 'In progress courses',
      annotation: 'These are the courses that you are learning now, max 4 active courses',
      action: {
        className: self.ui.btnSwitchOff,
        content: 'Want just serf on YouTube?'
      }
    }, activeCourses);
    elDOM += _components_CoursePreviewList__WEBPACK_IMPORTED_MODULE_1__["default"].compose({
      title: 'Recommended courses',
      annotation: 'List of quality-tested and recommended courses by a large number of users'
    }, recommendedCourses);
    elDOM += "\n      </div>";
    return elDOM;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ }),

/***/ "./src/views/layots/Playlist.js":
/*!**************************************!*\
  !*** ./src/views/layots/Playlist.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../ViewHelpers */ "./src/views/ViewHelpers.js");

var Playlist = {
  containerClassName: '#menu.ytd-playlist-sidebar-primary-info-renderer',
  wrapperClassName: 'ytt-course',
  btnToggleCourseClassName: 'j-ytt-toggle-course_playlist',
  destroy: function destroy() {
    var elms = document.querySelectorAll(".".concat(this.wrapperClassName));

    if (elms.length) {
      [].forEach.call(elms, function (el) {
        el.remove();
      });
    }
  },
  _setListeners: function _setListeners(fn, course) {
    var btnsToggleCourse = document.querySelectorAll(".".concat(this.btnToggleCourseClassName));

    if (btnsToggleCourse) {
      Array.from(btnsToggleCourse).forEach(function (btn) {
        btn.addEventListener('click', function (event) {
          event.preventDefault();
          Array.from(btnsToggleCourse).forEach(function (btn) {
            btn.disabled = true;
            btn.textContent = 'Loading...';
          });
          fn(course.id);
        });
      });
    }
  },
  render: function render(isMaxCoursesSavedAlready, course, toggleCourseFn) {
    var _this = this;

    Object(_ViewHelpers__WEBPACK_IMPORTED_MODULE_0__["isRenderedDOMElement"])(this.containerClassName).then(function (container) {
      _this.destroy();

      var composedDOM = _this._compose(isMaxCoursesSavedAlready, course);

      container.insertAdjacentHTML('afterbegin', composedDOM);

      _this._setListeners(toggleCourseFn, course);
    });
  },
  _compose: function _compose(isMaxCoursesSavedAlready, course) {
    var isCourseExisted = course.lessons && course.lessons.length ? true : false;
    var elDOM = "\n      <div class=\"".concat(this.wrapperClassName, "\">");

    if (isMaxCoursesSavedAlready) {
      elDOM += "\n        <p>YoutubeTutor says: You are have max courses already</p>";

      if (isCourseExisted) {
        elDOM += "\n          <button class='".concat(this.btnToggleCourseClassName, " ytt-button'>\n            Remove the course from YoutubeTutor\n          </button>\n        ");
      }
    } else {
      if (!isCourseExisted) {
        elDOM += "\n          <button class=\"".concat(this.btnToggleCourseClassName, " ytt-button style-scope\" data-db=\"local\">\n            Save as a course to the YoutubeTutor\n          </button>\n        ");
      } else {
        elDOM += "\n          <button class='".concat(this.btnToggleCourseClassName, " ytt-button'>\n            Remove the course from YoutubeTutor\n          </button>\n        ");
      }
    }

    elDOM += "\n      </div>";
    return elDOM;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Playlist);

/***/ }),

/***/ "./src/views/layots/PlaylistItems.js":
/*!*******************************************!*\
  !*** ./src/views/layots/PlaylistItems.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../ViewHelpers */ "./src/views/ViewHelpers.js");

var PlaylistItems = {
  containerClassName: '#contents.ytd-playlist-video-list-renderer',
  wrapperClassName: 'ytt-status',
  destroy: function destroy() {
    var elms = document.querySelectorAll(".".concat(this.wrapperClassName));

    if (elms.length) {
      [].forEach.call(elms, function (el) {
        el.remove();
      });
    }
  },
  render: function render(course) {
    var _this = this;

    Object(_ViewHelpers__WEBPACK_IMPORTED_MODULE_0__["isRenderedDOMElement"])(this.containerClassName).then(function (container) {
      _this.destroy();

      var lessonsElms = container.querySelectorAll('.ytd-playlist-video-list-renderer');
      course.lessons.forEach(function (lesson) {
        var elLesson = lessonsElms[lesson.position];
        var elDOM = "<div class=\"".concat(_this.wrapperClassName, "\">");

        if (lesson && lesson.progress.state === 1) {
          elDOM += "<img src=\"https://icongr.am/material/checkbox-marked-circle-outline.svg?color=888888\" />";
        } else {
          elDOM += "<img src=\"https://icongr.am/material/checkbox-blank-circle-outline.svg?color=888888\" />";
        }

        elDOM += "</div>";
        elLesson.insertAdjacentHTML('afterbegin', elDOM);
      });
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (PlaylistItems);

/***/ }),

/***/ "./src/views/layots/Video.js":
/*!***********************************!*\
  !*** ./src/views/layots/Video.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../ViewHelpers */ "./src/views/ViewHelpers.js");

var Video = {
  containerClassName: 'ytd-video-primary-info-renderer.ytd-watch-flexy',
  wrapperClassName: 'ytt-lesson',
  btnToggleLessonClassName: 'ytt-change-state',
  destroy: function destroy() {
    var elms = document.querySelectorAll(".".concat(this.wrapperClassName));

    if (elms.length) {
      [].forEach.call(elms, function (el) {
        el.remove();
      });
    }
  },
  _setListeners: function _setListeners(lesson, fn) {
    var btnToggleLesson = document.querySelector(".".concat(this.btnToggleLessonClassName));

    if (btnToggleLesson) {
      btnToggleLesson.addEventListener('click', function (e) {
        e.preventDefault();
        btnToggleLesson.disabled = true;
        btnToggleLesson.textContent = 'Loading...';
        var params = {
          id: lesson.id,
          courseId: lesson.parentId,
          state: lesson.progress.state === 0 ? 1 : 0
        };
        fn(params);
      });
    }
  },
  render: function render(lesson, toggleLessonFn) {
    var _this = this;

    Object(_ViewHelpers__WEBPACK_IMPORTED_MODULE_0__["isRenderedDOMElement"])(this.containerClassName).then(function (container) {
      _this.destroy();

      var composedDOM = _this.compose(lesson);

      container.insertAdjacentHTML('afterbegin', composedDOM);

      _this._setListeners(lesson, toggleLessonFn);
    });
  },
  compose: function compose(lesson) {
    var elDOM = "<div class=\"".concat(this.wrapperClassName, "\">");

    if (lesson.progress.state === 0) {
      elDOM += "\n        <button class=\"ytt-button ".concat(this.btnToggleLessonClassName, "\">\n          Mark as passed\n        </button>");
    } else {
      elDOM += "\n        <button class=\"ytt-button ".concat(this.btnToggleLessonClassName, "\">\n          Mark as NOT passed\n        </button>");
    }

    elDOM += "</div>";
    return elDOM;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Video);

/***/ }),

/***/ "./src/views/layots/VideoCourseAction.js":
/*!***********************************************!*\
  !*** ./src/views/layots/VideoCourseAction.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ViewHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../ViewHelpers */ "./src/views/ViewHelpers.js");

var VideoCourseAction = {
  containerClassName: '#playlist-actions',
  wrapperClassName: 'ytt-action_playlist_lesson',
  btnToggleCourseClassName: 'j-ytt-toggle_course',
  destroy: function destroy() {
    var elms = document.querySelectorAll(".".concat(this.wrapperClassName));

    if (elms.length) {
      [].forEach.call(elms, function (el) {
        el.remove();
      });
    }
  },
  render: function render(id, handleFn) {
    var _this = this;

    Object(_ViewHelpers__WEBPACK_IMPORTED_MODULE_0__["isRenderedDOMElement"])(this.containerClassName).then(function (container) {
      _this.destroy();

      var composedDOM = _this.compose();

      container.insertAdjacentHTML('afterbegin', composedDOM);
      var btnAddCourse = document.querySelector(".".concat(_this.btnToggleCourseClassName));

      if (btnAddCourse) {
        btnAddCourse.addEventListener('click', function (e) {
          e.preventDefault();
          btnAddCourse.disabled = true;
          btnAddCourse.textContent = 'Loading';
          handleFn(id);
        });
      }
    });
  },
  compose: function compose() {
    return "\n      <div class=".concat(this.wrapperClassName, ">\n        <button class=\"ytt-button ").concat(this.btnToggleCourseClassName, "\">\n          Add to YouTubeTutor\n        </button>\n      </div>\n    ");
  }
};
/* harmony default export */ __webpack_exports__["default"] = (VideoCourseAction);

/***/ })

/******/ });
//# sourceMappingURL=content.js.map