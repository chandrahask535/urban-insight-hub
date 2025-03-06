
import { FadeIn } from './animations/FadeIn';
import { AlertTriangle, CloudRain, Clock, MapPin } from 'lucide-react';
import { Chip } from './ui/Chip';

const FloodAlertPanel = () => {
  const floodAlertData = [
    { 
      id: 1, 
      location: 'North River Basin', 
      severity: 'Critical', 
      rainfall: '175mm', 
      timeFrame: '24 hours',
      probability: '85%',
      population: '15,000',
      status: 'Active'
    },
    { 
      id: 2, 
      location: 'Downtown District', 
      severity: 'Moderate', 
      rainfall: '120mm', 
      timeFrame: '24 hours',
      probability: '60%',
      population: '50,000',
      status: 'Warning'
    },
    { 
      id: 3, 
      location: 'East Industrial Zone', 
      severity: 'Low', 
      rainfall: '85mm', 
      timeFrame: '24 hours',
      probability: '30%',
      population: '8,000',
      status: 'Monitor'
    },
  ];

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Chip variant="heat" className="mb-2">Alert System</Chip>
            <h2 className="text-2xl font-bold tracking-tight">Flood Risk Monitoring</h2>
            <p className="text-muted-foreground">Real-time alerts based on satellite imagery and weather data</p>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <div className="bg-secondary rounded-md px-3 py-1.5 flex items-center">
              <Clock className="w-4 h-4 mr-1.5" />
              Last updated: 30 minutes ago
            </div>
          </div>
        </div>
      </FadeIn>
      
      <FadeIn delay="short">
        <div className="bg-white rounded-xl shadow-card border p-5">
          <h3 className="text-lg font-medium mb-4">Active Alerts</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-3 font-medium text-muted-foreground">Location</th>
                  <th className="text-left pb-3 font-medium text-muted-foreground">Severity</th>
                  <th className="text-left pb-3 font-medium text-muted-foreground">Rainfall</th>
                  <th className="text-left pb-3 font-medium text-muted-foreground">Probability</th>
                  <th className="text-left pb-3 font-medium text-muted-foreground">Population at Risk</th>
                  <th className="text-left pb-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {floodAlertData.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                    <td className="py-3 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-urban-500" />
                      {item.location}
                    </td>
                    <td className="py-3">
                      <AlertSeverityBadge severity={item.severity} />
                    </td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <CloudRain className="w-4 h-4 mr-1.5 text-urban-500" />
                        <span>{item.rainfall}</span>
                        <span className="text-xs text-muted-foreground ml-1">({item.timeFrame})</span>
                      </div>
                    </td>
                    <td className="py-3 font-medium">
                      {item.probability}
                    </td>
                    <td className="py-3">
                      {item.population}
                    </td>
                    <td className="py-3">
                      <AlertStatusBadge status={item.status} />
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
            <div className="font-medium">Emergency Response Protocol Activated</div>
            <p className="text-sm text-muted-foreground mt-1">
              Due to the critical flood risk in the North River Basin, emergency response teams have been placed on standby.
              Residents in low-lying areas are advised to prepare for possible evacuation within the next 12 hours.
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

type AlertSeverityBadgeProps = {
  severity: string;
};

const AlertSeverityBadge = ({ severity }: AlertSeverityBadgeProps) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAlertSeverityColor(severity)}`}>
      {severity}
    </span>
  );
};

type AlertStatusBadgeProps = {
  status: string;
};

const AlertStatusBadge = ({ status }: AlertStatusBadgeProps) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAlertStatusColor(status)}`}>
      {status}
    </span>
  );
};

const getAlertSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Critical':
      return 'bg-heat-100 text-heat-800';
    case 'Moderate':
      return 'bg-orange-100 text-orange-800';
    case 'Low':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-green-100 text-green-800';
  }
};

const getAlertStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-heat-100 text-heat-800';
    case 'Warning':
      return 'bg-amber-100 text-amber-800';
    case 'Monitor':
      return 'bg-sky-100 text-sky-800';
    default:
      return 'bg-green-100 text-green-800';
  }
};

export default FloodAlertPanel;
