function getValue<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key] // ok111111
  }