/*
Some browsers (including Chrome) will not run XHR requests if you just run the example from a local file.
This is because of security restrictions. Set up a local server to test or use less secure browser (firefox).
*/

const verseChoose = document.querySelector("select");
const poemDisplay = document.querySelector("pre");

verseChoose.onchange = function() {
  let verse = verseChoose.value;
  updateDisplay(verse);
}

function updateDisplay(verse) {
  // convert <option> string to url/filename.
  verse = verse.replace(" ", "");
  verse = verse.toLowerCase();
  let url = `${verse}.txt`;

  /* Option 1 Use XMLHttpRequest - XHR
  (comment out Fetch section below)
  ******************************************** */

  let request = new XMLHttpRequest();
  // Specify what HTTP request method to use to request the resource from the network, and what its URL is.
  request.open("get", url);
  // Set the type of response we are expecting.
  request.responseType = 'text';
  // Wait for load.
  request.onload = function () {
    // Set the <pre> element's text content to the text value.
    poemDisplay.textContent = request.response;
  };
  // Actually send/perform the above request.
  request.send();

  /* END XHR ********************************* */

  /* Option 2 Use Fetch
  (comment out XHR section above)
  ******************************************** */

  //  Fetch the resource located at URL (fetch(url)), and
  //    then run the specified function when the promise resolves (.then(function() { ... })).
  //      "Resolve" means "finish performing the specified operation at some point in the future".
  fetch(url).then(function (response) {
    // This function is automatically given the response from the server as a parameter when the fetch() promise resolves.
    // Inside the function we grab the response and run its text() method, which basically returns the response as raw text.
    // This is the equivalent of request.responseType = 'text' in the XHR version.
    // The text() also returns a promise, so we chain another .then() onto it, inside of which we define a function to
    // receive the raw text that the text() promise resolves to.
    response.text().then(function(text) {
      // Set the <pre> element's text content to the text value.
      poemDisplay.textContent = text;
    });
  });

  /* END Fetch ********************************* */

}

// load verse 1 by default, and make sure the <select> element always shows the correct value
updateDisplay('Verse 1');
verseChoose.value = 'Verse 1';