import { useState } from "react";
import "../styles/SavedNotesPage.css";
import FlashcardModal from "./FlashcardModal";

const groupByChat = (cards) => {
    const map = {};

    cards.forEach(card => {
        const key = card.chatId || "unknown";

        if (!map[key]) {
            map[key] = {
                chatId: key,
                title: card.chatTitle || "Untitled Chat",
                topic: "Flashcards",
                description: "Saved from chat",
                cards: [],
                date: card.savedAt
            };
        }

        map[key].cards.push(card);
    });

    return Object.values(map);
};

const SavedNotesPage = ({ savedFlashcards = [], onDeleteCard, onDeleteSet }) => {
    const [activeDeck, setActiveDeck] = useState(null);
    const collections = groupByChat(savedFlashcards);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("date");

    const filteredCollections = collections.filter((item) => {
        const query = searchQuery.toLowerCase();

        return (
            item.title?.toLowerCase().includes(query) ||
            item.topic?.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query)
        );
    });

    const sortedCollections = [...filteredCollections].sort((a, b) => {
        if (sortOption === "name") {
            return a.title.localeCompare(b.title);
        }

        if (sortOption === "topic") {
            return a.topic.localeCompare(b.topic);
        }

        if (sortOption === "date") {
            return new Date(b.date) - new Date(a.date);
            return 0;
        }

        return 0;
    });

    return (
        <div className="saved-notes-container">
            <header className="saved-notes-header">
                <h2>Saved Flashcards</h2>
                <p>Manage your flashcard collections and study sessions.</p>
            </header>

            <div className="saved-notes-toolbar">
                <input
                    type="text"
                    placeholder="Search collections..."
                    className="notes-search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <select
                    className="notes-sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="date">Sort by: Date</option>
                    <option value="topic">Sort by: Topic</option>
                    <option value="name">Sort by: Name</option>
                </select>
            </div>

            <div className="flashcards-grid">
                {sortedCollections.length === 0 && (
                    <p className="no-flashcards">No flashcards saved yet.</p>
                )}

                {sortedCollections.map((item, index) => (
                    <div className="flashcard-box" key={index}>
                        <div className="flashcard-header">
                            <h3>{item.title || "Untitled Set"}</h3>
                            <span className="tag">
                                {item.topic || "General"}
                            </span>
                        </div>

                        <p className="flashcard-desc">
                            {item.description || "No description provided."}
                        </p>

                        <p className="flashcard-count">
                            {Array.isArray(item.cards) ? item.cards.length : 0} Cards
                        </p>

                        <div className="flashcard-actions">
                            <button
                                className="open-btn"
                                onClick={() => setActiveDeck(item.cards)}
                            >
                                Open
                            </button>
                            <span
                                className="material-symbols-outlined delete-icon"
                                onClick={() => onDeleteSet(item.chatId)}
                            >
                                delete
                            </span>
                        </div>

                    </div>
                ))}
                {activeDeck && (
                    <FlashcardModal
                        mode="saved"
                        cards={activeDeck}
                        topic="Saved Flashcards"
                        onClose={() => setActiveDeck(null)}
                        onDeleteFlashcard={onDeleteCard}
                    />
                )}
            </div>
        </div>
    );
};

export default SavedNotesPage;
