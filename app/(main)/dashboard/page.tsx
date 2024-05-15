// components/Dashboard.tsx
import React from "react";
import InfoCards from "@/components/dashboard/info-cards";

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCards />
      </div>
    </div>
  );
};

export default Dashboard;
