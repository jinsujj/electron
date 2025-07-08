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

