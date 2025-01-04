import { useState } from "react";
import {v4 as uuidv4} from 'uuid';
export default function ToDo(){
    let [toDos, setToDos] = useState([{task: "Sample Task", id: uuidv4(),d:false}]);
    let [NewToDo, setNewToDo] = useState([""]);

    function addNew(){
        setToDos([...toDos,{task: NewToDo,id:uuidv4(),d: false }]);
        setNewToDo("");
    }
    function checkNew(event){
        setNewToDo(event.target.value);
    }

    function upperCaseAll(){
        setToDos(
            toDos.map((toDo)=>{
                return{
                    ...toDo,
                    task: toDo.task.toUpperCase(),
                }
            })
        )
    }
    function upperCaseOne(id){
        setToDos(
            toDos.map((toDo)=>{
                if(toDo.id==id){
                    return{
                        ...toDo,
                        task: toDo.task.toUpperCase(),
                    }
                }
                else{
                    return toDo;
                }
            })
        )
    }

    function deleteLi(id){
        setToDos(
            
                    toDos.filter((todo)=>todo.id != id)

        )
        
        
    }
    function markAsDone(id) {
        setToDos(
          toDos.map((toDo) => {
            if (toDo.id === id) {
              return {
                ...toDo,
                d: !toDo.d, 
              };
            }
            return toDo;
          })
        );
      }

    return(
        <div>
            <h3>To Do List</h3>
            <input type="text"  value={NewToDo} placeholder="Add a new task" onChange={checkNew}/>
            <button onClick={addNew}>Add</button>
            <ul>
                { 
                    toDos.map((todo) =>(<li style={{textDecoration: todo.d?"line-through":"none"}} key={todo.id}>{todo.task}<button onClick={()=> upperCaseOne(todo.id)}>UpperCaseOne</button>
                    <button onClick={()=> deleteLi(todo.id)}>Delete</button>
                    <button onClick={() => markAsDone(todo.id)}>
                    {todo.d ? "Undo" : "Done"}
                    </button>
                    </li>))
                }
            </ul>
            <button onClick={upperCaseAll}>UpperCase</button>
        </div>
    )
}