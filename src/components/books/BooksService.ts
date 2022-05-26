
export interface BookType {
  isbn: string
  title: string
  subtitle: string
  author: string
  published: string
  publisher: string
  pages: number
  description: string
  website: string
  genre: string
}

export async function getAllBooks(): Promise<BookType[]> {
  return fetch('/data/books.json')
    .then(res => {
      if (res.ok) return res.json()
      throw res
    })
    .catch(e => console.error(e))
}
