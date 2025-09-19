import React, { useState, useEffect } from 'react'
import './App.css';

const STORAGE_KEY = 'rsbuild_todos_v1'

export default function App() {
const [todos, setTodos] = useState([])
const [text, setText] = useState('')
const [editingId, setEditingId] = useState(null)
const [editText, setEditText] = useState('')


useEffect(() => {
const raw = localStorage.getItem(STORAGE_KEY)
if (raw) {
try {
setTodos(JSON.parse(raw))
} catch {
setTodos([])
}
}
}, [])


useEffect(() => {
localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}, [todos])

function addTodo(e) {
e.preventDefault()
const v = text.trim()
if (!v) return
const newTodo = {
id: Date.now().toString(),
text: v,
completed: false,
createdAt: new Date().toISOString(),
}
setTodos([newTodo, ...todos])
setText('')
}


function removeTodo(id) {
setTodos(todos.filter(t => t.id !== id))
}


function toggleTodo(id) {
setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
}


function startEdit(todo) {
setEditingId(todo.id)
setEditText(todo.text)
}


function saveEdit(e) {
e.preventDefault()
const v = editText.trim()
if (!v) return
setTodos(todos.map(t => t.id === editingId ? { ...t, text: v } : t))
setEditingId(null)
setEditText('')
}

function cancelEdit() {
setEditingId(null)
setEditText('')
}


return (
<div className="app">
<header>
<h1>RSBuild • Todo (CRUD)</h1>
<p className="muted">Simple todo with localStorage persistence</p>
</header>


<main>
<form className="add-form" onSubmit={addTodo}>
<input
value={text}
onChange={e => setText(e.target.value)}
placeholder="Add a new todo..."
aria-label="New todo"
/>
<button type="submit">Add</button>
</form>


<section className="list">
{todos.length === 0 && <p className="muted">No todos yet — add one!</p>}


{todos.map(todo => (
<article key={todo.id} className={`todo ${todo.completed ? 'done' : ''}`}>
<div className="left">
<input
type="checkbox"
checked={todo.completed}
onChange={() => toggleTodo(todo.id)}
aria-label={`Mark ${todo.text} complete`}
/>


{editingId === todo.id ? (
<form onSubmit={saveEdit} className="edit-form">
<input
value={editText}
onChange={e => setEditText(e.target.value)}
autoFocus
/>
<div className="edit-actions">
<button type="submit">Save</button>
<button type="button" onClick={cancelEdit}>Cancel</button>
</div>
</form>
) : (
<div className="content">
<span className="text">{todo.text}</span>
<small className="time">{new Date(todo.createdAt).toLocaleString()}</small>
</div>
)}
</div>

{editingId !== todo.id && (
<div className="actions">
<button onClick={() => startEdit(todo)}>Edit</button>
<button onClick={() => removeTodo(todo.id)} className="danger">Delete</button>
</div>
)}
</article>
))}
</section>
</main>


<footer>
<small className="muted">Developed By: Umar Hasnain</small>
</footer>
</div>
)
}