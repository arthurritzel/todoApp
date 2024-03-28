<script lang="ts">
    import { patchTarefas, dadosTarefas} from "$lib/stores/store";
    
    export var task: any;
    export var editVerify: boolean;
    export var tasks: any;
    async function editTask(){
        
        var resposta = await patchTarefas(task)
        if(resposta){
            var dadosRes = await dadosTarefas()
            if(dadosRes){
                tasks = dadosRes.response.tarefas
            }
        }
        editVerify = false
    };
</script>

<div class="flex items-center p-3">
    <input class="sombra rounded-lg h-5" type="text" bind:value={task.mensagem}>
    <button class="w-5 h-5 ml-3" on:click={()=>{editTask()}}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
    </button>
</div>

<style>
    .sombra{
        box-shadow: 0px 2px 10px 0px rgba(95, 93, 93, 0.75);
    }

</style>