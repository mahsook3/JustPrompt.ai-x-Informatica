'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from '../components/Loading'

export default function Account() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    location: '',
    phoneNumber: '',
    email: '',
    businessName: '',
    website: '',
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const userEmail = localStorage.getItem('userEmail')

  useEffect(() => {
    if (userEmail) {
      axios
        .get(`https://cross-intelligence-50023657941.development.catalystappsail.in/user-details/${userEmail}`)
        .then((response) => {
          if (response.data.success) {
            setFormData(response.data.user)
          } else if (response.data.message === 'User not found') {
            setFormData({ ...formData, email: userEmail })
          }
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching user details:', error)
          toast.error('Failed to fetch details')
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [userEmail])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)

    axios
      .patch(`http://localhost:8080/user-details/${formData.email}`, formData)
      .then((response) => {
        if (response.data.success) {
          toast.success('Your details updated successfully')
        } else if (response.data.message === 'User not found') {
          axios
            .post('http://localhost:8080/user-details', formData)
            .then((response) => {
              if (response.data.success) {
                toast.success('Congratulations! Your account has been successfully created')
              } else {
                toast.error(response.data.message)
              }
            })
            .catch((error) => {
              console.error('Error creating user:', error)
              toast.error('Failed to create user details')
            })
        } else {
          toast.error(response.data.message)
        }
      })
      .catch((error) => {
        console.error('Error saving user details:', error)
        toast.error('Failed to update user details')
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  if (loading) return <Loading />

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <ToastContainer />
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Account Details</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {[
            { name: 'firstName', label: 'First Name', type: 'text' },
            { name: 'lastName', label: 'Last Name', type: 'text' },
            { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
            { name: 'gender', label: 'Gender', type: 'text' },
            { name: 'location', label: 'Location', type: 'text' },
            { name: 'phoneNumber', label: 'Phone Number', type: 'tel' },
            { name: 'email', label: 'Email', type: 'email', disabled: true },
            { name: 'businessName', label: 'Business Name', type: 'text' },
            { name: 'website', label: 'Website', type: 'url' },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label htmlFor={field.name} className="text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                disabled={field.disabled}
              />
            </div>
          ))}
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="inline-block animate-spin mr-2">&#9696;</span>
                Saving...
              </>
            ) : (
              'Save Details'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

