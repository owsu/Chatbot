# Chatbot

A full-stack chatbot application built for Direct Supply's Kata project.

**Author:** Owusu Kantankah  
**Tech Stack:** Python, FastAPI, Groq API, React (Vite)

---

## Overview

This application enables users to interact with a Direct Supply assistant chatbot through a React frontend. Messages are processed by a FastAPI backend, which communicates with the Groq API to generate responses using conversation context.

---

## How It Works

1. The user sends a message from the React frontend.
2. The FastAPI backend receives the message and appends it to the conversation history.
3. The Groq API generates a response using the full conversation history as context.
4. The response is returned to the frontend and displayed to the user.

---

## Tech Stack

- **Python**  
  Used for backend development, used for libraries such as FastAPI, Groq, and env.

- **FastAPI**  
  Provides a fast and efficient API layer for handling frontend requests and backend logic.

- **Groq API**  
  Powers the chatbot’s responses using through a LLM. I picked this mainly because it has a free tier.

- **React (Vite)**  
  Has a dynamic frontend, the ability to use components, and the use of javascript within HTML writing.

---

## Setup Instructions

### Prerequisites

Create a `.env` file in the backend directory.
- The env file should have an environmental variable named GROQ_API_KEY that points towards the Groq key you want to use.
