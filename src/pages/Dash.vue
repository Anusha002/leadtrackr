<template >	
	<v-ons-page id="dash">	

			<v-calendar is-double-paned :formats='formats' :attributes='attributes' title-position='left'@dayclick='dayClicked'>
				<span slot='header-title' slot-scope='{ month, yearLabel }'>
					<span class="calendar-year">{{ yearLabel }}</span> <br/>
					<span class="calendar-month">{{ myMonths[month] }} </span>
				</span>
			</v-calendar>
	
		<v-ons-carousel overscrollable swipeable auto-scroll overscrollable:index.sync="carouselIndex" item-width="321px" >
			<v-ons-carousel-item class="task-card" v-for="(value, key) in items" v-bind:key="key">
				<v-ons-card>
					<div class="content">
						<v-ons-row>
							<v-ons-col id="ld-comp-name">{{value.ProjectName}}</v-ons-col>
						</v-ons-row>
						<v-ons-row>
							<v-ons-col id="ld-status" >{{value.Task}}</v-ons-col>
						</v-ons-row>
						<v-ons-row>	
							<v-ons-col id="ld-name" >{{value.ContactName}}</v-ons-col>
						</v-ons-row>
						<v-ons-row style="margin-top: 10px;">
							<v-ons-col width="50px">
								<a :href="'tel:' + value.ContactMobile">
									<v-ons-icon modifier="large" class="icon-phone"></v-ons-icon>
								</a>
							</v-ons-col>
							<v-ons-col>
								<a :href="'mailto:' + value.ContactEmail">
									<v-ons-icon modifier="large" class="icon-email"></v-ons-icon>
								</a>
							</v-ons-col>

						</v-ons-row>
					</div>
				</v-ons-card>
			</v-ons-carousel-item>
		</v-ons-carousel>
		<div class="no-tasks" v-show="items.length == 0">
			No tasks for today! 
		</div>

		<v-ons-fab position="bottom right" ripple id="add-fab" @click="goTodetail()">
     		 <v-ons-icon icon="md-plus" ></v-ons-icon> 	 
    	</v-ons-fab>
 
	</v-ons-page>

</template>


<script>

import Addlead from '../pages/Addlead.vue'
import GetTasksAPI from '../services/api/Leads.js';
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
			this.items = (typeof this.items == 'undefined')? [] : this.items;
			
 	 		
 	 	},
 	 	dayClicked(day) {
      		
			this.items = this.leads[day.dateTime];
			this.items = (typeof this.items == 'undefined')? [] : this.items;
      	 	this.attributes[0].dates = new Date(day.dateTime);
      	    
   		 }
  	
 	},

 	mounted:function() {

 		var payload = {
	 		fromDate: '01-01-2018',
	 		toDate: '12-12-2018',
	 		Token:localStorage.ki
	 	}
	 	
 	  	GetTasksAPI.getTasks(payload).then(leads => {
			var dates =  Object.keys(leads);
			var newLeads = {};
			var dots = []
			for (var i=0; i<dates.length; i++) {
				var dtobj = new Date(parseInt(dates[i]));
				dots[i] = dtobj;
					
			}
			this.leads = leads;
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
	  items: [],
	  
  }

 }
}
</script>
<style>
.page__content {
	padding: 0 6px;
}
.calendar-year {
	font-size: 20px;
	color: #fff;
}
.calendar-month {
	font-size: 30px;
	font-weight: bold;
	color: #fff;
	display: block;
	line-height: 26px;
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
.c-day-content {
	font-size: 1.6rem !important;
	color: white;
	padding: .9em;
}
.c-day-dots {
	margin-bottom: 6px !important;
}
.c-title br{
	display: none;
}
.task-card {
	width: 320px !important;
}

.toolbar {
	background: transparent;
	height: 60px;
    padding: 10px;
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
	height: 35px;
}
#ld-name {
	font-size: 15px;
	color: #444;
}
.ons-icon.fa {
	font-size: 1.4em;
	color: #333;
}
.no-tasks {
	color: #fff;
	text-align: center;
	margin-top: 60px
}

</style>