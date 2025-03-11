import React, { useState } from 'react'
import NoCodeForm from './NoCodeForm'
import UICreator from './UICreator'

export default function NoCodeBuilderDashboard() {
  const [showUICreator, setShowUICreator] = useState(false)
  const [formData, setFormData] = useState(null)

  const handleFormSubmit = (data) => {
    setFormData(data)
    setShowUICreator(true)
  }

  return (
    <div>
      {!showUICreator ? (
        <NoCodeForm onSubmit={handleFormSubmit} />
      ) : (
        <UICreator formData={formData} />
      )}
    </div>
  )
}