import { useEffect, useState } from "react"
import AddTask from "./components/AddTask"
import Tasks from "./components/Tasks"
import { v4 } from "uuid"
import Title from "./components/Title"

function App() {
  const[tasks, setTasks]= useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  )
  

useEffect(()=>{
  localStorage.setItem("tasks", JSON.stringify(tasks))
}, [tasks])

//useEffect(()=>{
  const fetchTasks = async()=>{
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=10",{
        method: "GET",
      }
    )
    const data = await response.json()

    setTasks(data)
  }

  //se eu quisesse, poderia chamar uma api para pegar as tarefas, nesse caso nao vou precisar usar
  //fetchTasks()
//}, [])


function onTaskClick(taskId){
  const newTasks = tasks.map(task=>{
    if(task.id===taskId){
      return{...task, isCompleted: !task.isCompleted}
    }
    return task
  })
  setTasks(newTasks)
}

function onAddTaskSubimit(title, description){
  const newTask ={
    id: v4(),
    title: title,
    description: description,
    isCompleted: false,
  }
  setTasks([...tasks, newTask])

}

function onDeleteTaskClick(taskId){
  const newTasks = tasks.filter(task =>task.id!== taskId)
  setTasks(newTasks)
}

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de tarefas</Title>
        <AddTask onAddTaskSubimit={onAddTaskSubimit} />
        <Tasks tasks = {tasks} onTaskClick={onTaskClick} onDeleteTaskClick={onDeleteTaskClick}/>
      </div>
    </div>
  )

}

export default App