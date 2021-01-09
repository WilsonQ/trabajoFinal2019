<template>
  <div>
    <NavDrawer :drawer="drawer" @drawerStatus="drawer = $event" />
      <v-app-bar color="dark1" dark app clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <div class="mx-2">
          <img src="@/assets/este.png" alt="logo" width="100px" />
        </div>
        <v-toolbar-title>FullManager</v-toolbar-title>
        <div class="ml-auto">
          <b-button @click="logout"><i class="material-icons" id="cerrarsesion">lock</i></b-button>
        </div>
      </v-app-bar>
  </div>
</template>

<script>
import NavDrawer from "./NavDrawer";
import {auth} from "../firebase";
export default {
  data: () => ({
    drawer: null
  }),
  methods:{
        Login: function(e){
            
            auth
            .signInWithEmailAndPassword(this.email,this.password)
            .then(
                user => {
                    this.makeToast();
                    vm.$forceUpdate();
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
          this.$router.push('./login');
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
  components: {
    NavDrawer
  }
};
</script>

