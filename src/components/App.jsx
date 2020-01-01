import exampleVideoData from '../data/exampleVideoData.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import Search from './Search.js';
import YOUTUBE_API_KEY from '../config/youtube.js';



// var App = () => (
//   <div>
//     <nav className="navbar">
//       <div className="col-md-6 offset-md-3">
//         <div><h5><em>search</em> view goes here</h5></div>
//       </div>
//     </nav>
//     <div className="row">
//       <div className="col-md-7">
//         <VideoPlayer video={exampleVideoData[0]}/>
//       </div>
//       <div className="col-md-5">
//         <VideoList videos={exampleVideoData}/>
//       </div>
//     </div>
//   </div>
// );

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoList: [],
      videoPlayer: {id: {videoId: ''}, snippet: {}},
    };
  }

  componentDidMount() {

    this.liveSearchOnChange('Javascript');

    /* old live-search methods: it did not use event handler and was not passed down to <Search />

    // intial option for youtub serach
    var options = {key: YOUTUBE_API_KEY, query: 'react', max: 5};

    // callback function that is passed to searchYouTube
    var cbSetState = function(data) {
      this.setState({
        videoList: data,
        videoPlayer: data[0]
      });
    };

    // binding this to App
    var bindedCBSetState = cbSetState.bind(this);
    var bindedSearchYouTube = this.props.searchYouTube.bind(this);

    // initial video load
    bindedSearchYouTube(options, bindedCBSetState);

    // check input every 1 second and render page accordingly
    setInterval(() => {
      var searchWord = document.getElementsByClassName('form-control')[0].value;
      if (options.query !== undefined && options.query !== searchWord) {
        options.query = searchWord;
        bindedSearchYouTube(options, bindedCBSetState);
      }
    }, 500);
    */
  }

  // even handler for clicking title of video on list
  playOnClick(video) {
    this.setState({
      videoPlayer: video
    });
  }

  /* old click event handler: event was handeled within <App /> not within <VideoListEntry />
  playOnClick(event) {
    if (event.target.className === 'video-list-entry-title') {

      for (var i = 0; i < this.state.videoList.length; i++) {

        if (event.target.innerText === this.state.videoList[i].snippet.title) {
          this.setState({
            videoPlayer: this.state.videoList[i]
          });
          break;
        }
      }
    }
  }
  */

  // even handler for typing words in search engine
  liveSearchOnChange(query) {
    var options = {'key': YOUTUBE_API_KEY, 'query': query, 'max': 5};

    this.props.searchYouTube(options, (data) =>
      this.setState({
        videoList: data,
        videoPlayer: data[0]
      })
    );
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search liveSearchOnChange={this.liveSearchOnChange.bind(this)}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.videoPlayer}/>
          </div>
          {/* <div className="col-md-5" onClick={this.playOnClick.bind(this)} > */}
          <div className="col-md-5">
            <VideoList videos={this.state.videoList} playOnClick={this.playOnClick.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;