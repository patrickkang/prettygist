$(document).ready(function(){
  try{
    indexPage();
  } catch (err){

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
