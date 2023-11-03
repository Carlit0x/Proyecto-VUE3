<template>
<div class="container">
    <h1 align="center">Áreas o Departamentos</h1>
    <div class="container">
      <div class="card-content+">
      <form @submit.prevent="nuevo()">
        <tr>
          <td>
          <p>Departamento: <input type="text" v-model="payload.departamento" required /></p>
        </td>
        <td><p>Encargado: <input type="text" v-model="payload.encargado" required /></p></td>

      <td><p>Nro de Funcionarios: <input type="text" v-model="payload.num_funcionario" required /></p></td>
      <td> <button class="waves-effect waves-light btn-small" type="submit" @click="addArea">Agregar</button></td>
      </tr>
        
      </form>
      </div>
    </div>

    <div class="card">
        <div class="card-content">
            <form @submit.prevent="getList()">
                <h5>Buscar por Área o Departamento</h5>
                <p>Nombre del Área o Departamento: <input type="search" v-model="search" @search="getList()" /></p>
                <button type="submit" class="waves-effect waves-light btn-small">buscar</button>
            </form>
        </div>
      </div>

      <div class="card">
        <div class="card-content">
          <h5>FILTROS</h5>
            <div class="input-field ">
                  <select @change="filter('active',$event.target.value)">
                    <option value="" selected>todos</option>
                    <option value="true">activo</option>
                    <option value="false">inactivo</option>
                  </select>
              <label></label>
          </div>
        </div>
      </div>

    <div class="card">
      <div class="card-content">
      <table>
              <thead>
                <tr>
                    <th>ID</th>
                    <th>Departamento</th>
                    <th>Encargado</th>
                    <th>Nro de Funcionario</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in items">
                  <td>{{ item.id }}</td>
                  <td>{{ item.departamento }}</td>
                  <td>{{ item.encargado }}</td>
                  <td>{{ item.num_funcionario }}</td>
                  <td><a class="btn-floating btn-large waves-effect waves-light green"><i class="material-icons" @click="eliminar(item.id)">delete_forever</i></a></td>
                  <td><a class="btn-floating btn-large waves-effect waves-light blue "><i class="material-icons" @click="update(item.id)" >edit</i></a>
              </td>
                </tr>
              </tbody>
            </table>
      </div>
    </div>
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
      search: '',
      toFilter: '',
      payload:{
        departamento: null,
        encargado: null,
        num_funcionario: null,
        active: true
      }
    }
  },
  methods:{
    filter(departamento, value) {
            this.toFilter = value === '' ? '' : '&' + departamento + '=' + value;
            this.getList();
    },
    update(id){
      this.$route.push('/Area/'+id);
    },
    eliminar(id){
      if (confirm("Esta seguro de eliminar?.")) {
        this.axios({
          method:'delete',
          url: this.api + '/areas/' + id
        }).
        then((response) => {
          this.getList();
        }
        ).
        catch((error) => {
          console.log(error);
        })
      }
    },
    nuevo(){
        this.axios({
          method:'post',
          url: this.api+'/areas',
          data: this.payload
        }).
        then((response)=>{
          this.getList();
          console.log(response);
        }).
        catch((error)=>{
          console.log(error);
        });
    },
    getList(departamaneto, value){

      this.axios({
        method:'get',
        url: this.api+'/areas?q=' + this.search + this.toFilter
      }).
      then((response) => {
        this.items = response.data;
      }).
      catch((error) => {
        console.log(error);
      })
    }
  },
  components: {
    
  },
  mounted(){
    this.getList();
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  }
}
</script>
