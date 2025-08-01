"use client"
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Share2 } from 'lucide-react';
import CustomRecaptcha from "@/components/MyRecaptcha";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/app/api/firebase/firebase';

import Image from 'next/image';
// Types
interface PollQuestion {
  id: string;
  question: string;
  type: string;
  options?: string[];
}

interface PollResponse {
  questionId: string;
  answer: string;
}

// load Sample poll data from the questions.json file 
import pollData from './questions.json'; 


// Smoking Survey Welcome Page
const SmokingSurveyPage = ({ onNext }: { onNext: () => void }) => (
  <div className="min-h-screen bg-[#1E2939] text-white flex items-center justify-center p-4">
    <div className=" w-[90%]">
      <div className="relative w-full justify-center flex items-center">
          <Image 
              src="/images/iqlaa logo.svg" 
              alt="Example Image" 
              width={250} 
              height={200}
          />
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left side */}
        <div className="flex justify-center order-2 md:order-1">
            <div className="relative">
                <Image 
                    src="/images/iqlaa garrou.svg" 
                    alt="Example Image" 
                    width={700} 
                    height={500}
                />
            </div>
        </div>

        <div className="text-center md:text-right order-1 md:order-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 md:mb-6 leading-relaxed">
            شاركنا تجربتك مع<br />
            التدخين
          </h1>
          <p className="text-gray-500 mb-4 text-[19px] sm:text-2xl lg:text-2xl 2xl:text-3xl md:text-base leading-relaxed">
            استطلاع سري وآمن باش نتعرفو عادات التدخين.
          </p>
          <p className="text-gray-500 mb-8 md:mb-12 text-[19px] sm:text-2xl lg:text-2xl 2xl:text-3xl md:text-base leading-relaxed">
            عاونّا نجمعو المعطيات باش نحاربو هاد الآفة.
          </p>
          <button
            onClick={onNext}
            // the hover effect is red it should be cyan
            className="w-[80%] md:w-[400px] bg-[#26CDBC] text-white font-bold py-4 px-10 rounded-lg hover:bg-green-600 transition-colors text-base md:text-lg text-center"
          >
            نبداو الاستطلاع
          </button>
          <p className="text-[14px] font-bold text-white mt-4">التدخين يقتل</p>
        </div>
      </div>
      <div className="flex justify-around items-center gap-4 mt-1 md:mt-1">
        <div className="flex gap-1">
            <Image 
                src="/images/UM6P .svg" 
                alt="Example Image" 
                width={220} 
                height={10}
            />
        </div>
        <div className="text-2xl font-bold text-gray-400 tracking-wider">
            <Image 
                src="/images/1337.svg" 
                alt="Example Image" 
                width={220} 
                height={10}
            />
        </div>
      </div>
    </div>
  </div>
);

// Instructions Page
const InstructionsPage = ({ onNext }: { onNext: () => void }) => {
  const [isRobotChecked, setIsRobotChecked] = useState(false);

  return (
    <div className="min-h-screen  bg-[#1E2939] text-white flex items-center justify-center p-4">
      
      <div className=" w-full flex flex-col justify-center items-center">
                
        <div className="relative w-full justify-center flex items-center">
            <Image 
                src="/images/iqlaa logo.svg" 
                alt="Example Image" 
                className='pb-'
                width={250} 
                height={200}
            />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">
          قبل ما تبدا
        </h1>
        
        <div className="space-y-6 md:space-y-8 mb-8 md:mb-12">
          <div className="flex items-start gap-4 text-right" dir="rtl">
            <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-primary bg-opacity-20 rounded-full flex items-center justify-center text-primary font-bold border-2 border-primary">
              1
            </div>
            <div className="text-sm md:text-base leading-relaxed" >
              <span className="text-primary font-semibold">حنا كنضمنو بالخصوصية</span> وداكشي علاش جميع الأجوبة ديالك كاتبقي <span className="text-gray-400">مجهولة</span>
            </div>
          </div>

          <div className="flex items-start gap-4 text-right" dir="rtl">
            <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-primary bg-opacity-20 rounded-full flex items-center justify-center text-primary font-bold border-2 border-primary">
              2
            </div>
            <div className="text-sm md:text-base leading-relaxed">
              <span className="text-primary font-semibold">حاول تجاوب بصراحة.</span> الهدف ديالنا هو نفهموك باش نعطيوك حلول <span className="text-gray-400">تعاونك.</span>
            </div>
          </div>

          <div className="flex items-start gap-4 text-right" dir="rtl">
            <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-primary bg-opacity-20 rounded-full flex items-center justify-center text-primary font-bold border-2 border-primary">
              3
            </div>
            <div className="text-sm md:text-base leading-relaxed">
              <span className="text-primary font-semibold">الاستطلاع غادي ياخد تقريبا 3 دقايق.</span>
            </div>
          </div>
        </div>

        {/* reCAPTCHA google */}
        <div className='w-[60%]'>

      <CustomRecaptcha onVerificationChange={setIsRobotChecked} />
        </div>
          <button
            onClick={onNext}
            disabled={!isRobotChecked}
            className="w-[60%] md:w-[400px] justify-center items-center flex bg-[#26CDBC] text-white font-bold py-3 md:py-4 px-6 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xl md:text-3xl"
          >
            نبدا
          </button>
      </div>
    </div>
  );
};

// Question Page Component
const QuestionPage = ({ 
  question, 
  currentIndex, 
  totalQuestions,
  onAnswer, 
  onNext, 
  onPrevious,
  answer 
}: {
  question: PollQuestion;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  answer: string;
}) => (
  
  
  <div className="min-h-screen bg-[#1E2939] text-white flex flex-col items-center justify-center p-4">
          <div className="relative w-full justify-center flex items-center">
            <Image 
                src="/images/iqlaa logo.svg" 
                alt="Example Image" 
                width={300} 
                height={200}
            />
        </div>

    <div className="max-w-lg w-full">
      
      <h2 className="text-xl md:text-2xl font-bold mb-8 md:mb-12 text-center  leading-relaxed">
        {question.question}
      </h2>
      
      <div className="space-y-3 md:space-y-4 mb-8 md:mb-12">
        {question.type === 'multiple_choice' ? (
          question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(option)}
              className={`w-full p-4 md:p-5 rounded-lg border-2 text-right transition-colors text-sm md:text-base ${
                answer === option
                  ? ' bg-primary bg-opacity-20 border-cyan-400'
                  : 'border-gray-600 focus:border-cyan-500  '
              }`}
            >
              {option}
            </button>
          ))
        ) : (
          <textarea
            value={answer}
            onChange={(e) => onAnswer(e.target.value)}
            placeholder="اكتب إجابتك هنا..."
            className="w-full p-4 md:p-5 rounded-lg bg-gray-800 border-2 border-gray-600 focus:border-cyan-400 focus:outline-none  text-right text-sm md:text-base"
            rows={4}
            dir="rtl"
          />
        )}
      </div>
      
      <div className="flex justify-between items-center">
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="flex bg-[#374355]  pr-7 items-center gap-2 px-6 py-2 md:py-3 bg-primary text-dark rounded-lg font-bold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
        >
          <ChevronLeft size={20} />
          السابق
        </button>
        
        <button
          onClick={onNext}
          disabled={!answer}
          className="flex bg-[#374355]  pr-7 items-center gap-2 px-6 py-2 md:py-3 bg-primary text-dark rounded-lg font-bold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
        >
          {currentIndex === totalQuestions - 1 ? 'إنهاء' : 'التالي'}
          <ChevronRight size={20} />
        </button>
      </div>
        <div className="text-gray-400 pt-14 flex w-full justify-center items-center text-2xl">
          {currentIndex + 1} / {totalQuestions}
        </div>

    </div>
  </div>
);

// Phone Number Input comp
const PhoneInputPage = ({
  onNext,
  phoneNumber,
  setPhoneNumber,
}: {
  onNext: () => void;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
}) => {
  const [showSkipMessage, setShowSkipMessage] = useState(false);

const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const input = e.target.value;

  const prefix = "+212 ";
  const numbersOnly = input.replace(/\D/g, ""); // remove non-digits
  let localPart = numbersOnly.startsWith("212") ? numbersOnly.slice(3) : numbersOnly;

  if (localPart.startsWith("0")) localPart = localPart.slice(1);

  localPart = localPart.slice(0, 9);

  setPhoneNumber(prefix + localPart);
};

const isValidMoroccan = /^\+212\s[5-7][0-9]{8}$/.test(phoneNumber);

  return (
    <div className="min-h-screen w-full bg-[#1E2939] text-white flex items-center justify-center p-4">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className="relative">
              <Image
                src="/images/iqlaa logo.svg"
                alt="Example Image"
                width={300}
                height={200}
              />
            </div>
          </div>
        </div>

        <div className="text-center w-full mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl font-bold mb-6 leading-relaxed">
            آخر حاجة، بغيتي تجرب أحسن
            <br />
            طريقة للتعافي ف 90 يوم؟
          </h1>
          <p className="text-gray-300 mb-4 text-[19px] sm:text-2xl lg:text-2xl 2xl:text-2xl leading-relaxed">
            خدامين على استراتيجية جديدة باش نعاونو الناس يقلعو على التدخين.
          </p>
          <p className="text-gray-300 mb-8 text-[19px] sm:text-2xl lg:text-2xl 2xl:text-2xl leading-relaxed">
            إلى بغيتي تكون من الولين لي يجربوها، دخل نمرة تليفونك وسجل ف الويتليست.
          </p>
        </div>

        <div className="max-w-md text-center w-full mb-8">
          <label className="block text-right mb-4 text-gray-300">
            دخل رقم تليفونك
          </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="+212 6xx-xxxxxx"
              className="w-full p-4 rounded-lg bg-slate-800 border-2 border-slate-600 focus:border-cyan-400 focus:outline-none text-center text-lg"
              dir="ltr"
            />
            {!isValidMoroccan && phoneNumber.length > 4 && (
            <p className="text-red-400 mt-2 text-sm">
              المرجو إدخال رقم مغربي صحيح
            </p>
          )}
        </div>

        <div className="max-w-md space-y-4">
          <button
            onClick={onNext}
            disabled={!isValidMoroccan}
            className="w-full bg-cyan-400 text-slate-900 font-bold py-4 px-6 rounded-lg hover:bg-cyan-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            سجّلني
          </button>
          <button
            onClick={() => setShowSkipMessage(true)}
            className="w-full text-cyan-400 font-medium py-2 hover:text-cyan-300 transition-colors underline"
          >
            ماشي دبا [تجاوز]
          </button>
        </div>

        {showSkipMessage && (
          <div className="mt-6 p-4 bg-slate-800 rounded-lg text-center">
            <p className="text-gray-300 mb-4">متأكد؟ هاد الفرصة مغاديش ترجع قريب...</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowSkipMessage(false)}
                className="flex-1 bg-cyan-400 text-slate-900 font-bold py-2 px-4 rounded hover:bg-cyan-300 transition-colors"
              >
                رجّعني
              </button>
              <button
                onClick={onNext}
                className="flex-1 bg-gray-600 text-white font-bold py-2 px-4 rounded hover:bg-gray-500 transition-colors"
              >
                تجاوز
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Thank You Page Comp
const ThankYouPage = ({ onShare }: { onShare: () => void }) => (
  <div className="min-h-screen bg-[#1E2939] text-white flex items-center justify-center p-4">
    <div className=" w-full flex flex-col items-center text-center">
               <div className="relative pb-8">
                <Image 
                src="/images/iqlaa logo.svg" 
                alt="Example Image" 
                width={250} 
                height={200}
                />
            </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 md:mb-6">
        الله يعطيك الصحة <br />
         كنشكروك حيث كملتي الاستطلاع
      </h1>
      <p className="text-gray-500 w-[60%] mb-8 md:mb-12  leading-relaxed max-w-4xl mx-auto text-center text-[19px] sm:text-2xl lg:text-2xl 2xl:text-2xl">
        الخدمة صعيبة دريتها ديا بقات السهلة، باش الاستطلاع يكون مفيد
        خاص يشارك فيه أكبر عدد ديال الناس دكشي علاش خصك تعاونّا
        وتبارطاجي الاستطلاع مع صحابك      
      </p>
      <button
        onClick={onShare}
        className="w-[70%] md:w-[400px] bg-[#26CDBC] text-dark font-bold py-3 md:py-4 px-6 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 text-base md:text-lg"
      >
        <Share2 size={20} />
        بارطجي
      </button>
    </div>
  </div>
);


// Main App Compo
export default function PollApp() {
  const [currentPage, setCurrentPage] = useState<'smoking-survey' | 'instructions' | 'poll' | 'phone-input' | 'thank-you'>('smoking-survey');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<PollResponse[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleStartFromSmoking = () => {
    setCurrentPage('instructions');
  };

  const handleStartFromInstructions = () => {
    setCurrentPage('poll');
  };

  const handleAnswer = (answer: string) => {
    const questionId = pollData.questions[currentQuestionIndex].id;
    const newResponses = responses.filter(r => r.questionId !== questionId);
    newResponses.push({ questionId, answer });
    setResponses(newResponses);
  };

  const handleNext = () => {
    if (currentQuestionIndex < pollData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentPage('phone-input');
    }
  };

  const handlePhoneNext = () => {
    saveResponsesToFirebase();
    setCurrentPage('thank-you');
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'استطلاع الرأي',
        text: 'شارك في هذا الاستطلاع المهم',
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ الرابط!');
    }
  };

  
  const saveResponsesToFirebase = async () => {

  try {
    const dataToSave = {
      responses: responses,
      phoneNumber: phoneNumber || null,
      timestamp: new Date().toISOString()
    };
    
    console.log('Data to save:', dataToSave);
    
    const docRef = await addDoc(collection(db, "users"), dataToSave);
    
    console.log("User survey saved with ID:", docRef.id);
    
  } catch (error) {
    console.error("Error saving user data:", error);
  }


  };

  const getCurrentAnswer = () => {
    const questionId = pollData.questions[currentQuestionIndex].id;
    const response = responses.find(r => r.questionId === questionId);
    return response?.answer || '';
  };

  if (currentPage === 'smoking-survey') {
    return <SmokingSurveyPage onNext={handleStartFromSmoking} />;
  }

  if (currentPage === 'instructions') {
    return <InstructionsPage onNext={handleStartFromInstructions} />;
  }

  if (currentPage === 'poll') {
    return (
      <QuestionPage
        question={pollData.questions[currentQuestionIndex]}
        currentIndex={currentQuestionIndex}
        totalQuestions={pollData.questions.length}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        answer={getCurrentAnswer()}
      />
    );
  }

  if (currentPage === 'phone-input') {
    return (
      <PhoneInputPage 
        onNext={handlePhoneNext}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
    );
  }

  return <ThankYouPage onShare={handleShare} />;
}