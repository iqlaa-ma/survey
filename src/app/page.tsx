"use client"
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Share2, CheckCircle } from 'lucide-react';
import CustomRecaptcha from "@/components/MyRecaptcha";

import Image from 'next/image';
// Types
interface PollQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'text_input';
  options?: string[];
}

interface PollResponse {
  questionId: string;
  answer: string;
}

// Sample poll data
const pollData = {
  title: "استطلاع الرأي العام",
  description: "شاركنا رأيك في هذا الاستطلاع القصير",
  questions: [
    {
      id: "1",
      question: "واش كتكمي؟",
      type: "multiple_choice" as const,
      options: ["اه", "مرة مرة"]
    },
    {
      id: "2",
      question: "عندك بلية اخرى من غير الكارو؟",
      type: "multiple_choice" as const,
      options: ["اه", "لا"]
    },
    {
      id: "3",
      question: "شحال من كارو فالنهار؟",
      type: "multiple_choice" as const,
      options: [ "كل مرة واشنو ", "اكثر من 5 فالنهاره", "أقل من 5 فالنهار"]
    },    
    {
      id: "4",
      question: "باش كايعجبك دوز؟",
      type: "multiple_choice" as const,
      options: [ "كوكة", "قهوة", "أتاي"]
    },   
    {
      id: "5",
      question: " اشمن نوع ديال السجارة كتستعمل؟",
      type: "multiple_choice" as const,
      options: [ "السجارة الإلكترونية", "السجارة العادية"]
    },
    {
      id: "6",
      question: "شحال كان فعمرك ملي تبليتي؟",
      type: "multiple_choice" as const,
      options: [ "بعد 25 عام", "بين 18 عام و 25 عام", "أقل من 18 عام"]
    },
    {
      id: "7",
      question: "شكون لي بلاك؟",
      type: "multiple_choice" as const,
      options: [ "ماشي سوقك", "صحابي ", "بليت راسي"]
    },
    {
      id: "8",
      question: "اشنو لي كايخليك تكمي؟",
      type: "multiple_choice" as const,
      options: [ "غير شاد ستون", "الستريس", "الظروف"]
    },
   {
      id: "9",
      question: "واش كتفكر تبعد من هاذ البلية؟",
      type: "multiple_choice" as const,
      options: [ "مبغيتش نبعد", "مزال ممستعدش", "ديما كانفكر"]
    },
    {
      id: "10",
      question: "شحال كاتخسر دالفلوس كل نهار فهاذ البلية؟",
      type: "multiple_choice" as const,
      options: [ "أكثر من 150 درهم", "بين 50 درهم و 150 درهم", "أقل من 50 درهم"]
    },
    {
      id: "11",
      question: "واش الى بدلتي المحيط تقدر تبعد من البلية؟",
      type: "multiple_choice" as const,
      options: [ "لا", "أه"]
    },
    {
      id: "12",
      question: "واش كاتشوف راسك تقدر تعافى من هاد البلية؟",
      type: "multiple_choice" as const,
      options: [ "فات الفوت", "كاين أمل"]
    },    
    {
      id: "13",
      question: "واش كاتسهر؟",
      type: "multiple_choice" as const,
      options: [ "كنعس معا الدجاج", "بزااف", "مرة مرة"]
    },
    {
      id: "14",
      question: "واش عاجباك حالتك ونتا مبلي؟",
      type: "multiple_choice" as const,
      options: [ "لا", "اه"]
    },
   {
      id: "15",
      question: "واش كاتريني؟",
      type: "multiple_choice" as const,
      options: [ "مرة مرة", "لا", "اه"]
    },
    {
      id: "16",
      question: "اشنو تبغي تنصح الناس لي باقي متبلاوش؟",
      type: "text_input" as const
    },
    {
      id: "17",
      question: "واش كاينا شي حاجة اخرى مأثرة عليك؟",
      type: "text_input" as const
    },
  ]
};


// Smoking Survey Welcome Page
const SmokingSurveyPage = ({ onNext }: { onNext: () => void }) => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
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
            className="w-[80%] md:w-[400px] bg-red-600 text-white font-bold py-4 px-10 rounded-lg hover:bg-red-700 transition-colors text-base md:text-lg text-center"
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
    <div className="min-h-screen  bg-black text-white flex items-center justify-center p-4">
      
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
            className="w-[60%] md:w-[400px] justify-center items-center flex bg-red-600 text-white font-bold py-3 md:py-4 px-6 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xl md:text-3xl"
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
  
  
  <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
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
                  : 'border-gray-600 focus:border-red-500  '
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
          className="flex bg-red-600  pr-7 items-center gap-2 px-6 py-2 md:py-3 bg-primary text-dark rounded-lg font-bold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
        >
          <ChevronLeft size={20} />
          السابق
        </button>
        
        <button
          onClick={onNext}
          disabled={!answer}
          className="flex bg-red-600  pr-7 items-center gap-2 px-6 py-2 md:py-3 bg-primary text-dark rounded-lg font-bold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
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
const PhoneInputPage = ({ onNext, phoneNumber, setPhoneNumber }: { 
  onNext: () => void; 
  phoneNumber: string; 
  setPhoneNumber: (phone: string) => void; 
}) => {
  const [showSkipMessage, setShowSkipMessage] = useState(false);

  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4">
      <div className="w-full flex  flex-col justify-center items-center">
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

        <div className="text-center  w-full mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl  font-bold mb-6 leading-relaxed">
            آخر حاجة، بغيتي تجرب أحسن<br />
            طريقة للتعافي ف 90 يوم؟
          </h1>
          <p className="text-gray-300 mb-4 text-[19px] sm:text-2xl lg:text-2xl 2xl:text-2xl  leading-relaxed" >
            خدامين على استراتيجية جديدة باش نعاونو الناس يقلعو على التدخين.
          </p>
          <p className="text-gray-300 mb-8 text-[19px] sm:text-2xl lg:text-2xl 2xl:text-2xl  leading-relaxed">
            إلى بغيتي تكون من الولين لي يجربوها، دخل نمرة تليفونك وسجل ف الويتليست.
          </p>
        </div>

        <div className=" max-w-md text-center w-full mb-8">
          <label className="block text-right mb-4 text-gray-300">
            دخل رقم تليفونك
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+212 6xx-xxxxxx"
            className="w-full p-4 rounded-lg bg-slate-800 border-2 border-slate-600 focus:border-cyan-400 focus:outline-none text-center text-lg"
            dir="ltr"
          />
        </div>

        <div className=" max-w-md space-y-4">
          <button
            onClick={onNext}
            disabled={!phoneNumber.trim()}
            className="w-full bg-cyan-400 text-slate-900 font-bold py-4 px-6 rounded-lg hover:bg-cyan-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            سجّلني
          </button>
          
          <button
            onClick={() => setShowSkipMessage(true)}
            className="w-full text-cyan-400 font-medium py-2 hover:text-cyan-300 transition-colors underline"
          >
            ماشي ديالك [تجاوز]
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
  <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
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
        className="w-[70%] md:w-[400px] bg-red-600 text-dark font-bold py-3 md:py-4 px-6 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 text-base md:text-lg"
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
    // Save to Firebase here with phone number
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
    // Firebase save logic will go here
    const dataToSave = {
      responses: responses,
      phoneNumber: phoneNumber || null,
      timestamp: new Date().toISOString()
    };
    console.log('data to save it in firebase hhhhh :', dataToSave);
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