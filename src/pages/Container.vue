<template id="container">
	

	<v-ons-splitter>
		<v-ons-toolbar>
    		<div class="left">
	      		<v-ons-toolbar-button @click="toggleMenu()">
	        		<v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
	      		</v-ons-toolbar-button>
    		</div>
 		</v-ons-toolbar>
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
		<v-ons-splitter-content class="frame">
			<component :is="currentPage" :toggle-menu="() => openSide = !openSide"></component>
		</v-ons-splitter-content>

     </v-ons-splitter> 
</template>
<script>
	import Dash from '../pages/Dash.vue'
	export default{
		name: "Container",
		components: {
			Dash
		},
		methods: {
			toggleMenu()  {
				this.openSide = ((this.openSide) ? false : true);
			}
		},
		data() {
			return {
				currentPage: 'Dash',
				pages: ['Dash', 'logout'],
				openSide: false
				};
			},
	}
</script>
<style >
	.frame {
		margin-top: 40px;
	}
	#menu .page__background {
		background: #fff;
	}
</style>