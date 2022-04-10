const apiUrl: string = 'https://jsonplaceholder.typicode.com';

const postsUrl: string = apiUrl + '/posts';
const commentsUrl: string = `${apiUrl}/comments`;
const usersUrl: string = `${apiUrl}/users`;

async function getApiResponse(url: string) {
    const postsRequest: Promise<Response> = fetch(url);
    const response: Response = await postsRequest;
    const json: any = await response.json();
    return json;
  }

//   async function getApiResponse(url: string): Promise<any> {
//     const postsRequest: Promise<Response> = fetch(url);
//     const response: Response = await postsRequest;
//     const json: any = await response.json();
//     return json;
//   }
// Dodaliśmy, że funkcja ma zwracać Promisa