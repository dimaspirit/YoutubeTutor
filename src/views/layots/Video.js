import { isRenderedDOMElement } from './../ViewHelpers';

const Video = {
  containerClassName: 'ytd-video-primary-info-renderer.ytd-watch-flexy',
  wrapperClassName: 'ytt-lesson',

  btnToggleLessonClassName: 'ytt-change-state',

  destroy() {
    const elms = document.querySelectorAll(`.${this.wrapperClassName}`);

    if(elms.length) {
      [].forEach.call(elms, function(el) {
        el.remove();
      });
    }
  },

  _setListeners(lesson, fn) {
    const btnToggleLesson = document.querySelector(`.${this.btnToggleLessonClassName}`);

    if(btnToggleLesson) {
      btnToggleLesson.addEventListener('click', (e) => {
        e.preventDefault();

        btnToggleLesson.disabled = true;
        btnToggleLesson.textContent = 'Loading...';

        const params = {
          id: lesson.id,
          courseId: lesson.parentId,
          state: lesson.progress.state === 0 ? 1 : 0
        };

        fn(params);
      });
    }

  },

  render(lesson, toggleLessonFn) {
    isRenderedDOMElement(this.containerClassName)
      .then((container) => {
        this.destroy();

        const composedDOM = this.compose(lesson);
        container.insertAdjacentHTML('afterbegin', composedDOM);

        this._setListeners(lesson, toggleLessonFn);
      });
  },

  compose(lesson) {
    let elDOM = `<div class="${this.wrapperClassName}">`;

    if(lesson.progress.state === 0) {
      elDOM += `
        <button class="ytt-button ${this.btnToggleLessonClassName}">
          Mark as passed
        </button>`;
    } else {
      elDOM += `
        <button class="ytt-button ${this.btnToggleLessonClassName}">
          Mark as NOT passed
        </button>`;
    }

    elDOM += `</div>`;

    return elDOM;
  }
};

export default Video;