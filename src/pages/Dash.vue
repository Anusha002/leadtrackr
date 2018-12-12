<template >	
	<v-ons-page id="dash">	
			<v-calendar is-double-paned :formats='formats' :attributes='attributes' title-position='left'@dayclick='dayClicked'>
				<span slot='header-title' slot-scope='{ month, yearLabel }'>
					<span class="calendar-year">{{ yearLabel }}</span> <br/>
					<span class="calendar-month">{{ myMonths[month] }} </span>
				</span>
			</v-calendar>

		<v-ons-carousel overscrollable swipeable auto-scroll overscrollable:index.sync="carouselIndex" item-width="340px">
			<v-ons-carousel-item v-for="(value, key) in items" >
				<v-ons-card>
					<div class="content">
						<v-ons-row>
							<v-ons-col id="ld-comp-name">{{value.lead_name}}</v-ons-col>
						</v-ons-row>
						<v-ons-row>
							<v-ons-col id="ld-status" >{{value.status}}</v-ons-col>
						</v-ons-row>
						<v-ons-row>	
							<v-ons-col id="ld-name" >{{value.contact_name}}</v-ons-col>
						</v-ons-row>
						<v-ons-row style="margin-top: 10px;">
							<v-ons-col width="50px">
								<a :href="'tel:' + value.phone">
									<v-ons-icon modifier="large" class="icon-phone"></v-ons-icon>
								</a>
							</v-ons-col>
							<v-ons-col>
								<a :href="'mailto:' + value.email">
									<v-ons-icon modifier="large" class="icon-email"></v-ons-icon>
								</a>
							</v-ons-col>

						</v-ons-row>
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
import GetLeadsAPI from '../services/api/Leads.js';
import LoginApi from '../services/api/User.js';


export default {
	name: "Dash",
	components: {
		Addlead
	},
	methods:{
  		goTodetail() {
   			this.$router.push('/addlead')
  		},
  	 	getCards(date){
  	 		var dtStr = date.getDate().toString() + date.getMonth().toString() + date.getFullYear().toString();
  	 		this.items = this.leads[dtStr];
 	 		
 	 	},
 	 	dayClicked(day) {
      		
      		var dtobj =new Date(day.dateTime);
	   		var dateString = dtobj.getDate().toString() + dtobj.getMonth().toString() + dtobj.getFullYear().toString();
      		this.items = this.leads[dateString];	
   		 }
  	
 	},

 	mounted:function() {

 		var payload = {
	 		fromDate: '01-01-2018',
	 		toDate: '12-12-2018',
	 		Tk:localStorage.ki
	 	}
	 	console.log(payload.Tk)
 	  	GetLeadsAPI.getLeads(payload).then(leads => {

			var dates =  Object.keys(leads)
			var newLeads = {};
			var dots = []
			for (var i=0; i<dates.length; i++) {
				var dtobj = new Date(parseInt(dates[i])*1000)
				dots[i] = dtobj
				var dtStr = dtobj.getDate().toString() + dtobj.getMonth().toString() + dtobj.getFullYear().toString();
				newLeads[dtStr] = leads[dates[i]];	
			}
			this.leads = newLeads;

			this.attributes[1].dates = dots;
			var currentdate = new Date();
			this.getCards(currentdate);
		})
 	 },

  data() {
    return {
    	leads: {},
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
      	},
      	{
      		dates: [],
      		dot: {
            	backgroundColor: 'blue', 

              },
      	}
      ],
      carouselIndex: 0,
      items: []
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
.toolbar {
	background: transparent;
}
.fab {
	background: #14BA88 !important;
}
.fab .ons-icon{
	color: #fff;
}
.card {
	border-radius: 10px;
}
#ld-comp-name {
	font-size: 16px;
	font-weight: 500;
	color:#333;
}
#ld-status {
	color: #08976C;
	font-size: 13px;
	height: 60px;
}
#ld-name {
	font-size: 15px;
	color: #444;
}
.ons-icon.fa {
	font-size: 1.4em;
	color: #333;
}

</style>