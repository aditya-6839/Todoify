# Todoify Frontend Structure

## Directory Structure

```text
client/
├── public/                 # Static assets (favicons, etc.)
├── src/
│   ├── assets/             # Global assets like images, brand logos, etc.
│   ├── components/
│   │   ├── layout/         # Root layouts (Navbar, Sidebar, Footer, AppLayout)
│   │   ├── ui/             # Reusable base components (Buttons, Inputs, Dialogs via Shadcn)
│   │   ├── todo/           # Todo-specific components (TodoItem, TodoList, TodoDialog)
│   │   ├── project/        # Project-specific components (ProjectCard, ProjectDialog)
│   │   ├── auth/           # Auth-related forms and components
│   │   └── shared/         # Common components like SearchBar, Notifications, etc.
│   ├── pages/
│   │   ├── landing/        # Landing, Features, Pricing, About pages
│   │   ├── auth/           # Login, Register pages
│   │   └── app/            # Main Todo application pages (Inbox, Today, Project details, etc.)
│   ├── services/           # API integration (Axios/Fetch instances for auth, todos, projects)
│   ├── context/            # React Context Providers (AuthContext, ThemeContext, ProjectContext)
│   ├── hooks/              # Custom reusable hooks (useAuth, useTodos, etc.)
│   ├── utils/              # Helper functions, constants, and data formatters
│   ├── App.jsx             # Main Routing setup using React Router
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles and Tailwind imports
└── FRONTEND_STRUCTURE.MD   # This documentation
```

## Route Mapping & Components

### Public / Marketing Routes
| Route | Page Component | Layout Components | Content Sections |
| :--- | :--- | :--- | :--- |
| `/` | `LandingPage.jsx` | `MarketingNavbar`, `Footer` | Hero, Social Proof, CTE |
| `/features/:id` | `FeaturesPage.jsx` | `MarketingNavbar`, `Footer` | Feature Detail (Task, Project, etc.) |
| `/pricing` | `PricingPage.jsx` | `MarketingNavbar`, `Footer` | Tiers, FAQ, Feature Comparison |
| `/about` | `AboutPage.jsx` | `MarketingNavbar`, `Footer` | Mission, Team, Story |

### Authentication Routes
| Route | Page Component | Components | Note |
| :--- | :--- | :--- | :--- |
| `app/login` | `LoginPage.jsx` | `LoginForm`, `Logo` | Simple layout centered around login |
| `app/register` | `RegisterPage.jsx` | `RegisterForm`, `Logo` | Simple layout centered around register |

### Main Application Routes (`/app/*`)
All pages below use `AppLayout` (Normal Header + Sidebar).

| Route | Page Component | Description |
| :--- | :--- | :--- |
| `app/inbox` | `InboxPage.jsx` | Default view showing all non-project specific tasks |
| `app/today` | `TodayPage.jsx` | List of tasks due today |
| `app/upcoming` | `UpcomingPage.jsx` | List of tasks due in the future |
| `app/completed` | `CompletedPage.jsx` | History of finished tasks |
| `app/overdue` | `OverduePage.jsx` | Tasks past their due date |
| `app/notification`| `NotificationPage.jsx` | Feed of updates and alerts |
| `app/projects` | `ProjectsListPage.jsx` | Overview of all user projects |
| `app/project/:id` | `ProjectDetailsPage.jsx`| Tasks specifically filtered by project ID |
| `app/labels` | `LabelsPage.jsx` | List and management for task labels |
| `app/profile` | `ProfilePage.jsx` | User profile view and basic stats |
| `app/settings` | `SettingsPage.jsx` | Account settings, preferences, and security |
| `app/help` | `HelpPage.jsx` | FAQ and support resources |

## Global Modals / Popups
These components will be triggered globally (e.g., via Context or Shortcut) and are used for Task management:
1. **TodoDialog**: Used for both **Adding** and **Editing** todos.
   - Fields: Title, Description, Due Date, Priority, Project, Labels.
2. **SearchDialog**: Global search popup (`Cmd/Ctrl + K`) to find tasks, projects, or labels.

## Technical Details
- **Routing**: `react-router-dom` (Version 7)
- **Styling**: `Tailwind CSS 4.0`
- **Utility Components**: `Lucide React` for icons, `Radix UI` for accessible primitives.
- **API Communication**: `Axios` (suggested) with interceptors for token management.
