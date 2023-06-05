import { injectable } from "inversify";
import NodeCache from "node-cache";

@injectable()
export class CacheService {
  private readonly cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({ stdTTL: 600, checkperiod: 700 });
  }

  public get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  public set<T>(key: string, value: T, cacheTime?: number): void {
    this.cache.set<T>(key, value, cacheTime || 600);
  }

  public async wrap<T>(
    cacheKey: string,
    cachedService: () => Promise<T>,
    cacheTime?: number
  ): Promise<T> {
    let cachedValue = this.get(cacheKey) as T | undefined;
    if (cachedValue) return cachedValue;

    cachedValue = await cachedService();
    if (cachedValue !== undefined) this.set(cacheKey, cachedValue, cacheTime);

    return cachedValue;
  }

  public del(key: string): void {
    this.cache.del(key);
  }
}
