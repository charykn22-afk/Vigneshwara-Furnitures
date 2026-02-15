import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import AuthForm from './AuthForm'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    // 1. Get the session status immediately on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // 2. Listen for any changes (Login, Logout, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="container">
      {!session ? (
        <AuthForm />
      ) : (
        <div>
          <h1>Welcome, {session.user.email}</h1>
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        </div>
      )}
    </div>
  )
}

export default App;