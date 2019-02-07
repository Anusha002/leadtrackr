<template>
    <v-ons-card @click="goToFollowup(value)">
        <div class="content">
            <v-ons-row>
                <v-ons-col id="ld-comp-name">{{value.LeadName}}</v-ons-col>
            </v-ons-row>
            <v-ons-row>
                
                <v-ons-col id="ld-status" v-if="mode=='Task'">{{value.Task}}</v-ons-col>
                <v-ons-col id="ld-status" v-else>{{value.Stage}}</v-ons-col>
            </v-ons-row>
            <v-ons-row>	
                <v-ons-col id="ld-name" >{{value.ContactName}}</v-ons-col>
            </v-ons-row>
            <v-ons-row style="margin-top: 10px;">
                <v-ons-col width="40px">
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
</template>
<script>
export default {
    name: "Card",
    props: ['cardData', 'mode'],
    data(){
        return {
            value: this.$props.cardData
        }
    },
    methods: {
        goToFollowup(project){
			localStorage.setItem("project", JSON.stringify(project));
			this.$router.push({
				'name': 'followups',
				'params':{
   					'items': project
   				}
			});
		},
    }
}
</script>