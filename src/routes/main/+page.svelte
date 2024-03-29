<script lang='ts'>
    import Kanban from "$lib/Kanban.svelte";
    import ListTask from "$lib/ListTask.svelte";
    import Switch from "$lib/Switch.svelte";
    import {dadosTarefas, postTarefas, deletarTrefas, validarAdm} from "$lib/stores/store"
    import { onMount } from 'svelte';
    var todoMode: boolean
    var valADM: any
    onMount(async function validarAdmF() {
        valADM = await validarAdm()
   })
</script>


<div class="w-full h-5 self-end absolute ">
    <div class="w-full h5 flex flex-row-reverse">
        <a  href="/perfil">
        <div class="w-20 h-20 border rounded-full flex items-center justify-center mr-5 bg-blue-600">
            
                <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
        </div> 
        </a>
    </div>
</div>
{#if !todoMode}
    <h1 class="text-center my-5 font-bold text-4xl text-blue-600">TO-DO APP</h1>
{:else}
    <h1 class="text-center my-5 font-bold text-4xl text-blue-600">KANBAN APP</h1>
{/if}
<div class="flex justify-center"><Switch bind:checked={todoMode}></Switch> </div>
{#if valADM}
<div class="w-auto mt-5 flex justify-center">
    <a class=" " href="/adm">
        <p class="bg-green-400 rounded-md p-3 w-fit">Area adm</p>
    </a>
</div>
{/if}

{#if !todoMode}
    <ListTask></ListTask>
{:else}
    <Kanban></Kanban>
{/if}

