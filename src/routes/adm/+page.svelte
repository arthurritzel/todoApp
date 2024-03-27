<script lang="ts">
    import {getUsuarios, deleteUsuarios} from "$lib/stores/store"

    export let usuariosFront : any = []
    var id: any
    async function getUsuariosFront() {
        var usuarios = await getUsuarios()

        if(usuarios){
            usuariosFront = usuarios
        }
    }

    getUsuariosFront()

    var modal_verify = false

    async function deletarUsuariosFront(){
        
        
        var resposta = await deleteUsuarios(id)
        console.log(resposta)
        if(resposta){
            
            var dadosRes = await getUsuarios()
            
            if(dadosRes){
            
                usuariosFront = dadosRes
            }
        }
        
        id = null
        modal_verify = false
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
                <button class="w-1/5 mb-3 bg-red-600 rounded-md text-white px-2" on:click={()=>{id = usuario.id, modal_verify = true}}>DELETAR</button>
            </div>
        {/each}
    </div>  
    {#if modal_verify}
        <div class="modal  shadow bg-white">
            <p>TEM CERTEZA?</p>
            <svg class="w-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
            <br>
            <div>
                <button class="bg-red-600 p-2 text-white rounded-xl" on:click={()=>{deletarUsuariosFront()}}>Excluir</button>
                <button class="bg-blue-100 p-2 rounded-xl" on:click={()=>{modal_verify = false}}>Cancelar</button>
            </div>
        </div>
    {/if}
</div>



<style>
    .modal{
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        
        

        border-radius: 20px;
        padding: 10px;
        box-shadow: 0px 0px 10px 0px;
    }
    .modal p{
        font-size: 30px;
        margin: 10px;
        color: black;
    }
    .modal div{
        width: 90%;
        display: flex;
        justify-content: space-around;
    }
</style>