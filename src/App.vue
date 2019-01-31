<template>
	<router-view />
</template>

<script>

  export default{
    name: 'app',
    components: {

       
    },
    mounted:function() {
      var that = this;
      this.$ons.ready(function(){
        that.$ons.setDefaultDeviceBackButtonListener(function() {
          if(location.hash ==  '#/container' ) {
            navigator.notification.confirm("Are you sure you want to exit the application?",function(button){
              if(button == 1) {
                  navigator.app.exitApp();
              } else {
                  return;
              }   
            },"Warning","Ok,Cancel"); 
          } else {
            navigator.app.backHistory();
          }
        });
      })
      
    }
  }
// document.addEventListener("deviceready", onDeviceReady, false);  
// function onDeviceReady(){
//         document.addEventListener("backbutton", function(e){
//           e.preventDefault();
//           if(location.hash ==  '#/container' ) {
//             navigator.notification.confirm("Are you sure you want to exit the application?",fnLogout,"Warning","Ok,Cancel"); // u can change the button names in the place of ok,cancel.
//           } else {
//             navigator.app.backHistory();
//           }
        
//     }, false); 
//   }



</script>


<style>
@import 'assets/css/icons.css';
.page__background { 
  background: linear-gradient(135deg, #8f94fb 45%, #4e54c8 100%);
  top: 0 !important;
}
.lead-input, .lead-input input{
  width: 100% !important;
}
ons-input, ons-input .text-input {
    width: 100% !important;
    display: block;
}
.popover-container input {
  display: none !important;
}

.popover-origin{
  transform-style: preserve-3d;
}
.outline-btn {
  border: 1px solid #999;
  font-size: 11px !important;
  padding: 0 10px;
  height: 30px;
  line-height: 24px; 
}
.toolbar .center {
  color: #fff;
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
.dialog-container {
  -webkit-mask-image: none;
  mask-image: none;
  padding: 20px;
}


.button[data-v-426b3b1a] {
    line-height: none;
    width: 80px;
    height: 41px;
}
.search-input{
  border-radius: 8px;
}
.labels{
  color:#999;    
  font-size: 12px;
  font-weight: 400;
  font-family: 'Roboto', 'Noto', sans-serif;
}
.fab {
	background: #1d0149 !important;
}
.fab .ons-icon{
	color: #fff;
}
.button-normal {
  background: #1d0149
}
</style>
