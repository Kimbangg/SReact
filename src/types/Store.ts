export interface Action {
  type: string;
  payload?: { [option: string]: any };
  [option: string]: any;
}
