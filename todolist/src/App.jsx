import { useEffect, useState } from "react";
import axios from 'axios'
import { BsCircleFill, BsFill0CircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';
import './App.css';

function App(){
  const [Todos,setTodos] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:3001/get')
    .then(result=>setTodos(result.data))
    .catch(err=> console.log(err))
  },[])

  const [task,setTask] = useState();

    const handleAdd = ()=>{
        axios.post('http://localhost:3001/add',{task:task})
        .then(result=>{
          location.reload();
          setTask("");
        })
        .catch(err=>console.log(err))
    }

    const handleEdit =(id)=>{
      axios.put('http://localhost:3001/update/'+id)
      .then(result=>{
        location.reload()
      })
      .catch(err=>console.log(err))
    }

    const handleDelete = (id)=>{
      axios.delete('http://localhost:3001/delete/'+id)
      .then(result => {location.reload()})
      .catch(err=>console.log(err))
    }

  return( 
  <div className="Container"> 
    <div className="todo-list">
      <h1>TODO LIST</h1>
    </div>
        <div>
            <input className="input-type" type="text" placeholder="Enter the TASK" onChange={function(e){setTask(e.target.value)}} />
        </div><br/>
        <div>
          {
            Todos.length === 0?
            <div><h2>ENTER THE RECORDS</h2></div>:
            Todos.map(todo=>(
              <div className="task">
                <div className="checkbox" onClick={()=>handleEdit(todo._id)}>
                  {todo.completed?
                  <BsFillCheckCircleFill className="icon"/>
                  :<BsCircleFill className="icon"/>
                  } 
                <p className={todo.completed?"line_through":"Line"}>{todo.task}</p> 
                </div>
                <div>
                  <span><BsFillTrashFill className="icon1" onClick={()=>{handleDelete(todo._id)}}/></span>
                </div>                  
              </div>
            ))
          }
        </div><br></br>
        <div>
            <button className="Primary-btn" onClick={handleAdd}>+ NEW TASK</button>
        </div>
  </div>
  )
}

export default App