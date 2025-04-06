document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('taskList');
    const newTaskInput = document.getElementById('newTaskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const deleteModal = document.getElementById('deleteModal');
    const confirmDelete = document.getElementById('confirmDelete');
    const cancelDelete = document.getElementById('cancelDelete');
    
    let taskToDelete = null;
    
    // Add event listeners to checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskText = this.parentElement.nextElementSibling;
            if (this.checked) {
                taskText.classList.add('completed');
            } else {
                taskText.classList.remove('completed');
            }
        });
    });
    
    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            taskToDelete = this.closest('tr');
            deleteModal.style.display = 'block';
        });
    });
    
    // Confirm delete
    confirmDelete.addEventListener('click', function() {
        if (taskToDelete) {
            taskToDelete.remove();
            taskToDelete = null;
        }
        deleteModal.style.display = 'none';
    });
    
    // Cancel delete
    cancelDelete.addEventListener('click', function() {
        taskToDelete = null;
        deleteModal.style.display = 'none';
    });
    
    // Add new task
    addTaskBtn.addEventListener('click', function() {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td style="text-align: center;"><input type="checkbox"></td>
                <td>${taskText}</td>
                <td style="text-align: center;"><button class="delete-btn">delete</button></td>
            `;
            
            // Add event listener to new checkbox
            const newCheckbox = newRow.querySelector('input[type="checkbox"]');
            newCheckbox.addEventListener('change', function() {
                const taskText = this.parentElement.nextElementSibling;
                if (this.checked) {
                    taskText.classList.add('completed');
                } else {
                    taskText.classList.remove('completed');
                }
            });
            
            // Add event listener to new delete button
            const newDeleteBtn = newRow.querySelector('.delete-btn');
            newDeleteBtn.addEventListener('click', function() {
                taskToDelete = this.closest('tr');
                deleteModal.style.display = 'block';
            });
            
            taskList.appendChild(newRow);
            newTaskInput.value = '';
        }
    });
    
    // Allow pressing Enter to add a task
    newTaskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });
});
