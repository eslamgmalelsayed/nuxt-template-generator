/**
 * Lighthouse quality gate for the Rolaco app — audits the static output for
 * both locales (Arabic default at "/", English at "/en"). Runs in CI and
 * on-demand via `pnpm --filter rolaco test:quality`.
 */
module.exports = {
  ci: {
    collect: {
      staticDistDir: './.output/public',
      url: [
        'http://localhost/index.html', // Arabic (default, RTL)
        'http://localhost/en/index.html', // English
      ],
      numberOfRuns: 3,
      settings: {
        onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices'],
      },
    },
    assert: {
      assertions: {
        // hard floor: catches real regressions; ~97 in practice, so 0.85 absorbs CI noise (target 0.90)
        'categories:performance': ['error', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
      },
    },
    upload: { target: 'filesystem', outputDir: './.lighthouseci' },
  },
}
