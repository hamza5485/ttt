import React from 'react';
const Board = React.lazy(() => import('./components/app/board'));

const App = () => {

    return (
        <React.Suspense fallback={
            <div>
                Loading...
            </div>
        }>
            <div className="App">
                <Board />
            </div>
        </React.Suspense>
    );
};

export default App;
