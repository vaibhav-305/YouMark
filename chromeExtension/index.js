const Todos = document.getElementById('Todos');
const inp = document.getElementById('inp');

var form = document.getElementById("myForm");

function handleForm(event) {
    event.preventDefault();
    const li = document.createElement('li');
    li.innerHTML = inp.value;
    console.log(li);
    Todos.appendChild(li);
    inp.value = '';
}
form.addEventListener('submit', handleForm);
