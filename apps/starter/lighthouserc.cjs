/**
 * Lighthouse quality gate for the Starter app — English default at "/",
 * Arabic at "/ar". Runs in CI and via `pnpm --filter starter test:quality`.
 */
module.exports = {
  ci: {
    collect: {
      staticDistDir: './.output/public',
      url: [
        'http://localhost/index.html', // English (default)
        'http://localhost/ar/index.html', // Arabic (RTL)
      ],
      numberOfRuns: 3,
      settings: {
        onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices'],
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
      },
    },
    upload: { target: 'filesystem', outputDir: './.lighthouseci' },
  },
}
