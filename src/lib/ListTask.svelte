<script lang="ts">
    import ButtonAddTask from "$lib/ButtonAddTask.svelte";
    import Task from "$lib/Task.svelte";
    import InserirTask from "$lib/InserirTask.svelte"
    import {dadosTarefas, postTarefas, deletarTrefas, validarAdm} from "$lib/stores/store"
    import { onMount } from 'svelte';
    import TaskEdit from "./TaskEdit.svelte";

    export let tasks: any = []
    var editVerify = false;
    var taskEditId: any;

    var teste
    onMount(async function validarAdmF() {
        teste = await validarAdm()
        
       
   })

    var dadosRes
    async function dados(){
        dadosRes = await dadosTarefas()
        if(dadosRes){
            tasks = dadosRes.response.tarefas
        }
    }
    
   dados()
  
   
   
   async function deletar(id: any){
        var resposta = await deletarTrefas(id)

        if(resposta){
            dadosRes = await dadosTarefas()
            if(dadosRes){
                tasks = dadosRes.response.tarefas
            }
        }
    }

    let show = false;
    let novaTasktext: string = "";
    
    async function newTask(){
        show = false
        if(novaTasktext != ""){
            var resposta = await postTarefas({mensagem: novaTasktext, situacao: 0})

            if(resposta){
                dadosRes = await dadosTarefas()
                if(dadosRes){
                    tasks = dadosRes.response.tarefas
                }
            }
        }
        novaTasktext = ""
        
    }

    function feitoOuNao(situacao: any){
        if(situacao == 2){
            return true
        }else{
            return false}
    }

    
</script>

<div class="p-4 flex space-y-3 flex-col justify-center items-center vh90 max-w-lg mx-auto ">
    <div class="w-full flex flex-col max-h-88 overflow-auto space-y-2 bg-blue-100 p-3 rounded-md shadow-md">
        {#each tasks as task}
        <div class="border border-neutral-400 shadow-sm flex rounded-md p-3 align-middle justify-between">
            <div class="flex items-center">
                {#if editVerify && task.id_tarefa == taskEditId}
                    <TaskEdit task={{mensagem: task.mensagem, id_tarefa: task.id_tarefa, situacao:task.situacao}} bind:editVerify bind:tasks></TaskEdit>
                {:else}
                    <Task id="{task.id_tarefa}" texto="{task.mensagem}" completed={feitoOuNao(task.situacao)}></Task>
                    <button class="w-5 h-5" on:click={()=>{editVerify = true, taskEditId = task.id_tarefa}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>
                    </button>
                {/if}
                
            </div>
            <button class="mr-5 bg-red-600 rounded-md text-white px-2" on:click={()=>{deletar(task.id_tarefa)}}>Deletar</button>
        </div>
        {/each}
    </div>
        <ButtonAddTask bind:show></ButtonAddTask>
        {#if show == true}
            <div class="flex justify-center items-center border border-neutral-350 shadow-sm p-5 rounded-md w-full space-x-5">
                <input bind:value={novaTasktext} type="text" class="border border-neutral-350 shadow-sm rounded-md w-full">
                <button on:click={newTask} class="bg-blue-400 px-3 py-0.5 rounded-md">Add</button>
            </div>
        {/if}
    
</div>

<style>
    .vh90{
        height: 80vh;
    }
</style>