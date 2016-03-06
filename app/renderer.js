define("app.renderer", ["app.config", "app.toolbox", "app.domEvents"], function(Cfg, Toolbox) {

  var tTicket = function(){/*
    <div class="static">
      <div class="content">{{content}}</div>
      <div class="due-date">{{due_or_placeholder}}</div>
      <input class="show-more" type="button" value="toggle meta data" />
      <ul class="dataset collapsed">{{dataset}}</ul>
    </div>
    <div class="inputs">
      <textarea class="content" type="text">{{content}}</textarea>
      <input class="priority" type="button" value="{{priority}}" />
      <input class="due-date" type="date" placeholder="no due date" value="{{due}}" />
    </div>
  */}

  var colNames = ["backlog", "todo", "urgent", "done"],
      Columns = {}

  colNames.forEach(function(k) {
    var el = document.getElementById(k)

    if (!el) {
      var colHeader = document.createElement("header")
      colHeader.innerText = k

      el = document.createElement("ul")
      el.id = k
      el.appendChild(colHeader)
    }

    Columns[k] = el
  })


  function parseTemplateFn(fn) {

    // source: https://github.com/x-tag/core/blob/master/src/core.js#L285
    var unwrap = /\/\*!?(?:\@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)\s*\*\//;
    return unwrap.exec(fn.toString())[1]

  }


  function renderTicket(data) {

    var ticketEl = document.createElement("li"),
        ticketContent = parseTemplateFn(tTicket),
        niceDue = "no due date",
        niceDataset

    ticketEl.id = ("t" + Math.round(Math.random()*1000000))
    ticketEl.classList.add("ticket")

    if (data.priority) {
      ticketEl.classList.add("prio-" + data.priority.toLowerCase())
    }

    if (data.due_diff) {

      niceDue = Toolbox.niceTimeDiff(data.due_diff)

      if (data.due_diff <= Cfg.due_urgent) ticketEl.classList.add("due-urgent") 
      else if(data.due_diff <= Cfg.due_soon) ticketEl.classList.add("due-soon")
    }

    if (Object.keys(data.data).length) {
      niceDataset = Toolbox.niceDataset(data.data, {without: "due"})
    }

    ticketContent = ticketContent
                    .replace(/{{content}}/g, data.text || "empty ticket")
                    .replace(/{{due_or_placeholder}}/g, niceDue)
                    .replace(/{{due}}/g, data.data.due || "")
                    .replace(/{{priority}}/g, data.priority || "")
                    .replace(/{{dataset}}/g, niceDataset || "")


    ticketEl.innerHTML = ticketContent

    return ticketEl

  }


  function Renderer() {

    var self = this

    this._tickets = []


    this.render = function() {

      var container_el = document.getElementById("tickets")

      if (!container_el) {

        container_el = document.createElement("div")
        container_el.id = "tickets"

        document.body.appendChild(container_el)

      }

      container_el.innerHTML = ""

      colNames.forEach(function(k) {
        container_el.appendChild( Columns[k] )
      })

      self._tickets.forEach(function(ticket) {
        var column = Columns[ticket.state],
            el = renderTicket(ticket)
        column.appendChild(el)
      })

    }
  }


  Renderer.prototype = {

    set tickets(list) {
      this._tickets = list
    }

  }


  return Renderer

})
