define("app.templates", ["app.toolbox"], function(Toolbox) {

  var toTitleCase = Toolbox.toTitleCase

  var TemplatesNode = document.getElementById("templates"),
      Templates = {},
      nodes

  if (!TemplatesNode) {
    return {}
  } else {
    nodes = TemplatesNode.children
  }


  for(var i=0; i<nodes.length; i++) {
    var node = nodes[i],
        tagName = toTitleCase(node.tagName)

    Templates[tagName] = node.cloneNode(true)
  }


  return Templates

})
