// Only source-audited metadata belongs here. The factory is a metadata receiver,
// never the native execution, speculative, argument-stream, or lifecycle owner.
const values = [
  "name", "label", "strict", "loadMode", "deferrable", "hidden", "readsSkillUris",
  "summary", "examples", "customFormat", "customWireName", "promptGuidelines",
  "lenientArgValidation", "mode",
] as const;
const methods = [
  "approval", "formatApprovalDetails", "concurrency", "interruptible", "matcherDigest",
  "matcherPaths", "matcherEntries", "intent", "shellEnv",
] as const;

export function nativeDefinition(native: object): Record<string, any> {
  const definition: Record<string, any> = {};
  for (const key of [...values, ...methods]) {
    if (!(key in native)) continue;
    Object.defineProperty(definition, key, {
      enumerable: true,
      configurable: true,
      get() {
        const value = (native as Record<string, any>)[key];
        // ArkType schemas are callable. Only reviewed method slots are bound;
        // schema-like values retain their validator/JSON-schema surface intact.
        return methods.includes(key as typeof methods[number]) && typeof value === "function"
          && typeof value.toJsonSchema !== "function" && typeof value.bind === "function"
          ? value.bind(native) : value;
      },
    });
  }
  return definition;
}
