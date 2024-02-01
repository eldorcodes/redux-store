import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name:'Counter',
    initialState:{
        count: 0,
        data:[]
    },
    reducers:{
        increment:(state) => {
            state.count += 1;
        },
        decrement:(state) => {
            state.count -= 1;
        },
        addItem:(state,action:PayloadAction<object>) => {
            console.log('action',action);
            switch(action.type){
                case 'Counter/addItem':
                    let itemExist = false;
            for(let i = 0; i < state.data.length;i++){
                if (state.data[i].name == action.payload.name) {
                    itemExist = true;
                }
            }
            if (itemExist == false) {
                let newItem = action.payload;
                state.data.push(newItem)
            }else{
                console.log('Item already exists');
            }
            break;
            default: console.log('default case');
            break;
            }
        },
        removeItem:(state,action:PayloadAction<object>) => {
            let itemToDelete = action.payload;
            let filtered = state.data.filter(item => item.name != itemToDelete.name);
            state.data = filtered;
        },
        editItem:(state,action:PayloadAction<object>) => {
            let editingItem = action.payload;
            console.log('editingItem',editingItem);
            // let filtered = state.data.filter(item => item.name != editingItem.prevItem.name);
            // state.data = filtered;
            // state.data.push({ name:editingItem.newName,date:new Date().toString() });
            let index = state.data.findIndex(item => item.name == editingItem.prevItem.name);
            class Item {
                constructor(name,date){
                    this.name = name;
                    this.date = date;
                }
            }
            state.data.splice(index,1,new Item(editingItem.newName,new Date().toString()));
        }
    },
});

export const { increment, decrement, addItem, removeItem, editItem } = counterSlice.actions;

export default counterSlice.reducer;

