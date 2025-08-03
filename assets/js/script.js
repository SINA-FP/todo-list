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

        this.addBtn.addEventListener('click', () => this.addTodo());
        this.clearBtn.addEventListener('click', () => this.clearTodos());

        this.render();
    }

    render() {
        this.container.innerHTML = '';
        this.todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = `list-group-item d-flex justify-content-between align-items-center ${todo.isComplete ? 'list-group-item-success' : ''}`;

            const title = document.createElement('span');
            title.textContent = todo.title;
            if (todo.isComplete) title.style.textDecoration = 'line-through';

            const btnGroup = document.createElement('div');

            const completeBtn = document.createElement('button');
            completeBtn.className = 'btn btn-sm btn-success me-2';
            completeBtn.textContent = '✔';
            completeBtn.addEventListener('click', () => {
                todo.isComplete = !todo.isComplete;
                this.save();
                this.render();
            });

            const removeBtn = document.createElement('button');
            removeBtn.className = 'btn btn-sm btn-danger';
            removeBtn.textContent = '🗑';
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
        }
    }

    clearTodos() {
        this.todos = [];
        this.save();
        this.render();
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}

new TodoList(document.querySelector('#todoList'));