<script>
	import Table from "./Table.svelte";
	import Form from "./Form.svelte";
	let id;
	let name="";
	let price=5;
	function edit(event){
		({id,name,price} = event.detail);
	}
</script>

<style>
	main{
		flex: 1;
		align-content: center;
		justify-content: center;
		width: 80%;
		margin: 0 auto;
	}
</style>

<main>
	<h1>Project Estimator</h1>
	<Form bind:price bind:id bind:name />
	<Table on:edit={edit}/>
</main>