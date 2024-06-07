<script setup lang="ts">
export type Character = {
  id: number;
  name: string;
  image: string;
  species: string;
  type: string;
  location: {
    name: string;
  };
  origin: {
    name: string;
    url: string;
  };
};

interface Props {
  item: Character;
}

const props = defineProps<Props>();

const flipContainer = ref<HTMLElement | null>(null);
const isFlipped = ref<boolean>(false);

const handleMouseMove = (event: PointerEvent) => {
  if (!flipContainer.value) return;

  const rect = flipContainer.value.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  const rotateX = (mouseY / rect.height - 0.5) * 50;
  const rotateY = -(mouseX / rect.width - 0.5) * 50;
  flipContainer.value.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const resetRotation = () => {
  if (!flipContainer.value) return;

  flipContainer.value.style.transform = "";
};

const handleFlip = () => {
  if (!flipContainer.value) return;

  if (isFlipped.value) {
    flipContainer.value.classList.remove("is-flipped");
    isFlipped.value = false;
  } else {
    flipContainer.value.classList.add("is-flipped");
    isFlipped.value = true;
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    handleFlip();
  }
};

const attributeList = computed(() => {
  return [
    {
      label: "Name",
      value: props.item.name,
    },
    {
      label: "Gender",
      value: props.item.gender,
    },
    {
      label: "Origin",
      value: props.item.origin.name,
    },
    {
      label: "Species",
      value: props.item.species,
    },
    {
      label: "Type",
      value: props.item.type,
    },
    {
      label: "Location",
      value: props.item.location.name,
    },
  ];
});
</script>

<template>
  <figure
    ref="flipContainer"
    @mousemove="handleMouseMove"
    @mouseleave="resetRotation"
    @keydown="handleKeyDown"
    tabindex="0"
    class="flip-container relative min-h-96 cursor-pointer rounded-3xl"
  >
    <div
      class="flip-card-front absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-3xl bg-cover bg-center transition-all duration-1000 ease-in-out bg-slate-950"
      :style="`background-image: url(${item.image})`"
    />

    <figcaption
      class="flip-card-back absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-3 rounded-3xl bg-slate-950 p-4 text-slate-100 transition-all duration-1000 ease-in-out"
    >
      <h2 class="mb-2 text-2xl font-bold">{{ item.name }}</h2>

      <img
        :src="item.image"
        :alt="item.name"
        class="size-24 rounded-full object-cover"
      />

      <ul>
        <li v-for="item in attributeList" :key="item.label">
          {{ item.label }}: {{ item.value || "-" }}
        </li>
      </ul>
    </figcaption>
  </figure>
</template>

<style scoped>
.flip-container {
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
}

.flip-card-front,
.flip-card-back {
  backface-visibility: hidden;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  transform-style: preserve-3d;
}

.flip-card-back {
  transform: rotateY(180deg);
}

.flip-container:hover .flip-card-front {
  transform: rotateY(180deg);
}

.flip-container:hover .flip-card-back {
  transform: rotateY(360deg);
}

.flip-container.is-flipped .flip-card-front {
  transform: rotateY(180deg);
}

.flip-container.is-flipped .flip-card-back {
  transform: rotateY(360deg);
}

.flip-container .flip-card-back h2 {
  transform: translateZ(40px);
}
.flip-container .flip-card-back img {
  transform: translateZ(50px);
}
.flip-container .flip-card-back ul {
  transform: translateZ(40px);
}
.flip-container .flip-card-back div {
  transform: translateZ(30px);
}
</style>
