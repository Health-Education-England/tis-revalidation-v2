export interface FormControlBase {
  key: string;
  label?: string;
  value?: string;
  valueProperty?: string;
  initialValue?: any;
  required?: boolean;
  order: number;
  controlType: string;
  text?: string;
  placeholder?: string;
  filterType?: string;
  options?: {
    key: string;
    value?: string;
    valueProperty?: string;
  }[];
}
export interface DatePickerControl extends FormControlBase {
  type: "fixed" | "range";
}
export interface AutocompleteControl extends FormControlBase {
  minLengthTerm?: number;
  data?: string[];
}

export enum FormControlType {
  AUTOCOMPLETE = "autocomplete",
  SELECTION_LIST = "selectionList",
  CHECKBOX = "checkbox",
  DATERANGEPICKER = "daterangepicker"
}
