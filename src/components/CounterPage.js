import React, { useState } from 'react';
import { addItem, decrement, increment, removeItem, editItem } from '../redux/Counter';
import { useSelector, useDispatch } from 'react-redux';


export default function CounterPage() {
    const [item,setItem] = useState('');
    const [editing,setEditing] = useState(false);
    const [prevItem,setPrevItem] = useState(null);

    const dispatch = useDispatch();

    const count = useSelector((state) => {
        let n = 0
        console.log(state)
        n = state.count.count;
        return n;
    });

    const data = useSelector((state) => {
        return state.count.data;
    });

    class Item {
        constructor(name){
            this.name = name;
            this.date = new Date().toString()
        }
    }

    function edit(e){
        e.preventDefault();
        if (item) {
            let newItem = new Item(item)
            dispatch(addItem(newItem))
            setItem('')
        }
    }

    function saveEditedItem(e){
        e.preventDefault();
        let editingItem = {
            newName:item,
            prevItem
        }
        dispatch(editItem(editingItem))
        setEditing(false)
        setItem('')
    }
   

  return (
    <div>
        <h1>Counter</h1>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <h1>{count}</h1>
       <form onSubmit={editing ? saveEditedItem : edit}>
       <input 
        placeholder='Item' 
        onChange={(e) => setItem(e.target.value)} 
       value={item}
         />
       {<button type='submit'>
        {
            editing ? 'Save' : 'Add item'
        }
        </button>}
       </form>
        {
            data?.map((item,index) => {
                return (
                    <p key={index}>
                    {item.name} 
                    <button onClick={() => dispatch(removeItem(item))}>x</button>
                    <button onClick={() => {
                        setItem(item.name)
                        setEditing(true)
                        setPrevItem(item)
                    }}>edit</button>
                </p>
                )
            })
        }
        
        
    </div>
  )
}
