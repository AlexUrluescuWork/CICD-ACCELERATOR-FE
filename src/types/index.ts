export type CustomExpandIconProps<T> = {
  expanded: boolean;
  onExpand: (
    record: T,
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  record: T;
};

export interface IOptionDetails {
  name: string;
  sandBox: string | null;
  qa: string | null;
  uat: string | null;
  staging: string | null;
  production: string | null;
  [key: string]: string | null;
}

export interface IEnvDetails {
  rollback: IOptionDetails;
  deploymentDateTime: IOptionDetails;
  pipelineRun: IOptionDetails;
  changeLog: IOptionDetails;
  deploymentHistory: IOptionDetails;
}

export interface Inveronment {
  version: string;
  start: string;
  end: string;
  status: string;
}

export interface IntireObject {
  id: string;
  name: string;
  activity: number;
  status: string;
  sandBox: Inveronment | null;
  qa: Inveronment | null;
  uat: Inveronment | null;
  staging: Inveronment | null;
  production: Inveronment | null;
  details: IEnvDetails;
  [key: string]: Inveronment | string | number | IEnvDetails | null; // Index signature for dynamic keys
}

export enum EnvStatusTypes {
  LOADING = "loading",
  ACTIVE = "active",
  FAILURE = "failure",
}

export type TApplication = {
  label: string;
  value: string;
};

export type TInputsValues = {
  environment: string;
  gitBranch: string;
};
