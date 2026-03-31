import { useMemo } from 'react'

import { useTodoStore } from '../features/todos/TodoStore'

export function useTodos() {
  const todos = useTodoStore((state) => state.todos)
  const loading = useTodoStore((state) => state.loading)
  const error = useTodoStore((state) => state.error)
  const editingTodo = useTodoStore((state) => state.editingTodo)
  const fetchTodos = useTodoStore((state) => state.fetchTodos)
  const addTodo = useTodoStore((state) => state.addTodo)
  const updateTodo = useTodoStore((state) => state.updateTodo)
  const removeTodo = useTodoStore((state) => state.removeTodo)
  const setEditingTodo = useTodoStore((state) => state.setEditingTodo)
  const toggleComplete = useTodoStore((state) => state.toggleComplete)

  const counts = useMemo(() => {
    const completed = todos.filter((todo) => todo.completed).length
    const pending = todos.length - completed
    return { total: todos.length, completed, pending }
  }, [todos])

  return {
    todos,
    loading,
    error,
    editingTodo,
    counts,
    fetchTodos,
    addTodo,
    updateTodo,
    removeTodo,
    setEditingTodo,
    toggleComplete
  }
}
