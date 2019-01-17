<template>
	<v-ons-page id="addlocationpage">
     <v-ons-toolbar>
        <div class="left">
            <v-ons-toolbar-button>
              <v-ons-icon icon="md-chevron-left" size="28px" style="color: #fff; margin-left: 10px;" @click="goToHome()"></v-ons-icon>  
            </v-ons-toolbar-button>
        </div>
        <div class="center">
          Add Location
          </div>  
    </v-ons-toolbar>
    <gmap-autocomplete
          @place_changed="setPlace" class="autocomp">
        </gmap-autocomplete>
        <button @click="addMarker" class="gbtnclass outline-btn">Add</button>
		<gmap-map
      :center="center"
      :zoom="16"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :draggable='true'
        @dragend="getCoordinates"
        @click="center=m.position"
      ></gmap-marker>
      </gmap-map>
      <v-ons-bottom-toolbar><v-ons-button modifier="large" class="green-button full-width"  @click="setLocation()">Set Location</v-ons-button></v-ons-bottom-toolbar>
  </v-ons-page>   
</template>

<script>


export default{

    name: 'Addlocation',
    
    data() {
    return {
      place: null,
      center: {
        lat: 0,
        lng: 0
      },
      items:{},
      currentPlace: null,
      markers: []
     }
   },
   
   methods: {

    goToHome() {

        this.$router.back(-1);
      },
     setPlace(place) {
      this.currentPlace = place;
    },
     getCoordinates: function(e) {
      this.center.lat = e.latLng.lat();
      this.center.lng = e.latLng.lng();
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.center = { position: marker };
        this.markers = [{ position: marker }]
        this.places = [this.currentPlace];
        this.center = marker;
        this.currentPlace = null;
      }
    },
    setLocation() {
      this.$router.push({
        'name': 'addlead',
        'params': {
            'items': this.center
          }
        });
    }
     
    },
   mounted:function() {
     
     var that = this;
     this.$ons.ready(function(){
      navigator.geolocation.getCurrentPosition(function(position){
        that.center.lat = position.coords.latitude;
        that.center.lng = position.coords.longitude;
        that.markers.push({position: that.center});
        // alert('Latitude: '          + position.coords.latitude          + '\n' +
        //   'Longitude: '         + position.coords.longitude         + '\n' );
      });
    })



  } 
}
</script>
<style>
.followup {
  border-radius: 6px;
  margin: 0 15px;
}
.list {
  margin: 15px;
  background-color: none !important;
 
}
.followupdetails {
  width: 100%;
}
.vue-map-container {
  height: 480px !important;
}
.autocomp {
  width: 280px;
  height: 40px;
}
.gbtnclass{
	font-size: 14px;
	border-color: #14BA88;
  color: #14BA88;
  height: 48px;
  background: #fff;
  width: 60px;
}
</style>