import {
    Project,
    PlaywrightTestOptions,
    PlaywrightWorkerOptions,
  } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
   
  type ProjectConfigType = Project<
    PlaywrightTestOptions,
    PlaywrightWorkerOptions
  >;

  const testDir = defineBddConfig({
    outputDir: '.features-gen/bc-tests',
    features: '**/billingcenter/features/*.feature',
    steps: ['src/fixtures/base.ts', '**/billingcenter/steps/*.ts']
  });

  const bcConfig: ProjectConfigType = {
    name: 'bc-tests',
    testDir,
    fullyParallel: true,
    // retries: 1,
    timeout: 45000,
    use: {
      baseURL: "http://localhost:8580/bc/BillingCenter.do",
      storageState: 'cookies.json'
    },
    dependencies: ['setup']
  };
   
  export default bcConfig;