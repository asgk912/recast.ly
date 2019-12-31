import YOUTUBE_API_KEY from '../config/youtube.js';

var searchYouTube = (options, callback) => {
  var server = 'https://www.googleapis.com/youtube/v3/search';
  var {query, max, key} = options;


  $.ajax({
    url: server,
    type: 'GET',
    data: {'part': 'snippet', 'type': 'video', 'maxResults': max, 'q': query, 'key': key},
    success: (data) => callback(data.items),
    dataType: 'json'
  });
};


export default searchYouTube;
