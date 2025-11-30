import { defineConfig } from "cypress";
import codeCoverageTask from "@cypress/code-coverage/task";
export default defineConfig({
  viewportWidth: 1000,
  viewportHeight: 600,
  e2e: {
    setupNodeEvents(on, config) {
      codeCoverageTask(on,config); // регіструємо таск покриття коду
      return config;
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
