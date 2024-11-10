//@ts-check
import { createObservableSubject } from "../utils/ObservableSubject";

export function createKeydownSubject() {
    const subject = createObservableSubject();
    window.addEventListener("keydown", subject.notifyAll);
    return subject;
}