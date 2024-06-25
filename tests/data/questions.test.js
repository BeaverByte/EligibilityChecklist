import { render, screen } from "@testing-library/react";
import { questionBank } from "../../src/";
import { test } from "vitest";
import { it, expect, describe } from "vitest";

const questionWithoutID = questionBank.filter((question) => {
  question.id === "";
});

expect(questionWithoutID).toBe("");

test("all questions have id property", async () => {
  expect(questionWithoutID).toBe("");
});

describe("Questions", () => {
  it("should all have id property", () => {
    expect(questionWithoutID).toHaveProperty("id");
  });
});
