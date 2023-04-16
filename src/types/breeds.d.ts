export interface Breed {
  id: string;
  name: string;
  temperament: string;
  origin: string;
  description: string;
  life_span: string;
  wikipedia_url: string;
  weight: {
    imperial: string;
    metric: string;
  };
  image: {
    id: string;
    url: string;
  };
}
