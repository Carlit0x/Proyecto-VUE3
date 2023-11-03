<template>
<div class="container">
    <h1 align="center">Activos</h1>
    <div class="container">
      <div class="card-content+">
      <form @submit.prevent="nuevo()">
        <tr>
          <td>
          <p>Tipo: <input type="text" v-model="payload.tipo" required /></p>
        </td>
        <td><p>Marca: <input type="text" v-model="payload.marca" required /></p></td>

      <td><p>Modelo: <input type="text" v-model="payload.modelo" required /></p></td>
      <td><p>Estado: <input type="text" v-model="payload.estado" required /></p></td>
      <td>Area ID:
        <p v-if="areas.length > 0">
                        <select v-model="payload.areaId">
                            <option :value="areas.id" v-for="area in areas">{{area.departamento}}</option>
                        </select>
                    </p>
      </td>
      <td> <button class="waves-effect waves-light btn-small" type="submit" @click="addArea">Agregar</button></td>
      </tr>
        
      </form>
      </div>
    </div>

    <div class="card">
        <div class="card-content">
            <form @submit.prevent="getList()">
                <h5>Buscar por Tipo de Activo</h5>
                <p>Nombre del Activo: <input type="search" v-model="search" @search="getList()" /></p>
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
                    <th>Tipo de Activo</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in items">
                  <td>{{ item.id_a }}</td>
                  <td>{{ item.tipo }}</td>
                  <td>{{ item.marca }}</td>
                  <td>{{ item.modelo }}</td>
                  <td>{{ item.estado }}</td>
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
   
  name: 'ActivoView',
  data(){
    const api = process.env.VUE_APP_API;
    return{
      api,
      items:[],
      search: '',
      toFilter: '',
      areas:[],
      payload:{
        tipo: null,
        marca: null,
        modelo: null,
        estado: null,
        areaId: null
      }
    }
  },
  methods:{
    filter(tipo, value) {
            this.toFilter = value === '' ? '' : '&' + tipo + '=' + value;
            this.getList();
    },
    update(id){
      this.$route.push('/activo/'+id);
    },
    eliminar(id){
      if (confirm("Esta seguro de eliminar?.")) {
        this.axios({
          method:'delete',
          url: this.api + '/activos/' + id
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
          url: this.api+'/activos',
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
    getList(tipo, value){

      this.axios({
        method:'get',
        url: this.api+'/activos?q=' + this.search + this.toFilter
      }).
      then((response) => {
        this.items = response.data;
      }).
      catch((error) => {
        console.log(error);
      })
    },
    getAreaList() {

      this.axios({
          method: 'get',
          url: this.api + '/areas'
      }).
      then((response) => {
          this.areas = response.data;
          const intervalo = setTimeout(() => {
              this.intSelect(); 
              clearTimeout(intervalo);
          }, 3000);
          
      }).
      catch((error) => {
          console.log(error);
      })
    },
        intSelect(){
            this.getList();
            this.getAreaList();
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems);
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
