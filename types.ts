export enum AppStatus {
  IDLE = 'IDLE',
  CAMERA_ACTIVE = 'CAMERA_ACTIVE',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}

export interface AnalysisResult {
  text: string;
}

export interface AnalysisError {
  message: string;
}

export interface BirthDetails {
  year: string;
  month: string;
  day: string;
  hour: string;
}