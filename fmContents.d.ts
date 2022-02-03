export interface Contents {
  themes: Theme[];
  plugins: Plugin[];
}

export interface Theme {
  name: string;
  desc: string;
  dirName: string;
  author?: string;
  authorUrl?: string;
  activeTheme?: boolean;
}

export interface Plugin {
  name: string;
  desc: string;
  dirName: string;
  author?: string;
  authorUrl?: string;
  activePlugin?: boolean;
}
