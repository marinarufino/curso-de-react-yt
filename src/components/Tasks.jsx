import { ChevronRightIcon, TrashIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Button from "./Button"

function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {
    const navigate = useNavigate()

    function onSeeDetailsClick(task) {
        const query = new URLSearchParams()
        query.set("title", task.title)
        query.set("description", task.description)
        navigate(`/task?${query.toString()}`)
    }
    
    return (
        <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
            {tasks.map((task) => (
                <li key={task.id} className="flex gap-2 h-10"> {/* Altura fixa para alinhamento */}
                    <button
                        onClick={() => onTaskClick(task.id)}
                        className={`bg-slate-400 text-white px-4 py-2 rounded-md ${
                            task.isCompleted ? 'line-through' : ''
                        } flex-1 h-full text-left truncate`}
                    >
                        {task.title}
                    </button>

                    <Button 
                        onClick={() => onSeeDetailsClick(task)}
                        className="h-full" // Herda a altura do container
                        aria-label="Ver detalhes"
                    >
                        <ChevronRightIcon className="w-4 h-4" />
                    </Button>
                    
                    <Button 
                        onClick={() => onDeleteTaskClick(task.id)}
                        className="h-full" // Herda a altura do container
                        aria-label="Excluir tarefa"
                    >
                        <TrashIcon className="w-4 h-4" />
                    </Button>
                </li>
            ))}
        </ul>
    )
}

export default Tasks