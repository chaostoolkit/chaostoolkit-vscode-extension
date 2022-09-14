export interface IndexedObject {
  [key: string]: BaseProperty | ObjectProperty | ArrayProperty;
}

export interface BaseProperty {
  key: Position;
  value: Position;
}

export interface Position {
  start: [number, number];
  end: [number, number];
}

export interface ObjectProperty extends BaseProperty {
  properties: IndexedObject;
}

export interface ArrayProperty extends BaseProperty {
  items: IndexedObject[];
}
