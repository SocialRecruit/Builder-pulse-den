import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Landing Page Builder
        </h1>
        <p className="text-xl text-gray-600">
          Professional Social Recruiting Platform
        </p>
        <div className="space-y-4">
          <Button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            Dashboard öffnen
          </Button>
          <div className="text-sm text-gray-500">
            Klicken Sie hier, um zum Dashboard zu gelangen
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
