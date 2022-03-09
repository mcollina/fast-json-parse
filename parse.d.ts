export interface ParseResult<Return = object> {
  value:Return | null,
  err:Error | null
}
export function Parse<Return = object>(data:string): ParseResult<Return>;
