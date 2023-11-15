"use strict";
/**
 * Allow the user to search for a GIF and when the form is submitted,
 * make an AJAX request to the Giphy API and return a single GIF
 *
Once the Giphy API has responded with data, append the GIF to the page

Allow the user to search for as many GIFs as they would like
and keep appending them to the page

Allow the user to remove all of the GIFs by clicking a button

Here is an example of what the application might look like:
 */

console.log("Let's get this party started!");

// use fetch to make request to giphy
// http://api.giphy.com/v1/gifs/search
// ?q=hilarious&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym
// console log the response data
const $form = $('form');
$form.on('submit',handleForm);

/** Makes the fetch request, appends form input and giphy api key */
async function makeRequest(){
  const giphyUrl = 'http://api.giphy.com/v1/gifs/search?'
  const input = $('input').val();
  const params = new URLSearchParams(
    {
      q:input,
      api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'
    });

    // http://api.giphy.com/v1/gifs/search?
    // q=hilarious&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym

  const request = await fetch(giphyUrl+params);
  const responseObj = await request.json();
  console.log('fetch response: ',responseObj);
  return responseObj;
}

/** Renders a gif onto browser from response object */
function getGifLink(responseObj) {
  console.log('mkRequestResponseObj:', responseObj);
  const responseData = responseObj.data;
  console.log('responseData: ', responseData);
  const responseDataUrl = responseData[0].url;
  console.log('responseDataUrl: ', responseDataUrl);
  return responseDataUrl;
}

function renderGif(link) {
  console.log('datatypeLink: ', typeof link);
  const funThings = document.getElementById('fun-things');
  const $gif = $(`<img src=${link}>`).appendTo(funThings);
}

/** Calls async function to make fetch request */
async function handleForm(evt){
  evt.preventDefault();
  const gifLink = getGifLink(await makeRequest());
  renderGif(gifLink);
}