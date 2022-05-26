import {useEffect, useState} from "react";
import {BookType, getAllBooks} from "../books/BooksService";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  Line
} from "recharts";
import {Container, Heading} from "@chakra-ui/react";
import dayjs from "dayjs";

interface GenreCount {
  name: string;
  books: number;
}

interface PublishedYearCount {
  year: string;
  books: number;
}

const Analytics = () => {
  const [bookData, setBookData] = useState<BookType[]>([])
  const [genres, setGenres] = useState<GenreCount[]>([])
  const [publishedYears, setPublishedYears] = useState<PublishedYearCount[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      const loadedBooks = await getAllBooks()
      setBookData(loadedBooks)
    }
    fetchBooks()
  }, [])

  useEffect(() => {
    const sumGenres = () => {
      const availableGenres = bookData.reduce((a, c) =>
          a.includes(c.genre) ? a : [...a, c.genre],
        [] as any[])

      let counts: GenreCount[] = []
      availableGenres.forEach(genre => {
        counts.push({
          name: genre,
          books: bookData.filter(o => o.genre === genre).length
        })
      })
      setGenres(counts)
    }

    const sumPublishedYears = () => {
      const years = bookData.reduce((a, c) =>
          a.includes(dayjs(c.year_published).year()) ? a : [...a, dayjs(c.year_published).year()],
        [] as any[])


      let counts: PublishedYearCount[] = []
      years
        .forEach(year => {
          counts.push({
            year,
            books: bookData.filter(o => dayjs(o.year_published).year() === year).length
          })
        })

      counts = counts.sort((a, b) => a.year > b.year ? 1 : -1)
      setPublishedYears(counts)
    }

    sumGenres()
    sumPublishedYears()
  }, [bookData])

  return (
    <Container maxW="100%" centerContent>
      <Heading>Number of Books by Genre</Heading>
      <div style={{width: "100%", height: 300}}>
        <ResponsiveContainer>
          <BarChart
            data={genres}
            margin={{
              top: 20
            }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey="books" fill="#8884d8"/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Heading>Number of Books Published by Year</Heading>
      <div style={{width: "100%", height: 300}}>
        <ResponsiveContainer>
          <LineChart
            data={publishedYears}
            margin={{
              top: 20
            }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="year"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="books" stroke="#8884d8" activeDot={{r: 8}}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Container>
  )
}

export default Analytics
