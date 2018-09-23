<template>
    <div class="authentication">
      <p>{{this.profile.given_name}}</p>
    </div>
</template>

<script>
export default {
  name: 'Authentication',
  props: ['profile']
}
</script>

<style scoped>
.authentication{
  position: absolute;
  right:0;
  top:0;
}
</style>
