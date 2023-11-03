<template>
<div class="container">
  <h1 align="center">Edición de Departamentos</h1>
  <form @submit.prevent="update()">
    <tr>
      <td>
      <p>Departamento: <input type="text" v-model="payload.departamento" required /></p>
    </td>
    <td><p>Encargado: <input type="text" v-model="payload.encargado" required /></p></td>

  <td><p>Nro de Funcionarios: <input type="text" v-model="payload.num_funcionario" required /></p></td>
  <p>
            <label>
            <input type="checkbox" class="filled-in" v-model="payload.active" />
          <span>Activo</span>
        </label>
  </p>
  <td> <button type="submit" class="waves-effect waves-light btn-small" @click="addArea">Actualizar</button></td>
  </tr>
    
  </form>
</div>
</template>

<script>

export default {
   
  name: 'AreaView',
  data(){
    const api = process.env.VUE_APP_API;
    return{
      api,
      items:[],
      payload:{
        departamento: null,
        encargado: null,
        num_funcionario: null,
        active: null
      }
    }
  },
  methods:{
    getOne(){
      this.axios({
          method:'get',
          url: this.api + '/areas/' + this.$route.params.id
        }).
        then((response) => {
          this.payload = response.data
        }
        ).
        catch((error) => {
          console.log(error);
        }
       )
    },
    update(id){
      if (confirm("Esta seguro de editar?.")) {
        this.axios({
          method:'patch',
          url: this.api + '/areas/' + this.$route.params.id,
          data: this.payload
        }).
        then((response) => {
          console.log(response);
        }
        ).
        catch((error) => {
          console.log(error);
        }
       )
      }
    }
  },
  components: {
    
  },
  mounted(){
    this.getOne();
  }
}
</script>
