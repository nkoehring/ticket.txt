define("app.toolbox", function() {

  var MINUTES = 60 * 1000,
      HOURS = MINUTES * 60,
      DAYS = HOURS * 24,
      WEEKS = DAYS * 7,
      MONTHS = DAYS * 30,
      YEARS = MONTHS * 12

  
  function toTitleCase(s) {

    return s.trim().toLowerCase().replace(/-[a-z]/g, function(match) {
      return match[1].toUpperCase();
    });

  }


  function oneDecimalPlace(d, x) {
    return parseInt(d * 10.0 / x) / 10
  }

  function niceTimeDiff(d) {

    if (d <= 0) {
      return "OVERDUE!"

    } else if (d > 0 && d < MINUTES * 10) {
      return "NOW!"

    } else if (d > YEARS) {
      return oneDecimalPlace(d, YEARS) + " year(s)"

    } else if (d > MONTHS) {
      return oneDecimalPlace(d, MONTHS) + " month(s)"

    } else if (d > WEEKS) {
      return oneDecimalPlace(d, WEEKS) + " week(s)"

    } else if (d > DAYS) {
      return oneDecimalPlace(d, DAYS) + " day(s)"

    } else if (d > HOURS) {
      return oneDecimalPlace(d, HOURS) + " hour(s)"
    }
      
  }


  function renderDataset(data, options) {

    var output,
        options = options || {},
        parentTag = options.parentTag || "<li>{{s}}</li>",
        labelTag = options.labelTag || "<div class=\"dataset-key\">{{s}}</div>",
        contentTag = options.contentTag || "<div class=\"dataset-value\">{{s}}</div>"

    if (options && options.without) {

      var toRemove = options.without
      if (typeof toRemove === "string" ) { toRemove = [options.without] }

      toRemove.forEach(function(key) { delete data[key] })
    }

    output = Object.keys(data).map(function(key) {
      var content = labelTag.replace(/{{s}}/, key) + contentTag.replace(/{{s}}/, data[key])
      return parentTag.replace(/{{s}}/, content)
    })

    return output.join("\n")

  }

  return {
    toTitleCase: toTitleCase,
    niceTimeDiff: niceTimeDiff,
    niceDataset: renderDataset
  }

})
