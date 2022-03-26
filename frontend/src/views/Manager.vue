<template>
  <main class="mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-6">
          <form @submit.prevent="onSubmit">
            <span class="help is-danger" v-text="errors"></span>

            <div class="field mb-1">
              <div class="control">
                <input class="input" type="text"  placeholder="Имя" v-model="manager.name" @keydown="errors = ''">
              </div>
            </div>
            <div class="field mb-1">
              <div class="control">
                <input class="input" type="tel" placeholder="Телефон" v-model="manager.phone" @keydown="errors = ''">
              </div>
            </div>
            <div class="field mb-1">
              <div class="control">
                <textarea v-model="manager.description" placeholder="Описание"></textarea>
              </div>
            </div>

            <button class="button is-primary">Изменить</button>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-auto"><router-link  :to="{ name: 'Home'}" >На главную</router-link></div>
      </div>


    </div>
  </main>
</template>

<script>
//params


import axios from 'axios'

export default {
  name: "Home",
  data(){

    return {
      name: '',
      phone: '',
      description: '',
      errors: '',
      manager:{}
    }
  },
  computed:{
    managersList(){
      console.log(this.$store.state.managers);
      return this.$store.state.managers;
    }
  },
  async created () {

    const response = await axios.get('http://localhost:8000/api/manager/'+this.$route.params.id)
    this.manager = response.data.data

  },
  methods:{
    onSubmit() {
      this.postManager()
    },
    async postManager() {
      console.log(this.$data.manager);
      axios.post(  'http://localhost:8000/api/manager/'+this.$route.params.id+'/edit', this.$data.manager)
          .then(response => {
            if(response.message){
              this.errors=response.message;
            }
            console.log();
            this.errors='success';
            this.$store.dispatch('getManagersAction')
          })
          .catch(error => {
            // handle authentication and validation errors here
            this.errors = error.response.data.errors
          })
    }

  },

};
</script>
