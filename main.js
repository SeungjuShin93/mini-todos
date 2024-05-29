let toDos = [];

document.addEventListener('DOMContentLoaded', () => {
  toDos = JSON.parse(localStorage.getItem('toDos')) || [];
  const list = document.getElementById('todoList');
  // 버튼에 하나하나 이벤트 리스너 다는 것을 피하고
  // list 하나에만 이벤트 리스너를 설계
  list.addEventListener('click', (e) => {
    const btnId = e.target.dataset.btnId;
    console.log(btnId);
    if (btnId) {
      removeTodo(btnId);
    }
  });
  renderPage(toDos);
});

// 엔터 키로도 addTodo가 작동하도록 설계
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});

function addTodo() {
  const input = document.getElementById('todoInput');
  let newTodo = input.value.trim();
  const p = document.getElementById('error');
  if (newTodo) {
    const data = JSON.parse(localStorage.getItem('toDos'));
    if (data && data.includes(newTodo)) {
      // 기존에 이미 존재하는 todo가 있는지 확인
      // 존재한다면 에러 메세지를 출력해줌
      p.classList.remove('hidden');
      renderPage(toDos);
      return;
    }
    p.classList.add('hidden');
    toDos.push(newTodo);
    localStorage.setItem('toDos', JSON.stringify(toDos));
    renderPage(toDos);
    input.value = '';
  }
}

function renderPage(toDos) {
  const list = document.getElementById('todoList');
  list.innerHTML = '';
  toDos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.innerText = todo;
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    // 원하는 버튼을 삭제하기 위해서 dataset을 설정
    deleteBtn.dataset.btnId = index;
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// 기존 index 대신에 btnId를 인자로 전달
function removeTodo(btnId) {
  toDos.splice(btnId, 1);
  localStorage.setItem('toDos', JSON.stringify(toDos));
  renderPage(toDos);
}
