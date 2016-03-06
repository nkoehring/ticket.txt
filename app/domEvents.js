define("app.domEvents", function() {

  var Events = [
    {
      type:    'click',
      selector: '#tickets > ul > header',
      callback: function(evt) {
        evt.target.parentNode.classList.toggle("collapsed")
      }
    },
    {
      type:    'click',
      selector: '#tickets > ul > .ticket > .static > .show-more',
      callback: function(evt) {
        evt.target.nextElementSibling.classList.toggle("collapsed")
      }
    }
  ]


  function domEvents() {

    Events.forEach(function(event) {

      var elements = document.querySelectorAll(event.selector)

      for(var i = 0; i < elements.length; i++) {
        elements[i].addEventListener(event.type, event.callback)
      }

    })

  }

  return domEvents

})
