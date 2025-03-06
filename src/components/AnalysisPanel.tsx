
import { FadeIn } from './animations/FadeIn';
import { Calendar, MapPin, TrendingUp, AlertTriangle } from 'lucide-react';
import { Chip } from './ui/Chip';

const AnalysisPanel = () => {
  const encroachmentData = [
    { id: 1, location: 'North Lake Basin', severity: 'Critical', percentage: 24, change: '+3.2%' },
    { id: 2, location: 'Eastern Forest Reserve', severity: 'High', percentage: 18, change: '+2.7%' },
    { id: 3, location: 'Central Park Area', severity: 'Moderate', percentage: 12, change: '+1.5%' },
    { id: 4, location: 'South River Bank', severity: 'Low', percentage: 8, change: '+0.8%' },
  ];

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Chip variant="urban" className="mb-2">Detailed Analysis</Chip>
            <h2 className="text-2xl font-bold tracking-tight">Land Encroachment Insights</h2>
            <p className="text-muted-foreground">Detailed breakdown of detected illegal land changes</p>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <div className="bg-secondary rounded-md px-3 py-1.5 flex items-center">
              <Calendar className="w-4 h-4 mr-1.5" />
              Last updated: June 15, 2023
            </div>
          </div>
        </div>
      </FadeIn>
      
      <FadeIn delay="short">
        <div className="bg-white rounded-xl shadow-card border p-5">
          <h3 className="text-lg font-medium mb-4">Critical Areas</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-3 font-medium text-muted-foreground">Location</th>
                  <th className="text-left pb-3 font-medium text-muted-foreground">Severity</th>
                  <th className="text-left pb-3 font-medium text-muted-foreground">Encroachment %</th>
                  <th className="text-left pb-3 font-medium text-muted-foreground">YoY Change</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {encroachmentData.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-3 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-urban-500" />
                      {item.location}
                    </td>
                    <td className="py-3">
                      <SeverityBadge severity={item.severity} />
                    </td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <span className="font-medium">{item.percentage}%</span>
                        <div className="ml-2 w-16 bg-secondary rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full ${getSeverityColor(item.severity)}`} 
                            style={{ width: `${item.percentage * 3}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center text-heat-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {item.change}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>
      
      <FadeIn delay="medium">
        <div className="bg-heat-50 border border-heat-200 rounded-lg p-4 flex items-start">
          <AlertTriangle className="w-5 h-5 text-heat-500 mr-3 mt-0.5" />
          <div>
            <div className="font-medium">Increasing Encroachment Risk</div>
            <p className="text-sm text-muted-foreground mt-1">
              The land encroachment in the North Lake Basin has increased by 3.2% in the last quarter, 
              indicating accelerated illegal development. Immediate action is recommended.
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

type SeverityBadgeProps = {
  severity: string;
};

const SeverityBadge = ({ severity }: SeverityBadgeProps) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityBadgeColor(severity)}`}>
      {severity}
    </span>
  );
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Critical':
      return 'bg-heat-600';
    case 'High':
      return 'bg-heat-500';
    case 'Moderate':
      return 'bg-orange-400';
    default:
      return 'bg-amber-400';
  }
};

const getSeverityBadgeColor = (severity: string) => {
  switch (severity) {
    case 'Critical':
      return 'bg-heat-100 text-heat-800';
    case 'High':
      return 'bg-orange-100 text-orange-800';
    case 'Moderate':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-green-100 text-green-800';
  }
};

export default AnalysisPanel;
