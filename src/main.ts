const apiUrl: string = 'https://jsonplaceholder.typicode.com';

const postsUrl: string = apiUrl + '/posts';
const commentsUrl: string = `${apiUrl}/comments`;
const usersUrl: string = `${apiUrl}/users`;

interface Author {
  id: number;
  name: string;
  username: string;
  email: string;
};
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};


async function setAuthor(authorId: number): Promise<void> {
  const userUrl = `${usersUrl}/${authorId}`;
  const user: Author = await getApiResponse(userUrl);
  const userElement = document.getElementById('author');
  userElement.classList.add('author');
  userElement.innerHTML = `<h3>${user.name} <small>(${user.email})</small></h3>`;
}

async function loadComments(postId: number): Promise<void> {
    const postCommentsUrl = `${commentsUrl}?postId=${postId}`;
    const comments: Comment[] = await getApiResponse(postCommentsUrl);
    const commentsContainer = document.getElementById('comments');
    commentsContainer.innerHTML = '';
    for (const comment of comments) {
        const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `
    <h4><i>${comment.name}</i> by <code>${comment.email}</code></h4>
    <p>${comment.body}</p>
    `;
    commentsContainer.append(commentElement);
}
}

async function addListElement(post: Post) {
    const element = document.createElement('li');
    const label = `${post.id} ${post.title}`;
    element.innerText = label;
    element.classList.add('title');
    element.addEventListener('click', async () => {
        const contentElement = document.getElementById('content');
        contentElement.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
        setAuthor(post.userId);
        loadComments(post.id);
    });
    const listContainer = document.getElementById('list');
    listContainer.append(element);
}

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
// Dodaliśmy, że funkcja ma zwracać Promisa a w return mamy Response

document.addEventListener('DOMContentLoaded', (): void => {
  const content = document.querySelector('#content');

  setTimeout((): void => {
    getApiResponse(postsUrl)
      .then((posts: Post[]) => {
        content.innerHTML = 'Select post&hellip;';

        for (const post of posts) {
          addListElement(post);
        }
      })
      .finally(() => {
        const loader = document.querySelector('#spinner');
        loader.remove();
      });
  }, 2000);
});
