This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

## Architecture / Rules

### A. FRONTEND – NEXT.JS (Pages Router)

#### A1) Cấu trúc thư mục (GIỮ NGUYÊN, không đổi)
```text
src/
├── pages/                               # Pages Router (routing trung tâm)
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx
│   ├── auth/
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── verify-email.tsx
│   ├── listing/
│   │   ├── index.tsx
│   │   └── [id].tsx
│   ├── workspace/
│   │   ├── index.tsx
│   │   ├── create.tsx
│   │   └── [workspaceId]/
│   │       ├── index.tsx
│   │       ├── inbox.tsx
│   │       ├── settings.tsx
│   │       └── teams.tsx
│   ├── admin/
│   │   ├── index.tsx
│   │   ├── listings.tsx
│   │   └── reports.tsx
│   ├── profile/
│   │   └── index.tsx
│   └── widget.tsx
│
├── features/                            # Flow theo màn hình (UI orchestration)
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── validators/
│   │   └── index.ts
│   ├── listing/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.ts
│   ├── workspace/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.ts
│   ├── inbox/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.ts
│   └── admin/
│       ├── components/
│       ├── hooks/
│       └── index.ts
│
├── domains/                             # Nghiệp vụ cốt lõi (model + query hooks)
│   ├── auth/
│   │   ├── auth.types.ts
│   │   ├── auth.api.ts                  # domain adapter (KHÔNG axios)
│   │   ├── auth.keys.ts
│   │   ├── auth.hooks.ts                # gọi services/*
│   │   └── index.ts
│   ├── listing/
│   │   ├── listing.types.ts
│   │   ├── listing.api.ts               # domain adapter (KHÔNG axios)
│   │   ├── listing.keys.ts
│   │   ├── listing.hooks.ts             # gọi services/*
│   │   ├── listing.mappers.ts
│   │   └── index.ts
│   ├── seller/
│   ├── category/
│   ├── report/
│   └── admin/
│
├── components/                          # Shared UI (không phụ thuộc domain)
│   ├── ui/
│   ├── layout/
│   ├── feedback/
│   └── index.ts
│
├── providers/                           # App-level providers
│   ├── AppProviders.tsx
│   ├── QueryProvider.tsx
│   ├── AuthProvider.tsx
│   └── NotificationProvider.tsx
│
├── contexts/                            # Global state (ít, rõ, không business phức tạp)
│   ├── ConversationContext.tsx
│   ├── NotificationContext.tsx
│   └── index.ts
│
├── lib/                                 # Infra / third-party setup
│   ├── http/
│   │   ├── client.ts                    # axios instance
│   │   ├── interceptors.ts
│   │   └── error.ts
│   ├── react-query/
│   │   ├── queryClient.ts
│   │   └── options.ts
│   ├── socket/
│   │   └── client.ts
│   ├── i18n/
│   │   ├── index.ts
│   │   └── locales/
│   └── constants.ts
│
├── services/                            # NƠI DUY NHẤT gọi HTTP (axios)
│   ├── upload.service.ts
│   └── email.service.ts
│
├── types/
│   ├── common.ts
│   ├── user.ts
│   └── index.ts
│
├── utils/
│   ├── format.ts
│   ├── storage.ts
│   └── index.ts
│
├── config/
│   ├── env.ts
│   ├── permissions.ts
│   └── routes.ts
│
└── styles/
    └── globals.css
```

#### A2) Trách nhiệm từng tầng (Separation of Concerns)

**1) pages/ (Routing-only)**
- Chỉ làm routing, không xử lý nghiệp vụ.
- Không gọi API, không import axios/service/hook/domain.
- Chỉ import 1 “Page Container” từ `features/*` và (nếu cần) layout từ `components/layout`.
- Page chỉ làm:
  - đọc query/params từ Next router
  - render feature container với props cơ bản (id, mode…)
  - set SEO/head nếu dự án có quy ước
- *Lưu ý: rule cũ “pages chỉ import từ components/” là sai logic vì bạn có features/. Rule đúng là: pages chỉ import từ features/* và components/layout.*

**2) features/ (UI orchestration theo màn hình)**
- Chứa container component cho từng màn hình/flow.
- Được phép:
  - dùng hooks (ở `features/*/hooks` hoặc `domains/*/*.hooks.ts`)
  - ghép nhiều shared UI component / feature UI component
- Không được:
  - gọi axios trực tiếp
  - nhét business rules “cốt lõi” (phải nằm trong domain/service)

**3) components/ (Shared UI)**
- Chỉ render UI, không gọi API, không import `services/`, không import `domains/`.
- Không phụ thuộc feature/domain.
- Dùng Tailwind cho layout/spacing.
- Ant Design dùng cho component phức tạp theo rule UI (mục A5).

**4) hooks/ + features/*/hooks/ + domains/*/*.hooks.ts (Logic-only)**
- Hook không render JSX.
- Hook được phép gọi:
  - `services/*` (HTTP)
  - `domains/*` (types, keys, mappers)
- Hook chịu trách nhiệm:
  - orchestration logic (pagination, debounce, permission, socket sync)
  - mapping dữ liệu cho UI (không biến hook thành UI)

**5) services/ (HTTP-only)**
- NƠI DUY NHẤT được phép dùng axios để gọi API.
- Không xử lý UI.
- Không chứa logic UI/form.
- Business logic “cốt lõi” không đặt ở đây; service tập trung vào:
  - request/response transport
  - typing request/response
  - chuẩn hoá lỗi (throw typed error)

**6) domains/ (Business model + domain hooks)**
- Chứa:
  - `*.types.ts`: model/type
  - `*.keys.ts`: react-query keys
  - `*.mappers.ts`: map/normalize DTO → model
  - `*.hooks.ts`: react-query hooks gọi `services/`
  - `*.api.ts`: domain adapter, quy định rõ:
    - KHÔNG gọi axios
    - chỉ gọi hàm trong `services/*` + mapping/typing
- Mục tiêu: domain là “hợp đồng nghiệp vụ” (types + rules mapping + query keys), giúp scale.

**7) providers/ và contexts/**
- `providers/`: wrapper lắp Query/Auth/Notification vào `_app.tsx` cho gọn.
- `contexts/`: chỉ quản lý global state nhẹ (auth status, notification list, conversation state realtime…).
  - Context không chứa business logic phức tạp (không gọi trực tiếp repo/service theo kiểu “God Context”).

**8) lib/, utils/, types/, config/**
- `lib/`: setup third-party (axios instance, interceptors, queryClient, socket client, i18n).
- `utils/`: hàm thuần (format/storage), không đụng React.
- `types/`: cross-domain types (Pagination, ApiResponse…).
- `config/`: env/permission/routes constants, không hardcode URL.

#### A3) Luồng import (Dependency Rules)

Mục tiêu: import 1 chiều, không vòng lặp.
- `pages/*` → chỉ import `features/*` và `components/layout`
- `features/*` → import `hooks/*`, `domains/*`, `components/*`
- `components/*` → chỉ import `utils/*`, `types/*` (không import domains/services)
- `domains/*` → import `services/*`, `types/*`, `utils/*`, `lib/react-query` (nếu cần)
- `services/*` → import `lib/http/*`, `config/*`, `types/*`
- `lib/*` → import `config/*`

#### A4) Next.js rules (BẮT BUỘC)

- **Link**: luôn dùng `next/link`, không dùng `<a>` cho routing nội bộ.
- **Image**: luôn dùng `next/image` cho ảnh tĩnh/remote (trừ khi requirement đặc biệt).
- **SSR safety**: không dùng window/document nếu chưa check `typeof window !== 'undefined'`.
- **Component nặng**: dùng `next/dynamic` (và `ssr: false` nếu phụ thuộc browser APIs).
- **Không hardcode URL**: lấy từ `config/env.ts` hoặc `config/routes.ts`.

#### A5) UI rules (Tailwind + Ant Design)

- **Tailwind**: layout, spacing, grid/flex, responsive, typography, color tokens.
- **Ant Design**: component phức tạp và đúng thế mạnh:
  - Form, Modal, Table, Drawer, Dropdown, DatePicker, Upload, Notification/Message…
- Không “bọc chồng chéo vô nghĩa”:
  - không bọc AntD bằng nhiều div chỉ để set style trùng lặp
  - Tailwind chỉ chỉnh layout quanh AntD, không “đánh nhau” với CSS nội bộ AntD

#### A6) TypeScript & code style

- Không dùng `any`.
- Hạn chế `unknown`; ưu tiên định nghĩa type/interface rõ.
- File/component naming rõ nghĩa, thống nhất PascalCase/ kebab-case theo convention dự án.
- Mỗi file 1 trách nhiệm, không gộp routing + logic + API.

---

### B. BACKEND GLOBAL RULES (PRODUCTION)

**Vai trò:** Senior Backend Architect.
**Mục tiêu:** code production, rõ ràng, scale tốt, tách tầng chuẩn, không code thừa, không gộp trách nhiệm.

#### 0) NGUYÊN TẮC CHUNG
- TUYỆT ĐỐI không thay đổi cấu trúc thư mục hiện tại. Không đề xuất kiến trúc mới.
- Chỉ tạo/chỉnh sửa file cần thiết theo yêu cầu. Không tạo file/logic không dùng.
- Mỗi file 1 trách nhiệm. Không gộp controller + service, không gộp route + logic.
- Không hardcode config/secret/URL. Tất cả lấy từ env/config.
- Không try/catch tràn lan. Dùng error handler tập trung.
- Validate input mọi endpoint. Không tin request từ client.
- Không log thông tin nhạy cảm (password, token).

#### 1) CẤU TRÚC BẮT BUỘC (KHÔNG ĐỔI)
```text
src/
├─ bootstrap/
├─ config/
├─ infra/
├─ middlewares/
├─ modules/
│  └─ <domain>/
│     ├─ repos/
│     ├─ *.controller.js
│     ├─ *.service.js
│     ├─ *.routes.js
│     └─ *.validate.js
└─ routes.js
```

#### 2) LUỒNG XỬ LÝ BẮT BUỘC
**HTTP:**
Request → Middleware(auth/validate/...) → Controller → Service → Repo → Service → Controller → Response

**Socket (nếu có):**
Socket → Service → Repo

*Không được phá vỡ luồng này:*
- Không query DB trong controller/middleware.
- Không xử lý business logic trong routes.

#### 3) QUY TẮC CHO TỪNG PHẦN

**A) routes.js (root router)**
- Chỉ mount các module routes và global middlewares cần thiết (vd: json parser).
- Không chứa nghiệp vụ.
- Không validate ở đây (validate theo từng module).

**B) modules/\<domain\>/*.routes.js (Route layer)**
- Chỉ khai báo endpoint + thứ tự middleware.
- Không xử lý nghiệp vụ, không truy cập DB.
- Mọi endpoint phải đi theo pattern:
  `validate(optional) → auth(optional) → controller`
- Không viết inline function xử lý logic trong route.

**C) modules/\<domain\>/*.validate.js (Validation layer)**
- Chỉ định nghĩa validator cho request (body/query/params).
- Không gọi service/repo.
- Output validator phải đủ để controller dùng mà không phải đoán.
- Không dùng any/unknown nếu là TypeScript; nếu JS thì phải kiểm tra kiểu rõ ràng.

**D) middlewares/ (Middleware layer)**
- Chỉ làm cross-cutting concerns: auth, authorize, validate adapter, rate limit, logging, error handling.
- Không business logic.
- Auth middleware chỉ decode/verify token + attach user identity tối thiểu lên req (vd `req.user = { id, role }`).
- Rate-limit/permission không được truy cập DB trực tiếp (nếu cần dữ liệu, gọi service trong controller trước).

**E) modules/\<domain\>/*.controller.js (Controller layer)**
- Nhận req, lấy dữ liệu đã validate (`req.validated`), gọi service, trả response.
- KHÔNG xử lý business logic.
- KHÔNG truy cập DB trực tiếp.
- Không tự try/catch từng controller; dùng `asyncHandler` + `errorHandler` tập trung.
- Response format nhất quán: status code chuẩn + JSON (không trả field nhạy cảm).

**F) modules/\<domain\>/*.service.js (Service layer)**
- Chứa business logic, rule nghiệp vụ, orchestration.
- Không phụ thuộc Express: không dùng `req/res`.
- Gọi repo để lấy/ghi dữ liệu.
- Service không trả HTTP response, chỉ trả data domain.
- Khi lỗi: throw `AppError` / `DomainError` với statusCode + code rõ ràng.
- Tuyệt đối không hash/verify JWT ở service (thuộc `infra/middleware`). Service chỉ nhận user identity đã được middleware xác thực.

**G) modules/\<domain\>/repos/* (Repository layer)**
- Chỉ làm việc với DB (query/insert/update/delete).
- Không xử lý business logic.
- Không định dạng response HTTP.
- Không catch lỗi nghiệp vụ; để lỗi DB bubble lên, service xử lý mapping nếu cần.
- Không trả dữ liệu thừa (exclude field nhạy cảm tại query/projection nếu có thể).

**H) infra/ (Infrastructure layer)**
- Chỉ chứa: DB client/connection, security helpers (bcrypt/jwt), logger, error classes, third-party wrappers.
- Không chứa nghiệp vụ theo domain.
- DB connect/init đặt ở `bootstrap` hoặc `infra/db`.
- Helpers phải “thuần”, dễ test, không phụ thuộc Express.

**I) config/ (Config layer)**
- Đọc env và export config object typed/validated.
- Có `.env.example` (nếu dự án yêu cầu).
- Không rải `process.env` khắp codebase; chỉ đọc ở `config`.

**J) bootstrap/ (Bootstrap layer)**
- Tạo Express app, gắn middlewares global, mount routes, start server.
- Không chứa nghiệp vụ.
- Đảm bảo graceful shutdown (nếu code yêu cầu).

#### 4) ERROR HANDLING (BẮT BUỘC)
- Có error handler tập trung ở `middlewares/errorHandler`.
- Controller/service throw error; middleware bắt và trả response.
- Không leak stack trace ở production.
- Mọi lỗi phải có code (vd: `VALIDATION_ERROR`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`).

#### 5) SECURITY (BẮT BUỘC)
- Password: bcrypt hash + compare (`infra/security`).
- JWT: có expires, verify ở middleware auth.
- Không trả các field nhạy cảm (passwordHash, refreshToken, secrets).
- Validate input mọi endpoint (body/query/params).
- Không hardcode secret/DB url.

#### 6) OUTPUT REQUIREMENTS (KHI AI TRẢ LỜI)
Luôn theo thứ tự:
1) Danh sách file sẽ tạo/chỉnh sửa (không thêm file thừa).
2) Luồng xử lý ngắn theo kiến trúc.
3) Code đúng file đúng trách nhiệm.
4) Không giải thích lan man. Không đề xuất kiến trúc mới.

#### CẤM TUYỆT ĐỐI
- Không đổi cấu trúc thư mục.
- Không query DB trong controller.
- Không xử lý business logic trong route.
- Không gộp controller + service.
- Không tạo file/logic không dùng.
