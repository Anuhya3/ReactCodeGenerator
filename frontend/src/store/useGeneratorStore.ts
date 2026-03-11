import { create } from "zustand";

export type ComponentSummary = {
  name: string;
  description: string;
};

export type GenerationResult = {
  jobId: string;
  status: string;
  url?: string | null;
  componentTree?: string | null;
  components: ComponentSummary[];
  code?: string | null;
  previewHtml?: string | null;
  notes?: string | null;
  error?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

type GeneratorState = {
  url: string;
  isLoading: boolean;
  error: string | null;
  result: GenerationResult | null;
  setUrl: (url: string) => void;
  setLoading: (value: boolean) => void;
  setError: (error: string | null) => void;
  setResult: (result: GenerationResult | null) => void;
};

export const useGeneratorStore = create<GeneratorState>((set) => ({
  url: "",
  isLoading: false,
  error: null,
  result: null,
  setUrl: (url) => set({ url }),
  setLoading: (value) => set({ isLoading: value }),
  setError: (error) => set({ error }),
  setResult: (result) => set({ result }),
}));
