<script lang="ts">
	import { dropzone, draggable } from '$lib/dnd';
    import {dadosTarefas} from "$lib/stores/store";
    import '../routes/global.css';
    import {deletarTrefas, postTarefas, patchTarefas} from "$lib/stores/store"
    import ButtonAddTask from './ButtonAddTask.svelte';
   var cardsRes
    var columns = [
			{
				id: 0,
				label: '📫 Todo'
			},
            {
				id: 1,
				label: '🤩 Doing'
			},
			{
				id: 2,
				label: '✅ Done'
			}
		]

    var dadosRes
    async function dados(){
        dadosRes = await dadosTarefas()
        if(dadosRes){
            cardsRes = dadosRes.response.tarefas
            data = {cards: cardsRes}
            
        }
    }
    dados()
	var data = {
        cards:[]
    };

    async function deletar(id: any){
        var resposta = await deletarTrefas(id)

        if(resposta){
            dadosRes = await dadosTarefas()
            if(dadosRes){
                cardsRes = dadosRes.response.tarefas
                data = {cards: cardsRes}
            }
        }
    }
  
    let show = false;
    let novaTasktext: string = "" ;
    
    async function newTask(){
        show = false 
        if(novaTasktext != ""){
            var resposta = await postTarefas({mensagem: novaTasktext, situacao: 0})

            if(resposta){
                dadosRes = await dadosTarefas()
                if(dadosRes){
                    cardsRes = dadosRes.response.tarefas
                    data = {cards: cardsRes}
                }
            }
        }
        novaTasktext = ""
        
    }
</script>
<div class="p-4 flex space-y-3 flex-col justify-center items-center vh90 max-w-lg mx-auto mt-20 ">
    <ul>
        
        {#each columns as column}
            {@const cards = data.cards.filter((c) => c.situacao === column.id)}
            
            <li
                class="column"
                use:dropzone={{
                    on_dropzone(card_id) {
                        const cards2 = data.cards.find((c) => c.id_tarefa == card_id);
                        
                        cards2.situacao = column.id;
                        patchTarefas({id_tarefa: cards2.id_tarefa, mensagem: cards2.mensagem, situacao: cards2.situacao})
                        data = data;
                        
                    }
                }}
            >
                <h2 class="text-xl">{column.label}</h2>
                {#if cards.length > 0}
                    <ul class="cards">
                        {#each cards as card}
                            <li use:draggable={card.id_tarefa}>
                                {card.mensagem}
                                {#if card.situacao == 2}
                                    <button class="mr-5 bg-red-600 rounded-md text-white px-2" on:click={()=>{deletar(card.id_tarefa)}}>Deletar</button>
                                {/if}
                            </li>
                        {/each}
                    </ul>
                    {#if column.id == 0}
                        <ButtonAddTask bind:show></ButtonAddTask>
                        {#if show == true}
                            <div class="flex justify-center items-center border border-neutral-350 shadow-sm p-5 rounded-md w-full space-x-5">
                                <input bind:value={novaTasktext} type="text" class="border border-neutral-350 shadow-sm rounded-md w-full">
                                <button on:click={newTask} class="bg-blue-400 px-3 py-0.5 rounded-md">Add</button>
                            </div>
                        {/if}
                    {/if}
                {:else}
                    <p>No Cards...</p>
                    {#if column.id == 0}
                    
                        <ButtonAddTask bind:show></ButtonAddTask>
                        {#if show == true}
                            <div class="flex justify-center items-center border border-neutral-350 shadow-sm p-5 rounded-md w-full space-x-5">
                                <input bind:value={novaTasktext} type="text" class="border border-neutral-350 shadow-sm rounded-md w-full">
                                <button on:click={newTask} class="bg-blue-400 px-3 py-0.5 rounded-md">Add</button>
                            </div>
                        {/if}
                    
                    {/if}
                    
                {/if}
            </li>
        {/each}
    </ul>
</div>
<style>
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		gap: 1rem;
	}

	li {
		padding: 1rem;
		background-color: var(--sk-back-1);
		border: 1px solid black;
		border-radius: 0.5rem;
		border-color: var(--sk-back-5);
	}

	.column {
		min-width: 25ch;
	}

	h2 {
		margin-block-start: 0;
		margin-block-end: 0.5rem;
	}

	.cards {
		flex-direction: column;
	}

	.column:global(.droppable) {
		outline: 0.1rem solid var(--sk-theme-1);
		outline-offset: 0.25rem;
	}

	.column:global(.droppable) * {
		pointer-events: none;
	}
</style>
