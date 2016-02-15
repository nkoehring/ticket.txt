include(['app.todotxt', 'app.renderer'], function(Todotxt, Renderer) {

  var todotxt  = new Todotxt,
      renderer = new Renderer

  renderer.tickets = todotxt.todos
  renderer.render()

})

