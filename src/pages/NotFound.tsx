import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
      <div className="text-center bg-white rounded-2xl shadow-xl p-10 max-w-md w-full">
        <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-blue-800 mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFound;

