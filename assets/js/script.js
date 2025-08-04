class Todo {
    constructor(title) {
        this.title = title;
        this.isComplete = false;
    }
}

class TodoList {
    constructor(container) {
        this.container = container;
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.input = document.querySelector('#itemInput');
        this.addBtn = document.querySelector('#addButton');
        this.clearBtn = document.querySelector('#clearButton');
        this.initThemeToggle();

        this.addBtn.addEventListener('click', () => this.addTodo());
        this.clearBtn.addEventListener('click', () => this.clearTodos());

        this.render();
    }

    initThemeToggle() {
        const toggleBtn = document.querySelector('#toggleTheme');
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }

        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    render() {
        this.container.innerHTML = '';
        this.todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = `list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2 rounded ${todo.isComplete ? 'list-group-item-success' : ''
                }`;

            const title = document.createElement('span');
            title.textContent = todo.title;
            title.className = 'fw-semibold';
            if (todo.isComplete) {
                title.style.textDecoration = 'line-through';
                title.classList.add('text-muted');
            }

            const btnGroup = document.createElement('div');

            const completeBtn = document.createElement('button');
            completeBtn.className = 'btn btn-sm btn-outline-success me-2';
            completeBtn.innerHTML = '<i class="fas fa-check"></i>';
            completeBtn.title = 'Mark as complete';
            completeBtn.addEventListener('click', () => {
                todo.isComplete = !todo.isComplete;
                this.save();
                this.render();
            });

            const removeBtn = document.createElement('button');
            removeBtn.className = 'btn btn-sm btn-outline-danger';
            removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
            removeBtn.title = 'Remove task';
            removeBtn.addEventListener('click', () => {
                this.todos.splice(index, 1);
                this.save();
                this.render();
            });

            btnGroup.append(completeBtn, removeBtn);
            li.append(title, btnGroup);
            this.container.appendChild(li);
        });
    }

    addTodo() {
        const title = this.input.value.trim();
        if (title) {
            this.todos.push(new Todo(title));
            this.input.value = '';
            this.save();
            this.render();
        } else {
            alert('Please enter a task!');
        }
    }

    clearTodos() {
        if (confirm('Are you sure you want to clear all tasks?')) {
            this.todos = [];
            this.save();
            this.render();
        }
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}

new TodoList(document.querySelector('#todoList'));