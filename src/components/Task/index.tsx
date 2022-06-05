import { Trash } from 'phosphor-react'
import { TaskProps } from '../../App'
import styles from './Task.module.css'

interface Props extends TaskProps {
  onDeleteTask: (id: number) => void
  onCompleteTask: (id: number) => void
}

export function Task ({ description, completed, id, onDeleteTask, onCompleteTask }: Props): JSX.Element {
  function deleteTask () {
    onDeleteTask(id)
  }

  function completeTask () {
    onCompleteTask(id)
  }

  return (
    <div className={styles.task}>
      <div className={styles.taskStart}>
        <input type="checkbox" name="completed" onChange={completeTask} />

        <p className={completed ? styles.taskCompleted : styles.taskNotCompleted}>{description}</p>
      </div>

      <button onClick={deleteTask}>
        <Trash size={20}/>
      </button>
    </div>
  )
}