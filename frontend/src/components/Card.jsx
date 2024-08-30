const Card = ({ title, value }) => (
  <div className='lg:col-span-1 bg-white p-4 rounded-md shadow-sm'>
    <div className='flex justify-between items-center'>
      <p>{title}</p>
      <p className='text-xl font-semibold'>{value}</p>
    </div>
  </div>
)

export default Card