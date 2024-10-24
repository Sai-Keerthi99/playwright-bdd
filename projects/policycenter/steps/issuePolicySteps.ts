import { expect } from "@playwright/test";
import { Given, When, Then } from "../../../src/fixtures/base";
import {companyAccountUS as account} from "../../../test-data/accountDetails.json"

let accNumber: string;
let submissionId: string;

Given("user creates a new Account with given credentials", async ({accountPage}) => {
  accNumber = await accountPage.createAccount(account)
});

When("creates a Submission for the same account", async ({submissionPage}) => {
  submissionId = await submissionPage.createSubmission(accNumber);
  await expect(submissionId).toBeTruthy();
});

When("user proceeds to Quote", async ({page, submissionPage}) => {
  await submissionPage.quoteSubmission();
  await expect(
    page.getByRole("heading", { name: "Quote" })).toBeVisible();
});

When("proceeds to issue the Policy", async ({submissionPage}) => {
  await submissionPage.issuePolicy();
});

When("user wants to Cancel the Policy", async ({submissionPage}) => {
  await submissionPage.cancelPolicy();
});

Then("user should see a successful policy issue", async ({homePage}) => {
  await expect(homePage.pageTitle()).toHaveText("Submission Bound");
});

Then("user should see a success message of policy Cancellation", async ({homePage}) => {
  await expect(homePage.pageTitle()).toHaveText("Cancellation Bound");
});