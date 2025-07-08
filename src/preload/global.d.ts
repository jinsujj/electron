import { promises } from "original-fs";

export type Todo = {
  id: number; 
  title: string; 
  completed: number
};

declare global {
  interface Window {
    api?: {
      hello: () => string;
    },
    todoAPI: {
      getTodos:() => promises<Todo[]>;
      addTodo:(title:string) => promises<Todo>;
      toggleTodo:(id:number) => promises<void>;
    };
  }
}
