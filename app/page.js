'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [movies, setMovies] = useState([])
  const [platforms, setPlatforms] = useState([])
  const [newMovie, setNewMovie] = useState({ title: '', year: '', language: '' })
  const [newPlatform, setNewPlatform] = useState({ name: '' })
  const [linkData, setLinkData] = useState({ movieId: '', platformId: '', availabilityStatus: '' })
  const [searchQuery, setSearchQuery] = useState({ title: '', language: '', platform: '' })

  useEffect(() => {
    fetchMovies()
    fetchPlatforms()
  }, [])

  const fetchMovies = async () => {
    const response = await axios.get('/api/movies')
    setMovies(response.data)
  }

  const fetchPlatforms = async () => {
    const response = await axios.get('/api/platforms')
    setPlatforms(response.data)
  }

  const addMovie = async (e) => {
    e.preventDefault()
    await axios.post('/api/movies', newMovie)
    setNewMovie({ title: '', year: '', language: '' })
    fetchMovies()
  }

  const addPlatform = async (e) => {
    e.preventDefault()
    await axios.post('/api/platforms', newPlatform)
    setNewPlatform({ name: '' })
    fetchPlatforms()
  }

  const linkMovieToPlatform = async (e) => {
    e.preventDefault()
    await axios.post('/api/link', linkData)
    setLinkData({ movieId: '', platformId: '', availabilityStatus: '' })
  }

  const searchMovies = async (e) => {
    e.preventDefault()
    const response = await axios.get('/api/search', { params: searchQuery })
    setMovies(response.data)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Movie-OTT Platform Database</h1>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Add New Movie</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addMovie} className="space-y-2">
            <Input
              type="text"
              placeholder="Title"
              value={newMovie.title}
              onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Year"
              value={newMovie.year}
              onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
            />
            <Select
              value={newMovie.language}
              onValueChange={(value) => setNewMovie({ ...newMovie, language: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tamil">Tamil</SelectItem>
                <SelectItem value="Malayalam">Malayalam</SelectItem>
                <SelectItem value="Telugu">Telugu</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">Add Movie</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Add New OTT Platform</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addPlatform} className="space-y-2">
            <Input
              type="text"
              placeholder="Platform Name"
              value={newPlatform.name}
              onChange={(e) => setNewPlatform({ ...newPlatform, name: e.target.value })}
            />
            <Button type="submit">Add Platform</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Link Movie to Platform</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={linkMovieToPlatform} className="space-y-2">
            <Select
              value={linkData.movieId}
              onValueChange={(value) => setLinkData({ ...linkData, movieId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Movie" />
              </SelectTrigger>
              <SelectContent>
                {movies.map((movie) => (
                  <SelectItem key={movie.id} value={movie.id.toString()}>{movie.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={linkData.platformId}
              onValueChange={(value) => setLinkData({ ...linkData, platformId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Platform" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((platform) => (
                  <SelectItem key={platform.id} value={platform.id.toString()}>{platform.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={linkData.availabilityStatus}
              onValueChange={(value) => setLinkData({ ...linkData, availabilityStatus: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">Link Movie to Platform</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Search Movies</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={searchMovies} className="space-y-2">
            <Input
              type="text"
              placeholder="Title"
              value={searchQuery.title}
              onChange={(e) => setSearchQuery({ ...searchQuery, title: e.target.value })}
            />
            <Select
              value={searchQuery.language}
              onValueChange={(value) => setSearchQuery({ ...searchQuery, language: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tamil">Tamil</SelectItem>
                <SelectItem value="Malayalam">Malayalam</SelectItem>
                <SelectItem value="Telugu">Telugu</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={searchQuery.platform}
              onValueChange={(value) => setSearchQuery({ ...searchQuery, platform: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Platform" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((platform) => (
                  <SelectItem key={platform.id} value={platform.name}>{platform.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Movie List</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {movies.map((movie) => (
              <li key={movie.id}>
                {movie.title} ({movie.year}) - {movie.language}
                {movie.platforms.map((p) => (
                  <span key={p.platformId}> - Available on {p.platform.name} ({p.availabilityStatus})</span>
                ))}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}