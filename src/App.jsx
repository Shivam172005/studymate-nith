import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import PapersSection from './components/PapersSection';
import RepeatedPyqsSection from './components/RepeatedPyqsSection';
import ExpectedPyqsSection from './components/ExpectedPyqsSection';
import SemesterProgressSection from './components/SemesterProgressSection';
import BookmarksSection from './components/BookmarksSection';
import MistakesJournalSection from './components/MistakesJournalSection';
import CommunitySection from './components/CommunitySection';
import AnnouncementsSection from './components/AnnouncementsSection';
import SuggestedTopicsSection from './components/SuggestedTopicsSection';
import FlashcardsSection from './components/FlashcardsSection';
import LeaderboardSection from './components/LeaderboardSection';
import AlumniSection from './components/AlumniSection';
import PaperModal from './components/PaperModal';
import UploadModal from './components/UploadModal';
import BookmarksDrawer from './components/BookmarksDrawer';
import LoginModal from './components/LoginModal';
import Footer from './components/Footer';

import { 
  PAPERS_DATA, 
  MOST_REPEATED_PYQS, 
  EXPECTED_PYQS_PREDICTOR,
  SEMESTER_CURRICULUM,
  INITIAL_MISTAKES,
  INITIAL_QUESTION_BOOKMARKS,
  INITIAL_COMMUNITY_DISCUSSIONS,
  INITIAL_ANNOUNCEMENTS,
  SUGGESTED_TOPICS_DATA,
  FLASHCARDS_DATA,
  LEADERBOARD_DATA,
  ALUMNI_DATA
} from './data/nithData';

export default function App() {
  // 1. Current Student Profile
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('nith_student_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      name: 'Shivam Sharma',
      rollNo: '23BCS045',
      dept: 'cse',
      year: '2nd Year',
      semester: '3'
    };
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // 2. Curriculum & Progress State
  const [curriculumState, setCurriculumState] = useState(() => {
    try {
      const saved = localStorage.getItem('nith_curriculum_progress');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return SEMESTER_CURRICULUM;
  });

  // 3. Question Bookmarks State
  const [questionBookmarks, setQuestionBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('nith_question_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_QUESTION_BOOKMARKS;
  });

  // 4. Mistakes Journal State
  const [mistakes, setMistakes] = useState(() => {
    try {
      const saved = localStorage.getItem('nith_mistakes_journal');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_MISTAKES;
  });

  // 5. Papers State (supports runtime uploads)
  const [papers, setPapers] = useState(() => {
    try {
      const saved = localStorage.getItem('nith_custom_papers');
      if (saved) return [...PAPERS_DATA, ...JSON.parse(saved)];
    } catch (e) {}
    return PAPERS_DATA;
  });

  // 6. Community Discussions State
  const [discussions, setDiscussions] = useState(() => {
    try {
      const saved = localStorage.getItem('nith_community_discussions');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_COMMUNITY_DISCUSSIONS;
  });

  const [ratedAnswerIds, setRatedAnswerIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('nith_rated_answers') || '[]');
    } catch {
      return [];
    }
  });

  // 7. General Announcements State
  const [announcements, setAnnouncements] = useState(() => {
    try {
      const saved = localStorage.getItem('nith_general_announcements');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_ANNOUNCEMENTS;
  });

  const [userReactions, setUserReactions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('nith_announcement_reactions') || '{}');
    } catch {
      return {};
    }
  });

  // 8. Gamification & EXP State
  const [userExp, setUserExp] = useState(() => {
    try {
      const saved = localStorage.getItem('peerly_user_exp');
      if (saved) return Number(saved);
    } catch (e) {}
    return 420;
  });

  // 9. Suggested Topics Revised State
  const [revisedTopicIds, setRevisedTopicIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('peerly_revised_topics') || '["sug-1"]');
    } catch {
      return ['sug-1'];
    }
  });

  // 10. Flashcards Learned State
  const [learnedCardIds, setLearnedCardIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('peerly_learned_flashcards') || '["fc-1", "fc-2"]');
    } catch {
      return ['fc-1', 'fc-2'];
    }
  });

  // 11. Alumni Connect State
  const [alumniList, setAlumniList] = useState(() => {
    try {
      const saved = localStorage.getItem('peerly_alumni_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ALUMNI_DATA;
  });

  // Filter States
  const [selectedDept, setSelectedDept] = useState(currentUser.dept || 'all');
  const [selectedSem, setSelectedSem] = useState(currentUser.semester || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('papers'); // 'papers' | 'repeated' | 'expected' | 'progress' | 'bookmarks' | 'mistakes'

  // Modals & Drawers
  const [activePaperModal, setActivePaperModal] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [initialMistakeFromPaper, setInitialMistakeFromPaper] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Saved entire papers
  const [savedPaperIds, setSavedPaperIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('nith_saved_papers') || '[]');
    } catch {
      return [];
    }
  });

  // Mastered PYQs
  const [masteredPyqIds, setMasteredPyqIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('nith_mastered_pyqs') || '[]');
    } catch {
      return [];
    }
  });

  // Saved expected PYQs
  const [savedExpectedIds, setSavedExpectedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('nith_saved_expected') || '[]');
    } catch {
      return [];
    }
  });

  // Persist all states to localStorage
  useEffect(() => {
    localStorage.setItem('nith_student_profile', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('nith_curriculum_progress', JSON.stringify(curriculumState));
  }, [curriculumState]);

  useEffect(() => {
    localStorage.setItem('nith_question_bookmarks', JSON.stringify(questionBookmarks));
  }, [questionBookmarks]);

  useEffect(() => {
    localStorage.setItem('nith_mistakes_journal', JSON.stringify(mistakes));
  }, [mistakes]);

  useEffect(() => {
    localStorage.setItem('nith_saved_papers', JSON.stringify(savedPaperIds));
  }, [savedPaperIds]);

  useEffect(() => {
    localStorage.setItem('nith_mastered_pyqs', JSON.stringify(masteredPyqIds));
  }, [masteredPyqIds]);

  useEffect(() => {
    localStorage.setItem('nith_saved_expected', JSON.stringify(savedExpectedIds));
  }, [savedExpectedIds]);

  useEffect(() => {
    localStorage.setItem('nith_community_discussions', JSON.stringify(discussions));
  }, [discussions]);

  useEffect(() => {
    localStorage.setItem('nith_rated_answers', JSON.stringify(ratedAnswerIds));
  }, [ratedAnswerIds]);

  useEffect(() => {
    localStorage.setItem('nith_general_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('nith_announcement_reactions', JSON.stringify(userReactions));
  }, [userReactions]);

  useEffect(() => {
    localStorage.setItem('peerly_user_exp', userExp.toString());
  }, [userExp]);

  useEffect(() => {
    localStorage.setItem('peerly_revised_topics', JSON.stringify(revisedTopicIds));
  }, [revisedTopicIds]);

  useEffect(() => {
    localStorage.setItem('peerly_learned_flashcards', JSON.stringify(learnedCardIds));
  }, [learnedCardIds]);

  useEffect(() => {
    localStorage.setItem('peerly_alumni_data', JSON.stringify(alumniList));
  }, [alumniList]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Student Profile Save handler
  const handleSaveUser = (newProfile) => {
    setCurrentUser(newProfile);
    setSelectedDept(newProfile.dept);
    setSelectedSem(newProfile.semester);
    showToast(`Welcome, ${newProfile.name}! Portal set for ${newProfile.rollNo} (Sem ${newProfile.semester})`);
  };

  // Unit toggle handler in Progress
  const handleToggleUnit = (subjectId, unitId) => {
    setCurriculumState((prev) => {
      const sem = currentUser.semester || '3';
      const dept = currentUser.dept || 'cse';
      const list = prev[sem]?.[dept];
      if (!list) return prev;

      const updatedList = list.map((sub) => {
        if (sub.id !== subjectId) return sub;
        return {
          ...sub,
          units: sub.units.map((u) => (u.id === unitId ? { ...u, completed: !u.completed } : u))
        };
      });

      return {
        ...prev,
        [sem]: {
          ...prev[sem],
          [dept]: updatedList
        }
      };
    });
    showToast('Subject preparation progress updated!');
  };

  // Question Bookmark handlers
  const handleBookmarkQuestion = (questionObj) => {
    setQuestionBookmarks((prev) => {
      const exists = prev.find((item) => item.id === questionObj.id || item.question === questionObj.question);
      if (exists) {
        showToast('Question removed from bookmarks');
        return prev.filter((item) => item.id !== exists.id);
      } else {
        showToast('Question bookmarked to revisit! ⭐');
        return [questionObj, ...prev];
      }
    });
  };

  const handleRemoveQuestionBookmark = (id) => {
    setQuestionBookmarks((prev) => prev.filter((item) => item.id !== id));
    showToast('Removed from question bookmarks');
  };

  // Mistakes Journal handlers
  const handleAddMistake = (newMistake) => {
    setMistakes((prev) => [newMistake, ...prev]);
    showToast('Exam mistake recorded in your Journal! 📝');
  };

  const handleToggleMistakeStatus = (id) => {
    setMistakes((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === 'needs_practice' ? 'revised' : 'needs_practice' }
          : m
      )
    );
    showToast('Mistake status updated!');
  };

  const handleDeleteMistake = (id) => {
    setMistakes((prev) => prev.filter((m) => m.id !== id));
    showToast('Mistake entry deleted');
  };

  const handleLogMistakeFromPaper = (info) => {
    setInitialMistakeFromPaper(info);
    setActiveTab('mistakes');
    setActivePaperModal(null);
  };

  // EXP Gain Handler
  const handleGainExp = (amount, reason) => {
    setUserExp((prev) => prev + amount);
    showToast(`🌟 +${amount} EXP: ${reason}`);
  };

  // Community handlers
  const handleAddCommunityQuestion = (newDisc) => {
    setDiscussions((prev) => [newDisc, ...prev]);
    handleGainExp(15, 'Asked Doubt in Community');
    showToast('Question posted to NIT Hamirpur Community! 💬');
  };

  const handleAddCommunityAnswer = (threadId, newAns) => {
    setDiscussions((prev) =>
      prev.map((disc) =>
        disc.id === threadId
          ? { ...disc, answers: [...(disc.answers || []), newAns] }
          : disc
      )
    );
    handleGainExp(30, 'Answered Community Query');
    showToast('Your answer has been shared with peers! 🚀');
  };

  const handleRateCommunityAnswer = (threadId, answerId) => {
    setDiscussions((prev) =>
      prev.map((disc) => {
        if (disc.id !== threadId) return disc;
        return {
          ...disc,
          answers: disc.answers.map((ans) => {
            if (ans.id !== answerId) return ans;
            const alreadyRated = ratedAnswerIds.includes(answerId);
            return {
              ...ans,
              upvotes: alreadyRated ? ans.upvotes - 1 : ans.upvotes + 1
            };
          })
        };
      })
    );

    setRatedAnswerIds((prev) => {
      const exists = prev.includes(answerId);
      if (exists) {
        showToast('Removed rating');
        return prev.filter((id) => id !== answerId);
      } else {
        handleGainExp(20, 'Rated Helpful Solution');
        return [...prev, answerId];
      }
    });
  };

  // Suggested Topics Handlers
  const handleToggleReviseTopic = (topicId) => {
    setRevisedTopicIds((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  // Flashcards Handlers
  const handleToggleLearnedCard = (cardId) => {
    setLearnedCardIds((prev) =>
      prev.includes(cardId) ? prev.filter((id) => id !== cardId) : [...prev, cardId]
    );
  };

  // Alumni Mentorship Handlers
  const handleAddAlumniQuestion = (alumId, newQna) => {
    setAlumniList((prev) =>
      prev.map((alum) =>
        alum.id === alumId
          ? { ...alum, qna: [...(alum.qna || []), newQna] }
          : alum
      )
    );
    handleGainExp(15, 'Asked Alumni Mentorship Query');
  };

  // General Announcements Handlers
  const handleAddAnnouncement = (newAnn) => {
    setAnnouncements((prev) => [newAnn, ...prev]);
    showToast('Campus announcement published! 📢');
  };

  const handleReactAnnouncement = (annId, reactionType) => {
    setAnnouncements((prev) =>
      prev.map((ann) => {
        if (ann.id !== annId) return ann;
        const currentCount = ann.reactions?.[reactionType] || 0;
        const alreadyReacted = userReactions[annId]?.[reactionType];
        return {
          ...ann,
          reactions: {
            ...ann.reactions,
            [reactionType]: alreadyReacted ? Math.max(0, currentCount - 1) : currentCount + 1
          }
        };
      })
    );

    setUserReactions((prev) => {
      const annMap = prev[annId] || {};
      const alreadyReacted = annMap[reactionType];
      showToast(alreadyReacted ? 'Reaction removed' : `Reacted with ${reactionType}! 🎉`);
      return {
        ...prev,
        [annId]: {
          ...annMap,
          [reactionType]: !alreadyReacted
        }
      };
    });
  };

  const handleAddAnnouncementComment = (annId, newComment) => {
    setAnnouncements((prev) =>
      prev.map((ann) =>
        ann.id === annId
          ? { ...ann, comments: [...(ann.comments || []), newComment] }
          : ann
      )
    );
    showToast('Comment posted to announcement! 💬');
  };

  // Toggle handlers for entire paper
  const handleToggleSavePaper = (paperId) => {
    setSavedPaperIds((prev) => {
      const exists = prev.includes(paperId);
      const updated = exists ? prev.filter((id) => id !== paperId) : [...prev, paperId];
      showToast(exists ? 'Removed paper from saved list' : 'Paper saved to your Exam Kit!');
      return updated;
    });
  };

  const handleToggleMasteredPyq = (pyqId) => {
    setMasteredPyqIds((prev) => {
      const exists = prev.includes(pyqId);
      const updated = exists ? prev.filter((id) => id !== pyqId) : [...prev, pyqId];
      showToast(exists ? 'Unmarked PYQ' : 'Awesome! PYQ marked as Mastered 🎉');
      return updated;
    });
  };

  const handleToggleSaveExpected = (expectedId) => {
    setSavedExpectedIds((prev) => {
      const exists = prev.includes(expectedId);
      const updated = exists ? prev.filter((id) => id !== expectedId) : [...prev, expectedId];
      showToast(exists ? 'Removed from Cheat Sheet' : 'Added to Exam Cheat Sheet!');
      return updated;
    });
  };

  const handleAddPaper = (newPaper) => {
    setPapers((prev) => [newPaper, ...prev]);
    try {
      const existing = JSON.parse(localStorage.getItem('nith_custom_papers') || '[]');
      localStorage.setItem('nith_custom_papers', JSON.stringify([newPaper, ...existing]));
    } catch (e) {}
    showToast('New question paper published to repository!');
  };

  const handleDownloadPaper = (paper) => {
    const element = document.createElement('a');
    const file = new Blob(
      [
        `NATIONAL INSTITUTE OF TECHNOLOGY HAMIRPUR (H.P.)\n` +
        `Department of ${paper.deptName}\n` +
        `${paper.examType.toUpperCase()} EXAMINATION ${paper.year}\n` +
        `Subject: ${paper.subject} (${paper.code})\n` +
        `Semester: ${paper.semester} | Max Marks: ${paper.maxMarks} | Time: ${paper.timeAllowed}\n\n` +
        paper.questions.map((q) => `${q.qNum} [${q.marks} Marks] (${q.unit}):\n${q.text}\n\n`).join('')
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    element.href = URL.createObjectURL(file);
    element.download = `NITH_${paper.code}_${paper.examType.toUpperCase()}_${paper.year}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast(`Downloading ${paper.code} Question Paper...`);
  };

  // Filtered queries
  const query = searchQuery.trim().toLowerCase();

  const filteredPapers = papers.filter((paper) => {
    const matchDept = selectedDept === 'all' || paper.dept === selectedDept;
    const matchSem = selectedSem === 'all' || paper.semester === selectedSem;
    const matchSearch =
      !query ||
      paper.subject.toLowerCase().includes(query) ||
      paper.code.toLowerCase().includes(query) ||
      paper.deptName.toLowerCase().includes(query) ||
      paper.questions.some((q) => q.text.toLowerCase().includes(query));
    return matchDept && matchSem && matchSearch;
  });

  const filteredRepeated = MOST_REPEATED_PYQS.filter((pyq) => {
    const matchDept = selectedDept === 'all' || pyq.dept === selectedDept;
    const matchSem = selectedSem === 'all' || pyq.semester === selectedSem;
    const matchSearch =
      !query ||
      pyq.subject.toLowerCase().includes(query) ||
      pyq.code.toLowerCase().includes(query) ||
      pyq.question.toLowerCase().includes(query) ||
      pyq.unit.toLowerCase().includes(query);
    return matchDept && matchSem && matchSearch;
  });

  const filteredExpected = EXPECTED_PYQS_PREDICTOR.filter((item) => {
    const matchDept = selectedDept === 'all' || item.dept === selectedDept;
    const matchSem = selectedSem === 'all' || item.semester === selectedSem;
    const matchSearch =
      !query ||
      item.subject.toLowerCase().includes(query) ||
      item.code.toLowerCase().includes(query) ||
      item.predictedQuestion.toLowerCase().includes(query) ||
      item.topic.toLowerCase().includes(query);
    return matchDept && matchSem && matchSearch;
  });

  const savedPapersList = papers.filter((p) => savedPaperIds.includes(p.id));
  const masteredPyqsList = MOST_REPEATED_PYQS.filter((q) => masteredPyqIds.includes(q.id));
  const savedExpectedList = EXPECTED_PYQS_PREDICTOR.filter((e) => savedExpectedIds.includes(e.id));
  const resolvedMistakesCount = mistakes.filter((m) => m.status === 'revised').length;
  const bookmarkedQuestionIds = questionBookmarks.map((q) => q.id);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-150 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openUploadModal={() => setIsUploadOpen(true)}
        openBookmarksDrawer={() => setIsBookmarksOpen(true)}
        openLoginModal={() => setIsLoginModalOpen(true)}
        currentUser={currentUser}
        userExp={userExp}
        savedCount={savedPaperIds.length}
        masteredCount={masteredPyqIds.length}
        questionBookmarksCount={questionBookmarks.length}
        mistakesCount={mistakes.length}
      />

      {/* Hero Header with Department and Semester selectors */}
      <HeroBanner
        selectedDept={selectedDept}
        setSelectedDept={setSelectedDept}
        selectedSem={selectedSem}
        setSelectedSem={setSelectedSem}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* 1. Papers Tab */}
        {activeTab === 'papers' && (
          <PapersSection
            papers={filteredPapers}
            onOpenPaper={(paper) => setActivePaperModal(paper)}
            savedPaperIds={savedPaperIds}
            onToggleSavePaper={handleToggleSavePaper}
            onDownloadPaper={handleDownloadPaper}
          />
        )}

        {/* 2. Repeated PYQs Tab */}
        {activeTab === 'repeated' && (
          <RepeatedPyqsSection
            repeatedPyqs={filteredRepeated}
            masteredIds={masteredPyqIds}
            onToggleMastered={handleToggleMasteredPyq}
          />
        )}

        {/* 3. Expected PYQs Tab */}
        {activeTab === 'expected' && (
          <ExpectedPyqsSection
            expectedPyqs={filteredExpected}
            savedExpectedIds={savedExpectedIds}
            onToggleSaveExpected={handleToggleSaveExpected}
          />
        )}

        {/* 4. Student Semester Progress Tab */}
        {activeTab === 'progress' && (
          <SemesterProgressSection
            user={currentUser}
            curriculum={curriculumState}
            onToggleUnit={handleToggleUnit}
            onNavigateTab={(tab) => setActiveTab(tab)}
            masteredPyqsCount={masteredPyqIds.length}
            mistakesCount={mistakes.length}
            resolvedMistakesCount={resolvedMistakesCount}
          />
        )}

        {/* 5. Community Q&A & Highest Rated Review Tab */}
        {activeTab === 'community' && (
          <CommunitySection
            discussions={discussions}
            onAddQuestion={handleAddCommunityQuestion}
            onAddAnswer={handleAddCommunityAnswer}
            onRateAnswer={handleRateCommunityAnswer}
            currentUser={currentUser}
            ratedAnswerIds={ratedAnswerIds}
          />
        )}

        {/* 6. General Announcements Tab */}
        {activeTab === 'announcements' && (
          <AnnouncementsSection
            announcements={announcements}
            onAddAnnouncement={handleAddAnnouncement}
            onReactAnnouncement={handleReactAnnouncement}
            onAddComment={handleAddAnnouncementComment}
            currentUser={currentUser}
            userReactions={userReactions}
          />
        )}

        {/* 5. Bookmarked Questions to Revisit Tab */}
        {activeTab === 'bookmarks' && (
          <BookmarksSection
            questionBookmarks={questionBookmarks}
            onRemoveBookmark={handleRemoveQuestionBookmark}
            onLogMistakeFromQuestion={(q) => handleLogMistakeFromPaper({
              question: q.question,
              subject: q.subject,
              code: q.code,
              source: q.source,
              solutionSummary: q.solutionSummary || ''
            })}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* 6. Mistakes Journal Tab */}
        {activeTab === 'mistakes' && (
          <MistakesJournalSection
            mistakes={mistakes}
            onAddMistake={handleAddMistake}
            onToggleStatus={handleToggleMistakeStatus}
            onDeleteMistake={handleDeleteMistake}
            initialNewMistakeData={initialMistakeFromPaper}
            clearInitialMistakeData={() => setInitialMistakeFromPaper(null)}
          />
        )}

        {/* 7. Suggested Topics for Last Night Revision */}
        {activeTab === 'suggested' && (
          <SuggestedTopicsSection
            suggestedTopics={SUGGESTED_TOPICS_DATA}
            revisedTopicIds={revisedTopicIds}
            onToggleReviseTopic={handleToggleReviseTopic}
            onGainExp={handleGainExp}
          />
        )}

        {/* 8. Flashcards & Short Notes Tab */}
        {activeTab === 'flashcards' && (
          <FlashcardsSection
            flashcards={FLASHCARDS_DATA}
            onGainExp={handleGainExp}
            learnedCardIds={learnedCardIds}
            onToggleLearnedCard={handleToggleLearnedCard}
          />
        )}

        {/* 9. Weekly Top 10 Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <LeaderboardSection
            leaderboardData={LEADERBOARD_DATA}
            currentUser={currentUser}
            userExp={userExp}
          />
        )}

        {/* 10. Alumni Mentorship & Career Guidance Tab */}
        {activeTab === 'alumni' && (
          <AlumniSection
            alumniList={alumniList}
            onAddAlumniQuestion={handleAddAlumniQuestion}
            currentUser={currentUser}
          />
        )}
      </main>

      {/* Paper View / Simulated PDF Modal with Solutions */}
      {activePaperModal && (
        <PaperModal
          paper={activePaperModal}
          onClose={() => setActivePaperModal(null)}
          isSaved={savedPaperIds.includes(activePaperModal.id)}
          onToggleSave={handleToggleSavePaper}
          onBookmarkQuestion={handleBookmarkQuestion}
          onLogMistakeFromPaper={handleLogMistakeFromPaper}
          bookmarkedQuestionIds={bookmarkedQuestionIds}
        />
      )}

      {/* Student Login / Profile Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentUser={currentUser}
        onSaveUser={handleSaveUser}
      />

      {/* Upload Paper Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddPaper={handleAddPaper}
      />

      {/* Saved Exam Kit Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedPapers={savedPapersList}
        masteredPyqs={masteredPyqsList}
        savedExpectedList={savedExpectedList}
        onOpenPaper={(paper) => setActivePaperModal(paper)}
        onRemoveSavedPaper={handleToggleSavePaper}
        onRemoveMasteredPyq={handleToggleMasteredPyq}
        onRemoveSavedExpected={handleToggleSaveExpected}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

      {/* Footer */}
      <Footer
        onOpenUploadModal={() => setIsUploadOpen(true)}
        onSelectTab={(tab) => setActiveTab(tab)}
      />

    </div>
  );
}
