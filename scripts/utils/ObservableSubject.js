//@ts-check
/**
 * 
 * @returns {import("./types").ObservableSubjectType}
 */
export function createObservableSubject() {
  /**
   * 
   * @type {import("./types").ObserverType[]}
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