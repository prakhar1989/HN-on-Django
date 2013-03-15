$(document).ready(function(){

  function getCookie(name) {
    /* CSRF Ajax fix */
      var cookieValue = null;
      if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
              var cookie = jQuery.trim(cookies[i]);
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) == (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  }

  var csrftoken = getCookie('csrftoken');
  
  function vote(storyID) {
    $.ajax({
      type: "POST",
      url: '/vote/',
      data: { "story" : storyID },
      success : function() {
        $('#story-vote-' + storyID).css('visibility', 'hidden');
      },
      headers: {
        'X-CSRFToken' : csrftoken
      }
    });
    return false;
  }

  $('.uparrow').click(function() {
    var storyID = parseInt(this.id.split("-")[2]);
    return vote(storyID);
  });

});
