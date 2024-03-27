<script>
    import { redirect } from '@sveltejs/kit';
    import { onMount } from 'svelte';

    var email = "";
    var senha = "";
    var resposta = "";

    onMount(()=>{
        document.cookie = `token=${resposta}; path=/;`;
        localStorage.setItem("token", resposta)
    })
    

   async function acesso(){
        var dados = await fetch("http://localhost:3000/usuarios/login", {
            method: "POST",
            headers: {'content-type': 'application/json'},
            body:  JSON.stringify({
					email: email,
					senha: senha
                })
        })
        var dadosJson = await dados.json()
        
        if(dados.status == 200){
            document.cookie = `token=${dadosJson.token}; path=/;`;
            localStorage.setItem("token", dadosJson.token)
            window.location.href = "/main"
        }else{
            resposta = dadosJson.mensagem
            document.cookie = `token=${dados.status}; path=/;`;
            localStorage.setItem("token", dadosJson.status)
        }
    }
    
   

</script>


<div>
    
    <div class="p-4 flex space-y-3 flex-col justify-center items-center h-screen max-w-lg mx-auto bg-white">
        <div class="p-4 flex space-y-3 flex-col rounded-lg items-center max-w-lg mx-auto bg-white sombra">
            <h1 class="text-3xl">
                LOGIN
            </h1>
            {#if resposta != ""}
                <p>{resposta}</p>
            {/if}
            <div>
                <p>email:</p>
                <input class="sombra rounded-lg" type="email" name="email" id="email" bind:value={email}>
            </div>
            <div>
                <p>senha: </p>
                <input class="sombra rounded-lg" type="password" name="senha" id="senha" bind:value={senha}>
            </div>
            <button class="bg-blue-400 rounded-lg px-4 text-xl" on:click={acesso}>Acessar</button>
            <p >Não tem uma conta? <a class="text-blue-600" href="/cadastro">cadastrar</a></p>
        </div>
    </div>
</div>

<style>
    .sombra{
        box-shadow: 0px 2px 10px 0px rgba(95, 93, 93, 0.75);
    }
</style>