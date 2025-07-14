import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import EndPage from './endpage';
import ChecklistModal from './checklist';
import './style.css'; 

export const getOrCreateUserId = () => {
  let userId = localStorage.getItem('user_id');
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem('user_id', userId);
  }
  return userId;
};
const SimplifyPage = ({ passageIndex, onNext, onBack, onComplete}) => {
  const [passage, setPassage] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [showChecklist, setShowChecklist] = useState(false);
  const [done, setDone] = useState(false); // new state

  const userId = getOrCreateUserId();

  const fetchNextPassage = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5009/api/passages/next', {
        params: { user_id: userId },});
      console.log('Fetched passage:', response.data);

      if (response.data.done) {
        setDone(true); // mark as done
        return;
      }
      setPassage(response.data);
      setSummary('');
    } catch (error) {
      console.error('Failed to fetch passage:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNextPassage();
  }, [passageIndex]);


  if (done) {
    onComplete?.();
    return null;
  }
  if (loading) return <p>Loading...</p>;


  const handleNext = async () => {
    if (!summary.trim()) return;
    setShowChecklist(true);
  };


  const confirmNext = async () => {
    setShowChecklist(false);
    try {
      setShowChecklist(true);
      await axios.post('http://localhost:5009/api/passages/submit', {
        user_id: userId,
        passage_id: passage.id,
        summary: summary.trim()
      });
      fetchNextPassage();
      onNext();
    } catch (error) {
      console.error('Failed to submit summary:', error);
    }
     // Proceed to next page
  };

  const cancelNext = () => {
    setShowChecklist(false); // Let user edit more
  };

  
  return (
    <div
      className="flex justify-center bg-gray-50 p-6"
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          📝 Simplify the Annotated Summary
        </h1>

        {/* Instructions and Textarea */}
        <section className="bg-white p-4 rounded shadow space-y-3">
          <h2 className="text-xl font-semibold mb-2">🎯 Your Task</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              Rewrite the <strong>Annotated Simplified Summary</strong> to make it easier to
              understand while keeping the scientific meaning.
            </li>
            <li>
              Focus on simplifying or explaining the phrases <mark className="bg-yellow-300">inside brackets [ ]</mark>.
            </li>
            <li><strong>Keep key technical terms</strong>  but feel free to add brief explanations if needed.</li>
            <li><strong>Use clear, concise language</strong>  suitable for a general audience with some science background.</li>
            <li>Write your final summary as <strong> one coherent paragraph.</strong> </li>
          </ul>
        </section>
        {/* Original Summary */}
        <section className="passage-box">
          <h2 className="text-xl font-semibold mb-2">📚 Original, Complex Summary</h2>
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {passage.passage_a.split(/(\[[^\]]+\])/).map((part, i) =>
              part.startsWith("[") && part.endsWith("]") ? (
                <mark
                  key={i}
                  className="bg-orange-100 font-semibold px-1 rounded cursor-help"
                  title="Simplify this phrase or explain it clearly"
                >
                  {part}
                </mark>
              ) : (
                <span key={i}>{part}</span>
              )
            )}</p>
        </section>
        {/* Annotated Simplified Summary */}
        <section className="passage-box">
          <h2 className="text-xl font-semibold mb-2">🔍 Phase 1 : AI Simplified Summary</h2>
          <p className="text-blue-900 leading-relaxed whitespace-pre-wrap">
            {passage.passage_b.split(/(\[[^\]]+\])/).map((part, i) =>
              part.startsWith("[") && part.endsWith("]") ? (
                <mark
                  key={i}
                  className="bg-red-200 font-semibold px-1 rounded cursor-help"
                  title="Simplify this phrase or explain it clearly"
                >
                  {part}
                </mark>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </p>
        </section>
        <section className="passage-box">
          <h2 className="text-xl font-semibold mb-2">🏅 Your Gold Simplified Summary</h2>
          <textarea
              placeholder="Please type your own summary"
              className="textarea-input"
              rows={6}
              value={summary}
              style={{ width: "95%", marginTop: "10px" }}
              onChange={(e) => setSummary(e.target.value)}
          />
        </section>
        {/* Navigation Buttons */}
        <div className="button-container">
          <button
            onClick={handleNext}
            className="button button-next"
          >
            Next →
          </button>
          {showChecklist && (
            <ChecklistModal onConfirm={confirmNext} onCancel={cancelNext} />
          )}
        </div>
      </div>
      {/* Modal Overlay */}
    </div>
  );
}

export default SimplifyPage;
