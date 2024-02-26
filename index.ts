export class StringUnique {
  private $values: string[]
  private $length: number

  constructor(values: string[]) {
    const sanitized = []

    for (let i = 0; i < values.length; i++) {
      sanitized.push(this.sanitizer(values[i]))
    }

    this.$values = sanitized.length ? sanitized : []
    this.$length = this.$values.length
  }

  /**
   * Current collection values
   */
  get values(): string[] {
    return this.$values
  }

  /**
   * Last calculated size of the collection
   */
  get size(): number {
    return this.$length
  }

  /**
   * Eliminates all potential security risks from given values
   */
  private sanitizer(value: string): string {
    const map: { [x: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;',
    }

    return value
      .replaceAll('javascript', '')
      .replaceAll('data:', '')
      .replaceAll(/[&<>"'`=\/]/g, (s) => map[s])
  }

  /**
   * Adds a new value to the end of the collection
   */
  public add(value: string): void {
    const cached = new Set<string>(this.$values)
    cached.add(this.sanitizer(value))

    this.$values = Array.from(cached)
    this.$length++
  }

  /**
   * Note that, this function clear the original collection values
   */
  public clear(): void {
    this.$values = []
    this.$length = 0
  }

  /**
   * Removes the specified element from the collection
   * and returns the new collection if the size is not (zero) 0
   */
  public delete(value: string): string[] | null {
    const cached = new Set<string>(this.$values)

    if (cached.has(value)) {
      cached.delete(value)
    } else {
      throw new Error('The value you want to delete is not in the initial object')
    }

    if (cached.size) {
      this.$values = Array.from(cached)
      this.$length = cached.size

      return Array.from(cached)
    } else {
      return null
    }
  }

  /**
   * Calls a defined callback function on each element of an collection,
   * and returns an collection that contains the results.
   */
  public each(callback: (value: string, index: number, array: string[]) => void): void[] | null {
    if (!this.$values || !this.$values.length) return null
    return this.$values.map(callback)
  }

  /**
   * A boolean indicating whether a value exists in the collection or not.
   */
  public has(values: string): boolean {
    const old = new Set<string>(this.$values)
    return old.has(values)
  }

  /**
   * Checks whether the original collection contains the same elements
   * as the given collection.
   */
  public contain(values: string[]): boolean {
    const old = new Set<string>(this.$values)
    const given = new Set<string>(values)

    return [...old].some((v) => given.has(v))
  }

  /**
   * Checks strict equality
   */
  public equal(values: string[]): boolean {
    const old = new Set<string>(this.$values)
    const given = new Set<string>(values)

    return old.size === given.size && [...old].every((v) => given.has(v))
  }

  /**
   * Merges two collections without duplicate values and returns the new collection
   */
  public merge(values: string[]): StringUnique {
    const obj = new Set<string>(this.$values)

    for (const v of values) {
      obj.add(this.sanitizer(v))
    }

    this.$length = obj.size
    return new StringUnique(Array.from(obj))
  }

  /**
   * Checks the collection containing that are present within both collections and returns the new collection
   */
  public both(values: string[]): StringUnique {
    const cached = new Set<string>()

    const old = new Set(this.$values)
    const given = new Set(values)

    for (const v of old) {
      if (given.has(v)) cached.add(this.sanitizer(v))
    }

    this.$length = cached.size
    return new StringUnique(Array.from(cached))
  }

  /**
   * Finds the difference between the original collection and the given collection,
   * checks for all elements in the original collection that are not in the given collection
   */
  public diff(values: string[]): StringUnique {
    const old = new Set<string>(this.$values)
    const given = new Set<string>(values)

    for (const v of old) {
      if (given.has(v)) old.delete(v)
    }

    this.$length = old.size
    return new StringUnique(Array.from(old))
  }

  /**
   * Finds the symmetric difference between two collections, checks for all items
   * found in one of the two collections but not in both
   */
  public same(values: string[]): StringUnique {
    const old = new Set<string>(this.$values)
    const given = new Set<string>(values)

    for (const v of given) {
      if (old.has(v)) {
        given.delete(v)
        old.delete(v)
      }
    }

    const cached = new Set<string>([...given, ...old])

    this.$length = cached.size
    return new StringUnique(Array.from(cached))
  }

  /**
   * If all items in the first collection appear in the second collection, it checks
   * whether the given collection is a subset of the original collection.
   */
  public includes(values: string[]): boolean {
    let bool: boolean = false

    const old = new Set<string>(this.$values)
    const given = new Set<string>(values)

    for (const v of old) {
      if (given.has(v)) {
        bool = true
      } else {
        bool = false
      }
    }

    return bool
  }

  /**
   * Checks whether the common elements of the original collection and the
   * given collection are the same.
   */
  public disjoint(values: string[]): boolean {
    const old = new Set<string>(this.$values)
    const given = new Set<string>(values)

    return [...old].every((v) => !given.has(v))
  }
}

export default StringUnique
