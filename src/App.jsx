import { useRef, useState } from 'react'

import './App.css'

function App() {
const [todos, setTodos] = useState([]);
const input = useRef();
// const editInput = useRef([]);
const [currentEditId, setCurrentEditId] = useState(null);
const [currentEditText, setCurrentEditText] = useState(null);


const handleEditInputChange = (ev) => setCurrentEditText(ev.target.value);


const handleSubmit = (ev) => {
  ev.preventDefault();
  const todo = {
    text: input.current.value,
    id:  Date.now()
  }   

setTodos([...todos, todo])
input.current.value = "";
}



const handleDelete = (id) => {
const filtered = todos.filter(el => el.id !== id);
setTodos([...filtered]);
}


const handleEdit = (obj, index) => {
    setCurrentEditId(obj.id);
    setCurrentEditText(obj.text);
    // editInput.current.value = obj.text;

    // console.log(editInput)
// editInput.current[index].value = obj.text

}

const handleEditSubmit = (id, index) => {
  const updatedTodos =  todos.map(el => {
    if(el.id === id) {
      return {
        ...el,
        text: currentEditText
      }
    }
    return  el;
  })

  setTodos(updatedTodos);
  setCurrentEditId(null);
  setCurrentEditText("");
  // console.log(editInput);
  // editInput.current[index].value = ""



}





  return (
    <div>
     <div>
        <h1>Todos</h1>
      <form onSubmit={handleSubmit}>
      <input ref={input} />
      <button type='submit'>Add</button>
      </form>
     </div>

      {todos.map((el, index )=> (<div key={el.id}>
        <div>
        {currentEditId === el.id ? <form>
          <input
          value={currentEditText}
          onChange={handleEditInputChange}
          
        
        />
        <button onClick={() => handleEditSubmit(el.id, index)} >update</button>
        </form> : <div>{el.text}</div>}
        <div>
          <button onClick={() => handleEdit(el, index)} >Edit</button>
          <button onClick={() => handleDelete(el.id)}>Delete</button>
        </div>
        </div>
      </div>))}

    </div>
  )
}

export default App
