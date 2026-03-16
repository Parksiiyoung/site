# Bitnaneun Studio OS -- 보안 리뷰

> 작성일: 2026-03-16
> 작성자: El Paranoico (CSO, Alfred Dev)
> 대상: Bitnaneun Studio OS 개발 가이드 보안 가이드라인

---

## 1. 현재 의존성 감사

### 1.1 npm audit 결과

```
found 0 vulnerabilities
```

현재 의존성에서 알려진 CVE는 발견되지 않았다. 다만 이것은 현재 시점 기준이며, 외부 서비스 5개(Notion, Gmail, Calendar, Drive, Slack) 연동에 필요한 SDK/라이브러리가 아직 추가되지 않은 상태이므로, 추가 시 반드시 재감사가 필요하다.

### 1.2 현재 의존성 목록 및 평가

| 패키지 | 버전 | 용도 | 보안 참고사항 |
|--------|------|------|--------------|
| next | 16.1.6 | 프레임워크 | 최신 안정 버전. 양호. |
| react / react-dom | 19.2.3 | UI 라이브러리 | 최신 안정 버전. 양호. |
| next-intl | ^4.8.3 | 다국어 | 최신 안정 버전. 양호. |
| framer-motion | ^12.36.0 | 애니메이션 | 클라이언트 전용. 특이사항 없음. |
| jszip | ^3.10.1 | ZIP 생성 | 파일 처리 시 zip bomb 방어 필요. |
| file-saver | ^2.0.5 | 파일 다운로드 | 클라이언트 전용. 특이사항 없음. |

### 1.3 Studio OS 구현 시 추가될 의존성 예상 및 주의사항

외부 서비스 연동을 위해 아래 패키지 추가가 예상된다. 각각에 대한 보안 지침을 명시한다.

| 예상 패키지 | 용도 | 보안 지침 |
|------------|------|----------|
| googleapis / @google-cloud/* | Gmail, Calendar, Drive | OAuth 2.0 전용. 서비스 계정 키 파일을 절대 repo에 포함하지 않을 것. |
| @notionhq/client | Notion API | Integration token을 환경변수로만 관리. |
| @slack/web-api | Slack API | Bot token, signing secret을 환경변수로만 관리. |
| next-auth / auth.js | 인증 | CSRF 보호 내장 확인. callback URL 화이트리스트 필수. |
| DB 드라이버 (prisma 등) | 데이터 저장 | Parameterized query 강제. raw query 금지. |

**규칙: 의존성 추가 시 반드시 `npm audit`을 실행하고, 결과를 PR에 첨부할 것.**

---

## 2. 현재 코드 보안 분석

### 2.1 XSS 취약점 발견

- **위치:** `src/components/journal/ArticleView.tsx:98`
- **심각도:** 높음 (신뢰도: 90)
- **분류:** OWASP A03 -- Injection (XSS)
- **발견 내용:** `dangerouslySetInnerHTML={{ __html: block.content }}`로 videoEmbed 콘텐츠를 필터링 없이 DOM에 삽입하고 있다.
- **공격 벡터:** block.content에 악성 스크립트(`<script>`, `<img onerror=...>` 등)가 포함되면 사용자 브라우저에서 임의 코드 실행 가능.
- **영향:** 세션 탈취, 사용자 데이터 유출, 피싱.
- **해결 방안:**
  ```tsx
  // 1. DOMPurify 사용 (권장)
  import DOMPurify from 'dompurify';

  const ALLOWED_TAGS = ['iframe'];
  const ALLOWED_ATTR = ['src', 'width', 'height', 'frameborder', 'allowfullscreen', 'allow', 'title'];

  const sanitized = DOMPurify.sanitize(block.content, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
  });

  // 2. 또는 iframe src URL 화이트리스트 파싱 후 직접 렌더링
  // youtube.com, vimeo.com 등 허용 도메인만 통과
  ```

현재는 mock 데이터만 사용하므로 즉시 위험은 없지만, CMS나 외부 데이터 소스 연결 전에 반드시 수정해야 한다.

### 2.2 양호한 사항

- `.env` 파일이 repo에 없음 -- 양호
- 비밀키, API 토큰, 하드코딩된 인증 정보 없음 -- 양호
- `next.config.ts`에서 SVG에 대한 CSP 설정 적용됨 -- 양호
- `window.open`에 `noopener,noreferrer` 사용 -- 양호 (share.ts)
- 이미지 remote pattern이 특정 도메인으로 제한됨 -- 양호

---

## 3. 아키텍처 보안 가이드라인: 외부 서비스 5개 연동

### 3.1 OAuth 2.0 토큰 관리

이 앱은 Notion, Gmail, Google Calendar, Google Drive, Slack 총 5개 서비스와 연동한다. 모든 연동은 OAuth 2.0 기반이며, 토큰 관리가 보안의 핵심이다.

#### 필수 규칙

```
[저장]
- Access Token: 서버 메모리 또는 암호화된 DB에만 저장
- Refresh Token: 반드시 암호화(AES-256-GCM)하여 DB 저장
- 절대 금지: localStorage, sessionStorage, 쿠키(httpOnly 아닌), URL 파라미터, 클라이언트 번들

[갱신]
- Access Token 만료 전 자동 갱신 로직 구현 (만료 5분 전)
- Refresh Token 실패 시 사용자에게 재인증 요청 (자동 재시도 최대 1회)

[폐기]
- 사용자 로그아웃 시 모든 서비스의 토큰 즉시 폐기
- 사용자 삭제 시 모든 토큰 및 관련 데이터 완전 삭제
- 토큰 폐기 실패 시 로그 남기고 재시도 큐에 등록

[범위 최소화]
- Google: 각 서비스별 최소 scope만 요청
  - Gmail: gmail.readonly + gmail.compose (send 제외)
  - Calendar: calendar.readonly + calendar.events
  - Drive: drive.readonly (쓰기 필요 시 drive.file만)
- Notion: read_content + update_content (필요한 DB/페이지만)
- Slack: channels:read + chat:write + users:read
```

#### 서비스별 토큰 특성

| 서비스 | Access Token 유효기간 | Refresh Token | 특이사항 |
|--------|---------------------|---------------|---------|
| Google (Gmail/Cal/Drive) | 1시간 | 있음 (장기) | 3개 서비스 하나의 OAuth 앱으로 통합 가능. scope만 분리. |
| Notion | 무기한 (Integration Token) | 없음 | Internal integration은 고정 토큰. 환경변수 관리 필수. |
| Slack | Bot Token은 무기한 | 없음 | User Token은 갱신 필요. Bot Token 권장. signing secret으로 요청 검증. |

### 3.2 API 키 관리

```
[환경변수]
- 모든 API 키, client secret, signing secret은 환경변수로만 관리
- .env.local (로컬), 배포 환경의 secret manager (Vercel Env, AWS Secrets Manager 등)
- .env.example에는 키 이름만 기재, 값은 절대 포함하지 않음

[.gitignore 필수 포함]
.env
.env.local
.env.production
*.pem
*.key
service-account*.json

[클라이언트 노출 방지]
- NEXT_PUBLIC_ 접두사를 붙이는 변수에 비밀 값을 절대 넣지 않을 것
- 클라이언트에서 외부 API를 직접 호출하지 않을 것
- 모든 외부 API 호출은 Next.js API Route 또는 Server Action을 통해서만 수행
```

### 3.3 Webhook 보안 (Slack, Notion)

```
[수신 Webhook 검증]
- Slack: X-Slack-Signature 헤더와 signing secret으로 HMAC-SHA256 검증
- 타임스탬프 검증: 5분 이상 오래된 요청 거부 (replay attack 방지)

[발신 Webhook]
- HTTPS 전용
- 응답 타임아웃 3초 설정
- 실패 시 재시도 큐 (최대 3회, exponential backoff)
```

### 3.4 CORS 정책

```typescript
// next.config.ts headers 설정 예시
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: process.env.ALLOWED_ORIGIN || '' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
        { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        { key: 'Access-Control-Allow-Credentials', value: 'true' },
        // 절대 금지: { key: 'Access-Control-Allow-Origin', value: '*' }
      ],
    },
  ];
}
```

**규칙:**
- `Access-Control-Allow-Origin: *` 절대 사용 금지
- 허용 도메인을 환경변수로 명시적 지정
- credentials 포함 요청은 반드시 특정 origin 지정

### 3.5 보안 헤더

```typescript
// next.config.ts에 반드시 포함할 보안 헤더
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-XSS-Protection', value: '0' },  // 최신 브라우저에서는 CSP로 대체
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",  // Next.js 요구사항, 프로덕션에서 nonce 기반으로 전환
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' https://cdn.myportfolio.com data:",
            "font-src 'self' https://fonts.gstatic.com",
            "connect-src 'self' https://api.notion.com https://slack.com https://www.googleapis.com",
            "frame-src https://www.youtube.com https://player.vimeo.com",
          ].join('; '),
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ],
    },
  ];
}
```

### 3.6 Rate Limiting

```
[API 엔드포인트]
- 인증된 사용자: 분당 100 요청
- 미인증 요청: 분당 20 요청
- 동기화 엔드포인트: 분당 10 요청 (외부 API quota 보호 목적)

[구현]
- Vercel 배포 시: @vercel/edge-rate-limit 또는 Upstash Redis 기반
- 자체 서버 시: express-rate-limit + Redis store
- 429 응답에 Retry-After 헤더 포함
```

### 3.7 데이터 흐름 보안 아키텍처

```
[클라이언트] --(HTTPS)--> [Next.js Server / API Routes]
                                |
                     [인증 미들웨어 (세션 검증)]
                                |
                     [권한 검사 (RBAC: Admin/Manager/Member)]
                                |
                     [비즈니스 로직]
                                |
                 +------+-------+-------+-------+------+
                 |      |       |       |       |      |
              Notion  Gmail  Calendar  Drive   Slack   DB
              (토큰)  (OAuth) (OAuth)  (OAuth) (Bot)  (암호화)
```

**핵심 원칙:**
- 클라이언트는 절대 외부 서비스에 직접 접근하지 않는다
- 모든 외부 API 호출은 서버 사이드에서만 수행한다
- 각 서비스 커넥터는 독립된 모듈로 분리하고, 토큰 접근을 캡슐화한다

---

## 4. RGPD (GDPR) 준수 가이드라인

이 앱은 사용자 이름, 이메일, 메시지 본문, 일정 정보, 파일 메타데이터 등 개인 데이터를 처리한다. 스튜디오 내부용이라도 RGPD 의무는 동일하게 적용된다.

### 4.1 데이터 최소화 원칙 (제5조)

```
[수집 최소화]
- Gmail: 제목, 발신자, 수신자, 날짜, 중요도만 동기화. 본문은 요약만 저장하고 원문은 Gmail에 유지.
- Slack: 메시지 텍스트, 발신자, 채널, 타임스탬프만 동기화. 첨부파일은 링크만 저장.
- Calendar: 제목, 시간, 참석자만 동기화. 설명은 선택적.
- Drive: 파일명, 수정일, URL, 소유자만 동기화. 파일 내용은 저장하지 않음.
- Notion: 프로젝트/태스크 메타데이터만 동기화.

[저장 기한]
- 완료된 프로젝트 데이터: 1년 후 자동 아카이브
- 동기화 로그: 30일 후 자동 삭제
- 사용자 활동 로그: 90일 후 자동 삭제
```

### 4.2 사용자 권리 보장

```
[제17조 - 삭제 권리 (잊혀질 권리)]
- 사용자 삭제 요청 시 모든 관련 데이터 30일 이내 완전 삭제
- 삭제 대상: User 레코드, 관련 PresenceSnapshot, 할당된 Task의 assignee 필드 null 처리
- 외부 서비스(Gmail, Slack 등) 원본은 삭제 대상 아님 (원본은 해당 서비스에서 직접 관리)
- 삭제 실행 로그는 법적 요구사항으로 5년 보관

[제20조 - 데이터 이동권]
- 사용자 데이터를 JSON 형식으로 내보내기 기능 구현
- 포함: 프로필, 할 일 이력, 결정 기록, 활동 로그

[제7조 - 동의]
- 최초 로그인 시 데이터 처리 범위 명시적 동의 수집
- 각 외부 서비스 연결 시 별도 동의
- 동의 철회 시 해당 서비스 토큰 즉시 폐기 및 동기화 데이터 삭제
```

### 4.3 데이터 암호화 (제32조)

```
[전송 중 암호화]
- 모든 통신: TLS 1.2 이상 강제 (HSTS 설정)
- 내부 서비스 간 통신도 TLS 필수

[저장 시 암호화]
- DB: 디스크 수준 암호화 (AES-256)
- 민감 필드 (OAuth 토큰, 이메일 본문 요약): 앱 레벨 암호화 (AES-256-GCM)
- 암호화 키: 환경변수 또는 KMS로 관리. DB에 저장 금지.

[암호화 금지 사항]
- MD5, SHA1: 비밀번호나 토큰 해싱에 사용 금지
- ECB 모드: 사용 금지
- 하드코딩된 암호화 키: 절대 금지
```

### 4.4 침해 대응 (제33조)

```
[72시간 규칙]
- 개인 데이터 침해 인지 시 72시간 이내 감독 기관에 통지
- 통지 내용: 침해 성격, 영향받는 데이터 범주 및 규모, DPO 연락처, 예상 결과, 조치 사항

[대응 절차 템플릿]
1. 침해 탐지 및 범위 파악 (0-4시간)
2. 영향 평가 및 격리 (4-12시간)
3. 감독 기관 통지 준비 (12-48시간)
4. 통지 발송 (48-72시간 이내)
5. 피해 사용자 통지 (고위험 시 즉시)
6. 사후 보고서 작성 (30일 이내)
```

---

## 5. 개발 가이드에 포함할 보안 규칙 체크리스트

### 5.1 입력 검증 (OWASP A03)

```typescript
// 모든 사용자 입력은 적이다. 검증 후에만 신뢰한다.

// 1. API Route에서 입력 검증 (zod 권장)
import { z } from 'zod';

const TaskCreateSchema = z.object({
  title: z.string().min(1).max(200).trim(),
  description: z.string().max(2000).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  assignee_user_id: z.string().uuid().optional(),
  due_at: z.string().datetime().optional(),
});

// 2. HTML 출력 시 이스케이프
// React는 기본적으로 JSX 내 텍스트를 이스케이프하므로 안전
// 단, dangerouslySetInnerHTML 사용 시 반드시 DOMPurify 적용

// 3. SQL 쿼리: 항상 parameterized query
// prisma: 기본적으로 parameterized. raw query 시 Prisma.sql`` 템플릿 리터럴 사용.
// 절대 금지: `SELECT * FROM users WHERE id = '${userId}'`
```

### 5.2 인증 및 세션 관리 (OWASP A07)

```
[세션]
- httpOnly, secure, sameSite=strict 쿠키로 세션 관리
- 세션 유효기간: 최대 24시간 (활동 시 갱신)
- 비활동 타임아웃: 2시간
- 로그아웃 시 서버 사이드 세션 즉시 무효화

[인증]
- OAuth 2.0 + PKCE (Authorization Code Flow with PKCE)
- state 파라미터로 CSRF 방지
- callback URL 화이트리스트 엄격 적용
- 로그인 실패 시 구체적 오류 메시지 노출 금지 ("이메일 또는 비밀번호가 잘못되었습니다" 사용)
```

### 5.3 접근 제어 (OWASP A01)

```
[RBAC 규칙 - 스펙 섹션 23 기반]
- Admin: 전체 접근
- Manager: 프로젝트 상태 변경, 할 일 수정, 발송 상태 변경
- Member: 자신의 할 일 수정, 읽기 전용 접근

[구현 규칙]
- 모든 API 엔드포인트에 권한 미들웨어 적용 (인증 != 권한)
- 클라이언트에서 UI 숨김은 보안 수단이 아님. 서버에서 반드시 검증.
- IDOR 방지: /api/tasks/123 접근 시 해당 task의 프로젝트 소속 여부 + 사용자 권한 확인
```

### 5.4 로깅 보안 (OWASP A09)

```
[로그에 포함할 것]
- 인증 이벤트 (로그인, 로그아웃, 실패)
- 권한 변경
- 데이터 삭제 작업
- 외부 서비스 동기화 성공/실패
- 비정상 접근 패턴

[로그에 절대 포함하지 않을 것]
- OAuth 토큰 (access, refresh 모두)
- 이메일 본문
- 사용자 비밀번호
- API 키
- 세션 ID 전체 (마지막 4자리만 허용)
- 개인 연락처 정보
```

### 5.5 동기화 보안

```
[외부 API 호출]
- 모든 호출에 타임아웃 설정 (기본 10초, 파일 관련 30초)
- 응답 크기 제한 (기본 5MB)
- 외부 서비스 장애 시 circuit breaker 패턴 적용
- 동기화 데이터 무결성 검증 (last_synced_at 비교)

[SSRF 방지 (OWASP A10)]
- 사용자 입력 URL을 서버가 요청하는 경우: 허용 도메인 화이트리스트만 통과
- 내부 네트워크 주소 (127.0.0.1, 10.x, 192.168.x, 169.254.x) 차단
- canonical_url 필드: 저장 시 URL 형식 + 도메인 검증
```

### 5.6 파일 처리 보안

```
[jszip 사용 시 (다운로드 기능)]
- 압축 해제 대상 파일 크기 제한 (단일 파일 50MB, 전체 200MB)
- zip bomb 방지: 압축비 10:1 초과 시 거부
- 파일 이름 검증: path traversal 문자열 (../, ..\) 필터링

[이미지 업로드 (향후)]
- MIME 타입 + magic bytes 이중 검증
- 파일 확장자 화이트리스트 (jpg, png, webp, pdf)
- 최대 파일 크기 제한 (10MB)
- 업로드 후 파일명 재생성 (UUID)
```

---

## 6. 환경별 보안 설정

### 6.1 .env.example 템플릿

```env
# ===== 이 파일에 실제 값을 넣지 마세요 =====

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

# AI (요약/추천)
AI_API_KEY=
```

### 6.2 개발/스테이징/프로덕션 분리

| 항목 | 개발 | 스테이징 | 프로덕션 |
|------|------|---------|---------|
| 디버그 모드 | 허용 | 금지 | 금지 |
| 소스맵 노출 | 허용 | 금지 | 금지 |
| 에러 상세 응답 | 허용 | 금지 | 금지 |
| HTTPS | 선택 | 필수 | 필수 |
| HSTS | 불필요 | 활성화 | 활성화 |
| Rate Limiting | 완화 | 적용 | 적용 |
| CSP | report-only | 적용 | 적용 |

---

## 7. pre-commit 보안 훅 권장 설정

```json
// package.json에 추가
{
  "scripts": {
    "secret-scan": "npx secretlint '**/*'"
  }
}
```

```
# .secretlintrc.json
{
  "rules": [
    { "id": "@secretlint/secretlint-rule-preset-recommend" }
  ]
}
```

비밀 값 패턴 (최소한 이것들은 잡아야 한다):
- `AKIA[0-9A-Z]{16}` -- AWS Access Key
- `xoxb-`, `xoxp-`, `xoxo-` -- Slack Token
- `sk-[a-zA-Z0-9]{48}` -- OpenAI Key
- `secret_[a-zA-Z0-9]{43}` -- Notion Integration Token
- `ya29\.` -- Google OAuth Access Token
- `AIza[0-9A-Za-z-_]{35}` -- Google API Key

---

## 8. 보안 리뷰 요약

### 현재 상태 (포트폴리오 사이트)

| 항목 | 상태 | 비고 |
|------|------|------|
| 의존성 CVE | 통과 | 0건 발견 |
| 하드코딩된 비밀 | 통과 | 발견 안 됨 |
| XSS 위험 | 주의 | ArticleView.tsx:98 dangerouslySetInnerHTML. mock 데이터 전용이므로 현재 위험 낮음. 외부 데이터 연결 전 수정 필수. |
| 보안 헤더 | 미설정 | next.config.ts에 이미지 CSP만 있고 전체 보안 헤더 없음 |

### Studio OS 구현 전 필수 조치

| 우선순위 | 조치 | 이유 |
|---------|------|------|
| P0 (구현 전) | .env 관리 체계 수립 + .gitignore 확인 | 토큰 유출은 복구 불가능 |
| P0 (구현 전) | 보안 헤더 설정 (CSP, HSTS, X-Frame-Options 등) | 기본 방어층 |
| P0 (구현 전) | dangerouslySetInnerHTML에 DOMPurify 적용 | XSS 방지 |
| P1 (Sprint 1) | OAuth 2.0 + PKCE 인증 구현 | 인증이 모든 보안의 기반 |
| P1 (Sprint 1) | RBAC 미들웨어 구현 | 접근 제어 |
| P1 (Sprint 1) | 입력 검증 라이브러리(zod) 도입 | Injection 방지 |
| P2 (Sprint 2) | Rate Limiting 구현 | DoS 방지 |
| P2 (Sprint 2) | 보안 로깅 체계 구축 | 침해 탐지 |
| P3 (Sprint 3) | RGPD 동의 관리 + 데이터 삭제/내보내기 | 법적 의무 |
| P3 (Sprint 4) | 침투 테스트 | 최종 검증 |

---

## 9. VEREDICTO (보안 판정)

**판정: 조건부 승인 (APROBADO CON CONDICIONES)**

**요약:** 현재 코드베이스(포트폴리오 사이트)에는 차단이 필요한 치명적 취약점이 없다. 의존성에 CVE가 없고, 비밀키 유출도 없다. 다만 Studio OS 기능 구현 시 반드시 이 문서의 가이드라인을 적용해야 한다.

**차단 사항:** 없음 (현재 단계 기준)

**조건부 사항:**
1. `ArticleView.tsx`의 `dangerouslySetInnerHTML`에 외부 데이터 연결 전 반드시 sanitizer 적용
2. Studio OS 구현 시작 전 보안 헤더 설정 완료
3. 외부 서비스 연동 SDK 추가 시 `npm audit` 재실행 및 결과 문서화
4. OAuth 토큰 관리 체계를 Sprint 1에서 최우선 구현

**다음 조치:** 이 문서를 개발 가이드에 통합하고, Sprint 1 시작 시 P0 항목부터 적용할 것.
