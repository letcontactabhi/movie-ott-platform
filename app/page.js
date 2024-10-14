'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Film, Tv, Link, Search } from "lucide-react"

export default function Component() {
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
    <div className="container mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Movie-OTT Platform Database</h1>
      
      <Tabs defaultValue="add-movie" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="add-movie" className="flex items-center justify-center">
            <Film className="w-4 h-4 mr-2" />
            Add Movie
          </TabsTrigger>
          <TabsTrigger value="add-platform" className="flex items-center justify-center">
            <Tv className="w-4 h-4 mr-2" />
            Add Platform
          </TabsTrigger>
          <TabsTrigger value="link" className="flex items-center justify-center">
            <Link className="w-4 h-4 mr-2" />
            Link Movie
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center justify-center">
            <Search className="w-4 h-4 mr-2" />
            Search
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="add-movie">
          <Card>
            <CardHeader>
              <CardTitle>Add New Movie</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={addMovie} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Title"
                  value={newMovie.title}
                  onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                  className="w-full"
                />
                <Input
                  type="number"
                  placeholder="Year"
                  value={newMovie.year}
                  onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
                  className="w-full"
                />
                <Select
                  value={newMovie.language}
                  onValueChange={(value) => setNewMovie({ ...newMovie, language: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tamil">Tamil</SelectItem>
                    <SelectItem value="Malayalam">Malayalam</SelectItem>
                    <SelectItem value="Telugu">Telugu</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="submit" className="w-full">Add Movie</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="add-platform">
          <Card>
            <CardHeader>
              <CardTitle>Add New OTT Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={addPlatform} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Platform Name"
                  value={newPlatform.name}
                  onChange={(e) => setNewPlatform({ ...newPlatform, name: e.target.value })}
                  className="w-full"
                />
                <Button type="submit" className="w-full">Add Platform</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="link">
          <Card>
            <CardHeader>
              <CardTitle>Link Movie to Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={linkMovieToPlatform} className="space-y-4">
                <Select
                  value={linkData.movieId}
                  onValueChange={(value) => setLinkData({ ...linkData, movieId: value })}
                >
                  <SelectTrigger className="w-full">
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
                  <SelectTrigger className="w-full">
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
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="submit" className="w-full">Link Movie to Platform</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>Search Movies</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={searchMovies} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Title"
                  value={searchQuery.title}
                  onChange={(e) => setSearchQuery({ ...searchQuery, title: e.target.value })}
                  className="w-full"
                />
                <Select
                  value={searchQuery.language}
                  onValueChange={(value) => setSearchQuery({ ...searchQuery, language: value })}
                >
                  <SelectTrigger className="w-full">
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
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((platform) => (
                      <SelectItem key={platform.id} value={platform.name}>{platform.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="submit" className="w-full">Search</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Movie List</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <ul className="space-y-4">
              {movies.map((movie) => (
                <li key={movie.id} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold">{movie.title} ({movie.year})</h3>
                  <p className="text-sm text-gray-600">{movie.language}</p>
                  <div className="mt-2">
                    {movie.platforms.map((p) => (
                      <span key={p.platformId} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mt-1">
                        {p.platform.name} ({p.availabilityStatus})
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}