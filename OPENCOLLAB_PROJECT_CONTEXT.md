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

- **Current Phase**: Phase 3 — Workspace System
- **Current Module**: Workspace creation and membership initialization
- **Progress Summary**: Phase 1 (Database) and Phase 2 (Authentication) are fully completed and tested. Moving into Phase 3 to establish the core multi-tenancy layer (Workspaces).

---

## 3. Completed Modules

| Module | Notes |
|---|---|
| **Phase 1 — Project Foundation** | Context doc, ERD, and 28 migrations generated and successfully executed against MySQL 8. |
| **Phase 2 — Authentication & Authorization** | Login & Register API completed using Clean Architecture (DTOs, Repositories, Services). Laravel Sanctum configured. Spatie Permission configured with Workspace Teams. |

---

## 4. In Progress Modules

| Module | Notes |
|---|---|
| Phase 3 — Workspace System | Initializing `Workspaces` and `WorkspaceMembers` creation logic. |

---

## 5. Planned Modules

Per the 12-phase roadmap, not yet started:

1. **Phase 4** — Messaging Backend (Conversations, Messages, Attachments — no realtime yet)
2. **Phase 5** — Channels (Public/Private)
3. **Phase 6** — Realtime Infrastructure (Redis, Laravel Reverb, Presence, Realtime Notifications)
4. **Phase 7** — Meetings (WebRTC)
5. **Phase 8** — Storage System (Local → MinIO)
6. **Phase 9** — Task Management (Boards, Tasks, Comments)
7. **Phase 10** — Search (Laravel Scout + Meilisearch)
8. **Phase 11** — Dockerization (Dockerfile, Docker Compose, Queue Worker, Scheduler)
9. **Phase 12** — Frontend (Inertia.js, React, TypeScript, Tailwind CSS)

---

## 6. Architecture Decisions

| Decision | Detail |
|---|---|
| **Layered architecture** | Service Layer + Repository Pattern + DTOs. Controllers stay thin; business logic lives in Services; data access lives in Repositories; cross-cutting actions use Laravel Actions where appropriate. |
| **Multi-tenancy** | Single-database multi-tenancy. Every workspace-owned table carries a `workspace_id` foreign key for scoping (no separate DB per tenant). |
| **Primary keys** | `BIGINT` auto-increment `id` for all tables. Public-facing/shareable entities additionally carry a unique `uuid` column so internal IDs are never exposed in URLs. |
| **Polymorphism** | `attachments` is a single polymorphic table (`attachable_type` / `attachable_id`) shared across Messages, Notes, Tasks, etc. `messages` polymorphically targets either a Channel or a Conversation (`messageable_*`). `audit_logs` polymorphically targets any auditable model. |
| **Soft deletes** | Applied to all user-facing business-record tables (workspaces, channels, conversations, messages, attachments, meetings, folders, files, notes, boards, tasks, task_comments, users). Pivot/junction tables and append-only logs are excluded. |
| **Auth strategy** | Laravel Sanctum for API/session auth. Two-factor fields live directly on `users`. |
| **Authorization strategy** | `spatie/laravel-permission`, using its **teams** feature with `workspace_id` as the team key. |
| **Realtime strategy** (deferred) | Redis + Laravel Reverb, not implemented until Phase 6. |
| **Storage strategy** | Local disk for Phase 1–7; swaps to MinIO (S3-compatible) in Phase 8. The `files.disk` column already anticipates this swap. |
| **Search strategy** (deferred) | Laravel Scout + Meilisearch, not implemented until Phase 10. |

---

## 7. Database Overview

**Entity count**: 28 tables (1 extended default `users` table + 27 custom tables).
**Full entity list and relationship summary**: see `database/ERD.md`.
**Migration Status**: All migrations executed successfully.

---

## 8. Infrastructure Status

| Component | Status |
|---|---|
| MySQL | Completed (Core Schema) |
| Redis | Not Started (Phase 6) |
| Laravel Reverb | Not Started (Phase 6) |
| WebRTC | Not Started (Phase 7) |
| Meilisearch | Not Started (Phase 10) |
| MinIO | Not Started (Phase 8) |
| Docker | Not Started (Phase 11) |
| Queue | Not Started (Phase 11) |
| Scheduler | Not Started (Phase 11) |

---

## 9. Development History

| Date | Change |
|---|---|
| 2026-06-21 | Phase 1 Completed: Context doc, ERD, and 28 migrations built and executed. |
| 2026-06-21 | Phase 2 Completed: Implemented Clean Architecture for Auth (Sanctum) and Authorization (Spatie with Workspace Teams). API tested successfully. |