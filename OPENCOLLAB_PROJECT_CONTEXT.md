# OpenCollab — Project Context

> Living documentation. Always read this file before starting any new OpenCollab task. Update it after every major migration, module, refactor, or infrastructure change.

---

## 1. Project Information

**Name**: OpenCollab
**Tagline**: One Platform for Meetings, Messaging, Collaboration, and Productivity.

**Description**: OpenCollab is an open-source, unified collaboration platform combining the core functionality of Slack, Microsoft Teams, Zoom, Google Drive, Trello, and Notion into a single integrated system. Built to be published as production-ready, clean, maintainable, scalable open-source software.

**Goals**:

- Ship a working, stable application incrementally — core features before infrastructure.
- Follow Laravel and database best practices throughout.
- Keep architecture clean: Service Layer + Repository Pattern + DTOs.
- Defer heavy infrastructure (Docker, Redis, Reverb, WebRTC) until needed.

**Technology Stack**:

- Backend: Laravel 12, PHP 8.3+, MySQL 8
- Frontend: Inertia.js, React, TypeScript, Tailwind CSS
- Auth: Laravel Sanctum
- Testing: PHPUnit, Pest

---

## 2. Current Development Status

- **Current Phase**: Phase 6 Completed (Moving to Phase 7 / Frontend Realtime Integration)
- **Current Module**: Laravel Echo & Frontend WebSocket implementation.
- **Progress Summary**: Phase 1 to Phase 6 are fully complete. Polymorphic messaging engine is active and fully integrated with Laravel Reverb for realtime event broadcasting via secured Private Channels.

---

## 3. Completed Modules

| Module                           | Notes                                                                                                      |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Phase 1 — Project Foundation** | Context doc, ERD, and 28 migrations generated and executed.                                                |
| **Phase 2 — Auth & Roles**       | Login & Register API, Sanctum, Spatie Permission (Workspace Teams).                                        |
| **Phase 3 — Workspace System**   | Create Workspace, Add Member API.                                                                          |
| **Phase 4 — Messaging Backend**  | Direct Messages (DM) engine built.                                                                         |
| **Phase 5 — Channels**           | Public/Private Channels API, refactored MessagingService to support polymorphic messages (Channels & DMs). |
| **Phase 6 — Realtime Backend**   | Installed Laravel Reverb, configured `ShouldBroadcastNow` events, and secured WebSocket routes.            |

---

## 4. Planned Modules (Next Steps)

1. **Phase 7** — Frontend Realtime Integration (Laravel Echo, Pusher-js, React)
2. **Phase 8** — Meetings (WebRTC)
3. **Phase 9** — Storage System (Local → MinIO)
4. **Phase 10** — Task Management (Boards, Tasks, Comments)
5. **Phase 11** — Search (Laravel Scout + Meilisearch)
6. **Phase 12** — Dockerization
7. **Phase 13** — Full Frontend UI Polish (Inertia.js, Tailwind)

---

## 5. Development History

| Date       | Change                                                                              |
| ---------- | ----------------------------------------------------------------------------------- |
| 2026-06-21 | Phase 1 & 2 Completed: Core DB migrations, Auth (Sanctum).                          |
| 2026-06-21 | Phase 3 Completed: Workspace System with Spatie multi-tenancy.                      |
| 2026-06-21 | Phase 4 Completed: Messaging backend for DMs.                                       |
| 2026-06-22 | Phase 5 Completed: Implemented Channels and upgraded polymorphic messaging engine.  |
| 2026-06-23 | Phase 6 Completed: Realtime backend setup with Laravel Reverb and Private Channels. |
