<script>
    import { createEventDispatcher } from "svelte/internal";
    import Form from "./Form.svelte";
  import { element } from "svelte/internal";
    import materialStore from "./material-store.js";
    
    const dispatch=createEventDispatcher();

    let materials=[];
    
    materialStore.subscribe(items =>{
        materials=items;
    })


const formatter =new Intl.NumberFormat('en-US',{
    style:'currency',
    currency: "USD",
})
let total =0;
$: {
let sum=0;
materials.forEach(element => {
     sum+=element.price;
});
total=sum;
}

function edit(id,name,price){
    dispatch("edit",{id,name,price});
}


function deleteRow(id) {
    materialStore.deleteRow(id);
}

</script>


<style>
    table{
        width:100%;
    }
    .element-row{
        cursor:pointer;
    }
    #delete-icon:hover{
        cursor:pointer;        
        color: red;
        
    }

</style>


<table class="primary">
    <thead>
        <tr>
            <th>Material</th>
            <th>Price</th>
            <th />
        </tr>
    </thead>
    <tbody>
        {#each materials as material (material.id)}
            <tr 
            on:click={edit(material.id,material.name,material.price)}
            class = "element-row"
            >
                <th>{material.name}</th>
                <th>{ formatter.format(material.price)}</th>
                <td  >
                    <i 
                    on:click|stopPropagation={deleteRow(material.id)}
                    class="far fa-trash-alt" id="delete-icon"></i>
                </td>
            </tr>
        {/each}
            <tr>
                <td>Total</td>
                <td colspan="2">{formatter.format(total)}</td>
            </tr>
    </tbody>
</table>
