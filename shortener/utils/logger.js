export const logEvent = (eventName, payload = {}) => {
 
  const logs = JSON.parse(localStorage.getItem("logs")) || [];
  logs.push({ eventName, timestamp: new Date().toISOString(), payload });
  localStorage.setItem("logs", JSON.stringify(logs));
};
