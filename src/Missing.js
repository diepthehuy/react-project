import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main className='Missing'>
        <h1 style={{color:"red"}}>Error!</h1>
        <p>Page not found</p>
        <p>
          <Link to="/">Back to HomePage</Link>
        </p>
    </main>
  )
}

export default Missing