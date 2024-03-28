<script lang="ts">
import { getToken, patchSenha, patchNome} from "$lib/stores/store";

var senha: string = ""
var senhaNova: string = ""
var senhaNovaConf: string = ""
var retornoSenha: string = ""
var editVerify: boolean = false;
var novoNome: string;

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
var respostaEditNome:any = ""
async function editName(){
    if(novoNome != ""){
        respostaEditNome = await patchNome({id_usuario: usuarioDados.id_usuario, nome: novoNome})
        if (respostaEditNome.status == 202) {
            usuarioDados.nome = novoNome
            respostaEditNome = respostaEditNome.mensagem
        }
        editVerify = false
    }else{
        respostaEditNome = "Digite o novo nome!"
    }
    
    
}
</script>

<h1 class="text-center my-5 font-bold text-4xl text-blue-600">PERFIL</h1>
{#if retornoSenha}
    <p class="text-center">{retornoSenha}</p>
{/if}
{#if respostaEditNome}
    <p class="text-center">{respostaEditNome}</p>
{/if}
<div class="p-4 flex space-y-3 flex-col justify-center items-center vh90 w-fit mx-auto bg-blue-100 rounded-md">
    
        {#if editVerify}
            <p class="flex items-center">Nome: <input class="rounded-md sombra ml-3" type="text" bind:value={novoNome}>
                <button class="w-5 h-5 ml-3" on:click={()=>{editName()}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                </button>
            </p>
        {:else}
            <p class="w-56 text-left">
            Nome: {usuarioDados.nome}
            <button class="w-4 h-4 ml-3 mt-1" on:click={()=>{editVerify = true, novoNome = usuarioDados.nome}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>
            </button>
            </p>
        {/if}
        
    
    <p class="w-56">email: {usuarioDados.email}</p>
    
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