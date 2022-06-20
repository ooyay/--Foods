import { useState } from 'react'

const FOODS_POST_API =
  'https://cms.trustit-co.com/api/content/hello-world/foods'

export const Modal = ({ setIsModal, setFoods, setHasToast }) => {
  const [thumbnail, setThumbnail] = useState(null)
  const [name, setName] = useState(null)
  const [desc, setDesc] = useState(null)
  const [err, setErr] = useState(false)

  function setImg({ target }) {
    const [file] = target?.files
    setThumbnail(URL.createObjectURL(file))
  }

  async function addItem() {
    if (!name || !desc || !thumbnail) {
      setErr(true)
      return
    }

    const res = await fetch(FOODS_POST_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: {
          iv: name,
        },
        description: { iv: desc },
        imageUrl: {
          iv: thumbnail,
        },
      }),
    })

    const data = await res.json()

    setErr(false)
    setIsModal(false)
    setFoods((foods) => [data, ...foods])
    setHasToast('🎉🎉 New Product has been created !!')
  }

  return (
    <section className='fixed inset-0 w-full h-full bg-zinc-900 bg-opacity-60 grid place-content-center'>
      <div className='bg-zinc-300 w-[calc(100vw_-_2rem)] sm:w-96 rounded-md relative'>
        <h2 className='text-xl font-semibold p-4'>
          <span className='text-3xl'>🍟</span> Add New Food..
        </h2>

        <section className='flex flex-col p-4'>
          <label className='flex flex-col'>
            <span className='text-zinc-900 p-1'>Enter Food's Name</span>
            <input
              className='p-3 py-2 rounded'
              placeholder='Pizza 🍕'
              type='text'
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className='flex flex-col'>
            <span className='text-zinc-900 p-1'>Enter Food's Description</span>
            <input
              className='p-3 py-2 rounded'
              placeholder='Info about Pizza 🍕'
              type='text'
              onChange={(e) => setDesc(e.target.value)}
            />
          </label>

          <label className='flex flex-col mb-2'>
            <span className='text-zinc-900 p-1'>Add Image</span>
            <input type='file' onChange={(e) => setImg(e)} />
          </label>

          {thumbnail && (
            <img
              className='rounded-md w-full object-cover max-h-40'
              src={thumbnail}
            />
          )}

          {err && <p className='text-red-600 mt-2'>complete all fields..</p>}
          <button
            className='p-2 px-8 bg-gradient-to-r from-red-400 to-indigo-500 text-white mt-1 rounded-md'
            onClick={() => addItem()}
          >
            Publish
          </button>
        </section>

        <button
          className='absolute top-0 right-0 m-2 p-2 px-4 rounded-md text-white bg-red-500 hover:bg-red-700'
          onClick={() => {
            setIsModal(false)
          }}
        >
          Close
        </button>
      </div>
    </section>
  )
}
