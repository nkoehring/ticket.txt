define("app.parser", function() {

  function Parser() {

    var self = this


    this.line = function(s) {
      return { priority: null, text: s, tags: [], projects: [], data: {} }
    }


    this.list = function(list) {
      return list.map(self.line)
    }

  }


  return Parser

})
