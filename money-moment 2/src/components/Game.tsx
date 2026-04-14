import React, { useState, useCallback } from 'react';
import { Gender, CharacterPose } from '../data/types';
import { chapters, resultTypes, peerData } from '../data/chapters';
import './Game.css';

type Screen = 'gender' | 'game' | 'result';

const getCharacterImage = (gender: Gender, pose: CharacterPose): string => {
  if (gender === 'female') {
    switch (pose) {
      case 'calm':    return '/images/mc_f_1.png';
      case 'anxious': return '/images/mc_f_2.png';
      case 'thinking':return '/images/mc_f_3.png';
      case 'surprised':return '/images/mc_f_4.png';
      case 'pensive': return '/images/mc_f_5.png';
    }
  } else {
    switch (pose) {
      case 'calm':    return '/images/mc_m_1.png';
      case 'anxious': return '/images/mc_m_2.png';
      case 'thinking':return '/images/mc_m_3.png';
      case 'surprised':return '/images/mc_m_4.png';
      case 'pensive': return '/images/mc_m_5.png';
    }
  }
};

const getNpcImage = (npc: string | null): string | null => {
  if (npc === 'npc1') return '/images/npc1.png';
  if (npc === 'npc2') return '/images/npc2.png';
  return null;
};

export const Game: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('gender');
  const [gender, setGender] = useState<Gender>('female');
  const [currentChapter, setCurrentChapter] = useState(0);
  const [scores, setScores] = useState([0, 0, 0, 0]);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const chapter = chapters[currentChapter];

  const handleGenderSelect = useCallback((g: Gender) => {
    setGender(g);
    setScreen('game');
  }, []);

  const handleChoiceSelect = useCallback((idx: number) => {
    setSelectedChoice(idx);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedChoice === null) return;
    const newScores = scores.map((s, i) => s + chapter.choices[selectedChoice].scores[i]);
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentChapter < chapters.length - 1) {
        setScores(newScores);
        setCurrentChapter(c => c + 1);
        setSelectedChoice(null);
        setIsTransitioning(false);
      } else {
        setScores(newScores);
        setScreen('result');
        setIsTransitioning(false);
      }
    }, 400);
  }, [selectedChoice, scores, chapter, currentChapter]);

  const handleReset = useCallback(() => {
    setScreen('gender');
    setCurrentChapter(0);
    setScores([0, 0, 0, 0]);
    setSelectedChoice(null);
  }, []);

  if (screen === 'gender') {
    return (
      <div className="gender-screen">
        <div className="gender-content">
          <p className="gender-icon">💰</p>
          <h1 className="game-title">머니 모먼트</h1>
          <p className="game-subtitle">평범한 하루 속 10개의 순간.<br />당신이 돈을 대하는 방식을 발견합니다.</p>
          <p className="game-meta">약 5분 소요 · 10개 질문</p>
          <p className="gender-label">주인공을 선택하세요</p>
          <div className="gender-buttons">
            <button className="gender-btn" onClick={() => handleGenderSelect('female')}>
              <img src="/images/mc_f_1.png" alt="여성 캐릭터" />
              <span>여성</span>
            </button>
            <button className="gender-btn" onClick={() => handleGenderSelect('male')}>
              <img src="/images/mc_m_1.png" alt="남성 캐릭터" />
              <span>남성</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'result') {
    const maxScore = Math.max(...scores);
    const typeIdx = scores.indexOf(maxScore);
    const type = resultTypes[typeIdx];
    return (
      <div className="result-screen">
        <div className="result-content">
          <span className="result-badge" style={{ background: type.bgColor, color: type.color }}>
            {type.badge}
          </span>
          <h2 className="result-title">{type.name}</h2>
          <p className="result-desc">{type.desc}</p>
          <div className="result-metrics">
            <div className="metric-card">
              <p className="metric-label">또래 비교</p>
              <p className="metric-value">{type.peer.split(' ')[2]}</p>
              <p className="metric-sub">{type.peer.split(' ').slice(0, 2).join(' ')} · {type.peerSub}</p>
            </div>
            <div className="metric-card">
              <p className="metric-label">내 점수</p>
              <p className="metric-value">{maxScore}점</p>
              <p className="metric-sub">최대 30점 중</p>
            </div>
          </div>
          <div className="product-card">
            <p className="product-label">맞춤 금융 추천</p>
            <div className="product-row">
              <span className="product-tag now" style={{ background: type.bgColor, color: type.color }}>지금 당장</span>
              <span className="product-name">{type.productNow}</span>
            </div>
            <div className="product-row">
              <span className="product-tag later">나중에</span>
              <span className="product-name-later">{type.productLater}</span>
            </div>
          </div>
          <div className="compare-card">
            <p className="compare-label">또래 유형 분포</p>
            {peerData.map(p => (
              <div className="bar-row" key={p.name}>
                <div className="bar-meta">
                  <span className="bar-name" style={p.name === type.name ? { fontWeight: 500 } : {}}>
                    {p.name}{p.name === type.name ? ' (나)' : ''}
                  </span>
                  <span className="bar-pct">{p.pct}%</span>
                </div>
                <div className="bar-bg">
                  <div className="bar-fill" style={{ width: `${p.pct}%`, background: p.color }} />
                </div>
              </div>
            ))}
          </div>
          <button className="retry-btn" onClick={handleReset}>처음부터 다시하기</button>
        </div>
      </div>
    );
  }

  const charImg = getCharacterImage(gender, chapter.characterPose);
  const npcImg = getNpcImage(chapter.npc);
  const progress = ((currentChapter + 1) / chapters.length) * 100;

  return (
    <div className={`game-screen ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
      <div className="bg-layer" style={{ backgroundImage: `url(/images/${chapter.bg}.png)` }} />
      <div className="bg-overlay" />
      <div className="progress-bar-wrap">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="chapter-info">
        <span className="ch-num">Ch {chapter.id} / 10</span>
        <span className="ch-time">{chapter.time} · {chapter.place}</span>
      </div>
      <div className="stage">
        {npcImg && (
          <img
            src={npcImg}
            alt="NPC"
            className="character-img npc-img"
          />
        )}
        <img
          src={charImg}
          alt="주인공"
          className="character-img main-char"
        />
      </div>
      <div className="dialog-box">
        <div className="scene-desc">{chapter.sceneDesc}</div>
        <div className="monologue">
          {chapter.monologue.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        <div className="question">{chapter.question}</div>
        <div className="choices">
          {chapter.choices.map((choice, idx) => (
            <button
              key={idx}
              className={`choice-btn ${selectedChoice === idx ? 'selected' : ''}`}
              onClick={() => handleChoiceSelect(idx)}
            >
              <span className="choice-num">{idx + 1}</span>
              <div className="choice-body">
                <p className="choice-text">{choice.text}</p>
                <p className="choice-sub">{choice.sub}</p>
              </div>
            </button>
          ))}
        </div>
        {selectedChoice !== null && (
          <button className="next-btn" onClick={handleNext}>
            {currentChapter === chapters.length - 1 ? '결과 보기 →' : '다음 →'}
          </button>
        )}
      </div>
    </div>
  );
};
