import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

interface Organ {
  id: string;
  name: string;
  status: 'healthy' | 'attention' | 'critical';
  position: { x: number; y: number };
  connections: string[];
}

interface Disease {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high';
  affectedOrgans: string[];
  description: string;
  consequences: string;
  preventionTips: string[];
}

const organs: Organ[] = [
  { id: 'heart', name: 'Сердце', status: 'healthy', position: { x: 50, y: 30 }, connections: ['lungs', 'kidneys'] },
  { id: 'lungs', name: 'Лёгкие', status: 'healthy', position: { x: 40, y: 25 }, connections: ['heart'] },
  { id: 'liver', name: 'Печень', status: 'attention', position: { x: 55, y: 45 }, connections: ['kidneys', 'stomach'] },
  { id: 'kidneys', name: 'Почки', status: 'healthy', position: { x: 45, y: 55 }, connections: ['heart', 'liver'] },
  { id: 'stomach', name: 'Желудок', status: 'healthy', position: { x: 50, y: 40 }, connections: ['liver', 'intestines'] },
  { id: 'intestines', name: 'Кишечник', status: 'healthy', position: { x: 50, y: 60 }, connections: ['stomach'] },
  { id: 'brain', name: 'Мозг', status: 'healthy', position: { x: 50, y: 10 }, connections: ['heart', 'eyes'] },
  { id: 'eyes', name: 'Глаза', status: 'healthy', position: { x: 45, y: 8 }, connections: ['brain'] },
];

const diseases: Disease[] = [
  {
    id: 'cardiomyopathy',
    name: 'Кардиомиопатия',
    severity: 'high',
    affectedOrgans: ['heart', 'lungs', 'kidneys'],
    description: 'Заболевание сердечной мышцы, которое затрудняет перекачивание крови по всему организму',
    consequences: 'Без лечения: сердечная недостаточность, отёки лёгких, снижение активности почек, летальный исход в течение 6-12 месяцев',
    preventionTips: ['Регулярные осмотры у кардиолога', 'Контроль веса и активности', 'Специализированная диета']
  },
  {
    id: 'hepatitis',
    name: 'Гепатит',
    severity: 'medium',
    affectedOrgans: ['liver', 'kidneys', 'stomach'],
    description: 'Воспаление печени, влияющее на метаболизм и детоксикацию организма',
    consequences: 'Без лечения: цирроз печени, нарушение пищеварения, интоксикация организма в течение 2-3 лет',
    preventionTips: ['Вакцинация', 'Качественное питание', 'Избегать токсичных веществ']
  },
  {
    id: 'renal-failure',
    name: 'Почечная недостаточность',
    severity: 'high',
    affectedOrgans: ['kidneys', 'heart', 'liver'],
    description: 'Снижение функции почек по фильтрации крови и выведению токсинов',
    consequences: 'Без лечения: накопление токсинов, отёки, анемия, летальный исход в течение 3-6 месяцев',
    preventionTips: ['Контроль анализов крови', 'Специализированный корм', 'Регулярное потребление воды']
  },
  {
    id: 'gastritis',
    name: 'Гастрит',
    severity: 'low',
    affectedOrgans: ['stomach', 'intestines'],
    description: 'Воспаление слизистой оболочки желудка',
    consequences: 'Без лечения: язвенная болезнь, хроническая боль, снижение усвоения питательных веществ',
    preventionTips: ['Дробное питание', 'Избегать стрессов', 'Качественный корм']
  },
  {
    id: 'osteosarcoma',
    name: 'Остеосаркома',
    severity: 'high',
    affectedOrgans: ['bones'],
    description: 'Злокачественная опухоль костей, чаще всего поражает конечности крупных собак',
    consequences: 'Без лечения: сильная боль, хромота, метастазы в лёгкие, летальный исход в течение 4-6 месяцев',
    preventionTips: ['Раннее выявление (рентген при хромоте)', 'Контроль активности', 'Регулярные осмотры']
  }
];

const Index = () => {
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [activeTab, setActiveTab] = useState('model');

  const healthScore = 85;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'attention': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-500';
      case 'medium': return 'bg-orange-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const selectedOrganData = organs.find(o => o.id === selectedOrgan);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon name="Activity" className="text-primary" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-semibold">PetHealth Atlas</h1>
              <p className="text-xs text-muted-foreground">Цифровое здоровье питомца</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Health Score</p>
              <p className="text-2xl font-bold text-primary">{healthScore}</p>
            </div>
            <Button variant="outline" size="icon">
              <Icon name="Settings" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="model" className="flex items-center gap-2">
                  <Icon name="Scan" size={16} />
                  3D Модель
                </TabsTrigger>
                <TabsTrigger value="atlas" className="flex items-center gap-2">
                  <Icon name="BookOpen" size={16} />
                  Атлас болезней
                </TabsTrigger>
              </TabsList>

              <TabsContent value="model" className="mt-0">
                <Card className="p-6 animate-fade-in">
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Анатомическая модель</h2>
                    <p className="text-muted-foreground">Нажмите на орган для просмотра деталей и связей</p>
                  </div>

                  <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl overflow-hidden border border-border/50">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {organs.map(organ => {
                        const isSelected = selectedOrgan === organ.id;
                        const isConnected = selectedOrganData?.connections.includes(organ.id);
                        
                        return (
                          <g key={organ.id}>
                            {selectedOrganData && organ.connections.includes(selectedOrgan!) && (
                              <line
                                x1={selectedOrganData.position.x}
                                y1={selectedOrganData.position.y}
                                x2={organ.position.x}
                                y2={organ.position.y}
                                stroke="currentColor"
                                strokeWidth="0.3"
                                className="text-primary/30 animate-pulse-slow"
                                strokeDasharray="1,1"
                              />
                            )}
                            
                            <circle
                              cx={organ.position.x}
                              cy={organ.position.y}
                              r={isSelected ? "5" : isConnected ? "4" : "3"}
                              className={`cursor-pointer transition-all duration-300 ${
                                isSelected ? 'animate-pulse-slow' : ''
                              }`}
                              fill="currentColor"
                              fillOpacity={isSelected ? "1" : isConnected ? "0.7" : "0.5"}
                              onClick={() => setSelectedOrgan(organ.id === selectedOrgan ? null : organ.id)}
                              style={{ 
                                color: isSelected || isConnected ? 'hsl(var(--primary))' : 
                                       organ.status === 'healthy' ? 'hsl(142 71% 45%)' : 
                                       organ.status === 'attention' ? 'hsl(24 95% 53%)' : 
                                       'hsl(0 84% 60%)'
                              }}
                            />
                            
                            <text
                              x={organ.position.x}
                              y={organ.position.y - 7}
                              textAnchor="middle"
                              className="text-[3px] font-medium fill-foreground/80 pointer-events-none"
                            >
                              {organ.name}
                            </text>
                          </g>
                        );
                      })}
                    </svg>

                    <div className="absolute bottom-4 left-4 flex gap-3">
                      <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs">Норма</span>
                      </div>
                      <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        <span className="text-xs">Внимание</span>
                      </div>
                      <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-xs">Критично</span>
                      </div>
                    </div>
                  </div>

                  {selectedOrganData && (
                    <Card className="mt-4 p-4 animate-scale-in border-primary/50">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold">{selectedOrganData.name}</h3>
                          <Badge className={`mt-1 ${getStatusColor(selectedOrganData.status)}`}>
                            {selectedOrganData.status === 'healthy' ? 'Норма' : 
                             selectedOrganData.status === 'attention' ? 'Требует внимания' : 'Критично'}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedOrgan(null)}>
                          <Icon name="X" size={20} />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Связан с: {organs.filter(o => selectedOrganData.connections.includes(o.id))
                            .map(o => o.name).join(', ')}
                        </p>
                      </div>
                    </Card>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="atlas" className="mt-0">
                <Card className="p-6 animate-fade-in">
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Образовательный атлас</h2>
                    <p className="text-muted-foreground">Узнайте о заболеваниях и их последствиях</p>
                  </div>

                  <div className="space-y-4">
                    {diseases.map(disease => (
                      <Card 
                        key={disease.id}
                        className="p-4 cursor-pointer hover:border-primary/50 transition-all duration-300"
                        onClick={() => setSelectedDisease(disease.id === selectedDisease?.id ? null : disease)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{disease.name}</h3>
                              <Badge className={getSeverityColor(disease.severity)}>
                                {disease.severity === 'low' ? 'Низкий риск' : 
                                 disease.severity === 'medium' ? 'Средний риск' : 'Высокий риск'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{disease.description}</p>
                            
                            <div className="flex flex-wrap gap-2">
                              {disease.affectedOrgans.map(organId => {
                                const organ = organs.find(o => o.id === organId);
                                return organ ? (
                                  <Badge key={organId} variant="outline" className="text-xs">
                                    {organ.name}
                                  </Badge>
                                ) : null;
                              })}
                            </div>
                          </div>
                          <Icon 
                            name={selectedDisease?.id === disease.id ? "ChevronUp" : "ChevronDown"} 
                            size={20} 
                            className="text-muted-foreground"
                          />
                        </div>

                        {selectedDisease?.id === disease.id && (
                          <div className="mt-4 pt-4 border-t border-border/50 space-y-4 animate-fade-in">
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <Icon name="AlertTriangle" size={16} className="text-accent" />
                                Последствия без лечения
                              </h4>
                              <p className="text-sm text-muted-foreground">{disease.consequences}</p>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <Icon name="Shield" size={16} className="text-primary" />
                                Профилактика
                              </h4>
                              <ul className="space-y-1">
                                {disease.preventionTips.map((tip, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="p-6 animate-scale-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Health Score</h3>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Heart" className="text-primary" size={24} />
                </div>
              </div>
              
              <div className="relative">
                <div className="text-5xl font-bold text-primary mb-2">{healthScore}</div>
                <Progress value={healthScore} className="h-3" />
              </div>
              
              <p className="text-sm text-muted-foreground mt-3">
                Отличное состояние! Продолжайте регулярные проверки
              </p>
            </Card>

            <Card className="p-6 animate-fade-in">
              <h3 className="text-lg font-semibold mb-4">Последние обновления</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" className="text-green-500" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Анализ крови</p>
                    <p className="text-xs text-muted-foreground">Все показатели в норме</p>
                    <p className="text-xs text-muted-foreground mt-1">2 дня назад</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="AlertCircle" className="text-orange-500" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Печень</p>
                    <p className="text-xs text-muted-foreground">Небольшое повышение ферментов</p>
                    <p className="text-xs text-muted-foreground mt-1">5 дней назад</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Activity" className="text-blue-500" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Активность</p>
                    <p className="text-xs text-muted-foreground">7.2 км за неделю</p>
                    <p className="text-xs text-muted-foreground mt-1">Сегодня</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 animate-fade-in">
              <h3 className="text-lg font-semibold mb-4">Рекомендации</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Icon name="Calendar" size={16} className="mr-2" />
                  Записаться на осмотр
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Icon name="Upload" size={16} className="mr-2" />
                  Загрузить анализы
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Задать вопрос ИИ
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
