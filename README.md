# GBGR (거부기린)

> 실시간 웹캠 자세 인식을 통해 거북목과 같은 잘못된 자세를 교정하고 사용자에게 통계 피드백을 제공하는 데스크탑 애플리케이션

<p align="center">
  <img src="buildResources/icon.png" alt="거부기린 아이콘" width="200" />
</p>

---

## 🔗 데모 & 자료

- 서비스 홈페이지: [https://bugi.co.kr](https://bugi.co.kr)

---

## ✨ 핵심 요약 (TL;DR)

- **문제 인식**: 장시간 컴퓨터 사용으로 인해 무의식적으로 자세가 흐트러져 거북목, 어깨 비대칭 등의 문제를 겪는 사용자가 많습니다.
- **핵심 해결 전략**:
  - 웹캠을 통해 사용자의 자세를 실시간으로 분석하고 시각적으로 피드백합니다.
  - 잘못된 자세가 감지되면 알림을 보내 즉각적인 교정을 유도합니다.
  - 세션별 자세 데이터를 기록하고 통계 대시보드를 제공하여 장기적인 습관 개선을 돕습니다.
- **프론트엔드 기술 포인트**:
  - `@mediapipe/tasks-vision`을 활용하여 웹캠 영상에서 실시간으로 신체 키포인트를 추출하고 자세를 분석합니다.
  - `Zustand`를 사용해 세션, 알림, 카메라 등 복잡한 클라이언트 상태를 효율적으로 관리합니다.
  - `Recharts`를 이용해 사용자의 자세 점수, 패턴 등 통계 데이터를 시각화하여 제공합니다.
  - `Electron`의 IPC 통신을 활용하여 메인 윈도우와 위젯 간의 상태를 동기화합니다.

---

## 🧩 주요 기능

1. **실시간 자세 분석 및 위젯**
   - 설명: 웹캠을 통해 사용자의 자세를 실시간으로 분석하고, MediaPipe를 활용해 신체 키포인트를 추출합니다. 메인 화면과 데스크탑 위젯을 통해 현재 자세 상태(거북목/기린)를 실시간으로 확인하고 세션을 제어할 수 있습니다. 위젯은 항상 위에 표시되며 크기 조절이 가능합니다.
   - 기술 포인트: `react-webcam`, `@mediapipe/tasks-vision`, Electron `BrowserWindow`, `PostureClassifier` (안정화 로직 포함)
   - 주요 특징:
     - PI(Posture Index) 계산을 통한 정량적 자세 평가
     - EMA(Exponential Moving Average) 스무딩으로 노이즈 제거
     - PostureStabilizer를 통한 안정화된 자세 판정
     - 정면성 검사(roll, centerRatio)로 측정 신뢰도 보장

2. **캘리브레이션 시스템**
   - 설명: 사용자 개인의 정상 자세를 기준으로 설정하는 캘리브레이션 기능입니다. 측정 중 밝기, 자세 안정성 등을 검사하여 신뢰할 수 있는 기준값을 확보합니다.
   - 기술 포인트: `trimmedStats` (상하 5% 절사 평균 및 표준편차), `errorChecks` (밝기/안정성 검증)

3. **통계 대시보드**
   - 설명: 일별, 주별 데이터를 기반으로 자세 점수 변화, 주요 자세 패턴, 출석률, 평균 자세 점수, 레벨 진행도 등을 시각적으로 분석합니다. Recharts를 활용한 다양한 차트로 사용자의 장기적인 자세 개선 추이를 확인할 수 있습니다.
   - 기술 포인트: `TanStack Query` (서버 데이터 캐싱 및 동기화), `Recharts` (차트 시각화)
   - 주요 패널:
     - 평균 자세 점수 그래프 (시간대별 추이)
     - 자세 패턴 분석 (거북목/기린 비율)
     - 출석률 및 연속 출석 일수
     - 레벨 진행도 및 달성률

4. **자세 교정 알림**
   - 설명: 거북목이나 비대칭 자세가 일정 시간 이상 지속되면 데스크탑 알림을 보내 사용자가 인지하고 바로잡을 수 있도록 돕습니다. 알림 강도와 주기를 사용자가 설정할 수 있습니다.
   - 기술 포인트: Electron `Notification` API, `useNotificationScheduler` 훅, `Zustand` (알림 상태 관리)

5. **세션 관리**
   - 설명: 자세 측정 세션을 시작, 일시정지, 재개, 종료할 수 있습니다. 세션 중 수집된 메트릭 데이터는 주기적으로 서버에 저장되며, 세션 종료 시 리포트를 제공합니다.
   - 기술 포인트: `useAutoMetricsSender` (자동 메트릭 전송), `useSessionCleanup` (세션 정리)

---

## 🛠 기술 스택

### Frontend

- **Framework**: `Electron`, `React`
- **Language**: `TypeScript`
- **State Management**: `Zustand`, `TanStack Query`
- **Styling**: `Tailwind CSS`
- **Build/Bundle**: `Vite`
- **Pose Detection**: `@mediapipe/tasks-vision`

### 협업 & 기타

- **Version Control**: `Git`, GitHub
- **CI**: `GitHub Actions`
- **Package Manager**: `pnpm`
- **Form Validation**: `react-hook-form`, `zod`
- **Animation**: `framer-motion`
- **Routing**: `react-router-dom`

---

## 📁 프로젝트 구조

```bash
src/
├── main/           # Electron 메인 프로세스
│   └── src/
│       ├── index.ts              # IPC 핸들러 및 앱 초기화
│       ├── mainWindow.ts        # 메인 윈도우 생성 및 관리
│       ├── widgetWindow.ts      # 위젯 윈도우 생성 및 관리
│       └── notificationHandlers.ts  # 알림 관련 핸들러
├── preload/        # Electron 프리로드 스크립트
│   └── src/
│       └── index.ts             # Context Bridge API 노출
└── renderer/       # React 애플리케이션 (UI)
    └── src/
        ├── api/                  # API 요청 관련 훅 (TanStack Query)
        │   ├── dashboard/        # 대시보드 데이터 쿼리
        │   ├── session/          # 세션 관리 뮤테이션
        │   └── login/            # 인증 관련
        ├── assets/               # 이미지, 폰트 등 정적 에셋
        ├── components/           # 재사용 가능한 공통 컴포넌트
        │   ├── pose-detection/   # 자세 인식 관련 컴포넌트
        │   │   ├── PostureClassifier.ts    # 자세 분류 엔진
        │   │   ├── PostureStabilizer.ts   # 안정화 로직
        │   │   └── calculations.ts        # PI 계산 등
        │   ├── Button/           # 버튼 컴포넌트
        │   ├── Modal/            # 모달 컴포넌트
        │   └── ...
        ├── hooks/                # 커스텀 훅
        │   ├── useNotificationScheduler.ts  # 알림 스케줄링
        │   ├── useAutoMetricsSender.ts      # 자동 메트릭 전송
        │   └── useWidget.ts                 # 위젯 상태 관리
        ├── layout/               # 페이지 레이아웃 컴포넌트
        ├── pages/                # 라우팅 단위 페이지 컴포넌트
        │   ├── Main/             # 메인 대시보드 페이지
        │   ├── Widget/          # 위젯 페이지
        │   ├── Calibration/     # 캘리브레이션 페이지
        │   └── ...
        ├── store/                # Zustand 전역 스토어
        │   ├── usePostureStore.ts    # 자세 상태 관리
        │   ├── useCameraStore.ts     # 카메라 상태 관리
        │   └── useNotificationStore.ts  # 알림 설정 관리
        ├── styles/               # 전역 스타일 및 Tailwind 설정
        ├── types/                # 공용 타입 정의
        └── utils/                # 유틸리티 함수
```

- **컴포넌트 설계**: 페이지(Pages)가 비즈니스 로직과 데이터 페칭을 담당하고, 컴포넌트(Components)는 UI 표현에 집중하는 구조를 지향합니다. `pose-detection` 폴더에는 자세 인식 관련 핵심 로직이 클래스 기반으로 구현되어 있습니다.
- **디자인 시스템**: `Button`, `Modal`, `TextField`, `ToggleSwitch` 등 핵심 UI를 공통 컴포넌트로 만들어 일관성을 유지하고 재사용성을 높였습니다. `clsx`와 `tailwind-merge`를 활용해 조건부 스타일링을 관리합니다.
- **상태 관리 전략**:
  - `Zustand`로 클라이언트 상태(자세, 카메라, 알림 설정) 관리
  - `TanStack Query`로 서버 상태 캐싱 및 동기화
  - 위젯과 메인 윈도우 간 동기화는 `localStorage`의 `storage` 이벤트 활용

---

## 🚀 실행 방법

`.env.example` 파일을 참고하여 프로젝트 루트에 `.env` 파일을 생성해주세요.

```bash
# .env
VITE_BASE_URL=http://localhost:8080
```

```bash
# 1. 의존성 설치
pnpm install

# 2. 개발 서버 실행 (메인 + 렌더러 동시 실행)
pnpm dev

# 3. 프로덕션 빌드
pnpm build

# 4. 프로덕션 모드로 실행
pnpm start:prod

# 5. 플랫폼별 빌드
pnpm build:mac    # macOS 빌드
pnpm build:win    # Windows 빌드
pnpm build:all    # 모든 플랫폼 빌드
```

## 🧪 테스트 & 품질

- **Lint & Format**:
  - `pnpm lint`: ESLint를 통해 코드 컨벤션을 검사하고 자동 수정합니다.
  - `pnpm lint:check`: ESLint 검사만 수행 (수정 없음)
  - `pnpm format`: Prettier를 통해 코드 스타일을 통일합니다.
  - `pnpm format:check`: Prettier 검사만 수행 (수정 없음)
  - `pnpm typecheck`: TypeScript 컴파일러로 타입 오류를 검사합니다 (main, preload, renderer 모두)
- **Git Hooks**: `husky`와 `lint-staged`를 통해 커밋 전 자동으로 lint와 format을 실행합니다.
- **Unit/E2E Test**: 현재 테스트 코드는 없으나, 향후 `Vitest`와 `Testing Library`를 도입하여 훅, 유틸 및 주요 컴포넌트의 안정성을 높일 계획입니다.

---

## 🎨 UI/UX & 접근성

- **디자인 원칙**:
  - **명확한 피드백**: 사용자의 자세 상태(거북목/기린)를 캐릭터 애니메이션과 색상으로 직관적으로 표현합니다. 실시간 점수와 레벨을 통해 현재 자세를 즉시 파악할 수 있습니다.
  - **최소한의 방해**: 위젯 모드를 통해 사용자의 작업 흐름을 방해하지 않으면서 핵심 기능을 이용할 수 있도록 설계했습니다. 위젯은 항상 위에 표시되며 크기 조절이 가능합니다.
  - **다크 모드 지원**: 시스템 테마를 감지하여 자동으로 다크/라이트 모드를 전환합니다.
- **디자인 시스템**:
  - **Component**: `Button`, `TextField`, `Modal`, `ToggleSwitch`, `Typography` 등 재사용 가능한 컴포넌트를 구축했습니다.
  - **Tokens**: `styles/colors.css`, `styles/typography.css`, `styles/breakpoint.css` 등에서 색상, 폰트, 간격, 브레이크포인트 시스템을 정의하여 일관된 디자인을 유지합니다.
  - **애니메이션**: `framer-motion`을 활용하여 부드러운 전환 효과를 제공합니다.
- **접근성**: 향후 키보드 네비게이션, `aria-*` 속성 적용, 색상 대비 준수 등 웹 접근성 표준을 고려하여 개선할 예정입니다.

---

## 📌 개발 의도 & 기술적 도전

- **기술적 도전 과제**:
  1.  **실시간 영상 처리 성능**: 저사양 컴퓨터에서도 부드럽게 작동하도록 웹캠 영상 분석 과정의 성능을 최적화하는 것이 중요했습니다.
  2.  **다중 윈도우 상태 관리**: Electron의 메인 윈도우와 위젯 윈도우 간의 상태(세션, 시간 등)를 일관성 있게 동기화하는 것이 복잡했습니다.
  3.  **크로스 플랫폼 호환성**: macOS와 Windows 환경 모두에서 안정적으로 빌드되고 실행되도록 `electron-builder` 설정을 구성했습니다.

- **해결 과정**:
  1.  **성능 최적화**:
  - MediaPipe의 `detectForVideo`를 프레임별로 호출하여 중복 처리 방지
  - `PostureStabilizer`를 통해 자세 판정의 안정성 확보 (300ms 윈도우, 0.6 임계값)
  - `ScoreProcessor`의 EMA 스무딩으로 노이즈 제거
  - 레벨 변경 시 업데이트 주기 조절 (경계 전환: 50ms, 레벨 변경: 150ms, 일반: 200ms)
  2.  **다중 윈도우 동기화**:
  - 메인 프로세스를 중앙 허브로 삼아 `ipcMain`과 `ipcRenderer`를 통해 위젯 창 열기/닫기 제어
  - 위젯과 메인 윈도우 간 자세 상태 동기화는 `localStorage`의 `storage` 이벤트 활용 (IPC 대신 사용하여 간단하고 안정적으로 구현)
  - `usePostureSyncWithLocalStorage` 훅으로 위젯에서 메인 창의 상태 변경 감지
  3.  **크로스 플랫폼 호환성**:
  - GitHub Actions를 이용해 각기 다른 OS 환경의 빌드를 자동화
  - `entitlements.mac.plist`에 카메라/마이크 권한 명시
  - `electron-builder` 설정으로 macOS (Intel/Apple Silicon) 및 Windows 빌드 지원

---

## 👥 팀 구성 & 역할

- **Frontend**:
  - 최호 ([@choihooo](https://github.com/choihooo)): 프론트엔드 리드, 페이지 설계, 상태 관리, 디자인 시스템
  - 이환석 ([@hwanseok1014](https://github.com/hwanseok1014)): 프론트엔드, API 연동, 데이터 시각화, Electron 기능 구현
- **Backend**:
  - 손대현 ([@son-daehyeon](https://github.com/son-daehyeon)): 백엔드 리드, API 설계, 인증, 배포

---

## 📚 향후 개선 계획

- [ ] 반응형 레이아웃 더 세분화 (태블릿 최적화)
- [ ] Skeleton UI / Loading 상태 고도화
- [ ] 추가 접근성 검사 및 개선 (WAI-ARIA 표준 적용)
- [ ] 다국어(i18n) 지원
- [ ] Vitest를 이용한 단위 테스트 코드 작성
- [ ] 자세 인식 정확도 향상을 위한 추가 캘리브레이션 옵션
- [ ] 오프라인 모드 지원 (로컬 저장 후 동기화)
- [ ] 사용자 커스터마이징 옵션 확대 (알림 설정, 테마 등)
