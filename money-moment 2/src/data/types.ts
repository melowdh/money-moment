export type Gender = 'female' | 'male';

export type CharacterPose =
  | 'calm'      // mc_f_5 / mc_m_1  평온
  | 'anxious'   // mc_f_2 / mc_m_2  불안
  | 'thinking'  // mc_f_3 / mc_m_3  고민
  | 'surprised' // mc_f_4 / mc_m_4  놀람
  | 'pensive';  // mc_f_5 / mc_m_5  사색

export type NPC = 'npc1' | 'npc2' | null;

export interface Choice {
  text: string;
  sub: string;
  scores: [number, number, number, number]; // [safe, impulse, data, risk]
}

export interface Chapter {
  id: number;
  time: string;
  place: string;
  bg: string;           // bg1 ~ bg6
  characterPose: CharacterPose;
  npc: NPC;
  sceneDesc: string;
  monologue: string[];
  question: string;
  choices: Choice[];
}

export interface ResultType {
  key: string;
  name: string;
  badge: string;
  color: string;
  bgColor: string;
  desc: string;
  peer: string;
  peerSub: string;
  productNow: string;
  productLater: string;
}
