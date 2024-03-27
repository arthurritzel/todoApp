<script lang="ts">
    import ButtonAddTask from "$lib/ButtonAddTask.svelte";
    import Task from "$lib/Task.svelte";
    import InserirTask from "$lib/InserirTask.svelte"
    import {dadosTarefas, postTarefas, deletarTrefas, validarAdm} from "$lib/stores/store"
    import { onMount } from 'svelte';

    export let tasks: any = []

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
        <div class="border border-neutral-400 shadow-sm flex rounded-md p-3 align-middle">
            <Task id="{task.id_tarefa}" texto="{task.mensagem}" completed={feitoOuNao(task.situacao)}></Task>
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