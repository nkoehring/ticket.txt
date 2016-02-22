define("app.clickHandler", function() {

  return {

    columnHeader: function(evt) {
      evt.target.parentNode.classList.toggle("collapsed")
    }

  }

})
