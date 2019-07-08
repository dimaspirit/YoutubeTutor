
import { CONFIG, ERRORS, PAGES, COURSE_TYPES, COURSE_STATES, DB_TYPES } from './config';
import getRouteFromURL from './RouteHelper';

import CourseListActive from './CourseList/CourseListActive';
import CourseListRecommended from './CourseList/CourseListRecommended';

/** VIEWS */
import Home from './views/layots/Home';
import Playlist from './views/layots/Playlist';
import PlaylistItems from './views/layots/PlaylistItems';
import Video from './views/layots/Video';
import VideoCourseAction from './views/layots/VideoCourseAction';

class Client {
  constructor() {
    this.user = {
      isEnabled: true
    };

    const timeEnabled = 3600000; // 1 hours 3600000

    chrome.storage.local.get(['yttDisabled'], (result) => {
      const disabledTime = result['yttDisabled'];

      if(disabledTime && ((Date.now() - disabledTime) < timeEnabled)) {
        this.user.isEnabled = false;
      }

      if(this.user.isEnabled) {
        // Set lister for messaging with backbground.js
        chrome.runtime.onMessage.addListener(this.onMessage.bind(this));

        this.activeCourses = new CourseListActive();
        this.recommendedCourses = new CourseListRecommended();
        
        const loadInit = [];
        loadInit.push(this.activeCourses.fetch());
        loadInit.push(this.recommendedCourses.fetch());
    
        Promise.all(loadInit)
          .then(() => {
            this.route();
          }).catch(error => {
            console.error(error);
          });
      }
    });
  }

  onMessage(request, sender, sendResponse) {
    if(request.action === 'route') { this.route(); }
  }

  route() {
    const self = this;
    const route = getRouteFromURL();
    
    if(route.pathname === PAGES.home) {
      const activeCourse = this.activeCourses.getData();
      const recommendedCourses = this.recommendedCourses.getData();

      // function handleSync(id) {
      //   self.activeCourses.makeSync(id)
      //     .then(() => {
      //       self.route();
      //     }).catch((error) => {
      //       alert(error);
      //       console.log(error);
      //     })
      // }
 
      Home.render(recommendedCourses, activeCourse, {
        switchoff: function() {
          chrome.storage.local.set({'yttDisabled': Date.now()}, function() {
            location.reload();
          });
        }
      });
    }

    if(route.pathname === PAGES.course) {
      const self = this;

      const isMaxCoursesSavedAlready = this.activeCourses.isMax();
      let course = this.activeCourses.get(route.data.playlistId);

      const isSavedCourse = course ? true : false;

      PlaylistItems.destroy();

      if(!isSavedCourse) {
        course = {
          id: route.data.playlistId
        };
      } else {
        PlaylistItems.render(course);
      }

      function handleError(error) {
        console.error(error);
        alert(JSON.stringify(error));
      }

      function handleResponce() {
        self.route();
      }

      function handleAddCourse(id) {
        self.activeCourses.add({id})
          .then(handleResponce)
          .catch(handleError);
      }

      function handleRemoveCourse(id) {
        self.activeCourses.remove({id})
          .then(handleResponce)
          .catch(handleError);
      }

      Playlist.render(isMaxCoursesSavedAlready, course, isSavedCourse ? handleRemoveCourse : handleAddCourse);
    }

    if(route.pathname === PAGES.lesson && route.data.playlistId) {
      let course = this.activeCourses.get(route.data.playlistId);

      Video.destroy();
      VideoCourseAction.destroy();

      if(course) {
        const self = this;
        const lesson = course.lessons.find(el => el.id === route.data.id);

        function toggleStateLesson({id, courseId, state}) {
          self.activeCourses.setLessonState(id, courseId, state)
            .then(() => {
              self.route();
            });
        }

        Video.render(lesson, toggleStateLesson);
      } else {
        const self = this;

        function handleError(error) {
          console.error(error);
          alert(JSON.stringify(error));
        }
  
        function handleResponce() {
          self.route();
        }
  
        function handleAddCourse(id) {
          self.activeCourses.add({id})
            .then(handleResponce)
            .catch(handleError);
        }

        VideoCourseAction.render(route.data.playlistId, handleAddCourse);
      }
    }
  }
}

const app = new Client();