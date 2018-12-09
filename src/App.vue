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
}
.lead-input{
  width: 100%;
}
.text-danger{
  font-size: .5em;
  color: #D91045;
  margin: 0 2px;
}

</style>
