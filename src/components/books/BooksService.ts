
export interface BookType {
  id: string;
  title: string;
  description: string;
  genre: string;
  author: string;
  year_published: string;
}

export async function getAllBooks(): Promise<BookType[]> {
  return fetch('/data/books.json')
    .then(res => {
      if (res.ok) return res.json()
      throw res
    })
    .catch(e => console.error(e))
}
