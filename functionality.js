class UI {
    constructor() {
    this.inputValue = document.getElementById('text-input');
    this.form = document.getElementById('form');
    this.resetBtn = document.getElementById('reset-btn');
    this.list = document.getElementById('list');
    this.itemList = [];
    this.itemID = 0;
    }

    submitForm() {
        let inputValue = document.getElementById('text-input').value;
        let textInput = {
            id: this.itemID,
            title: inputValue
        }
        this.itemID++;
        this.itemList.push(textInput);
        this.addToList(textInput)
    }


    addToList(textInput){
        const div = document.createElement('div');
        div.innerHTML = `
                <div class="list-text">
                    <p class="list-title">${textInput.title}
                        <button class='edit-icon' data-id="${textInput.id}">edit</button>
                        <button class="delete-icon" data-id="${textInput.id}">delete</button>
                    </p>
                </div>
        `;
        this.list.appendChild(div);
        this.inputValue.value = '';
    }

    resetInput() {
        this.inputValue.value = '';
    }

    editText(element) {
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement;
        this.list.removeChild(parent);
        let text = this.itemList.filter(function(item) {
            return item.id === id;
        });
        this.inputValue.value = text[0].title;
        let tempText = this.itemList.filter(function(item) {
            return item.id !== id;
        });
        this.itemList = tempText;
    }
    
    deleteText(element) {
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement;
        this.list.removeChild(parent);
    }
}


function eventListeners() {
    const form = document.getElementById('form');
    const resetBtn = document.getElementById('reset-btn');
    const list = document.getElementById('list');
    const ui = new UI();
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        ui.submitForm();
    });

    resetBtn.addEventListener('click', function(event) {
        event.preventDefault();
        ui.resetInput();
    });

    list.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-icon')) {
            ui.editText(event.target);
        } else if (event.target.classList.contains('delete-icon')) {
            ui.deleteText(event.target)
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    eventListeners();
});