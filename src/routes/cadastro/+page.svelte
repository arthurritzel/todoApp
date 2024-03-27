<script>
    import { redirect } from '@sveltejs/kit';
    import { onMount } from 'svelte';

    var email = "";
    var senha = "";
    var nome = "";
    var resposta = "";


async function acesso(){
    if(nome == "" || email == "" || senha == ""){
        resposta = "preencha todos os campos"
    }else{
        var dados = await fetch("http://localhost:3000/usuarios/cadastro", {
            method: "POST",
            headers: {'content-type': 'application/json'},
            body:  JSON.stringify({
                    nome: nome,
					email: email,
					senha: senha
                })
        })
        var dadosJson = await dados.json()
        
        if(dados.status == 201){
            window.location.href = "/"
        }else{
            resposta = dadosJson.mensagem
        }
    }
}
    
   

</script>


<div>
    <div class="p-4 flex space-y-3 flex-col justify-center items-center h-screen max-w-lg mx-auto bg-white">
        <div class="p-4 flex space-y-3 flex-col rounded-lg items-center max-w-lg mx-auto bg-white sombra">
            <h1 class="text-3xl">
                Cadastro
            </h1>
            {#if resposta != ""}
                <p>{resposta}</p>
            {/if}
            <div>
                <p>nome:</p>
                <input class="sombra rounded-lg" type="text" name="nome" id="nome" bind:value={nome}>
            </div>
            <div>
                <p>email:</p>
                <input class="sombra rounded-lg" type="email" name="email" id="email" bind:value={email}>
            </div>
            <div>
                <p>senha: </p>
                <input class="sombra rounded-lg" type="password" name="senha" id="senha" bind:value={senha}>
            </div>
            <button class="bg-blue-400 rounded-lg px-4 text-xl" on:click={acesso}>Cadastrar</button>
        
        </div>
    </div>
        
        
</div>

<style>
    .sombra{
        box-shadow: 0px 2px 10px 0px rgba(95, 93, 93, 0.75);
    }
</style>