<script lang="ts">
	import { dropzone, draggable } from '$lib/dnd';
    import {dadosTarefas} from "$lib/stores/store";
    import '../routes/global.css';
    import {deletarTrefas, postTarefas, patchTarefas} from "$lib/stores/store"
    import ButtonAddTask from './ButtonAddTask.svelte';
    import TaskEdit from "$lib/TaskEdit.svelte";

    var tasks: any;

    var editVerify: boolean;
    var taskEditId: any;
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
            tasks = dadosRes.response.tarefas
            data = {cards: tasks}
            
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
                tasks = dadosRes.response.tarefas
                data = {cards: tasks}
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
                    tasks = dadosRes.response.tarefas
                    data = {cards: tasks}
                }
            }
        }
        novaTasktext = ""
        
    }

    async function editTask(task: any){
        
        var resposta = await patchTarefas(task)
        if(resposta){
            var dadosRes = await dadosTarefas()
            if(dadosRes){
                tasks = dadosRes.response.tarefas
                data.cards = tasks
            }
        }
        editVerify = false
    };
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
                                
                                {#if editVerify && card.id_tarefa == taskEditId}
                                    <div class="flex items-center p-3">
                                        <input class="h-5 sombra rounded-md" type="text" bind:value={card.mensagem}>
                                        <button class="w-5 h-5 ml-3" on:click={()=>{editTask({mensagem: card.mensagem, id_tarefa: card.id_tarefa, situacao: card.situacao})}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                                        </button>
                                    </div>
                                {:else}
                                <div class="flex">
                                    <p>{card.mensagem}</p>
                                    <button class="w-5 h-5 ml-3" on:click={()=>{editVerify = true, taskEditId = card.id_tarefa}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>
                                    </button>
                                    {#if card.situacao == 2}
                                        <button class="ml-4 bg-red-600 rounded-md text-white px-2" on:click={()=>{deletar(card.id_tarefa)}}>Deletar</button>
                                    {/if}
                                </div>
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
    
    .sombra{
        box-shadow: 0px 2px 10px 0px rgba(95, 93, 93, 0.75);
    }

</style>
