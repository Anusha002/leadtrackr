<template>
	<router-view />
</template>

<script>

  export default{
    name: 'app',
    components: {

       
    }
  }


</script>


<style>
@import 'assets/css/icons.css';
.page__background { 
  background: linear-gradient(135deg, rgba(8,179,222,1) 10%, rgba(8,179,222,1) 37%, rgba(8,179,222,1) 45%, rgba(5,37,199,1) 100%);
  top: 0 !important;
}
.lead-input{
  width: 100%;
}
.outline-btn {
  border: 1px solid #999;
  font-size: 11px !important;
  padding: 0 10px;
  height: 30px;
  line-height: 24px; 
}
.list-item--material {
  border: none;
}
.text-input--material {
  width: 330px !important;
}
.toolbar--material {
  box-shadow: none;
}
.text-danger{
  font-size: .5em;
  color: #D91045;
  margin: 0 2px;
}

.dialog{
  min-width: 400px;
    min-height: 220px;
}

.dialog-container{
  padding: 20px;
}

.search-input{
  border-radius: 8px;
}
</style>
