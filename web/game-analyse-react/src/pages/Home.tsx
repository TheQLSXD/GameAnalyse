import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';

export default function Home() {
  const { isAuthenticated, currentUser, logout } = useContext(AuthContext);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white flex flex-col">
      {/* Header */}
      <header className="py-6 px-8 flex justify-between items-center">
        <div className="text-2xl font-bold flex items-center">
          <i className="fa-solid fa-gamepad mr-3 text-yellow-400"></i>
          <span>GameReview Analytics</span>
        </div>
        <nav>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm opacity-80">欢迎, {currentUser}</span>
              <Link 
                to="/search" 
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/50"
              >
                游戏搜索
              </Link>
              <button 
                onClick={logout}
                className="bg-transparent border border-white/30 hover:border-white/50 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
              >
                退出登录
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link 
                to="/login" 
                className="bg-transparent border border-white/30 hover:border-white/50 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
              >
                登录
              </Link>
              <Link 
                to="/register" 
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/50"
              >
                注册
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            深入分析游戏评论<br />
            <span className="text-yellow-400">洞察玩家真实反馈</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 text-indigo-100 opacity-90">
            我们通过多维度分析游戏评论，帮助您了解玩家对游戏的真实评价和潜在问题，
            为游戏改进提供数据支持。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to={isAuthenticated ? "/search" : "/login"} 
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-xl hover:shadow-yellow-500/50 transform hover:-translate-y-1"
            >
              {isAuthenticated ? '开始分析' : '立即登录'}
            </Link>
            <Link 
              to={isAuthenticated ? "/search" : "/register"} 
              className="bg-transparent border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300"
            >
              {isAuthenticated ? '浏览游戏' : '免费注册'}
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-20 px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">强大的分析功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-500/30 rounded-xl flex items-center justify-center mb-6">
                <i className="fa-solid fa-chart-line text-2xl text-blue-400"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">多维度数据分析</h3>
              <p className="text-indigo-100 opacity-80">
                从社区运营、游戏设计、技术开发和产品决策等多个角度分析玩家反馈，提供全面洞察。
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-purple-500/30 rounded-xl flex items-center justify-center mb-6">
                <i className="fa-solid fa-comments text-2xl text-purple-400"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">情感倾向分析</h3>
              <p className="text-indigo-100 opacity-80">
                智能识别玩家评论中的情感倾向，快速定位潜在的负面情绪和风险点。
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-green-500/30 rounded-xl flex items-center justify-center mb-6">
                <i className="fa-solid fa-lightbulb text-2xl text-green-400"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">改进建议生成</h3>
              <p className="text-indigo-100 opacity-80">
                基于玩家反馈自动生成可行的改进建议，帮助游戏开发者快速响应社区需求。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 text-center text-indigo-200 opacity-70 text-sm">
        <p>© 2025 GameReview Analytics. 保留所有权利。</p>
      </footer>
    </div>
  );
}