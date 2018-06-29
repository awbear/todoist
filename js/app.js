const Todoist = {
  $global: window,
  elems: [
    { name: '$newTodo', el: '.new-todo' },
    { name: '$toggleAll', el: '.toggle-all' },
    { name: '$todoList', el: '.todo-list' },
    { name: '$todoCount', el: '.todo-count strong' },
    { name: '$footer', el: '.footer' },
    { name: '$filters', el: '.filters' }
  ],
  events: [
    { name: '$newTodo', event: 'keypress', fn: 'addTodo' },
    { name: '$todoList', event: 'click', fn: 'handleTodoListClick' },
    { name: '$global', event: 'hashchange', fn: 'handleHashChange' },
    { name: '$filters', event: 'click', fn: 'filterChange' },
  ],
  data: {
    todoCount: 1,
    todos: [],
  },
  addTodo(e) {
    if (e.key !== 'Enter') {
      return
    }
    if (e.target.value === '') {
      return
    }
    
    const item = this.createNewTodoItem(e.target.value)
    this.$todoList.appendChild(item.el)
    e.target.value = ''
    this.data.todos.push(item.data)
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
    const d = {
      id: new Date().getTime() + '',
      content: todo,
    }
    li.setAttribute('data-id', d.id)
    li.appendChild(fragment) 

    return { el: li, data: d }
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
    const id = e.target.parentElement.getAttribute('data-id')
    this.data.todos = this.data.todos.filter(item =>{ 
      return item.id !== id
    })
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
  handleHashChange(e) {
    console.log(e)
  },
  filterChange(e) {
    const links = this.$filters.querySelectorAll('a')
    links.forEach(l => {
      if (l.classList.contains('selected')) {
        l.classList.remove('selected')
      }
    })
    e.target.classList.add('selected')
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
