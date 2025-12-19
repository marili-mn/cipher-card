# 🛡️ CipherCard

> **Secure. Ephemeral. Yours.**
> A military-grade virtual card manager built with privacy and security at its core.

![Status](https://img.shields.io/badge/Status-Prototype-blue)
![Architecture](https://img.shields.io/badge/Architecture-Hexagonal-orange)
![Tech](https://img.shields.io/badge/Stack-Vite_React_TS-blueviolet)

## 📋 Overview

**CipherCard** is a "Mobile First" fintech application designed to manage virtual credit cards. Its primary goal is to protect the user's real financial identity by generating tokenized, disposable, or freezable payment methods for online transactions.

Currently in **MVP Phase**, utilizing a **Mock Adapter Strategy** to simulate high-latency secure banking APIs.

## 🏗️ Engineering Architecture

This project implements a strict **Clean Architecture (Hexagonal)** to decouple the User Interface from business logic and data sources.

### Layers

1.  **🟢 Core (Domain Layer)**
    *   *Pure TypeScript.* No UI dependencies. No Frameworks.
    *   Defines the business entities (`Card`) and the contracts (`ICardRepository`).
    *   *Location:* `src/core/`

2.  **🟡 Infrastructure (Adapters Layer)**
    *   Implementations of the contracts.
    *   Current Adapter: `MockCardRepository` (Simulates latency/network).
    *   Future Adapter: `RestApiRepository` (NestJS connection).
    *   *Location:* `src/infrastructure/`

3.  **🔴 Presentation (UI Layer)**
    *   **Views & Components:** React components styled with CSS Modules.
    *   **Hooks:** Custom hooks (`useCards`) that act as Primary Adapters, connecting the UI to the Core.
    *   *Location:* `src/presentation/`

## 📂 Project Structure

```text
src/
├── core/                  # 🧠 The Brain (Business Rules)
│   ├── domain/            # Entities (Card.ts)
│   └── repositories/      # Interfaces (ICardRepository.ts)
│
├── infrastructure/        # 🔌 The Plugs (Data Sources)
│   └── adapters/          # Mock or Real API implementations
│
├── presentation/          # 🎨 The Skin (React UI)
│   ├── components/        # Atomic components (CardItem)
│   ├── hooks/             # Logic adapters (useCards)
│   └── views/             # Full screens (DashboardView)
│
└── main.tsx               # Entry point
```

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18+)
*   npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/cipher-card.git

# 2. Enter directory
cd cipher-card

# 3. Install dependencies
npm install

# 4. Run development server
npm run dev
```

## 🎨 Design System

*   **Theme:** "Industrial Security".
*   **Palette:** Slate 900 (Background), Indigo 600 (Primary), Red 500 (Alerts).
*   **Typography:** System Sans for UI, Monospaced for PAN/Security Data.

## 🔜 Roadmap

- [x] Hexagonal Architecture Setup
- [x] Mock Data Adapter
- [x] Dashboard UI (Prototype Mode)
- [ ] **Phase 2:** Integrate CSS Modules for "Carbon Fiber" Aesthetics.
- [ ] **Phase 3:** Connect to NestJS Backend.
- [ ] **Phase 4:** Biometric Authentication (WebAuthn).

---
*Built with ❤️ and 🛡️ by Nahuel Marcilli*