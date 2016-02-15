define("app.renderer", function() {

  function Renderer() {

    var self = this

    this._tickets = []


    function renderTicket(data) {

      var ticket_el = document.createElement("div"),
          text_el = document.createElement("textarea")

      ticket_el.classList.add("ticket")
      text_el.value = data.text
      ticket_el.appendChild(text_el)

      return ticket_el

    }


    this.render = function() {

      var container_el = document.getElementById("container")

      if (!container_el) {

        container_el = document.createElement("div")
        container_el.id = "container"

        document.body.appendChild(container_el)

      }

      container_el.innerHTML = ""

      self._tickets.forEach(function(ticket) {
        container_el.appendChild( renderTicket(ticket) )
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
