<template id="container">
	

	<v-ons-splitter>
		
		<v-ons-splitter-side swipeable width="150px" collapse="" side="left"
		:open.sync="openSide" class="frame" id="menu">	
			<v-ons-page>
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
				this.pageStack.push(link); 
				
			}
		},
		
		data() {
			return {
				pageStack: [Dash],
				menu:[{
					name: "Home",
					link: Dash
				}, {
					name: "Leads",
					link: Leadlist
				}, {
					name: "Logout",
					link: Logout
				}],
				openSide: false
				};
			},
	}
</script>
<style >
.bottom-bar{
  background: transparent;
  height: 60px;
}
.button--large {
  margin: 0 !important;
}
.green-button {
  background: #14BA88;
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