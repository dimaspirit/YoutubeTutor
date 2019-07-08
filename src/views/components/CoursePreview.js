const CoursePreview = {
  compose(course) {
    let thumbnailUrl;
    let elClassMod;

    if(course.thumbnails.standard && course.thumbnails.standard.url) {
      thumbnailUrl = course.thumbnails.standard.url;
      elClassMod = 'standart';
    } else if(course.thumbnails.medium && course.thumbnails.medium.url) {
      thumbnailUrl = course.thumbnails.medium.url;
      elClassMod = 'medium';
    } else if(course.thumbnails.default && course.thumbnails.default.url) {
      thumbnailUrl = course.thumbnails.default.url;
      elClassMod = 'default';
    } else {
      thumbnailUrl = 'https://dummyimage.com/600x400/000/9100ff.png&text=No+image';
      elClassMod = 'noone';
    }

    let elDOM = `
      <div class="ytt-course_preview">
        <div class="ytt-course_preview__thumbnail ytt-course_preview__thumbnai--${elClassMod} "
          style="background-image: url(${thumbnailUrl})">
      `;

      if(course.db_type) {
        const isSync = course.db_type === 'sync' ? true : false;

        elDOM += `
          <button data-id="${course.id}" 
            class="ytt-course_preview__db ${isSync ? 'ytt-course_preview__db-sync' : ''} j-ytt-sync" >
          </button>
          `;
      }

    elDOM += `
          <a class="ytt-course_preview__link" 
            href="/playlist?list=${course.id}"
            title="Go to course page"></a>
        </div>

        <div class="ytt-course_preview__details">
          <a class="ytt-course_preview__title"
            href="/playlist?list=${course.id}">
            ${course.title}
          </a> by ${course.channelTitle}
        `;

    if(course.lessons && course.lessons.length) {
      const firstUnpassedLesson = course.lessons.filter(el => el.progress.state === 0)[0];

      if(firstUnpassedLesson) {
        elDOM += `
          <div class="course_preview_actions">
            <a class="ytt-link" 
              href="/watch?v=${firstUnpassedLesson.id}&list=${firstUnpassedLesson.parentId}">Up next lesson</a>
          </div>
        `;
      }
    }

    elDOM += 
     `  </div>
      </div>
    `;

    return elDOM;
  }
};

export default CoursePreview;