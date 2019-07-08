/**
 * All possible pages 
 * for YouTubeTutor usage
 */
export const PAGES = {
  home: '/',
  course: '/playlist',
  lesson: '/watch'
};

export const CONFIG = {
  version: '3.0.0',
  recommendCoursesUrl: 'https://raw.githubusercontent.com/dimaspirit/YoutubeTutor/master/playlists.json',
  maxActiveCourses: 4
};

export const DB_TYPES = {
  sync: 'sync',
  local: 'local'
};

export const COURSE_TYPES = {
  default: 1,
  recommended: 2
};

export const COURSE_STATES = {
  default: 1,
  active: 2,
  passed: 3
};

export const YouTubeCONFIG = {
  urls: {
    playlists: 'https://www.googleapis.com/youtube/v3/playlists',
    playlistItems: 'https://www.googleapis.com/youtube/v3/playlistItems'
  }
}

export const ERRORS = {
  cannotStartWithoutInitLoad: `YouTubeTutor: Can't starting the app`,
  ytCannotLoadPlaylists: `YouTubeTutor: Can't find / load playlist`,
  ytPrivatePlaylist: 'YouTubeTutor: Requested playlist is private'
}