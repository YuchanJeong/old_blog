---
title: "BC-6w-2 / HA-React"
date: 2021-09-28
categories:
  - "'Bootcamp'"
tags:
  - React
---

## Today I learned

### Section Review

#### DOM

```js
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Review</title>
    <meta charset="UTF-8" />
  </head>
  <body>
    <div id="app">
      <ul class="city-list"></ul>
    </div>
    <script>
      const places = [
        {
          id: 1,
          city: "Busan",
          country: "Korea",
          address: "Yangdal"
        },
        {
          id: 2,
          city: "Dubai",
          country: "AE",
          address: "Bastakia"
        },
        {
          id: 3,
          city: "Manila",
          country: "Philippine",
          address: "Tagaytay"
        },
      ];

      for (let i = 0; i < places.length; i++) {
        let cityListEl = document.querySelector(".city-list");
        let listEl = document.createElement("li");
        cityListEl.appendChild(listEl);
        let countryEl = document.createElement("span");
        listEl.appendChild(countryEl);
        let div = document.createElement("div");
        listEl.appendChild(divEl);
        let cityEl = document.createElement("span");
        divEl.appendChild(cityEl);
        let brEl = document.createElement("br");
        divEl.appendChild(brEl);
        let addressEl = document.createElement("span");
        divEl.appendChild(addressEl);
        country.classList.add("country");
        cityEl.classList.add("city");
        addressEl.classList.add("address");
        countryEl.textContent = `${places[i].country}`;
        cityEl.textContent = `City : ${places[i].city}`;
        addressEl.textContent = `Address : ${places[i].address}`;
      }
    </script>
  </body>
</html>
```

### HA-React

#### Bare Minimum

<!-- ```js
import { useState } from "react";
import images from "../data/images";
import Thumbnail from "../component/Thumbnail";

function Gallery() {
  const [curImg, setCurImg] = useState(images[0]);

  const handleClick = (image) => {
    setCurImg(image);
  };

  return (
    <div>
      <h2>전체 목록</h2>
      <div id="list" className="flex">
        {images.map((item) => {
          return (
            <a key={item.id} onClick={() => handleClick(item)}>
              <Thumbnail source={item.src} />
            </a>
          );
        })}
      </div>
      <div>
        <h2>{curImg.alt}</h2>
        <img id="current-image" src={curImg.src} alt={curImg.alt} />
      </div>
    </div>
  );
}

export default Gallery;
```

```js
function Thumbnail(props) {
  return (
    <>
      <img src={props.source} className="thumbnail" />
    </>
  );
}

export default Thumbnail;
``` -->

- eventHandler={(e) => (..., e) => {}}
  - eventHandler 안에는 함수 자체가 와야 함(함수 실행 x)
  - 아무런 인자를 담지 않으면 event 객체만 전달

### Advanced

<!-- ```js
import { useState } from "react";
import Todo from "../component/Todo";
import TodoForm from "../component/TodoForm";

function Todos() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todoList) => {
    setTodos(todoList);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const completeTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.complete = !todo.complete;
        }
        return todo;
      })
    );
  };

  return (
    <div>
      <div className="todo-app">
        <h1>To Do List</h1>
        <h2>오늘은 무슨 일을 계획하나요?</h2>
        <TodoForm todos={todos} onSubmit={addTodo} />
        <Todo todos={todos} removeTodo={removeTodo} completeTodo={completeTodo} />
      </div>
    </div>
  );
}

export default Todos;
```

```js
function Todo({ todos, completeTodo, removeTodo }) {
  return (
    <div className="wrapper-todo">
      {todos.map((todo) => {
        let todoClass = todo.complete ? "todo-row complete" : "todo-row";

        return (
          <div className={todoClass} key={todo.id}>
            <div onClick={() => completeTodo(todo.id)}>{todo.text}</div>
            <div className="icons">
              <i className="fas fa-times delete-icon" onClick={() => removeTodo(todo.id)}></i>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Todo;
```

```js
import { nanoid } from "nanoid";
import { useState } from "react";

function TodoForm({ onSubmit, todos }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (input, e) => {
    const todo = {
      text: input,
      id: nanoid(),
      complete: false,
    };
    setInput("");
    onSubmit([...todos, todo]);
    e.preventDefault();
  };

  return (
    <form id="todoForm" className="todo-form" onSubmit={(e) => handleSubmit(input, e)}>
      <input type="text" placeholder="Add a todo" value={input} name="todoInput" className="todo-input" onChange={handleChange} />
      <button className="todo-button">Add todo</button>
    </form>
  );
}

export default TodoForm;
``` -->

- 주로 배열안에 객체 형태로 정보 저장
  - const handleSubmit = (input, e) => {  
    const todo = {  
     text: input,  
     id: nanoid(),  
     complete: false,  
     };  
     setInput("");  
     onSubmit([...todos, todo]);  
     e.preventDefault();  
    };
    - 객체에 정보 저장 후 구조 분해 할당으로 배열에 추가
    - e.preventDefault();
      - 고유 동작을 중단
    - e.stopPropagation()
      - 상위 엘리먼트로의 이벤트 전파를 중단
- 제거
  - setTodos(todos.filter((item) => item.id !== id))
- 선택
  - setTodos(  
    todos.map((todo) => {  
     if (todo.id === id) {  
     todo.complete = !todo.complete;  
     }  
     return todo;  
    })  
    );
- 조건부 할당
  - let todoClass = todo.complete ? "todo-row complete" : "todo-row";

## Today's takeaway

- section1 HA로 React 과제를 진행하였다.
- 통과 여부를 결정하는 Bare Minimum은 eventHandler 안에는 함수 자체가 와야 하고 함수의 실행이 오면 안 된다는 사실을 놓쳐서 시간이 오래 걸렸다.
- 추가로 더 공부하고 싶은 사람만 하는 Advanced는 a 태그나 input 태그 등의 고유 동작을 막는 e.preventDefault()를 몰라서 시간이 오래 걸렸다.
- 지금까지는 공부를 하는 입장이라 막힐 때마다 검색을 하기보다는 혼자 오래 고민하였다. 하지만 과제를 풀다 보니 기능적으로 모르는 부분은 혼자서는 절대 알 수 없는 것이었다. 검색 결과에는 문제 풀이만을 위한 나의 지엽적인 방법보다 훨씬 간단하고 범용적인 방법들이 많았다. 앞으로 공부 방향을 수정하여 수도 코드는 혼자 스스로 만들 돼(for 스스로 생각하는 힘) 기능적인 부분은 검색의 힘을 많이 빌릴 것이다.(for 더 나은 기능들)

## Tomorrow I'll learn

- 내일은 Hiring Assessments(JavaScript)를 진행한다. 제한 시간이 내일 하루 종일로 여유롭게 주어 저서 전혀 걱정되지 않는다.
- 내일 HA를 마친 뒤 리액트를 마저 정리할 것이다.
