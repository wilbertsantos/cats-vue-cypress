import axios from "axios";
import { Breed, Cat } from "../types";

const API_BASE_URL = "https://api.thecatapi.com/v1";

export async function fetchCatById(catId: string): Promise<Cat> {
  const response = await axios.get<Cat>(`${API_BASE_URL}/images/${catId}`);
  return response.data;
}

export async function fetchCats(id: string, limit: number, page: number): Promise<Cat[]> {
  const response = await axios.get<Cat[]>(
    `${API_BASE_URL}/images/search?breed_id=${id}&limit=${limit}&page=${page}`
  );
  return response.data;
}

export async function fetchBreeds(): Promise<Breed[]> {
  const response = await axios.get<Breed[]>(`${API_BASE_URL}/breeds`);
  return response.data;
}
