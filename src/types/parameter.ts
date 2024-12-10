export type RevitParameterType = 'NUMBER' | 'LENGTH' | 'AREA' | 'VOLUME' | 'ANGLE' | 'OTHER';
export type RevitParameterUnit = 'GENERAL' | 'PERCENTAGE' | 'INCHES' | 'FEET' | 'SQUARE_FEET' | 'CUBIC_FEET' | 'DEGREES' | 'SLOPE_DEGREES';

export interface Parameter {
  id: string;
  name: string;
  type: RevitParameterType;
  unit: RevitParameterUnit;
  values: string[];
  description?: string;
}

export interface ParameterSet {
  id: string;
  name: string;
  parameters: Parameter[];
  created: Date;
}