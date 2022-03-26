<template>
  <main class="mt-5">
    <div class="container">
    <table class="table table-hover">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Телефон</th>
        <th scope="col">Описание</th>
        <th scope="col">Редактирование</th>
        <th scope="col">Действие</th>
      </tr>
      </thead>
      <tr v-for="manager in managersList" :key="manager.id">
        <td>{{manager.id}}</td>
        <td>{{manager.phone}}</td>
        <td>{{manager.description}}</td>
        <td><router-link class="button small text-center mb-4"  :to="{ name: 'Manager', params: { id: manager.id }}" >Изменить</router-link></td>
        <td><button class="button is-primary"  @click="deletePlayer(manager.id)">Удалить</button></td>
      </tr>
    </table>
    </div>
  </main>
</template>

<script>

import axios from 'axios'

export default {
  name: "Home",
  data(){

    return {

    }
  },
  computed:{
    managersList(){
      console.log(this.$store.state.managers);
      return this.$store.state.managers;
    }
  },
  methods:{
    async deletePlayer(id) {
      let index = this.managersList.findIndex(manager => manager.id === id)
      console.log(index);
      await axios.delete('http://localhost:8000/api/manager/' + id)
      this.managersList.splice(index, 1)
    },

  },

};

</script>

