<template>
  <nav>
    <div class="nav-wrapper">
      <a href="/" class="brand-logo right">Empresa F&F</a>
      <ul id="nav-mobile" class="left ">
        <li>
          <a class="waves-effect waves-light ">
            <i class="material-icons" @click="menu()">menu</i>
          </a>
        </li>
        <li>
          <!-- <a href="#" data-target="mobile-demo"><i class="material-icons">menu</i></a> -->
        </li>
      </ul>
    </div>
  </nav>

  <ul class="sidenav" id="mobile-demo">
    <li><router-link to="/">Inicio</router-link></li>
    <li><router-link to="/about">Nosotros</router-link></li>
    <li><router-link to="/area">Departamento</router-link></li>
    <li><router-link to="/activo">Activos</router-link></li>
  </ul>
      <!--<ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><router-link to="/area">Area</router-link></li>
        <li><router-link to="/activo">Activos</router-link></li>
  
      </ul>
    </div>
    <div class="nav-content">
      <ul class="tabs tabs-transparent">
        <li class="tab"><router-link to="/">Home</router-link></li>
        <li class="tab"><router-link to="/about">About</router-link></li>
        <li class="tab disabled"><a href="#test3">Disabled Tab</a></li>
        <li class="tab"><a href="#test4">Test 4</a></li>
      </ul>
    </div>
  </nav>-->

  <ul class="sidenav" id="mobile-demo">
    <li><a href="sass.html">Sass</a></li>
    <li><a href="badges.html">Components</a></li>
    <li><a href="collapsible.html">JavaScript</a></li>
  </ul>
</template>

<script>
import M from 'materialize-css'
export default {
  name: 'menu',
  data() {
    return {
      sidenav: null
    }
  },
  props: [],
  methods:{
    menu(){
      this.sidenav.open();
    }
  },
  mounted(){
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    this.sidenav = instances[0];
  }

  // Or with jQuery
/*
  $(document).ready(function(){
    $('.sidenav').sidenav();
  });*/
  //}
}
</script>

<style >

</style>
