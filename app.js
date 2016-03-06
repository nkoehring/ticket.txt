include(['app.todotxt', 'app.renderer', 'app.domEvents'], function(Todotxt, Renderer, domEvents) {

  var todotxt  = new Todotxt,
      renderer = new Renderer

  renderer.tickets = todotxt.todos
  renderer.render()
  domEvents()

})

