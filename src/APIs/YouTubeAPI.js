import { YouTubeCONFIG } from './../config';

const YouTubeAPI = {
  /**
   * Return snippet part of playlist information
   * @param {Array} ids - Array of string of id playlist
   */
  getPlaylistInfo(ids) {
    return new Promise((resolve, reject) => {
      console.log('getPlaylistInfo', ids);
      const url = YouTubeCONFIG.urls.playlists;
      const params = new URLSearchParams();
      params.append('id', ids.toString());
      params.append('part', 'snippet,status');
      params.append('maxResults', '50');
      params.append('key', process.env.YOUTUBE_API_SECRET);
  
      fetch(`${url}?${params.toString()}`)
        .then(responce => responce.json())
        .then(responceParsed => {
          let playlists = responceParsed.items.map(playlist => {
            if(playlist.status.privacyStatus === 'public') {
              const plInfo = Object.assign({}, playlist.snippet, {id: playlist.id});

              return plInfo;
            }
          });

          resolve(playlists);
        }).catch(err => reject(err));
    });
  },
  getPlaylistItemsInfo(id) {
    console.log('getPlaylistItemsInfo', id);
    return new Promise((resolve, reject) => {
      const url = YouTubeCONFIG.urls.playlistItems;
      const params = new URLSearchParams();
  
      params.append('playlistId', id);
      params.append('part', 'snippet,contentDetails,status');
      params.append('maxResults', '50');
      params.append('key', process.env.YOUTUBE_API_SECRET);

  
      fetch(`${url}?${params.toString()}`)
        .then(res =>  res.json())
        .then(json => resolve(json.items))
        .catch(err => reject(err)); 
      });
    }
  };
  
  export default YouTubeAPI;