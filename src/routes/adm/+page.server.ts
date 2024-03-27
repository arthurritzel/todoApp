import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'



export const load: PageServerLoad = async (event) => {
  
  if(event.cookies.get("token")){
    var token = event.cookies.get("token")

    async function verify(){
      
      var dados = await fetch("http://localhost:3000/usuarios", {
        method: "GET",
        headers: {Authorization: token, 'content-type': 'application/json'}
      })
      
      if(dados.status != 200){
        return false;
      }
      return true;
    }
    
    var retorno = await verify()
    if(!retorno){
      
      throw redirect(302, "/")
     
    }
  }else{
    throw redirect(302, "/")
  }
}