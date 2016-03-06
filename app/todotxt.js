define("app.todotxt", ['app.parser'], function(Parser) {

  var parse = new Parser


  function Todotxt() {

    this._todos = [
      "(A) 2016-01-01 do a very important +task",
      "(B) 2016-01-02 have some +tags and @projects due:2016-03-07",
      "(C) priorities are super +cool for any +task",
      "due date in past due:2016-03-01",
      "due date very close due:2016-03-08",
      "due date not so close due:2016-04-10",
      "due date far in the future due:2017-08-01",
      "some fancy:data objects any:one ?",
      "without priority and date",
      "2016-01-03 without priority, but with a date",
      "x 2016-02-01 2016-01-01 this +task is +done already",
      "x 2016-02-01 2016-01-01 this +task is +done too and was needed due:2016-02-01"
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
