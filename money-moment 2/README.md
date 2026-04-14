# 머니 모먼트 💰

> 평범한 하루 속 10개의 순간으로 당신의 자산관리 유형을 발견하는 비주얼 노벨 게임

## 프로젝트 구조

```
money-moment/
├── public/
│   ├── index.html
│   └── images/          ← 배경 6장 + 주인공 10장 + 조연 2장
│       ├── bg1.png ~ bg6.png
│       ├── mc_f_2.png ~ mc_f_5.png
│       ├── mc_m_1.png ~ mc_m_5.png
│       ├── npc1.png
│       └── npc2.png
├── src/
│   ├── components/
│   │   ├── Game.tsx     ← 메인 게임 엔진
│   │   └── Game.css     ← 스타일
│   ├── data/
│   │   ├── types.ts     ← TypeScript 타입
│   │   └── chapters.ts  ← 스크립트 & 결과 유형 데이터
│   ├── App.tsx
│   └── index.tsx
├── package.json
└── tsconfig.json
```

## 로컬 실행

```bash
npm install
npm start
```

## Vercel 배포

### 방법 1 — GitHub 연동 (추천)

1. GitHub에 이 폴더 업로드
2. [vercel.com](https://vercel.com) 접속 → New Project
3. GitHub 저장소 선택
4. Framework: **Create React App** 선택
5. Deploy 클릭

### 방법 2 — Vercel CLI

```bash
npm install -g vercel
npm run build
vercel --prod
```

## 스크립트 수정 방법

`src/data/chapters.ts` 파일만 수정하면 됩니다.

- 질문/선택지 수정: `chapters` 배열
- 결과 유형 수정: `resultTypes` 배열
- 또래 비교 데이터 수정: `peerData` 배열 (실제 응답 데이터 쌓이면 교체)

## 유형 분류 로직

10개 챕터 응답 완료 후 4개 점수(safe / impulse / data / risk) 중 최고점 유형으로 분류.
각 선택지 점수는 `chapters.ts`의 `scores: [safe, impulse, data, risk]` 배열에서 수정 가능.
