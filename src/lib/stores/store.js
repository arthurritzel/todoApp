import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export async function dadosTarefas(){
    if (browser) {
        var token = window.localStorage.getItem("token");
        
        if(token){
            
            var tarefas = await fetch("http://localhost:3000/tarefas", {
                method: "GET",
                headers: {Authorization: token}
            });
    
            var tarefasDados = await tarefas.json();
            
            return tarefasDados;
        }
    }
    return null; // Retorna null ou uma resposta vazia, dependendo do seu caso
}

export async function postTarefas(tarefa){
    if (browser) {
        var token = window.localStorage.getItem("token");
        
        if(token){
            
            var tarefas = await fetch("http://localhost:3000/tarefas", {
                method: "POST",
                headers: {Authorization: token, 'content-type': 'application/json'},
                body: JSON.stringify({
                    mensagem: tarefa.mensagem,
                    situacao: tarefa.situacao
                })
            });
    
            var tarefasDados = await tarefas.json();
            
            return tarefasDados;
        }
    }
}

export async function patchTarefas(tarefa){
    if (browser) {
        var token = window.localStorage.getItem("token");
        
        if(token){
            
            var tarefas = await fetch("http://localhost:3000/tarefas", {
                method: "PATCH",
                headers: {Authorization: token, 'content-type': 'application/json'},
                body: JSON.stringify({
                    id_tarefa: tarefa.id_tarefa,
                    mensagem: tarefa.mensagem,
                    situacao: tarefa.situacao
                })
            });
    
            var tarefasDados = await tarefas.json();
            
            return tarefasDados;
        }
    }
}

export async function deletarTrefas(id){
    if (browser) {
        var token = window.localStorage.getItem("token");
        
        if(token){
            
            var url = "http://localhost:3000/tarefas/" + id
            var tarefas = await fetch(url, {
                method: "DELETE",
                headers: {Authorization: token, 'content-type': 'application/json'},
            });
    
            var tarefasDados = await tarefas.json();
            
            return tarefasDados;
        }
    }
}

export async function validarAdm(){
    if (browser) {
        var token = window.localStorage.getItem("token");
        
        if(token){
            
            var url = "http://localhost:3000/usuarios"
            var tarefas = await fetch(url, {
                method: "GET",
                headers: {Authorization: token, 'content-type': 'application/json'},
            });
            
            if(tarefas.status == 200){
                return true
            }else{
                return false
            }
        }
    }
}

export async function getUsuarios(){
    if (browser) {
        var token = window.localStorage.getItem("token");
        
        if(token){
            
            var url = "http://localhost:3000/usuarios"
            var usuarios = await fetch(url, {
                method: "GET",
                headers: {Authorization: token, 'content-type': 'application/json'},
            });
            
            var usuariosJson = await usuarios.json()
            
            if(usuarios.status == 200){
                return usuariosJson.response.usuarios
            }else{
                return false
            }
        }
    }
}

export async function deleteUsuarios(id){
    if (browser) {
        var token = window.localStorage.getItem("token");
        
        if(token){
            
            var url = "http://localhost:3000/usuarios/" + id
            var usuarios = await fetch(url, {
                method: "DELETE",
                headers: {Authorization: token, 'content-type': 'application/json'},
            });
            
            var usuariosJson = await usuarios.json()
            if(usuarios.status == 202){
                return true
            }else{
                return false
            }
        }
    }
}