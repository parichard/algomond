<template>
  <div class="container">
    <div class="large-12 medium-12">
      <div style="margin: 20px;" class="col-sm-12 btn btn-info"> Sweetalert in Vue.js </div>
        <button style="margin: 10px;" class="btn btn-info" v-on:click="showAlert">Alert</button>
        <button style="margin: 10px;" class="btn btn-info" v-on:click="showAlertConfirm">Confirm</button>
        <button class="btn btn-warning" v-on:click="alertDisplay">Custom Design</button>
    </div>
  </div>
</template>
<script>

  export default {
    methods: {
        showAlert(){
            this.$swal('Hello  world!!!');
        },
        showAlertConfirm(){
            this.$swal({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d13737',
              confirmButtonText: 'Yes, Delete'
            }).then((result) => {
              if (result.value) {
                this.$swal(
                  'Deleted!',
                  'Your Data has been deleted.',
                  'Success'
                )
              }
            });
        },
        alertDisplay() {
        this.$swal({
              title: '<i>Custom Design</i>',
          html:
            'Hello C# Corner ' ,
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
        })
      }
    }
  }
</script>