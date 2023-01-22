<script lang="ts" setup>
import { checkBonusField } from '../helpers/';

defineProps<{column: number; row: number}>();
</script>
<template>
    <div class="field"
        :class="[{center: column === 7 && row === 7}]"
    >
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
    width: 60px;
    height: 60px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;

    span{
        position: absolute;
        text-align: center;
        font-size: 0.8rem;
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        padding: 5px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &.center{
        background: lightgray;
    }
}
</style>