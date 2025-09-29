import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!username || !email || !password || !confirmPassword) {
      toast.error('请填写所有字段');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('密码不匹配');
      return;
    }
    
    if (password.length < 6) {
      toast.error('密码长度至少为6个字符');
      return;
    }
    
    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      // In a real application, this would be an API call to your backend
      toast.success('注册成功！请登录');
      navigate('/login');
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">
              <i className="fa-solid fa-user-plus text-yellow-400"></i>
            </div>
            <h1 className="text-2xl font-bold text-white">创建账号</h1>
            <p className="text-indigo-200 mt-2">加入 GameReview Analytics</p>
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
              <label htmlFor="email" className="block text-sm font-medium text-indigo-100 mb-2">电子邮箱</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-envelope text-indigo-400"></i>
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-indigo-300/30 rounded-xl bg-white/5 backdrop-blur-sm text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                  placeholder="输入电子邮箱"
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
                  placeholder="输入密码 (至少6个字符)"
                  required
                  minLength={6}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-indigo-100 mb-2">确认密码</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-lock-open text-indigo-400"></i>
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-indigo-300/30 rounded-xl bg-white/5 backdrop-blur-sm text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                  placeholder="再次输入密码"
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
                  创建中...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-user-plus mr-2"></i>
                  创建账号
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-indigo-200">
              已有账号？{' '}
              <Link 
                to="/login" 
                className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
              >
                登录
              </Link>
            </p>
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