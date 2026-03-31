import Loader from '../../components/Loader'
import type { Todo } from './TodoStore'
import TodoItem from './TodoItem'

type TodoListProps = {
  todos: Todo[]
  loading: boolean
  onEdit: (todo: Todo) => void
  onDelete: (id: number) => void
  onToggleComplete: (id: number, completed: boolean) => void
}

export default function TodoList({
  todos,
  loading,
  onEdit,
  onDelete,
  onToggleComplete
}: TodoListProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-[var(--paper-300)] bg-white p-4 text-center">
        <Loader />
      </div>
    )
  }

  if (!todos.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--paper-400)] bg-[var(--paper-100)] p-8 text-center text-[var(--ink-600)]">
        No todos yet. Add your first task to get momentum.
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  )
}
