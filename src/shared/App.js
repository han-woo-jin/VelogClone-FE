import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../components/Main';
import { ThemeProvider } from '../context/themeProvider';
import { GlobalStyle } from '../theme/GlobalStyles';
import './App.css';
import Login from '../pages/Login';
import Modal from '../components/Modal';
import PostWrite from '../pages/PostWrite';
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";
import PostDetail from "../pages/PostDetail"
import Search from "../pages/Search"

function App() {
  return (
    <ConnectedRouter history={history}>
      <ThemeProvider>
        <GlobalStyle />
        <Suspense fallback={<div>...loading</div>}>
          <Switch>
            <Route exact path="/search" component={Search} />
            <Route exact path="/postwrite" component={PostWrite} />
            <Route path="/postwrite/:postId" component={PostWrite} />
            <Route exact path="/modal" component={Modal} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Main} />
            <Route exact path="/detail/:postId" component={PostDetail} />
          </Switch>
        </Suspense>
      </ThemeProvider>
    </ConnectedRouter>
  );
}

export default App;
