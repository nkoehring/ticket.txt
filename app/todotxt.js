define("app.todotxt", ['app.parser'], function(Parser) {

  var parse = new Parser


  function Todotxt() {

    this._todos = [
      "(A) 2016-01-01 do a very important +task",
      "(B) 2016-01-02 have some +tags and @projects due:2016-03-01",
      "(C) priorities are super +cool for any +task",
      "some fancy:data objects any:one ?",
      "without priority and date",
      "2016-01-03 without priority, but with a date",
      "x 2016-02-01 2016-01-01 this +task is +done already"
    ]

  }


  Todotxt.prototype = {

    get todos() {
      return parse.list(this._todos)
    },

    set todos(data) {
      console.warn("not implemented, yet")
    }

  }


  return Todotxt

})
