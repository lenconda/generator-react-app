import React, { Suspense } from 'react';
import './App.<%= extension %>';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

const Home = React.lazy(() => import('./pages/Hello'));

const App = () => {
  return (
    <Suspense fallback="Loading...">
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default App;
