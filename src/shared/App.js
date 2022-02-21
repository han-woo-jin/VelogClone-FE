import { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from '../components/Main';
import Sub from '../components/Sub';
import { ThemeProvider } from '../context/themeProvider';
import { GlobalStyle } from '../theme/GlobalStyles';
import './App.css';
import Login from '../pages/Login';
import Modal from '../components/Modal';
import PostWrite from '../pages/PostWrite';
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";
import PostDetail from "../pages/PostDetail"
function App() {
  return (
    <ConnectedRouter history={history}>
      <ThemeProvider>
        <GlobalStyle />
        <Suspense fallback={<div>...loading</div>}>
          <Switch>

            <Route exact path="/postdetail" component={PostDetail} />
            <Route exact path="/postwrite" component={PostWrite} />
            <Route exact path="/modal" component={Modal} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Main} />
            <Route exact path="/postdetail/:postId" component={Sub} />
          </Switch>
        </Suspense>
      </ThemeProvider>
    </ConnectedRouter>
  );
}

export default App;