import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import RateLimitedUI from '../components/RateLimitedUI';
// import axios from 'axios';
import api from "../lib/axios";
import { toast } from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';


const HomePage = () => {
  const [isRateLimited, setisRateLimited] = useState(true);
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try{
        const res = await api.get("/notes");
        const data = await res.data;
        console.log(data);
        setNotes(data);
        setLoading(false);
        setisRateLimited(false);

      }
      catch (error){
        console.log("error fetching notes");
        console.log(error);
        if (error.response && error.response?.status === 429) {
          setisRateLimited(true);
        }
        else{
          toast.error("Error fetching notes");
        }
      }

      finally{
        setLoading(false);
    
      }
    };
    fetchNotes();
  }, []);
  return (
    <div className='min-h-screen'>
      <NavBar />
      {isRateLimited && <RateLimitedUI />}

    <div className='max-w-6xl mx-auto p-4 mt-6'>
      {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
      {notes.length === 0 && !isRateLimited && <NotesNotFound />}
      {notes.length > 0 && !isRateLimited && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default HomePage