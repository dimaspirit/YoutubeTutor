import { isRenderedDOMElement } from './../ViewHelpers';

const VideoCourseAction = {
  containerClassName: '#playlist-actions',
  wrapperClassName: 'ytt-action_playlist_lesson',

  btnToggleCourseClassName: 'j-ytt-toggle_course',

  destroy() {
    const elms = document.querySelectorAll(`.${this.wrapperClassName}`);

    if(elms.length) {
      [].forEach.call(elms, function(el) {
        el.remove();
      });
    }
  },

  render(id, handleFn) {
    isRenderedDOMElement(this.containerClassName)
      .then((container) => {
        this.destroy();

        const composedDOM = this.compose();
        container.insertAdjacentHTML('afterbegin', composedDOM);

        const btnAddCourse = document.querySelector(`.${this.btnToggleCourseClassName}`);

        if(btnAddCourse) {
          btnAddCourse.addEventListener('click', (e) => {
            e.preventDefault();

            btnAddCourse.disabled = true;
            btnAddCourse.textContent = 'Loading';
            
            handleFn(id);
          });
        }
      });
  },

  compose() {
    return `
      <div class=${this.wrapperClassName}>
        <button class="ytt-button ${this.btnToggleCourseClassName}">
          Add to YouTubeTutor
        </button>
      </div>
    `;
  }
};

export default VideoCourseAction;