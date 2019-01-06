<template id="container">
	

	<v-ons-splitter>
		
		<v-ons-splitter-side swipeable width="150px" collapse="" side="left"
		:open.sync="openSide" class="frame" id="menu">	
			<v-ons-page>
				<v-ons-list>
					<v-ons-list-item v-for="page in pages" 
					tappable modifier="chevron"
					@click="currentPage = page; openSide = false"
					>
						<div class="center">{{ page }}</div>
					</v-ons-list-item>
				</v-ons-list>
			</v-ons-page>
		</v-ons-splitter-side>
		<v-ons-splitter-content  class="frame"	>
			<component :is="currentPage" :toggle-menu="() => openSide = !openSide"></component>
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
		
		data() {
			return {
				currentPage: 'Dash',
				pages: ['Dash','Leadlist','Logout'],
				openSide: false
				};
			},
	}
</script>
<style >
.bottom-bar{
  background: transparent;
}
.button--large {
  margin: 0 !important;
}
.green-button {
  background: #14BA88;
  font-weight: bold;
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
		font-size: 1.2em !important;
	}
	
</style>