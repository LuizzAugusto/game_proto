export type ObserverType = (...args: any) => void;
export type ObservableSubjectType = {
    notifyAll: ObserverType,
    subscribe: (observer: ObserverType) => boolean,
    unsubscribe: (observer: ObserverType) => boolean,
}