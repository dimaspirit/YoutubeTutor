import CourseList from './CourseList';

class CourseListRecommended extends CourseList {
  constructor(list) {
    super(list);
  }

  _request(action) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ action }, (response) => {
        const lastError = chrome.runtime.lastError;

        if (lastError) {
          reject(lastError.message);
          return;
        }

        resolve(response);
      });
    });
  }

  handleGet() {
    return new Promise((resolve, reject) => {
      this._request('getCoursesMy')
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  /**
   * The default set of recommended courses
   * from the Github
   */
  fetch() {
    return new Promise((resolve, reject) => {
      this.handleGet()
      .then((list) => {
        this.items = list.items;
        return this.extendsByYTData();
      })
      .then(() => {
        resolve(this.items);
      })
      .catch(error => {
        reject(error);
      });
    });
  }
}

export default CourseListRecommended;