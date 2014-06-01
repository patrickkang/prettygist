var gist_id;

(function(){
  gist_id = window.location.search.substring(1).slice(0, -1);
})();

$(document).ready(function(){
  console.log(gist_id);
  if(gist_id === ''){
    indexPage();
  } else {
    getGist(gist_id);
  }
});

var indexPage = function(){
  $.ajax({
    url: 'views/index.html',
    dataType: 'html',
    success : function(data){
      var template = data;
      $('#prettygist').html(data);
    }
  });
};

var getGist = function(gist_id){
  var url = 'https://api.github.com/gists/' + gist_id;
  console.log(url);
  $.ajax({
    url: url,
    async: false,
    dataType: 'json',
    success: function(data){
      renderGist(data);
    }
  });
}

var renderGist = function(data){
  $.ajax({
    url: 'views/show.html',
    dataType: 'html',
    success: function(response){
      var view, template, html;
      $('#prettygist').html('');
      view={

      };
      template = response;
      html = Mustache.to_html(template, view);
      $('#prettygist').append($(html));
    }
  });
};