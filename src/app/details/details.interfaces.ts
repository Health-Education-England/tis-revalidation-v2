export interface INavLink {
  label: string;
  path: string;
}

export interface INote {
  id: number;
  text: string;
  date: Date;
  edit?: boolean;
}
