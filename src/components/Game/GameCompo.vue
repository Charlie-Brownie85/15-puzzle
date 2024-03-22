<script setup lang="ts">
import { ref, computed, watch } from 'vue';

export interface Props {
  configuration: Array<number>,
  onSolved?: () => void,
}

const props = defineProps<Props>();

const tiles = ref(props.configuration);

const isSolved = computed(() => tiles.value.every((tile, index, array) => (tile === 0 ? index === array.length - 1 : tile === index + 1)));
const emptyIndex = computed(() => tiles.value.indexOf(0));
const emptyRow = computed(() => Math.floor(emptyIndex.value / 4));
const emptyCol = computed(() => emptyIndex.value % 4);

function canMove(index: number): boolean {
  const tileRow = Math.floor(index / 4);
  const tileCol = index % 4;
  const distance = Math.abs(emptyRow.value - tileRow) + Math.abs(emptyCol.value - tileCol);

  return distance === 1;
}

function move(index: number) {
  if (canMove(index)) {
    const temp = tiles.value[emptyIndex.value];
    tiles.value[emptyIndex.value] = tiles.value[index];
    tiles.value[index] = temp;
  }
}

watch(isSolved, (solved) => {
  if (solved && props.onSolved) {
    props.onSolved();
  }
});
</script>

<template>
  <div class="flex justify-center items-center">
    <div
      class="game grid"
      :class="{ solved: isSolved }"
    >
      <div
        v-for="(tile, index) in tiles"
        :key="tile"
        class="tile"
        :class="[ tile === 0 ? 'empty' : '', canMove(index) ? 'cursor-pointer' : 'pointer-events-none' ]"
        @click="move(index)"
      >
        <span class="font-medium text-lg">
          {{ tile === 0 ? '' : tile }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.game {
  display: grid;
  /* grid of 4x4 with cells of 5rem width and height */
  grid-template-columns: repeat(4, 6rem);
  grid-template-rows: repeat(4, 6rem);
  @apply gap-1 mb-44;

  &.solved {
    box-shadow: 0 0 0.5rem rgba(0, 255, 0, 0.5);
  }
}

.tile {
  @apply flex justify-center items-center bg-tile-500 rounded-md;
  box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.3);
}

.empty {
  visibility: hidden;
}
</style>
