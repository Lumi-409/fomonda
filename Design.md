# Design.md — Fomonda (포모다)

> "내 투자 판단이 흔들린다면, 지금 메타인지를 가동하세요"

**출처:** Figma `JYJ` 파일 — `screen/onboarding`(node 241:1168), `screen/result`(node 234:308) 2개 화면 실측
**테마:** 라이트 (화이트 배경 + 다크 네이비 포인트 + 핑크/퍼플 파스텔 워시)

이 문서의 모든 값은 위 두 화면에서 실제로 사용된 컬러/타이포/스페이싱을 그대로 옮긴 것입니다. 두 화면에 없는 컴포넌트(입력창, 리스트 아이템 등)는 이 문서에서 제외했으며, 추가 화면을 Figma에서 확인하는 대로 갱신합니다.

---

## 1. 브랜드 & 폰트

| 용도 | 폰트 | 웨이트 | 비고 |
|------|------|--------|------|
| 로고 워드마크("Fomonda") | Paperlogy | 7 Bold (700) | 로고 전용 — 본문/헤딩에는 사용 금지, `font-weight 700` 규칙의 유일한 예외 |
| 그 외 전체 텍스트 | Pretendard | 500(Medium) / 600(SemiBold) | Google Fonts CDN으로 로드 |

**구현 참고:** Pretendard는 Google Fonts 공식 카탈로그에는 없으므로, Google Fonts 스타일로 서빙하는 CDN(예: `fonts.googleapis.com` 프록시 또는 jsDelivr Pretendard 웹폰트)을 사용해 동일하게 로드합니다. Paperlogy도 별도 웹폰트 CDN이 필요합니다(로고 노드에만 적용).

---

## 2. 컬러 토큰

### Gray Scale

| Name | Value | Token | 역할 |
|------|-------|-------|------|
| Gray 50 | `#f9f9fa` | `--color-gray-50` | 카드/필 배경(비선택), 결과 상세 섹션 배경 |
| Gray 100 | `#f3f2f8` | `--color-gray-100` | Ghost 버튼 배경 |
| Gray 200 | `#e3e2e9` | `--color-gray-200` | 카드 보더 |
| Gray 400 | `#aeaebe` | `--color-gray-400` | 질문 카드 "Q1." 라벨, placeholder |
| Gray 500 | `#8e8e9e` | `--color-gray-500` | 섹션 서브텍스트(eyebrow) |
| Gray 600 | `#78788b` | `--color-gray-600` | 비선택 탭 텍스트 |
| Gray 700 | `#585869` | `--color-gray-700` | 본문/설명 텍스트, Ghost 버튼 텍스트 |
| Gray 800 | `#3a3a50` | `--color-gray-800` | 강조 라벨, 선택된 탭 배경, 리스트 아이템 텍스트 |
| Gray 900 | `#231f3a` | `--color-gray-900` | 헤딩, 로고 컬러, 섹션 타이틀 |
| Gray 950 | `#1a1a2e` | `--color-gray-950` | 온보딩 헤드라인(가장 진한 텍스트) |

**순수 검정(`#000000`) 대신 항상 Gray 900/950을 사용합니다.**

### Sub Colors

| Name | Value | Token | 역할 |
|------|-------|-------|------|
| Pink 300 | `#ffb3e0` | `--color-pink-300` | 강조 그라데이션 시작색, 브레인 이모지 아이콘 밑색 |
| Pink 500 | `#f472b6` | `--color-pink-500` | 브레인 이모지 아이콘 메인 색 |
| Pink 700 | `#be3a8a` | `--color-pink-700` | 브레인 이모지 아이콘 음영색 |
| Purple 500 | `#8b7cf6` | `--color-purple-500` | 종목 검색 결과에서 검색어와 일치하는 부분 강조 |
| Purple 700 | `#5b47d4` | `--color-purple-700` | 강조 그라데이션 끝색, "약한 근거" 이모지 아이콘 색 |
| Green 500 | `#3dcb5a` | `--color-green-500` | 온보딩 "새싹" 이모지 아이콘 전용 색 — 노드 단위 아이콘 SVG를 직접 추출하고서야 발견됨(변수 바인딩이 아니라 하드코딩된 fill이라 초기 `get_variable_defs` 조사에서는 잡히지 않았음) |

**Green 500 관련 예외 처리:** 이 컬러는 시세/판단 관련 UI(가격, 손익, 배지 등)에는 절대 사용하지 않는다는 원칙은 그대로 유지한다. 단, "성장·인사이트"를 상징하는 새싹 이모지 일러스트 1곳에 한해 Figma 원본 그대로 사용을 허용한다 — 급등락/시세 연상이 아니라 식물 이모지의 관용적 색상이기 때문.

**아이콘 자산 원칙:** 온보딩/결과 화면의 아이콘은 모노크롬 라인 아이콘이 아니라 Figma에서 노드 단위로 추출한 풀컬러 커스텀 이모지 일러스트다(예: 브레인, 씽킹페이스, 새싹, 돋보기, 포인트). 새 아이콘이 필요하면 임의로 그리지 말고 반드시 해당 Figma 노드를 SVG로 추출해 그대로 사용한다.

> Yellow 계열은 온보딩/결과 두 화면 어디에도 바인딩된 노드가 없어 Figma API가 반환하지 않았습니다 — 값을 임의로 추정해 적지 않았습니다. 다른 화면에서 실제 사용처를 확인하는 대로 추가합니다.

### 그라데이션

| Name | Value | Token | 역할 |
|------|-------|-------|------|
| Gradient / btn | `linear-gradient(180deg, #2e2a47 0%, #231f3a 100%)` | `--gradient-btn` | Primary 버튼 배경 |
| Gradient / calm-subtle | `linear-gradient(180deg, rgba(255,240,250,0.4) 0%, rgba(242,240,255,0.4) 100%)` | `--gradient-calm-subtle` | 결과 화면 판단 요약 카드 배경 워시 |
| Gradient / calm (accent) | `linear-gradient(-90deg, #ffafe1 0%, #6e53ff 100%)` | `--gradient-calm-accent` | "판단을 요약했어요" 라벨 텍스트 그라데이션(강조 포인트) |

> Figma 변수 API가 그라데이션 stop 값을 직접 반환하지 않아, 두 화면에 실제 렌더된 CSS에서 역산한 값입니다.

### 사용 금지 컬러

| 컬러 | 이유 |
|------|------|
| 빨강 계열 | 급락/손실 연상, FOMO 자극 — 두 화면 어디에도 사용되지 않음 |
| 초록 계열(UI 전반) | 급등/수익 연상 — 가격·판단 관련 요소에는 배제. 단, 새싹 이모지 일러스트(`green-500`) 1곳은 예외 |
| 순수 검정 `#000000` | Gray 900(`#231f3a`)/Gray 950(`#1a1a2e`) 사용 |

---

## 3. 타이포그래피

letter-spacing은 전 스타일 `0` (트래킹 없음).

| Style | 폰트 | 굵기 | Size | Line Height | Token | 용도 |
|-------|------|------|------|-------------|-------|------|
| logo | Paperlogy 7 Bold | 700 | 40px | 1 | `--text-logo` | "Fomonda" 워드마크 전용 |
| heading-sub | Pretendard SemiBold | 600 | 20px | 1.4 | `--text-heading-sub` | 결과 화면 히어로 헤드라인 |
| label-lg | Pretendard SemiBold | 600 | 20px | 1 (한 줄 전용) | `--text-label-lg` | 버튼 텍스트 |
| label | Pretendard SemiBold | 600 | 16px | 1.4 | `--text-label` | 섹션 타이틀("약한 근거", "스스로 점검할 질문" 등) |
| label-m | Pretendard SemiBold | 600 | 14px | 1.4 | `--text-label-m` | 탭 필 텍스트, 리스트 아이템 주장문 |
| label-sm | Pretendard Medium | 500 | 14px | 1.4 | `--text-label-sm` | 온보딩 기능 카드 텍스트, 질문 본문 |
| body-lg | Pretendard Medium | 500 | 18px | 1 (한 줄 전용) | `--text-body-lg` | 온보딩 태그라인 |
| eyebrow | Pretendard Medium | 500 | 12px | 1.4 | `--text-eyebrow` | 섹션 서브텍스트, 리스트 아이템 부연 설명 |

**폰트 웨이트 원칙:** 로고(Paperlogy 700) 외에는 500/600만 사용. 헤딩에도 700 이상 절대 금지 — 무게감보다 색/여백으로 위계를 만든다. 12px(`eyebrow`)가 두 화면에서 관찰된 최소 텍스트 크기.

---

## 4. 스페이싱 시스템

**Base unit:** 4px

| Name | Value | Token | 관찰된 용도 |
|------|-------|-------|-------------|
| xs | 4px | `--spacing-xs` | 탑바 아이콘 히트 영역 padding |
| sm | 8px | `--spacing-sm` | 탭 간 gap, 아이콘-텍스트 gap, 리스트 아이템 내부 gap |
| md | 12px | `--spacing-md` | 요약 카드 내부 블록 gap |
| lg | 16px | `--spacing-lg` | 카드 padding, 기능 카드 gap, 상세 섹션 간 gap, 하단 버튼 영역 좌우 padding |
| xl | 20px | `--spacing-xl` | 카드 padding, 버튼 세로 padding |
| 2xl | 24px | `--spacing-2xl` | 버튼 가로 padding, 탑바 padding |
| 3xl | 36px | `--spacing-3xl` | 온보딩 브랜드 블록(로고+태그라인) 내부 gap |
| 4xl | 48px | `--spacing-4xl` | 온보딩 화면 하단 padding |
| 6xl | 84px | `--spacing-6xl` | 온보딩 히어로 ↔ 기능 카드 섹션 간 대형 여백 |

결과 화면 하단 버튼 2개 사이 gap은 `12px`(`--spacing-md`)로 4px 그리드에 맞춰 수정.

---

## 5. Border Radius

| Element | Value | Token |
|---------|-------|-------|
| 버튼 (Primary/Ghost) | 16px | `--radius-button` |
| 카드 (기능 카드, 요약 카드) | 16px | `--radius-card` |
| 질문 카드(Q1/Q2, 작은 카드) | 8px | `--radius-card-sm` |
| 뱃지 (보유/관심, N회 점검, 종목명 뱃지 등) | 8px | `--radius-badge` |
| 탭 필 (결과 화면 4개 탭) | 9999px | `--radius-pill` |
| 검색/텍스트 입력창 | 16px | `--radius-input` |

> 입력창 radius는 직접 제작한 검색/이유입력 화면 캡처(픽셀 실측)로 12px까지 갔다가, 화면별 정밀 조정 단계에서 검색/이유입력/피드백 입력창 모두 16px로 재확정.
> 뱃지는 원래 `--radius-badge: 9999px`(완전 pill) 하나로 통일돼 있었으나, 결과 화면 탭 필만 pill로 남기고 나머지 뱃지류는 8px로 분리했다. 종목 아바타(원형 이니셜)는 뱃지가 아니라 Tailwind 기본 `rounded-full`을 사용해 `--radius-badge` 값과 무관하게 항상 완전한 원을 유지한다.

---

## 6. 그림자 (Elevation)

| Name | Value | Token | 관찰 위치 |
|------|-------|-------|-----------|
| card | `rgba(35,31,58,0.04) 0px 0px 0px, rgba(35,31,58,0.06) 0px 2px 4px, rgba(35,31,58,0.08) 0px 8px 12px` | `--shadow-card` | 온보딩 기능 카드 |
| modal | `rgba(35,31,58,0.08) 0px 8px 24px, rgba(35,31,58,0.06) 0px 2px 8px, rgba(35,31,58,0.04) 0px 0px 0px 1px` | `--shadow-modal` | Figma 명명 스타일 `Fomonda/Shadow/Modal` (결과 화면 요약 카드는 그림자 대신 `gray-200` 1px 보더 사용) |

**그림자 원칙:**
- 결과 화면 요약 카드처럼 그라데이션 배경 카드는 그림자 대신 1px 보더(`gray-200`)만 사용
- 결과 화면 상세 섹션(약한 근거/자료/질문)은 그림자·보더 없이 `gray-50` 배경 위 흰 카드로만 구분 — 카드 사이 gap(16px) 자체가 구분선 역할

---

## 7. 컴포넌트

### 버튼

| 종류 | 배경 | 텍스트 | 크기/여백 | 사용처 |
|------|------|--------|-----------|--------|
| Primary | `--gradient-btn` | Gray 50 (`#f9f9fa`) | radius 16, `px-20 py-16`, `label`(16px) | 온보딩 "시작하기", 결과 "리스트 확인" |
| Secondary(서브 버튼) | Gray 100 (`#f3f2f8`) | Gray 700 (`#585869`) | radius 16, `px-20 py-16`, `label`(16px) — Primary와 크기/radius 동일, 배경만 다름 | 결과 "다시 점검하기" (Primary와 짝을 이루는 하단 2-버튼 조합 전용) |
| Ghost | 배경 없음(투명) | Gray 700 (`#585869`) | radius 8, 1px 보더 Gray 200(`#e3e2e9`), `px-16 py-8`, `label`(16px) | 현재 미사용 — 리스트 "종목 추가하기"는 §13에서 아이콘+텍스트 미니멀 스타일로 교체됨. `components/primary-button.tsx`의 `ghost` variant 자체는 유지 |

> **Secondary vs Ghost 구분 주의:** 둘 다 회색조 서브 버튼이지만 서로 다른 Figma 컴포넌트다. Secondary는 결과 화면 하단 2-버튼(Primary+Secondary) 조합에서만 쓰이고 Primary와 radius/padding을 공유한다. Ghost는 완전히 별도 컴포넌트로, 단독으로 쓰이며 투명 배경+보더+radius 8의 작은 아웃라인 버튼이다. 처음에 이 둘을 혼동해 결과 화면에 Ghost를 잘못 적용했던 적이 있다.

**Ghost 버튼 확정 스펙 (Figma "Copy as CSS"로 직접 전달받음):**
```
box-sizing: border-box;
display: flex; flex-direction: row; justify-content: center; align-items: center;
padding: 8px 16px;
gap: 10px;
border: 1px solid #E3E2E9; /* Gray 200 */
border-radius: 8px;
```
Primary와 달리 배경 채움이 없는 아웃라인 버튼이며, radius(8px)·padding(8/16px)도 Primary(16px radius, 20/16px padding)와 다르다 — 두 변형은 여백/radius를 공유하지 않는다.

> hover/disabled 상태는 Figma에 명시되어 있지 않아 구현 관행값(hover: 옅은 gray-50 배경, disabled: gray-100 보더 + gray-300 텍스트)을 사용 중입니다.
> **버튼 텍스트/여백 조정:** Figma 원본은 텍스트 `label-lg`(20px)이지만, 다른 텍스트 스타일 대비 지나치게 크다는 피드백에 따라 구현에서는 `label`(16px)로 낮췄습니다. Primary 버튼 padding도 같은 이유로 Figma 원본(`px-24 py-20`) 대신 `px-20 py-16`을 사용합니다.

### 탭 필 (스크롤 탭)

| 상태 | 배경 | 텍스트 | 크기 |
|------|------|--------|------|
| 선택 | Gray 800 (`#3a3a50`) | Gray 50 (`#f9f9fa`) | radius 9999, `px-16 py-8`, `label`(16 SemiBold) |
| 비선택 | Gray 50 (`#f9f9fa`) | Gray 600 (`#78788b`) | 동일 |

결과 화면 탭 라벨(4개, 좌→우): **점검 요약 · 약한 근거 · 객관적 자료 · 셀프 체크 질문** — 각 탭은 해당 상세 섹션으로 스크롤 이동하는 앵커 역할.

### 질문 카드 (Q1 / Q2)

- 배경 Gray 50, radius 8, padding 16
- 좌측 라벨("Q1.", "Q2.") — `label-m`(SemiBold 14), Gray 400, 고정 너비 32px
- 우측 본문 — `label-sm`(Medium 14), Gray 700

### 상단 바(TopBar)

| 타입 | 구성 | 사용처 |
|------|------|--------|
| none | 탑바 없음, 콘텐츠가 화면 최상단부터 시작 | 온보딩 |
| step | 높이 52px, `padding 16px`(상하좌우), `gap 16px`. 뒤로가기 아이콘(24×24 컨테이너, 16×16 SVG) + 진행바(flex-1) + 진행 카운트 | 검색/보유여부/이유입력 (`StepTopBar`) |
| back | 높이 52px, `padding 16px`(상하좌우). 뒤로가기 아이콘만 단독(24×24 컨테이너) | 종목별 판단 타임라인, 판단 기록 상세 (`BackTopBar`) |
| close | 높이 52px, `padding 16px`(상하좌우), 우측 정렬 X 아이콘(24×24 컨테이너, 16×16 SVG) 단독 | 결과 |

**뒤로가기 아이콘:** 모든 화면 공통으로 아래 SVG 사용(24×24 히트 영역, 16×16 실제 아이콘, Gray 900 `currentColor`).
```svg
<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M8 1L1 8L8 15M1 8H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

**진행 카운트(`step`/`totalSteps`):** 숫자와 슬래시를 각각 별도 span으로 분리해 `gap 2px`로 배치. 현재 페이지 숫자만 Gray 900, 나머지("/"와 totalSteps)는 Gray 500 — 예: `<span class="text-gray-900">1</span><span>/</span><span>4</span>`.

### 하단 버튼 영역

컨테이너 padding: `px-16 pt-16 pb-24`, full width.

| 화면 | 구성 |
|------|------|
| 온보딩 | Primary 버튼 1개, full width |
| 결과 | Ghost + Primary 2개, `gap-12`, 각 `flex-1` |

---

## 8. 화면 구조 — 온보딩

배경은 흰색(Canvas), 탑바 없음. 전체 섹션 좌우 padding 40px, 세 섹션(브랜드 블록/기능 카드/CTA 버튼) 사이 gap은 모두 48px로 균일.

```
1. 브랜드 블록 (gap 24px)
   - 로고: 장식 심볼(스와시, `IconSwooshGradient`, 46×34px 고정 — 로딩 화면과 동일한 gradient-calm-accent 채움), 워드마크 대비 `translate-x: 24px` 오른쪽으로 이동해 "Fomonda"의 "on" 위에 오도록 배치 + "Fomonda" 워드마크(Paperlogy 700, 40px, Gray 900)
   - 태그라인 2줄(body-lg, Gray 950, center):
     "내 투자 판단이 흔들린다면"
     "지금 메타인지를 가동하세요"

   ↕ 48px

2. 기능 카드 (흰 배경, radius 16, shadow-card, padding 20, gap 16, `w-full min-w-[292px]` — CTA 버튼과 동일한 폭)
   - 3개 항목, 각 아이콘(16px 커스텀 이모지 일러스트) + label-sm 텍스트(Gray 800)
     · 판단 뒤에 숨은 진짜 이유를 관찰해요
     · 흔들린 순간들이 나만의 인사이트가 돼요
     · 근거 있는 투자 판단의 힘을 키워요

   ↕ 48px

3. 하단 CTA — Primary 버튼 "시작하기" (`min-w-[292px]`, 기능 카드와 동일한 폭). 온보딩 화면에서만 하단 sticky 없이 일반 흐름(스크롤 시 같이 움직임)으로 배치 — 다른 화면의 하단 버튼 영역(sticky)과 다른 예외 케이스
```

**Ambient Glow (구현 단계 추가 효과):** 온보딩과 "메타인지 가동 중" 로딩 화면 배경에, 크게 blur 처리된 원형 2개(Pink 300 opacity 40%, Purple 700 opacity 20%, `blur-3xl`)가 8~12초 주기로 서서히 위치·크기를 오가며 루프한다(`animate-drift-a` 10s, `animate-drift-b` 12s, 둘 다 ease-in-out). 벽에 비친 조명이 천천히 움직이는 느낌으로, 콘텐츠 위계를 해치지 않는 선에서만 사용한다. 구현체: `components/ambient-glow.tsx`.
> **구현 주의:** 배경 글로우는 `-z-10` + `overflow-hidden` 조합으로 컨텐츠 뒤에 깔리는데, 부모 컨테이너가 `position: relative`만 있고 `isolate`(또는 z-index가 auto가 아닌 값)가 없으면 새로운 stacking context가 안 생겨 글로우가 문서 루트 레벨로 새어나가 아예 안 보이는 버그가 생긴다. 반드시 `relative isolate` 조합으로 컨테이너를 감싸야 한다.

---

## 9. 화면 구조 — 결과 (정보 위계)

배경은 흰색(히어로 영역) → Gray 50(상세 섹션 영역). 탑바는 `close` 타입.

```
[TopBar: close]

1. 히어로 (px-16, pb-16)
   - 헤드라인 2줄(heading-sub, Gray 950):
     "{근거수}개의 약한 근거가 있어요"
     "점검 결과를 확인해보세요"
   - 탭바: 점검 요약 / 약한 근거 / 객관적 자료 / 셀프 체크 질문 (4개, 스크롤 앵커 — 라벨은 직접 제작한 화면 캡처 기준으로 원래 긴 버전으로 되돌림)
   - 판단 요약 카드 (gradient-calm-subtle 배경, 1px Gray 200 보더, radius 16, padding 20)
     · 타이틀: 체크 아이콘 + "판단을 요약했어요" (그라데이션 텍스트, label-m)
     · 헤드라인 2줄(label-m, Gray 800)
     · 설명 문단(label-sm, Gray 700) — 실제 AI 응답 summary 바인딩

2. 상세 섹션 (Gray 50 배경, 흰 카드 3개, gap 16, padding 20 각)
   a. 약한 근거 {근거수}개 — 아이콘❗ + label(Gray 900)
      리스트 아이템(반복, {근거수}만큼): 불릿 주장(label-m, Gray 800) + 들여쓴 설명(eyebrow, Gray 700)
      → {근거}, {근거수} placeholder는 실제 weak_points 응답 데이터로 바인딩

   b. 메타인지 가동 자료(객관적 자료) — 아이콘🧠 + label + 서브텍스트(eyebrow, Gray 500)
      동일한 리스트 아이템 포맷 → newsConnection/객관적 자료 데이터 바인딩

   c. 스스로 점검할 질문 — 아이콘🤔 + label + 서브텍스트(eyebrow, Gray 500)
      Q1, Q2(, Q3) 질문 카드 → checkQuestions 배열 바인딩

[하단: Secondary "다시 점검하기" + Primary "리스트 확인"]
```

**정보 위계 원칙 (관찰 기반):**
- 판단 요약은 유일하게 그라데이션 배경 + 보더로 시각적 우선순위를 갖는다 — 나머지 3개 상세 섹션은 흰 카드로 동일한 무게를 갖되, Gray 50 배경 위에 나열되어 요약 카드보다는 한 단계 낮은 위계로 읽힌다
- 4개 탭은 균등한 접근성을 제공하지만(스크롤 앵커), 화면 진입 시 항상 "요약"이 최상단에 먼저 보이도록 순서를 고정한다
- 뉴스/객관적 자료 섹션은 "판단을 비판" 하는 톤이 아니라 "메타인지 가동 자료"라는 중립적 이름을 사용한다

---

## 10. AI 응답 톤 가이드

이 섹션은 AI 프롬프트 파일에도 반드시 반영되어야 한다. (Figma 시각 디자인과 무관하게 유지되는 규칙)

### 핵심 원칙
- 판단을 대신하지 않는다 — 관찰자처럼 묻는다
- 사용자를 비판하거나 감정을 자극하지 않는다
- "~하세요" 지시형 표현 절대 금지
- 매수/매도 추천 절대 금지

### 허용 어휘 패턴
- "~일 수도 있어요"
- "이 부분은 다시 한번 생각해볼 만해요"
- "혹시 ~을 고려해보셨나요?"
- "~처럼 느껴질 수 있어요"

### 금지 어휘 패턴
- "~하세요", "~해야 합니다"
- "잘못된 판단입니다"
- "지금 당장 ~하세요"
- "손실이 날 수 있습니다" (공포 유발)
- "이 종목은 ~입니다" (단정형)

### 응답 길이 원칙
- 판단 요약: 2문장 이내
- 약한 근거 지적: 2문장 이내
- 확인 질문: 각 1문장, 2~3개
- 뉴스 연결: 1~2문장

---

## 11. 하지 말 것 목록

### 컬러
- 빨강/초록 계열을 가격·판단·배지 등 UI 요소에 사용 — 시세창 느낌, FOMO 자극 (새싹 이모지 일러스트의 `green-500`은 유일한 예외, §2 참고)
- 순수 검정 `#000000` — Gray 900/950 사용
- 카운트다운, 타이머, 깜빡이는 배지 — 긴박감 연출 금지
- 숫자를 과도하게 크게 강조 — 시세창처럼 보이는 레이아웃 금지

### 타이포
- Paperlogy 로고 워드마크를 제외한 모든 곳에서 font-weight 700 이상 사용 금지
- 대문자(ALL CAPS) 헤딩 금지
- 12px 미만 텍스트 금지

### 레이아웃
- 그림자와 보더를 동시에 남발하지 않는다 — 카드 하나당 그림자 또는 보더 중 하나만
- 결과 화면 4개 섹션(요약/근거/자료/질문)을 완전히 동일한 스타일로 나열 금지 — 요약 카드는 항상 시각적으로 구분되어야 한다
- 실시간 가격/시세 표시 금지 (서비스 철학)
- 급등락 연상 그래프/차트 금지

### AI 응답
- 지시형 문장 금지
- 단정형 투자 의견 금지
- 200자 이상 장문 단락 금지 (가독성)

---

## 12. CSS Custom Properties

```css
:root {
  /* Colors — Gray Scale */
  --color-gray-50: #f9f9fa;
  --color-gray-100: #f3f2f8;
  --color-gray-200: #e3e2e9;
  --color-gray-400: #aeaebe;
  --color-gray-500: #8e8e9e;
  --color-gray-600: #78788b;
  --color-gray-700: #585869;
  --color-gray-800: #3a3a50;
  --color-gray-900: #231f3a;
  --color-gray-950: #1a1a2e;

  /* Colors — Sub */
  --color-pink-300: #ffb3e0;
  --color-pink-500: #f472b6;
  --color-pink-700: #be3a8a;
  --color-purple-500: #8b7cf6;
  --color-purple-700: #5b47d4;
  --color-green-500: #3dcb5a; /* 새싹 이모지 일러스트 전용, 그 외 UI에는 사용 금지 */

  /* Gradients */
  --gradient-btn: linear-gradient(180deg, #2e2a47 0%, #231f3a 100%);
  --gradient-calm-subtle: linear-gradient(180deg, rgba(255,240,250,0.4) 0%, rgba(242,240,255,0.4) 100%);
  --gradient-calm-accent: linear-gradient(-90deg, #ffafe1 0%, #6e53ff 100%);

  /* Typography */
  --font-primary: "Pretendard", ui-sans-serif, system-ui;
  --font-logo: "Paperlogy", var(--font-primary);

  --text-logo: 40px;
  --text-heading-sub: 20px;
  --text-label-lg: 20px;
  --text-label: 16px;
  --text-label-m: 14px;
  --text-label-sm: 14px;
  --text-body-lg: 18px;
  --text-eyebrow: 12px;

  --leading-tight: 1;
  --leading-normal: 1.4;
  --tracking-none: 0;

  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-logo: 700;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 20px;
  --spacing-2xl: 24px;
  --spacing-3xl: 36px;
  --spacing-4xl: 48px;
  --spacing-6xl: 84px;

  /* Border Radius */
  --radius-button: 16px;
  --radius-card: 16px;
  --radius-card-sm: 8px;
  --radius-badge: 8px;
  --radius-pill: 9999px;
  --radius-input: 16px;

  /* Shadows */
  --shadow-card: rgba(35,31,58,0.04) 0px 0px 0px, rgba(35,31,58,0.06) 0px 2px 4px, rgba(35,31,58,0.08) 0px 8px 12px;
  --shadow-modal: rgba(35,31,58,0.08) 0px 8px 24px, rgba(35,31,58,0.06) 0px 2px 8px, rgba(35,31,58,0.04) 0px 0px 0px 1px;

  /* Layout */
  --page-max-width: 390px;
}
```

### Tailwind v4

```css
@theme {
  --color-gray-50: #f9f9fa;
  --color-gray-100: #f3f2f8;
  --color-gray-200: #e3e2e9;
  --color-gray-400: #aeaebe;
  --color-gray-500: #8e8e9e;
  --color-gray-600: #78788b;
  --color-gray-700: #585869;
  --color-gray-800: #3a3a50;
  --color-gray-900: #231f3a;
  --color-gray-950: #1a1a2e;

  --color-pink-300: #ffb3e0;
  --color-pink-500: #f472b6;
  --color-pink-700: #be3a8a;
  --color-purple-500: #8b7cf6;
  --color-purple-700: #5b47d4;
  --color-green-500: #3dcb5a;

  --font-primary: "Pretendard", ui-sans-serif, system-ui;
  --font-logo: "Paperlogy", var(--font-primary);

  --text-logo: 40px;
  --text-heading-sub: 20px;
  --text-label-lg: 20px;
  --text-label: 16px;
  --text-label-m: 14px;
  --text-label-sm: 14px;
  --text-body-lg: 18px;
  --text-eyebrow: 12px;

  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 20px;
  --spacing-2xl: 24px;
  --spacing-3xl: 36px;
  --spacing-4xl: 48px;
  --spacing-6xl: 84px;

  --radius-button: 16px;
  --radius-card: 16px;
  --radius-card-sm: 8px;
  --radius-badge: 8px;
  --radius-pill: 9999px;
  --radius-input: 16px;
}
```

---

## 13. 화면 구조 — 검색 · 보유여부 · 이유입력 · 리스트 (직접 제작 캡처 반영)

출처: 사용자가 Figma에서 직접 작업한 화면 캡처(`claude capture/screen/*.png`). 1~12장에서 다루지 않은 화면들과, 기존 §8~9 대비 바뀐 부분을 여기 기록한다.

### 4단계 진행 흐름
검색(1/4) → 보유여부(2/4) → 이유입력(3/4) → (제출/로딩·결과로 이어짐, 별도 4번째 화면은 없음). `StepTopBar`의 `totalSteps`는 3이 아니라 4를 쓴다.

### 보유/관심 컬러 코드 (신규)
종목 아바타·뱃지에서 보유 상태를 색으로 구분한다. 새 토큰을 추가하지 않고 기존 컬러의 opacity 변형으로 표현한다.
- 보유: `bg-purple-700/10 text-purple-700`
- 관심: `bg-pink-500/10 text-pink-700`
구현체: `components/holding-badge.tsx` (`HoldingBadge`, `avatarClasses`)

### 종목 검색
- 헤드라인 2줄 + subtext "한국거래소 상장 종목만 검색 가능해요"(KRX 상장종목정보 API 범위 안내), 헤드라인↔subtext gap 8px
- 헤드라인↔input gap 32px, input↔최근/추천 종목 섹션 gap 32px
- 검색 input: flex 행 구조(아이콘+텍스트), radius 16px, padding top/bottom 16px·left 16px·right 20px, 아이콘-텍스트 gap 8px, 폰트 크기 16px(`text-label`, placeholder 포함), 보더 Gray 200(focus 시 Gray 800) — radius/폰트 크기는 focus 상태에서도 동일하게 유지
- 검색 아이콘(`IconSearchGlass`, Gray 600, 20×20 컨테이너):
  ```svg
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M17.5 17.5L13.8833 13.8833M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  ```
- 검색어가 비어 있을 때: "최근 확인한 종목"(로컬 조회 이력, localStorage) + "추천 종목"(고정 4종목) 가로 스크롤 칩 — 칩은 `rounded-card bg-gray-100`. 섹션 라벨은 Gray 500, 라벨↔칩 행 gap 16px
- 검색어가 있을 때: 카드 없이 `border-b border-gray-100` 구분선만 있는 플랫 리스트. 종목명 중 검색어와 일치하는 부분만 Purple 500(`#8b7cf6`) 강조, 나머지는 Gray 700
- 구현체: `lib/stocks/recent.ts`(최근), `lib/stocks/index.ts`의 `getRecommendedStocks()`(추천, 하드코딩), `HighlightedName`(`app/search/page.tsx`)

### 보유 여부 선택
- 헤드라인 "{종목명}는 / 지금 보유하고 있는 종목인가요?" + subtext, 헤드라인↔subtext gap 8px
- 텍스트 영역↔버튼 영역 gap 32px
- 버튼 2개가 좌우가 아니라 세로로 쌓임, `rounded-card bg-gray-100`(보더 없음), 각각 풀와이드, 버튼간 gap 16px, 라벨 폰트 크기 16px(`text-label`)

### 판단 이유 입력
- 헤드라인 "이 종목의 매수/매도를 고민하는 / 이유를 작성해주세요", 헤드라인↔뱃지 gap 12px
- 헤드라인 아래 `HoldingBadge` + 종목명 뱃지(`bg-gray-100`) 가로 배치로 기존 서브텍스트 라인 대체. 뱃지 공통 스펙: 폰트 14px(`text-label-sm`), 좌우 padding 8px(`px-sm`) — `HoldingBadge` 컴포넌트 자체를 수정해서 다른 화면(타임라인 헤더 등)에도 동일 적용
- 뱃지↔입력창 gap 32px, 입력창↔예시 섹션 gap 32px
- 입력창: `border`+`padding`을 가진 컨테이너 안에 textarea와 글자수 카운터를 같이 넣는 flex-column 구조. radius 16px(`rounded-input`), padding 좌우 20px·상하 16px, 폰트 16px(`text-label`, placeholder 포함). 카운터(`text-eyebrow`, 12px)는 컨테이너의 마지막 flex 자식으로 자기 공간을 차지해 — 기존에는 절대위치로 텍스트 위에 얹혀 있어서 문장이 길어지면 겹치는 버그가 있었음. 피드백 바텀시트 textarea도 동일 구조
- "입력 예시" 라벨 → "혹시 이런 이유인가요?", 라벨↔버튼 gap 16px
- placeholder "매수/매도를 고민하고 있는 이유를 적어주세요"
- 예시 버튼: `bg-gray-100`(보더 없음), radius 16px(`rounded-card`), padding 좌우 20px·상하 16px, 폰트 16px semibold(`text-label font-semibold`)

### 로딩 화면
- 스피너 제거, 대신 로고 스와시를 gradient-calm-accent로 채운 버전(`IconSwooshGradient animated`) 노출
- **로딩 모션:** 체크 벡터 라인을 따라 흰색 하이라이트가 좌→우로 1.4초 주기로 반복 이동하는 shimmer 효과(`animateTransform`으로 두 번째 오버레이 gradient를 이동, `feGaussianBlur stdDeviation 1.6`로 흐릿하게 처리해 너무 쨍하지 않도록 함). `animated` prop이 없으면(온보딩 사용처) 정적 상태 유지 — 온보딩 로고는 애니메이션 없음
- 헤드라인 "투자 메타인지를 가동 중이에요"(heading-sub) + subtext "잠시만 기다려주세요"(label-sm, Gray 500)

### 내 종목 리스트
- 상단 고정 헤더: `font-logo` "Fomonda" 워드마크(좌) + "의견 남기기" 버튼 + 톱니바퀴 아이콘(`IconGear`, Gray 900)(우)
- 탭: 기존 필(pill) 스타일 → 밑줄 스타일(`border-b-2`, 활성 Gray 900 / 비활성 Gray 400, 공유 `border-gray-100` 베이스라인)
- 종목 아바타: 보유/관심 컬러 코드 적용, `rounded-full`(뱃지 radius 토큰과 무관하게 항상 원형)
- 우측 텍스트: "판단 기록 N건" → "N회 점검" 뱃지(`rounded-badge bg-gray-100`)
- "종목 추가하기": 기존 Ghost 아웃라인 버튼 → 보더/배경 없이 `+` 아이콘(Gray 100 원형 배경 + Gray 400 획) + "종목 추가하기" 텍스트(Gray 500), 가운데 정렬로 축소된 미니멀 스타일로 교체
- 구현체: `app/list/page.tsx`

**설정(톱니바퀴) 드롭다운 메뉴**
- 아이콘 탭 시 우측 정렬로 아래에 팝업(`shadow-modal`, `rounded-card`, 흰 배경) 노출, 바깥 탭하면 닫힘
- 1단계 메뉴: "종목 편집" / "정렬" 두 항목만(Gray 900, `label-m`)
- "정렬" 탭 시 같은 팝업 안에서 2단계로 전환: 최신순 / 이름순 / 점검 횟수순 3개 옵션, 현재 선택된 옵션만 Gray 900(나머지는 Gray 400)으로 표시. 기본값은 최신순(가장 최근 점검한 종목이 위)
- "종목 편집" 탭 시 팝업 닫히고 리스트가 편집 모드로 전환

**종목 편집 모드**
- 상단 헤더 우측이 "의견 남기기 + 톱니바퀴"에서 "취소" + "삭제" 버튼으로 교체
- "삭제" 버튼은 기본 비활성 상태(`bg-gray-100 text-gray-300`)이며, 1개 이상 선택 시 활성 상태(`bg-gray-900 text-gray-50`)로 전환
- 각 종목 카드 좌측에 체크박스(`IconCheckboxState`, 8px 라운드 사각형 — 선택 시 Gray 900 배경 + 체크마크, 미선택 시 Gray 50 배경 + Gray 200 보더)가 나타나고, 카드 탭 시 상세 이동 대신 체크 토글
- "삭제" 탭 시 확인 팝업(`ConfirmDialog`, 중앙 모달) 노출 — "N개 종목을 삭제할까요?" + "판단 타임라인이 모두 삭제되며 되돌릴 수 없어요" + 취소/삭제 버튼. 삭제 확정 시 선택된 종목의 판단 타임라인 전체가 Supabase에서 영구 삭제됨
- 구현체: `components/confirm-dialog.tsx`, `lib/db/judgments.ts`의 `deleteEntry`, `app/api/judgments/route.ts`의 `DELETE`, `lib/context/app-context.tsx`의 `deleteEntries`

### 종목별 판단 타임라인
- 헤더: 아바타(컬러코드) + 종목명 + "코드 · N회 점검" + 우측 `HoldingBadge`
- "다시 점검하기" Primary 버튼이 헤더 바로 아래(상단)로 이동 — 기존에는 화면 최하단 Secondary였음, 하단 중복 버튼은 제거
- 판단 기록 카드 프리뷰: 원문 `reason` 대신 `checkCard.summaryHeadline`(굵게) + `checkCard.summary`(설명)를 보여줌 — 원문은 상세 화면(탭 시 이동)에서 계속 확인 가능

### 피드백(의견 남기기)
- 리스트 헤더의 "의견 남기기" 탭 시 바텀시트 모달 오픈
- 구성: 드래그 핸들바 + 타이틀 "포몬다에 의견을 남겨주세요" + subtext + textarea(500자) + Primary 버튼 "의견 남기기"
- 제출 시 세션ID와 함께 Supabase `feedback` 테이블에 저장(`supabase/feedback.sql`, `lib/db/feedback.ts`, `/api/feedback`)
- 구현체: `components/feedback-sheet.tsx`
