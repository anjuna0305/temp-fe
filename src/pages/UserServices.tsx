import MinimulNavbar from '../components/MinimulNavbar'
import PurchasedApiCard from '../components/PurchasedApiCard'

const UserServices = () => {
  return (
    <>
      <MinimulNavbar />
      <div className="container mt-5">
        <section>
          <h2>Available APIs</h2>
          <div className='row mt-5'>
            <div className="col-4"><PurchasedApiCard /></div>
            <div className="col-4"><PurchasedApiCard /></div>
          </div>
        </section>
      </div>
    </>
  )
}

export default UserServices

