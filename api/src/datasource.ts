import { AddTestingResponse, Testing } from "./__generated__/types";

const db: Omit<Testing, "__typename">[] = [
  {
    name: "One",
  },
  {
    name: "Two",
  },
];

export class DataSource {
  async getTestings(): Promise<Testing[]> {
    return db;
  }

  async addTesting({ name }: Testing): Promise<AddTestingResponse> {
    db.push({ name });
    return {
      status: "200",
    };
  }
}
