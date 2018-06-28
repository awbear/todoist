const Todoist = {
  elems: [
    { name: '$newTodo', el: '.new-todo' },
    { name: '$toggleAll', el: '.toggle-all' },
    { name: '$todoList', el: '.todo-list' },
    { name: '$todoCount', el: '.todo-count strong' },
    { name: '$footer', el: '.footer' },
  ],
  events: [
    { name: '$newTodo', event: 'keypress', fn: 'addTodo' },
    { name: '$todoList', event: 'click', fn: 'handleTodoListClick' },
  ],
  data: {
    todoCount: 1,
  },
  addTodo(e) {
    if (e.key !== 'Enter') {
      return
    }
    if (e.target.value === '') {
      return
    }
    
    const item = this.createNewTodoItem(e.target.value)
    this.$todoList.appendChild(item)
    e.target.value = ''
    this.updateTodoCount(1)
    this.updateFooterDisplay()
  },
  createNewTodoItem(todo) {
    const fragment = this.$doc.createDocumentFragment()

    const input = this.$doc.createElement('input')
    input.type = 'checkbox'
    input.className = 'check'
    fragment.appendChild(input)

    const span = this.$doc.createElement('span')
    span.textContent = todo
    fragment.appendChild(span)

    const button = this.$doc.createElement('button')
    button.className = 'close'
    fragment.appendChild(button)
    
    const li = this.$doc.createElement('li')
    li.appendChild(fragment) 

    return li
  },
  handleTodoListClick(e) {
    const target = e.target
    if (target.classList.contains('close')) {
      this.removeTodo(e)
    } else if (target.classList.contains('check')) {
      this.markCompletedItem(e)
    }
  },
  markCompletedItem(e) {
    e.target.parentElement.classList.toggle('completed')
    if (e.target.checked) {
      this.updateTodoCount(-1)
    } else {
      this.updateTodoCount(1)
    }
  },
  removeTodo(e) {
    if (!e.target.parentElement.classList.contains('completed')) {
      this.updateTodoCount(-1)
    }
    e.target.parentNode.remove()
    this.updateFooterDisplay()
  },
  updateTodoCount(count) {
    this.data.todoCount += count
    this.$todoCount.textContent = this.data.todoCount
  },
  updateFooterDisplay() {
    if (this.data.todoCount === 0) {
      this.$footer.style.display = 'none'
    } else {
      this.$footer.style.display = 'block'
    }
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
