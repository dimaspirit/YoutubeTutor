import { CONFIG, DB_TYPES, ERRORS } from './../config';
import CourseList from './CourseList';

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
const _DB_NAMES = {
  local: 'courses',
  sync: 'coursesSync'
};

class CourseListActive extends CourseList {
  constructor() {
    super();

    this.previousState = [];
  }

  /**
   * Return is possible to save more courses or not
   */
  isMax() {
    return this.items.length >= CONFIG.maxActiveCourses;
  }

  /**
   * Return course or undefined
   * @param {String} id - id of playlist / course
   */
  get(id) {
    return this.items.find((item) => item.id === id);
  }

  _fetchByDBName(dbName, type) {
    return new Promise((resolve, reject) => {
      chrome.storage[type].get(dbName, result => {
        if(chrome.runtime.lastError) {
          reject({ error: chrome.runtime.lastError });
        } else {
          const responce = result[dbName];
          const courses = responce && responce.length ? responce : [];

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
  _markCoursesByDB(list, dbName) {
    const courses = this._copy(list);

    courses.forEach(el => {
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
  fetch() {
    return new Promise((resolve, reject) => {
      const getSyncCourses = this._fetchByDBName(_DB_NAMES.sync, 'sync');
      const getLocalCourses = this._fetchByDBName(_DB_NAMES.local, 'local');

      Promise.all([getSyncCourses, getLocalCourses]).then(([sync, local]) => {
        const syncCourses = this._markCoursesByDB(sync, DB_TYPES.sync);
        const localCourses = this._markCoursesByDB(local, DB_TYPES.local);

        const courses = syncCourses.concat(localCourses);
        this.items = this._copy(courses);

        resolve(this.items);
      });
    });
  }

  _saveSync(courses) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({[_DB_NAMES.sync]: courses}, () => {
        if(chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  _saveLocal(courses) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({[_DB_NAMES.local]: courses}, () => {
        if(chrome.runtime.lastError) {
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
  _save() {
    return new Promise((resolve, reject) => {
      const courses = this._copy();

      const syncCourses = courses.filter(el => el.db_type === 'sync');
      const localCourses = courses.filter(el => el.db_type === 'local');

      syncCourses.forEach(el => {
        delete el.db_type;
      });

      localCourses.forEach(el => {
        delete el.db_type;
      });

      const awaitSaves = [this._saveSync(syncCourses), this._saveLocal(localCourses)];

      Promise.all(awaitSaves).then(responce => {
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }

  /**
   * Add a course in YouTubeTutor
   * @param {Object} params
   * @param {String} params.id - id of playlist
   */
  add({id}) {
    this.previousState = this._copy();

    return new Promise((resolve, reject) => {
      this._fill({id})
        .then(course => {
          const newCourse = this._markCoursesByDB([course], DB_TYPES.local)[0];
          this.items.push(newCourse);

          return this._save();
        })
        .then(() => resolve())
        .catch(error => {
          this._previousState();
          reject(error);
        });
    });
  }

  makeSync(id) {
    this.previousState = this._copy();

    return new Promise((resolve, reject) => {
      const courseIndex = this.items.findIndex((item) => item.id === id);
      const course = Object.assign({}, this.items[courseIndex]);

      course.db_type = 'sync';

      this.items.forEach(el => {
        el.db_type = 'local';
      });

      this.items.splice(courseIndex, 1, course);

      this._save()
        .then(() => resolve())
        .catch(error => {
          this._previousState();
          reject(error);
        });
    });
  }

  /**
   * Remove a course from YouTubeTutor
   * @param {Object} params
   * @param {String} params.id - id of playlist
   */
  remove({id}) {
    this.previousState = this._copy();

    return new Promise((resolve, reject) => {
      this.items = this.items.filter(item => item.id !== id);

      this._save()
        .then(() => resolve())
        .catch(error => {
          this._previousState();
          reject(error);
        });
    });
  }

  setLessonState(id, courseId, state) {
    this._previousState = this._copy();

    return new Promise((resolve, reject) => {
      const courseIndex = this.items.findIndex((item) => item.id === courseId);
      const course = this.items[courseIndex];

      const lessonIndex = course.lessons.findIndex((item) => item.id === id);
      const lesson = course.lessons[lessonIndex];

      lesson.progress.state = state;

      const isCourseFinished = course.lessons.every((lesson) => lesson.progress.state === 1);

      if(isCourseFinished) {
        this.remove({id: courseId})
          .then(() => resolve())
          .catch(error => {
            this._previousState();
            reject(error);
          });
      } else {
        this.items.splice(courseIndex, 1, course);

        this._save()
          .then(() => resolve())
          .catch(error => {
            this._previousState();
            reject(error);
          });
      }
    });
  }

  handleGetPlaylistInfo(ids) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ ids, action: 'getPlaylistInfo' }, (response) => {
        console.log('handleGetPlaylistInfo', response);
        const lastError = chrome.runtime.lastError;

        if (lastError) {
          reject(lastError.message);
          return;
        }

        resolve(response);
      });
    });
  }

  handleGetPlaylistItemsInfo(id) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ id, action: 'getPlaylistItemsInfo' }, (response) => {
        console.log('handleGetPlaylistItemsInfo', response);
        const lastError = chrome.runtime.lastError;

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
  _fill(course) {
    return new Promise((resolve, reject) => {
      const getInfoFromYoutube = [];

      getInfoFromYoutube.push(this.handleGetPlaylistInfo([course.id]));
      getInfoFromYoutube.push(this.handleGetPlaylistItemsInfo(course.id));
      
      Promise.all(getInfoFromYoutube)
        .then(response => {
          const [playlistsInfo, videosInfo] = response;
          const playlistInfo = playlistsInfo[0];

          Object.assign(course, {
            channelId: playlistInfo.channelId,
            channelTitle: playlistInfo.channelTitle,
            description: playlistInfo.description,
            id: playlistInfo.id,
            publishedAt: playlistInfo.publishedAt,
            title: playlistInfo.title,
            thumbnails: playlistInfo.thumbnails
          }, {lessons: []});

          videosInfo.forEach((videoInfo, index) => {
            const { snippet, contentDetails, status } = videoInfo;

            if(status.privacyStatus !== 'private') {
              let lesson = {
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
        }).catch(error => {
          console.log('fill error', error);
          reject({error: 'Can not load data from YouTube API'});
        })
    });
  }

  _previousState() {
    this.items = this.previousState.slice();
  }
}

export default CourseListActive;