# A simple & minimal ticketing system

My brother and I run a small e-commerce startup where we sell audio-repair kits across different online marketplaces. We needed a webapp that could easily aggregate messages, offers, refund requests, etc. into a simple drag-and-drop ticketing interface, while also being able to integrate with other tools & APIs (shipping services, our other internal tools, etc.). It was surprisingly hard to find an available tool online that wasn't either super expensive, or so bloated with additional features that it made it hard to use. 

So I built this! The frontend is built with Typescript/React, backend built with Flask/SQLAlchemy, to be used in a PostgreSQL database. It supports a bunch of the features you'd expect from a ticketing dashboard, with a modular & robust backend that's ready to integrate with any external API (emails, etc.) to fetch inquiries and turn them into tickets.

## Features

- Clean display of customer information associated with each ticket in a drag-and-drop interface
- Fetch & reply to tickets from external APIs easily via the architecture laid out in the backend
- Advanced Filtering Options, creating and setting tags, agents, statuses, priorities, etc.
- Background scheduler automates fetching customer messages periodically
- Quality of life features: canned responses, auto-response config, etc.

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0**
- **TypeScript**

### Backend
- **Flask 3.0.0**
- **SQLAlchemy 2.0**
- **PostgreSQL 12+**

## 📸 Screenshots

### Main Dashboard
![Main Dashboard](screenshots/MainPageImage.png)
*Comprehensive view showing all tickets with filtering options, status indicators, and quick actions.*

### Filter Options
![Filter Bar](screenshots/Fitlers.png)
*Advanced filtering by status, priority, agent, tags, date range, and text search.*

### Ticket Detail Modal
![Ticket Modal Top](screenshots/TicketModalTop.png)
*Full conversation history with customer messages and ticket metadata.*

![Ticket Modal Bottom](screenshots/ticketModalBottom.png)
*Reply interface with canned response support and message composition.*

### Management Modal
![Management Modal](screenshots/ManagementModal.png)
*Create and manage tags, agents, and canned responses for efficient ticket organization.*

## Installation

### 1. Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.9+
- **PostgreSQL** 12+
- Git

#### 2. Clone the Repository

```bash
git clone https://github.com/yourusername/CustomerServiceDashboardDemo.git
cd CustomerServiceDashboardDemo
```

#### 3. Setup config files

### Backend Environment Variables (`.env`)

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/customer_service_db

# Flask
SECRET_KEY=your-secret-key-here
FLASK_DEBUG=True

# Ticket Fetch Interval
TICKET_FETCH_INTERVAL=5  # minutes

```

### Frontend Environment Variables (`src/config.ts`)

```typescript
export const API_BASE_URL = import.meta.env.API_URL || 'http://localhost:5000/api';
```

#### 4. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your database credentials and settings
```

**Create PostgreSQL Database:**

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE customer_service_db;
\q
```

**Initialize Database:**

```bash
# Create tables
python
>>> from app import create_app, db
>>> app = create_app()
>>> with app.app_context():
...     db.create_all()
>>> exit()
```

**Run Backend Server:**

```bash
python app.py
```

Backend runs at `http://localhost:5000`

#### 5. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Configure API URL (optional - defaults to localhost:5000)
# Edit src/config.ts if needed

# Start development server
npm run dev
```

Frontend runs at `http://localhost:5173`

### Endpoints

#### Tickets
- `GET /tickets` - Get all tickets with optional filters
  - Query params: `search`, `ticketStatus`, `priority`, `assignedTo`, `tags`, `startDate`, `endDate`
- `PUT /tickets/:ticketId` - Update a ticket
- `PUT /tickets/:ticketId/reply` - Reply to a ticket (placeholder)

#### Tags
- `GET /tags` - Get all tags
- `POST /tags` - Create a new tag
  - Body: `{ name: string, color: string }`
- `PUT /tags/:tagId` - Update a tag
- `DELETE /tags/:tagId` - Delete a tag

#### Agents
- `GET /agents` - Get all agents
- `POST /agents` - Create a new agent
  - Body: `string` (agent name)
- `PUT /agents/:agentId` - Update an agent
- `DELETE /agents/:agentId` - Delete an agent

#### FAQ Auto Response
- `GET /faqAutoResponse` - Get FAQ auto response
- `PUT /faqAutoResponse/:faqId` - Update FAQ auto response

#### Canned Responses
- `GET /cannedResponses` - Get all canned responses
- `POST /cannedResponses` - Create a new canned response
  - Body: `string` (response text)
- `PUT /cannedResponses/:responseId` - Update a canned response
- `DELETE /cannedResponses/:responseId` - Delete a canned response
