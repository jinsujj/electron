import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  hello: () => 'world'
});

contextBridge.exposeInMainWorld('todoAPI',{
  getTodos: () => ipcRenderer.invoke('get-todos'),
  addTodo: (title: string) => ipcRenderer.invoke('add-todo',title),
  toggleTodo: (id:number) => ipcRenderer.invoke('toggle-todo', id),
});