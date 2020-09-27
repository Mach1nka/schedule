export interface UserSuccessSignInParseFromBack {
  "api_token": string;
  "email": string;
  "name": string;
}

export interface UserSettings {
  apiToken?: string;
  email?: string;
  name?: string;
  timeZone?: number;
  role?: string;
  colorsForIventType?: Record<string, {color?: string; backgroundColor?: string}>;
}

