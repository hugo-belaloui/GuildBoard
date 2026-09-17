import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AllQuestsPage } from "./pages/AllQuestsPage";
import { QuestDetailsPage } from "./pages/QuestDetailsPage";
import { QuestFormPage } from "./pages/QuestFormPage";
import { AllAdventurersPage } from "./pages/AllAdventurersPage";
import { AdventurerDetailsPage } from "./pages/AdventurerDetailsPage";
import { AdventurerFormPage } from "./pages/AdventurerFormPage";

import { NavBar } from "./components/layout/Navbar";
import { PageContainer } from "./components/layout/PageContainer";
import { AssignAdventurer } from "./components/quests/AssignAdventurer";

function App() {
    return (
      <>
        <NavBar/>
        {/* Routes reads the current URL and renders the ONE Route below that matches it,
        like a switch statement over the browser's address bar */}
        <PageContainer>
          <Routes>
              {/* element expects an already-instantiated component (< Function />), not a reference to it (Function) */}
              <Route path="/" element={<HomePage />} />
              <Route path="/quests" element={<AllQuestsPage />} />
              <Route path="/quests/new" element={<QuestFormPage />} />
              <Route path="/quests/:id" element={<QuestDetailsPage />} />
              <Route path="/quests/:id/edit" element={<QuestFormPage />} />
              <Route path="/adventurers" element={<AllAdventurersPage />} />
              <Route path="/adventurers/new" element={<AdventurerFormPage />} />
              <Route path="/adventurers/:id" element={<AdventurerDetailsPage />} />
              <Route path="/adventurers/:id/edit" element={<AdventurerFormPage />} />
              <Route path="/quests/:id/assign" element={<AssignAdventurer />} />
          </Routes>
        </PageContainer>
      </>
    );
}

export default App;
