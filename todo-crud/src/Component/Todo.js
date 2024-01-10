import React, { useState, useRef, useEffect } from 'react'
import './Todo.css'
import { IoMdDoneAll } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi';

function Todo() {

    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [editId,setEditId] = useState(0)


    const handleSubmit = (e) => {
        e.preventDefault();
    }


    const addTodo = () => {
        if(todo !== ''){
            setTodos([...todos, {list : todo , id:Date.now() , status:false }])
            console.log(todos)
            setTodo('')
        }
        if(editId){
            const editTodo = todos.find((todo) => todo.id == editId)
            const updateTodo = todos.map((to) =>to.id === editTodo.id
            ? (to = {id : to.id , list : todo})
            : (to = {id : to.id , list : to.list}))
            setTodos(updateTodo)
            setEditId(0)
            setTodo('')
        }       
    }

    const inputRef = useRef('null')

    useEffect(() => {
        // console.log(inputRef.current)
        inputRef.current.focus()
    });


    const onDelete = (id) =>{
        setTodos(todos.filter((to) => to.id !== id))
    }


    const onComplete = (id) =>{
         let complete = todos.map((datas) =>{

            if(datas.id === id){
                return({...datas , status :  !datas.status})
            }
            return datas

    });
    setTodos(complete)
   }


    const onEdit = (id) =>{
      const editTodo =  todos.find((data) => data.id === id)
    //   console.log('edit id :'+editTodo.list)
      setTodo(editTodo.list)
      setEditId(editTodo.id)
      console.log(editTodo)
    }


    return (
        <div className='container'>
            <h2>TODO APP</h2>
            <form className='form-group' onSubmit={handleSubmit}>
                <input type='text' ref={inputRef} value={todo} className='form-control' placeholder='Enter your todos here...' onChange={(event) => setTodo(event.target.value)} />
                {/* {input} */}
                <button onClick={addTodo}> {editId ? 'EDIT' : 'ADD'} </button>
            </form>

            <div className='list'>
                <ul>
                    {
                        todos.map((item) => (
                            <li className='list-items'>
                                <div className='list-item-list' id={item.status? 'list-item' : ''}>{item.list}</div>
                                <span>
                                    <IoMdDoneAll
                                     className='list-item-icons'
                                     id='complete' 
                                     title='Complete' 
                                     onClick={()=>onComplete(item.id)}
                                     />

                                    <FiEdit 
                                    className='list-item-icons' 
                                    id='edit' 
                                    title='Edit' 
                                    onClick={()=>onEdit(item.id)}
                                    />

                                    <MdDelete 
                                    className='list-item-icons' 
                                    id='delete' 
                                    title='Delete' 
                                    onClick={()=>onDelete(item.id)} 
                                    />
                                </span>
                            </li>
                        ))
                    }


                </ul>
            </div>
        </div>
    )
}

export default Todo