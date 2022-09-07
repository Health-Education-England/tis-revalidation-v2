export interface FormControlBase {
  key: string;
  label?: string;
  initialValue: any;
  required?: boolean;
  order: number;
  controlType: string;
  text?: string;
  placeholder?: string;
  options?: { key: string; value: string }[];
}

export interface AutocompleteControl extends FormControlBase {
  serviceMethod: string;
}
