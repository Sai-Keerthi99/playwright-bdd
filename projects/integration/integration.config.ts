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
  outputDir: '.features-gen/integration',
  features: '**/integration/features/*.feature',
  steps: ['src/fixtures/base.ts', '**/integration/steps/*.ts']
});

const integConfig: ProjectConfigType = {
  name: 'integ-tests',
  testDir,
  fullyParallel: true,
  // retries: 1,
  timeout: 45000,
  use: {
    storageState: 'cookies.json'
  },
  dependencies: ['setup']
};
 
export default integConfig;