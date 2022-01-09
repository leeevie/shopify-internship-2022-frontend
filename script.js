function getImages() {
    // get elements
    var card_cols = document.getElementById("display");
    
    // arguments
    var nasa_id = 'TrRfMk9Yfvvv1G1Ngwx5U9hwH7GtX6loEPf0aqsR';
    var count = 20;

    // build url
    var url = `https://api.nasa.gov/planetary/apod?api_key=${nasa_id}&count=${count}`;
    console.log(url);

    $.ajax({url:url, dataType:"json"}).then(function(data) {
        console.log(data)
            var cards = '';
            for (var i = 0; i < data.length; i++) {
                var image = data[i];
                cards += '<div class="card">';
                cards += '<img class="card-img-top" src=' + image.hdurl + ' alt="Image not found"><div class="card-body">';
                cards += '<h4 class="card-title">' + image.title + '</h4><h6 class="text-muted">' + image.date;
                cards += '</h6><p>' + image.explanation.slice(0, 101);
                cards += '...</p><button type="button" class="btn btn-like shadow-none unliked"';
                cards += 'data-toggle="button" aria-pressed="false" autocomplete="off">';
                cards += '<i class="bi bi-suit-heart-fill"></i></button></div></div>';
            }
            // add cards to html
            card_cols.innerHTML = cards;
        })
        .catch(function(err) {
            // error message
            console.log(err);
        })
    
}

window.onload = getImages;

$(document).on('click', '.btn-like', function () {
    $(this).toggleClass("unliked liked");
});

