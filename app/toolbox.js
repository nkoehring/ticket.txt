define("app.toolbox", function() {

  
  function toTitleCase(s) {

    return s.trim().toLowerCase().replace(/-[a-z]/g, function(match) {
      return match[1].toUpperCase();
    });

  }



  return {
    toTitleCase: toTitleCase
  }

})
