# Commit Convention Guide

This document defines the strict rules for creating Git commits in this repository. 
**If you are an AI assistant generating commits on behalf of the user, you MUST adhere to these instructions perfectly.**

## 1. Commit Strategy (For AI Assistants)
The user typically accumulates multiple changes over time. When requested to generate commits:
- **DO NOT** create a single giant commit for all changes.
- **DO** analyze the git diff and logically group the changes into atomic, focused commits (e.g., separate a layout fix from a new feature).
- For each logical group, generate a commit adhering strictly to the formatting rules below.

## 2. Strict Formatting Rules
Every commit message must follow this exact structure:

```text
<type>(<scope>): <Subject starting with Capital letter>
<EMPTY LINE>
- <Bullet point starting with Capital letter>
- <Bullet point starting with Capital letter>
<EMPTY LINE>
Changelog: <type>
```

### Critical Constraints:
1. **Subject Line**: Must start with a capital letter and not end with a period.
2. **Body**: Must be separated from the subject by exactly one empty line.
3. **Bullet Points**: The body **must** be a bulleted list. Every item must start with `- ` followed by a Capital letter.
4. **Trailer**: Must be separated from the body by exactly one empty line. It must literally read `Changelog: <type>` where `<type>` is the exact same type used in the subject.

## 3. Allowed Vocabulary

### Allowed Types
You may **only** use one of the following 6 types:
- `feat`: A new feature
- `fix`: A bug fix
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `chore`: Maintenance, dependencies, build processes, or documentation
- `style`: Changes that do not affect the meaning of the code (formatting, CSS, etc.)
- `perf`: A code change that improves performance

### Allowed Scopes
You may **only** use one of the following 8 scopes:
- `projects`: The projects section/pages
- `about`: The about section/pages
- `layout`: Overall page structure, grid system, responsive design
- `ui`: General visual components, icons, custom cursor, assets
- `core`: App initialization, global configs, types, hooks, scripts, dependencies
- `seo`: Metadata, JSON-LD, canonical URLs
- `a11y`: Accessibility, reduced-motion, focus management
- `animations`: Framer motion transitions, global easings, shaders

## 4. Example of a Perfect Commit

```text
feat(projects): Implement responsive full-width Projects title

- Add new ProjectsTitle component for home page
- Correct text color contrast for better readability
- Reduce negative margins to prevent clipping on mobile devices

Changelog: feat
```
