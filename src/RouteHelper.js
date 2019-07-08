import { PAGES } from './config';

/**
 * Return route (URL)
 * and specific data from URL for each page.
 * 
 * Index page: returns only pathname;
 * Playlist page: returns pathname, data.playlistId - id of playlist;
 * Watch page: returns pathname, data.id - id of playlist;
 * 
 * @returns {object} route
 * @returns {string} route.pathname
 * @returns {object} route.data - specific data which parsing from URL
 * @returns {string} [route.data.playlistId]
 * @returns {string} [route.data.id] - id of video
 */
export default function getRouteFromURL() {
  const route = {
    data: {},
    pathname: window.location.pathname
  };

  let params = (new URL(window.location)).searchParams;
  const data = {};

  switch(route.pathname) {
    case PAGES.lesson:
      data.id = params.get('v');
      data.playlistId = params.get('list');
  
      break;

    case PAGES.course:
      data.playlistId = params.get('list');

      break;
  }

  Object.assign(route.data, data);

  return route;
};