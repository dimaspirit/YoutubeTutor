import { CONFIG } from './config';
import GitHubAPI from './APIs/GitHubAPI';
import YouTubeAPI from './APIs/YouTubeAPI';

class App {
  constructor() {
    // Set listener for URL changing
    chrome.webNavigation.onHistoryStateUpdated.addListener(this.onNavigate.bind(this));

    const landingURL = 'https://dimaspirit.github.io/YoutubeTutor';

    chrome.runtime.onInstalled.addListener(function(details) {
      if(details.reason === 'install') {
        chrome.tabs.create({'url': `${landingURL}/iamhappy`});
      } else if(details.reason === 'update') {
        chrome.tabs.create({ 'url': 'https://www.producthunt.com/posts/youtubetutor' });
      }
    });

    chrome.runtime.setUninstallURL(`${landingURL}/iamsad`);

    chrome.runtime.onMessage.addListener(this.onMessage.bind(this));
  }

  sendMessage(message) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  }

  onNavigate() {
    this.sendMessage({'action': 'route'});
  }

  onMessage(request, sender, sendResponse) {
    console.log('YouTubeTutor: Incoming message', JSON.stringify(request));

    if(request.action === 'getCoursesMy') {
      GitHubAPI.getFile(CONFIG.recommendCoursesUrl)
        .then((courses) => sendResponse(courses));
    }

    if(request.action === 'getPlaylistInfo') {
      YouTubeAPI.getPlaylistInfo(request.ids)
        .then((playlists) => {
          console.log('getPlaylistInfo res', playlists);
          sendResponse(playlists)
        });
    }

    if(request.action === 'getPlaylistItemsInfo') {
      YouTubeAPI.getPlaylistItemsInfo(request.id)
        .then((responce) => {
          console.log('getPlaylistItemsInfo res', responce);
          sendResponse(responce)
        });
    }

    // Needed to make SendResponce async
    return true;
  }
}

const app = new App();