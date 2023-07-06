export interface LanguageProps {
  code: string;
  name: string;
}

export interface JokeProps {
  languageCode: string;
  text: string;
}

export interface LanguageData {
  name: string;
  nativeName: string;
  dir: string;
};

export interface TagProps {
  name: string;
  selected: boolean;
};

export interface SettingsPanelProps {
  showPanel: boolean;
  setShowPanel: Function;
  categories: TagProps[];
  setCategories: Function;
  blacklist: TagProps[];
  setBlacklist: Function;
};

export interface DropdownProps {
  languages: LanguageProps[];
  language: LanguageProps;
  setLanguage: Function;
};

export interface MenuProps {
  language: LanguageProps;
  setLanguage: Function;
  getJoke: Function;
  showPanel: boolean;
  setShowPanel: Function;
};
