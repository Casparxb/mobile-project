<template>
    <div>
        <comment :id="$route.params.id"></comment>
    </div>
</template>
<script>
import comment from '../subcompoents/comment.vue'

export default {
    components:{
        comment
    }
}
</script>

<style scoped>

</style>