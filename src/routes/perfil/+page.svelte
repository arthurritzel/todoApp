<script lang="ts">
import { getToken, patchSenha} from "$lib/stores/store";

var senha: string = ""
var senhaNova: string = ""
var senhaNovaConf: string = ""
var retornoSenha: string = ""

var usuarioDados = {id_usuario: "", nome: "", email: ""}
function parseJwt (token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

async function dados(){
    var usuarioToken = await getToken()

    if (usuarioToken) {
       usuarioDados = parseJwt(usuarioToken)
       console.log(usuarioDados)
    }
}
dados()


var atualizarSenhaVerify = false


async function patchSenhaFront(){
    if((senhaNova === senhaNovaConf) && (senhaNova != "")){
        if(senha == ""){
            retornoSenha = "Digite a senha antiga"
            console.log(retornoSenha)
            return
        }
        retornoSenha = await patchSenha({id: usuarioDados.id_usuario, senha: senha, senhaNova: senhaNovaConf})
        console.log(retornoSenha)
        atualizarSenhaVerify = false
    }else{
        retornoSenha = "Nova senha não coincide"
        return
    }
}
</script>

<h1 class="text-center my-5 font-bold text-4xl text-blue-600">PERFIL</h1>
{#if retornoSenha}
    <p class="text-center">{retornoSenha}</p>
{/if}
<div class="p-4 flex space-y-3 flex-col justify-center items-center vh90 w-fit mx-auto bg-blue-100 rounded-md">
    <p class="w-auto">Nome: {usuarioDados.nome}</p>
    <p class="w-auto">email: {usuarioDados.email}</p>
    
    {#if atualizarSenhaVerify}
        <hr>
        <p class="text-left">Senha Antiga</p>
        <input class="sombra rounded-lg" type="text" bind:value={senha}>
        <p class="text-left">Senha nova</p>
        <input class="sombra rounded-lg" type="text" bind:value={senhaNova}>
        <p class="text-left">Confirmar senha nova</p>
        <input class="sombra rounded-lg" type="text" bind:value={senhaNovaConf}>

        <div class="flex justify-between">
            <button class="bg-red-600 rounded-md text-white px-2 mr-2" on:click={()=>{atualizarSenhaVerify = false}}>CANCELAR</button>
            <button class="bg-green-600 rounded-md text-white px-2 ml-2" on:click={()=>{patchSenhaFront()}}>ATUALIZAR</button>
        </div>
    {:else}
        <button class="bg-green-600 rounded-md text-white px-2" on:click={()=>{atualizarSenhaVerify = true}}>Atualizar senha</button>
    {/if}
</div>

<style>
    .sombra{
        box-shadow: 0px 2px 10px 0px rgba(95, 93, 93, 0.75);
    }
</style>