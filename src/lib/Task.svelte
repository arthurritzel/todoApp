<script lang='ts'>
    import {patchTarefas, deletarTrefas} from "$lib/stores/store"
    export let texto: string;
    export let completed: boolean;
    export let id: number;
    let textDecoration: string

    function checkOr(){
        
        if (!completed){
            patchTarefas({id_tarefa: id, mensagem: texto, situacao: 1})
            textDecoration = "line-through"
        }else{
            patchTarefas({id_tarefa: id, mensagem: texto, situacao: 0})
            textDecoration = "none"
        }
    }

    
    if (completed){
            textDecoration = "line-through"
    }else{
        textDecoration = "none"
    }
</script>

<div class="w-full  p-3 rounded-md space-x-2 flex justify-between">
    <div class="flex content-center">
        <input class="cursor-pointer accent-blue-800 size-6" type="checkbox" bind:checked={completed} on:click={checkOr}>
        <span class="text-xl  ml-3" style:text-decoration={textDecoration}>{texto}</span>
    </div>
    
</div>
