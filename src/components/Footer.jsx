import React from 'react'

const Footer = () => {
  return (
    <footer className='h-40 bg-blue-600'>
        <div className='flex p-5 justify-around text-center'>
            <div className='text-center flex flex-col items-center'>
                <h1 className='text-3xl'>Welcome to work manager</h1>
                <p>hello guys please like and subscribe</p>
            </div>
            <div>
                <h1>
                    <ul>
                        <li>
                            <a href="#!">Facebook</a>
                        </li>
                        <li>
                            <a href="#!">Youtube</a>
                        </li>
                        <li>
                            <a href="#!">Instagram</a>
                        </li>
                    </ul>
                </h1>
            </div>
        </div>
    </footer>
  )
}

export default Footer