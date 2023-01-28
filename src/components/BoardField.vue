<script lang="ts" setup>
import { checkBonusField } from '../helpers/';

defineProps<{column: number; row: number}>();
</script>
<template>
    <div class="field">
        <span
            v-if="checkBonusField(column, row)"
            :style="{ background: checkBonusField(column, row).color }"
        >
            {{ checkBonusField(column, row).label }}
        </span>
        <slot name="default"></slot>
    </div>
</template>
<style lang="scss" scoped>
.field{
    width: 100%;
    height: 100%;
    border: 1px solid gray;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;


    span{
        position: absolute;
        text-align: center;
        font-size: 0.8rem;
        width: calc(100% - 2px);
        height: calc(100% - 2px);;
        padding: 12px 10px;
        box-sizing: border-box;
        top: 1px;
        left: 1px;
    }

    &.center{
        background: lightgray;
    }
}
</style>