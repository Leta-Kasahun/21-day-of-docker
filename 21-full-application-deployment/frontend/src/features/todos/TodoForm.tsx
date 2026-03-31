import { useEffect, useState, type FormEvent } from 'react'

import Button from '../../components/Button'
import Input from '../../components/Input'
import type { Todo } from './TodoStore'
import { cleanText } from '../../utils/helpers'

type TodoFormProps = {
  editingTodo: Todo | null
  loading: boolean
  onSubmit: (payload: { title: string; description?: string }) => Promise<void>
  onUpdate: (id: number, payload: { title: string; description?: string }) => Promise<void>
  onCancelEdit: () => void
}

export default function TodoForm({
  editingTodo,
  loading,
  onSubmit,
  onUpdate,
  onCancelEdit
}: TodoFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title)
      setDescription(editingTodo.description ?? '')
      return
    }

    setTitle('')
    setDescription('')
  }, [editingTodo])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const cleanedTitle = cleanText(title)
    const cleanedDescription = cleanText(description)

    if (!cleanedTitle) {
      setError('Title is required.')
      return
    }

    setError('')

    if (editingTodo) {
      await onUpdate(editingTodo.id, {
        title: cleanedTitle,
        description: cleanedDescription || undefined
      })
      return
    }

    await onSubmit({
      title: cleanedTitle,
      description: cleanedDescription || undefined
    })

    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 rounded-2xl border border-[var(--paper-300)] bg-white p-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
      <Input
        label="Title"
        name="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Ship release notes"
        error={error}
      />
      <Input
        label="Description"
        name="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Optional details"
      />
      <div className="flex gap-2 md:pb-0.5">
        <Button type="submit" disabled={loading} className="w-full md:w-auto">
          {editingTodo ? 'Save changes' : 'Add todo'}
        </Button>
        {editingTodo ? (
          <Button variant="ghost" onClick={onCancelEdit} disabled={loading}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  )
}
