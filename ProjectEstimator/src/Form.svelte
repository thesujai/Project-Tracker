<script>
    import materialStore from './material-store.js'
    export let id;
    export let name;
    export let price=5;
    $: mode = id? "edit":"Add" ;

   $: canSubmit= price>=0 && name !=="";
    
   function submit() {
    if (!canSubmit) {
        return;
    }
    if(mode === 'Add'){
        materialStore.add(name,price);
    }
    if (mode === 'edit') {
        materialStore.edit(id,name,price)
    }
    price=5;
    name='';
    id=undefined;
   }

   function cancel() {
    price=5;
    name='';
    id=undefined;
   }

</script>



<style>
    button{
        margin-left: 20px;
    }
    button:disabled{
        cursor: not-allowed;
    }
</style>


<form on:submit|preventDefault={submit}>
    <fieldset>
        <label for="">Material</label>
        <input  
        bind:value={name} 
        type="text" 
        id="nameField" 
        placeholder="Wood. Glue. Etc">

        <label for="priceField">Price</label>
        <input 
        bind:value={price}
        type="number"
        id="priceField"
        placeholder="Price"
        min="0"
        step="any"
        >
    </fieldset>

    <button  class="float-right"
    type="submit"
    disabled='{!canSubmit}'>{mode}</button>

    {#if mode ==="edit"}
         <button 
         on:click={cancel}
         class="float-right"
    type="button"
    >Cancel</button>
    {/if}
    
</form>