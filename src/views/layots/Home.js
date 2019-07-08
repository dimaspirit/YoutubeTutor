import { isRenderedDOMElement } from './../ViewHelpers';
import CoursePreviewList from '../components/CoursePreviewList';

const Home = {
  containerClassName: `ytd-browse.ytd-page-manager[page-subtype='home']`,
  wrapperClassName: 'ytt-home',

  btnMakeSync: 'j-ytt-sync',
  ui: {
    btnSwitchOff: 'j-ytt-switch_off'
  },

  destroy() {
    const elms = document.querySelectorAll(`.${this.wrapperClassName}`);

    if(elms.length) {
      [].forEach.call(elms, function(el) {
        el.remove();
      });
    }
  },

  render(recommendedCourses, activeCourse, callbacks) {
    isRenderedDOMElement(this.containerClassName)
      .then((container) => {
        this.destroy();

        const composedDOM = this.compose(recommendedCourses, activeCourse);
        container.insertAdjacentHTML('afterbegin', composedDOM);

        container.addEventListener('click', (e) => {
          const el = e.target;

          if(el.classList.contains(this.ui.btnSwitchOff)) {
            e.preventDefault();

            callbacks.switchoff();
          }

          // if(el.classList.contains(this.btnMakeSync) && el.dataset.id) {
          //   handleSync(el.dataset.id);
          // }
        })
      });
  },

  compose(recommendedCourses, activeCourses) {
    const self = this;

    let elDOM = `
      <div class="${this.wrapperClassName}">`
    
    elDOM += CoursePreviewList.compose({
      title: 'In progress courses',
      annotation: 'These are the courses that you are learning now, max 4 active courses',
      action: {
        className: self.ui.btnSwitchOff,
        content: 'Want just serf on YouTube?'
      }
    }, activeCourses);

    elDOM += CoursePreviewList.compose({
      title: 'Recommended courses',
      annotation: 'List of quality-tested and recommended courses by a large number of users'
    }, recommendedCourses);

    elDOM += `
      </div>`;

    return elDOM;
  }
}

export default Home;
