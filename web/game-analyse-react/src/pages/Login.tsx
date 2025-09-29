import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!username || !password) {
      toast.error('请输入用户名和密码');
      return;
    }
    
    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      // In a real application, this would be an API call to your backend
      // For demo purposes, we'll just accept any credentials
      login(username);
      toast.success('登录成功！');
      navigate('/search');
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">
              <i className="fa-solid fa-gamepad text-yellow-400"></i>
            </div>
            <h1 className="text-2xl font-bold text-white">登录 GameReview Analytics</h1>
            <p className="text-indigo-200 mt-2">分析游戏评论，洞察玩家反馈</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-indigo-100 mb-2">用户名</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-user text-indigo-400"></i>
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-indigo-300/30 rounded-xl bg-white/5 backdrop-blur-sm text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                  placeholder="输入用户名"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-indigo-100 mb-2">密码</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-lock text-indigo-400"></i>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-indigo-300/30 rounded-xl bg-white/5 backdrop-blur-sm text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                  placeholder="输入密码"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-indigo-900 disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  登录中...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-sign-in-alt mr-2"></i>
                  登录
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-indigo-200">
              还没有账号？{' '}
              <Link 
                to="/register" 
                className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
              >
                创建账号
              </Link>
            </p>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-indigo-300/70 text-sm">
                <i className="fa-solid fa-info-circle mr-1"></i> 
                演示账号: test / 123456
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="text-indigo-200 hover:text-white transition-colors inline-flex items-center"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}