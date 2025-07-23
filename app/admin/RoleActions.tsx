'use client'

import { useState } from 'react'
import { setRole, removeRole } from './_actions'

export function RoleActions({ userId, currentRole }: { userId: string, currentRole?: string }) {
  const [message, setMessage] = useState<string | null>(null)

  async function handleSetRole(role: string) {
    const formData = new FormData()
    formData.append('id', userId)
    formData.append('role', role)
    await setRole(formData)
    setMessage(`Role set to ${role}`)
  }

  async function handleRemoveRole() {
    const formData = new FormData()
    formData.append('id', userId)
    await removeRole(formData)
    setMessage('Role removed')
  }

  return (
    <div>
      <div>Current role: {currentRole || 'none'}</div>
      <button onClick={() => handleSetRole('admin')}>Make Admin</button>
      <button onClick={() => handleSetRole('moderator')}>Make Moderator</button>
      <button onClick={handleRemoveRole}>Remove Role</button>
      {message && <div style={{ color: 'green' }}>{message}</div>}
    </div>
  )
}