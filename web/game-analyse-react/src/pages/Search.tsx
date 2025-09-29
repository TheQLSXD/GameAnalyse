import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';

// Mock game data for demonstration
const popularGames = [
  { id: 'kr5', name: '王国保卫战 5：联盟', genre: '塔防', releaseDate: '2025-01-15', imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Kingdom+Rush+Alliance+game+cover+artwork&sign=d52036389602a069900ed2ed428a69ef' },
  { id: 'eldenring', name: '艾尔登法环', genre: '动作角色扮演', releaseDate: '2022-02-25', imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Elden+Ring+game+cover+artwork&sign=cb6bc40602f89120f97ec71b2e26e3dc' },
  { id: 'starfield', name: '星空', genre: '角色扮演', releaseDate: '2023-09-06', imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Starfield+game+cover+artwork&sign=277d4e1e376262514d97102f0b3cba30' },
  { id: 'bg3', name: '博德之门3', genre: '角色扮演', releaseDate: '2023-08-31', imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Baldurs+Gate+3+game+cover+artwork&sign=d071bb78b1088e8c53e51def03e5c884' },
  { id: 'diablo4', name: '暗黑破坏神IV', genre: '动作角色扮演', releaseDate: '2023-06-06', imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Diablo+4+game+cover+artwork&sign=95db2dc49a241bdca92eaed1bae141f6' },
  { id: 'hogwarts', name: '霍格沃茨之遗', genre: '动作角色扮演', releaseDate: '2023-02-10', imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Hogwarts+Legacy+game+cover+artwork&sign=376403c0ecbe4e455e71a948cabd2ef2' },
];

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(popularGames);
  const [isSearching, setIsSearching] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      toast.info('请输入游戏名称');
      setSearchResults(popularGames);
      return;
    }
    
    setIsSearching(true);
    
    // Mock search functionality
    setTimeout(() => {
      const results = popularGames.filter(game => 
        game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setSearchResults(results);
      
      if (results.length === 0) {
        toast.info(`未找到与"${searchTerm}"相关的游戏`);
      } else {
        toast.success(`找到 ${results.length} 个游戏`);
      }
      
      setIsSearching(false);
    }, 800);
  };
  
  const handleGameSelect = (gameId: string) => {
    navigate(`/report/${gameId}`);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
      {/* Header */}
      <header className="py-6 px-8 flex justify-between items-center bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="text-xl font-bold flex items-center">
          <i className="fa-solid fa-gamepad mr-3 text-yellow-400"></i>
          <span>GameReview Analytics</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="relative group">
            <button className="flex items-center space-x-1 text-indigo-100 hover:text-white transition-colors">
              <span>{currentUser}</span>
              <i className="fa-solid fa-chevron-down text-xs"></i>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md rounded-xl py-2 hidden group-hover:block z-10 border border-white/20">
              <button 
                onClick={logout}
                className="w-full text-left px-4 py-2 text-indigo-100 hover:bg-white/20 rounded-lg transition-colors flex items-center"
              >
                <i className="fa-solid fa-sign-out-alt mr-2"></i>退出登录
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Search Section */}
      <section className="py-12 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">游戏评论分析</h1>
          
          <form onSubmit={handleSearch} className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜索游戏名称或类型..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all text-white placeholder-indigo-300/60 text-lg"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fa-solid fa-search text-indigo-400 text-xl"></i>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 flex items-center justify-center whitespace-nowrap"
              >
                {isSearching ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                    搜索中...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-search mr-2"></i>
                    搜索游戏
                  </>
                )}
              </button>
            </div>
          </form>
          
          {/* Search Results */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {searchTerm ? `搜索结果: "${searchTerm}"` : '热门游戏'}
              </h2>
              <span className="text-indigo-300 bg-white/10 px-3 py-1 rounded-full text-sm">
                {searchResults.length} 个游戏
              </span>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map(game => (
                  <div 
                    key={game.id}
                    className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:border-yellow-500/50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                    onClick={() => handleGameSelect(game.id)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={game.imageUrl} 
                        alt={game.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 py-2 rounded-lg font-medium transition-colors">
                            <i className="fa-solid fa-chart-line mr-2"></i>查看分析报告
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold mb-1 group-hover:text-yellow-400 transition-colors">{game.name}</h3>
                      <div className="flex justify-between items-center text-indigo-300 text-sm">
                        <span>{game.genre}</span>
                        <span>{game.releaseDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-6xl mb-4 text-indigo-800">
                  <i className="fa-solid fa-search"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">未找到游戏</h3>
                <p className="text-indigo-300 max-w-md">
                  尝试使用不同的关键词或浏览热门游戏列表
                </p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSearchResults(popularGames);
                  }}
                  className="mt-6 text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                >
                  查看热门游戏
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-6 px-8 text-center text-indigo-300/60 text-sm border-t border-white/10 mt-12">
        <p>© 2025 GameReview Analytics. 保留所有权利。</p>
      </footer>
    </div>
  );
}