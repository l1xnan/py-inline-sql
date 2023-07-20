import sqlFormatter from "@sqltools/formatter";
import { jinjaDialect } from "./dialect";
import { FormatOptions, formatDialect } from "sql-formatter";

import * as prettier from "prettier";
import * as plugin from "prettier-plugin-sql-cst";

function _placeholder(content: string, callback: any) {
  let placeholders = new Map();
  let i = 1;
  let tmpText = content.replaceAll(/\{{1,}[^{}]*?\}{1,}/g, (item) => {
    const key = `___${i}___`;
    placeholders.set(key, item);
    i += 1;
    return key;
  });

  let res = callback(tmpText);
  console.log("===\n", res);
  for (let [key, val] of placeholders) {
    res = res.replace(key, val);
  }
  return res;
}

// @sqltools/formatter
export function format1(content: string): string {
  return _placeholder(content, (content: string) =>
    sqlFormatter.format(content, {
      reservedWordCase: "lower",
    })
  );
}

// sql-formatter
export function format2(content: string): string {
  const config: Partial<FormatOptions> = {
    keywordCase: "lower",
    tabWidth: 2,
  };

  return formatDialect(content, {
    dialect: jinjaDialect,
    ...config,
  });
}

// prettier-plugin-sql-cst
export function format3(content: string) {
  return _placeholder(content, (content: string) =>
    prettier.format(content, {
      parser: "bigquery",
      plugins: [plugin],
    })
  );
}
