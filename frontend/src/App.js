//maintenance-app /frontend/src/App.js

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav'
import Home from './components/Home'
import ViewAll from './components/ViewAll'
import NewItem from './components/NewItem'
import UpdateItem from './components/UpdateItem'
import FilterStatus from './components/FilterStatus'

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Route component={Nav} />
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/view-all" component={ViewAll} />
        <Route exact={true} path="/new" component={NewItem} />
        <Route exact={true} path="/update/:id" component={UpdateItem} />
        <Route exact={true} path="/filter/status" component={FilterStatus} />
      </Switch>
     
     
     
     
     
     
     
     
     </BrowserRouter>
    </div>
  );
}

export default App;
