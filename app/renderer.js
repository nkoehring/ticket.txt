define("app.renderer", ["app.clickHandler"], function(Click) {

  var tTicket = function(){/*
    <div class="content">{{content}}</div>
    <div class="due-date">{{due}}</div>
    <div class="priority">{{priority}}</div>
  */}

  var colNames = ["backlog", "todo", "urgent", "done"],
      Columns = {}

  colNames.forEach(function(k) {
    var el = document.getElementById(k)

    if (!el) {
      var colHeader = document.createElement("header")
      colHeader.innerText = k
      colHeader.addEventListener("click", Click.columnHeader)

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
        ticketContent = parseTemplateFn(tTicket)

    ticketContent = ticketContent
                    .replace("{{content}}", data.text || "empty ticket")
                    .replace("{{due}}", data.data.due || "-")
                    .replace("{{priority}}", data.priority || "-")

    ticketEl.classList.add("ticket")
    ticketEl.id = ("t" + Math.round(Math.random()*1000000))
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
