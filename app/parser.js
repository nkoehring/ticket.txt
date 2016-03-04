define("app.parser", ['app.config'], function(Cfg) {


  function Parser() {

    var self = this


    this.line = function(s) {

      var priority = null,
          data = {},
          state = "backlog",
          tmp = s.split(" "),
          keywordData,
          tags,
          projects,
          entry

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

      entry = {
        priority: priority,
        text: s,
        tags: tags,
        projects: projects,
        data: data,
        state: state
      }

      /** move todos into the right columns
       *
       * rules for urgent column:
       *  not done
       *  priority A or due date in less than or equal Config.due_urgent
       *
       * rules for todo column:
       *  not done
       *  any priority or due date in less than or equal Config.due_soon
       *
       */
      if (entry.state === "backlog") {

        var t_diff

        // poor mans ISO date format YYYY-MM-DD check
        if (entry.data.due && entry.data.due.match(/^\d{4}(-\d\d){2}/)) {
          t_diff = Date.parse(entry.data.due) - (new Date()).getTime()
          entry.due_diff = t_diff
        }

        if (entry.priority === "A" || t_diff && t_diff <= Cfg.due_urgent) {
          entry.state = "urgent"

        } else if (entry.priority || t_diff && t_diff <= Cfg.due_soon) {
          entry.state = "todo"
        }
      }

      return entry
    }

    this.list = function(list) {
      return list.map(self.line)
    }

  }


  return Parser

})
