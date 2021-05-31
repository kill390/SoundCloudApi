

var UI = {}

UI.enterClick = function () {
    var searchBar = document.querySelector(".js-search");

    searchBar.addEventListener("keyup", function (e) {
        if (e.key === "Enter") {
            var searchDiv = document.querySelector(".search-results");
            searchDiv.innerHTML = "";

            var value = searchBar.value;
            console.log(value);
            SoundCloudAPI.getTrack(value);

        }
    });
}


UI.submit = function () {
    var searchBar = document.querySelector(".js-search");
    var submit = document.querySelector(".js-submit");

    submit.addEventListener("click", function () {

        var searchDiv = document.querySelector(".search-results");
        searchDiv.innerHTML = "";

        var value = searchBar.value;
        console.log(value);
        SoundCloudAPI.getTrack(value);

    });
}

UI.enterClick();
UI.submit();


var SoundCloudAPI = {};


SoundCloudAPI.init = function () {
    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
    });
}

SoundCloudAPI.init();

SoundCloudAPI.getTrack = function (input) {
    SC.get('/tracks', {
        q: input
    }).then(function (tracks) {
        console.log(tracks);

        tracks.forEach(function (track) {
            SoundCloudAPI.renderCards(track.artwork_url || "https://picsum.photos/290/290", track.permalink_url, track.title);
        });
    });
}


SoundCloudAPI.renderCards = function (imgsrc, link, header) {

    var searchDiv = document.querySelector(".search-results");
    var card = document.createElement("div");
    card.setAttribute("class", "card");
    searchDiv.appendChild(card);

    var imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "image");
    card.appendChild(imgDiv);

    var img = document.createElement("img");
    img.setAttribute("class", "image_img");
    img.setAttribute("src", imgsrc);
    imgDiv.appendChild(img);

    var contentDiv = document.createElement("div");
    contentDiv.setAttribute("class", "content");
    card.appendChild(contentDiv);

    var headerDiv = document.createElement("div");
    headerDiv.setAttribute("class", "header");
    contentDiv.appendChild(headerDiv);

    var textLink = document.createElement("a");
    textLink.setAttribute("href", link);
    textLink.setAttribute("target", "_blank");
    textLink.innerHTML = header;
    headerDiv.appendChild(textLink);

    var buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("class", "ui bottom attached button js-button");
    card.appendChild(buttonDiv);

    buttonDiv.addEventListener('click', function () {
        SoundCloudAPI.addToPlayList(link);

    });

    var i = document.createElement("i");
    i.setAttribute("class", "add icon");
    var span = document.createElement("span");
    span.innerHTML = "Add to playlist";

    buttonDiv.appendChild(i);
    buttonDiv.appendChild(span);

}

SoundCloudAPI.addToPlayList = function (link) {

    console.log('clicked');
    var context = new AudioContext();
    // Setup all nodes


    context.resume().then(() => {
        console.log('Playback resumed successfully');
    });


    SC.oEmbed(link, {
        auto_play: true
    }).then(function (embed) {

        var playList = document.querySelector(".inner");

        box = document.createElement('div');
        box.innerHTML = embed.html;

        playList.insertBefore(box, playList.firstChild);

        localStorage.setItem("key", playList.innerHTML);
        
    });

}

var playList = document.querySelector(".inner");
playList.innerHTML = localStorage.getItem("key");

var clearButton = document.querySelector(".button");
clearButton.addEventListener('click', function () {
    localStorage.clear();
    playList.innerHTML = localStorage.getItem("key");
});