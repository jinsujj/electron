yarn init -y    

yarn add react react-dom 
yarn add -D typescript vite @vitejs/plugin-react
yarn add -D electron

yarn add -D concurrently cross-env
- concurrently: Electron과 Vite를 동시에 실행
- cross-env: OS에 상관없이 환경변수 설정


mkdir -p src/main
- Electron 메인 프로세스
mkdir -p src/preload
- src/preload → Renderer와 안전하게 통신하는 bridge
mkdir -p src/renderer
- React + Vite UI


yarn tsc --init

## tsconfig.js 
"module": "commonjs"
 - require, module.exports 방식 ( Node.js 전통적인 방식)
"module": "ESNext"
 - import, export 유지 ( 최신 브라우자, 번틀러 (Vite, webpack))

"lib": ["DOM", "ES2020"]
- TypeScript가 코드 작성 시 어떤 전역 API를 쓸 수 있는지 결정하는 설정입니다. lib 를 지정해야 오류가 안나고, 자동완성도 정확 
- "DOM"
    - window, document, HTMLElement, fetch, Event, setTimeout 등 
- "ES2020"  
    - BigInt, Promise.allSettled, globalThis, String.prototype.matchAll 

"include": ["src"]
-  TypeScript가 어떤 파일들을 "타입 검사하고 컴파일할지" 결정하는 설정입니다.



## 배포 
yarn add -D electron-builder

```
electron-vite/
  package.json
  vite.config.ts
  src/
    main/         # Electron 메인 프로세스 (Node.js, DB, IPC)
      db/
        init.js   # DB 초기화 (현재 비어있음)
      index.ts    # Electron 메인 엔트리, IPC 핸들러
    preload/      # Preload 스크립트 (contextBridge, 타입 선언)
      global.d.ts
      index.ts
    renderer/     # 프론트엔드(React)
      App.tsx
      index.html
      main.tsx
      TodoList.tsx
```

- main/: Electron 메인 프로세스, DB 접근, IPC 핸들러
- preload/: Renderer와 main 간 안전한 브릿지, 타입 선언
- renderer/: React 기반 UI