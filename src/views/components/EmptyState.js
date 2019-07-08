const EmptyState = {
  compose() {
    return `
      <div class="ytt-empty_state">
        <h4 class="ytt-empty_state__title">There is no course to learn :(</h4>

        <p>
          Check out 
          <a class="ytt-link" 
            href="http://dimaspirit.gitlab.io/YoutubeTutor"
            target="_blank"
            title="http://dimaspirit.gitlab.io/YoutubeTutor">
          YoutubeTutor site</a> to get more information about this Chrome extension.
        </p>

        <p>
          To start using just go to a 
          <a class="ytt-link"
            href="/playlist?list=PL0zVEGEvSaeF_zoW9o66wa_UCNE3a7BEr"
            title="Unit testing in Javascript by Fun Fun Function">
          playlist page</a> and add to YoutubeTutor as a course
          by clicking the button 'Add as a course to YoutubeTutor'.
      </div>
    `;
  }
};

export default EmptyState;