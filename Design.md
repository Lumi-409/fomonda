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
| 탭 필 / 뱃지 | 9999px | `--radius-badge` |
| 검색/텍스트 입력창 | 8px | `--radius-input` |

> 입력창 radius는 온보딩/결과 두 화면에는 입력 컴포넌트가 없어 실측하지 못했습니다. 8px는 질문 카드(작은 카드) radius와 통일한 잠정값이며, 검색/이유 입력 화면을 Figma에서 확인하는 대로 실측값으로 교체합니다.

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
| Ghost | 배경 없음(투명) | Gray 700 (`#585869`) | radius 8, 1px 보더 Gray 200(`#e3e2e9`), `px-16 py-8`, `label`(16px) | 결과 "다시 점검하기" |

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
| close | 높이 52px, `px-24 py-20`, 우측 정렬 X 아이콘(16px) 단독 | 결과 |

### 하단 버튼 영역

컨테이너 padding: `px-16 pt-16 pb-24`, full width.

| 화면 | 구성 |
|------|------|
| 온보딩 | Primary 버튼 1개, full width |
| 결과 | Ghost + Primary 2개, `gap-12`, 각 `flex-1` |

---

## 8. 화면 구조 — 온보딩

배경은 흰색(Canvas), 탑바 없음.

```
1. 브랜드 블록 (gap 36px)
   - 로고: 장식 심볼 + "Fomonda" 워드마크(Paperlogy 700, 40px, Gray 900)
   - 태그라인 2줄(body-lg, Gray 950, center):
     "내 투자 판단이 흔들린다면"
     "지금 메타인지를 가동하세요"

   ↕ 84px

2. 기능 카드 (흰 배경, radius 16, shadow-card, padding 20, gap 16)
   - 3개 항목, 각 아이콘(16px 커스텀 이모지 일러스트) + label-sm 텍스트(Gray 800)
     · 판단 뒤에 숨은 진짜 이유를 관찰해요
     · 흔들린 순간들이 나만의 인사이트가 돼요
     · 근거 있는 투자 판단의 힘을 키워요

3. 하단 CTA — Primary 버튼 "시작하기" (full width)
```

---

## 9. 화면 구조 — 결과 (정보 위계)

배경은 흰색(히어로 영역) → Gray 50(상세 섹션 영역). 탑바는 `close` 타입.

```
[TopBar: close]

1. 히어로 (px-16, pb-16)
   - 헤드라인 2줄(heading-sub, Gray 950):
     "{근거수}개의 약한 근거가 있어요"
     "점검 결과를 확인해보세요"
   - 탭바: 요약 / 근거 / 자료 / 질문 (4개, 스크롤 앵커)
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

[하단: Ghost "다시 점검하기" + Primary "리스트 확인"]
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
  --radius-badge: 9999px;
  --radius-input: 8px;

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
  --radius-badge: 9999px;
  --radius-input: 8px;
}
```
