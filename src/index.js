import "./css/styles.css";
import toDoApi from './js/ToDoApi';

import templateRoot from './hbs/root.hbs';
import templateTodoList from './hbs/toDoList.hbs';




let appEl = document.getElementById("app");
let mainEl;
appEl.innerHTML = templateRoot();
window.onload = () => {


	// use root template, apply to "app" div


	mainEl = document.getElementById("main");
	loadTodo();

};

let loadTodo = () => {
	toDoApi.getTodoItems((data) => {
		// console.log({ results: data });
		mainEl.innerHTML = templateTodoList({ results: data });

		document.getElementById("addTask").addEventListener("click", () => {
			let taskDescEl = document.getElementById("addTaskDescription"); // task description element (input)
			let taskDesc = taskDescEl.value.trim(); // trimmed task description
			if (taskDesc != "") { // makes sure there is a non-empty value
				toDoApi.addTodoItem(taskDesc, (data) => {
					taskDescEl.value = "";
					loadTodo();
				});
			}
		});

		let checkboxes = document.getElementsByClassName("iscomplete");

		for (let i = 0; i < checkboxes.length; i++) {
			checkboxes[i].addEventListener("click", function () {
				let id = this.parentElement.dataset.tdid;
				let complete = (this.checked);

				toDoApi.setTodoItemCompleteStatus(id, complete, (data) => { });
			});

		}

		let btnsSave = document.getElementsByClassName("save");

		for (let i = 0; i < btnsSave.length; i++) {
			btnsSave[i].addEventListener("click", function () {
				let id = this.parentElement.dataset.tdid;
				let task = this.parentElement.getElementsByClassName("task")[0].value;
				let complete = this.parentElement.getElementsByClassName("iscomplete")[0].checked;

				toDoApi.updateTodoItem(id, task, complete, (data) => { });
			});

		}




	});
};