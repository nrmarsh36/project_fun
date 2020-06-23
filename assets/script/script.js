$(document).ready(function(){
    // API NOTES:
    // api list https://apilist.fun/

    // for dealing with CORS issues https://gist.github.com/jesperorb/6ca596217c8dfba237744966c2b5ab1e
    // https://cors-anywhere.herokuapp.com/

    // for tastedive
    // https://tastedive.com/read/api
    // var type = "&type=movie";
    // var limit = "&limit=5";
    // var id = "&k=375713-Dinneran-ZVGUOS8M";
    // var queryURL = "https://tastedive.com/api/similar?info=1&q="+searchTerm+id+limit;

    // for spoonacular
    // https://spoonacular.com/food-api/docs
    // var queryURL = "https://api.spoonacular.com/recipes/search?query=salmon&number=2&apiKey="+"0eced41247c74c369f750e7b1ea46a47";


    // storage arrays
    // results array
    var tResults = [];
    // current date array
    var date = [];
    // saved dates array
    var dates = [];
    // current date name
    var dateNames = [""];
    // element variables
    var divDate = $('.date');
    var divMovies = $('.movie');
    var divShows = $('.show');
    var divGames = $('.game');
    var divMusic = $('.music');
    var divFood = $('.food');

    // clear entries
    function clearEntries() {
        $('.movieResults').empty();
        $('.showResults').empty();
        $('.gameResults').empty();
        $('.musicResults').empty();
        $('.foodResults').empty();
        divDate.empty();
        divMovies.empty();
        divShows.empty();
        divGames.empty();
        divMusic.empty();
        divFood.empty();
    }

    // initialize app
    function init () {
        if (JSON.parse(localStorage.getItem("dates"))) {
            dates = JSON.parse(localStorage.getItem("dates"));
        }
    }

    // save to local storage
    function saveLocal() {
        localStorage.setItem('dates',JSON.stringify(dates));
    }

    // renderBtn action listener
    $('#renderBtn').on("click",function() {
        if (!dateNames[0]) {
            renderDate("",date);
        } else {
            renderDate(dateNames[0],date);
        }
    });

    // listBtn action listener
    $('#listBtn').on("click",function() {
        clearEntries();
        // list saved dates as buttons
        for (var i = 0; i < dates.length; i++) {
            var newDateBtn = $('<button class="dateBtn" id="'+i+'" value="'+ dates[i][0] +'">'+ dates[i][0] +'</button>');
            divDate.append(newDateBtn);
        }
        // date button action listener to render saved dates
        $('.dateBtn').on("click",function(){
            var nameToRender = $(this).val();
            var idToRender = parseInt(this.id);
            date = JSON.parse(JSON.stringify(dates[idToRender][1]));
            dateNames.splice(0,1,nameToRender);
            renderDate(dateNames[0],date);
        });
    });

    // render date
    function renderDate(dateName,choices) {
        clearEntries();
        var movies = false;
        var shows= false;
        var games = false;
        var music = false;
        var food = false;
        // display date name and save/delete options
        if (dateName === "") {
            var newDate = $('<div><h2 class="headColor" >Enter a Name for the Date: </h2><input id="dateName" type="text"><button class="keep" id="saveDate">Save Date</button><button id="deleteDate">Delete Date</button></div><br>');
        } else {
            var newDate = $('<div><h2 class="headColor" >Plans for Date: '+dateName+'</h2><button class="keep" id="saveDate">Save Changes</button><button id="deleteDate">Delete Date</button><button id="saveNew">Save New Date</button></div><br>');
        }
        divDate.append(newDate);
        // save date action listener
        $('#saveDate').on("click",function() {
            if (dateName === "") {
                var dName = $('#dateName').val();                
            } else {
                var dName = dateName;
            }
            var newDate = JSON.parse(JSON.stringify(date));
            if (dName.length > 0) {
                var found = false;
                var idx = -1;
                // search for name to see if it already exists
                for (var i = 0; i < dates.length; i++) {
                    if (dates[i][0] === dName) {
                        found = true;
                        idx = i;
                    }
                }
                // if the name isn't found then save as a new date
                if (!found) {
                    dateNames.splice(0,1,dName);
                    dates.push([dName,newDate]);
                    saveLocal();
                    renderDate(dName,newDate);
                } else {
                    // if the name already exists ask for another name
                    if (dateName === "") {
                        $('#dateName').val("Already exists.  Please use another name.");
                        $('#dateName').focus();
                        $('#dateName').select();
                    // save changes to an existing date
                    } else {
                        dates[idx][1] = newDate;
                        saveLocal();
                    }
                }
            // ask for a name that isn't blank
            } else {
                $('#dateName').val("Please enter a name.");
                $('#dateName').focus();
                $('#dateName').select();
            }
        });
        // delete date button action listener
        $('#deleteDate').on("click",function() {
            var dName = $('#dateName').val();
            if ($('#dateName').val()) {
                var dName = $('#dateName').val();
            } else {
                var dName = dateNames[0];
            }
            date = [];
            dateNames = [""];
            for (var i = 0; i < dates.length; i++) {
                if (dName === dates[i][0]) {
                    dates.splice(i,1);
                    saveLocal();
                }
            }
            clearEntries();
        });
        // save new date button action listener
        // render date with a prompt to name the date
        $('#saveNew').on("click",function() {
            dateNames = [""];
            clearEntries();
            renderDate("",choices);
        });
        // render current choices for the date
        for (var i = 0; i < choices.length; i++) {
            var appendTo = $('.'+choices[i][1]);
            var value = choices[i][1]+" "+i+" "+choices[i][0];
            // output api data from the choices
            if (choices[i][1] === "food") {
                var newResult = $('<div id="'+i+'"><h3 class="headColor"><a href="'+ choices[i][2].sourceUrl +'" target="_blank">'+choices[i][2].title+'</a></h3><img height="160" width="auto" alt="Recipe Image" src="https://spoonacular.com/recipeImages/'+ choices[i][2].image+'"/><p>Time in Minutes: '+ choices[i][2].readyInMinutes +'</p><p>Servings: '+ choices[i][2].servings +'</p><button class="toss" value="'+ value +'">Toss</button><br></div>');
            } else {
                var newResult = $('<div id="'+i+'"><h3 class="headColor">'+ choices[i][2].Name +'</h3><br><iframe height="160" width="auto" allowfullscreen src="https://www.youtube.com/embed/'+ choices[i][2].yID +'"></iframe><p>'+ choices[i][2].wTeaser +'</p><a href="'+ choices[i][2].wUrl +'" target="_blank">'+ choices[i][2].wUrl +'</a><br><button class="toss" value="'+ value +'">Toss</button><br><br></div>');
            }
            appendTo.append(newResult);
            // conditional display the category choices
            if (choices[i][1] === "movie") {
                if (movies === false) {
                    movies = true;
                    var newCat = $('<h2 class="headColor" >Movie Choices:</h2>');
                    appendTo.prepend(newCat);
                } 
            } else if (choices[i][1] === "show") {
                if (shows === false) {
                    shows = true;
                    var newCat = $('<h2 class="headColor" >TV Show Choices:</h2>');
                    appendTo.prepend(newCat);
                }
            } else if (choices[i][1] === "game") {
                if (games === false) {
                    games = true;
                    var newCat = $('<h2 class="headColor" >Video Game Choices:</h2>');
                    appendTo.prepend(newCat);
                }
            } else if (choices[i][1] === "music") {
                if (music === false) {
                    music = true;
                    var newCat = $('<h2 class="headColor" >Music Choices:</h2>');
                    appendTo.prepend(newCat);
                }
            } else if (choices[i][1] === "food") {
                if (food === false) {
                    food = true;
                    var newCat = $('<h2 class="headColor" >Recipe Choices:</h2>');
                    appendTo.prepend(newCat);
                }
            }
            // toss button action listener
            // remove choice from list
            $('.toss').on("click",function(){
                deleteChoice($(this).val());
                if (dateNames[0].length > 0) {
                    renderDate(dateNames[0],date);
                } else {
                    renderDate("",date);
                }
            });
        }
    }

    // save choice
    function saveChoice(keyStr) {
        var keyArr = keyStr.split(' ');
        // split value between type and id
        // check to see if already saved
        var found = false;
        for (var i = 0; i < date.length; i++) {
            if (keyArr[2] === date[i][0]) {
                found = true;
            }
        }
        // push the value that matches the id onto the date array
        if (found === false) {
            date.push([keyArr[2],keyArr[0],tResults[keyArr[1]]]);
        }
    }
    // remove choice
    function deleteChoice(keyStr) {
        var keyArr = keyStr.split(' ');
        // split value between type and id
        // check to see if already saved
        for (var i = 0; i < date.length; i++) {
            if (keyArr[2] === date[i][0]) {
                date.splice(i,1);
            }
        }
        $('#'+keyArr[1]).remove();
    }
    // call tastedive api
    function callTasteAPI(q,id) {
        $.ajax({
            url: q,
            method: "GET"
            ,dataType: 'jsonp'
        }).then(function(response) {
            // get and display results
            if (response.Similar.Results.length > 0) {
                var cat = response.Similar.Results[0].Type;
                tResults = response.Similar.Results;
                var divResults = $('.'+cat+'Results');
                for (var i = 0; i < response.Similar.Results.length; i++) {
                    var value = cat+" "+i+" "+response.Similar.Results[i].yID;
                    var newResult = $('<div id="'+i+'"><h3 class="headColor">'+ response.Similar.Results[i].Name +'</h3><br><iframe height="160" width="auto" allowfullscreen src="https://www.youtube.com/embed/'+ response.Similar.Results[i].yID +'"></iframe><p>'+ response.Similar.Results[i].wTeaser +'</p><a href="'+ response.Similar.Results[i].wUrl +'" target="_blank">'+ response.Similar.Results[i].wUrl +'</a><br><button class="keep" value="'+ value +'">Keep</button><button class="toss" value="'+ value +'">Toss</button><br><br></div>');
                    divResults.append(newResult);
                }
                // remember choice in date plan
                $('.keep').on("click",function(){
                    saveChoice($(this).val());
                });
                // remove choice from list
                $('.toss').on("click",function(){
                    deleteChoice($(this).val());
                });
            // ask for another search if no results
            } else {
                var newCat =  $('<p>No Results.  Please Try another search.</p>');
                divResults.append(newCat);
            }
        // output error to console
        }).catch(function (error) {
            if (id === "movieBtn") {
                $('#movieIn').val("No Results");
                $('#movieIn').focus();
                $('#movieIn').select();
            } else if (id === "gameBtn") {
                $('#gameIn').val("No Results");
                $('#gameIn').focus();
                $('#gameIn').select();
            } else if (id === "tvBtn") {
                $('#tvIn').val("No Results");
                $('#tvIn').focus();
                $('#tvIn').select();
            } else if (id === "musicBtn") {
                $('#musicIn').val("No Results");
                $('#musicIn').focus();
                $('#musicIn').select();
            }
            console.log(error);
        });
    }
    // movie search button action listener
    $("#movieBtn").on("click", function() {
        var searchTerm = $('#movieIn').val();
        var type = "&type=movies";
        var limit = "&limit=5";
        var id = "&k=375713-Dinneran-ZVGUOS8M";
        var queryURL = "https://tastedive.com/api/similar?info=1&q="+searchTerm+id+limit+type;
        clearEntries();
        callTasteAPI(queryURL,this.id);
    });
    // tv show search button action listener
    $("#tvBtn").on("click", function() {
        var searchTerm = $('#tvIn').val();
        var type = "&type=shows";
        var limit = "&limit=5";
        var id = "&k=375713-Dinneran-ZVGUOS8M";
        var queryURL = "https://tastedive.com/api/similar?info=1&q="+searchTerm+id+limit+type;
        clearEntries();
        callTasteAPI(queryURL,this.id);
    });
    // video game search button action listener
    $("#gameBtn").on("click", function() {
        var searchTerm = $('#gameIn').val();
        var type = "&type=games";
        var limit = "&limit=5";
        var id = "&k=375713-Dinneran-ZVGUOS8M";
        var queryURL = "https://tastedive.com/api/similar?info=1&q="+searchTerm+id+limit+type;
        clearEntries();
        callTasteAPI(queryURL,this.id);
    });
    // music search button action listener
    $("#musicBtn").on("click", function() {
        var searchTerm = $('#musicIn').val();
        var type = "&type=music";
        var limit = "&limit=5";
        var id = "&k=375713-Dinneran-ZVGUOS8M";
        var queryURL = "https://tastedive.com/api/similar?info=1&q="+searchTerm+id+limit+type;
        clearEntries();
        callTasteAPI(queryURL,this.id);
    });
    // recipe search button action listener
    $("#foodBtn").on("click", function() {
        var searchTerm = $('#foodIn').val();
        var limit = "&number=5";
        // var id = "&apiKey=0eced41247c74c369f750e7b1ea46a47"; // carson
        var id = "&apiKey=24e066b21a8f4017bd9754745dbc8f7c"; //adam
        // var queryURL = "https://cors-anywhere.herokuapp.com/https://api.spoonacular.com/recipes/search?query="+searchTerm+limit+id;
        var queryURL = "https://api.spoonacular.com/recipes/search?query="+searchTerm+limit+id;
        clearEntries();
        $.ajax({
            url: queryURL,
            method: "GET"
            // ,dataType: 'jsonp'
        }).then(function(response) {
            // get and display results
            if (response.results.length > 0) {
                tResults = response.results;
                var cat = "food";
                var divResults = $('.'+cat+'Results');
                for (var i = 0; i < response.results.length; i++) {
                    var value = cat+" "+i+" "+response.results[i].sourceUrl;
                    var newResult = $('<div id="'+i+'"><h3 class="headColor"><a href="'+ response.results[i].sourceUrl +'" target="_blank">'+response.results[i].title+'</a></h3><img height="160" width="auto" alt="Recipe Image" src="'+ response.baseUri + response.results[i].image+'"/><p>Time in Minutes: '+ response.results[i].readyInMinutes +'</p><p>Servings: '+ response.results[i].servings +'</p><button class="keep" value="'+ value +'">Keep</button><button class="toss" value="'+ value +'">Toss</button><br></div>');
                    divResults.append(newResult);
                }
                // remember choice in date plan
                $('.keep').on("click",function(){
                    saveChoice($(this).val());
                });
                // remove choice from list
                $('.toss').on("click",function(){
                    deleteChoice($(this).val());
                });
            // ask for another search if no results
            } else {
                var newCat =  $('<p>No Results.  Please Try another search.</p>');
                divResults.append(newCat);
            }
        // output error to console
        }).catch(function (error) {
            console.log(error);
            $('#foodIn').val("No Results");
            $('#foodIn').focus();
            $('#foodIn').select();
        });
    });

    // initialize program, currently just gets local storage
    init();
});