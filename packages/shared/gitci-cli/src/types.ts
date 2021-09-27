export enum Flag {
  HELP = "help",
  RELEASE = "release",
  VERSION = "verison"
}

export interface PromptAnswer<T = string> {
  name: string;
  value: T;
}