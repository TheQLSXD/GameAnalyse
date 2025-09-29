import { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { formatDate } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock game report data based on the provided template
const gameReportData = {
  title: "王国保卫战 5：联盟",
  analysisTime: "2025-07-25 16:40:04",
  analysisMode: "多角色协作分析 (社区运营 → 设计师 → 开发者 → 制作人)",
  topics: [
    {
      id: 1,
      title: "优化塔防体验与增加游戏多样性",
      priority: "high",
      coreFeedback: "玩家对游戏的创新性和防御塔之间的平衡性表示赞赏，但同时也表达了对于塔位数量减少、兵种种类较少以及部分怪物生命值过高的担忧。",
      discussionScale: "约 1037 人参与 (28.6%)",
      mainLanguage: "merged",
      professionalAnalysis: {
        community: {
          sentiment: "玩家的情绪主要表现为'赞赏但希望更好'。他们认可游戏的创新和防御塔的平衡性，但也表达了对于单位数量、怪物强度以及某些机制上的担忧。",
          supportingPoints: [
            "游戏增加了更多可操控单位，带来了一定程度上的RTS体验",
            "防御塔之间的平衡做得不错，每种塔都有其独特作用"
          ],
          opposingPoints: [
            "塔位数量减少影响了塔防游戏的经典体验",
            "兵种种类较少，限制了策略多样性",
            "部分小怪的生命值过高，与防御塔的能力差距过大",
            "虽然有创新性的塔如幽冥战魂，但伴随而来的bug也较多"
          ],
          riskAssessment: "中等。尽管目前没有明显的负面评论爆发趋势，但是关于游戏机制（特别是塔位减少和怪物强度）的意见分歧可能成为潜在的风险点。",
          responseSuggestion: "积极沟通，承认问题。针对玩家提出的合理建议给予正面反馈，并承诺会考虑在未来更新中优化相关方面。"
        },
        design: {
          coreIssues: [
            "塔位数量减少影响了经典塔防体验",
            "兵种种类较少，限制了策略多样性",
            "部分小怪的生命值过高，与防御塔的能力差距过大",
            "创新性塔如幽冥战魂带来的bug"
          ],
          solutions: [
            {
              name: "动态塔位系统",
             理念: "通过引入一个可以根据玩家选择而变化的塔位布局机制，既保留了传统塔防游戏的乐趣，又增加了策略深度。",
              implementation: "在每个关卡开始前，允许玩家从几种预设的塔位配置中选择一种，或者使用有限次数的机会自定义塔位布局。"
            },
            {
              name: "多样化兵种及怪物AI升级",
             理念: "增加更多类型的单位不仅能够丰富玩家的战略选项，还能通过改进怪物的人工智能使战斗过程更加有趣、不可预测。",
              implementation: "开发新的兵种类型，包括但不限于远程攻击者、近战坦克、支援角色等，并确保它们之间存在明显的差异性和互补性。"
            }
          ]
        },
        development: {
          issuesConfirmation: [
            { issue: "塔位数量减少影响了经典塔防体验", confirmed: true },
            { issue: "兵种种类较少，限制了策略多样性", confirmed: true },
            { issue: "部分小怪的生命值过高", confirmed: true },
            { issue: "创新性塔如幽冥战魂带来的bug", confirmed: false }
          ],
          technicalAssessment: [
            {
              solution: "动态塔位系统",
              feasibility: "高",
              workload: "中",
              risks: [
                "需要设计一套灵活但又易于理解的用户界面",
                "确保不同配置间的平衡性可能需要大量的测试和调整"
              ],
              suggestion: "考虑到实现难度及对用户体验的影响，建议先在少数几个关卡上试点该功能"
            },
            {
              solution: "多样化兵种及怪物AI升级",
              feasibility: "中",
              workload: "高",
              risks: [
                "新单位类型的引入将显著增加美术资源的需求",
                "改进怪物AI涉及到复杂的算法设计"
              ],
              suggestion: "分阶段实施此计划，首先专注于扩大兵种类型并优化现有怪物的行为模式"
            }
          ],
          alternativeSolutions: [
            "针对塔位问题: 提供一种'扩展包'形式的内容更新，允许玩家通过购买或完成特定挑战来解锁额外的塔位选项",
            "针对兵种多样性不足: 考虑与其他IP合作推出限时活动，期间内加入特殊单位供玩家体验"
          ]
        },
        product: {
          keyInsights: "引入动态塔位系统以增强策略深度和个性化体验；同时，通过增加新的兵种类型及优化怪物AI来丰富游戏内容并提高可玩性。",
          developmentInsight: "动态塔位系统的开发工作量适中且技术可行性高，但需注意用户界面设计和配置间的平衡性调整。",
          productInsight: "积极回应玩家反馈，承诺在未来更新中解决他们关心的问题。同时，利用限时活动或合作IP的方式快速提供新内容。"
        }
      },
      representativeComments: [
        "本作可操控的单位大幅上升，甚至有一点点rts的味道了，也许为了平衡难度，塔位数量大幅下降",
        "不过整个兵种太少了），例如飞斧兵和圣骑士，这样就能选择远程近战兵种了",
        "有些小怪生命值太高了，正常防御塔的发育和怪的能力完全是2、3个数量级的差距",
        "防御塔的平衡还算可以，每一座塔在我这都有上场机会，不像复仇里的一些塔从头到尾坐冷板凳"
      ]
    },
    {
      id: 2,
      title: "优化更新节奏与提升游戏体验",
      priority: "high",
      coreFeedback: "玩家对铁皮工作室积极听取意见并快速提供新内容表示赞赏，但同时也表达了对于频繁更新导致的质量问题（如bug频发、难度设置不合理）的担忧。",
      discussionScale: "约 1035 人参与 (57.8%)",
      mainLanguage: "merged",
      professionalAnalysis: {
        community: {
          sentiment: "玩家的情绪主要表现为'失望'与'赞赏但希望更好'的混合体。一方面，他们对游戏内容和铁皮工作室的态度表示了肯定；另一方面，则对于游戏更新速度过快导致的质量问题表达了不满。",
          supportingPoints: [
            "赞赏铁皮工作室能够听取玩家意见",
            "短时间内提供了大量新内容"
          ],
          opposingPoints: [
            "游戏更新过于频繁而缺乏足够的打磨",
            "出现了较多bug以及难度设置不合理的问题",
            "给人一种只为了销售DLC而忽视质量的印象"
          ],
          riskAssessment: "中等。虽然目前没有明显的'带节奏'迹象或特别激进的意见领袖出现，但是关于游戏质量问题的讨论已经引起了部分玩家的广泛关注。",
          responseSuggestion: "积极沟通，承认问题。针对玩家反馈的具体问题（如bug、难度设计等）给予正面回应，并承诺改进措施及时间表。"
        },
        design: {
          coreIssues: [
            "游戏更新速度与质量之间的平衡问题",
            "玩家对于新内容的期待与实际体验之间存在差距"
          ],
          solutions: [
            {
              name: "阶段性内容发布计划",
             理念: "通过调整游戏内容发布的节奏，确保每次更新都能达到高质量标准。同时，增加透明度，让玩家参与到开发过程中来，增强社区归属感。",
              implementation: "制定明确的内容路线图，并公开分享给玩家群体；引入‘测试版’机制；设立定期的开发者日志或直播活动。"
            },
            {
              name: "动态难度调整系统",
             理念: "为了解决不同水平玩家对游戏难度感知不一的问题，引入更加灵活的挑战模式，使得每位玩家都能找到适合自己的游戏体验。",
              implementation: "开发一套基于玩家行为分析的算法；提供多种预设难度选项；鼓励玩家探索不同的游戏风格。"
            }
          ]
        },
        development: {
          issuesConfirmation: [
            { issue: "更新速度与质量平衡", confirmed: true },
            { issue: "玩家期待与实际体验差距", confirmed: true }
          ],
          technicalAssessment: [
            {
              solution: "阶段性内容发布计划",
              feasibility: "高",
              workload: "中",
              risks: [
                "需要建立一个稳定且高效的版本控制系统",
                "测试版机制的成功实施依赖于有效的反馈收集和处理流程"
              ],
              suggestion: "考虑使用微服务架构提高系统的灵活性与可扩展性"
            },
            {
              solution: "动态难度调整系统",
              feasibility: "中到高",
              workload: "高",
              risks: [
                "基于玩家行为分析算法的设计较为复杂",
                "实现多种预设难度选项相对直接，但要保证每种模式下的游戏平衡性仍是一项挑战"
              ],
              suggestion: "优先开发简化版动态难度调整系统，专注于敌人强度变化"
            }
          ],
          alternativeSolutions: [
            "简化版动态难度调整: 在初期只提供基础级别的自动难度调整功能，专注于敌人强度的变化"
          ]
        },
        product: {
          keyInsights: "实施阶段性内容发布计划，通过制定清晰的内容路线图和引入测试版机制来确保每次更新都能达到高质量标准，并增强玩家参与感。",
          developmentInsight: "优先开发简化版动态难度调整系统，专注于敌人强度变化，以较低成本满足玩家对游戏难度多样性的需求。",
          productInsight: "加强与社区沟通，定期分享开发进度并通过开发者日志等形式增加透明度，同时针对已知问题公开承诺改进措施及时间表。"
        }
      },
      representativeComments: [
        "联盟刚发售只有主线而无支线，像一个半成品，在半年时间里更新两个免费支线和一个付费DLC，之后的几月里还有免费支线和DLC的更新",
        "更新进度太快，让联盟与往代比起来显得缺少打磨和用心，也在本次DLC发售暴露问题，难度高，bug多",
        "很多bug明明已经得到玩家反映，却一直没有修复，直到DLC得到多半差评，铁皮才紧急修复其中的一部分"
      ]
    }
  ]
};

// Mock data for charts
const topicDistributionData = [
  { name: '塔防体验优化', value: 28.6 },
  { name: '更新节奏与质量', value: 57.8 },
  { name: '英雄技能与塔防元素', value: 20.8 },
  { name: '长期吸引力策略', value: 9.1 },
  { name: 'DLC内容策略', value: 55.2 },
  { name: '内容丰富度', value: 4.9 },
  { name: '游戏体验优化', value: 4.7 },
  { name: '性价比与定价', value: 5.9 },
  { name: '经典与创新平衡', value: 4.1 },
  { name: '游戏时长与内容量', value: 4.2 },
];

const sentimentData = [
  { name: '赞赏', value: 45 },
  { name: '中性', value: 30 },
  { name: '担忧', value: 15 },
  { name: '不满', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function GameReport() {
  const { id } = useParams();
  const [activeTopic, setActiveTopic] = useState(gameReportData.topics[0]);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
      {/* Header */}
      <header className="py-6 px-8 flex justify-between items-center bg-white/5 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/search')}
            className="mr-4 text-indigo-200 hover:text-white transition-colors"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="text-xl font-bold flex items-center">
            <i className="fa-solid fa-gamepad mr-3 text-yellow-400"></i>
            <span>GameReview Analytics</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="relative group">
            <button className="flex items-center space-x-1 text-indigo-100 hover:text-white transition-colors">
              <i className="fa-solid fa-user-circle text-xl"></i>
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
      
      {/* Report Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Report Header */}
        <div className="mb-12">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
                <i className="fa-solid fa-chart-pie text-yellow-400 mr-3"></i>
                {gameReportData.title} - 多角色深度分析报告
              </h1>
              <p className="text-indigo-300 flex items-center">
                <i className="fa-solid fa-clock mr-2"></i>
                分析时间: {formatDate(gameReportData.analysisTime)}
              </p>
              <p className="text-indigo-300 flex items-center mt-1">
                <i className="fa-solid fa-users mr-2"></i>
                分析模式: {gameReportData.analysisMode}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hidden md:block">
              <h3 className="text-sm font-medium text-indigo-300 mb-2">话题讨论分布</h3>
              <div className="w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topicDistributionData.slice(0, 4)}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {topicDistributionData.slice(0, 4).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, '参与占比']}
                      contentStyle={{ 
                        backgroundColor: 'rgba(12, 10, 49, 0.8)', 
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                        color: 'white'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 mb-8">
            <h2 className="text-xl font-bold mb-4">
              <i className="fa-solid fa-chart-line text-green-400 mr-2"></i>
              玩家情绪与话题分布
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topicDistributionData.slice(0, 5)}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.7)" />
                  <YAxis stroke="rgba(255, 255, 255, 0.7)" />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '参与度']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(12, 10, 49, 0.8)', 
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      color: 'white'
                    }}
                  />
                  <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]}>
                    {topicDistributionData.slice(0, 5).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Topic Selection */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-3 min-w-max">
            {gameReportData.topics.map(topic => (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic)}
                className={`px-5 py-3 rounded-xl transition-all duration-300 ${
                  activeTopic.id === topic.id
                    ? 'bg-yellow-500 text-gray-900 font-bold shadow-lg shadow-yellow-500/20'
                    : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20'
                }`}
              >
                <div className="flex items-center">
                  {topic.priority === 'high' && (
                    <i className="fa-solid fa-exclamation-circle text-red-500 mr-2"></i>
                  )}
                  <span>话题 {topic.id}: {topic.title.substring(0, 15)}...</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Topic Content */}
        <div className="space-y-8">
          {/* Core Feedback */}
          <section className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <i className="fa-solid fa-comment-dots text-blue-400 mr-3"></i>
              核心反馈
            </h2>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <p className="text-lg text-indigo-100 mb-4 md:mb-0">
                {activeTopic.coreFeedback}
              </p>
              <div className="flex space-x-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10 flex items-center">
                  <i className="fa-solid fa-users text-purple-400 mr-2"></i>
                  <span>{activeTopic.discussionScale}</span>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10 flex items-center">
                  <i className="fa-solid fa-language text-green-400 mr-2"></i>
                  <span>{activeTopic.mainLanguage}</span>
                </div>
              </div>
            </div>
          </section>
          
          {/* Professional Analysis */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <i className="fa-solid fa-user-tie text-indigo-400 mr-3"></i>
              多角色专业分析
            </h2>
            
            {/* Community Perspective */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <i className="fa-solid fa-bullhorn text-orange-400 mr-2"></i>
                社区运营视角
              </h3>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">舆论情绪诊断</h4>
                <p className="text-indigo-100">{activeTopic.professionalAnalysis.community.sentiment}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-green-400 mb-2 flex items-center">
                    <i className="fa-solid fa-check-circle mr-2"></i>
                    支持观点
                  </h4>
                  <ul className="space-y-2 text-indigo-100">
                    {activeTopic.professionalAnalysis.community.supportingPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fa-solid fa-angle-right mt-1 mr-2 text-green-400"></i>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-red-400 mb-2 flex items-center">
                    <i className="fa-solid fa-times-circle mr-2"></i>
                    反对观点
                  </h4>
                  <ul className="space-y-2 text-indigo-100">
                    {activeTopic.professionalAnalysis.community.opposingPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fa-solid fa-angle-right mt-1 mr-2 text-red-400"></i>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">舆情风险评估</h4>
                <p className="text-indigo-100">{activeTopic.professionalAnalysis.community.riskAssessment}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-2">官方回应建议</h4>
                <div className="bg-blue-900/30 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30">
                  <p className="text-indigo-100 italic">{activeTopic.professionalAnalysis.community.responseSuggestion}</p>
                </div>
              </div>
            </div>
            
            {/* Design Perspective */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <i className="fa-solid fa-palette text-purple-400 mr-2"></i>
                游戏设计视角
              </h3>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">识别的核心设计问题</h4>
                <ul className="space-y-2 text-indigo-100">
                  {activeTopic.professionalAnalysis.design.coreIssues.map((issue, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fa-solid fa-circle-exclamation text-yellow-500 mt-1 mr-2"></i>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-green-400 mb-2">设计方案</h4>
                {activeTopic.professionalAnalysis.design.solutions.map((solution, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-5 border border-white/10 hover:border-white/30 transition-all duration-300">
                    <h5 className="text-xl font-bold text-white mb-3">{solution.name}</h5>
                    <div className="mb-3">
                      <h6 className="text-sm font-semibold text-blue-400 mb-1">设计理念</h6>
                      <p className="text-indigo-100">{solution.理念}</p>
                    </div>
                    <div>
                      <h6 className="text-sm font-semibold text-blue-400 mb-1">具体实现</h6>
                      <p className="text-indigo-100">{solution.implementation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Development Perspective */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <i className="fa-solid fa-code text-cyan-400 mr-2"></i>
                技术开发视角
              </h3>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">问题确认</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white/5 backdrop-blur-sm rounded-lg">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="py-3 px-4 text-left text-sm font-semibold text-indigo-300">问题描述</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-indigo-300">确认状态</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeTopic.professionalAnalysis.development.issuesConfirmation.map((item, index) => (
                        <tr key={index} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                          <td className="py-3 px-4 text-indigo-100">{item.issue}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              item.confirmed
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                            }`}>
                              {item.confirmed ? '已确认' : '未确认'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-green-400 mb-3">技术评估</h4>
                {activeTopic.professionalAnalysis.development.technicalAssessment.map((assessment, index) => (
                  <div key={index} className="mb-5 bg-white/5 backdrop-blur-sm rounded-lg p-5 border border-white/10">
                    <h5 className="text-lg font-bold text-white mb-2">{assessment.solution}</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                        <h6 className="text-xs text-indigo-300 mb-1">技术可行性</h6>
                        <div className="flex items-center">
                          <i className="fa-solid fa-check-circle text-green-400 mr-2"></i>
                          <span className="font-medium">{assessment.feasibility}</span>
                        </div>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                        <h6 className="text-xs text-indigo-300 mb-1">开发工作量</h6>
                        <div className="flex items-center">
                          <i className="fa-solid fa-hourglass-half text-yellow-400 mr-2"></i>
                          <span className="font-medium">{assessment.workload}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <h6 className="text-sm font-semibold text-blue-400 mb-1">潜在风险</h6>
                      <ul className="space-y-1 text-indigo-100 text-sm">
                        {assessment.risks.map((risk, i) => (
                          <li key={i} className="flex items-start">
                            <i className="fa-solid fa-exclamation-triangle text-yellow-500 mt-1 mr-2 text-xs"></i>
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-sm font-semibold text-blue-400 mb-1">建议</h6>
                      <p className="text-indigo-100 text-sm italic bg-blue-900/20 p-3 rounded-lg border border-blue-500/20">
                        {assessment.suggestion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-yellow-400 mb-2">替代方案</h4>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <ul className="space-y-2 text-indigo-100">
                    {activeTopic.professionalAnalysis.development.alternativeSolutions.map((solution, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fa-solid fa-lightbulb text-yellow-400 mt-1 mr-2"></i>
                        <span>{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Product Perspective */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <i className="fa-solid fa-bullseye text-yellow-400 mr-3"></i>
                产品决策视角
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-blue-400 mb-2">核心洞察</h4>
                  <p className="text-indigo-100">{activeTopic.professionalAnalysis.product.keyInsights}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <h4 className="text-sm font-semibold text-green-400 mb-2">开发洞察</h4>
                    <p className="text-indigo-100 text-sm">{activeTopic.professionalAnalysis.product.developmentInsight}</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">产品洞察</h4>
                    <p className="text-indigo-100 text-sm">{activeTopic.professionalAnalysis.product.productInsight}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Representative Comments */}
          <section className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <i className="fa-solid fa-quote-right text-purple-400 mr-3"></i>
              代表性评论
            </h2>
            
            <div className="space-y-4">
              {activeTopic.representativeComments.map((comment, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-white/30 transition-all duration-300">
                  <div className="flex">
                    <div className="mr-3 text-purple-400">
                      <i className="fa-solid fa-comment text-xl"></i>
                    </div>
                    <div>
                      <p className="text-indigo-100 italic">{comment}</p>
                      <div className="mt-2 flex justify-end">
                        <span className="text-xs text-indigo-400 opacity-70">玩家评论 {index + 1}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mt-16 py-8 px-8 text-center text-indigo-300/60 text-sm border-t border-white/10">
        <p>© 2025 GameReview Analytics. 分析报告仅供参考。</p>
      </footer>
    </div>
  );
}