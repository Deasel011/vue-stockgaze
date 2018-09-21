<template>
    <div class="authentication">
      <form>
        <input id="username" placeholder="username"/>
        <input id="password" placeholder="password"/>
        <input type="submit" value="OK"/>
      </form>
    </div>
</template>

<script>
export default {
  name: 'Authentication'
}
</script>

<style scoped>
.authentication{
  position: absolute;
  right:0;
  top:0;
}
</style>
