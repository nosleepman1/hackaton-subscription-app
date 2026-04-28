// Cache en mémoire singleton : survit aux démontages de composants React
// Évite les appels API redondants (anti-pattern N+1)

interface CacheEntry<T> {
  data: T
  timestamp: number // horodatage de mise en cache (Date.now())
}

const TTL_MS = 5 * 60 * 1000 // durée de vie : 5 minutes

const cache = new Map<string, CacheEntry<unknown>>()

const queryCache = {
  // Récupère une entrée si elle existe et n'est pas expirée
  get<T>(key: string): T | null {
    const entry = cache.get(key) as CacheEntry<T> | undefined
    if (!entry) return null
    if (Date.now() - entry.timestamp > TTL_MS) {
      cache.delete(key) // supprime l'entrée expirée
      return null
    }
    return entry.data
  },

  // Enregistre une nouvelle entrée dans le cache
  set<T>(key: string, data: T): void {
    cache.set(key, { data, timestamp: Date.now() })
  },

  // Vérifie si une clé valide existe dans le cache
  has(key: string): boolean {
    return queryCache.get(key) !== null
  },

  // Invalide une clé spécifique (après mutation)
  invalidate(key: string): void {
    cache.delete(key)
  },

  // Invalide toutes les clés commençant par un préfixe (ex: 'projects')
  invalidatePrefix(prefix: string): void {
    for (const key of cache.keys()) {
      if (key.startsWith(prefix)) cache.delete(key)
    }
  },

  // Vide entièrement le cache (ex: à la déconnexion)
  invalidateAll(): void {
    cache.clear()
  },
}

export default queryCache
