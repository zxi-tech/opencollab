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
- Keep architecture clean: Service Layer + Repository Pattern + DTOs, with controllers, services, repositories, actions, policies, events, and listeners clearly separated.
- Defer heavy infrastructure (Docker, Redis, Reverb, WebRTC, Meilisearch, MinIO, queues) until the roadmap phase that actually needs it.

**Technology Stack**:
- Backend: Laravel 12, PHP 8.3+, MySQL 8
- Frontend: Inertia.js, React, TypeScript, Tailwind CSS
- Auth: Laravel Sanctum
- Testing: PHPUnit, Pest
- Dev environment: Laragon / native PHP (no Docker yet)

---

## 2. Current Development Status

- **Current Phase**: Phase 4 — Messaging Backend
- **Current Module**: Planning Conversations & Messages architecture
- **Progress Summary**: Phase 1 (DB), Phase 2 (Auth), and Phase 3 (Workspaces) are fully complete. The system now supports multi-tenancy via Workspaces. Moving into Phase 4 to build the core messaging engine.

---

## 3. Completed Modules

| Module | Notes |
|---|---|
| **Phase 1 — Project Foundation** | Context doc, ERD, and 28 migrations generated and successfully executed against MySQL 8. |
| **Phase 2 — Authentication & Authorization** | Login & Register API completed using Clean Architecture. Sanctum configured. Spatie Permission configured with Workspace Teams. |
| **Phase 3 — Workspace System** | Create Workspace and Add Member API implemented. Integrated with Spatie Roles (`Owner`, `Member`). |

---

## 4. In Progress Modules

| Module | Notes |
|---|---|
| Phase 4 — Messaging Backend | Initial setup for `Conversations`, `Messages`, and `Attachments` repositories and services (no realtime yet). |

---

## 5. Planned Modules

Per the 12-phase roadmap, not yet started:

1. **Phase 5** — Channels (Public/Private)
2. **Phase 6** — Realtime Infrastructure (Redis, Laravel Reverb, Presence, Realtime Notifications)
3. **Phase 7** — Meetings (WebRTC)
4. **Phase 8** — Storage System (Local → MinIO)
5. **Phase 9** — Task Management (Boards, Tasks, Comments)
6. **Phase 10** — Search (Laravel Scout + Meilisearch)
7. **Phase 11** — Dockerization (Dockerfile, Docker Compose, Queue Worker, Scheduler)
8. **Phase 12** — Frontend (Inertia.js, React, TypeScript, Tailwind CSS)

---

## 6. Architecture Decisions

| Decision | Detail |
|---|---|
| **Layered architecture** | Service Layer + Repository Pattern + DTOs. Controllers stay thin. |
| **Multi-tenancy** | Single-database multi-tenancy scoped by `workspace_id`. |
| **Primary keys** | `BIGINT` auto-increment `id` + unique `uuid` column for public sharing. |
| **Polymorphism** | `attachments`, `messages`, and `audit_logs` utilize polymorphic relationships. |
| **Soft deletes** | Applied to all user-facing business-record tables. |
| **Auth & Roles** | Sanctum for API auth. `spatie/laravel-permission` using **teams** feature mapped to `workspace_id`. |

---

## 7. Infrastructure Status

| Component | Status |
|---|---|
| MySQL | Completed (Core Schema) |
| Redis | Not Started (Phase 6) |
| Laravel Reverb | Not Started (Phase 6) |
| WebRTC | Not Started (Phase 7) |
| Meilisearch | Not Started (Phase 10) |
| MinIO | Not Started (Phase 8) |

---

## 8. Development History

| Date | Change |
|---|---|
| 2026-06-21 | Phase 1 & 2 Completed: Core DB migrations, Auth (Sanctum), and Clean Architecture setup. |
| 2026-06-21 | Phase 3 Completed: Implemented Workspace System (Create Workspace, Add Members) with Spatie multi-tenancy roles. |