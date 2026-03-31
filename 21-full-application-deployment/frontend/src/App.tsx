import { useEffect, useState } from 'react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'

import Button from './components/Button'
import TodoForm from './features/todos/TodoForm'
import TodoList from './features/todos/TodoList'
import { useTheme } from './hooks/useTheme'
import { useTodos } from './hooks/useTodos'

type FilterKey = 'all' | 'completed' | 'pending'

function App() {
  const {
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
  } = useTodos()

  const { theme, toggleTheme } = useTheme()
  const [filter, setFilter] = useState<FilterKey>('all')

  useEffect(() => {
    const completedMap: Record<FilterKey, boolean | undefined> = {
      all: undefined,
      completed: true,
      pending: false
    }

    void fetchTodos(completedMap[filter])
  }, [fetchTodos, filter])

  const todoPanel = (
    <>
      <TodoForm
        editingTodo={editingTodo}
        loading={loading}
        onSubmit={addTodo}
        onUpdate={updateTodo}
        onCancelEdit={() => setEditingTodo(null)}
      />

      <section className="space-y-4 rounded-3xl border border-[var(--paper-300)] bg-white/85 p-4 backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant={filter === 'all' ? 'primary' : 'ghost'} onClick={() => setFilter('all')}>
            All
          </Button>
          <Button
            variant={filter === 'completed' ? 'primary' : 'ghost'}
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
          <Button
            variant={filter === 'pending' ? 'primary' : 'ghost'}
            onClick={() => setFilter('pending')}
          >
            Pending
          </Button>
        </div>

        {error ? <p className="rounded-xl bg-[#f9ddd5] px-4 py-3 text-sm text-[#b83a22]">{error}</p> : null}

        <TodoList
          todos={todos}
          loading={loading}
          onEdit={setEditingTodo}
          onDelete={removeTodo}
          onToggleComplete={toggleComplete}
        />
      </section>
    </>
  )

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_0%_0%,#ffe4cd_0%,transparent_40%),radial-gradient(circle_at_90%_20%,#ffdca0_0%,transparent_32%),var(--paper-50)] px-4 py-8 text-[var(--ink-900)] sm:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="rounded-3xl border border-[var(--paper-300)] bg-white/85 p-6 backdrop-blur-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink-500)]">
                Feature-Based Todo App
              </p>
              <h1 className="font-display text-4xl leading-tight tracking-tight">Plan boldly. Execute daily.</h1>
            </div>
            <Button variant="secondary" onClick={toggleTheme}>
              Theme: {theme}
            </Button>
          </div>

          <nav className="mt-4 flex items-center gap-2 text-sm font-semibold">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 transition ${isActive ? 'bg-[var(--paper-200)] text-[var(--ink-900)]' : 'text-[var(--ink-600)] hover:bg-[var(--paper-100)]'}`
              }
            >
              Todos
            </NavLink>
            <NavLink
              to="/insights"
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 transition ${isActive ? 'bg-[var(--paper-200)] text-[var(--ink-900)]' : 'text-[var(--ink-600)] hover:bg-[var(--paper-100)]'}`
              }
            >
              Insights
            </NavLink>
          </nav>

          <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm font-semibold">
            <div className="rounded-xl bg-[var(--paper-100)] px-2 py-3">Total: {counts.total}</div>
            <div className="rounded-xl bg-[#daf2e8] px-2 py-3 text-[#2f6f4f]">Done: {counts.completed}</div>
            <div className="rounded-xl bg-[#f9ddd5] px-2 py-3 text-[#b83a22]">Pending: {counts.pending}</div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={todoPanel} />
          <Route
            path="/insights"
            element={
              <section className="rounded-3xl border border-[var(--paper-300)] bg-white/85 p-6 backdrop-blur-sm">
                <h2 className="font-display text-2xl">Productivity Snapshot</h2>
                <p className="mt-2 text-[var(--ink-600)]">
                  You have {counts.pending} pending task(s) and {counts.completed} completed task(s).
                </p>
              </section>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </main>
  )
}

export default App
