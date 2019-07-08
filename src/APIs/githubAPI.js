 const GitHubAPI = {
  getFile(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(function(response) {
          return response.json();
        }).then(function(fileRaw) {
          resolve(fileRaw);
        }).catch((error) => {
          reject(error);
        });
    });
  }
};

export default GitHubAPI;