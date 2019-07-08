/**
 * Check out and return el when it will be render
 * @param {string} query - string containing CSS selector
 * 
 * @example
 * const mountElClassName = '.mountEl';
 * 
 * isRenderedDOMElement(mountElClassName).then((el) => {
 *  el.append('Your included html');
 * }).catch(() => {
 *  throw new Error('Element not found');
 * });
 */
function isRenderedDOMElement(query) {
  return new Promise( (resolve, reject) => {
    const timeToWaiting = 10; // sec
    let counter = 0;

    let timerId = setInterval(() => {
        let el = document.querySelector(query);

        if(el) {
            clearInterval(timerId);
            resolve(el);
        } else if(counter > timeToWaiting) {
            clearInterval(timerId);
            reject();
        } else {
            ++counter;
        }
    }, 1000);
  });
};

export { isRenderedDOMElement };