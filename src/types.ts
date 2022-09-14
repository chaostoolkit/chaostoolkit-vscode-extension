export interface Experiment {
  title: string;
  description: string;
  tags?: string[];
  extensions?: Extension[];
  configuration?: Configuration;
  secrets?: Secrets;
  steadyStateHypothesis?: SteadyStateHypothesis;
  method: Method;
  rollbacks?: Rollback[];
  controls?: Control[];
}

export interface Extension {
  name: string;
}

export type Configuration = Object;

export type Secrets = Object;

export interface SteadyStateHypothesis {
  title: string;
  probes?: Probe[];
  controls?: Control[];
}

export type Probe = Activity & {
  tolerance: boolean | number | any[] | string | Tolerance;
};

export type Activity = ProbeActivity | ActionActivity;

export interface ProbeActivity extends BaseActivity {
  type: "probe";
}

export interface ActionActivity extends BaseActivity {
  type: "action";
}

export interface BaseActivity {
  ref?: string;
  name: string;
  provider: Provider;
  timeout?: number;
  pauses?: Pauses;
  background?: boolean;
  controls?: Control[];
}

export type Provider = PythonProvider | ProcessProvider | HTTPProvider;

export interface PythonProvider {
  type: "python";
  module: string;
  func: string;
  arguments?: { [key: string]: any };
}

export interface ProcessProvider {
  type: "process";
  path: string;
}

export interface HTTPProvider {
  type: "http";
  url: string;
  headers?: { [key: string]: string };
}

export interface Pauses {
  before?: string;
  after?: string;
}

export type Tolerance =
  | ProbeTolerance
  | RegExTolerance
  | JSONPathTolerance
  | RangeTolerance;

export type ProbeTolerance = ProbeActivity;

export interface RegExTolerance {
  type: "regex";
  pattern: string;
}

export interface JSONPathTolerance {
  type: "jsonpath";
  path: string;
}

export interface RangeTolerance {
  type: "range";
  range: [number, number];
}

export type Control = PythonControl | BaseControl;

export interface PythonControl extends BaseControl {
  module: string;
}

export interface BaseControl {
  ref?: string;
  name: string;
  provider: ControlProvider;
  scope?: string;
}

export type ControlProvider = PythonControlProvider | BaseControlProvider;

export interface PythonControlProvider {
  type: "python";
  module: string;
}

export interface BaseControlProvider {
  type: string;
}

export type Method = Activity[];

export type Rollback = Activity;

