import React from 'react'

export default function Loading() {
  return (
<div className="max-w-4xl mx-auto px-4 py-8">
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-gray-300 rounded w-2/3" />
    <div className="h-4 bg-gray-300 rounded" />
    <div className="h-4 bg-gray-300 rounded" />
    <div className="h-4 bg-gray-300 rounded w-1/2" />
    <div className="h-4 bg-gray-300 rounded" />
    <div className="h-4 bg-gray-300 rounded" />
    <div className="h-4 bg-gray-300 rounded w-3/4" />
  </div>
  <div className="animate-pulse space-y-4 mt-12">
    <div className="h-4 bg-gray-300 rounded w-2/3" />
    <div className="h-4 bg-gray-300 rounded" />
    <div className="h-4 bg-gray-300 rounded" />
    <div className="h-4 bg-gray-300 rounded w-1/2" />
    <div className="h-4 bg-gray-300 rounded" />
    <div className="h-4 bg-gray-300 rounded" />
  </div>
</div>
  )
}
