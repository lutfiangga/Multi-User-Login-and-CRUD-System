import Card from "./card"

const Content = () => (
  <main className='p-4 lg:py-4 lg:pr-4 grid grid-cols-1 lg:grid-cols-4 gap-4'>
    <Card title='Earnings' value='$340.5' />
    <Card title='Spend this month' value='$642.39' />
    <Card title='Sales' value='$574.34' />
    <Card title='Your Balance' value='$1,000' />

    <div className='lg:col-span-2 bg-white p-4 rounded-md shadow-sm'>
      <h2 className='font-semibold mb-2'>This month</h2>
      <div className='w-full h-32 bg-gray-100'></div>
    </div>
    <div className='lg:col-span-2 bg-white p-4 rounded-md shadow-sm'>
      <h2 className='font-semibold mb-2'>Weekly Revenue</h2>
      <div className='w-full h-32 bg-gray-100'></div>
    </div>
    <div className='lg:col-span-4 bg-white p-4 rounded-md shadow-sm'>
      <h2 className='font-semibold mb-2'>Check Table</h2>
      <div className='overflow-x-auto'>
        <table className='w-full text-left'>
          <thead>
            <tr>
              <th className='p-2'>Name</th>
              <th className='p-2'>Progress</th>
              <th className='p-2'>Quantity</th>
              <th className='p-2'>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='p-2'>Marketplace</td>
              <td className='p-2'>75.5%</td>
              <td className='p-2'>2458</td>
              <td className='p-2'>Apr 26, 2022</td>
            </tr>
            <tr>
              <td className='p-2'>Venus DB PRO</td>
              <td className='p-2'>35.4%</td>
              <td className='p-2'>1485</td>
              <td className='p-2'>Jul 20, 2022</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
)

export default Content
