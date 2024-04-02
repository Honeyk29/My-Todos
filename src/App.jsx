import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'
import { MdEditNote } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";

function App() {
  const [todo, settodo] = useState("")
  const [Todos, setTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("Todos");
    if(todoString){
      let Todos =  JSON.parse(localStorage.getItem("Todos"));
      setTodos(Todos);
    }
  }, [])

  const saveTols = () => {
    localStorage.setItem("Todos",JSON.stringify(Todos));
  }
  
  

  const handleedit = (e,id)=>{
    let t = Todos.filter(i => i.id===id);
    settodo(t[0].todo)
    let newTodos = Todos.filter(item=>{
      return item.id !== id;
    });
    setTodos(newTodos);
    let index = Todos.findIndex(item=>{
      return item.id === id;
    })
    setTodos(newTodos);
    saveTols();
  }


  const handledelete = (e,id)=>{
    let newTodos = Todos.filter(item=>{
      return item.id !== id;
    });
    setTodos(newTodos);
    saveTols();
    

  }
  const handleadd = ()=>{
    setTodos([...Todos,{id: uuidv4(), todo, isCompleted:false} ])
    settodo("");
    saveTols();
  }


  const handlechange = (e)=>{
    settodo(e.target.value)
  }


  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex(item=>{
      return item.id === id;
    })
    let newtodos = [...Todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos)
    saveTols();
  }
  
  

  return (
    <>
      <Navbar />
      <h1 className='font-bold text-center text-2xl self-center pt-3'>MyTodos - Manage your Todos</h1>
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 w-1/2">
        <div className="addtodo">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange = {handlechange} value = {todo} type="text" className='w-3/4 rounded-full px-5 py-1' />
          <button disabled = {todo.length<=3} onClick = {handleadd} className='bg-purple-600 disabled:bg-purple-400 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Save</button>
        </div>

        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {Todos.length === 0 && <div className='m-5'>No Todos to Display</div>}
          {Todos.map(item=>{

          

           return <div key = {item.id} className="todo flex m-3 justify-between w-3/4">
            <div className='flex gap-3'>
              
            <input name = {item.id} onChange={handlecheckbox} type="checkbox" value={todo.isCompleted}/>
            <div className={item.isCompleted?"line-through":""} >{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick = {(e)=>handleedit(e,item.id)}className='bg-purple-600 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white
              rounded-md mx-1'><MdEditNote /></button>
              <button onClick={(e)=>{handledelete(e, item.id)}} className='bg-purple-600 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white
              rounded-md mx-1'><RiDeleteBin2Fill /></button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
