<template>
  <div class="container mt-3">
    <div class="col-md-12 d-flex justify-content-center">
      <div class="col-md-9">
        <div class="card cat-details">
          <div class="card-header">
            <button @click="goBack(breed.id)" class="btn btn-primary back">Back</button>
          </div>
          <img :src="cat?.url" :alt="breed.name" class="card-img cat-img" />
          <div class="card-body">
            <h3 class="card-title breed-name">{{ breed.name }}</h3>
            <p class="card-text breed-origin">
              <strong>Origin:{{ breed.origin }}</strong>
            </p>
            <p class="card-text breed-temperament">
              <strong>{{ breed.temperament }}</strong>
            </p>
            <p class="card-text breed-description">{{ breed.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Breed, Cat } from "../types";
import { fetchCatById, fetchCats } from "../services/api";
import { BCard, BButton } from "bootstrap-vue";

const cat = ref<Cat | null>(null);
const currentPage = ref(1);

const route = useRoute();
const router = useRouter();

const breedId = ref(route.params.id);
const breed = ref<Breed>({
  id: "",
  name: "",
  description: "",
  origin: "",
  temperament: "",
});

const fetchCatDetails = async (id: string) => {
  try {
    const catData = await fetchCatById(id);
    cat.value = catData;
    breed.value = catData.breeds[0];
  } catch (error) {
    alert("Apologies but we could not load the cat details for you at this time! Miau!");
  }
};

watch(
  () => route.params.id,
  (newVal) => {
    breedId.value = newVal;
  }
);
const goBack = (id: string) => {
  router.push({ path: "/", query: { breed: id } });
};

onMounted(async () => {
  await fetchCatDetails(breedId.value);
});
</script>
