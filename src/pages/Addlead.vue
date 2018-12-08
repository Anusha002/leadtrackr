<template>
	<v-ons-page id="addleadpage">
		<h1>Add Lead</h1>
  		<v-ons-list class="leaddata">
    		<v-ons-list-item>
     			 <div class="leaddetails">
     			 	<v-ons-input placeholder="Lead name" v-model="leadname"></v-ons-input>
        		</div>
        	</v-ons-list-item>
        	<v-ons-list-item>	
        		<div class="leaddetails">
        			<v-ons-input placeholder="Type" v-model="type"></v-ons-input>
        		</div>	
        	</v-ons-list-item>	
        	<v-ons-list-item>	
        		<div class="leaddetails">	
        			<v-ons-input placeholder="Contact name" v-model="contactname"></v-ons-input>
        		</div>
        	</v-ons-list-item>
        	<v-ons-list-item>	
        		<div class="leaddetails">			
        			<v-ons-input placeholder="Contact number" v-model="contactnumber"></v-ons-input>
      			 </div>
    		</v-ons-list-item>
    		<v-ons-list-item>
     			 <div class="leaddetails">
        			<v-ons-input placeholder="Land Line" v-model="landline"></v-ons-input>
        		</div>
        	</v-ons-list-item>
        	<v-ons-list-item>	
        		<div class="leaddetails">
        			<v-ons-input placeholder="Email" v-model="email"></v-ons-input>
        		</div>	
        	</v-ons-list-item>	
        	<v-ons-list-item>	
        		<div class="leaddetails">	
        			<v-ons-input placeholder="Owned by" v-model="ownedby"></v-ons-input>
        		</div>
        	</v-ons-list-item>
        	<v-ons-list-item>	
        		<div class="leaddetails">			
        			<v-ons-input placeholder="Handled by" v-model="handledby"></v-ons-input>
      			 </div>
    		</v-ons-list-item>

    		<v-ons-list-item>
	    		<v-ons-button  style="margin: 6px 4px">Cancel</v-ons-button>
	    		<v-ons-button  style="margin: 6px 4px">Save</v-ons-button>
	    	</v-ons-list-item>
    
  		</v-ons-list>
	</v-ons-page>   
</template>

<script>
  export default{
    data() {
    return {
      leadname: "", 
      type: "",
      contactname: "",
      contactnumber: "",
      landline: "", 
      email: "",
      ownedby: "",
      handledby: ""
      
     	} 
	 }
  }
</script>

<style>
.leaddata{
	border: 1px;
	margin: 20px;
	border-radius: 6px;
}

h1{
	text-align: center;
	color: #fff;
	font-size: 8px;
}

 </style>  
