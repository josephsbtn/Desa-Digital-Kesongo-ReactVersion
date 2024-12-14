import React from 'react'

function home() {
  return (
    <section className="bg-white py-10 dark:bg-dark flex flex-col items-center space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Welcome to the Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your data with ease
        </p>
        
      </div>
    </section>
  )
}

export default home