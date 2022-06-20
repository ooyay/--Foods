import { useEffect, useState } from 'react'
import { FoodCard } from './components/FoodCard'
import { Modal } from './components/Modal'
import { Toast } from './components/Toast'

const FOODS_GET_API =
  'https://cms.trustit-co.com/api/content/hello-world/foods/'

const App = () => {
  const [foods, setFoods] = useState([])
  const [isModal, setIsModal] = useState(false)
  const [hasToast, setHasToast] = useState(null)

  useEffect(() => {
    fetch(FOODS_GET_API, {
      Authorization: 'Bearer  {}',
    })
      .then((res) => res.json())
      .then((data) => {
        setFoods(data.items)
        console.log(data.items)
        setHasToast('🎉🎉 Data has fetched !!')
      })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setHasToast(null)
    }, 3000)
  }, [hasToast])

  return (
    <main>
      <h1 className='text-2xl text-center p-4'>🍕🍕🍕🍕🍕🍕</h1>

      <div className='container mx-auto px-4 max-w-[768px]'>
        <section className='text-center my-4'>
          <button
            className='p-2 px-8 w-full sm:w-auto bg-gradient-to-r from-indigo-400 to-red-400 text-white rounded'
            onClick={() => setIsModal(true)}
          >
            Add Food
          </button>
        </section>

        <section className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
          {foods.length
            ? foods.map((item) => <FoodCard key={item.id} item={item} />)
            : [1, 2, 3].map((i) => (
                <FoodCard
                  key={i}
                  item={{
                    data: {
                      name: { iv: '🍕🍕' },
                      description: { iv: '🍕🍕🍕🍕🍕🍕' },
                    },
                  }}
                />
              ))}
        </section>
      </div>
      {isModal && (
        <Modal
          setFoods={setFoods}
          setIsModal={setIsModal}
          setHasToast={setHasToast}
        />
      )}
      {hasToast && <Toast mess={hasToast} />}
    </main>
  )
}

export default App
