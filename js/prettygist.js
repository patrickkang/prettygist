var gist_id;

(function(){
  gist_id = window.location.search.substring(1).slice(0, -1);
})();

$(document).ready(function(){
  marked.setOptions({
    highlight: function(code, lang){
      return hljs.highlightAuto(code).value;
    }
  });
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
  $.ajax({
    url: url,
    async: false,
    dataType: 'json',
    success: function(data){
      renderGist(data);
    },error: function(data){
      renderNotFoundPage();
    }
  });
};

var renderGist = function(data){
  $.ajax({
    url: 'views/show.html',
    dataType: 'html',
    success: function(response){
      var view, template, html;
      $('#prettygist').html('');
      for(var filename in data.files);

      view={
        gist_id: data.id,
        title: data.description,
        date: data.updated_at.substring(0,10),
        public_or_private: data.public ? "Public" : "Private",
        gist_url: data.files[filename].raw_url,
        content: marked(data.files[filename].content)
      };

      if(data.owner){
        view.owner = data.owner.login;
        view.owner_avatar = data.owner.avatar_url;
        view.owner_url = data.owner.html_url;
      }

      template = response;
      html = Mustache.to_html(template, view);
      $('#prettygist').append($(html));
    }
  });
};

var renderNotFoundPage = function(){
  $.ajax({
    url: 'views/error.html',
    dataType: 'html',
    success : function(data){
      var template = data;
      $('#prettygist').html(data);
    }
  });
};
