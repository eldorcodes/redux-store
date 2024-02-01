import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataAsync, search } from '../redux/Book';

export default function Book() {
  const dispatch = useDispatch();

  const [name,setName] = useState('');
  

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(fetchDataAsync(name))
  },[name]);

  const bookData = useSelector((state) => {
    console.log('state',state)
    return state.book.bookData
  });

  console.log('bookData',bookData)

  return (
    <div>
        <h1>Book finder</h1>
        <form onSubmit={handleSubmit}>
          <input 
          type="text" 
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter book name' />
          <button type='submit'>Find</button>
        </form>
        {
          bookData?.map((book,index) => (
            <div key={index}>
              <h1>{book?.volumeInfo?.title}</h1>
              <h3>{book?.volumeInfo?.subtitle}</h3>
              <p>{book?.volumeInfo?.description}</p>
            </div>
          ))
        }
    </div>
  )
}
