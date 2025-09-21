export type Language = 'English' | 'Hindi' | 'Tamil' | 'Bengali' | 'Spanish';

export interface Page {
    id: string;
    name: string;
    icon: JSX.Element;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum Theme {
    DARK = 'dark',
    ETHNIC = 'ethnic',
    CRAFTSMAN = 'craftsman',
    HANDLOOM = 'handloom',
    TERRACOTTA = 'terracotta',
    TRIBAL = 'tribal',
    MADHUBANI = 'madhubani',
}

export type Intensity = 'Subtle' | 'Normal' | 'Vibrant';

export type Pattern = string;

export interface ThemeCustomization {
    pattern?: Pattern;
    intensity?: Intensity;
}