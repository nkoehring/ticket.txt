define("app.parser", function() {


  function Parser() {

    var self = this


    this.line = function(s) {

      var priority = null,
          data = {},
          state = "backlog",
          tmp = s.split(" "),
          keywordData,
          tags,
          projects

      if (s[0] === "x") {

        state = "done"
        tmp.shift()                 // get rid of the leading x
        data.done = tmp.shift()     // save the done date
        s = tmp.join(" ")

      }

      if (s[0] === "(") {
        priority = s[1]
        tmp.shift()                 // get rid of priority
        s = tmp.join(" ")
      }

      if (s.match(/^20[0-9]{2}-[01][0-9]-[0-2][0-9]/)) {
        data.created = tmp.shift()  // save the creation date
        s = tmp.join(" ")
      }

      tags = s.match(/\+[^\s]+/g) || []
      projects = s.match(/@[^\s]+/g) || []
      keywordData = s.match(/[^\s]+:[^\s]+/g) || []

      keywordData.forEach(function(kw) {
        kw = kw.split(":")
        data[kw[0]] = kw[1]
      })

      console.log(s, data)

      return entry = {
        priority: priority,
        text: s,
        tags: tags,
        projects: projects,
        data: data,
        state: state
      }
    }

    this.list = function(list) {
      return list.map(self.line)
    }

  }


  return Parser

})
