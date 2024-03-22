<script setup lang="ts">
import { ref } from 'vue';

const base = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

const shuffle = (array: Array<number>): Array<number> => {
  const shuffled = array.slice();
  let currentIndex = shuffled.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = shuffled[currentIndex];
    shuffled[currentIndex] = shuffled[randomIndex];
    shuffled[randomIndex] = temporaryValue;
  }

  return shuffled.every((tile, index) => tile === array[index]) ? shuffle(shuffled) : shuffled;
};

const configuration = ref(shuffle(base));

function newGame() {
  configuration.value = shuffle(base);
  // configuration.value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15];
}
</script>

<template>
  <main class="wrapper p-8 grid h-dvh">
    <h1 class="font-bold text-3xl text-base-800 text-center">
      15 Puzzle game
    </h1>
    <div class="flex justify-center items-center">
      <button
        class="p-4 bg-state-success-500 text-base-200 rounded-md font-medium"
        @click="newGame"
      >
        New game
      </button>
    </div>
    <GameCompo
      :configuration="configuration"
      :key="configuration"
    />
  </main>
</template>

<style lang="postcss" scoped>
.wrapper {
  grid-template-rows: 5% 15% 80%;
}
</style>
