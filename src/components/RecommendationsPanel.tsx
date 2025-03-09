
import { FadeIn } from './animations/FadeIn';
import { Chip } from './ui/Chip';
import { LightbulbIcon, CheckCircle, CircleEllipsis, TreePine, Building, AreaChart } from 'lucide-react';
import { useEffect } from 'react';

const RecommendationsPanel = () => {
  // Add debugging to track component lifecycle
  useEffect(() => {
    console.log('RecommendationsPanel mounted');
    return () => console.log('RecommendationsPanel unmounted');
  }, []);

  return (
    <div className="space-y-6">
      <FadeIn>
        <div>
          <Chip variant="eco" className="mb-2">AI Recommendations</Chip>
          <h2 className="text-2xl font-bold tracking-tight">Sustainable Urban Planning</h2>
          <p className="text-muted-foreground">AI-generated recommendations based on analysis of current data</p>
        </div>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FadeIn delay="short">
          <RecommendationCard
            title="Green Spaces Implementation"
            description="Creating urban green spaces to mitigate heat islands and improve air quality"
            icon={<TreePine className="w-5 h-5 text-eco-500" />}
            status="implemented"
            items={[
              "Convert vacant lot on 5th Avenue to community garden",
              "Plant shade trees along Main Street corridor",
              "Create green roof program for commercial buildings"
            ]}
          />
        </FadeIn>
        
        <FadeIn delay="medium">
          <RecommendationCard
            title="Land Use Optimization"
            description="Strategic urban planning to prevent encroachment and optimize land usage"
            icon={<Building className="w-5 h-5 text-urban-500" />}
            status="in-progress"
            items={[
              "Rezone western industrial area for mixed-use development",
              "Establish 100m buffer zone around lake perimeter",
              "Increase density in transit-oriented development zones"
            ]}
          />
        </FadeIn>
        
        <FadeIn delay="medium">
          <RecommendationCard
            title="Heat Island Mitigation"
            description="Strategies to reduce urban heat accumulation and improve comfort"
            icon={<AreaChart className="w-5 h-5 text-heat-500" />}
            status="pending"
            items={[
              "Implement reflective roofing standards for new construction",
              "Replace dark pavement with high-albedo materials",
              "Increase tree canopy coverage in downtown area"
            ]}
          />
        </FadeIn>
        
        <FadeIn delay="long">
          <div className="rounded-xl border bg-card p-5 h-full">
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center">
                <div className="mr-3 p-2 bg-urban-50 rounded-full">
                  <LightbulbIcon className="w-5 h-5 text-urban-500" />
                </div>
                <h3 className="font-semibold text-lg">Impact Analysis</h3>
              </div>
            </div>
            
            <div className="space-y-4 text-sm">
              <div>
                <div className="mb-1 flex justify-between items-center">
                  <div className="font-medium">Temperature Reduction</div>
                  <div className="text-eco-600 font-medium">-2.8°C</div>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div className="bg-eco-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Estimated temperature reduction in heat islands</p>
              </div>
              
              <div>
                <div className="mb-1 flex justify-between items-center">
                  <div className="font-medium">Encroachment Prevention</div>
                  <div className="text-urban-600 font-medium">83%</div>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div className="bg-urban-500 h-1.5 rounded-full" style={{ width: '83%' }}></div>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Likelihood of preventing future encroachment</p>
              </div>
              
              <div>
                <div className="mb-1 flex justify-between items-center">
                  <div className="font-medium">Air Quality Improvement</div>
                  <div className="text-eco-600 font-medium">+18%</div>
                </div>
                <div className="w-full bg-secondary rounded-full h-1.5">
                  <div className="bg-eco-500 h-1.5 rounded-full" style={{ width: '52%' }}></div>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Projected air quality improvement</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

type RecommendationCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'implemented' | 'in-progress' | 'pending';
  items: string[];
};

const RecommendationCard = ({ title, description, icon, status, items }: RecommendationCardProps) => {
  return (
    <div className="rounded-xl border bg-card p-5 h-full">
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center">
          <div className="mr-3 p-2 bg-urban-50 rounded-full">
            {icon}
          </div>
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        <StatusBadge status={status} />
      </div>
      
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start text-sm">
            <div className="mr-3 mt-0.5 text-urban-500">•</div>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

type StatusBadgeProps = {
  status: 'implemented' | 'in-progress' | 'pending';
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  let color = '';
  let text = '';
  let icon = null;
  
  switch (status) {
    case 'implemented':
      color = 'bg-eco-100 text-eco-800';
      text = 'Implemented';
      icon = <CheckCircle className="w-3.5 h-3.5 mr-1" />;
      break;
    case 'in-progress':
      color = 'bg-urban-100 text-urban-800';
      text = 'In Progress';
      icon = <CircleEllipsis className="w-3.5 h-3.5 mr-1" />;
      break;
    case 'pending':
      color = 'bg-muted text-muted-foreground';
      text = 'Pending';
      icon = <CircleEllipsis className="w-3.5 h-3.5 mr-1" />;
      break;
  }
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${color}`}>
      {icon}
      {text}
    </span>
  );
};

export default RecommendationsPanel;
