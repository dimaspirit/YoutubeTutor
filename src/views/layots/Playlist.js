import { isRenderedDOMElement } from './../ViewHelpers';

const Playlist = {
  containerClassName: '#menu.ytd-playlist-sidebar-primary-info-renderer',
  wrapperClassName: 'ytt-course',

  btnToggleCourseClassName: 'j-ytt-toggle-course_playlist',

  destroy() {
    const elms = document.querySelectorAll(`.${this.wrapperClassName}`);

    if(elms.length) {
      [].forEach.call(elms, function(el) {
        el.remove();
      });
    }
  },

  _setListeners(fn, course) {
    const btnsToggleCourse = document.querySelectorAll(`.${this.btnToggleCourseClassName}`);

    if(btnsToggleCourse) {
      Array.from(btnsToggleCourse).forEach(btn => {
        btn.addEventListener('click', function(event) {
          event.preventDefault();

          Array.from(btnsToggleCourse).forEach(btn => {
            btn.disabled = true;
            btn.textContent = 'Loading...';
          });

          fn(course.id);
        });
      });
    }
  },

  render(isMaxCoursesSavedAlready, course, toggleCourseFn) {
    isRenderedDOMElement(this.containerClassName)
      .then((container) => {
        this.destroy();

        const composedDOM = this._compose(isMaxCoursesSavedAlready, course);
        container.insertAdjacentHTML('afterbegin', composedDOM);

        this._setListeners(toggleCourseFn, course);
      });
  },

  _compose(isMaxCoursesSavedAlready, course) {
    const isCourseExisted = course.lessons && course.lessons.length ? true : false;

    let elDOM = `
      <div class="${this.wrapperClassName}">`;

    if(isMaxCoursesSavedAlready) {
      elDOM += `
        <p>YoutubeTutor says: You are have max courses already</p>`;

      if(isCourseExisted) {
        elDOM += `
          <button class='${this.btnToggleCourseClassName} ytt-button'>
            Remove the course from YoutubeTutor
          </button>
        `;
      }
    } else {
      if(!isCourseExisted) {
        elDOM += `
          <button class="${this.btnToggleCourseClassName} ytt-button style-scope" data-db="local">
            Save as a course to the YoutubeTutor
          </button>
        `;
      } else {
        elDOM += `
          <button class='${this.btnToggleCourseClassName} ytt-button'>
            Remove the course from YoutubeTutor
          </button>
        `;
      }
    }

    elDOM += `
      </div>`;

    return elDOM;
  }
};

export default Playlist;