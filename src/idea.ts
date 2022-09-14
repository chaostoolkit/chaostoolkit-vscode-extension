import { Diagnostic } from "vscode-languageserver/node";
import * as types from "./types";

import * as exampleJSON from "./shopping-list.json";

const chars = [...JSON.stringify(exampleJSON, null, 2)];

interface Item {
  active: boolean;
  chars: string[];
  position: types.Position;
  index: number;
}

const blankPosition: types.Position = {
  start: [-1, -1],
  end: [-1, -1],
};

const blankItem: Item = {
  active: false,
  chars: [],
  position: blankPosition,
  index: -1,
};

function destructureJSON(
  charArray: string[],
  indexedStructure: Object,
  diagnostics: Diagnostic[]
) {
  if (charArray[0] !== "{" || charArray[-1] !== "}") {
    // Error
  }

  let line = 1;
  let character = 0;
  let key: Item = blankItem;
  let value: Item = blankItem;
  let pairIndex = 0;

  for (let i = 1; i < chars.length - 1; i++) {
    let char = chars[i];

    if (char === " ") {
      character += 1;
      continue;
    }

    if (char === "\\n") {
      line += 1;
      character = 0;
      continue;
    }

    if (!key.active && !value.active) {
      if (char === ":") {
        if (pairIndex) {
          // Error
        }
        if (!key.chars.length) {
          // Error
        }
        // Add key to struct
        key = blankItem;
        pairIndex = 1;
        character += 1;
        continue;
      } else if (char === ",") {
        if (!pairIndex) {
          // Error
        }
        if (!value.chars.length) {
          // Error
        }
        // Add value to struct
        value = blankItem;
        pairIndex = 0;
        character += 1;
        continue;
      }
    }

    if (!pairIndex) {
      if (!key.active) {
        if (char !== '"') {
          // Error
        }
        key.index = i;
        key.position.start = [line, character];
        key.active = true;
      } else {
        if (char === '"' && chars[i - 1] !== "\\") {
          key.position.end = [line, character];
          key.chars = chars.slice(key.index, i + 1);
          key.active = false;
        }
      }
    } else {
      if (!value.active) {
        // Differentiate between values
      } else {
        // Something
      }
    }

    character += 1;
  }
}
