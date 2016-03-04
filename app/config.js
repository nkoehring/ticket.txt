define("app.config", function() { return {

  // ticket becomes urgent if due in less or equal due_urgent milliseconds
  due_urgent: 3600 * 48 * 1000,   // two days

  // ticket moves out of backlog if due in less or equal due_soon milliseconds
  due_soon: 3600 * 24 * 7 * 1000 // one week

}})
