import axios from 'axios'
import { create } from 'zustand'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

type Todo = {
  id: number
  title: string
  description: string | null
  completed: boolean
  created_at: string
  updated_at: string
}

type TodoPayload = {
  title: string
  description?: string
}

type TodoPatch = {
  title?: string
  description?: string
  completed?: boolean
}

type TodoState = {
  todos: Todo[]
  loading: boolean
  error: string | null
  editingTodo: Todo | null
  fetchTodos: (completed?: boolean) => Promise<void>
  addTodo: (payload: TodoPayload) => Promise<void>
  updateTodo: (id: number, payload: TodoPatch) => Promise<void>
  removeTodo: (id: number) => Promise<void>
  setEditingTodo: (todo: Todo | null) => void
  toggleComplete: (id: number, completed: boolean) => Promise<void>
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
})

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  loading: false,
  error: null,
  editingTodo: null,

  fetchTodos: async (completed) => {
    set({ loading: true, error: null })
    try {
      const params = completed === undefined ? {} : { completed }
      const { data } = await api.get<Todo[]>('/todos', { params })
      set({ todos: data, loading: false })
    } catch {
      set({ loading: false, error: 'Unable to load todos right now.' })
    }
  },

  addTodo: async (payload) => {
    set({ loading: true, error: null })
    try {
      const { data } = await api.post<Todo>('/todos', payload)
      set((state) => ({
        todos: [...state.todos, data],
        loading: false,
        editingTodo: null
      }))
    } catch {
      set({ loading: false, error: 'Unable to create todo.' })
    }
  },

  updateTodo: async (id, payload) => {
    set({ loading: true, error: null })
    try {
      const { data } = await api.put<Todo>(`/todos/${id}`, payload)
      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? data : todo)),
        loading: false,
        editingTodo: null
      }))
    } catch {
      set({ loading: false, error: 'Unable to update todo.' })
    }
  },

  removeTodo: async (id) => {
    set({ loading: true, error: null })
    try {
      await api.delete(`/todos/${id}`)
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
        loading: false,
        editingTodo: state.editingTodo?.id === id ? null : state.editingTodo
      }))
    } catch {
      set({ loading: false, error: 'Unable to delete todo.' })
    }
  },

  setEditingTodo: (todo) => set({ editingTodo: todo }),

  toggleComplete: async (id, completed) => {
    set({ loading: true, error: null })
    try {
      const { data } = await api.put<Todo>(`/todos/${id}`, { completed })
      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? data : todo)),
        loading: false
      }))
    } catch {
      set({ loading: false, error: 'Unable to update completion status.' })
    }
  }
}))

export type { Todo, TodoPatch, TodoPayload }
