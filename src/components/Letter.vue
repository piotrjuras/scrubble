<script lang="ts" setup>
import { getLetterPoints } from '../helpers';

defineProps<{letter: string}>();

</script>
<template>
    <button>
        <div>{{ letter }}</div>
        <span>{{ getLetterPoints(letter).points }}</span>
    </button>
</template>
<style lang="scss" scoped>
button{
    width: 55px;
    height: 55px;
    text-align: center;
    line-height: 45px;
    font-size: 2.3rem;
    font-weight: 900;
    position: relative;
    background: rgb(254, 217, 149);
    color: black;
    border-radius: 5px;
    z-index: 1;

    margin: 0;
    padding: 0;

    outline: none;
    border: none;
    cursor: pointer;


    &[disabled]{
        color: rgb(85, 85, 85);
        cursor: not-allowed;
    }

    & > div{
        height: 45px;
    }

    &.highlight{
        background: lightgreen;
    }

    span{
        position: absolute;
        font-size: .8rem;
        font-weight: 500;
        line-height: 10px;
        bottom: 5px;
        right: 5px;
    }
}
</style>