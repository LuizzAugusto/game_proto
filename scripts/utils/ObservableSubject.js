//@ts-check

/**
 * 
 * @typedef {(...args: any) => void} ObserverType
 */

/**
 * 
 * @typedef {Object} ObservableSubjectType
 * @property {ObserverType} notifyAll,
 * @property {(observer: ObserverType) => boolean} subscribe
 * @property {(observer: ObserverType) => boolean} unsubscribe
 */

/**
 * 
 * @returns {ObservableSubjectType}
 */
export function createObservableSubject() {
    /**
     * 
     * @type {ObserverType[]}
     */
    let state = [];
    return {
        notifyAll: (...args) => state.forEach(observer => observer(...args)),
        subscribe: (observer) => {
            const willSubscribe = !state.includes(observer);

            if (willSubscribe)
                state.push(observer);

            return willSubscribe;
        },
        unsubscribe: (observer) => {
            const newState = state.filter(obs => obs != observer);
            const unsub = newState.length < state.length;
            state = newState;
            return unsub;
        },
    }
}