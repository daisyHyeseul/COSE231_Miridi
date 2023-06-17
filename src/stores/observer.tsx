import { useEffect, useRef, useState } from "react";
interface Observer {
  update: (value: boolean) => void;
}

export const ShiftKeyObserver = () => {
  const observers = useRef<Observer[]>([]);

  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      // 키보드 이벤트 핸들러 함수
      if (event.key === "Shift") {
        notifyObservers(true);
      }
    });

    document.addEventListener("keyup", function (event) {
      // 키보드 이벤트 핸들러 함수
      if (event.key === "Shift") {
        notifyObservers(false);
      }
    });

    return () => {
      window.removeEventListener("keydown", () => notifyObservers(true));
      window.removeEventListener("keyup", () => notifyObservers(false));
    };
  }, []);

  const addObserver = (observer: Observer) => {
    observers.current.push(observer);
  };

  const removeObserver = (observer: Observer) => {
    observers.current = observers.current.filter((obs) => obs !== observer);
  };

  const notifyObservers = (value: boolean) => {
    observers.current.forEach((observer) => observer.update(value));
  };

  return {
    addObserver,
    removeObserver,
  };
};
