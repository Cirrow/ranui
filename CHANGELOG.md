# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.4]
### Fixed
- Consolidated allowance validation into the `Child` class and unified input handling so the raw HTML string is converted and validated in one place
- Suppressed frontend native form validation (via `novalidate`) so all error and success feedback is displayed consistently in the UI
- Made `deductAllowance` defensive to non-string input, fixing the Deduct button failing on number inputs
- Expanded the Vitest suite with regression cases for the new validation logic and input coercion
- Added more explanatory comments

## [1.0.3]
### Fixed
- Added more comments

## [1.0.2]
### Added
- Vitest testing suite
- 
### Fixed
- Code cleanup and comments added



## [1.0.1]
### Changed
- README from default generation

### Fixed
- Success message not showing on successful deduction
- Minor code cleanups


## [1.0.0]
### Added
- Major functionalities
- Working input


[1.0.3]: https://github.com/Cirrow/ranui/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/Cirrow/ranui/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/Cirrow/ranui/compare/v1...v1.0.1
[1.0.0]: https://github.com/Cirrow/ranui/releases/tag/v1
