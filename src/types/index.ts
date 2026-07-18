export type RoundStatus = 'not_attempted' | 'cleared' | 'failed'

export interface User {
  id: string
  email: string
  name: string
}

export interface JobApplication {
  id: string
  userId: string
  shortId: string
  company: string
  role: string
  level: string
  geography: string
  jdText: string
  planGist: string
  createdAt: string
  rounds?: InterviewRound[]
}

export interface InterviewRound {
  id: string
  jobApplicationId: string
  roundType: string
  orderIndex: number
  status: RoundStatus
  confidenceScore: number | null
  estimatedDurationMinutes: number
  questionCount: number
  depthCalibrationRationale: string
  createdAt: string
}

export interface DifficultyProfile {
  distribution: { easy: number; medium: number; hard: number }
  style: string
  depthCalibrationRationale: string
  geography: string
  companyType: string
  estimatedDurationMinutes: number
  questionCount: number
}

export interface Question {
  questionText: string
  evaluationRubric: string
  keyConcepts: string[]
}

export interface QuestionSet {
  id: string
  roundId: string
  attemptNumber: number
  questions: Question[]
  difficultyProfile: DifficultyProfile
  createdAt: string
}

export interface RoundAttempt {
  id: string
  roundId: string
  questionSetId: string
  confidenceScore: number | null
  status: RoundStatus | null
  startedAt: string
  completedAt: string | null
  questionAttempts?: QuestionAttempt[]
}

export interface QuestionAttempt {
  id: string
  roundAttemptId: string
  questionId: string
  questionText: string | null
  evaluationRubric: string | null
  userAnswer: string
  strongPoints: string[]
  missedPoints: string[]
  interviewerExpectation: string
  followUpCount: number
  createdAt: string
}
