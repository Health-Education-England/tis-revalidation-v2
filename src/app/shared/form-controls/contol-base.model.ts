export interface ControlBase {
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

export interface MaterialAutocompleteControl extends ControlBase {
  allowMultipleSelections?: boolean;
  serviceMethod: string;
}
