export interface ControlBase {
  key: string;
  label?: string;
  initialValue: any;
  required?: boolean;
  order: number;
  controlType: string;
  text?: string;
  options?: { key: string; value: string }[];
}
