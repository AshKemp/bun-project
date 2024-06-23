import { Hono } from "hono";
import { z } from "zod";

type Expense = {
  id: number;
  title: string;
  amount: number;
};

const createPostSchema = z.object({
  title: z.string(),
  amount: z.number(),
});

const fakeExpenses: Expense[] = [
  { id: 1, title: "Groceries", amount: 50 },
  { id: 2, title: "Utilities", amount: 100 },
  { id: 3, title: "Rent", amount: 1000 },
];

export const expensesRoute = new Hono()
  .get("/", async (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", async (c) => {
    const data = await c.req.json();
    const expense = createPostSchema.parse(data);
    console.log({ expense });
    return c.json(expense);
  });
