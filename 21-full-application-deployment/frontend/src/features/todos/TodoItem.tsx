import { FiCheckCircle, FiCircle, FiEdit2, FiTrash2 } from 'react-icons/fi'

import IconButton from '../../components/IconButton'
import type { Todo } from './TodoStore'
import { formatDate } from '../../utils/helpers'

type TodoItemProps = {
  todo: Todo
  onEdit: (todo: Todo) => void
  onDelete: (id: number) => void
  onToggleComplete: (id: number, completed: boolean) => void
}

export default function TodoItem({ todo, onEdit, onDelete, onToggleComplete }: TodoItemProps) {
  return (
    <li className="group relative overflow-hidden rounded-2xl border border-[var(--paper-300)] bg-white p-4 shadow-[0_18px_36px_-28px_rgba(0,0,0,0.45)] transition hover:-translate-y-0.5">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--brand-500)] to-[var(--accent-500)] opacity-75" />
      <div className="flex items-start justify-between gap-3 pt-1">
        <div className="space-y-1">
          <h3
            className={`text-lg font-semibold tracking-tight ${
              todo.completed ? 'text-[var(--ink-500)] line-through' : 'text-[var(--ink-900)]'
            }`}
          >
            {todo.title}
          </h3>
          <p className="text-sm text-[var(--ink-600)]">{todo.description || 'No description provided.'}</p>
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--ink-500)]">
            Updated {formatDate(todo.updated_at)}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1 rounded-xl bg-[var(--paper-100)] p-1">
          <IconButton
            label={todo.completed ? 'Mark as pending' : 'Mark as completed'}
            icon={todo.completed ? <FiCheckCircle size={18} /> : <FiCircle size={18} />}
            variant="success"
            onClick={() => onToggleComplete(todo.id, !todo.completed)}
          />
          <IconButton label="Edit todo" icon={<FiEdit2 size={17} />} onClick={() => onEdit(todo)} />
          <IconButton
            label="Delete todo"
            icon={<FiTrash2 size={17} />}
            variant="danger"
            onClick={() => onDelete(todo.id)}
          />
        </div>
      </div>
    </li>
  )
}
