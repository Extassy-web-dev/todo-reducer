import { useEffect, useReducer } from 'react'
import { deleteData, getData, patchData, postData } from "./hooks/http.hook.js"
import { reducer } from "./hooks/reducer.js"
import TodoElem from './components/TodoElem.jsx'

const initialState = {
  todos: [],
  inputVal: ""
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { todos, inp_value } = state


  useEffect(() => {
    getData("todos")
      .then(res => dispatch({ type: 'SET_TODOS', payload: res }))
  }, [])


  function handleSubmit(e) {
    e.preventDefault()
    const value = new FormData(e.target).get("title")

    const newTask = {
      id: (Math.random() * 10000).toFixed(0),
      task: value,
      isCompleted: false,
    }


    postData("todos", newTask)
      .then(res => {
        dispatch({ type: 'ADD_TODO', payload: res })
      })
  }

  function toggleTodo(id) {
    const task = todos.filter(item => item.id === id)
    const updatedTask = { ...task, isCompleted: !task.isCompleted }

    patchData(`todos/${id}`, updatedTask)
      .then(() => {
        dispatch({ type: 'TOGGLE_TODO', payload: id })
      })
  }

  function deleteTodo(id) {
    deleteData(`todos/${id}`)
      .then(() => {
        dispatch({ type: 'DELETE_TODO', payload: id })
      })
  }

  function changeTodo(id) {
    const newvalue = prompt('Изменить')
    if (newvalue) {
      const updatedTask = { task: newvalue }

      patchData(`todos/${id}`, updatedTask)
        .then(() => {
          dispatch({ type: 'UPDATE_TODO', payload: { id, newTask: newvalue } })
        })
    }
  }


  return (
    <>
      <div className="main">
        <div className="container">
          <div className="box flex flex-col items-center pt-[70px] px-[20px]  ">
            <h1 className='text-[38px] font-[700]'>Todo List</h1>
            <form onSubmit={handleSubmit} className='flex items-center justify-center gap-5 py-[25px]'>
              <input
                type="text"
                name="title"
                value={inp_value}
                className='w-[321px] h-[42px] rounded-[10px] border-[#007FFF] border-[2px] border-solid outline-none p-[20px]'
                placeholder="Ведите..."
                required />
              <button type='submit' className='submit-btn'>Add</button>
            </form>
            <div className="line h-[1px] w-full  bg-black"></div>
            <div className="box-todo grid grid-cols-3 gap-[20px] py-[20px]">
              {
                todos.map(item => <TodoElem
                  key={item.id}
                  item={item}
                  deleteFunc={deleteTodo}
                  change={changeTodo}
                  toggle={toggleTodo}

                />)
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App