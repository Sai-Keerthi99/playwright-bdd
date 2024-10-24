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
  outputDir: '.features-gen/pc-tests',
  features: '**/policycenter/features/*.feature',
  steps: ['src/fixtures/base.ts', '**/policycenter/steps/*.ts']
});

const pcConfig: ProjectConfigType = {
  name: 'pc-tests',
  testDir,
  fullyParallel: true,
  // retries: 1,
  timeout: 45000,
  use: {
    baseURL: 'http://localhost:8180/pc/PolicyCenter.do',
    storageState: 'cookies.json'
  },
  dependencies: ['setup']
};

export default pcConfig;