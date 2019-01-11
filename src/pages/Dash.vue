<template >	
	<v-ons-page id="dash">	
		<v-ons-toolbar>
    		<div class="left">
	      		<v-ons-toolbar-button @click="toggleMenu()">
	        		<v-ons-icon class="icon-hamburger header-icon"></v-ons-icon>	
	      		</v-ons-toolbar-button>
    		</div>
    		<div class="right">
    			<v-ons-toolbar-button @click="toggleView()">
	        		<v-ons-icon class="icon-list header-icon" id="leadicon"></v-ons-icon>
	        	</v-ons-toolbar-button>	
	        </div>	
 		</v-ons-toolbar>
			<v-calendar is-double-paned :formats='formats' :attributes='attributes' title-position='left'@dayclick='dayClicked'>
				<span slot='header-title' slot-scope='{ month, yearLabel }'>
					<span class="calendar-year">{{ yearLabel }}</span> <br/>
					<span class="calendar-month">{{ myMonths[month] }} </span>
				</span>
			</v-calendar>
	
		<v-ons-carousel overscrollable swipeable auto-scroll overscrollable:index.sync="carouselIndex" item-width="321px" >
			<v-ons-carousel-item class="task-card" v-for="(value, key) in items" v-bind:key="key">
				<v-ons-card @click="goToFollowup(value)">
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
import Followups from '../pages/Followups.vue'
import LoginApi from '../services/api/User.js';


export default {
	name: "Dash",
	components: {
		Addlead,
		Followups
	},

	methods:{

		goToFollowup(project){
			localStorage.setItem("project", JSON.stringify(project));
			this.$router.push({
				'name': 'followups',
				'params':{
   					'items': project
   				}
			});
		},
		toggleMenu()  {
			this.$parent.$parent.$parent.openSide = ((this.$parent.$parent.$parent.openSide) ? false : true);
		},
		toggleView() {
			
			if (document.getElementById('leadicon').classList.contains("icon-list")){
				this.$parent.$parent.$parent.currentPage = 'Tasklist'
				document.getElementById('leadicon').classList.remove("icon-list"); 
				document.getElementById('leadicon').classList.add("icon-calender"); 
			} else{
				this.$parent.$parent.$parent.currentPage = 'Dash'
				document.getElementById('leadicon').classList.remove("icon-calender"); 
				document.getElementById('leadicon').classList.add("icon-list"); 
			}
		},
		
  		goTodetail() {
   			this.$router.push('/addlead')
  		},
  	 	getCards(date){
  	 		var ndate  =  new Date(date.getFullYear(),date.getMonth(),date.getDate());
			this.items = this.leads[Math.round(ndate.getTime())];	
			this.items = (typeof this.items == 'undefined')? [] : this.items;	
 	 		
 	 	},
 	 	dayClicked(day) {
      		console.log(day);
			this.items = this.leads[day.dateTime];
			this.items = (typeof this.items == 'undefined')? [] : this.items;
      	 	this.attributes[0].dates = new Date(day.dateTime);
      	    
   		 }
  	
 	},

 	mounted:function() {

 		var payload = {
	 		fromDate: '01-01-2018',
	 		toDate: '01-31-2019',
	 		Token:localStorage.ki
	 	}
	 	
 	  	GetTasksAPI.getTasks(payload).then(leads => {
			localStorage.setItem('lds', JSON.stringify(leads));
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
	margin-top: 20px !important;
}
#dash .calendar-year {
	font-size: 20px;
	color: #fff;
}
#dash .calendar-month {
	font-size: 30px;
	font-weight: bold;
	color: #fff;
	display: block;
	line-height: 26px;
}
#dash .c-header{
	margin-bottom: 5px;
}
#dash .c-pane-container {
	width: 100%;
	background-color: transparent !important;
	border: none !important;
}
#dash .c-weekday {
	color: #fff;
	opacity: .6;
	text-transform: uppercase;
}
#dash .c-day-content {
	font-size: 1.6rem !important;
	color: white;
	padding: .9em;
}
#dash .c-day-dots {
	margin-bottom: 6px !important;
}
#dash .c-title br{
	display: none;
}
.task-card {
	width: 320px !important;
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
.toolbar {
		background: transparent;
		height: 60px;
		padding: 10px;
	}
</style>