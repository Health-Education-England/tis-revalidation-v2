export interface IMenuItem {
  type: MenuType;
  route: string;
  name: string;
  menuItems?: IMenuItem[];
  description?: string;
  env?: string[];
  beta?: boolean;
  roles?: string[];
}

export enum MenuType {
  INTERNAL = "INTERNAL", // uses routerLink
  EXTERNAL = "EXTERNAL" // uses href appended to environments host
}
