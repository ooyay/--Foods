export const FoodCard = ({ item: { data, status = 'none' } }) => (
  <article
    style={{
      backgroundImage: `
      linear-gradient(
        30deg,
        rgba(255, 255, 255, .9) 30%,
        rgba(255, 255, 255, 0)
      ),
      url(${data?.imageUrl?.iv})`,
    }}
    className={`px-6 pt-16 bg-zinc-400 pb-4 hover:bg-blend-multiply hover:text-white rounded relative bg-center ${
      status == 'none' && 'opacity-20'
    }`}
  >
    <h3 className='text-xl font-bold'>{data.name.iv}</h3>
    <p>{data.description.iv}</p>

    {status == 'Published' && (
      <span className='absolute top-0 right-0 p-2'>✅</span>
    )}
  </article>
)
