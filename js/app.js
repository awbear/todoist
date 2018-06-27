const Todoist = {
  elems: [
    { name: '$newTodo', el: '.new-todo' },
    { name: '$toggleAll', el: '.toggle-all' },
  ],
  events: [
    { name: '$newTodo', event: 'keypress', fn: 'addTodo' },
  ],
  addTodo() {

  },
  initElems() {
    this.$doc = document
    this.elems.forEach(item => {
      this[item.name] = this.$doc.querySelector(item.el)
    })
  },
  initEvents() {
    this.events.forEach(item => {
      this[item.name].addEventListener(item.event, this[item.fn].bind(this))
    })
  },
  init() {
    this.initElems()
    this.initEvents()
  },
}

Todoist.init()
