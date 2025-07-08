export default function App() {
  return (
    <div>
      <h1>Hello from React + Vite + Electron!</h1>
      <p>
        {window.api?.hello ? window.api.hello() : 'preload 연결 안 됨 (dev?)'}
      </p>
    </div>
  );
}
