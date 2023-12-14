export interface Language {
  code: string;
  name: string;
}

export interface Country {
    code: string;
    name: string
}

export interface MenuItem {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: any;
    onSelect?: () => void;
  }
