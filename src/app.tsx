// App.tsx
const MyComponent = ({ className }: { className: string }) => {
  return <div className={className}>Hello World!!!</div>;
};

const App = () => {
  return (
    <div>
      <div>안녕?</div>
      <MyComponent className="111" />
    </div>
  );
};

export default App;
