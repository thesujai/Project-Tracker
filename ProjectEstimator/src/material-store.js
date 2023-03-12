import { writable } from "svelte/store";

const materialStore=writable([]);
const key= 'materials';


if (localStorage.getItem(key)) {
    materialStore.set(JSON.parse(localStorage.getItem(key)));
}
const add=(name,price)=>{
    materialStore.update((items)=>{
        const item ={
            name,
            price,
            id:new Date().getTime(),
        }
        return [item,...items]
    })
}
const edit=(id,name,price) => {
    materialStore.update((items)=>{
        const index = items.findIndex((i) => i, id ===id);
        items[index].name=name;
        items[index].price=price;
        return items;
    });
   
    }
    const deleteRow=(id) =>{
        materialStore.update((items)=>{
            return items.filter((i)=>i.id !== id);
        })
    };
materialStore.subscribe(items => {
    const jsonString= JSON.stringify(items);
    localStorage.setItem(key,jsonString);
})
export default{
    subscribe:materialStore.subscribe,
    add,
    edit,
    deleteRow,
}