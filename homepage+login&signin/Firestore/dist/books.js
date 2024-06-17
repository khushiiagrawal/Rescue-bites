import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const colRef = collection(db, 'books');

const fetchBooks = async () => {
    try {
        const snapshot = await getDocs(colRef);
        let books = [];
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id });
        });
        return books;
    } catch (err) {
        console.error(err.message);
        return [];
    }
};

const renderBooks = (books, container) => {
    container.innerHTML = ''; // Clear existing list
    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `ID: ${book.id}, Title: ${book.title}, Author: ${book.author}`;
        container.appendChild(li);
    });
};

export { fetchBooks, renderBooks, colRef, addDoc, deleteDoc, doc };
