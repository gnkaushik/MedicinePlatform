import { mockMedicines, type Medicine } from "@/data/medicines";

/** Mock catalog boundary. Replace this implementation with an API client when one exists. */
export async function getMedicineCatalog(): Promise<Medicine[]> {
  await new Promise((resolve) => setTimeout(resolve, 350));
  return mockMedicines;
}
