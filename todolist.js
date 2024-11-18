document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todotext');
    const addButton = document.getElementById('AppUpdateClick');
    const todoList = document.getElementById('list-items');

    addButton.addEventListener('click', createTodoData);

    todoInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            createTodoData();
        }
    });

    function createTodoData() {
        const todoText = todoInput.value.trim();
        if (todoText) {
            const li = document.createElement('li');
            li.className = 'todo-item';
            
            const taskSpan = document.createElement('span');
            taskSpan.textContent = todoText;
            taskSpan.className = 'task-text';
            
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit-btn';
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-btn';
            
            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton);
            li.appendChild(taskSpan);
            li.appendChild(buttonContainer);
            todoList.appendChild(li);
            
            todoInput.value = '';

            let isEditing = false;
            let originalText = todoText;

            editButton.addEventListener('click', function() {
                if (!isEditing) {
                    
                    isEditing = true;
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = taskSpan.textContent;
                    input.className = 'edit-input';
                    taskSpan.replaceWith(input);
                    editButton.textContent = 'Save';
                    input.focus();

                    
                    input.addEventListener('keydown', function(e) {
                        if (e.key === 'Escape') {
                            taskSpan.textContent = originalText;
                            input.replaceWith(taskSpan);
                            editButton.textContent = 'Edit';
                            isEditing = false;
                        }
                    });

                    
                    input.addEventListener('keydown', function(e) {
                        if (e.key === 'Enter') {
                            saveChanges(input);
                        }
                    });

                } else {
                    // Save changes
                    const input = li.querySelector('.edit-input');
                    saveChanges(input);
                }
            });

            function saveChanges(input) {
                const newText = input.value.trim();
                if (newText !== '') {
                    originalText = newText;
                    taskSpan.textContent = newText;
                    input.replaceWith(taskSpan);
                    editButton.textContent = 'Edit';
                    isEditing = false;
                }
            }

            deleteButton.addEventListener('click', function() {
                li.remove();
            });
        }
    }

    const style = document.createElement('style');
    style.textContent =  document.head.appendChild(style);
});
