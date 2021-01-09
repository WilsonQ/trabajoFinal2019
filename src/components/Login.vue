<template>
    <div class="container   mt-5">
        <b-modal id="exito" title="Autenticacion Exitosa">
            <div class="d-block">BIENVENIDO</div>
            <h1 style="color:green"> Usted se ha autenticado correctamente</h1>
            <b-button @click="hideModal">Close Me</b-button>
        </b-modal>
        <h1 style="text-align:start"> ADMINISTRADOR</h1>
        <p style="font-size:20px;text-align:start;margin-top:5%">Email de Google</p>
        <b-form-input v-model="email" type="email"></b-form-input>

        <p style="font-size:20px;text-align:start;margin-top:5px">Contraseña</p>
        <b-form-input v-model="password" type="password"></b-form-input>
        <b-button size="lg" class="mt-5" @click="Login">Ingresar</b-button>
        <b-nav-item class="ml-3" @click="logout" v-if="estaLogueado()"><i class="material-icons" id="tienda">exit_to_app</i><p>CERRAR SESION</p></b-nav-item>
    </div>
</template>
<script>
import {auth} from './firebase';
import firebase from './firebase';

export default {
    name:'Login',
    data(){
        return{
            email:'',
            password:'',
            Auth:''
        }
    },
    firebase: {
      auth: auth    
    },
    methods:{
        Login: function(e){
            
            auth
            .signInWithEmailAndPassword(this.email,this.password)
            .then(
                user => {
                    this.makeToast();

                    this.$router.push('/');

                    
                    
                },
                err =>{
                    alert(err.message)
                }
            );
            console.log(auth.currentUser)
            e.preventDefault();
        },
        
        logout(){
        auth.signOut().then(()=>{
          console.log(auth.currentUser)
          this.$router.push('./');
        })
        },
        
        estaLogueado(){
        if(auth.currentUser){
          return true;
        }else{
          return false
          }
        },

        makeToast() {
        this.$bvToast.show('Toast body content', {
          title: 'Autenticacion Exitosa',
          variant: 'success',
          solid: true
          
        })
       

      }
    },
    mounted(){
        
    }
}
</script>