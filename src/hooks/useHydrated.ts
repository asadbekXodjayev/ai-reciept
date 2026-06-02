'use client';

import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

/**
 * Returns false during SSR and the initial hydration render, then true.
 * SSR-safe (no setState-in-effect, no hydration mismatch) via
 * useSyncExternalStore's server vs client snapshots.
 */
export function useHydrated(): boolean {
    return useSyncExternalStore(
        noopSubscribe,
        () => true,
        () => false,
    );
}
