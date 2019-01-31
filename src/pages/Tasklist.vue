<template>
	<v-ons-page id="tasklistpage">
		<v-ons-toolbar>
			<div class="left">
	      		<v-ons-toolbar-button>
					<v-ons-icon icon="md-chevron-left" size="28px" style="color: #fff; margin-left: 10px;" @click="goToHome()"></v-ons-icon>  
				</v-ons-toolbar-button>
    		</div>
    		<div class="center">
    			Tasks List
	        </div>
    		<!-- <div class="left">
	      		<v-ons-toolbar-button @click="toggleMenu()">
	        		<v-ons-icon class="icon-hamburger header-icon"></v-ons-icon>	
	      		</v-ons-toolbar-button>
    		</div>
    		<div class="right">
    			<v-ons-toolbar-button @click="toggleView()">
	        		<v-ons-icon class="icon-calender header-icon" id="leadicon"></v-ons-icon>
	        	</v-ons-toolbar-button>	
	        </div>	 -->
 		</v-ons-toolbar>
		<v-ons-progress-bar :value="progress"></v-ons-progress-bar> 
 		<v-ons-button modifier="material--flat" class="filterclass" style="margin: 4px 4px" @click="toggleFilter()">Filter</v-ons-button>
 		<v-ons-card v-show="flagfilter == 'true'">
			<v-ons-row>
				<v-ons-col width="100px" >
					<div @click="openCalender('from')" class="small-text">From Date</div>
					<div @click="openCalender('from')"  class="fromdate">{{dateformat(FromDate)}}</div>
					<v-date-picker :popover-visibility="showfromcalender" mode='single' v-model="FromDate" name="fromdate" v-validate="'required'" @dayclick='dayClicked'>
				</v-date-picker>

				</v-ons-col>
				<v-ons-col width="100px" >
					<div @click="openCalender('to')" class="small-text">To Date</div>
					<div @click="openCalender('to')" class="fromdate">{{dateformat(ToDate)}}</div>
					<v-date-picker :popover-visibility="showtocalender" :min-date='FromDate' mode='single' v-model="ToDate" name="todate" v-validate="'required'" @dayclick='dayClicked' style="margin-left: -20px">
				</v-date-picker>

				</v-ons-col>
				<v-ons-col>
					<v-ons-button class="gobutton" @click="listTasks()">Go</v-ons-button>
				</v-ons-col>
			</v-ons-row>		
 			
 		</v-ons-card>
		<div>
			<v-ons-row v-for="(value, key) in leads" v-bind:key="key">	
				<div class="date-header">{{convertDate(key)}}</div>	
				<v-ons-list class="list">
					<v-ons-list-item  v-for="(card, index) in value" v-bind:key="index" @click="goToFollowup(card)">
						<v-ons-row>
							<v-ons-col id="ld-comp-name">{{card.LeadName}}</v-ons-col>		
						</v-ons-row>
						<v-ons-row>
							<v-ons-col id="ld-stage" >{{card.Stage}}</v-ons-col>
						</v-ons-row>
						<v-ons-row>	
							<v-ons-col id="ld-name" >{{card.ContactName}}</v-ons-col>
						</v-ons-row>
						<v-ons-row style="margin-top: 10px;">
							<v-ons-col width="50px">
								<a :href="'tel:' + card.ContactMobile" v-show="card.ContactMobile != ''">
									<v-ons-icon modifier="small" class="icon-phone"></v-ons-icon>
								</a>
							</v-ons-col>
							<v-ons-col>
								<a :href="'mailto:' + card.ContactEmail" v-show="card.ContactEmail != ''">
									<v-ons-icon modifier="small" class="icon-email"></v-ons-icon>
								</a>
							</v-ons-col>
						</v-ons-row>
					</v-ons-list-item>
				</v-ons-list>
			</v-ons-row>

		</div>
		<div class="no-tasks" v-show="Object.keys(leads).length == 0">
			No Tasks Found! 
		</div>
		<v-ons-fab position="bottom right" ripple id="add-fab" @click="goTodetail()">
     		 <v-ons-icon icon="md-plus" ></v-ons-icon> 	 
    	</v-ons-fab>
	</v-ons-page>
</template>

<script>

import GetTasksAPI from '../services/api/Leads.js';
import Utils from '../services/api/Utils.js';	
import Dash from '../pages/Dash.vue';

export default {
	name: 'tasklist',
	data() {
		return {
			progress: 0,
			leads: {},
			dtobj:{},
			flagfilter:"false",
			FromDate: "",
			ToDate:"",
      		showfromcalender: 'hidden',
      		showtocalender: 'hidden',
		}				
	 },
	 components: {
		
		Dash
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
		goTodetail() {
   			this.$router.push('/addlead')
  		},
  		dateformat(date) {
       if(date != "") {
         return Utils.formatDate(new Date(date))
       }
       
     },
     openCalender(mode) {

      if (mode == 'from') {
       		this.showfromcalender = this.showfromcalender == 'hidden' ? 'visible' : 'hidden';
        }
       if (mode == 'to') {
       	
       		this.showtocalender = this.showtocalender == 'hidden' ? 'visible' : 'hidden';
        }
     },
     dayClicked(day) {
     	
        this.showfromcalender = 'hidden';
        this.showtocalender = 'hidden';

     },

     listTasks(){
     	if(this.FromDate !="" && this.ToDate != "") {
			this.intervalID = setInterval(() => {
				if (this.progress === 100) {
					clearInterval(this.intervalID);
					this.progress = 0;
					return;
				}
				this.progress++;
			}, 40);	 

			var payload = {
				fromDate: Utils.formatDate(this.FromDate).split("-").reverse().join("-"),
				toDate: Utils.formatDate(this.ToDate).split("-").reverse().join("-"),
				UserID:Utils.getUserid(),
				Token:localStorage.ki
			}
			console.log(payload);
			GetTasksAPI.getTasks(payload).then(leads => {
				this.progress = 100;	
				this.leads = leads;
				
			})
       }
     },
	 convertDate(date){
	 		var months =  [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	 		var dtobj = new Date(parseInt(date));
	 		var dt = dtobj.getDate();
	 		if(dt == 1||dt == 21||dt == 31) {
	 			dt += 'st'
	 		} else if(dt == 2) {
	 			dt += 'nd'
	 		} else if(dt == 3) {
	 			dt += 'rd'
	 		} else {
	 			dt += 'th'
	 		}
	 		
	 		return dt + ' ' + months[dtobj.getMonth()] + ' ' + dtobj.getFullYear(); 


	 		

		 },
		 toggleFilter(){

		 	this.flagfilter = this.flagfilter == 'false' ? 'true' : 'false';
		 	this.FromDate = "";
		 	this.ToDate = "";

		 },
		 goToHome() {
		 	this.$router.back(-1);
		 }
		//  toggleMenu()  {

		// 	this.$parent.$parent.$parent.$parent.openSide = ((this.$parent.$parent.$parent.$parent.openSide) ? false : true);
		// },
		// toggleView() {
			
		// 	if (document.getElementById('leadicon').classList.contains("icon-list")){
		// 		this.$parent.$parent.$parent.currentPage = 'Tasklist'
		// 		document.getElementById('leadicon').classList.remove("icon-list"); 
		// 		document.getElementById('leadicon').classList.add("icon-calender"); 
		// 	} else{
		// 		this.$parent.$parent.$parent.$parent.pageStack.push(Dash);
		// 		document.getElementById('leadicon').classList.remove("icon-calender"); 
		// 		document.getElementById('leadicon').classList.add("icon-list"); 
		// 	}
			
		// },
	 },
	 mounted:function() {	
	 
		 this.leads = JSON.parse(localStorage.getItem('lds'));
		console.log(this.leads)

 	  }
 	 }	
			
	
</script> 
<style scoped>
	
.toolbar {
	background: transparent;
}
.fab {
	background: #14BA88 !important;
}
.fab .ons-icon{
	color: #fff;
}
.list {
	border-radius: 10px;
	width: 90%;
    margin: 20px;
}
#ld-comp-name {
	font-size: 16px;
	font-weight: 500;
	color:#333;
}
#ld-stage {
	color: #08976C;
	font-size: 13px;
	height: 30px;
}
#ld-name {
	font-size: 15px;
	color: #444;
}
.ons-icon.fa {
	font-size: 1.4em;
	color: #333;
}
.date-header {
	color: #fff;
	font-size: 1em;
	margin-left: 12px;
	margin-top: 20px;
	font-weight: 500;
}
.list{
	margin: 10px !important;
	width: 98%;
}

.filterclass{
	font-size: 14px;
	border-color: #999;
	color: black;
	background-color: white	;
	border-radius: 10px;
}
.gobutton{
	margin-left: 20px;
    margin-top: 0;
   } 
   .small-text {
	   color: #999;
	   font-size: 12px;
	   margin-bottom: 5px;
   }
   .fromdate, .todate {
	   color: #333;
	   border-bottom: 1px solid #999;
	   height: 18px;
	   font-size: 14px;
   }
	.fromdate {
		margin-right: 5px;
	}
</style>