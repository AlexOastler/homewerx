$.ajax("https://api.github.com/legacy/repos/search/javascript").done(function(data) {
     var i, repo;
     $.each(data.repositories, function (i, repo) {
        $("#allRepos").append("<p><a href='https://github.com/" + repo.username + "/" + repo.name + "'>" + repo.name + "</a><br>"+ repo.description + "&glt;/p>");
     });
});