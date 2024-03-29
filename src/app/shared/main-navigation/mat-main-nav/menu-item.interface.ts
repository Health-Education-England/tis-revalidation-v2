export interface IMenuItem {
  type: MenuType;
  route: string;
  name: string;
  menuItems?: IMenuItem[];
  description?: string;
  env?: string[];
  beta?: boolean;
}

export enum MenuType {
  internal, // uses routerLink
  external // uses href appended to environments host
}
