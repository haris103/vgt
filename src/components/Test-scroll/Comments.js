import React from 'react'

function Comments({item: { id, email, body }}) {
  return (
    <div>
        <div class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-5" >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Id : {id}</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">{email}</p>
            <p class="font-normal text-gray-700 dark:text-gray-400">{body}</p>
        </div>
    </div>
  )
}

export default Comments;