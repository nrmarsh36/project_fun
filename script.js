


// //OMDb API
// var queryURL = "https://www.omdbapi.com/?t=&apikey=trilogy";


// <body>
//     <h5>Type your favorite movie:</h5>
//     <input id="movieIn" type="text">
//     <button id="movieBtn">Search</button>
//     <h5>Type your favorite tv show:</h5>
//     <input id="tvIn" type="text">
//     <button id="tvBtn">Search</button>
//     <h5>Type your favorite game:</h5>
//     <input id="gameIn" type="text">
//     <button id="gameBtn">Search</button>
//     <h5>Type your favorite band:</h5>
//     <input id="musicIn" type="text">
//     <button id="musicBtn">Search</button>
//     <h5>Type the main ingredient:</h5>
//     <input id="foodIn" type="text">
//     <button id="foodBtn">Search</button>
//     <br><br>
//     <button id="renderBtn">Show Date</button>
//     <div class="results"></div>
//     <div class="date">
//         <div class="movie"></div>
//         <div class="show"></div>
//         <div class="game"></div>
//         <div class="music"></div>
//         <div class="food"></div>
//     </div>
//     <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
//     <script type="text/javascript">
// $(document).ready(function(){
//     // api list https://apilist.fun/
//     // for dealing with CORS issues https://gist.github.com/jesperorb/6ca596217c8dfba237744966c2b5ab1e
//     // https://cors-anywhere.herokuapp.com/
//     // for tastedive
//     // https://tastedive.com/read/api
//     // var type = "&type=movie";
//     // var limit = "&limit=5";
//     // var id = "&k=375713-Dinneran-ZVGUOS8M";
//     // var queryURL = "https://tastedive.com/api/similar?info=1&q="+searchTerm+id+limit;
//     // for spoonacular
//     // https://spoonacular.com/food-api/docs
//     // var queryURL = "https://api.spoonacular.com/recipes/search?query=salmon&number=2&apiKey="+"0eced41247c74c369f750e7b1ea46a47";
//     // storage arrays
//     var tResults = [];
//     var date = [];
//     var dates = [];
//     // element variables
//     var divResults = $('.results');
//     var divMovies = $('.movie');
//     var divShows = $('.show');
//     var divGames = $('.game');
//     var divMusic = $('.music');
//     var divFood = $('.food');
//     // clear entries
//     function clearEntries() {
//         divResults.empty();
//         divMovies.empty();
//         divShows.empty();
//         divGames.empty();
//         divMusic.empty();
//         divFood.empty();
//     }
//     // renderBtn action listener
//     $('#renderBtn').on("click",function() {
//         renderDate("",date);
//     });
//     // render date
//     function renderDate(dateName,choices) {
//         clearEntries();
//         var movies = false;
//         var shows= false;
//         var games = false;
//         var music = false;
//         var food = false;
//         for (var i = 0; i < choices.length; i++) {
//             var appendTo = $('.'+choices[i][1]);
//             var value = choices[i][1]+" "+i+" "+choices[i][0];
//             if (choices[i][1] === "food") {
//                 var newResult = $('<div id="'+i+'"><h3><a href="'+ choices[i][2].sourceUrl +'" target="_blank">'+choices[i][2].title+'</a></h3><img height="160" width="auto" alt="Recipe Image" src="https://spoonacular.com/recipeImages/'+ choices[i][2].image+'"/><p>Time in Minutes: '+ choices[i][2].readyInMinutes +'</p><p>Servings: '+ choices[i][2].servings +'</p><button class="toss" value="'+ value +'">Toss</button><br></div>');
//             } else {
//                 var newResult = $('<div id="'+i+'"><h3>'+ choices[i][2].Name +'</h3><br><iframe height="160" width="auto" allowfullscreen src="https://www.youtube.com/embed/'+ choices[i][2].yID +'"></iframe><p>'+ choices[i][2].wTeaser +'</p><a href="'+ choices[i][2].wUrl +'" target="_blank">'+ choices[i][2].wUrl +'</a><br><button class="toss" value="'+ value +'">Toss</button><br><br></div>');
//             }
//             appendTo.append(newResult);
//             if (choices[i][1] === "movie") {
//                 if (movies === false) {
//                     movies = true;
//                     var newCat = $('<h2>Movie Choices:</h2>');
//                     appendTo.prepend(newCat);
//                 } 
//             } else if (choices[i][1] === "show") {
//                 if (shows === false) {
//                     shows = true;
//                     var newCat = $('<h2>TV Show Choices:</h2>');
//                     appendTo.prepend(newCat);
//                 }
//             } else if (choices[i][1] === "game") {
//                 if (games === false) {
//                     games = true;
//                     var newCat = $('<h2>Video Game Choices:</h2>');
//                     appendTo.prepend(newCat);
//                 }
//             } else if (choices[i][1] === "music") {
//                 if (music === false) {
//                     music = true;
//                     var newCat = $('<h2>Music Choices:</h2>');
//                     appendTo.prepend(newCat);
//                 }
//             } else if (choices[i][1] === "food") {
//                 if (food === false) {
//                     food = true;
//                     var newCat = $('<h2>Recipe Choices:</h2>');
//                     appendTo.prepend(newCat);
//                 }
//             }
//             $('.toss').on("click",function(){
//                 deleteChoice($(this).val());
//             });
//         }
//     }
//     // save choice
//     function saveChoice(keyStr) {
//         var keyArr = keyStr.split(' ');
//         // split value between type and id
//         // check to see if already saved
//         var found = false;
//         for (var i = 0; i < date.length; i++) {
//             if (keyArr[2] === date[i][0]) {
//                 found = true;
//             }
//         }
//         // push the value that matches the id onto the date array
//         if (found === false) {
//             date.push([keyArr[2],keyArr[0],tResults[keyArr[1]]]);
//         }
//     }
//     // remove choice
//     function deleteChoice(keyStr) {
//         var keyArr = keyStr.split(' ');
//         // split value between type and id
//         // check to see if already saved
//         for (var i = 0; i < date.length; i++) {
//             if (keyArr[2] === date[i][0]) {
//                 date.splice(i,1);
//             }
//         }
//         $('#'+keyArr[1]).remove();
//     }
//     // call tastedive api
//     function callTasteAPI(q) {
//         $.ajax({
//             url: q,
//             method: "GET"
//             ,dataType: 'jsonp'
//         }).then(function(response) {
//             if (response.Similar.Results.length > 0) {
//                 var cat = response.Similar.Results[0].Type;
//                 tResults = response.Similar.Results;
//                 for (var i = 0; i < response.Similar.Results.length; i++) {
//                     var value = cat+" "+i+" "+response.Similar.Results[i].yID;
//                     var newResult = $('<div id="'+i+'"><h3>'+ response.Similar.Results[i].Name +'</h3><br><iframe height="160" width="auto" allowfullscreen src="https://www.youtube.com/embed/'+ response.Similar.Results[i].yID +'"></iframe><p>'+ response.Similar.Results[i].wTeaser +'</p><a href="'+ response.Similar.Results[i].wUrl +'" target="_blank">'+ response.Similar.Results[i].wUrl +'</a><br><button class="keep" value="'+ value +'">Keep</button><button class="toss" value="'+ value +'">Toss</button><br><br></div>');
//                     divResults.append(newResult);
//                 }
//                 $('.keep').on("click",function(){
//                     saveChoice($(this).val());
//                 });
//                 $('.toss').on("click",function(){
//                     deleteChoice($(this).val());
//                 });
//             } else {
//                 var newCat =  $('<p>No Results.  Please Try another search.</p>');
//                 divResults.append(newCat);
//             }
//         }).catch(function (error) {
//             console.log(error);
//         });
//     }
//     $("#movieBtn").on("click", function() {
//         var searchTerm = $('#movieIn').val();
//         var type = "&type=movies";
//         var limit = "&limit=5";
//         var id = "&k=375713-Dinneran-ZVGUOS8M";
//         var queryURL = "https://tastedive.com/api/similar?info=1&q="+searchTerm+id+limit+type;
//         clearEntries();
//         var newCat =  $('<h2>Movies Suggestions:</h2>');
//         divResults.append(newCat);
//         callTasteAPI(queryURL);
//     });
//     $("#tvBtn").on("click", function() {
//         var searchTerm = $('#tvIn').val();
//         var type = "&type=shows";
//         var limit = "&limit=5";
//         var id = "&k=375713-Dinneran-ZVGUOS8M";
//         var queryURL = "https://tastedive.com/api/similar?info=1&q="+searchTerm+id+limit+type;
//         clearEntries();
//         var newCat =  $('<h2>TV Show Suggestions:</h2>');
//         divResults.append(newCat);
//         callTasteAPI(queryURL);
//     });
//     $("#gameBtn").on("click", function() {
//         var searchTerm = $('#gameIn').val();
//         var type = "&type=games";
//         var limit = "&limit=5";
//         var id = "&k=375713-Dinneran-ZVGUOS8M";
//         var queryURL = "https://tastedive.com/api/similar?info=1&q="+searchTerm+id+limit+type;
//         clearEntries();
//         var newCat =  $('<h2>Video Game Suggestions:</h2>');
//         divResults.append(newCat);
//         callTasteAPI(queryURL);
//     });
//     $("#musicBtn").on("click", function() {
//         var searchTerm = $('#musicIn').val();
//         var type = "&type=music";
//         var limit = "&limit=5";
//         var id = "&k=375713-Dinneran-ZVGUOS8M";
//         var queryURL = "https://tastedive.com/api/similar?info=1&q="+searchTerm+id+limit+type;
//         clearEntries();
//         var newCat =  $('<h2>Band Suggestions:</h2>');
//         divResults.append(newCat);
//         callTasteAPI(queryURL);
//     });
//     $("#foodBtn").on("click", function() {
//         var searchTerm = $('#foodIn').val();
//         var limit = "&number=5";
//         // var id = "&apiKey=0eced41247c74c369f750e7b1ea46a47"; // carson
//         var id = "&apiKey=24e066b21a8f4017bd9754745dbc8f7c"; //adam
//         // var queryURL = "https://cors-anywhere.herokuapp.com/https://api.spoonacular.com/recipes/search?query="+searchTerm+limit+id;
//         var queryURL = "https://api.spoonacular.com/recipes/search?query="+searchTerm+limit+id;
//         clearEntries();
//         var newCat =  $('<h2>Recipe Suggestions:</h2>');
//         divResults.append(newCat);
//         $.ajax({
//             url: queryURL,
//             method: "GET"
//             // ,dataType: 'jsonp'
//         }).then(function(response) {
//             if (response.results.length > 0) {
//                 tResults = response.results;
//                 var cat = "food";
//                 for (var i = 0; i < response.results.length; i++) {
//                     var value = cat+" "+i+" "+response.results[i].sourceUrl;
//                     var newResult = $('<div id="'+i+'"><h3><a href="'+ response.results[i].sourceUrl +'" target="_blank">'+response.results[i].title+'</a></h3><img height="160" width="auto" alt="Recipe Image" src="'+ response.baseUri + response.results[i].image+'"/><p>Time in Minutes: '+ response.results[i].readyInMinutes +'</p><p>Servings: '+ response.results[i].servings +'</p><button class="keep" value="'+ value +'">Keep</button><button class="toss" value="'+ value +'">Toss</button><br></div>');
//                     divResults.append(newResult);
//                 }
//                 $('.keep').on("click",function(){
//                     saveChoice($(this).val());
//                 });
//                 $('.toss').on("click",function(){
//                     deleteChoice($(this).val());
//                 });
//             } else {
//                 var newCat =  $('<p>No Results.  Please Try another search.</p>');
//                 divResults.append(newCat);
//             }
//         }).catch(function (error) {
//             console.log(error);