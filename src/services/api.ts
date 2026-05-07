const BASE_URL = 'http://localhost:8080/'

const FetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`Server Error: ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      return result.data;
    } else {
      console.warn("API returned success:false:", result.message);
      return null;
    }
  } catch (error) {
    console.error("Fetch system error:", error);
    throw error;
  }
};

export default FetchData