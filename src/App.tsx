import { ChangeEvent, FormEvent, useState } from 'react'
import { PlusCircle } from 'phosphor-react'

import { Header } from "./components/Header";
import { Task } from './components/Task';

import styles from './App.module.css'

import clipboard from './assets/clipboard.svg';

export interface TaskProps {
  id: number
  description: string
  completed: boolean
}

export function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>('')
  const [tasks, setTasks] = useState<TaskProps[]>([])

  function handleAddNewTask (e: FormEvent) {
    e.preventDefault()

    setTasks([...tasks, { id: Math.random(), description: newTask, completed: false }])
    setNewTask('')
  }

  function handleNewTask (e: ChangeEvent<HTMLInputElement>) {
    e.target.setCustomValidity('')
    setNewTask(e.target.value)
  }

  function onCustomInvalid (e: ChangeEvent<HTMLInputElement>) {
    e.target.setCustomValidity('A descrição é obrigatória')
  }

  function handleDeleteTask (id: number) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  function handleCompleteTask (id: number) {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <form className={styles.newTask} onSubmit={handleAddNewTask}>
          <input type="text" placeholder="Adicione uma nova tarefa" name="description" onChange={handleNewTask} required value={newTask} onInvalid={onCustomInvalid} />
          <button type="submit">Criar <PlusCircle size={20}/></button>
        </form>

        <div className={styles.heading}>
          <p>Tarefas criadas <span>{tasks.length}</span></p>

          <p className={styles.headingBlue}>Concluídas <span>{tasks.length ? `${tasks.filter(task => task.completed).length} de ${tasks.length}` : tasks.length}</span></p>          
        </div>

        {tasks.length ? tasks.map(task => (
          <Task 
            key={task.id} 
            {...task} 
            onDeleteTask={handleDeleteTask}
            onCompleteTask={handleCompleteTask}
          />
        )) : (
          
          <div className={styles.noTasks}>
            <img src={clipboard} alt="Clipboard icon" />
            <div className={styles.noTasksTexts}>
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
