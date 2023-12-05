import { bootstrap } from './main';

// eslint-disable-next-line unicorn/prefer-top-level-await
void bootstrap().then((app) => {
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => void app.close());
  }
});
