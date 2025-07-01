
document.addEventListener('DOMContentLoaded',function(){

    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const  todoList = document.getElementById('todo-list');

    let todos = loadTodos();


    todos.forEach(todo => {
        const todoItem = createTodoElement(todo.text,todo.completed);
        todoList.appendChild(todoItem);
    });

    form.addEventListener('submit', function(e){
        e.preventDefault();
        const text = input.value.trim();
        if(text !== ''){
            const todoItem = createTodoElement(text,false);
            todoList.appendChild(todoItem);
            todos.push({text,completed: false});
            saveTodos(todos);
            input.value = '';

        }
    });

    function createTodoElement(text, completed){
        const li = document.createElement('li'); //ToDo１件を表す。
        if(completed){
            li.classList.add('completed');
        }


        const span = document.createElement('span');
        const date = new Date().toLocaleString(); // 日付を取得
        span.textContent = `${text}（${date}）`;   // テキストと日時を表示
        console.log(date);
        span.textContent = text;
        span.addEventListener('click', () => {
            const newText = prompt('編集を入力してください：',span.textContent);
            if(newText !== null && newText.trim()!== ''){
                span.textContent = newText.trim();
                updateTodos();
            }
        });



        const btnContainer = document.createElement('div');
        btnContainer.style.display = 'inline-block';
        btnContainer.style.marginLeft = '10px';

        const completeBtn = document.createElement('button');
        completeBtn.textContent = '完了';
        completeBtn.className = 'complete-btn';
        completeBtn.addEventListener('click',function(){
            li.classList.toggle('completed');

            updateTodos();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click',function(){
            todoList.removeChild(li);
            updateTodos();
        });

        btnContainer.appendChild(completeBtn);
        btnContainer.appendChild(deleteBtn);
        li.appendChild(span);
        li.appendChild(btnContainer);

        return li;
    }

        function saveTodos(todos) {
            localStorage.setItem('todos',JSON.stringify(todos));
        }
        //localStrageに保存されたToDoを取得。
        function loadTodos(){
            //ローカルストレージからデータを取得。
            const data = localStorage.getItem('todos');
            //JSONとしてパースし、JavaScriptの配列として返す。
            return data ? JSON.parse(data) : [];
        }
        //現在のDOMから、全てのToDoを再構築して直してToDoに保存。
        function updateTodos(){
            const items = todoList.querySelectorAll('#todo-list li');
            todos = Array.from(items).map(li => ({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            }));

            saveTodos(todos);
        }


});

document.getElementById('filter-all').onclick = () => {
    document.querySelectorAll('#todo-list li').forEach(li => li.style.display = '');
};
document.getElementById('filter-active').onclick = () => {
    document.querySelectorAll('#todo-list li').forEach(li => {
        li.style.display = li.classList.contains('completed') ? 'none' : '';
    });
};
document.getElementById('filter-completed').onclick = () => {
    document.querySelectorAll('#todo-list li').forEach(li => {
        li.style.display = li.classList.contains('completed') ? '' : 'none';
    });
};

document.getElementById('search-box').addEventListener('input', function() {
    const keyword = this.value.toLowerCase();
    document.querySelectorAll('#todo-list li').forEach(li => {
        const text = li.querySelector('span').textContent.toLowerCase();
        li.style.display = text.includes(keyword) ? '' : 'none';
    });
});


// ダークモード
document.getElementById('toggle-dark').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');

    // 保存（任意）
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
});

// ページ読み込み時に状態を復元
document.addEventListener('DOMContentLoaded', () => {
// window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'enabled') {
        document.body.classList.add('dark-mode');
    }
});

const toggle = document.getElementById('toggle-dark');

// 切り替えイベント
toggle.addEventListener('change', function () {
    document.body.classList.toggle('dark-mode', this.checked);
    localStorage.setItem('darkMode', this.checked ? 'enabled' : 'disabled');
});

// 初期状態の復元
document.addEventListener('DOMContentLoaded', () => {
// window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'enabled') {
        document.body.classList.add('dark-mode');
        toggle.checked = true;
    }
});
