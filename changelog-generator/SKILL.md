---
# ═══════════════════════════════════════════════════════════════════════════════
# CLAUDE OFFICE SKILL - Enhanced Metadata v2.0
# ═══════════════════════════════════════════════════════════════════════════════

# Basic Information
name: Changelog Generator
description: "Generate release notes from git commits, updates, or feature lists"
version: "1.0"
author: claude-office-skills
license: MIT

# Categorization
category: productivity
tags:
  - changelog
  - release
  - documentation
  - developer
department: Dev/PM

# AI Model Compatibility
models:
  recommended:
    - claude-sonnet-4
    - claude-opus-4
  compatible:
    - claude-3-5-sonnet
    - gpt-4
    - gpt-4o

# MCP Tools Integration
mcp:
  server: office-mcp
  tools:
    - create_docx
    - md_to_docx

# Skill Capabilities
capabilities:
  - changelog_generation
  - version_tracking
  - release_notes

# Language Support
languages:
  - en
  - zh
---

# Changelog Generator

Generate professional release notes and changelogs from commits, feature lists, or updates.

## Overview

This skill helps you:
- Transform git commits into readable changelogs
- Categorize changes by type
- Write user-friendly release notes
- Maintain changelog history
- Follow conventional formats

## How to Use

### From Git Commits
```
"Generate a changelog from these commits:
- fix: resolve login timeout issue
- feat: add dark mode support
- docs: update API documentation"
```

### From Feature List
```
"Create release notes for version 2.0:
- New dashboard design
- Performance improvements (50% faster)
- Fixed: export button not working
- Removed: legacy API v1"
```

### From Diff/Changes
```
"Summarize these code changes into a changelog entry"
```

## Output Formats

### Standard Changelog (Keep a Changelog)
```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [2.1.0] - 2026-01-29

### Added
- Dark mode support across all pages
- Export to CSV functionality
- Keyboard shortcuts for common actions

### Changed
- Redesigned dashboard with improved navigation
- Upgraded authentication to OAuth 2.0
- Performance improvements (50% faster load times)

### Deprecated
- Legacy API v1 (will be removed in v3.0)

### Removed
- Support for Internet Explorer

### Fixed
- Login timeout issue on slow connections
- Export button not responding on mobile
- Memory leak in real-time updates

### Security
- Updated dependencies to patch CVE-2026-XXXX

## [2.0.0] - 2025-12-01
...
```

### User-Friendly Release Notes
```markdown
# What's New in Version 2.1

We're excited to announce version 2.1 with dark mode and major performance improvements!

## ✨ New Features

### Dark Mode
Finally here! Switch between light and dark themes in Settings > Appearance. Your preference syncs across devices.

### CSV Export
Export your data to CSV with one click. Find it in the Actions menu on any data view.

### Keyboard Shortcuts
Work faster with shortcuts:
- `Ctrl/Cmd + K` - Quick search
- `Ctrl/Cmd + N` - New item
- `?` - Show all shortcuts

## 🚀 Improvements

- **50% Faster Loading** - Completely rebuilt our data loading pipeline
- **New Dashboard** - Cleaner design with customizable widgets
- **Better Authentication** - Upgraded to OAuth 2.0 for enhanced security

## 🐛 Bug Fixes

- Fixed login timeouts on slower connections
- Export button now works properly on mobile devices
- Resolved memory issues with real-time updates

## ⚠️ Important Notes

- **Deprecation Notice**: Legacy API v1 will be removed in version 3.0
- **Browser Support**: Internet Explorer is no longer supported

---

Questions? Contact support@example.com or visit our [Help Center](link).
```

### Technical Release Notes
```markdown
# Release v2.1.0

**Release Date**: 2026-01-29
**Type**: Minor Release
**Compatibility**: Breaking changes: None

## Summary
This release introduces dark mode, CSV export, and significant performance improvements.

## Changes

### Features
| ID | Description | PR |
|----|-------------|-----|
| FEAT-123 | Dark mode theme support | #456 |
| FEAT-124 | CSV export functionality | #457 |
| FEAT-125 | Keyboard shortcuts | #458 |

### Fixes
| ID | Description | Severity | PR |
|----|-------------|----------|-----|
| BUG-789 | Login timeout on slow connections | High | #459 |
| BUG-790 | Mobile export button | Medium | #460 |

### Dependencies Updated
| Package | From | To | Reason |
|---------|------|-----|--------|
| lodash | 4.17.20 | 4.17.21 | Security patch |

## Migration Guide
No migration required for this release.

## Known Issues
- Dark mode does not apply to embedded iframes

## Contributors
@developer1, @developer2, @designer1
```

## Category Definitions

### Change Types (Conventional Commits)
| Type | Description | Changelog Section |
|------|-------------|-------------------|
| `feat` | New feature | Added |
| `fix` | Bug fix | Fixed |
| `docs` | Documentation | Documentation |
| `style` | Formatting | Changed |
| `refactor` | Code restructuring | Changed |
| `perf` | Performance | Changed |
| `test` | Tests | N/A (internal) |
| `chore` | Maintenance | N/A (internal) |
| `breaking` | Breaking change | ⚠️ BREAKING |
| `security` | Security fix | Security |
| `deprecate` | Deprecation | Deprecated |
| `remove` | Removal | Removed |

### Semantic Versioning
```
MAJOR.MINOR.PATCH

MAJOR: Breaking changes (incompatible API changes)
MINOR: New features (backwards compatible)
PATCH: Bug fixes (backwards compatible)
```

## Templates

### Commit to Changelog Entry
```
Input: feat(auth): add OAuth 2.0 support (#123)
Output: - Added OAuth 2.0 authentication support
```

### Bug Report to Fix Entry
```
Input: Users reported export failing on files > 10MB
Output: - Fixed export functionality for large files (> 10MB)
```

## Best Practices

### Writing Good Entries
✅ **Do**:
- Write from user's perspective
- Be specific about what changed
- Include relevant issue/PR numbers
- Group related changes

❌ **Don't**:
- Use technical jargon for user-facing notes
- Include internal changes in public changelog
- Be vague ("various fixes")
- Include commit hashes in user docs

### Organizing Changes
1. **Impact first**: Most important changes at top
2. **Group logically**: By feature area or type
3. **Be consistent**: Same format throughout
4. **Date everything**: Clear version dates

## Limitations

- Cannot access git repositories directly
- Requires commit messages or change descriptions as input
- Cannot verify semantic versioning automatically
- Technical details should be verified by developers
