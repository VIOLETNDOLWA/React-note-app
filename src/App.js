import React from 'react';
import { useState,useEffect } from "react";
import {nanoid} from "nanoid";
import NoteList from "./components/Notelist";
import Search from "./components/Search";
import Header from "./components/Header";


const Main = () =>{
    const [notes, setNotes] = useState([
        {
        id:nanoid(),
        text:"This is my first note, Hurrah!",
        date:"23/01/2018"
    },
    {
        id:nanoid(),
        text:"This is my second note, Hurrah!",
        date:"2/09/2015"
    },
    {
        id:nanoid(),
        text:"This is my third note, Hurrah!",
        date:"19/09/2018"
    },
    {
        id:nanoid(),
        text:"This is my fouth note, Hurrah!",
        date:"19/09/2018"
    },
    
]);

const [searchText, setSearchText] = useState("");

const [darkMode, setDarkMode] = useState(false);

useEffect(() =>{
    const saveNotes = JSON.parse(localStorage.getItem("react-notes-app-data")
    );

    if(saveNotes){
        setNotes(saveNotes)
    }
}, [])

useEffect(() =>{
    localStorage.setItem(
        "react-notes-app-data",
        JSON.stringify(notes)
        );
}, [notes]);

const addNote = (text) =>{
    const date = new Date();
    const newNote ={
        id: nanoid(),
        text:text,
        date: date.toLocaleDateString(),
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes)
};

const deleteNote = (id) =>{
    const newNotes = notes.filter((note) => note.id !==id)
        setNotes(newNotes);

}
    return(
        <div className={`${darkMode && 'dark-mode'}`}>
            <div className="container">
            <Header handleToggleDarkMode={setDarkMode}/>
            <Search handleSearchNote={setSearchText}/>
            <NoteList 
            notes={notes.filter((note) =>
                note.text.toLocaleLowerCase().includes(searchText)
                )} 
            handleAddNote={addNote}
            handleDeleteNote={deleteNote}
            />
        </div>
        </div>
        
    )
}
export default Main;