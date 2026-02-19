# Todoify Frontend Implementation Path

This document outlines the step-by-step roadmap to building the Todoify frontend with a modern, premium aesthetic (Glassmorphism, smooth animations, and a cohesive design system).

## Phase 1: Foundation & Design System 🎨
- [ ] **Tailwind Config**: Set up custom color palettes (deep slates, vibrant primary accents like `indigo-600` or `violet-500`), fonts (Inter/Outfit), and glassmorphism utilities.
- [ ] **Base UI Components (Shadcn/UI Style)**:
    - [ ] `Button` (Modern variants: Glow, Outline, Ghost)
    - [ ] `Input` & `Textarea` (Focus rings, subtle borders)
    - [ ] `Dialog` (For popups)
    - [ ] `Badge` (Priority levels: Low/Med/High)
    - [ ] `Card` (Glass effects)
- [ ] **Theme Context**: Modern Dark/Light mode toggle.

## Phase 2: Authentication & Services 🔐
- [ ] **API Service Layer**: Axios instance with base URL, request/response interceptors for JWT.
- [ ] **Auth Context**: `useAuth` hook for managing user state, login, register, and logout.
- [ ] **Auth Pages**:
    - [ ] `app/login`: Sleek card-based login with Google OAuth integration.
    - [ ] `app/register`: Multi-step or simple registration form.

## Phase 3: Core App Shell 🐚
- [ ] **AppLayout**:
    - [ ] **Sidebar**: Collapsible, featuring "Inbox", "Today", "Upcoming", and "Projects" list.
    - [ ] **Top Header**: Search bar, Notification bell, User avatar (dropdown for settings/profile).
- [ ] **Marketing Layout**: Minimalist navbar and footer for landing pages.

## Phase 4: Global Todo Management 📝
- [ ] **TodoDialog Component**: The "One Ring" to rule them all—used for Add/Edit.
    - [ ] Fields: Title, Description, Date picker, Priority dropdown, Project/Label selection.
- [ ] **Todo List Logic**: Reusable list component that handles filtering (by project, date, etc.).

## Phase 5: Main Dashboard Pages 🏠
- [ ] **Inbox**: Show all tasks.
- [ ] **Today**: Show tasks with current date.
- [ ] **Project View**: Dynamic route `/project/:id` showing tasks specific to a project.
- [ ] **Labels View**: Filter tasks by labels.

## Phase 6: Project & Team Management 🚀
- [ ] **Project Dialog**: Create/Edit projects with status and priority.
- [ ] **Invite System**: Generate and share invite links for collaboration.

## Phase 7: Polish & User Experience ✨
- [ ] **Framer Motion**: Page transitions, list item entrance/exit animations.
- [ ] **Skeleton Loaders**: Premium feel while fetching data.
- [ ] **Notifications**: Real-time feedback for task completion or project invites.
- [ ] **Profile & Stats**: Visual charts for productivity trends.

---

## Design Principles to Follow
1. **Glassmorphism**: Use `backdrop-blur-md` and semi-transparent backgrounds for cards and sidebars.
2. **Micro-interactions**: Subtle hover states, animated checkboxes, and smooth dialog transitions.
3. **Consistency**: Use the same spacing, border-radius (e.g., `rounded-xl`), and typography across all pages.
4. **Mobile First**: Ensure the sidebar transforms into a drawer on mobile devices.
