<template>
    <div>
        <b-container>
            <b-row>
                <b-col sm="11"></b-col>
                <b-col sm="1">
                        <b-button variant="danger" @click="borrar()" >Borrar</b-button>
                </b-col>
            </b-row>
            
        </b-container>
        
        <form>
            <b-row mt="-5">
                
                <b-col md="4">
                    <p>Codigooo de Producto</p>
                    <b-form-input type="text" v-model="codigo" :state="ValidaCodigo" placeholder="Minimo 5 caracteres"></b-form-input>
                    
                </b-col>
                <b-col md="4">
                    <p>Nombre</p>
                    <b-form-input type="text" v-model="nombre" :state="ValidaNombre" placeholder="Minimo 5 caracteres" ></b-form-input>
                    
                </b-col>
                <b-col md="4">
                    <p>Marca</p>
                    <b-form-input type="text" v-model="marca"></b-form-input>
                    
                </b-col>
                 <b-col md="4">
                    <p>Categoria</p>
                     <b-form-select v-model="categoria" :options="categorias"></b-form-select>
                    
                </b-col>
                 <b-col md="4">
                    <p>Costo(USD)</p>
                     <b-form-input type="number" v-model="costoUSD"></b-form-input>
                    
                </b-col>
                <b-col md="4">
                    <p>Precio</p>
                     <b-form-input type="number" v-model="precio" :state="ValidaPrecio" placeholder="No puede estar vacio"></b-form-input>
                    
                </b-col>
                 <b-col md="4">
                    <p>Precio 2</p>
                     <b-form-input type="number" v-model="precio2"></b-form-input>
                    
                </b-col>
                 <b-col md="4">
                    <p>Precio 3</p>
                     <b-form-input type="number" v-model="precio3"></b-form-input>
                    
                </b-col>
                 <b-col md="4">
                    <p>Precio 4</p>
                     <b-form-input type="number" v-model="precio4"></b-form-input>
                    
                </b-col>
                 <b-col md="4">
                    <p>Stock Inicial</p>
                     <b-form-input type="number" v-model="stockInicial"></b-form-input>
                    
                </b-col>
                 <b-col md="4">
                    <p>Imagen</p>
                      <b-form-file
                        v-model="file"
                        :state="Boolean(file)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                    ></b-form-file>
                    <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
                    
                </b-col>
               
                <b-col md="8">
                    <p>Descripcion</p>
                     <b-form-textarea
                        v-model="descripcion"
                        rows="6"
                        placeholder="Descripcion..."
                    ></b-form-textarea> 
                  
                    
                </b-col>
                
                
            </b-row>
            <b-container mt="5">
                    <b-row>
                        <b-col sm="11"></b-col>
                        <b-col sm="1">
                                
                            <div>
                                <b-button id="show-btn" @click="formSubmit()">Guardar</b-button>
                                <!-- @click="formSubmit() + showModal()" -->

                                <b-modal ref="my-modal" hide-footer title="Guardado de Registro">
                                <div class="d-block text-center">
                                    <h5>Registro Guardado Existosamente</h5>
                                </div>
                                <b-button class="mt-3" variant="outline-success" block @click="hideModal()+borrar()">Aceptar</b-button>
                                
                                </b-modal>

                                <b-modal ref="my-modal-error" hide-footer title="Guardado de Registro">
                                <div class="d-block text-center">
                                    <h5>Error al Guardar</h5>
                                </div>
                                <b-button class="mt-3" variant="outline-danger" block @click="hideModalError()">Aceptar</b-button>
                                
                                </b-modal>
                            </div>
                            
                            
                        </b-col>
                    </b-row>
                    
            </b-container>     
        </form>
      
       
    
    
       
  </div>
</template>
<script>
import axios from "axios"
export default {
    name:"AltaProducto",
    data(){
        return{
            codigo:'',
            nombre:'',
            marca:'',
            categoria: null,
            categorias:[
                {value:'Perifericos', text:'Perifericos'},
                {value:'Cargadores', text:'Cargadores'},
                {value:'Componentes', text:'Componentes'},
                {value:'Otro', text:'Otro'}
            ],
            descripcion:'',
            costoUSD:null,
            precio:null,
            precio2:null,
            precio3:null,
            precio4:null,
            stockInicial:1,
            file:null,
            response:''
        }
    },
    computed:{
        ValidaCodigo(){
            if(this.codigo.length > 4 )
            {
                return true;
            }
            else if(this.codigo.length == 0 )
            {
                return null;
            }
            else
            {
                return false;
            }
        },
         ValidaNombre(){
            if(this.nombre.length > 4 )
            {
                return true;
            }
            else if(this.nombre.length == 0 )
            {
                return null;
            }
            else
            {
                return false;
            }

        },
        ValidaPrecio(){
            
             if(this.precio > 0  )
            {
                return true;
            }
            else if(this.precio === null )
            {
                return null;
            }
            else
            {
                return false;
            }
        }
    },
    methods:
    {
     
        borrar(){
            this.codigo ='',
            this.nombre ='',
            this.marca ='',
            this.nombre ='',
            this.categoria = null,
            this.descripcion = '',
            this.precio = null,
            this.precio2 = null,
            this.precio3 = null,
            this.precio4 = null,
            this.stockInicial = 1,
            this.file = null,
            this.costoUSD = null

        },
         formSubmit() {
                
                let currentObj = this;
                let todoOk;
                
              
               
              
            axios.post('https://localhost:44390/api/productos', {
                   codigo: this.codigo,
                   nombre: this.nombre,
                   marca : this.marca,
                   categoria :this.categoria,
                   descripcion :this.descripcion,
                   stock : this.stockInicial,
                   precio : this.precio,
                   precio2 : this.precio2,
                   precio3 : this.precio3,
                   precio4 : this.precio4,
                   costoUSD: this.costoUSD
                }).then(response => {
                        console.log(response);
                        if(response.status==204){
                            this.showModal();
                        }
                    }).catch(e => {
                        this.showModalError();
                    });

            },
             showModal() {
                this.$refs['my-modal'].show()
            },
            hideModal() {
                this.$refs['my-modal'].hide()
            },
             showModalError() {
                this.$refs['my-modal-error'].show()
            },
            hideModalError() {
                this.$refs['my-modal-error'].hide()
            }
    }
}
</script>
<style>

    p{
        font-size: 20px;
    };
</style>