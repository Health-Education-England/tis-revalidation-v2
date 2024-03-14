export interface FormControlBase {
  pageFilters?: string[];
  key: string;
  label?: string;
  initialValue?: any;
  required?: boolean;
  order?: number;
  controlType: string;
  text?: string;
  placeholder?: string;
  options?: { key: string; value: string }[];
}

export interface AutocompleteControl extends FormControlBase {
  minLengthTerm?: number;
  data?: string[];
}

export enum FormControlType {
  AUTOCOMPLETE = "autocomplete",
  SELECTION_LIST = "selectionList",
  RADIO = "radio",
  DATE_PICKER = "datePicker"
}
