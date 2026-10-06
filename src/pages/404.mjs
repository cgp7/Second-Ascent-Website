import { fbtn } from '../lib.mjs';

export default function () {
  return {
    path: '/404',
    title: 'Page not found',
    description: 'This page could not be found.',
    theme: 'dark',
    noindex: true,
    bodyClass: 'is-404',
    main: `
<section class="notfound" data-theme="dark">
  <div class="notfound__placket" aria-hidden="true">
    <span class="notfound__btn">${fbtn('lg')}</span>
    <span class="notfound__hole"></span>
  </div>
  <div class="notfound__text">
    <p class="label">404 · Page not found</p>
    <h1 class="display" tabindex="-1">Looks like something came undone.</h1>
    <p>The page you were looking for isn't here. It may have moved, or the link may be mistyped.</p>
    <a class="btn btn--light" href="/">${fbtn('sm')}<span>Back to the home page</span></a>
  </div>
</section>
`,
  };
}
