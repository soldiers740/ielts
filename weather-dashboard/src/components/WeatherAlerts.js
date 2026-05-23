import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const WeatherAlerts = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="weather-alerts space-y-3">
      {alerts.map((alert, index) => (
        <div
          key={index}
          className="bg-red-900 bg-opacity-50 border-l-4 border-red-600 rounded-lg p-4 shadow-lg"
        >
          <div className="flex items-start gap-3">
            <FiAlertTriangle className="text-red-400 mt-1 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-bold text-red-300 mb-1">{alert.event}</h3>
              <p className="text-red-200 text-sm mb-2">{alert.description}</p>
              <p className="text-xs text-red-300">
                {alert.start && (
                  <>
                    From: {new Date(alert.start * 1000).toLocaleString()}
                    {alert.end && (
                      <>
                        <br />
                        To: {new Date(alert.end * 1000).toLocaleString()}
                      </>
                    )}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherAlerts;
