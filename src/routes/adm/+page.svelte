<script lang="ts">
    import {getUsuarios, deleteUsuarios} from "$lib/stores/store"

    export let usuariosFront : any = []

    async function getUsuariosFront() {
        var usuarios = await getUsuarios()

        if(usuarios){
            usuariosFront = usuarios
        }
    }

    getUsuariosFront()

    async function deletarUsuariosFront(id){
        var resposta = await deleteUsuarios(id)
        console.log(resposta)
        if(resposta){
            
            var dadosRes = await getUsuarios()
            
            if(dadosRes){
              
                usuariosFront = dadosRes
            }
        }
    }
</script>

<h1 class="text-center my-5 font-bold text-4xl text-green-600">AREA ADM</h1>
<h3 class="text-center my-5 font-bold text-2xl text-black">Usuarios</h3>


<div class="w-auto h-auto flex content-center justify-center">
    <div class="w-4/6 flex flex-col max-h-88 overflow-auto space-y-2 bg-blue-100 p-3 rounded-md shadow-md">
        {#each usuariosFront as usuario}
            <div class="flex justify-between w-auto border-b-2 border-neutral-400">
                <p class="w-1/4">{usuario.nome}</p>
                <p class="w-1/3">{usuario.email}</p>
                <button class="w-1/5 mb-3 bg-red-600 rounded-md text-white px-2" on:click={()=>{deletarUsuariosFront(usuario.id_usuario)}}>DELETAR</button>
            </div>
        {/each}
    </div>  
</div>