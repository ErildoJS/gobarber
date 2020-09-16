import React from 'react';
import GlobalStyle from './styles/global'
import {AuthProvider} from './context/AuthContext'
//import SignUp from './pages/SignUp'
import Signin from './pages/SignIn'

const App: React.FC = () => (
  <> 
  <AuthProvider>
    <Signin />
  </AuthProvider>
  
  <GlobalStyle />
  </>
)

export default App;
