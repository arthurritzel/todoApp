<script lang='ts'>
    import ListTask from "$lib/ListTask.svelte";
    import Switch from "$lib/Switch.svelte";
    import {dadosTarefas, postTarefas, deletarTrefas, validarAdm} from "$lib/stores/store"
    import { onMount } from 'svelte';
    var todoMode
    var teste
    onMount(async function validarAdmF() {
        teste = await validarAdm()
   })
</script>


<h1 class="text-center my-5 font-bold text-4xl text-blue-600">TO-DO APP</h1>

{#if teste}
    <a class="w-auto flex justify-center" href="/adm"><p class="bg-green-400 rounded-md p-3 w-fit">Area adm</p></a>
{/if}
<ListTask></ListTask>
