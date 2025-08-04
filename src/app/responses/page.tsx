"use client";
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import questionsJSON from "../questions.json";

// ---- Types ----
type PollQuestion = {
  id: string;
  question: string;
  type: string;
  options?: string[];
};

type PollResponseEntry = {
  questionId: string;
  answer: string;
};

type UserResponse = {
  id: string;
  responses: PollResponseEntry[];
[key: string]: string | number | boolean | null | PollResponseEntry[] | object; 
};

type Stats = {
  [questionId: string]: {
    [option: string]: number;
  };
};

// ---- Firebase config ----
const firebaseConfig = {
  apiKey: "AIzaSyDuBbgwcJR0wWJMq7CFV-VgZMqNtFzDPko",
  authDomain: "iqlaa-9b951.firebaseapp.com",
  projectId: "iqlaa-9b951",
  storageBucket: "iqlaa-9b951.firebasestorage.app",
  messagingSenderId: "728888284570",
  appId: "1:728888284570:web:af08032d700e028a029623",
  measurementId: "G-YVR4ERB4BJ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---- Data load ----
const _questions: PollQuestion[] = questionsJSON?.questions ?? [];

const Responses: React.FC = () => {
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({});

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const data: UserResponse[] = querySnapshot.docs.map(doc => {
          // If no responses, ensure it's an array.
          const resp = doc.data();
          return {
            id: doc.id,
            responses: Array.isArray(resp.responses)
              ? resp.responses
              : [],
            ...resp,
          };
        });
        setResponses(data);
      } catch (error) {
        console.error("Error fetching responses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResponses();
  }, []);

  useEffect(() => {
    const newStats: Stats = {};
    _questions.forEach(q => {
      if (q.type === "multiple_choice" && Array.isArray(q.options)) {
        newStats[q.id] = {};
        q.options.forEach(option => {
          newStats[q.id][option] = 0;
        });
      }
    });
    responses.forEach(userResponse => {
      userResponse.responses.forEach(answerObj => {
        const { questionId, answer } = answerObj;
        if (
          newStats[questionId] &&
          Object.prototype.hasOwnProperty.call(newStats[questionId], answer)
        ) {
          newStats[questionId][answer]++;
        }
      });
    });
    setStats(newStats);
  }, [responses]);

  if (loading) return <div>Loading...</div>;

  const totalResponses = `إجمالي عدد الإجابات: ${responses.length}`;

  return (
    <div className="bg-gray-800 flex flex-col items-center justify-center" dir="rtl">
      <h2
        className="mt-10 text-4xl font-bold text-center mb-10"
        style={{ color: "cyan" }}
      >
        {totalResponses}
      </h2>
      <ul className="w-[50%] flex flex-col gap-8 mb-50" style={{ minWidth: 300 }}>
        {_questions
          .filter(q => q.type === "multiple_choice")
          .map(q => (
            <li key={q.id} className="bg-gray-700 rounded-lg">
              <div
                className="font-bold mb-4 p-3 pr-5 rounded-t-lg border-b-1 border-white"
                style={{ color: "#e7e7e7ff", fontSize: "20px", background: "rgb(81 70 64)" }}
              >
                {q.question}
              </div>
              <ul className="flex flex-col gap-2 p-3">
                {q.options &&
                  [...q.options]
                    .sort(
                      (a, b) =>
                        (stats[q.id]?.[b] ?? 0) - (stats[q.id]?.[a] ?? 0)
                    )
                    .map((option, idx) => {
                      const count = stats[q.id]?.[option] ?? 0;
                      const total = Object.values(stats[q.id] ?? {}).reduce(
                        (a, b) => a + b,
                        0
                      );
                      const percent = total > 0 ? (count / total) * 100 : 0;
                      let bg_color = ["bg-blue-800","bg-teal-700", "bg-lime-700", "bg-purple-600"]; 

                      return (
                        <li key={option} className="mb-1">
                          <div
                            className="relative h-full w-full rounded-lg"
                            style={{
                              zIndex: "0",
                              height: "2.75rem",
                              background: "rgb(116 123 123)",
                            }}
                          >
                            <div
                              className={`absolute top-0 h-full rounded-lg ${bg_color[idx]}`}
                              style={{
                                width: `${percent}%`,
                                zIndex: 1,
                                transition: "width 0.5s",
                              }}
                            />
                            <div
                              className="relative z-10 p-4 flex items-center h-full w-full justify-between"
                              style={{ color: "white" }}
                            >
                              <span className="font-bold text-lg text-gray-200">{option}</span>
                              <span className="text-gray-100 font-semibold">
                                {percent.toFixed(0)}% - {count}
                              </span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Responses;