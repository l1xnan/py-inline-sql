import { formatDialect, bigquery, DialectOptions } from "sql-formatter";

// extend Hive dialect with additional quote types: {{..}} and {%..%}
export const jinjaDialect: DialectOptions = {
  tokenizerOptions: {
    ...bigquery.tokenizerOptions,
    stringTypes: [
      ...bigquery.tokenizerOptions.stringTypes,
      { regex: String.raw`\{\{.*?\}\}` },
      { regex: String.raw`\{%.*?%\}` },
      { regex: String.raw`\{.*?\}` },
    ],
  },
  formatOptions: {
    ...bigquery.formatOptions,
  },
};

console.log(
  formatDialect("SELECT {{ template-syntax }}", { dialect: jinjaDialect })
);
