<template>
  <div class="container px-4 py-5" id="featured-3">
    <h1 class="pb-2 border-bottom">Cat Browser</h1>

    <label class="form-label" for="breed">Breed</label>
    <select
      id="breed"
      class="form-control"
      v-model="selectedBreed"
      @change="selectBreed(selectedBreed)"
    >
      <option value="">Select Breed</option>
      <option v-for="breed in breeds" :value="breed">{{ breed.name }}</option>
    </select>
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div class="feature col cat" v-if="cats.length > 0" v-for="cat in cats" :key="cat.id">
        <div
          class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"
        >
          <img :src="cat.url" class="card-img-top" alt="cat image" />
        </div>
        <button class="btn btn-primary" @click="goToDetails(cat)">View details</button>
      </div>
      <div class="col-md-12 text-center no-cats" v-else>
        {{ !selectedBreed ? "No cats available" : "" }}
      </div>
    </div>

    <div class="row" v-if="showLoadMoreButton">
      <div class="col-md-12 text-center">
        <button class="btn btn-primary loadmore" @click="loadMoreCats()">Load more</button>
      </div>
    </div>
  </div>

  <div class="row" v-if="error">
    <div class="col-md-12">
      <div class="alert alert-danger" role="alert">
        {{ error }}
      </div>
    </div>
  </div>
  <div class="b-example-divider"></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Breed, Cat } from "../types";
import { fetchBreeds, fetchCats } from "../services/api";

const limit = ref(10);
const page = ref(1);
const breeds = ref<Breed[]>([]);
const selectedBreed = ref<Breed>();
const cats = ref<Cat[]>([]);
const error = ref<string>("");
const route = useRoute();
const router = useRouter();
const loadBreeds = async () => {
  try {
    breeds.value = await fetchBreeds();
  } catch (error) {
    console.error(error);
    alert("Failed to load breeds. Please try again later.");
  }
};

const loadCats = async (id?: string) => {
  if (id === undefined) {
    id = selectedBreed.value.id;
  }
  try {
    const catsData = await fetchCats(id, limit.value, page.value);
    if (page.value > 1) {
      for (const cat of catsData) {
        cats.value.push(cat);
      }
    } else {
      cats.value = catsData;
    }
  } catch (error) {
    console.error(error);
    alert("Failed to load cats. Please try again later.");
  }
};

const loadMoreCats = () => {
  page.value += 1;
  loadCats();
};

const selectBreed = (breed: Breed) => {
  reset();
  if (breed.id) {
    selectedBreed.value = breed;
    loadCats();
  } else {
    selectedBreed.value = null;
    cats.value = [];
  }
};

const goToDetails = (cat: Cat) => {
  router.push(`/${cat.id}`);
};

const reset = () => {
  cats.value = [];
};

onMounted(async () => {
  await loadBreeds();
  limit.value = 10;
  cats.value = [];
  if (typeof route !== "undefined" && route.query.breed) {
    const breed = breeds.value.find((b) => b.id === route.query.breed);
    if (breed) {
      selectedBreed.value = breed;
    }
    await loadCats(route.query.breed);
  }
});

const showLoadMoreButton = computed(() => {
  return cats.value.length > 0 && cats.value.length % limit.value === 0;
});
</script>
