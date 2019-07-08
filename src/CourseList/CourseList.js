/**
 * COURSE schema:
 * {
 *   id: <string>
 *   db_type: <string> - Possible values: `sync` or `local`, ONLY for CourseListActive
 * }
 */

class CourseList {
  constructor(list=[]) {
    this.items = list;
  }

  _copy(inpList) {
    const list = inpList ? inpList : this.items;
  
    return list.map(el => {
      return Object.assign({}, el);
    });
  }

  getData() {
    return this._copy();
  }

  _requestData(ids) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ ids, action: 'getPlaylistInfo' }, (response) => {
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
   * Extends courses with data
   * from Youtube API DATA
   */
  extendsByYTData() {
    const ids = this.items.map(element => element.id);

    return new Promise((resolve, reject) => {
      this._requestData(ids)
        .then(playlists => {
          this.items.forEach(item => {
            var playlistsFounded = playlists.filter(pl => pl.id === item.id);

            if(playlistsFounded.length) {
              Object.assign(item, ...playlistsFounded);
            }
          });

          resolve();
        }).catch(error => reject(error));
    });
  }
}

export default CourseList;