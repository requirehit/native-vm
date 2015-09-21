## Upcoming
- VERSION BUMPING: Improved deploy workflow on `package.json`. Caused version
bumped and since npm doesn't allow to purge them easily, I've decided to keep
them. Sorry for that. :)

## 1.0.3
- Script was confusing fn's `context` with script's `sandbox`.
- script `sandbox` is now called `scope`.

## 1.0.0
- First working version with code grabbed from `requirehit/browser` repo
- Added basic test on `Script`
