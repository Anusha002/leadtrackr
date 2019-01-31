<template id="container">
	

	<v-ons-splitter>
		
		<v-ons-splitter-side swipeable width="230px" collapse="" side="left"
		:open.sync="openSide" class="frame" id="menu">	
			<v-ons-page>
				<div class="hamheader">
					<v-ons-row>
						<v-ons-col width="30%">
							<img src="../assets/user.png" width="60" />
						</v-ons-col>
						<v-ons-col class="username">
							{{user.name}}
							<span>{{user.designation}}</span>
						</v-ons-col>	
					</v-ons-row>
					<v-ons-row class="numbers">
						<v-ons-col class="hamnumbers">
							{{user.leads}}
							<span>Leads</span>
						</v-ons-col>
						<v-ons-col class="hamnumbers">
							{{user.tasks}}
							<span>Pending</span>
						</v-ons-col>
						<v-ons-col class="hamnumbers">
							{{user.completed}}
							<span>Completed</span>
						</v-ons-col>
					</v-ons-row>
				</div>
				<v-ons-list>
					<v-ons-list-item v-for="(item,key) in menu"  v-bind:key=key
					tappable modifier="chevron"
					@click="openPage(item.link)"
					>
						<div class="center">{{ item.name }}</div>
					</v-ons-list-item>
				</v-ons-list>
			</v-ons-page>
		</v-ons-splitter-side>
		<v-ons-splitter-content  class="frame"	>
			<v-ons-navigator :page-stack="pageStack"></v-ons-navigator>
		</v-ons-splitter-content>

     </v-ons-splitter> 
</template>
<script>
	import Dash from '../pages/Dash.vue';
	import Logout from '../pages/Logout.vue';
	import Tasklist from '../pages/Tasklist.vue';
	import Leadlist from '../pages/Leadlist.vue';
	import Addlead from '../pages/Addlead.vue';
	import Followups from '../pages/Followups.vue'
	export default{
		name: "Container",
		components: {
			Dash,
			Logout,
			Tasklist,
			Leadlist,
			Addlead,
			Followups
		},
		methods: {
			openPage(link){
				this.openSide = false;
				this.$router.push('/'+link);
				//this.pageStack.push(link); 
				
			}
		},
		
		data() {
			var usr = JSON.parse(localStorage.usr);
			return {
				user: {
					name: usr.FullName,
					designation: usr.Designation,
					leads: usr.no_of_leads,
					tasks: usr.pending_tasks,
					completed: usr.completed_tasks
				},
				pageStack: [Dash],
				menu:[{
					name: "Leads",
					link: 'leadlist'
				}, {
					name: "Logout",
					link: 'logout'
				}],
				openSide: false
				};
			},
	}
</script>
<style >
.page__content {
	margin-top: 0 !important;
	padding: 0;
}
.hamheader {
	background: #f7f7f7;
	padding: 10px;
	border-bottom: 1px solid #eee;
}
.username {
	font-weight: bold;
	color: #3324f5;
	font-size: 13px;
	margin-top:10px;
}
.username span{
	display: block;
	font-weight: normal;
	font-size: 12px;
	color: #666;
	font-style: italic;
	margin-top: 2px;
}
.numbers {
	margin-top: 10px;
	padding-top: 10px;
	border-top: 1px solid #eee;
}
.hamnumbers {
	font-weight: 800;
	font-size: 15px;
	text-align: center;
}
.hamnumbers span{
	display: block;
	font-weight: normal;
	font-size: 13px;
	color: #666;
}
.bottom-bar{
  background: transparent;
  height: 60px;
}
.button--large {
  margin: 0 !important;
}
.green-button {
  background: #1d0149;
  font-weight: bold;
  height: 60px;
  line-height: 60px;
}
.full-width {
	border-radius: 0;
}
	.frame {
		padding-top: 40px;
	}
	.frame .page__content {
		margin-top: 50px;
	}
	#menu .page__background {
		background: #fff;
	}
	.icon-list .icon-calender{
		margin:20px;
	}
	.header-icon {
		font-size: 1em !important;
	}
	
</style>