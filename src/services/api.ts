const BASE_URL = 'http://localhost:8080/'

const FetchData = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}${endpoint}`)
  if (response == null){
    return null
  }
  return response.json()
}

export default FetchData