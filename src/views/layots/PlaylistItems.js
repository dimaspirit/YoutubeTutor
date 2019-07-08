import { isRenderedDOMElement } from './../ViewHelpers';

const PlaylistItems = {
  containerClassName: '#contents.ytd-playlist-video-list-renderer',
  wrapperClassName: 'ytt-status',

  destroy() {
    const elms = document.querySelectorAll(`.${this.wrapperClassName}`);
    
    if(elms.length) {
      [].forEach.call(elms, function(el) {
        el.remove();
      });
    }
  },

  render(course) {
    isRenderedDOMElement(this.containerClassName)
      .then((container) => {
        this.destroy();

        const lessonsElms = container.querySelectorAll('.ytd-playlist-video-list-renderer');

        course.lessons.forEach(lesson => {
          let elLesson = lessonsElms[lesson.position];
          let elDOM = `<div class="${this.wrapperClassName}">`;

          if(lesson && lesson.progress.state === 1) {
            elDOM += `<img src="https://icongr.am/material/checkbox-marked-circle-outline.svg?color=888888" />`;
          } else {
            elDOM += `<img src="https://icongr.am/material/checkbox-blank-circle-outline.svg?color=888888" />`;
          }

          elDOM += `</div>`;
          elLesson.insertAdjacentHTML('afterbegin', elDOM);
        });
      });
  }
};

export default PlaylistItems;