import React, {useState, useEffect} from 'react'
import Mine from "./Mine"
import classes from "./Initializer.module.css"
const Initializer = () => {
    const [tasks, setTasks]=useState([]);
  const [val, setValue]=useState('')
  const [count, setCount]=useState(6);
  
  useEffect(() => {
    const stored = localStorage.getItem("names");
    if (stored) {
      setTasks(JSON.parse(stored));
       const completed = JSON.parse(stored).filter(task => task.complete).length;
      setCount(completed);
    }
  }, []);
  const Handle=()=>{
    if(val.trim()===""){
      alert("not good")
    }
 const Task={
  name:val,
  complete:false
 }
        const update=[...tasks, Task];
        setTasks(update)
        localStorage.setItem("names", JSON.stringify(update))
       setValue('')
    }
  const Handler=(index)=>{
    const updated=[...tasks]
    const task = updated[index];
   task.complete = !task.complete;
    setTasks(updated);
    localStorage.setItem("names", JSON.stringify(updated));
    if (task.complete) {
      setCount(prevCount => prevCount + 1);
    } else {
      setCount(prevCount => prevCount - 1);
    }
  }
  return (
    <div>
    <input type='text' value={val} onChange={(e)=>setValue(e.target.value)}/>
     <button onClick={Handle}>Add</button>
    <div className={classes.Tasks}> {
      tasks.map((item, index)=>(
        
           <li key={index}><span>{item.name}-{item.complete ? "Done" : "Pending"}</span>
            <button onClick={() => Handler(index)}>
              {item.complete ? "Undo" : "Finish"}
            </button></li>

      ))
     }
     </div>
    <Mine tasknum={count} tasknum2={5} tasknum3={7}/>
    </div>
  )
}

export default Initializer