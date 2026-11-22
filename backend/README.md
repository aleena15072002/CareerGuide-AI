# CareerGuide AI Backend

FastAPI + PostgreSQL + SQLAlchemy + OAuth2 Password Flow + JWT + Gemini AI.

## Setup

```bash
python -m venv venv
venv\Scripts\activate
python -m pip install -r requirements.txt
```

Create a PostgreSQL database named:

```text
career_guide_ai
```

Copy `.env.example` to `.env` and add your PostgreSQL password and Gemini API key.

Seed careers:

```bash
python -m app.seed
```

Run:

```bash
uvicorn app.main:app --reload
```

Swagger:
http://localhost:8000/docs

## Auth

POST /api/accounts/register
POST /api/accounts/login
GET /api/accounts/me

Login uses OAuth2 password flow and returns a JWT bearer token.

## Profile

GET /api/profile
PUT /api/profile

## Careers

GET /api/careers
GET /api/careers/{career_id}

## Recommendations

GET /api/recommendations

## Roadmap

GET /api/roadmap/{career_id}
PATCH /api/roadmap/items/{item_id}/complete

## AI Chat

POST /api/chat

## Notifications

GET /api/notifications
PATCH /api/notifications/{notification_id}/read
