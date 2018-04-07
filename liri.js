require("dotenv").config();

var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");


var keys = require("./keys.js");

var client = new twitter(keys.twitter);

var spotifyKeys = new spotify(keys.spotify);

var command = process.argv[2];

var identity = "";
for (i = 3; i < process.argv.length; i++) {
  identity += process.argv[i] + "";
}



function myTweets() {
  var params = { screen_name: "dumbmikematheny" } && { count: 20 };

  client.get("statuses/user_timeline", params, function (error, tweets, response) {
    if (!error && response.statusCode === 200) {
      var output = "------------------------\n" +
        "User Tweets:\n" +
        "------------------------\n\n";

      for (var i = 0; i < tweets.length; i++) {
        output += "Created on: " + tweets[i].created_at + "\n" +
          "Tweet content: " + tweets[i].text + "\n" +
          "------------------------\n";
      }
    console.log(output)
    }
  })
};

function spotifySong(song) {
  var searchSng;
  if (song === "") {
      searchSng = "The Sign Ace of Base"
  } else {
    searchSng = song
  };

  spotifyKeys.search({ type: "track", query: searchSng }, function (error, data) {

    var songInfo = data.tracks.items[0];
    var output = "------------------------\n" +
      "Song Information:\n" +
      "------------------------\n\n" +
      "Song Name: " + songInfo.name + "\n" +
      "Artist: " + songInfo.artists[0].name + "\n" +
      "Album: " + songInfo.album.name + "\n" +
      "Preview Here: " + songInfo.preview_url + "\n";

    console.log(output)
  })
};

function movieThis() {
  var movie = process.argv[3];
  var search;
  if (movie === "") {
    search = "Mr. Nobody";
  } else {
    search = movie;
  }

  search = search.split(" ").join("+");

  var movieSearch = "http://www.omdbapi.com/" + search + "&y=&plot=short&apikey=trilogy";

  request(movieSearch, function (error, response, body) {

    var data = data.movie.items[0];

    var output = "------------------------\n" +
      "Movie Information:\n" +
      "------------------------\n\n" +
      "Movie Title: " + data.Title + "\n" +
      "Year Released: " + data.Released + "\n" +
      "IMBD Rating: " + data.imdbRating + "\n" +
      "Rotten Tomatoes Rating: " + data.tomatoRating + "\n" +
      "Country Produced: " + data.Country + "\n" +
      "Language: " + data.Language + "\n" +
      "Plot: " + data.Plot + "\n" +
      "Actors: " + data.Actors + "\n";

    console.log(output)
  })
};
  function doWhatItSays() {

    fs.readFile("./random.txt", "utf8", function (error, data) {

      var commandString = data.split(",");
      var command = commandString[0].trim;
      var param = commandString[1].trim;

      //console.log(command + param);

      switch (command) {
        case "my-tweets":
          myTweets();
          break;

        case "spotify-this-song":
          spotifySong(param);
          break;

        case "movie-this":
          movieThis(param);
          break;
      }

    })
  }

  if (command === "my-tweets") {
    myTweets();
  } else if (command === "spotify-this-song") {
    spotifySong(identity);
  } else if (command === "movie-this") {
    movieThis(identity);
  } else if (command === "do-what-it-says") {
    doWhatItSays();
  }

