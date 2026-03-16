# Bitnaneun Studio OS -- 종합 개발 가이드

> **버전:** 1.0
> **작성일:** 2026-03-16
> **기술 스택:** Next.js 16 + React 19 + Tailwind CSS 4 + next-intl
> **참조:** bitnaneun_studio_os_final_dev_spec.md, architecture-decision.md, security-review.md

---

## 목차

- [Part 1: 프로젝트 개요](#part-1-프로젝트-개요)
- [Part 2: 기술 스택 & 프로젝트 구조](#part-2-기술-스택--프로젝트-구조)
- [Part 3: 디자인 시스템](#part-3-디자인-시스템)
- [Part 4: 데이터 모델 & API](#part-4-데이터-모델--api)
- [Part 5: 화면별 구현 가이드](#part-5-화면별-구현-가이드)
- [Part 6: 문구 규칙 & i18n](#part-6-문구-규칙--i18n)
- [Part 7: 성능 & 보안](#part-7-성능--보안)
- [Part 8: Sprint 계획 & 체크리스트](#part-8-sprint-계획--체크리스트)

---

## Part 1: 프로젝트 개요

### 1.1 한 줄 정의

노션, 구글 캘린더, 구글 드라이브, 지메일, 슬랙을 연결해 프로젝트, 할 일, 커뮤니케이션, 파일, 견적, 발송물, 팀 상태를 한 번에 읽고 바로 처리할 수 있게 하는 **빛나는 스튜디오 내부 운영 앱**.

### 1.2 핵심 목표

이 앱은 협업툴 모음이 아니다. 빛나는 스튜디오의 **운영 OS**다.

사용자는 이 앱에서 6가지를 즉시 알아야 한다.

1. 지금 바로 봐야 하는 것이 무엇인가
2. 오늘 내가 해야 하는 것이 무엇인가
3. 지금 내가 기다리고 있는 것이 무엇인가
4. 오늘 무슨 일이 있었는가
5. 이번 주에 무슨 일이 올 것인가
6. 지금 어디가 막혀 있는가

이 6가지를 빠르게 보여주지 못하면 홈 화면은 실패다.

### 1.3 사용자 유형

| 유형 | 핵심 니즈 |
|------|----------|
| **대표** | 전체 상황 빠른 파악. 급한 일, 대기 중인 일, 막힌 일 우선. 견적/답장/일정/상태 결정. |
| **운영 담당** | 자료, 일정, 발송, 커뮤니케이션, 할 일 연결 관리. 누락과 지연 발견. |
| **디자이너** | 내 작업만 빠르게 찾기. 최신본과 피드백 확인. 기다리는 것과 다음 작업 파악. |

### 1.4 핵심 원칙

**사용자 원칙**
- 출처보다 의미를 먼저 보여준다
- 프로젝트보다 행동을 먼저 보여준다
- 읽기보다 실행을 먼저 돕는다
- 짧고 쉬운 말을 쓴다
- 복잡한 상황을 카드와 상태로 바꿔 보여준다

**정보 원칙**
- 홈 = 운영 상황판
- 프로젝트 화면 = 상세 작업판
- 검색 = 위치 찾기 도구
- 커뮤니케이션 = 맥락 재구성 도구
- 파일 = 최신본 찾기 도구

**기술 원칙**
- 디자인과 기능을 분리한다
- 데이터 모델과 UI를 느슨하게 연결한다
- 커넥터별 원본을 유지하고 앱은 통합 레이어가 된다
- v1은 가볍고 빠르게 만든다
- AI는 정리와 추천만 한다. 최종 결정은 사람이 한다

**디자인 원칙**
- 디자인은 나중에 크게 바꿀 수 있어야 한다
- 화면 구조는 고정하고 시각 표현은 교체 가능해야 한다
- 컴포넌트는 의미 기반으로 설계한다
- 색, 간격, 폰트, 아이콘은 토큰으로 관리한다
- 문구는 쉬운 일상어를 쓴다

### 1.5 v1 범위

**포함**

1. 홈 화면
2. 프로젝트 목록 / 상세
3. 할 일 관리
4. 커뮤니케이션 타임라인
5. 파일 레지스트리
6. 견적 관리
7. 발송물 관리
8. 팀 상태
9. 통합 검색
10. AI 요약 / 다음 행동 추천 / 누락 감지

**제외**

1. Figma 직접 편집
2. AI 대화창
3. 음성 메모 자동 구조화
4. 공유 기능 고도화
5. 나중에 보기 기능
6. 클라이언트 외부 포털
7. 회계 전체 자동화

### 1.6 MVP 완료 기준

| # | 기준 |
|---|------|
| 1 | 홈에서 오늘의 상황을 10초 안에 파악 가능 |
| 2 | 홈에서 바로 할 일 처리 가능 |
| 3 | 프로젝트 상세에서 최신 맥락 확인 가능 |
| 4 | 파일 화면에서 최신본 위치 확인 가능 |
| 5 | 소통 화면에서 메일과 슬랙 흐름 파악 가능 |
| 6 | 견적 초안 생성 및 상태 관리 가능 |
| 7 | 발송물 등록 및 추적 가능 |
| 8 | 팀 상태 파악 가능 |
| 9 | 검색으로 프로젝트, 파일, 메시지 바로 찾기 가능 |
| 10 | 디자인을 갈아엎어도 기능 코드 대수술이 필요 없을 것 |

---

## Part 2: 기술 스택 & 프로젝트 구조

### 2.1 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js | 16.1.6 | App Router 기반 프레임워크 |
| React | 19.2.3 | UI 라이브러리 |
| Tailwind CSS | 4.x | 유틸리티 CSS (CSS 변수 기반 `@theme inline`) |
| next-intl | 4.8.3 | i18n (ko / en / ja 3개 언어) |
| framer-motion | 12.36.0 | 애니메이션 |
| TypeScript | 5.x | 타입 안전성 |

### 2.2 SwiftUI 5-Layer -> Next.js 매핑

스펙 문서는 SwiftUI 기반 5-Layer 구조를 권장한다. 이것을 Next.js + React 19에 맞게 재해석한다.

| SwiftUI Layer | Next.js Layer | 구현 |
|---------------|---------------|------|
| Presentation Layer (SwiftUI Views) | **Presentation Layer** | React Server Components (기본) + Client Components (인터랙션 필요 시) |
| ViewModel Layer (ObservableObject) | **State/Hook Layer** | Custom Hooks (`useXxx`) + React Context (전역) |
| Domain Layer (Swift Models) | **Domain Layer** | TypeScript 타입 + 순수 유틸리티 함수 (`src/domain/`) |
| Data Layer (Repository Pattern) | **Data Layer** | API Route Handlers + Server Actions + fetch |
| Connector Layer (API/SDK) | **Connector Layer** | 외부 서비스 SDK 래퍼 (`src/connectors/`, 서버 전용) |

**핵심 결정:**

- **Server Components 기본.** `'use client'`는 인터랙션이 필요한 곳에서만 사용한다.
- **전역 상태는 React Context.** v1에서 Zustand는 도입하지 않는다. 전역 클라이언트 상태가 5개 이상으로 복잡해지면 그때 검토한다.
- **도메인 로직은 React 무의존 순수 TypeScript.** `src/domain/`에 React import 없는 순수 함수/타입만 둔다.
- **외부 연동은 서버 전용.** API 키가 클라이언트에 노출되지 않도록 한다.

### 2.3 권장 폴더 구조

```
src/
  app/                              # --- App Router (라우팅만) ---
    layout.tsx                      # Root layout
    globals.css                     # 디자인 토큰 + Tailwind 설정
    [locale]/
      layout.tsx                    # i18n Provider + AppShell
      page.tsx                      # 홈 (운영 상황판)
      projects/
        page.tsx                    # 프로젝트 목록
        [id]/page.tsx               # 프로젝트 상세
      tasks/page.tsx                # 할 일
      communication/page.tsx        # 소통
      files/page.tsx                # 파일
      estimates/
        page.tsx                    # 견적
        [id]/page.tsx               # 견적 상세
      team/page.tsx                 # 팀
      search/page.tsx               # 검색
      settings/page.tsx             # 설정
    api/                            # API Route Handlers
      projects/route.ts
      tasks/route.ts
      ...

  components/                       # --- UI 컴포넌트 ---
    layout/                         # 레이아웃 컴포넌트
      AppShell.tsx
      SidebarLayout.tsx
      BottomNav.tsx
      TwoColumnLayout.tsx
      SectionBlock.tsx
      StickyActionBar.tsx

    information/                    # 정보 표시 컴포넌트
      SummaryTile.tsx
      ActionCard.tsx
      TimelineItem.tsx
      StatusBadge.tsx
      CountBadge.tsx
      MemberPill.tsx
      DueLabel.tsx
      RiskRow.tsx
      EmptyState.tsx

    input/                          # 입력 컴포넌트
      QuickActionButton.tsx
      FilterChip.tsx
      SearchBar.tsx
      AssigneePicker.tsx
      StatusPicker.tsx
      PriorityPicker.tsx
      DateField.tsx
      SourceLinkButton.tsx

    features/                       # 화면별 조합 컴포넌트
      home/
        HomeSummaryBar.tsx
        NowSection.tsx
        TodayTasks.tsx
        WaitingSection.tsx
        TodayDone.tsx
        WeekSchedule.tsx
        BlockedSection.tsx
        QuickActions.tsx
      projects/
        ProjectList.tsx
        ProjectDetail.tsx
        ProjectSections.tsx
      tasks/
        TaskBoard.tsx
        TaskFilters.tsx
        TaskCard.tsx
      communication/
        MessageTimeline.tsx
        MessageCard.tsx
      files/
        FileRegistry.tsx
        FileCard.tsx
      estimates/
        EstimateList.tsx
        EstimateEditor.tsx
        EstimateVersionHistory.tsx
      team/
        TeamOverview.tsx
        MemberCard.tsx
      search/
        SearchResults.tsx

  domain/                           # --- 도메인 로직 (React 무의존) ---
    types/
      user.ts
      project.ts
      task.ts
      decision.ts
      message.ts
      file-asset.ts
      shipment.ts
      estimate.ts
      event.ts
      contact.ts
      presence.ts
      ai-insight.ts
      sync-job.ts
      enums.ts                      # 모든 상태값 enum
      common.ts                     # 공통 필드 (source_app 등)
      index.ts                      # barrel export
    utils/
      task-filters.ts
      status-helpers.ts
      date-helpers.ts
      risk-detection.ts
      home-aggregation.ts

  hooks/                            # --- Custom Hooks ---
    useAuth.ts
    useFilters.ts
    useTaskFilters.ts
    useProjectDetail.ts
    useSearch.ts
    usePresence.ts
    useSidebar.ts

  connectors/                       # --- 외부 서비스 래퍼 (서버 전용) ---
    notion/
      client.ts
      mappers.ts
    google/
      calendar.ts
      drive.ts
      gmail.ts
    slack/
      client.ts
      mappers.ts

  lib/                              # --- 유틸리티 ---
    api-client.ts
    mock/
      projects.ts
      tasks.ts
      messages.ts
      ...
    i18n/
      config.ts
      messages/
        ko.json
        en.json
        ja.json

  styles/                           # --- 스킨/테마 ---
    tokens.css
    skins/
      light.css
      dark.css

  i18n/
    request.ts
```

### 2.4 폴더 분류 원칙

| 폴더 | 원칙 | 내용 |
|------|------|------|
| `app/` | 라우팅만. 비즈니스 로직 금지. | `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` |
| `components/layout/` | 화면 뼈대. 데이터 없음. | AppShell, SidebarLayout, SectionBlock |
| `components/information/` | 읽기 전용 데이터 표시. | ActionCard, StatusBadge, SummaryTile |
| `components/input/` | 사용자 입력. | FilterChip, SearchBar, Pickers |
| `components/features/` | 특정 화면 조합. | HomeSummaryBar, ProjectDetail |
| `domain/` | React 없는 순수 TypeScript. | 타입, enum, 비즈니스 함수 |
| `hooks/` | 상태 로직 캡슐화. | useTaskFilters, useAuth |
| `connectors/` | 외부 서비스 통신. 서버 전용. | Notion, Gmail, Calendar SDK 래퍼 |
| `lib/` | 범용 유틸리티. | fetch 래퍼, mock 데이터, i18n 메시지 |
| `styles/` | 시각 표현만. | 토큰 CSS, 스킨 파일 |

### 2.5 네이밍 컨벤션

| 대상 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 파일 | PascalCase | `ActionCard.tsx` |
| 컴포넌트 이름 | 의미 기반 PascalCase | `StatusBadge`, `SummaryTile` |
| Hook 파일 | camelCase, `use` 접두사 | `useTaskFilters.ts` |
| 도메인 타입 파일 | kebab-case | `file-asset.ts` |
| 유틸리티 파일 | kebab-case | `date-helpers.ts` |
| CSS 변수 | `--카테고리-항목` | `--color-status-danger` |
| enum 값 | snake_case | `waiting_client` |

### 2.6 App Router + next-intl 라우팅 구조

```
/[locale]/                    # 홈 (운영 상황판)
/[locale]/projects            # 프로젝트 목록
/[locale]/projects/[id]       # 프로젝트 상세
/[locale]/tasks               # 할 일
/[locale]/communication       # 소통
/[locale]/files               # 파일
/[locale]/estimates           # 견적 목록
/[locale]/estimates/[id]      # 견적 상세
/[locale]/team                # 팀
/[locale]/search              # 검색
/[locale]/settings            # 설정
```

**메뉴 <-> 라우트 매핑**

| 메뉴 | 라우트 | 데스크탑 | 모바일 |
|------|--------|---------|--------|
| 홈 | `/` | 사이드바 | 하단 네비 |
| 프로젝트 | `/projects` | 사이드바 | 하단 네비 |
| 할 일 | `/tasks` | 사이드바 | 하단 네비 |
| 소통 | `/communication` | 사이드바 | 더보기 |
| 파일 | `/files` | 사이드바 | 하단 네비 |
| 견적 | `/estimates` | 사이드바 | 더보기 |
| 팀 | `/team` | 사이드바 | 더보기 |
| 검색 | `/search` | 상단 공통 | 상단 공통 |
| 설정 | `/settings` | 사이드바 | 더보기 |

### 2.7 환경 변수 관리

```env
# .env.example -- 이 파일에 실제 값을 넣지 않는다

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
ALLOWED_ORIGIN=http://localhost:3000

# Session
SESSION_SECRET=
ENCRYPTION_KEY=

# Google OAuth (Gmail + Calendar + Drive)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Notion
NOTION_INTEGRATION_TOKEN=

# Slack
SLACK_BOT_TOKEN=
SLACK_SIGNING_SECRET=

# Database
DATABASE_URL=
DATABASE_ENCRYPTION_KEY=

# AI
AI_API_KEY=
```

**규칙:**

- `NEXT_PUBLIC_` 접두사 변수에 비밀 값을 절대 넣지 않는다
- `.env.local`(로컬), 배포 환경의 secret manager(Vercel Env, AWS Secrets Manager 등) 사용
- `.gitignore`에 `.env`, `.env.local`, `.env.production`, `*.pem`, `*.key`, `service-account*.json` 포함 필수

---

## Part 3: 디자인 시스템

### 3.1 디자인 토큰 전체 목록

토큰은 CSS 변수로 정의하고, Tailwind CSS 4의 `@theme inline`으로 유틸리티 클래스와 연결한다.

#### 색상

```css
:root {
  /* 배경 */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f7f7f8;
  --color-bg-tertiary: #efefef;

  /* 텍스트 */
  --color-text-primary: #070707;
  --color-text-secondary: #5f5f5f;
  --color-text-muted: #9a9a9a;
  --color-text-inverse: #ffffff;

  /* 상태 색상 (의미 기반) */
  --color-status-danger: #dc2626;
  --color-status-warning: #f59e0b;
  --color-status-info: #3b82f6;
  --color-status-success: #16a34a;
  --color-status-accent: #070707;

  /* 상태 배경 (연한 버전) */
  --color-status-danger-bg: #fef2f2;
  --color-status-warning-bg: #fffbeb;
  --color-status-info-bg: #eff6ff;
  --color-status-success-bg: #f0fdf4;

  /* 보더 */
  --color-border-default: #e5e5e5;
  --color-border-strong: #d4d4d4;
}
```

#### 간격

```css
:root {
  --space-xs: 0.25rem;    /* 4px */
  --space-sm: 0.5rem;     /* 8px */
  --space-md: 1rem;       /* 16px */
  --space-lg: 1.5rem;     /* 24px */
  --space-xl: 2rem;       /* 32px */
  --space-2xl: 3rem;      /* 48px */
}
```

#### 둥근 모서리

```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
}
```

#### 그림자

```css
:root {
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-card-hover: 0 4px 12px rgba(0, 0, 0, 0.12);
  --shadow-modal: 0 8px 32px rgba(0, 0, 0, 0.16);
}
```

#### 타이포그래피

```css
:root {
  --font-size-title: 1.25rem;
  --font-size-body: 0.9375rem;
  --font-size-caption: 0.8125rem;
  --font-size-small: 0.75rem;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
}
```

### 3.2 토큰 -> Tailwind CSS 4 매핑

Tailwind CSS 4에서 `@theme inline` 디렉티브로 CSS 변수를 유틸리티 클래스와 연결한다.

```css
/* globals.css */
@import "tailwindcss";
@import "../styles/tokens.css";
@import "../styles/skins/dark.css";

@theme inline {
  /* 배경 */
  --color-bg-primary: var(--color-bg-primary);
  --color-bg-secondary: var(--color-bg-secondary);

  /* 텍스트 */
  --color-text-primary: var(--color-text-primary);
  --color-text-secondary: var(--color-text-secondary);

  /* 상태 */
  --color-status-danger: var(--color-status-danger);
  --color-status-warning: var(--color-status-warning);
  --color-status-info: var(--color-status-info);
  --color-status-success: var(--color-status-success);

  /* 간격 */
  --spacing-xs: var(--space-xs);
  --spacing-sm: var(--space-sm);
  --spacing-md: var(--space-md);
  --spacing-lg: var(--space-lg);
  --spacing-xl: var(--space-xl);

  /* 둥근 모서리 */
  --radius-sm: var(--radius-sm);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
}
```

**매핑 테이블**

| 토큰 | Tailwind 클래스 | 용도 |
|------|----------------|------|
| `--color-bg-primary` | `bg-bg-primary` | 기본 배경 |
| `--color-bg-secondary` | `bg-bg-secondary` | 카드, 섹션 배경 |
| `--color-text-primary` | `text-text-primary` | 기본 텍스트 |
| `--color-text-secondary` | `text-text-secondary` | 보조 텍스트 |
| `--color-text-muted` | `text-text-muted` | 약한 텍스트 |
| `--color-status-danger` | `text-status-danger` / `bg-status-danger` | 급함, 위험, 지연 |
| `--color-status-warning` | `text-status-warning` / `bg-status-warning` | 확인 필요, 대기 |
| `--color-status-info` | `text-status-info` / `bg-status-info` | 일반 정보, 참고 |
| `--color-status-success` | `text-status-success` / `bg-status-success` | 완료, 정상 |
| `--space-sm` | `p-spacing-sm` / `gap-spacing-sm` | 작은 간격 (8px) |
| `--space-md` | `p-spacing-md` / `gap-spacing-md` | 기본 간격 (16px) |
| `--space-lg` | `p-spacing-lg` / `gap-spacing-lg` | 넓은 간격 (24px) |
| `--radius-md` | `rounded-md` | 기본 둥근 모서리 (8px) |
| `--shadow-card` | `shadow-[var(--shadow-card)]` | 카드 그림자 |

**사용 예시:**

```tsx
// 금지: 직접 색상값 사용
<div className="bg-red-500 text-white p-4">

// 허용: CSS 변수 직접 참조
<div className="bg-[var(--color-status-danger)] text-[var(--color-text-inverse)] p-[var(--space-md)]">

// 권장: Tailwind 확장 클래스 사용
<div className="bg-status-danger text-text-inverse p-spacing-md">
```

**역방향 토큰 조회 표**

하드코딩된 값을 발견했을 때 어떤 토큰으로 대체해야 하는지 빠르게 찾는 표다.

| 하드코딩 값 | 대체 토큰 | Tailwind 클래스 |
|------------|----------|----------------|
| `#dc2626` / `red-600` | `color.status.danger` | `text-status-danger` |
| `#f59e0b` / `yellow-500` | `color.status.warning` | `text-status-warning` |
| `p-4` (16px) | `spacing.md` | `p-spacing-md` |
| `rounded-lg` (8px) | `radius.md` | `rounded-radius-md` |
| `gap-2` (8px) | `spacing.sm` | `gap-spacing-sm` |
| `text-sm` | `font.caption` | 커스텀 유틸 또는 CSS 변수 사용 |
| `shadow-md` | `shadow.card` | `shadow-card` |

> **규칙:** PR 리뷰에서 위 표의 하드코딩 값이 발견되면 토큰으로 교체를 요청한다. 예외는 없다.

### 3.3 의미 색상 규칙

색은 예쁨이 아니라 **의미**로 쓴다. 직접 색상 이름(red, blue)을 사용하지 않는다.

| 토큰 | 의미 | 사용 맥락 |
|------|------|----------|
| `danger` | 급함, 지연, 위험 | 기한 초과, 48시간 이상 답 없음, 배송 분실 위험 |
| `warning` | 확인 필요, 기다림 | 답장 기다림, 승인 기다림, 입금 기다림 |
| `info` | 일반 정보, 참고 | 새 메시지, 일정 알림, 참고 파일 |
| `success` | 완료, 정상 | 작업 완료, 입금 확인, 배송 도착 |
| `accent` | 선택 상태, 강조 | 현재 선택된 필터, 활성 메뉴, CTA 버튼 |

### 3.4 컴포넌트 카탈로그

#### 레이아웃 컴포넌트 (5개)

| 컴포넌트 | 역할 | 사용 맥락 |
|---------|------|----------|
| `AppShell` | 전체 앱 프레임 (사이드바 + 메인 영역) | 모든 페이지의 최상위 래퍼. 데스크탑/모바일 반응형 처리. |
| `SidebarLayout` | 데스크탑 좌측 사이드바 | 9개 메뉴 네비게이션. 모바일에서는 `BottomNav`로 대체. |
| `TwoColumnLayout` | 중앙 본문 + 우측 보조 영역 | 홈 화면 데스크탑 레이아웃. 좌 = 주요 콘텐츠, 우 = 보조 정보. |
| `SectionBlock` | 섹션 래퍼 (제목 + 내용) | 홈 8개 섹션, 프로젝트 상세 각 탭의 컨테이너. |
| `StickyActionBar` | 하단 고정 액션바 | 견적 편집, 할 일 상세 등 모바일에서 주요 행동 버튼 고정. |

#### 정보 컴포넌트 (9개)

| 컴포넌트 | 역할 | 사용 맥락 |
|---------|------|----------|
| `SummaryTile` | 숫자 요약 타일 | 홈 상단 요약 (답할 것 3, 오늘 할 일 7, ...). |
| `ActionCard` | 행동 유도 카드 | 지금 볼 것, 오늘 할 일, 기다리는 것. 1줄 행동 + 2줄 보낸 사람/시간 + 3줄 설명 + 실행 버튼. |
| `TimelineItem` | 타임라인 항목 | 소통 화면, 오늘 한 일. 시간 + 누가 + 한 줄 행동. |
| `StatusBadge` | 상태 뱃지 | 할 일 상태(할 일, 하는 중, 기다림, ...), 프로젝트 상태, 견적 상태. |
| `CountBadge` | 숫자 뱃지 | 메뉴 옆 미처리 건수, 필터 결과 수. |
| `MemberPill` | 멤버 태그 | 담당자 표시. 아바타 + 이름. |
| `DueLabel` | 마감 표시 | 마감까지 남은 시간. "D-3", "오늘 마감", "2일 지남" 등. |
| `RiskRow` | 위험/막힌 일 행 | 홈 막힌 것 섹션. 위험 유형 아이콘 + 설명 + 관련 프로젝트. |
| `EmptyState` | 빈 상태 | 데이터 없을 때, 에러 발생 시 대체 표시. 안내 문구 + 행동 버튼. |

#### 입력 컴포넌트 (8개)

| 컴포넌트 | 역할 | 사용 맥락 |
|---------|------|----------|
| `QuickActionButton` | 빠른 실행 버튼 | 홈 빠른 실행: 새 할 일, 새 메모, 견적 만들기, 배송 등록 등. |
| `FilterChip` | 필터 칩 | 할 일 필터(내 일, 전체, 오늘, ...), 파일 카테고리 필터. |
| `SearchBar` | 검색바 | 상단 공통 검색. 프로젝트, 파일, 메시지 통합 검색. |
| `AssigneePicker` | 담당자 선택 | 할 일 생성/수정 시 담당자 지정. |
| `StatusPicker` | 상태 선택 | 할 일 상태 변경, 프로젝트 상태 변경. |
| `PriorityPicker` | 우선순위 선택 | 할 일 우선순위 설정. |
| `DateField` | 날짜 입력 | 마감일, 일정 날짜 입력. |
| `SourceLinkButton` | 원본 링크 버튼 | 노션, 지메일, 드라이브 원본으로 이동하는 외부 링크 버튼. |

### 3.5 스킨 분리 패턴

모든 의미 컴포넌트는 **로직**과 **스타일**을 분리한다.

```
컴포넌트 = 데이터 바인딩(Props) + 구조(JSX) + 스타일(CSS 변수/Tailwind)
```

**스타일 분리 규칙:**

1. **색상:** CSS 변수로만 참조. 직접 색상값 금지.

```tsx
// 금지
<div className="bg-red-500 text-white">

// 권장
<div className="bg-status-danger text-text-inverse">
```

2. **간격:** 토큰 변수 사용. 하드코딩 금지.

```tsx
// 금지
<div className="p-4 gap-6">

// 권장
<div className="p-spacing-md gap-spacing-lg">
```

3. **둥근 모서리, 그림자:** 토큰 사용.

```tsx
<div className="rounded-md shadow-[var(--shadow-card)]">
```

4. **Props 설계:** 컴포넌트가 데이터 소스를 몰라야 디자인 교체가 쉽다.

```tsx
// 나쁨: 원시 데이터를 직접 전달
interface ActionCardProps {
  messageId: string;
  senderEmail: string;
  bodyText: string;
  sentAt: string;
  needsReply: boolean;
}

// 좋음: 의미 단위로 정제된 Props
interface ActionCardProps {
  action: string;           // "답장 보내기"
  sender: string;           // "김디자이너"
  description: string;      // "A5로 바꾸기 - 국제시장2"
  timestamp: string;        // "2시간 전"
  status: 'danger' | 'warning' | 'info';
  onAction?: () => void;
}
```

### 3.6 다크모드 / 라이트모드 전환

다크 모드는 CSS 변수 값 변경만으로 동작한다. 기능 코드 수정 없음.

```css
/* src/styles/skins/dark.css */
[data-theme='dark'] {
  --color-bg-primary: #0a0a0a;
  --color-bg-secondary: #171717;
  --color-bg-tertiary: #262626;

  --color-text-primary: #fafafa;
  --color-text-secondary: #a3a3a3;
  --color-text-muted: #737373;
  --color-text-inverse: #0a0a0a;

  --color-status-danger: #f87171;
  --color-status-warning: #fbbf24;
  --color-status-info: #60a5fa;
  --color-status-success: #4ade80;

  --color-status-danger-bg: #450a0a;
  --color-status-warning-bg: #451a03;
  --color-status-info-bg: #172554;
  --color-status-success-bg: #052e16;

  --color-border-default: #2e2e2e;
  --color-border-strong: #404040;

  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-card-hover: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-modal: 0 8px 32px rgba(0, 0, 0, 0.5);
}
```

**전환 방법:**

```tsx
// 최상위 layout에서 data-theme 속성을 토글
<html data-theme={theme}>
```

테마 상태는 React Context로 관리하고, `localStorage`에 사용자 선택을 저장한다.

### 3.7 토큰 확장 규칙

새로운 토큰이 필요할 때:

1. 기존 토큰으로 표현 가능한지 먼저 확인한다.
2. 새 토큰이 필요하면 같은 네이밍 패턴을 따른다: `--카테고리-세부-변형`
3. 라이트 모드와 다크 모드 모두에 값을 정의한다.
4. `@theme inline`에 등록하여 Tailwind에서 사용 가능하게 한다.

```
예시: accent-subtle 색상이 필요하면
  tokens.css:  --color-status-accent-subtle: #f5f5f5;
  dark.css:    --color-status-accent-subtle: #262626;
  @theme:      --color-status-accent-subtle: var(--color-status-accent-subtle);
```

---

## Part 4: 데이터 모델 & API

### 4.1 엔티티 TypeScript 인터페이스

#### 공통 타입

```typescript
// domain/types/common.ts

/** 외부 서비스 식별자 */
type SourceApp = 'notion' | 'gmail' | 'calendar' | 'drive' | 'slack' | 'manual';

/** 외부 서비스 연결 공통 필드 */
interface ExternalSource {
  source_app: SourceApp;
  source_id: string;
  canonical_url: string;
  last_synced_at: string; // ISO 8601
}

/** 기본 타임스탬프 */
interface Timestamps {
  created_at: string; // ISO 8601
  updated_at: string; // ISO 8601
}
```

#### User

```typescript
// domain/types/user.ts

interface User extends Timestamps {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar_url: string | null;
  status: PresenceStatus;
}

type UserRole = 'admin' | 'manager' | 'member';
```

#### Project

```typescript
// domain/types/project.ts

interface Project extends Partial<ExternalSource>, Timestamps {
  id: string;
  title: string;
  description: string | null;
  client_name: string;
  status: ProjectStatus;
  phase: string | null;
  priority: Priority;
  owner_user_id: string;
  due_date: string | null; // ISO 8601
  latest_file_id: string | null;
}
```

#### Task

```typescript
// domain/types/task.ts

interface Task extends Partial<ExternalSource>, Timestamps {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: Priority;
  assignee_user_id: string | null;
  due_at: string | null;   // ISO 8601
  completed_at: string | null;
  blocked_reason: string | null;
}
```

#### Decision

```typescript
// domain/types/decision.ts

interface Decision extends Timestamps {
  id: string;
  project_id: string;
  title: string;
  summary: string;
  status: string;
  decided_by_user_id: string | null;
  decided_at: string | null;
  source_message_id: string | null;
}
```

#### Message

```typescript
// domain/types/message.ts

interface Message extends Partial<ExternalSource>, Timestamps {
  id: string;
  project_id: string | null;
  thread_id: string | null;
  sender_name: string;
  sender_email: string | null;
  recipients_json: string | null;
  subject: string | null;
  body_text: string;
  sent_at: string; // ISO 8601
  needs_reply: boolean;
  importance: MessageImportance;
}

type MessageImportance = 'low' | 'normal' | 'high';
```

#### FileAsset

```typescript
// domain/types/file-asset.ts

interface FileAsset extends Partial<ExternalSource>, Timestamps {
  id: string;
  project_id: string | null;
  title: string;
  category: FileCategory;
  mime_type: string | null;
  size_bytes: number | null;
  latest_version_label: string | null;
  is_latest: boolean;
  is_final: boolean;
  modified_at: string | null;
}

type FileCategory =
  | 'brief'          // 브리프
  | 'reference'      // 참고
  | 'working_file'   // 작업 파일
  | 'shared_file'    // 공유 파일
  | 'final_delivery' // 최종 납품본
  | 'physical_media'; // 물리 매체
```

#### Shipment

```typescript
// domain/types/shipment.ts

interface Shipment extends Timestamps {
  id: string;
  project_id: string | null;
  type: string;
  title: string;
  carrier: string | null;
  tracking_number: string | null;
  sender_name: string;
  recipient_name: string;
  recipient_address: string | null;
  status: ShipmentStatus;
  shipped_at: string | null;
  delivered_at: string | null;
  notes: string | null;
}
```

#### Estimate & EstimateVersion

```typescript
// domain/types/estimate.ts

interface Estimate extends Timestamps {
  id: string;
  project_id: string | null;
  title: string;
  status: EstimateStatus;
  issued_date: string | null;
  valid_until: string | null;
  currency: string;
  subtotal_amount: number;
  tax_amount: number;
  total_amount: number;
  current_version_id: string | null;
}

interface EstimateVersion {
  id: string;
  estimate_id: string;
  version_number: number;
  line_items_json: string;
  subtotal_amount: number;
  tax_amount: number;
  total_amount: number;
  pdf_file_id: string | null;
  is_superseded: boolean;
  created_at: string;
}
```

#### Event

```typescript
// domain/types/event.ts

interface Event extends Partial<ExternalSource>, Timestamps {
  id: string;
  project_id: string | null;
  title: string;
  event_type: string;
  starts_at: string; // ISO 8601
  ends_at: string;   // ISO 8601
}
```

#### Contact

```typescript
// domain/types/contact.ts

interface Contact extends Timestamps {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  role: string | null;
}
```

#### PresenceSnapshot

```typescript
// domain/types/presence.ts

interface PresenceSnapshot {
  id: string;
  user_id: string;
  presence_status: PresenceStatus;
  status_text: string | null;
  source_app: SourceApp;
  captured_at: string; // ISO 8601
}
```

#### AIInsight

```typescript
// domain/types/ai-insight.ts

interface AIInsight {
  id: string;
  project_id: string | null;
  entity_type: string;
  entity_id: string;
  insight_type: InsightType;
  title: string;
  summary: string;
  confidence_score: number; // 0.0 ~ 1.0
  action_payload_json: string | null;
  created_at: string;
  dismissed_at: string | null;
}

type InsightType =
  | 'summary'           // 요약
  | 'next_action'       // 다음 행동 추천
  | 'missing_reply'     // 답장 필요 감지
  | 'blocked'           // 막힌 일 감지
  | 'missing_file'      // 누락 파일 감지
  | 'estimate_draft';   // 견적 항목 초안 제안
```

#### ExternalLink

```typescript
// domain/types/external-link.ts (barrel export via index.ts)

interface ExternalLink extends Timestamps {
  id: string;
  entity_type: string;
  entity_id: string;
  source_app: SourceApp;
  source_id: string;
  canonical_url: string;
}
```

#### SyncJob

```typescript
// domain/types/sync-job.ts

interface SyncJob {
  id: string;
  source_app: SourceApp;
  status: 'pending' | 'running' | 'completed' | 'failed';
  started_at: string | null;
  completed_at: string | null;
  error_message: string | null;
  records_synced: number;
  created_at: string;
}
```

### 4.2 상태값 enum

```typescript
// domain/types/enums.ts

/** 할 일 상태 */
const TaskStatus = {
  TODO: 'todo',
  DOING: 'doing',
  WAITING: 'waiting',
  REVIEW: 'review',
  BLOCKED: 'blocked',
  DONE: 'done',
  CANCELED: 'canceled',
} as const;
type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

/** 프로젝트 상태 */
const ProjectStatus = {
  PLANNED: 'planned',
  ACTIVE: 'active',
  WAITING_CLIENT: 'waiting_client',
  INTERNAL_WORK: 'internal_work',
  DELIVERY_PENDING: 'delivery_pending',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
  STOPPED: 'stopped',
} as const;
type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];

/** 견적 상태 */
const EstimateStatus = {
  DRAFT: 'draft',
  REVIEW: 'review',
  SENT: 'sent',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SUPERSEDED: 'superseded',
} as const;
type EstimateStatus = (typeof EstimateStatus)[keyof typeof EstimateStatus];

/** 발송물 상태 */
const ShipmentStatus = {
  PREPARING: 'preparing',
  SHIPPED: 'shipped',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  RETURNED: 'returned',
  LOST_RISK: 'lost_risk',
} as const;
type ShipmentStatus = (typeof ShipmentStatus)[keyof typeof ShipmentStatus];

/** 팀원 상태 */
const PresenceStatus = {
  WORKING: 'working',
  MEETING: 'meeting',
  AWAY: 'away',
  OFFLINE: 'offline',
} as const;
type PresenceStatus = (typeof PresenceStatus)[keyof typeof PresenceStatus];

/** 우선순위 */
const Priority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;
type Priority = (typeof Priority)[keyof typeof Priority];
```

### 4.3 공통 필드 패턴

모든 외부 서비스에서 가져온 데이터는 아래 4개 필드를 포함한다.

| 필드 | 타입 | 설명 |
|------|------|------|
| `source_app` | `SourceApp` | 데이터 출처 (notion, gmail, calendar, drive, slack, manual) |
| `source_id` | `string` | 원본 서비스에서의 고유 ID |
| `canonical_url` | `string` | 원본으로 이동하는 URL |
| `last_synced_at` | `string (ISO 8601)` | 마지막 동기화 시각. 항상 사용자에게 보여줌. |

**원칙:**
- 노션 원본은 노션에 남긴다
- 메일 원본은 Gmail에 남긴다
- 파일 원본은 Drive에 남긴다
- 메시지 원문은 Slack에 남긴다
- 앱은 통합해서 보여주고 필요한 범위만 쓴다

### 4.4 커넥터 범위

| 서비스 | 읽기 | 쓰기 |
|--------|------|------|
| **Notion** | 프로젝트, 할 일, 노트, 견적 메타데이터 | 프로젝트 속성 변경, 할 일 생성/수정, 결정 기록 추가 |
| **Google Drive** | 파일 목록, 수정 시각, 폴더 위치, 원본 링크 | 최소 범위. 원본 링크 연결 중심. |
| **Gmail** | 메일 스레드, 보낸/받은 메일, 중요 표시 | 초안 만들기, 라벨 변경 |
| **Google Calendar** | 일정, 마감, 회의 | 일정 생성, 일정 수정 |
| **Slack** | 채널 메시지, 상태, 스레드 흐름 | 상태 업데이트 (제한적) |

**동기화 전략 (v1):**
- 모든 서비스: 주기 동기화 + 수동 새로고침
- 실시간 양방향은 v1에서 하지 않는다
- 최신 데이터보다 신뢰 가능한 데이터가 우선이다
- 마지막 동기화 시각을 항상 보여준다

### 4.5 Mock 데이터 구조

개발 초기에는 `src/lib/mock/`에 mock 데이터를 두고 같은 인터페이스로 실 API와 교체 가능하게 한다.

```typescript
// src/lib/mock/projects.ts
import type { Project } from '@/domain/types';

export const mockProjects: Project[] = [
  {
    id: 'proj-001',
    title: '퀸 락 몬트리올 아트 디렉션',
    description: '퀸 락 몬트리올 페스티벌 비주얼 아이덴티티',
    client_name: '퀸 락 몬트리올',
    status: 'active',
    phase: '디자인 진행',
    priority: 'high',
    owner_user_id: 'user-001',
    due_date: '2026-04-15T00:00:00Z',
    latest_file_id: 'file-003',
    source_app: 'notion',
    source_id: 'notion-page-abc123',
    canonical_url: 'https://notion.so/abc123',
    last_synced_at: '2026-03-16T09:00:00Z',
    created_at: '2026-02-01T00:00:00Z',
    updated_at: '2026-03-16T09:00:00Z',
  },
  // ... 더 많은 데이터
];
```

---

## Part 5: 화면별 구현 가이드

### 5.1 공통: 메뉴 구조

**데스크탑 (사이드바 9개)**

1. 홈
2. 프로젝트
3. 할 일
4. 소통
5. 파일
6. 견적
7. 팀
8. 검색
9. 설정

**모바일 (하단 네비 5개 + 더보기)**

1. 홈
2. 프로젝트
3. 할 일
4. 파일
5. 더보기 (소통, 견적, 팀, 설정)

검색은 상단 공통 영역에 둔다.

### 5.2 홈 화면

홈은 프로젝트 목록이 아니라 **운영 상황판**이다.

#### 5.2.1 상단 요약

앱을 열자마자 현재 상황을 숫자로 파악한다.

| 항목 | 설명 |
|------|------|
| 답할 것 | 답장이 필요한 메일/메시지 수 |
| 오늘 할 일 | 오늘 처리할 작업 수 |
| 기다리는 것 | 대기 중인 항목 수 |
| 진행 중 프로젝트 | 현재 진행 중인 프로젝트 수 |
| 막힌 일 | 위험 또는 지연 중인 항목 수 |

**원칙:** 안 읽은 메일 수는 기본 핵심 지표가 아니다. 답해야 하는 것과 막힌 것을 우선 노출한다.

**컴포넌트:** `HomeSummaryBar` -> `SummaryTile` x 5

#### 5.2.2 지금 볼 것

지금 판단하거나 확인해야 할 요청을 보여준다.

**포함:** 중요한 메일, Slack 요청, 변경 요청, 금액 관련 확인, 작업 범위 변경

**카드 구조 (ActionCard):**
- 1줄: 해야 할 행동 (예: "입금 확인")
- 2줄: 보낸 사람 + 시간 (예: "김운영 - 2시간 전")
- 3줄: 한 줄 설명 (예: "퀸 락 몬트리올 - 잔금 입금 확인 요청")
- 우측: 실행 버튼

**컴포넌트:** `NowSection` -> `ActionCard` x N

#### 5.2.3 오늘 할 일

내가 오늘 실제로 움직일 수 있는 일만 보여준다.

**포함:** 답장 보내기, 수정안 보내기, 견적 다시 보내기, 하드 도착 확인, 일정 등록

**제외:** 이미 끝난 일, 내가 할 수 없는 일, 단순 참고 정보

**컴포넌트:** `TodayTasks` -> `ActionCard` x N

#### 5.2.4 기다리는 것

운영상 중요한 대기 상태를 모아 보여준다. 이 섹션은 필수다.

**포함:** 답장 기다림, 승인 기다림, 입금 기다림, 자료 도착 기다림, 피드백 기다림

**컴포넌트:** `WaitingSection` -> `ActionCard` x N

#### 5.2.5 오늘 한 일

오늘 보낸 것, 수정한 것, 전달한 것을 짧게 기록한다.

**포함:** 수정 시안 보냄, 견적 보냄, 하드 발송, 일정 잡음, 자료 업로드

**형식:** 시간 + 누가 했는지 + 한 줄 행동

**컴포넌트:** `TodayDone` -> `TimelineItem` x N

#### 5.2.6 이번 주 일정

이번 주의 마감, 회의, 전달 일정을 보여준다.

**포함 정보:** 날짜, 제목, 시각, 관련 프로젝트, 마감까지 남은 시간

**컴포넌트:** `WeekSchedule` -> `TimelineItem` + `DueLabel`

#### 5.2.7 막힌 것

위험하거나 지연되는 것을 보여준다.

**예시:** 최신본 불명확, 담당자 없는 일, 48시간 이상 답 없는 메일, 파일 위치 미연결, 배송 지연

**컴포넌트:** `BlockedSection` -> `RiskRow` x N

#### 5.2.8 빠른 실행

항상 보이는 빠른 버튼.

| 버튼 | 행동 |
|------|------|
| 새 할 일 | 할 일 생성 모달 |
| 새 메모 | 메모 생성 |
| 소통 기록 | 수동 소통 기록 |
| 견적 만들기 | 견적 생성 |
| 배송 등록 | 배송 등록 |
| 일정 추가 | 캘린더 일정 추가 |

**컴포넌트:** `QuickActions` -> `QuickActionButton` x 6

#### 5.2.9 레이아웃 배치 규칙

**모바일 (단일 컬럼, 세로 스크롤):**

1. 상단 요약
2. 지금 볼 것
3. 오늘 할 일
4. 기다리는 것
5. 오늘 한 일
6. 이번 주 일정
7. 막힌 것
8. 빠른 실행

**데스크탑 (TwoColumnLayout):**

| 영역 | 섹션 |
|------|------|
| 중앙 상단 | 지금 볼 것 + 오늘 할 일 |
| 중앙 하단 | 오늘 한 일 + 이번 주 일정 |
| 우측 상단 | 기다리는 것 |
| 우측 하단 | 막힌 것 + 빠른 실행 + 팀 상태 |

### 5.3 프로젝트 화면

**목적:** 프로젝트 하나를 깊게 보는 화면.

**프로젝트 목록:** 프로젝트 카드 목록. 각 카드에 프로젝트명, 상태, 클라이언트명, 다음 마감, 담당자 표시.

**프로젝트 상세 -- 헤더 정보:**

| 항목 | 설명 |
|------|------|
| 프로젝트명 | 제목 |
| 상태 | StatusBadge (planned, active, ...) |
| 단계 | 현재 진행 단계 |
| 담당자 | MemberPill |
| 다음 마감 | DueLabel |
| 최신본 | SourceLinkButton (Drive 링크) |

**프로젝트 상세 -- 8개 섹션:**

1. **개요** -- 프로젝트 기본 정보, 설명, 클라이언트, 우선순위
2. **일정** -- 관련 이벤트 목록 (캘린더 동기화)
3. **할 일** -- 이 프로젝트의 할 일 목록 (필터/상태 변경 가능)
4. **결정 기록** -- 주요 결정 사항 목록
5. **소통** -- 이 프로젝트 관련 메일/슬랙 타임라인
6. **파일** -- 이 프로젝트의 파일 목록 (카테고리별)
7. **견적** -- 이 프로젝트의 견적 목록 (버전 포함)
8. **발송물** -- 이 프로젝트의 발송물 목록

### 5.4 할 일 화면

**목적:** 실행할 일을 관리하는 화면.

**필터 7종:**

| 필터 | 설명 |
|------|------|
| 내 일 | 내게 할당된 작업 |
| 전체 | 모든 작업 |
| 오늘 | 오늘 마감인 작업 |
| 이번 주 | 이번 주 마감인 작업 |
| 기다리는 일 | status = waiting |
| 막힌 일 | status = blocked |
| 완료 | status = done |

**상태 6종 (+ canceled):**

| 상태값 | 한국어 | 의미 색상 |
|--------|--------|----------|
| `todo` | 할 일 | info |
| `doing` | 하는 중 | accent |
| `waiting` | 기다림 | warning |
| `review` | 검토 중 | info |
| `blocked` | 막힘 | danger |
| `done` | 끝남 | success |

### 5.5 소통 화면

**목적:** 메일, 슬랙, 수동 기록을 한 흐름으로 보는 화면.

**보여줄 것:**
- 누가
- 언제
- 무슨 말을 했는지
- 어떤 일이 생겼는지
- 다음 행동이 무엇인지

**컴포넌트:** `MessageTimeline` -> `TimelineItem` (SourceApp 아이콘 + 발신자 + 시간 + 내용 요약 + 다음 행동)

원문은 `SourceLinkButton`으로 원본 서비스에서 확인한다.

### 5.6 파일 화면

**목적:** 최신본과 원본 위치를 빠르게 찾는 화면.

**카테고리 6종:**

| 값 | 한국어 |
|----|--------|
| `brief` | 브리프 |
| `reference` | 참고 |
| `working_file` | 작업 파일 |
| `shared_file` | 공유 파일 |
| `final_delivery` | 최종 납품본 |
| `physical_media` | 물리 매체 |

각 파일 카드에 제목, 카테고리, 수정 시각, 최신본 여부(`is_latest`), 최종본 여부(`is_final`), 원본 링크(`canonical_url`) 표시.

### 5.7 견적 화면

**목적:** 견적 초안 작성, 버전 관리, 발송 상태 확인.

**상태 6종:**

| 상태값 | 한국어 | 의미 색상 |
|--------|--------|----------|
| `draft` | 초안 | info |
| `review` | 검토 중 | warning |
| `sent` | 보냄 | info |
| `approved` | 승인 | success |
| `rejected` | 거절 | danger |
| `superseded` | 이전 버전 | (muted) |

**버전 관리:** 견적은 `EstimateVersion`으로 버전을 관리한다. 새 버전 생성 시 이전 버전은 `is_superseded: true`로 표시. `current_version_id`로 현재 유효 버전을 추적.

### 5.8 팀 화면

**목적:** 누가 무엇을 하는지 간단히 파악.

**보여줄 것:** 이름, 지금 상태, 맡은 프로젝트 수, 오늘 할 일 수, 막힌 일 수

**상태 4종:**

| 상태값 | 한국어 |
|--------|--------|
| `working` | 작업 중 |
| `meeting` | 회의 중 |
| `away` | 자리 비움 |
| `offline` | 오프라인 |

### 5.9 검색 화면

**목적:** 통합 검색으로 프로젝트, 파일, 메시지를 바로 찾기.

검색 대상: 프로젝트, 할 일, 메시지, 파일, 견적, 발송물.

검색 결과는 타입별로 그룹핑하여 표시. 각 결과에 `SourceLinkButton`으로 원본 이동 가능.

**성능 기준:** 검색 반응 체감 300ms 안팎.

### 5.10 설정 화면

- 외부 서비스 연결 관리 (Notion, Google, Slack)
- 테마 설정 (라이트/다크)
- 언어 설정 (한국어/영어/일본어)
- 알림 설정
- 권한 관리 (Admin만)

---

## Part 6: 문구 규칙 & i18n

### 6.1 문구 원칙

문구는 업무 문서 말투가 아니라 **everyday UI 말투**로 간다.

- 한 카드 제목은 **20자 안팎**으로 유지
- **행동을 먼저** 쓴다
- 한자어를 줄인다
- 업무 문서 말투를 줄인다
- 뜻이 바로 박히는 말을 쓴다

### 6.2 좋은 / 나쁜 문구 예시

| 나쁜 예 | 좋은 예 |
|---------|---------|
| 확인 필요 | 지금 볼 것 |
| 오늘 처리할 것 | 오늘 할 일 |
| 오늘 활동 | 오늘 한 일 |
| 회신 | 답장 |
| 발송 | 보냄 |
| 재발행 | 다시 발행 |
| 업무범위 | 작업 범위 |
| 피드백 대기 | 답 기다림 |
| 프로젝트 현황 | 프로젝트 상태 |
| 업무범위 및 입금 건 | 입금 확인 - 퀸 락 몬트리올 |
| 회신 필요 사항 | 답장 보내기 - Nike x GD |
| 프로젝트 관련 문의 | 수정안 보내기 - 도덕선생 |
| 기타 요청 | 하드 도착 확인 |
| 확인 필요 | 세금계산서 다시 발행 |

### 6.3 상태 문구 한국어 매핑

#### Task 상태

| 값 | 한국어 |
|----|--------|
| `todo` | 할 일 |
| `doing` | 하는 중 |
| `waiting` | 기다림 |
| `review` | 검토 중 |
| `blocked` | 막힘 |
| `done` | 끝남 |
| `canceled` | 취소 |

#### Project 상태

| 값 | 한국어 |
|----|--------|
| `planned` | 준비 중 |
| `active` | 진행 중 |
| `waiting_client` | 클라이언트 대기 |
| `internal_work` | 내부 작업 |
| `delivery_pending` | 전달 대기 |
| `completed` | 완료 |
| `archived` | 보관 |
| `stopped` | 중단 |

#### Estimate 상태

| 값 | 한국어 |
|----|--------|
| `draft` | 초안 |
| `review` | 검토 중 |
| `sent` | 보냄 |
| `approved` | 승인 |
| `rejected` | 거절 |
| `superseded` | 이전 버전 |

#### Shipment 상태

| 값 | 한국어 |
|----|--------|
| `preparing` | 준비 중 |
| `shipped` | 보냄 |
| `in_transit` | 이동 중 |
| `delivered` | 도착 |
| `returned` | 반송 |
| `lost_risk` | 분실 위험 |

#### Presence 상태

| 값 | 한국어 |
|----|--------|
| `working` | 작업 중 |
| `meeting` | 회의 중 |
| `away` | 자리 비움 |
| `offline` | 오프라인 |

### 6.4 next-intl 사용 패턴

**메시지 키 네이밍 규칙:** `네임스페이스.항목`

```json
// src/lib/i18n/messages/ko.json
{
  "home": {
    "summary": {
      "replies": "답할 것",
      "todayTasks": "오늘 할 일",
      "waiting": "기다리는 것",
      "activeProjects": "진행 중",
      "blocked": "막힌 일"
    },
    "sections": {
      "now": "지금 볼 것",
      "todayTasks": "오늘 할 일",
      "waiting": "기다리는 것",
      "todayDone": "오늘 한 일",
      "weekSchedule": "이번 주 일정",
      "blocked": "막힌 것",
      "quickActions": "빠른 실행"
    }
  },
  "status": {
    "task": {
      "todo": "할 일",
      "doing": "하는 중",
      "waiting": "기다림",
      "review": "검토 중",
      "blocked": "막힘",
      "done": "끝남",
      "canceled": "취소"
    },
    "project": {
      "planned": "준비 중",
      "active": "진행 중",
      "waiting_client": "클라이언트 대기",
      "internal_work": "내부 작업",
      "delivery_pending": "전달 대기",
      "completed": "완료",
      "archived": "보관",
      "stopped": "중단"
    },
    "presence": {
      "working": "작업 중",
      "meeting": "회의 중",
      "away": "자리 비움",
      "offline": "오프라인"
    }
  },
  "nav": {
    "home": "홈",
    "projects": "프로젝트",
    "tasks": "할 일",
    "communication": "소통",
    "files": "파일",
    "estimates": "견적",
    "team": "팀",
    "search": "검색",
    "settings": "설정",
    "more": "더보기"
  },
  "actions": {
    "newTask": "새 할 일",
    "newMemo": "새 메모",
    "logCommunication": "소통 기록",
    "newEstimate": "견적 만들기",
    "newShipment": "배송 등록",
    "addEvent": "일정 추가"
  }
}
```

**컴포넌트에서 사용:**

```tsx
import { useTranslations } from 'next-intl';

function HomeSummaryBar() {
  const t = useTranslations('home.summary');

  return (
    <div className="flex gap-spacing-md">
      <SummaryTile label={t('replies')} count={3} status="danger" />
      <SummaryTile label={t('todayTasks')} count={7} status="info" />
      <SummaryTile label={t('waiting')} count={5} status="warning" />
      <SummaryTile label={t('activeProjects')} count={4} />
      <SummaryTile label={t('blocked')} count={2} status="danger" />
    </div>
  );
}
```

**네임스페이스 규칙:**

| 네임스페이스 | 용도 |
|-------------|------|
| `home` | 홈 화면 전용 |
| `projects` | 프로젝트 화면 전용 |
| `tasks` | 할 일 화면 전용 |
| `status` | 상태값 한국어 매핑 (전역) |
| `nav` | 네비게이션 (전역) |
| `actions` | 행동 버튼 라벨 (전역) |
| `common` | 공통 문구 (전역) |

### 6.5 다국어 확장 시 규칙

#### 새 언어 추가 절차

예시: 일본어(`ja`) 추가 시

1. `src/lib/i18n/messages/ja.json` 생성 -- 기존 `ko.json`의 모든 키를 복사한 뒤 번역
2. `src/i18n/config.ts` (또는 `middleware.ts`)에 locale 추가

```typescript
// src/i18n/config.ts
export const locales = ['ko', 'en', 'ja'] as const;
export const defaultLocale = 'ko';
```

3. `messages/ja.json`의 모든 키가 `ko.json`과 1:1 대응하는지 확인. 누락 키가 있으면 빌드 경고를 내도록 CI에서 검증한다.

#### 미번역 키 처리

fallback locale을 설정하여 미번역 키가 있을 때 기본 언어로 표시한다.

```typescript
// next-intl 설정
{
  defaultLocale: 'ko',
  locales: ['ko', 'en', 'ja'],
  fallback: {
    ja: 'en',
    en: 'ko'
  }
}
```

> **원칙:** 빈 문자열보다 fallback 언어 표시가 낫다. 사용자에게 빈 화면을 보여주지 않는다.

#### 날짜 / 숫자 포맷

locale별로 날짜와 숫자 포맷이 다르다. `next-intl`의 포맷 함수를 사용한다.

```tsx
import { useFormatter } from 'next-intl';

function DateDisplay({ date }: { date: Date }) {
  const format = useFormatter();
  return <span>{format.dateTime(date, { year: 'numeric', month: 'short', day: 'numeric' })}</span>;
}
```

- 날짜: `useFormatter().dateTime()` -- locale에 따라 `2026년 3월 16일` / `Mar 16, 2026` / `2026年3月16日` 자동 변환
- 숫자: `useFormatter().number()` -- 천 단위 구분자, 소수점 기호 자동 처리
- 직접 포맷 문자열 하드코딩 금지 (`YYYY-MM-DD` 등)

#### RTL 언어 지원

v1에서는 RTL(아랍어, 히브리어 등)을 지원하지 않는다. 단, 향후 확장을 위해 구조만 준비한다.

- `<html>` 태그의 `dir` 속성을 locale에 따라 동적으로 설정할 수 있도록 layout 구조를 유지
- CSS에서 `left`/`right` 대신 `start`/`end` 논리적 속성 사용을 권장
- Tailwind의 `ms-`, `me-`, `ps-`, `pe-` (margin-inline-start 등) 사용 권장

---

## Part 7: 성능 & 보안

### 7.1 성능 목표

| 항목 | 목표 |
|------|------|
| 홈 첫 로드 체감 | 2초 이내 |
| 검색 반응 체감 | 300ms 안팎 |
| 화면 전환 | 즉시 반응 |
| 무거운 원문 | 지연 로딩 |
| 데이터 로딩 | 최근 데이터 우선 |
| 긴 리스트 | 가상화 처리 |

가장 중요한 것은 **빠르다는 느낌**이다. 느리면 안 쓴다.

### 7.2 지연 로딩

- 무거운 원문 (메일 본문, 파일 미리보기) -> 사용자가 클릭할 때 로딩
- 이미지 -> `next/image`의 lazy loading
- 화면별 코드 -> App Router의 자동 코드 분할
- 모달 콘텐츠 -> `React.lazy` + `Suspense`

### 7.3 가상 리스트

긴 리스트(100개 이상)에는 가상화를 적용한다.

대상: 할 일 목록, 메시지 타임라인, 파일 목록, 검색 결과

### 7.4 데이터 페칭 전략

- Server Components에서 데이터 fetch -> Props로 전달 (RSC 패턴)
- 홈 화면 8개 섹션은 독립적으로 로딩. 하나의 섹션 에러가 전체를 깨뜨리지 않는다.
- `Suspense` 경계를 섹션 단위로 설정하여 점진적 로딩
- 최근 데이터 우선 로딩 (시간 역순 정렬 기본)

### 7.5 번들 최적화

#### dynamic import 적용 기준

화면 단위 코드 분할과 무거운 라이브러리는 dynamic import로 지연 로딩한다.

적용 대상:
- 초기 로드에 필요 없는 화면 (견적 상세, 설정 등)
- 무거운 라이브러리 (PDF 생성, 차트, 에디터 등)
- 모달, 드로어 등 사용자 액션 후에만 보이는 UI

#### next/dynamic 사용 패턴

```tsx
import dynamic from 'next/dynamic';

// 견적 PDF 생성기: 사용 시점에만 로드
const EstimatePdfGenerator = dynamic(
  () => import('@/components/estimates/EstimatePdfGenerator'),
  {
    loading: () => <LoadingSpinner label="PDF 생성 준비 중" />,
    ssr: false,
  }
);
```

> **규칙:** `ssr: false`는 브라우저 전용 API(canvas, window 등)를 사용하는 컴포넌트에만 적용한다. 기본은 SSR 활성화.

#### tree-shaking 주의사항

- barrel exports(`index.ts`에서 `export * from`)를 최소화한다. 필요한 모듈만 명시적으로 re-export
- `package.json`에 `"sideEffects": false` 설정 확인
- 아이콘 라이브러리는 개별 import 사용: `import { IconCheck } from '@tabler/icons-react'`

```tsx
// 금지: 전체 import
import * as Icons from '@tabler/icons-react';

// 권장: 개별 import
import { IconCheck, IconX } from '@tabler/icons-react';
```

#### 이미지 최적화

- 모든 이미지는 `next/image` 컴포넌트를 사용한다
- 외부 이미지 도메인은 `next.config.ts`의 `images.remotePatterns`에 등록
- 아바타, 썸네일 등 크기가 고정된 이미지는 `width`/`height`를 명시
- LCP(Largest Contentful Paint) 대상 이미지에는 `priority` 속성 추가

```tsx
import Image from 'next/image';

<Image
  src={project.thumbnail}
  alt={project.name}
  width={320}
  height={180}
  className="rounded-radius-md"
/>
```

#### 번들 분석 도구

`@next/bundle-analyzer`로 번들 크기를 주기적으로 확인한다.

```bash
# 번들 분석 실행
ANALYZE=true npm run build
```

- Sprint마다 번들 분석 1회 이상 실행
- 100KB 이상의 청크가 새로 생기면 원인을 파악하고 분할 검토

### 7.6 보안 가이드라인 요약

#### OAuth 2.0 토큰 관리

- Access Token: 서버 메모리 또는 암호화된 DB에만 저장
- Refresh Token: AES-256-GCM 암호화하여 DB 저장
- 절대 금지: localStorage, sessionStorage, 쿠키(httpOnly 아닌), URL 파라미터, 클라이언트 번들
- Access Token 만료 전 자동 갱신 (만료 5분 전)
- 로그아웃 시 모든 서비스 토큰 즉시 폐기

**OAuth scope 최소화:**

| 서비스 | scope |
|--------|-------|
| Gmail | `gmail.readonly` + `gmail.compose` |
| Calendar | `calendar.readonly` + `calendar.events` |
| Drive | `drive.readonly` (쓰기 필요 시 `drive.file`만) |
| Notion | `read_content` + `update_content` |
| Slack | `channels:read` + `chat:write` + `users:read` |

#### API 키 관리

- 모든 API 키, client secret은 환경변수로만 관리
- `NEXT_PUBLIC_` 접두사 변수에 비밀 값 금지
- 클라이언트에서 외부 API 직접 호출 금지
- 모든 외부 API 호출은 Next.js API Route 또는 Server Action 경유

#### CORS

- `Access-Control-Allow-Origin: *` 절대 사용 금지
- 허용 도메인을 환경변수로 명시적 지정
- credentials 포함 요청은 반드시 특정 origin 지정

#### XSS 방지

- React는 기본적으로 JSX 내 텍스트를 이스케이프하므로 안전
- `dangerouslySetInnerHTML` 사용 시 반드시 DOMPurify 적용
- 모든 사용자 입력은 서버에서 검증 (zod 권장)

```typescript
import { z } from 'zod';

const TaskCreateSchema = z.object({
  title: z.string().min(1).max(200).trim(),
  description: z.string().max(2000).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  assignee_user_id: z.string().uuid().optional(),
  due_at: z.string().datetime().optional(),
});
```

#### 보안 헤더

```typescript
// next.config.ts에 반드시 포함
{
  key: 'X-Frame-Options', value: 'DENY',
  key: 'X-Content-Type-Options', value: 'nosniff',
  key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin',
  key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload',
  key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()',
}
```

#### Rate Limiting

- 인증된 사용자: 분당 100 요청
- 미인증 요청: 분당 20 요청
- 동기화 엔드포인트: 분당 10 요청 (외부 API quota 보호)

#### RBAC 접근 제어

| 행동 | Admin | Manager | Member |
|------|-------|---------|--------|
| 견적 최종 승인 | O | X | X |
| 프로젝트 상태 변경 | O | O | X |
| 할 일 수정 | O | O | 담당자만 |
| 발송 상태 변경 | O | O | X |
| 연결 설정 변경 | O | X | X |

**원칙:** 클라이언트에서 UI 숨김은 보안 수단이 아니다. 서버에서 반드시 검증.

### 7.7 RGPD 핵심 규칙

- **데이터 최소화:** 각 서비스에서 필요한 메타데이터만 동기화. 원문은 원본 서비스에 유지.
- **삭제 권리:** 사용자 삭제 요청 시 30일 이내 모든 관련 데이터 완전 삭제.
- **데이터 이동권:** 사용자 데이터를 JSON 형식으로 내보내기 기능 구현.
- **동의:** 최초 로그인 시 데이터 처리 범위 명시적 동의 수집. 각 외부 서비스 연결 시 별도 동의.
- **암호화:** 전송 중 TLS 1.2 이상. 저장 시 AES-256.
- **침해 대응:** 개인 데이터 침해 인지 시 72시간 이내 감독 기관에 통지.

---

## Part 8: Sprint 계획 & 체크리스트

### 8.1 Sprint 1: 기반

- 프로젝트 세팅
- 인증 (OAuth 2.0 + PKCE)
- 앱 셸 (AppShell, SidebarLayout, BottomNav)
- 홈 기본 구조 (8개 섹션 레이아웃)
- 프로젝트 목록 / 상세 기본형
- 할 일 CRUD
- 디자인 토큰 1차 세팅

### 8.2 Sprint 2: 확장

- 소통 화면 (메일 + 슬랙 통합 타임라인)
- 파일 화면 (카테고리별 + 최신본 표시)
- 상단 검색
- 팀 상태
- 홈 요약 로직 (데이터 집계)

### 8.3 Sprint 3: 심화

- 견적 관리 (생성, 수정, 발송)
- 견적 버전 관리
- 발송물 관리
- AI 요약 / 다음 행동 추천
- 막힌 일 감지

### 8.4 Sprint 4: 안정화

- 권한 정리 (RBAC 검증)
- 에러 처리 (에러 바운더리, 부분 에러)
- 성능 최적화 (가상화, 지연 로딩, 번들)
- QA
- 실제 운영 테스트

### 8.5 개발 시작 체크리스트

#### 제품

- [ ] 메뉴 구조 확정 (데스크탑 9개, 모바일 5+더보기)
- [ ] 홈 섹션 구조 확정 (8개 섹션)
- [ ] 상태값 확정 (Task, Project, Estimate, Shipment, Presence)
- [ ] 문구 원칙 확정 (일상어, 행동 먼저, 20자 이내)

#### 기술

- [ ] 프로젝트 저장소 생성
- [ ] 앱 기본 구조 생성 (App Router + [locale] 라우팅)
- [ ] DB 스키마 생성 (15개 엔티티)
- [ ] OAuth 연결 설계 (Google, Notion, Slack)
- [ ] 동기화 워커 설계
- [ ] 검색 인덱스 설계

#### 디자인 시스템

- [ ] 토큰 파일 생성 (`src/styles/tokens.css`)
- [ ] 공통 컴포넌트 목록 생성 (레이아웃 5 + 정보 9 + 입력 8)
- [ ] 상태 색상 규칙 생성 (danger, warning, info, success, accent)
- [ ] 텍스트 스타일 규칙 생성 (title, body, caption)

#### 데이터

- [ ] Project / Task / Message / FileAsset / Estimate / Shipment 시드 데이터 준비
- [ ] 개발용 더미 데이터 준비 (`src/lib/mock/`)

### 8.6 MVP 완료 기준 검증

| # | 기준 | 검증 방법 |
|---|------|----------|
| 1 | 홈에서 오늘의 상황을 10초 안에 파악 가능 | 사용자 테스트: 홈 진입 -> 상황 파악까지 시간 측정 |
| 2 | 홈에서 바로 할 일 처리 가능 | 할 일 상태 변경이 홈에서 가능한지 확인 |
| 3 | 프로젝트 상세에서 최신 맥락 확인 가능 | 8개 섹션 모두 데이터 표시 확인 |
| 4 | 파일 화면에서 최신본 위치 확인 가능 | `is_latest` 필터로 최신본 바로 찾기 확인 |
| 5 | 소통 화면에서 메일과 슬랙 흐름 파악 가능 | 통합 타임라인에 두 소스 모두 표시 확인 |
| 6 | 견적 초안 생성 및 상태 관리 가능 | CRUD + 상태 전환 흐름 확인 |
| 7 | 발송물 등록 및 추적 가능 | 등록 -> 상태 업데이트 흐름 확인 |
| 8 | 팀 상태 파악 가능 | 4가지 상태 + 프로젝트/할 일 수 표시 확인 |
| 9 | 검색으로 프로젝트, 파일, 메시지 바로 찾기 가능 | 통합 검색 300ms 이내 반응 확인 |
| 10 | 디자인을 갈아엎어도 기능 코드 대수술이 필요 없을 것 | 스킨 파일만 변경하여 다크모드 전환 테스트 |

### 8.7 개발팀 주의사항 7가지

1. **홈을 프로젝트 리스트로 만들지 말 것.** 홈은 운영 상황판이다.
2. **모든 화면을 데이터 출처 기준으로 나누지 말 것.** 의미 기준으로 나눈다.
3. **카드 하나에 너무 많은 텍스트를 넣지 말 것.**
4. **이미 끝난 일과 기다리는 일을 오늘 할 일에 섞지 말 것.**
5. **시각 표현에 상태 판단 로직을 박아넣지 말 것.** 로직과 스타일을 분리한다.
6. **문구를 보고서 말투로 쓰지 말 것.** 일상어를 쓴다.
7. **디자인 시스템 없이 바로 화면부터 찍지 말 것.** 토큰과 컴포넌트 목록이 먼저다.
