<template >	
	<v-ons-page id="dash">	
		
		<v-calendar is-double-paned :formats='formats' :attributes='attributes' title-position='left'>
			<span slot='header-title' slot-scope='{ month, yearLabel }'>
				<span class="calendar-year">{{ yearLabel }}</span> <br/>
				<span class="calendar-month">{{ myMonths[month] }} </span>
			</span>
		</v-calendar>

		<v-ons-carousel overscrollable swipeable auto-scroll overscrollable:index.sync="carouselIndex" item-width="340px">
			<v-ons-carousel-item v-for="(value, key) in items" >
				<v-ons-card>
					<div class="content">
						<v-ons-list>
							<v-ons-list-item>{{value.lead_name}}</v-ons-list-item>
							<v-ons-list-item>{{value.status}}</v-ons-list-item>
							<v-ons-list-item>{{value.contact_name}}</v-ons-list-item>

						</v-ons-list>
					</div>
				</v-ons-card>
			</v-ons-carousel-item>
		</v-ons-carousel>

		<v-ons-fab position="bottom right" ripple id="add-fab" @click="goTodetail()">
     		 <v-ons-icon icon="md-plus" ></v-ons-icon> 	 
    	</v-ons-fab>
 
	</v-ons-page>

</template>


<script>

import Addlead from '../pages/Addlead.vue'

export default {
	name: "Dash",
	components: {
		Addlead
	},
	
	 methods:{
  		goTodetail() {
   			 this.$router.push('/addlead')
  	}
  },
  data() {
    return {
		myMonths : ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],	
      myDate: null,
      formats: {
      	title: 'YYYY MMMM',
      	weekdays: 'WWW'
      },
      attributes: [
      	{
      		key: 'today',

      		contentStyle: {
            	'background-color': 'white',
            	'border-radius': '4px',
            	color: 'blue'
            },
      		dates: new Date(),
      		dot: {
            backgroundColor: 'blue', 

              },

      		
      	}
      ],
      carouselIndex: 0,
      items: [
        {
        	"lead_name": "Global Agencies",
        	"status": "Sale order released",
        	"contact_name": "Ajay K",
        	"phone": '9999999999',
        	"email": "ajayk@gmail.com"
        },
        {
        	"lead_name": "Global Agencies",
        	"status": "Sale order released",
        	"contact_name": "Ajay K",
        	"phone": '9999999999',
        	"email": "ajayk@gmail.com"
        },
        {
        	"lead_name": "Global Agencies",
        	"status": "Sale order released",
        	"contact_name": "Ajay K",
        	"phone": '9999999999',
        	"email": "ajayk@gmail.com"

        }
      ]
  }

 }
}
</script>
<style>
.calendar-year {
	font-size: 20px;
	color: #fff;
}
.calendar-month {
	font-size: 30px;
	font-weight: bold;
	color: #fff;
}
.c-header{
	margin-bottom: 5px;
}
.c-pane-container {
	width: 100%;
	background-color: transparent !important;
	border: none !important;
}
.c-weekday {
	color: #fff;
	opacity: .6;
	text-transform: uppercase;
}
.c-day {
	min-height: 55px;
	height: 3.5rem;
	
}
.c-day-content {
	font-size: 1.6rem !important;
	color: white;
}


</style>