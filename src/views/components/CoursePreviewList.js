import CoursePreview from './CoursePreview';
import EmptyState from './../components/EmptyState';

const CoursePreviewList = {
  compose({title, annotation, action}, courses) {
    let elDOM = `
      <div class="ytt-home__section">
        <div class='ytt-home__header'>
          <h1 class='ytt-home__title'>YoutubeTutor / ${title}
            <span class="ytt-home__annotation">${annotation}</span>
          </h1>
    `;

    if(action) {
      elDOM += `
          <div class="ytt-home__action">
            <button class="${action.className} ytt-link ytt-link-primary">${action.content}</button> 
          </div>
      `;
    }

    elDOM += `
        </div>
      <div class="ytt-home__content">
    `;

    if(courses.length) {
      courses.forEach(course => {
        elDOM += CoursePreview.compose(course);
      });
    } else {
      elDOM += EmptyState.compose();
    }

    elDOM += `
        </div>
      </div>
    `;

    return elDOM;
  }
}

export default CoursePreviewList;