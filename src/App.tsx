import React from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import SignIn from './pages/SignIn';
import ResForm from './pages/ResForm';
import MakeForm from './pages/MakeForm/Main';
import MakeFormSelect from './pages/MakeForm/Select';
import MakeFormDirect from './pages/MakeForm/Direct';
import MakeFormChatbot from './pages/MakeForm/Chatbot';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path={'/signup'} element={<SignUp />} />
            <Route path={'/mypage'} element={<MyPage />} />
            <Route path={'/signin'} element={<SignIn />} />
            <Route path={'/resform'} element={<ResForm />} />
            <Route path={'/makeform'} element={<MakeForm />} />
            <Route path={'/makeform/select'} element={<MakeFormSelect />} />
            <Route path={'/makeform/direct'} element={<MakeFormDirect />} />
            <Route path={'/makeform/chatbot'} element={<MakeFormChatbot />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
