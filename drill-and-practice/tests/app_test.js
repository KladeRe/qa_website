import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { app } from "../app.js";
import { assertEquals } from "https://deno.land/std@0.140.0/testing/asserts.ts";
import { getAllTopics, getAllAnswers, getAllQuestions} from "./services/statisticsService.js"

Deno.test("Test 1", async () => {
    const testClient = await superoak(app);
    await testClient.post("/api/questions/answer").expect({ correct: true });
})

Deno.test("Test 2", async () => {
    assertEquals(1, getAllTopics());
});


Deno.test("Test 3", async () => {
    assertEquals(1, getAllQuestions());
});

Deno.test("Test 4", async () => {
    const testClient = await superoak(app);
    await testClient.post("/api/questions/answer").expect({ correct: false });
})

Deno.test("Test 5", async () => {
    assertEquals(0, getAllAnswers());
});

Deno.test("Test 6", async () => {
    const testClient = await superoak(app);
    await testClient.post("/api/questions/answer").expect({ correct: true });
})

Deno.test("Test 7", async () => {
    assertEquals(1, getAllQuestions());
});

Deno.test("Test 8", async () => {
    assertEquals(1, getAllTopics());
});

Deno.test("Test 9", async () => {
    const testClient = await superoak(app);
    await testClient.post("/api/questions/answer").expect({ correct: true });
})

Deno.test("Test 10", async () => {
    const testClient = await superoak(app);
    await testClient.post("/api/questions/answer").expect({ correct: true });
})